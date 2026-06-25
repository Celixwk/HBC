const prisma = require('../config/prisma');

// ===================== CUENTA ESPACIO =====================

const getCuentasEspacio = async (req, res) => {
  try {
    const items = await prisma.cuenta_espacio.findMany({
      where: { reserva: { estado_reserva: { in: ['activa', 'confirmada', 'no_show'] } } },
      include: { reserva: { include: { espacio: true, huesped: true } } },
      orderBy: { fecha_registro: 'desc' }
    });
    res.json(items);
  } catch (error) {
    console.error('Error al obtener cuentas espacio:', error);
    res.status(500).json({ error: 'Error al obtener los cargos de habitación' });
  }
};

const createCuentaEspacio = async (req, res) => {
  const { id_reserva, nombre_producto, cantidad, valor_unitario, anotaciones } = req.body;
  try {
    if (!id_reserva || !nombre_producto || !cantidad || !valor_unitario)
      return res.status(400).json({ error: 'Faltan campos requeridos' });

    const nuevo = await prisma.cuenta_espacio.create({
      data: {
        id_reserva: parseInt(id_reserva),
        nombre_producto,
        cantidad: parseInt(cantidad),
        valor_unitario: parseFloat(valor_unitario),
        anotaciones
      },
      include: { reserva: { include: { espacio: true, huesped: true } } }
    });

    // Descontar del inventario del minibar si existe
    if (nuevo.reserva && nuevo.reserva.id_espacio) {
      const inventario = await prisma.inventario_minibar.findFirst({
        where: { id_espacio: nuevo.reserva.id_espacio, nombre_producto: nombre_producto }
      });
      if (inventario) {
        await prisma.inventario_minibar.update({
          where: { id_inventario: inventario.id_inventario },
          data: { cantidad: Math.max(0, inventario.cantidad - parseInt(cantidad)) }
        });
      }
    }

    // Descontar del inventario general si el producto existe (silencioso, no bloquea)
    try {
      const prod = await prisma.producto_inventario.findFirst({
        where: { nombre: { equals: nombre_producto, mode: 'insensitive' }, activo: true }
      });
      if (prod) {
        const cantNum = parseInt(cantidad);
        const stockAntes = Number(prod.stock_actual);
        await prisma.$transaction([
          prisma.producto_inventario.update({
            where: { id_producto: prod.id_producto },
            data: { stock_actual: Math.max(0, stockAntes - cantNum) }
          }),
          prisma.movimiento_inventario.create({
            data: {
              id_producto: prod.id_producto,
              tipo: 'salida',
              motivo: 'consumo_habitacion',
              cantidad: cantNum,
              stock_antes: stockAntes,
              stock_despues: Math.max(0, stockAntes - cantNum),
              precio_unitario: parseFloat(valor_unitario),
              referencia_id: nuevo.id_item,
              referencia_tipo: 'cuenta_espacio'
            }
          })
        ]);
      }
    } catch (_) {}

    res.status(201).json(nuevo);
  } catch (error) {
    console.error('Error al crear cargo espacio:', error);
    res.status(500).json({ error: 'Error al crear el cargo' });
  }
};

const updateCuentaEspacio = async (req, res) => {
  const { id } = req.params;
  const { nombre_producto, cantidad, valor_unitario, anotaciones } = req.body;
  try {
    const updated = await prisma.cuenta_espacio.update({
      where: { id_item: parseInt(id) },
      data: {
        nombre_producto,
        cantidad: parseInt(cantidad),
        valor_unitario: parseFloat(valor_unitario),
        anotaciones
      }
    });
    res.json(updated);
  } catch (error) {
    console.error('Error al actualizar cargo espacio:', error);
    res.status(500).json({ error: 'Error al actualizar el cargo' });
  }
};

const cambiarEstadoCuentaEspacio = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    if (!['pendiente', 'pagado', 'anulado'].includes(estado)) {
      return res.status(400).json({ error: 'Estado inválido' });
    }
    const updated = await prisma.cuenta_espacio.update({
      where: { id_item: parseInt(id) },
      data: { estado }
    });
    res.json(updated);
  } catch (error) {
    console.error('Error al cambiar estado de cargo espacio:', error);
    res.status(500).json({ error: 'Error al cambiar el estado del cargo' });
  }
};

const deleteCuentaEspacio = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.cuenta_espacio.delete({ where: { id_item: parseInt(id) } });
    res.json({ message: 'Cargo eliminado' });
  } catch (error) {
    console.error('Error al eliminar cargo espacio:', error);
    res.status(500).json({ error: 'Error al eliminar el cargo' });
  }
};

// ===================== CUENTA PERSONA =====================

const getCuentasPersona = async (req, res) => {
  try {
    const items = await prisma.cuenta_persona.findMany({
      include: { huesped: true, reserva: { include: { espacio: true } } },
      orderBy: { fecha_registro: 'desc' }
    });
    res.json(items);
  } catch (error) {
    console.error('Error al obtener cuentas persona:', error);
    res.status(500).json({ error: 'Error al obtener los cargos de persona' });
  }
};

const createCuentaPersona = async (req, res) => {
  const { id_huesped, nombre_persona, id_reserva, descripcion, cantidad, valor_unitario } = req.body;
  try {
    if (!nombre_persona || !descripcion || !cantidad || !valor_unitario)
      return res.status(400).json({ error: 'Faltan campos requeridos' });

    const nuevo = await prisma.cuenta_persona.create({
      data: {
        id_huesped: id_huesped ? parseInt(id_huesped) : null,
        nombre_persona,
        id_reserva: id_reserva ? parseInt(id_reserva) : null,
        descripcion,
        cantidad: parseInt(cantidad),
        valor_unitario: parseFloat(valor_unitario)
      },
      include: { huesped: true, reserva: { include: { espacio: true } } }
    });

    // Descontar del inventario general si el producto coincide (silencioso, no bloquea)
    try {
      const prod = await prisma.producto_inventario.findFirst({
        where: { nombre: { equals: descripcion, mode: 'insensitive' }, activo: true }
      });
      if (prod) {
        const cantNum = parseInt(cantidad);
        const stockAntes = Number(prod.stock_actual);
        await prisma.$transaction([
          prisma.producto_inventario.update({
            where: { id_producto: prod.id_producto },
            data: { stock_actual: Math.max(0, stockAntes - cantNum) }
          }),
          prisma.movimiento_inventario.create({
            data: {
              id_producto: prod.id_producto,
              tipo: 'salida',
              motivo: 'consumo_persona',
              cantidad: cantNum,
              stock_antes: stockAntes,
              stock_despues: Math.max(0, stockAntes - cantNum),
              precio_unitario: parseFloat(valor_unitario),
              referencia_id: nuevo.id_item_persona,
              referencia_tipo: 'cuenta_persona'
            }
          })
        ]);
      }
    } catch (_) {}

    res.status(201).json(nuevo);
  } catch (error) {
    console.error('Error al crear cargo persona:', error);
    res.status(500).json({ error: 'Error al crear el cargo' });
  }
};

const updateCuentaPersona = async (req, res) => {
  const { id } = req.params;
  const { descripcion, cantidad, valor_unitario } = req.body;
  try {
    const updated = await prisma.cuenta_persona.update({
      where: { id_item_persona: parseInt(id) },
      data: { descripcion, cantidad: parseInt(cantidad), valor_unitario: parseFloat(valor_unitario) }
    });
    res.json(updated);
  } catch (error) {
    console.error('Error al actualizar cargo persona:', error);
    res.status(500).json({ error: 'Error al actualizar el cargo' });
  }
};

const cambiarEstadoCuentaPersona = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    if (!['pendiente', 'pagado', 'anulado'].includes(estado)) {
      return res.status(400).json({ error: 'Estado inválido' });
    }
    const updated = await prisma.cuenta_persona.update({
      where: { id_item_persona: parseInt(id) },
      data: { estado }
    });
    res.json(updated);
  } catch (error) {
    console.error('Error al cambiar estado de cargo persona:', error);
    res.status(500).json({ error: 'Error al cambiar el estado del cargo' });
  }
};

const deleteCuentaPersona = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.cuenta_persona.delete({ where: { id_item_persona: parseInt(id) } });
    res.json({ message: 'Cargo eliminado' });
  } catch (error) {
    console.error('Error al eliminar cargo persona:', error);
    res.status(500).json({ error: 'Error al eliminar el cargo' });
  }
};

// ===================== HISTORIAL GENERAL DE CUENTAS =====================

const getHistorialCuentas = async (req, res) => {
  try {
    const [espacio, persona] = await Promise.all([
      prisma.cuenta_espacio.findMany({
        include: { reserva: { include: { espacio: true, huesped: true } } },
        orderBy: { fecha_registro: 'desc' }
      }),
      prisma.cuenta_persona.findMany({
        include: { huesped: true, reserva: { include: { espacio: true } } },
        orderBy: { fecha_registro: 'desc' }
      })
    ]);

    const formattedEspacio = espacio.map(e => ({
      id: `espacio_${e.id_item}`,
      originalId: e.id_item,
      tipo: 'Habitación',
      detalle: e.nombre_producto,
      cantidad: e.cantidad,
      valor_unitario: e.valor_unitario,
      valor_total: e.valor_total,
      estado: e.estado,
      fecha_registro: e.fecha_registro,
      cliente: e.reserva?.huesped?.nombre_completo || 'N/A',
      referencia: e.reserva?.espacio?.numero || 'N/A'
    }));

    const formattedPersona = persona.map(p => ({
      id: `persona_${p.id_item_persona}`,
      originalId: p.id_item_persona,
      tipo: 'Persona',
      detalle: p.descripcion,
      cantidad: p.cantidad,
      valor_unitario: p.valor_unitario,
      valor_total: p.valor_total,
      estado: p.estado,
      fecha_registro: p.fecha_registro,
      cliente: p.huesped?.nombre_completo || p.nombre_persona,
      referencia: p.reserva?.espacio?.numero || 'Externo'
    }));

    const historialCombinado = [...formattedEspacio, ...formattedPersona].sort(
      (a, b) => new Date(b.fecha_registro) - new Date(a.fecha_registro)
    );

    res.json(historialCombinado);
  } catch (error) {
    console.error('Error al obtener historial de cuentas:', error);
    res.status(500).json({ error: 'Error al obtener el historial de cuentas' });
  }
};

// ===================== HISTORIAL POR HABITACIÓN =====================

const getHistorialHabitaciones = async (req, res) => {
  try {
    // Obtener TODAS las reservas de habitación (incluyendo completadas)
    const reservas = await prisma.reserva.findMany({
      where: { tipo_reserva: 'alojamiento' },
      include: {
        espacio: true,
        huesped: true,
        cuenta_espacio: true
      },
      orderBy: { check_in: 'desc' }
    });

    const result = reservas.map(r => {
      const extras = r.cuenta_espacio || [];
      // Solo sumar extras efectivamente cobrados (estado = 'pagado')
      const totalExtras = extras
        .filter(item => item.estado === 'pagado')
        .reduce((acc, item) => acc + parseFloat(item.valor_total || 0), 0);
      // El monto de habitación solo cuenta si la reserva está marcada como pagada
      const montoHabitacion = r.estado_pago === 'pagado' ? parseFloat(r.monto_total || 0) : 0;
      const totalGeneral = montoHabitacion + totalExtras;

      // Tipo de ocupación
      const adultos = r.cantidad_adultos || 0;
      const ninos = r.cantidad_ninos || 0;
      let tipoOcupacion = 'Individual';
      if (adultos === 2 && ninos === 0) tipoOcupacion = 'Pareja';
      else if (adultos === 2 && ninos > 0) tipoOcupacion = `Pareja + ${ninos} niño(s)`;
      else if (adultos > 2) tipoOcupacion = `Familiar (${adultos} adultos + ${ninos} niños)`;
      else if (adultos === 1 && ninos > 0) tipoOcupacion = `Individual + ${ninos} niño(s)`;

      return {
        id_reserva: r.id_reserva,
        numero_habitacion: r.espacio?.numero || 'N/A',
        tipo_habitacion: r.espacio?.tipo_habitacion || 'N/A',
        huesped: r.huesped?.nombre_completo || 'N/A',
        check_in: r.check_in,
        check_out: r.check_out,
        estado_reserva: r.estado_reserva,
        tipo_ocupacion: tipoOcupacion,
        cantidad_adultos: adultos,
        cantidad_ninos: ninos,
        monto_habitacion: montoHabitacion,
        extras: extras.map(e => ({
          id: e.id_item,
          nombre: e.nombre_producto,
          cantidad: e.cantidad,
          valor_total: parseFloat(e.valor_total || 0),
          estado: e.estado || 'pendiente'
        })),
        total_extras: totalExtras,
        total_general: totalGeneral
      };
    });

    res.json(result);
  } catch (error) {
    console.error('Error al obtener historial de habitaciones:', error);
    res.status(500).json({ error: 'Error al obtener el historial de habitaciones' });
  }
};

// ===================== HISTORIAL POR PERSONA =====================

const getHistorialPersonas = async (req, res) => {
  try {
    const cargos = await prisma.cuenta_persona.findMany({
      include: { huesped: true, reserva: { include: { espacio: true } } },
      orderBy: { fecha_registro: 'desc' }
    });

    // Agrupar por nombre_persona
    const grouped = {};
    cargos.forEach(c => {
      const key = c.nombre_persona || (c.huesped?.nombre_completo) || 'Sin nombre';
      if (!grouped[key]) {
        grouped[key] = {
          nombre: key,
          id_huesped: c.id_huesped,
          cargos: []
        };
      }
      grouped[key].cargos.push({
        id: c.id_item_persona,
        descripcion: c.descripcion,
        cantidad: c.cantidad,
        valor_unitario: parseFloat(c.valor_unitario || 0),
        valor_total: parseFloat(c.valor_total || 0),
        estado: c.estado || 'pendiente',
        fecha_registro: c.fecha_registro,
        referencia_hab: c.reserva?.espacio?.numero || 'Externo'
      });
    });

    const result = Object.values(grouped).map(g => ({
      nombre: g.nombre,
      id_huesped: g.id_huesped,
      cargos: g.cargos,
      total_pendiente: g.cargos.filter(c => c.estado === 'pendiente' || !c.estado).reduce((a, c) => a + c.valor_total, 0),
      total_pagado: g.cargos.filter(c => c.estado === 'pagado').reduce((a, c) => a + c.valor_total, 0),
      total_anulado: g.cargos.filter(c => c.estado === 'anulado').reduce((a, c) => a + c.valor_total, 0),
    }));

    res.json(result);
  } catch (error) {
    console.error('Error al obtener historial de personas:', error);
    res.status(500).json({ error: 'Error al obtener el historial de personas' });
  }
};

// ===================== INVENTARIO MINIBAR =====================

const getInventarioMinibar = async (req, res) => {
  try {
    const items = await prisma.inventario_minibar.findMany({
      include: { espacio: true },
      orderBy: { fecha_actualizacion: 'desc' }
    });
    res.json(items);
  } catch (error) {
    console.error('Error al obtener inventario minibar:', error);
    res.status(500).json({ error: 'Error al obtener el inventario' });
  }
};

const createInventarioMinibar = async (req, res) => {
  const { id_espacio, nombre_producto, cantidad, precio_unitario, fecha_vencimiento } = req.body;
  try {
    if (!id_espacio || !nombre_producto || !precio_unitario)
      return res.status(400).json({ error: 'Faltan campos requeridos' });

    const nuevo = await prisma.inventario_minibar.create({
      data: {
        id_espacio: parseInt(id_espacio),
        nombre_producto,
        cantidad: parseInt(cantidad) || 0,
        precio_unitario: parseFloat(precio_unitario),
        fecha_vencimiento: fecha_vencimiento ? new Date(fecha_vencimiento) : null
      },
      include: { espacio: true }
    });
    res.status(201).json(nuevo);
  } catch (error) {
    console.error('Error al crear ítem minibar:', error);
    res.status(500).json({ error: 'Error al crear el ítem' });
  }
};

const updateInventarioMinibar = async (req, res) => {
  const { id } = req.params;
  const { nombre_producto, cantidad, precio_unitario, fecha_vencimiento } = req.body;
  try {
    const updated = await prisma.inventario_minibar.update({
      where: { id_inventario: parseInt(id) },
      data: {
        nombre_producto,
        cantidad: parseInt(cantidad),
        precio_unitario: parseFloat(precio_unitario),
        fecha_vencimiento: fecha_vencimiento ? new Date(fecha_vencimiento) : null
      }
    });
    res.json(updated);
  } catch (error) {
    console.error('Error al actualizar minibar:', error);
    res.status(500).json({ error: 'Error al actualizar el ítem' });
  }
};

const deleteInventarioMinibar = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.inventario_minibar.delete({ where: { id_inventario: parseInt(id) } });
    res.json({ message: 'Ítem eliminado' });
  } catch (error) {
    console.error('Error al eliminar minibar:', error);
    res.status(500).json({ error: 'Error al eliminar el ítem' });
  }
};

module.exports = {
  getCuentasEspacio, createCuentaEspacio, updateCuentaEspacio, deleteCuentaEspacio, cambiarEstadoCuentaEspacio,
  getCuentasPersona, createCuentaPersona, updateCuentaPersona, deleteCuentaPersona, cambiarEstadoCuentaPersona,
  getHistorialCuentas, getHistorialHabitaciones, getHistorialPersonas,
  getInventarioMinibar, createInventarioMinibar, updateInventarioMinibar, deleteInventarioMinibar
};
