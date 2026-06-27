const prisma = require('../config/prisma');

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const MESES_CORTOS = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];

const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();

    // No-show: solo se marca MANUALMENTE desde la vista de huéspedes
    // (auto-marcado eliminado para permitir llegadas tardías y checkout manual)
    // ───────────────────────────────────────────────────────────────
    // Fechas Mes Actual (Usando UTC para que coincida con Prisma @db.Date)
    const startOfCurrentMonth = new Date(Date.UTC(today.getFullYear(), today.getMonth(), 1));
    const endOfCurrentMonth = new Date(Date.UTC(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999));
    
    // Fechas Mes Anterior
    const startOfLastMonth = new Date(Date.UTC(today.getFullYear(), today.getMonth() - 1, 1));
    const endOfLastMonth = new Date(Date.UTC(today.getFullYear(), today.getMonth(), 0, 23, 59, 59, 999));

    // Fechas Año Actual
    const startOfYear = new Date(Date.UTC(today.getFullYear(), 0, 1));
    const endOfYear = new Date(Date.UTC(today.getFullYear(), 11, 31, 23, 59, 59, 999));

    // Fechas Año Anterior
    const startOfLastYear = new Date(Date.UTC(today.getFullYear() - 1, 0, 1));
    const endOfLastYear = new Date(Date.UTC(today.getFullYear() - 1, 11, 31, 23, 59, 59, 999));

    // 1. Ingresos por Habitaciones (Reservas confirmadas/completadas, excluye cancelada y no_show)
    // Mes actual
    const reservasActual = await prisma.reserva.findMany({
      where: {
        estado_reserva: { notIn: ['cancelada', 'no_show'] },
        estado_pago: 'pagado',
        check_in: { gte: startOfCurrentMonth, lte: endOfCurrentMonth }
      }
    });
    const ingresosHabActual = reservasActual.reduce((acc, r) => acc + parseFloat(r.monto_total || 0), 0);

    // Mes anterior
    const reservasAnterior = await prisma.reserva.findMany({
      where: {
        estado_reserva: { notIn: ['cancelada', 'no_show'] },
        estado_pago: 'pagado',
        check_in: { gte: startOfLastMonth, lte: endOfLastMonth }
      }
    });
    const ingresosHabAnterior = reservasAnterior.reduce((acc, r) => acc + parseFloat(r.monto_total || 0), 0);

    let crecimientoHabitaciones = null;
    if (ingresosHabAnterior > 0) {
      crecimientoHabitaciones = ((ingresosHabActual - ingresosHabAnterior) / ingresosHabAnterior) * 100;
    }

    // Año actual y anterior
    const [reservasAnioActual, reservasAnioAnterior] = await Promise.all([
      prisma.reserva.findMany({
        where: {
          estado_reserva: { notIn: ['cancelada', 'no_show'] },
          estado_pago: 'pagado',
          check_in: { gte: startOfYear, lte: endOfYear }
        }
      }),
      prisma.reserva.findMany({
        where: {
          estado_reserva: { notIn: ['cancelada', 'no_show'] },
          estado_pago: 'pagado',
          check_in: { gte: startOfLastYear, lte: endOfLastYear }
        }
      })
    ]);

    const ingresosHabAnioActual = reservasAnioActual.reduce((acc, r) => acc + parseFloat(r.monto_total || 0), 0);
    const ingresosHabAnioAnterior = reservasAnioAnterior.reduce((acc, r) => acc + parseFloat(r.monto_total || 0), 0);

    let crecimientoHabitacionesAnio = null;
    if (ingresosHabAnioAnterior > 0) {
      crecimientoHabitacionesAnio = ((ingresosHabAnioActual - ingresosHabAnioAnterior) / ingresosHabAnioAnterior) * 100;
    }

    // 2. Ingresos por Productos (cuenta_espacio y cuenta_persona)
    // Solo items con estado 'pagado' — pendientes no se reconocen como ingreso
    const [productosEspacioActual, productosPersonaActual, productosEspacioAnterior, productosPersonaAnterior, productosEspacioAnio, productosPersonaAnio,
           consumosEspacioRanking, consumosPersonaRanking] = await Promise.all([
      // Mes actual — solo pagado (para cálculos financieros de ingresos)
      prisma.cuenta_espacio.findMany({ where: { fecha_registro: { gte: startOfCurrentMonth, lte: endOfCurrentMonth }, estado: 'pagado' } }),
      prisma.cuenta_persona.findMany({ where: { fecha_registro: { gte: startOfCurrentMonth, lte: endOfCurrentMonth }, estado: 'pagado' } }),
      // Mes anterior
      prisma.cuenta_espacio.findMany({ where: { fecha_registro: { gte: startOfLastMonth, lte: endOfLastMonth }, estado: 'pagado' } }),
      prisma.cuenta_persona.findMany({ where: { fecha_registro: { gte: startOfLastMonth, lte: endOfLastMonth }, estado: 'pagado' } }),
      // Año actual
      prisma.cuenta_espacio.findMany({ where: { fecha_registro: { gte: startOfYear, lte: endOfYear }, estado: 'pagado' } }),
      prisma.cuenta_persona.findMany({ where: { fecha_registro: { gte: startOfYear, lte: endOfYear }, estado: 'pagado' } }),
      // Mes actual — todos los estados excepto anulado (para ranking operacional de top productos)
      prisma.cuenta_espacio.findMany({ where: { fecha_registro: { gte: startOfCurrentMonth, lte: endOfCurrentMonth }, estado: { not: 'anulado' } } }),
      prisma.cuenta_persona.findMany({ where: { fecha_registro: { gte: startOfCurrentMonth, lte: endOfCurrentMonth }, estado: { not: 'anulado' } } }),
    ]);

    const calcTotal = (items) => items.reduce((acc, item) => acc + parseFloat(item.valor_total || 0), 0);

    const ingresosExtrasActual = calcTotal(productosEspacioActual);
    const ingresosPersonaActual = calcTotal(productosPersonaActual);
    const ingresosProdActual = ingresosExtrasActual + ingresosPersonaActual;

    const ingresosProdAnterior = calcTotal(productosEspacioAnterior) + calcTotal(productosPersonaAnterior);

    let crecimientoConsumos = null;
    if (ingresosProdAnterior > 0) {
      crecimientoConsumos = ((ingresosProdActual - ingresosProdAnterior) / ingresosProdAnterior) * 100;
    }

    const ingresosExtrasAnio = calcTotal(productosEspacioAnio);
    const ingresosPersonaAnio = calcTotal(productosPersonaAnio);
    const ingresosProdAnio = ingresosExtrasAnio + ingresosPersonaAnio;

    // 3. Totales
    const ingresosTotales = ingresosHabActual + ingresosProdActual;

    // 4. Estadísticas Operativas (Usando UTC para que coincida con @db.Date de Prisma)
    const todayStart = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
    const todayEnd = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999));

    const [totalEspacios, reservasActivas, llegadasHoy, salidasHoy, reservasConFirma, reservasSinFirma] = await Promise.all([
      prisma.espacio.count({ where: { activo: true } }),
      prisma.reserva.count({ where: { estado_reserva: { in: ['activa', 'confirmada'] } } }),
      // Llegadas de hoy (excluye no_show — si no llegaron no cuentan como llegada activa)
      prisma.reserva.count({
        where: {
          estado_reserva: { notIn: ['cancelada', 'no_show'] },
          check_in: { gte: todayStart, lte: todayEnd }
        }
      }),
      // Salidas de hoy
      prisma.reserva.count({
        where: {
          estado_reserva: { notIn: ['cancelada', 'no_show'] },
          check_out: { gte: todayStart, lte: todayEnd }
        }
      }),
      // In-House CON FIRMA en la reserva (ya llegaron y firmaron esta estadía)
      prisma.reserva.findMany({
        where: {
          estado_reserva: { in: ['activa', 'confirmada'] },
          check_in: { lte: todayEnd },
          check_out: { gte: todayStart }, // Incluir a los que salen hoy mientras la reserva siga activa
          firma: { not: null }
        },
        select: { cantidad_adultos: true, cantidad_ninos: true }
      }),
      // In-House SIN FIRMA (reservados pero aun no han llegado o no han firmado)
      prisma.reserva.count({
        where: {
          estado_reserva: { in: ['activa', 'confirmada'] },
          check_in: { gte: todayStart, lte: todayEnd },
          firma: null
        }
      })
    ]);

    const ocupadasHoy = reservasConFirma.length;
    const huespedesInHouse = reservasConFirma.reduce((acc, r) => acc + (r.cantidad_adultos || 0) + (r.cantidad_ninos || 0), 0);
    const reservasPendientesLlegada = reservasSinFirma;

    // Ocupación a 7 días
    const next7DaysEnd = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() + 6, 23, 59, 59, 999));

    const [reservasFuturas, checkInsHoyDetalle, checkOutsHoyDetalle] = await Promise.all([
      prisma.reserva.findMany({
        where: {
          estado_reserva: { in: ['activa', 'confirmada'] },
          check_in: { lte: next7DaysEnd },
          check_out: { gt: todayStart }
        },
        select: { check_in: true, check_out: true }
      }),
      // Detalle check-ins hoy (excluye no_show)
      prisma.reserva.findMany({
        where: {
          estado_reserva: { notIn: ['cancelada', 'no_show'] },
          check_in: { gte: todayStart, lte: todayEnd }
        },
        include: {
          huesped: { select: { nombre_completo: true } },
          espacio: { select: { numero: true, tipo_habitacion: true } }
        },
        orderBy: { check_in: 'asc' }
      }),
      // Detalle check-outs hoy (excluye no_show)
      prisma.reserva.findMany({
        where: {
          estado_reserva: { notIn: ['cancelada', 'no_show'] },
          check_out: { gte: todayStart, lte: todayEnd }
        },
        include: {
          huesped: { select: { nombre_completo: true } },
          espacio: { select: { numero: true, tipo_habitacion: true } }
        },
        orderBy: { check_out: 'asc' }
      }),
    ]);

    const ocupacion7Dias = [];
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() + i));
      const dayEnd = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() + i, 23, 59, 59, 999));
      const dayStart = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() + i));
      
      const count = reservasFuturas.filter(r => {
        const ci = new Date(r.check_in);
        const co = new Date(r.check_out);
        return ci <= dayEnd && co > dayStart;
      }).length;
      
      ocupacion7Dias.push({
        fecha: dayDate.toISOString().split('T')[0],
        ocupadas: count
      });
    }

    // 5. Top 5 Productos Consumidos (métrica operacional: incluye pendientes y pagados, excluye anulados)
    const productAggregation = {};

    consumosEspacioRanking.forEach(p => {
      if (!productAggregation[p.nombre_producto]) {
        productAggregation[p.nombre_producto] = { cantidad: 0, valor: 0 };
      }
      productAggregation[p.nombre_producto].cantidad += p.cantidad || 1;
      productAggregation[p.nombre_producto].valor += parseFloat(p.valor_total || 0);
    });

    consumosPersonaRanking.forEach(p => {
      const nombre = p.descripcion || p.nombre_persona || 'Cargo Personal';
      if (!productAggregation[nombre]) {
        productAggregation[nombre] = { cantidad: 0, valor: 0 };
      }
      productAggregation[nombre].cantidad += p.cantidad || 1;
      productAggregation[nombre].valor += parseFloat(p.valor_total || 0);
    });

    const topProductos = Object.entries(productAggregation)
      .map(([nombre, datos]) => ({
        nombre,
        cantidad: datos.cantidad,
        valor_total: datos.valor
      }))
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 5);

    // 6. Historial de los últimos 6 meses
    const historialMeses = [];
    for (let i = 5; i >= 0; i--) {
      const mesStart = new Date(Date.UTC(today.getFullYear(), today.getMonth() - i, 1));
      const mesEnd   = new Date(Date.UTC(today.getFullYear(), today.getMonth() - i + 1, 0, 23, 59, 59, 999));

      const [resHabPagadas, resProdEsp, resProdPer, totalReservasMes] = await Promise.all([
        // Solo reservas con pago confirmado
        prisma.reserva.findMany({
          where: {
            estado_reserva: { notIn: ['cancelada', 'no_show'] },
            estado_pago: 'pagado',
            check_in: { gte: mesStart, lte: mesEnd }
          },
          select: { monto_total: true }
        }),
        prisma.cuenta_espacio.findMany({
          where: { fecha_registro: { gte: mesStart, lte: mesEnd }, estado: 'pagado' },
          select: { valor_total: true }
        }),
        prisma.cuenta_persona.findMany({
          where: { fecha_registro: { gte: mesStart, lte: mesEnd }, estado: 'pagado' },
          select: { valor_total: true }
        }),
        // Conteo total de reservas del mes (incluyendo pendientes, para referencia)
        prisma.reserva.count({
          where: {
            estado_reserva: { notIn: ['cancelada', 'no_show'] },
            check_in: { gte: mesStart, lte: mesEnd }
          }
        }),
      ]);

      const totalHab  = resHabPagadas.reduce((a, r) => a + parseFloat(r.monto_total || 0), 0);
      const totalProd = calcTotal(resProdEsp) + calcTotal(resProdPer);

      if (totalHab > 0 || totalProd > 0 || totalReservasMes > 0) {
        const m = mesStart.getUTCMonth();
        const y = mesStart.getUTCFullYear();
        historialMeses.push({
          mesUTCMonth: m,
          mesUTCYear: y,
          mes: `${MESES_CORTOS[m]} ${String(y).slice(2)}`,
          mesCompleto: `${MESES[m]} De ${y}`,
          habitaciones: totalHab,
          productos: totalProd,
          total: totalHab + totalProd,
          numReservas: totalReservasMes,
        });
      }
    }

    const activityToday = {
      // Siempre devuelve todos los check-ins del día con su estado de firma
      // El frontend decide qué mostrar según firma y hora
      checkIns: checkInsHoyDetalle.map(r => ({
        nombre: r.huesped?.nombre_completo || 'Sin nombre',
        hab: r.espacio?.numero,
        tipo: r.espacio?.tipo_habitacion,
        firmado: !!r.firma,
        personas: (r.cantidad_adultos || 1) + (r.cantidad_ninos || 0),
      })),
      // Siempre devuelve todos los check-outs del día con cantidad de personas
      // El frontend usa estos datos para restar del conteo in-house después de la 1 PM
      checkOuts: checkOutsHoyDetalle.map(r => ({
        nombre: r.huesped?.nombre_completo || 'Sin nombre',
        hab: r.espacio?.numero,
        tipo: r.espacio?.tipo_habitacion,
        personas: (r.cantidad_adultos || 1) + (r.cantidad_ninos || 0),
      })),
    };

    // 7. KPIs Operativos
    const [reservasMesEstancia, noShowsMesCount, totalReservasMesCount, pendientesListKpi, reservasActivasTipoList] = await Promise.all([
      prisma.reserva.findMany({
        where: { estado_reserva: { notIn: ['cancelada'] }, check_in: { gte: startOfCurrentMonth, lte: endOfCurrentMonth } },
        select: { check_in: true, check_out: true }
      }),
      prisma.reserva.count({ where: { estado_reserva: 'no_show', check_in: { gte: startOfCurrentMonth, lte: endOfCurrentMonth } } }),
      prisma.reserva.count({ where: { check_in: { gte: startOfCurrentMonth, lte: endOfCurrentMonth } } }),
      prisma.reserva.findMany({
        where: { estado_reserva: { in: ['activa', 'confirmada'] }, estado_pago: { not: 'pagado' } },
        select: { monto_total: true }
      }),
      prisma.reserva.findMany({
        where: { estado_reserva: { in: ['activa', 'confirmada'] } },
        include: { espacio: { select: { tipo_habitacion: true, tipo_espacio: true } } }
      })
    ]);

    const estanciaPromedio = reservasMesEstancia.length > 0
      ? reservasMesEstancia.reduce((acc, r) => {
          const noches = Math.max(1, Math.round((new Date(r.check_out) - new Date(r.check_in)) / 86400000));
          return acc + noches;
        }, 0) / reservasMesEstancia.length
      : 0;

    const noShowsRate = totalReservasMesCount > 0 ? (noShowsMesCount / totalReservasMesCount) * 100 : 0;
    const pendientesTotal = pendientesListKpi.reduce((acc, r) => acc + parseFloat(r.monto_total || 0), 0);

    const ocupacionPorTipoMap = {};
    reservasActivasTipoList.forEach(r => {
      const tipo = r.espacio?.tipo_habitacion
        ? (r.espacio.tipo_habitacion.charAt(0).toUpperCase() + r.espacio.tipo_habitacion.slice(1).toLowerCase())
        : (r.espacio?.tipo_espacio === 'salon' ? 'Salón' : 'Otro');
      ocupacionPorTipoMap[tipo] = (ocupacionPorTipoMap[tipo] || 0) + 1;
    });
    const ocupacionPorTipo = Object.entries(ocupacionPorTipoMap).map(([tipo, count]) => ({ tipo, count }));

    // 8. Alertas (todayStart ya está declarado arriba, línea 120)
    const manana = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() + 1));
    const mananaEnd = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() + 1, 23, 59, 59, 999));
    const en7Dias = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() + 7, 23, 59, 59, 999));

    const [checkOutsManana, pagosPendientes, minibarVencimiento, reservasNoShow] = await Promise.all([
      // Check-outs mañana (excluye no_show)
      prisma.reserva.findMany({
        where: { estado_reserva: { notIn: ['cancelada', 'no_show'] }, check_out: { gte: manana, lte: mananaEnd } },
        include: { huesped: { select: { nombre_completo: true } }, espacio: { select: { numero: true } } }
      }),
      // Reservas activas/confirmadas con pago pendiente y que hacen check-out mañana
      prisma.reserva.findMany({
        where: { 
          estado_reserva: { in: ['activa', 'confirmada'] }, 
          estado_pago: { not: 'pagado' },
          check_out: { gte: manana, lte: mananaEnd }
        },
        include: { huesped: { select: { nombre_completo: true } }, espacio: { select: { numero: true } } },
        orderBy: { check_in: 'asc' }
      }),
      // Minibar con vencimiento en los próximos 7 días
      prisma.inventario_minibar.findMany({
        where: { fecha_vencimiento: { gte: todayStart, lte: en7Dias } },
        include: { espacio: { select: { numero: true } } },
        orderBy: { fecha_vencimiento: 'asc' }
      }),
      // No-shows: reservas marcadas como no_show (no se presentaron)
      prisma.reserva.findMany({
        where: { estado_reserva: 'no_show' },
        include: {
          huesped: { select: { nombre_completo: true } },
          espacio: { select: { numero: true } }
        },
        orderBy: { check_in: 'desc' },
        take: 10
      })
    ]);

    const alertas = {
      checkOutsManana: checkOutsManana.map(r => ({
        nombre: r.huesped?.nombre_completo || 'Sin nombre',
        hab: r.espacio?.numero
      })),
      pagosPendientes: pagosPendientes.map(r => ({
        nombre: r.huesped?.nombre_completo || 'Sin nombre',
        hab: r.espacio?.numero,
        monto: parseFloat(r.monto_total || 0)
      })),
      minibarVencimiento: minibarVencimiento.map(m => ({
        producto: m.nombre_producto,
        hab: m.espacio?.numero,
        fecha: m.fecha_vencimiento
      })),
      noShows: reservasNoShow.map(r => ({
        nombre: r.huesped?.nombre_completo || 'Sin nombre',
        hab: r.espacio?.numero,
        checkIn: r.check_in,
        checkOut: r.check_out,
        id_reserva: r.id_reserva
      }))
    };

    res.json({
      estadisticas: {
        habitacionesActivas: totalEspacios,
        huespedesInHouse,
        reservasPendientesLlegada,
        reservasActivas,
        llegadasHoy,
        salidasHoy,
        ocupadasHoy,
        ingresosTotales,
        ingresosHabActual,
        ingresosHabAnterior,
        crecimientoHabitaciones,
        ingresosHabAnioActual,
        crecimientoHabitacionesAnio,
        ingresosExtrasActual,
        ingresosPersonaActual,
        ingresosProdActual,
        ingresosProdAnterior,
        crecimientoConsumos,
        ingresosExtrasAnio,
        ingresosPersonaAnio,
        ingresosProdAnio,
        estanciaPromedio: parseFloat(estanciaPromedio.toFixed(1)),
        noShowsRate: parseFloat(noShowsRate.toFixed(1)),
        noShowsMes: noShowsMesCount,
        pendientesTotal,
        ocupacionPorTipo
      },
      historialMeses,
      ocupacion7Dias,
      topProductos,
      activityToday,
      alertas
    });

  } catch (error) {
    console.error('Error in getDashboardStats:', error);
    res.status(500).json({ error: 'Error interno al obtener estadísticas' });
  }
};

module.exports = {
  getDashboardStats
};
