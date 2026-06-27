const prisma = require('../config/prisma');

const MESES_ES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const MESES_CORTOS = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

const getPnL = async (req, res) => {
  const { desde, hasta } = req.query;
  if (!desde || !hasta) return res.status(400).json({ error: 'Se requieren los parámetros desde y hasta' });

  const [y1, m1, d1] = desde.split('-');
  const [y2, m2, d2] = hasta.split('-');
  
  // Límites para campos @db.Date (UTC)
  const inicioDate = new Date(Date.UTC(y1, m1 - 1, d1));
  const finDate    = new Date(Date.UTC(y2, m2 - 1, d2, 23, 59, 59, 999));

  // Límites para campos @db.Timestamp (Local)
  const inicioTime = new Date(y1, m1 - 1, d1, 0, 0, 0, 0);
  const finTime    = new Date(y2, m2 - 1, d2, 23, 59, 59, 999);

  try {
    const [reservasPagadas, cargosEspacioPagados, cargosPersonaPagados,
           reservasPendientes, cargosEspacioPendientes, cargosPersonaPendientes] = await Promise.all([
      prisma.reserva.findMany({
        where: {
          estado_reserva: { notIn: ['cancelada', 'no_show'] },
          estado_pago: 'pagado',
          check_in: { gte: inicioDate, lte: finDate }
        },
        include: { espacio: { select: { numero: true, tipo_habitacion: true } }, huesped: { select: { nombre_completo: true } } }
      }),
      prisma.cuenta_espacio.findMany({
        where: { fecha_registro: { gte: inicioTime, lte: finTime }, estado: 'pagado' },
        include: {
          reserva: { include: { espacio: { select: { numero: true } }, huesped: { select: { nombre_completo: true } } } }
        }
      }),
      prisma.cuenta_persona.findMany({
        where: { fecha_registro: { gte: inicioTime, lte: finTime }, estado: 'pagado' },
        include: {
          huesped: { select: { nombre_completo: true } }
        }
      }),
      prisma.reserva.findMany({
        where: { estado_reserva: { in: ['activa', 'confirmada'] }, estado_pago: { not: 'pagado' }, check_in: { gte: inicioDate, lte: finDate } },
        select: { monto_total: true }
      }),
      prisma.cuenta_espacio.findMany({
        where: { fecha_registro: { gte: inicioTime, lte: finTime }, estado: 'pendiente' },
        select: { valor_total: true }
      }),
      prisma.cuenta_persona.findMany({
        where: { fecha_registro: { gte: inicioTime, lte: finTime }, estado: 'pendiente' },
        select: { valor_total: true }
      })
    ]);

    const ingresoHospedaje = reservasPagadas.reduce((s, r) => s + parseFloat(r.monto_total || 0), 0);

    // Desglose consumos por categoría de producto
    // cuenta_espacio/cuenta_persona no tienen FK a producto_inventario,
    // así que resolvemos la categoría buscando por nombre en el catálogo.
    const nombresProductos = [...new Set([
      ...cargosEspacioPagados.map(c => c.nombre_producto).filter(Boolean),
      ...cargosPersonaPagados.map(c => c.descripcion).filter(Boolean)
    ])];
    const productosDelPeriodo = nombresProductos.length > 0
      ? await prisma.producto_inventario.findMany({
          where: { nombre: { in: nombresProductos } },
          select: { nombre: true, categoria: true }
        })
      : [];
    const catPorNombre = new Map(productosDelPeriodo.map(p => [p.nombre, p.categoria]));

    const consumosPorCategoria = {};
    cargosEspacioPagados.forEach(c => {
      const cat = catPorNombre.get(c.nombre_producto) || 'Consumos';
      if (!consumosPorCategoria[cat]) consumosPorCategoria[cat] = 0;
      consumosPorCategoria[cat] += parseFloat(c.valor_total || 0);
    });
    cargosPersonaPagados.forEach(c => {
      const cat = catPorNombre.get(c.descripcion) || 'Consumos';
      if (!consumosPorCategoria[cat]) consumosPorCategoria[cat] = 0;
      consumosPorCategoria[cat] += parseFloat(c.valor_total || 0);
    });

    const ingresoConsumos     = [...cargosEspacioPagados, ...cargosPersonaPagados].reduce((s, c) => s + parseFloat(c.valor_total || 0), 0);
    const totalIngresosReales = ingresoHospedaje + ingresoConsumos;
    const ingresosPendientes  = reservasPendientes.reduce((s, r) => s + parseFloat(r.monto_total || 0), 0)
                              + [...cargosEspacioPendientes, ...cargosPersonaPendientes].reduce((s, c) => s + parseFloat(c.valor_total || 0), 0);

    const [gastosOperativos, comprasInventario] = await Promise.all([
      prisma.gasto_operativo.findMany({
        where: { activo: true, fecha: { gte: inicioDate, lte: finDate } },
        orderBy: { fecha: 'asc' }
      }),
      prisma.movimiento_inventario.findMany({
        where: { tipo: 'entrada', motivo: 'compra', fecha: { gte: inicioTime, lte: finTime }, precio_unitario: { gt: 0 } },
        include: { producto: { select: { nombre: true, categoria: true } } }
      })
    ]);

    const salidasConsumo = await prisma.movimiento_inventario.findMany({
      where: {
        tipo: 'salida',
        motivo: { in: ['consumo_habitacion', 'consumo_persona'] },
        fecha: { gte: inicioTime, lte: finTime }
      },
      include: { producto: { select: { nombre: true, categoria: true, precio_costo: true } } }
    });

    const gastosPorCategoria = {};
    for (const g of gastosOperativos) {
      if (!gastosPorCategoria[g.categoria]) gastosPorCategoria[g.categoria] = { total: 0, items: [] };
      gastosPorCategoria[g.categoria].total += parseFloat(g.monto);
      gastosPorCategoria[g.categoria].items.push(g);
    }

    const totalGastosOperativos = gastosOperativos.reduce((s, g) => s + parseFloat(g.monto), 0);
    const costoCompras = comprasInventario.reduce((s, m) => s + parseFloat(m.precio_unitario) * parseFloat(m.cantidad), 0);
    const costoVentas  = salidasConsumo.reduce((s, m) => s + parseFloat(m.producto.precio_costo || 0) * parseFloat(m.cantidad), 0);
    const totalGastos  = totalGastosOperativos + costoCompras;
    const utilidadBruta = totalIngresosReales - costoVentas;
    const utilidadNeta  = totalIngresosReales - totalGastos;
    const margenNeto    = totalIngresosReales > 0 ? (utilidadNeta / totalIngresosReales) * 100 : 0;

    const detalleReservas = reservasPagadas.map(r => ({
      tipo: 'Hospedaje',
      descripcion: `Hab. ${r.espacio?.numero} — ${r.huesped?.nombre_completo}`,
      fecha: r.check_in,
      monto: parseFloat(r.monto_total || 0)
    }));

    const detalleConsumos = [
      ...cargosEspacioPagados.map(c => ({
        tipo: 'Consumo',
        descripcion: `${c.nombre_producto} (Hab. ${c.reserva?.espacio?.numero})`,
        fecha: c.fecha_registro,
        monto: parseFloat(c.valor_total || 0)
      })),
      ...cargosPersonaPagados.map(c => ({
        tipo: 'Consumo',
        descripcion: `${c.descripcion} — ${c.huesped?.nombre_completo || c.nombre_persona}`,
        fecha: c.fecha_registro,
        monto: parseFloat(c.valor_total || 0)
      }))
    ];

    const detalleCompras = comprasInventario.map(m => ({
      tipo: 'Compra Inventario',
      descripcion: `${m.producto.nombre} (${m.producto.categoria}) × ${parseFloat(m.cantidad)}`,
      fecha: m.fecha,
      monto: parseFloat(m.precio_unitario) * parseFloat(m.cantidad)
    }));

    res.json({
      periodo: { desde, hasta },
      ingresos: {
        hospedaje: ingresoHospedaje,
        consumos: ingresoConsumos,
        consumosPorCategoria,
        total: totalIngresosReales,
        pendientes: ingresosPendientes,
        detalle: [...detalleReservas, ...detalleConsumos].sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
      },
      gastos: {
        operativos: { total: totalGastosOperativos, porCategoria: gastosPorCategoria, detalle: gastosOperativos },
        inventario: { costoCompras, costoVentas, detalle: detalleCompras },
        total: totalGastos
      },
      resumen: {
        totalIngresos: totalIngresosReales,
        totalGastos,
        utilidadBruta,
        utilidadNeta,
        margenNeto: parseFloat(margenNeto.toFixed(1))
      }
    });
  } catch (err) {
    console.error('Error getPnL:', err.message);
    res.status(500).json({ error: 'Error al generar reporte' });
  }
};

// ── Resumen últimos N meses (barras comparativas) ────────────────────────
const getResumenMeses = async (req, res) => {
  const meses = parseInt(req.query.meses) || 6;
  const hoy   = new Date();
  const resultado = [];

  try {
    for (let i = meses - 1; i >= 0; i--) {
      // Límites para @db.Date (UTC)
      const inicioDate = new Date(Date.UTC(hoy.getFullYear(), hoy.getMonth() - i, 1));
      const finDate    = new Date(Date.UTC(hoy.getFullYear(), hoy.getMonth() - i + 1, 0, 23, 59, 59, 999));
      
      // Límites para @db.Timestamp (Local)
      const inicioTime = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1, 0, 0, 0, 0);
      const finTime    = new Date(hoy.getFullYear(), hoy.getMonth() - i + 1, 0, 23, 59, 59, 999);

      const [reservas, cargosEsp, cargosPerr, gastos, compras] = await Promise.all([
        prisma.reserva.findMany({ where: { estado_pago: 'pagado', check_in: { gte: inicioDate, lte: finDate } }, select: { monto_total: true } }),
        prisma.cuenta_espacio.findMany({ where: { estado: 'pagado', fecha_registro: { gte: inicioTime, lte: finTime } }, select: { valor_total: true } }),
        prisma.cuenta_persona.findMany({ where: { estado: 'pagado', fecha_registro: { gte: inicioTime, lte: finTime } }, select: { valor_total: true } }),
        prisma.gasto_operativo.findMany({ where: { activo: true, fecha: { gte: inicioDate, lte: finDate } }, select: { monto: true } }),
        prisma.movimiento_inventario.findMany({ where: { tipo: 'entrada', motivo: 'compra', fecha: { gte: inicioTime, lte: finTime } }, select: { precio_unitario: true, cantidad: true } })
      ]);

      const totalIngresos = reservas.reduce((s, r) => s + parseFloat(r.monto_total || 0), 0)
                          + [...cargosEsp, ...cargosPerr].reduce((s, c) => s + parseFloat(c.valor_total || 0), 0);
      const totalGastos   = gastos.reduce((s, g) => s + parseFloat(g.monto), 0)
                          + compras.reduce((s, m) => s + parseFloat(m.precio_unitario) * parseFloat(m.cantidad), 0);

      resultado.push({
        mes: `${MESES_CORTOS[inicioDate.getUTCMonth()]} ${String(inicioDate.getUTCFullYear()).slice(2)}`,
        ingresos: totalIngresos,
        gastos: totalGastos,
        utilidad: totalIngresos - totalGastos
      });
    }
    res.json(resultado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener resumen de meses' });
  }
};

// ── Resumen anual completo ────────────────────────────────────────────────
const getResumenAnual = async (req, res) => {
  const hoy  = new Date();
  const anio = parseInt(req.query.anio) || hoy.getFullYear();

  try {
    const mesesConDatos = [];

    for (let m = 0; m < 12; m++) {
      // Límites para @db.Date (UTC)
      const inicioDate = new Date(Date.UTC(anio, m, 1));
      const finDate    = new Date(Date.UTC(anio, m + 1, 0, 23, 59, 59, 999));
      
      // Límites para @db.Timestamp (Local)
      const inicioTime = new Date(anio, m, 1, 0, 0, 0, 0);
      const finTime    = new Date(anio, m + 1, 0, 23, 59, 59, 999);
      
      if (inicioDate > hoy) break;

      const [reservas, cargosEsp, cargosPerr, gastos, compras, numReservas] = await Promise.all([
        prisma.reserva.findMany({
          where: { estado_reserva: { notIn: ['cancelada','no_show'] }, estado_pago: 'pagado', check_in: { gte: inicioDate, lte: finDate } },
          select: { monto_total: true }
        }),
        prisma.cuenta_espacio.findMany({ where: { estado: 'pagado', fecha_registro: { gte: inicioTime, lte: finTime } }, select: { valor_total: true } }),
        prisma.cuenta_persona.findMany({ where: { estado: 'pagado', fecha_registro: { gte: inicioTime, lte: finTime } }, select: { valor_total: true } }),
        prisma.gasto_operativo.findMany({ where: { activo: true, fecha: { gte: inicioDate, lte: finDate } }, select: { monto: true } }),
        prisma.movimiento_inventario.findMany({ where: { tipo: 'entrada', motivo: 'compra', fecha: { gte: inicioTime, lte: finTime } }, select: { precio_unitario: true, cantidad: true } }),
        prisma.reserva.count({ where: { estado_reserva: { notIn: ['cancelada','no_show'] }, check_in: { gte: inicioDate, lte: finDate } } })
      ]);

      const hospedaje     = reservas.reduce((s, r) => s + parseFloat(r.monto_total || 0), 0);
      const consumos      = [...cargosEsp, ...cargosPerr].reduce((s, c) => s + parseFloat(c.valor_total || 0), 0);
      const totalIngresos = hospedaje + consumos;
      const totalGastos   = gastos.reduce((s, g) => s + parseFloat(g.monto), 0)
                          + compras.reduce((s, mv) => s + parseFloat(mv.precio_unitario) * parseFloat(mv.cantidad), 0);

      mesesConDatos.push({
        mes: `${MESES_ES[m]} ${anio}`,
        mesCorto: `${MESES_CORTOS[m]} ${String(anio).slice(2)}`,
        mesNum: m,
        anio,
        hospedaje,
        consumos,
        totalIngresos,
        totalGastos,
        utilidad: totalIngresos - totalGastos,
        numReservas
      });
    }

    const totales = mesesConDatos.reduce((acc, m) => ({
      hospedaje:     acc.hospedaje     + m.hospedaje,
      consumos:      acc.consumos      + m.consumos,
      totalIngresos: acc.totalIngresos + m.totalIngresos,
      totalGastos:   acc.totalGastos   + m.totalGastos,
      utilidad:      acc.utilidad      + m.utilidad,
      numReservas:   acc.numReservas   + m.numReservas
    }), { hospedaje: 0, consumos: 0, totalIngresos: 0, totalGastos: 0, utilidad: 0, numReservas: 0 });

    // Comparativa mes actual vs anterior
    const mesActualIdx   = hoy.getMonth();
    const mesActual      = mesesConDatos.find(m => m.mesNum === mesActualIdx) || null;
    const mesAnteriorIdx = mesActualIdx === 0 ? 11 : mesActualIdx - 1;
    let mesAnterior      = mesesConDatos.find(m => m.mesNum === mesAnteriorIdx) || null;

    // Si enero, el anterior es diciembre del año pasado
    if (!mesAnterior && mesActualIdx === 0) {
      const iaAntDate = new Date(Date.UTC(anio - 1, 11, 1));
      const faAntDate = new Date(Date.UTC(anio - 1, 12, 0, 23, 59, 59, 999));
      const iaAntTime = new Date(anio - 1, 11, 1, 0, 0, 0, 0);
      const faAntTime = new Date(anio - 1, 12, 0, 23, 59, 59, 999);
      const [rA, ceA, cpA] = await Promise.all([
        prisma.reserva.findMany({ where: { estado_pago: 'pagado', check_in: { gte: iaAntDate, lte: faAntDate } }, select: { monto_total: true } }),
        prisma.cuenta_espacio.findMany({ where: { estado: 'pagado', fecha_registro: { gte: iaAntTime, lte: faAntTime } }, select: { valor_total: true } }),
        prisma.cuenta_persona.findMany({ where: { estado: 'pagado', fecha_registro: { gte: iaAntTime, lte: faAntTime } }, select: { valor_total: true } }),
      ]);
      const hAnt = rA.reduce((s, r) => s + parseFloat(r.monto_total || 0), 0);
      const cAnt = [...ceA, ...cpA].reduce((s, c) => s + parseFloat(c.valor_total || 0), 0);
      mesAnterior = { hospedaje: hAnt, consumos: cAnt, totalIngresos: hAnt + cAnt };
    }

    const comparativa = mesActual && mesAnterior ? {
      variacionIngresos:  mesAnterior.totalIngresos > 0 ? ((mesActual.totalIngresos - mesAnterior.totalIngresos) / mesAnterior.totalIngresos) * 100 : null,
      variacionHospedaje: mesAnterior.hospedaje > 0 ? ((mesActual.hospedaje - mesAnterior.hospedaje) / mesAnterior.hospedaje) * 100 : null,
      variacionConsumos:  mesAnterior.consumos > 0 ? ((mesActual.consumos - mesAnterior.consumos) / mesAnterior.consumos) * 100 : null,
      mesActual: mesActual.totalIngresos,
      mesAnterior: mesAnterior.totalIngresos,
      hospedajeActual:    mesActual.hospedaje,
      hospedajeAnterior:  mesAnterior.hospedaje,
      consumosActual:     mesActual.consumos,
      consumosAnterior:   mesAnterior.consumos,
    } : null;

    res.json({ anio, meses: mesesConDatos, totales, comparativa });
  } catch (err) {
    console.error('Error getResumenAnual:', err.message);
    res.status(500).json({ error: 'Error al obtener resumen anual' });
  }
};

module.exports = { getPnL, getResumenMeses, getResumenAnual };
