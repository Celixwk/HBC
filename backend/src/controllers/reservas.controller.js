const prisma = require('../config/prisma');
const { registrarLog } = require('./audit.controller');

// Obtener todas las reservas (con auto-mark de no-show y completadas)
const getReservas = async (req, res) => {
  try {
    // (El auto-mark de completadas y no-show fue removido por solicitud del usuario para permitir control manual)

    // 3. Retornar todas (excluyendo no_show y canceladas del calendario — el front las filtrará)
    const reservas = await prisma.reserva.findMany({
      include: { espacio: true, huesped: true },
      orderBy: { check_in: 'asc' }
    });

    res.json(reservas);
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    res.status(500).json({ error: 'Error al obtener las reservas' });
  }
};

// Crear una nueva reserva
const createReserva = async (req, res) => {
  const {
    id_huesped,
    id_espacio,
    check_in,
    check_out,
    estado_reserva,
    monto_total,
    anotaciones,
    cantidad_adultos,
    cantidad_ninos,
    tipo_reserva,
    fecha_evento,
    hora_inicio,
    hora_fin,
    precio_noche_snapshot,  // precio congelado por noche al momento de crear
    temporada_tipo          // "alta", "media", "baja" — informativo
  } = req.body;

  try {
    // Basic validation
    if (!id_huesped || !id_espacio || !check_in || !check_out) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const espaciosArray = Array.isArray(id_espacio) ? id_espacio : [id_espacio];
    const parsedCheckIn = new Date(check_in.slice(0,10) + 'T12:00:00Z');
    const parsedCheckOut = new Date(check_out.slice(0,10) + 'T12:00:00Z');

    const nuevasReservas = [];

    for (const espacioId of espaciosArray) {
      const overlapping = await prisma.reserva.findFirst({
        where: {
          id_espacio: parseInt(espacioId),
          AND: [
            { check_in: { lt: parsedCheckOut } },
            { check_out: { gt: parsedCheckIn } }
          ],
          estado_reserva: { notIn: ['cancelada', 'no_show'] }
        }
      });

      if (overlapping) {
        return res.status(400).json({ error: `La habitación con ID ${espacioId} no está disponible en las fechas seleccionadas.` });
      }

      const nuevaReserva = await prisma.reserva.create({
        data: {
          id_huesped: parseInt(id_huesped),
          id_espacio: parseInt(espacioId),
          check_in: parsedCheckIn,
          check_out: parsedCheckOut,
          estado_reserva: estado_reserva || 'activa',
          monto_total,
          anotaciones,
          cantidad_adultos: cantidad_adultos || 1,
          cantidad_ninos: cantidad_ninos || 0,
          tipo_reserva: tipo_reserva || 'alojamiento',
          fecha_evento: fecha_evento ? new Date(fecha_evento) : null,
          hora_inicio: hora_inicio || null,
          hora_fin: hora_fin || null,
          // Congelar el precio por noche en el momento de la creación
          precio_noche_snapshot: precio_noche_snapshot ? parseFloat(precio_noche_snapshot) : null,
          temporada_tipo: temporada_tipo || null
        },
        include: {
          espacio: true,
          huesped: true
        }
      });

      nuevasReservas.push(nuevaReserva);
    }
    
    if (Array.isArray(id_espacio)) {
      res.status(201).json(nuevasReservas);
    } else {
      res.status(201).json(nuevasReservas[0]);
    }
  } catch (error) {
    console.error('Error al crear reserva:', error);
    res.status(500).json({ error: 'Error al crear la reserva' });
  }
};

// Update reservation dates
const updateReservaDates = async (req, res) => {
  const { id } = req.params;
  const { check_in, check_out } = req.body;

  try {
    const parsedCheckIn = new Date(check_in.slice(0,10) + 'T12:00:00Z');
    const parsedCheckOut = new Date(check_out.slice(0,10) + 'T12:00:00Z');

    const reserva = await prisma.reserva.findUnique({ where: { id_reserva: parseInt(id) } });
    if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });

    const overlapping = await prisma.reserva.findFirst({
      where: {
        id_espacio: reserva.id_espacio,
        id_reserva: { not: parseInt(id) },
        AND: [
          { check_in: { lt: parsedCheckOut } },
          { check_out: { gt: parsedCheckIn } }
        ]
      }
    });

    if (overlapping) {
      return res.status(400).json({ error: 'La habitación no está disponible en las nuevas fechas.' });
    }

    const updated = await prisma.reserva.update({
      where: { id_reserva: parseInt(id) },
      data: { check_in: parsedCheckIn, check_out: parsedCheckOut },
      include: { espacio: true, huesped: true }
    });

    res.json(updated);
  } catch (error) {
    console.error('Error al actualizar reserva:', error);
    res.status(500).json({ error: 'Error al actualizar reserva' });
  }
};

// Delete reservation (cascade → cuenta_espacio → cuenta_persona → reserva)
// El huésped se mantiene en el historial aunque quede sin reservas activas.
const deleteReserva = async (req, res) => {
  const { id } = req.params;
  try {
    const idReserva = parseInt(id);

    const reserva = await prisma.reserva.findUnique({
      where: { id_reserva: idReserva },
      select: { id_huesped: true }
    });
    if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });

    // Eliminar dependencias en cascada antes de borrar la reserva
    await prisma.cuenta_espacio.deleteMany({ where: { id_reserva: idReserva } });
    await prisma.cuenta_persona.deleteMany({ where: { id_reserva: idReserva } });
    await prisma.reserva.delete({ where: { id_reserva: idReserva } });

    // NOTA: El huésped NO se elimina aunque quede sin reservas.
    // Debe permanecer en el historial y estar disponible para nuevas reservas.

    res.json({ success: true });
  } catch (error) {
    console.error('Error al eliminar reserva:', error);
    res.status(500).json({ error: 'Error al eliminar reserva' });
  }
};

// Actualizar estado de reserva
const updateReservaEstado = async (req, res) => {
  const { id } = req.params;
  const { estado_reserva } = req.body;
  try {
    const updated = await prisma.reserva.update({
      where: { id_reserva: parseInt(id) },
      data: { estado_reserva }
    });

    if (estado_reserva === 'completada') {
      await prisma.espacio.update({
        where: { id_espacio: updated.id_espacio },
        data: { estado_limpieza: 'sucia' }
      });
    }
    res.json(updated);
  } catch (error) {
    console.error('Error al actualizar estado:', error);
    res.status(500).json({ error: 'Error al actualizar el estado de la reserva' });
  }
};


// Actualizar estado de pago
const updateReservaPago = async (req, res) => {
  const { id } = req.params;
  const { estado_pago, monto_pagado, metodo_pago } = req.body;
  try {
    const updated = await prisma.reserva.update({
      where: { id_reserva: parseInt(id) },
      data: {
        estado_pago,
        metodo_pago,
        monto_pagado: monto_pagado != null ? parseFloat(monto_pagado) : undefined
      }
    });
    res.json(updated);
  } catch (error) {
    console.error('Error al actualizar pago:', error);
    res.status(500).json({ error: 'Error al actualizar el pago de la reserva' });
  }
};

// Actualizar titular de la reserva
const updateReservaHuesped = async (req, res) => {
  const { id } = req.params;
  const { id_huesped, anotacion_extra } = req.body;
  try {
    const reserva = await prisma.reserva.findUnique({
      where: { id_reserva: parseInt(id) }
    });

    if (!reserva) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }

    const nuevaAnotacion = reserva.anotaciones 
      ? `${reserva.anotaciones}\n${anotacion_extra || ''}` 
      : (anotacion_extra || null);

    const updated = await prisma.reserva.update({
      where: { id_reserva: parseInt(id) },
      data: {
        id_huesped: parseInt(id_huesped),
        anotaciones: nuevaAnotacion
      },
      include: {
        huesped: true
      }
    });
    res.json(updated);
  } catch (error) {
    console.error('Error al actualizar titular:', error);
    res.status(500).json({ error: 'Error al cambiar el titular de la reserva' });
  }
};

// Actualizar todos los campos de una reserva (room, guests, dates, monto)
const updateReservaFull = async (req, res) => {
  const { id } = req.params;
  const { id_espacio, check_in, check_out, cantidad_adultos, cantidad_ninos, monto_total, anotaciones, fecha_evento, hora_inicio, hora_fin } = req.body;

  try {
    const parsedCheckIn  = new Date(check_in.slice(0,10) + 'T12:00:00Z');
    const parsedCheckOut = new Date(check_out.slice(0,10) + 'T12:00:00Z');
    const idReserva = parseInt(id);
    const idEspacio = parseInt(id_espacio);

    // Verificar solapamiento excluyendo la reserva actual
    const overlapping = await prisma.reserva.findFirst({
      where: {
        id_espacio: idEspacio,
        id_reserva: { not: idReserva },
        estado_reserva: { notIn: ['cancelada', 'no_show'] },
        AND: [
          { check_in: { lt: parsedCheckOut } },
          { check_out: { gt: parsedCheckIn } }
        ]
      }
    });

    if (overlapping) {
      return res.status(400).json({ error: 'La habitación no está disponible en las fechas seleccionadas.' });
    }

    // Leer el estado de pago actual para decidir si hay que revertirlo
    const reservaActual = await prisma.reserva.findUnique({
      where: { id_reserva: idReserva },
      select: { monto_pagado: true, estado_pago: true }
    });

    const nuevoMonto = parseFloat(monto_total) || 0;
    const montoPagado = reservaActual ? parseFloat(reservaActual.monto_pagado || 0) : 0;

    // Si el nuevo total supera lo ya pagado, el estado de pago debe volver a pendiente
    const nuevoEstadoPago = (nuevoMonto > montoPagado) ? 'pendiente' : undefined;

    const dataUpdate = {
      id_espacio: idEspacio,
      check_in: parsedCheckIn,
      check_out: parsedCheckOut,
      cantidad_adultos: parseInt(cantidad_adultos) || 1,
      cantidad_ninos: parseInt(cantidad_ninos) || 0,
      monto_total: nuevoMonto,
      anotaciones: anotaciones || null,
      fecha_evento: fecha_evento ? new Date(fecha_evento) : null,
      hora_inicio: hora_inicio || null,
      hora_fin: hora_fin || null
    };

    if (nuevoEstadoPago) dataUpdate.estado_pago = nuevoEstadoPago;

    const updated = await prisma.reserva.update({
      where: { id_reserva: idReserva },
      data: dataUpdate,
      include: { espacio: true, huesped: true }
    });

    res.json(updated);
  } catch (error) {
    console.error('Error al actualizar reserva:', error);
    res.status(500).json({ error: 'Error al actualizar la reserva' });
  }
};

const updateReservaMonto = async (req, res) => {
  const { id } = req.params;
  const { monto_total } = req.body;
  try {
    const updated = await prisma.reserva.update({
      where: { id_reserva: parseInt(id) },
      data: { monto_total: parseFloat(monto_total) }
    });
    res.json(updated);
  } catch (error) {
    console.error('Error al actualizar monto:', error);
    res.status(500).json({ error: 'Error al actualizar monto' });
  }
};

const reactivarReserva = async (req, res) => {
  const { id } = req.params;
  try {
    const reserva = await prisma.reserva.findUnique({ where: { id_reserva: parseInt(id) } });
    if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });

    const updated = await prisma.reserva.update({
      where: { id_reserva: parseInt(id) },
      data: {
        estado_reserva: 'activa',
        // Si el pago estaba 'completada' pero no pagado, dejamos estado_pago como estaba
      },
      include: { espacio: true, huesped: true }
    });
    res.json(updated);
  } catch (error) {
    console.error('Error al reactivar reserva:', error);
    res.status(500).json({ error: 'Error al reactivar la reserva' });
  }
};

const extenderReserva = async (req, res) => {
  const { id } = req.params;
  const { check_out, monto_total } = req.body;
  try {
    if (!check_out) return res.status(400).json({ error: 'Se requiere la nueva fecha de check_out' });

    const [y, m, d] = check_out.split('-');
    const parsedCheckOut = new Date(Date.UTC(y, m - 1, d));
    const idReserva = parseInt(id);

    const data = { check_out: parsedCheckOut };

    if (monto_total !== undefined && monto_total !== null && monto_total !== '') {
      const nuevoMonto = parseFloat(monto_total);
      data.monto_total = nuevoMonto;

      // Si el nuevo total supera lo ya pagado, revertir estado de pago a pendiente
      const reservaActual = await prisma.reserva.findUnique({
        where: { id_reserva: idReserva },
        select: { monto_pagado: true, estado_pago: true }
      });
      const montoPagado = reservaActual ? parseFloat(reservaActual.monto_pagado || 0) : 0;
      if (nuevoMonto > montoPagado) {
        data.estado_pago = 'pendiente';
      }
    }

    const updated = await prisma.reserva.update({
      where: { id_reserva: idReserva },
      data,
      include: { espacio: true, huesped: true }
    });
    res.json(updated);
  } catch (error) {
    console.error('Error al extender reserva:', error);
    res.status(500).json({ error: 'Error al extender la reserva' });
  }
};
const updateReservaOrigen = async (req, res) => {
  const { id } = req.params;
  const { origen } = req.body;
  try {
    const updated = await prisma.reserva.update({
      where: { id_reserva: parseInt(id) },
      data: { origen }
    });
    res.json(updated);
  } catch (error) {
    console.error('Error al actualizar origen de reserva:', error);
    res.status(500).json({ error: 'Error al actualizar el origen de la reserva' });
  }
};

module.exports = {
  getReservas,
  createReserva,
  updateReservaDates,
  updateReservaFull,
  deleteReserva,
  updateReservaEstado,
  updateReservaPago,
  updateReservaHuesped,
  updateReservaMonto,
  reactivarReserva,
  extenderReserva,
  updateReservaOrigen
};
