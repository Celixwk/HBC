const prisma = require('../config/prisma');

// Obtener todas las reservas (con auto-mark de no-show y completadas)
const getReservas = async (req, res) => {
  try {
    const hoy = new Date();
    const inicioDia = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    const finDia    = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 23, 59, 59, 999);

    // Hora actual en minutos (para comparar con horarios de check-in/out)
    const minutoActual = hoy.getHours() * 60 + hoy.getMinutes();
    const CHECKOUT_MIN = 13 * 60; // 1:00 PM
    const CHECKIN_MIN  = 15 * 60; // 3:00 PM

    // 1. Auto-marcar como 'completada':
    //    - check_out anterior a hoy (ya venció), O
    //    - check_out es hoy y ya pasó la 1 PM (hora de salida)
    const limitCompletada = (minutoActual >= CHECKOUT_MIN) ? finDia : inicioDia;

    await prisma.reserva.updateMany({
      where: {
        estado_reserva: { in: ['activa', 'confirmada'] },
        check_out: { lt: limitCompletada }
      },
      data: { estado_reserva: 'completada' }
    });

    // (El auto-mark de no-show fue removido por solicitud del usuario para permitir control manual)

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
    hora_fin
  } = req.body;

  try {
    // Basic validation
    if (!id_huesped || !id_espacio || !check_in || !check_out) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const espaciosArray = Array.isArray(id_espacio) ? id_espacio : [id_espacio];
    const parsedCheckIn = new Date(check_in);
    const parsedCheckOut = new Date(check_out);

    const nuevasReservas = [];

    // Validar overlap de todos los espacios y crearlos en una transacción si es posible, 
    // pero para mantener simplicidad lo hacemos en un loop.
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
          hora_fin: hora_fin || null
        },
        include: {
          espacio: true,
          huesped: true
        }
      });

      nuevasReservas.push(nuevaReserva);
    }
    
    // Si se enviaron múltiples, devolvemos el array. Si fue uno, devolvemos el objeto por compatibilidad.
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
    const parsedCheckIn = new Date(check_in);
    const parsedCheckOut = new Date(check_out);

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

// Delete reservation (cascade → cuenta_espacio → cuenta_persona → reserva → huesped si queda sin reservas)
const deleteReserva = async (req, res) => {
  const { id } = req.params;
  try {
    const idReserva = parseInt(id);

    const reserva = await prisma.reserva.findUnique({
      where: { id_reserva: idReserva },
      select: { id_huesped: true }
    });
    if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });
    const idHuesped = reserva.id_huesped;

    // Eliminar dependencias antes de borrar la reserva
    await prisma.cuenta_espacio.deleteMany({ where: { id_reserva: idReserva } });
    await prisma.cuenta_persona.deleteMany({ where: { id_reserva: idReserva } });
    await prisma.reserva.delete({ where: { id_reserva: idReserva } });

    // Si el huésped ya no tiene ninguna reserva, eliminarlo también
    const restantes = await prisma.reserva.count({ where: { id_huesped: idHuesped } });
    if (restantes === 0) {
      await prisma.cuenta_persona.deleteMany({ where: { id_huesped: idHuesped } });
      await prisma.huesped.delete({ where: { id_huesped: idHuesped } });
    }

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
    const parsedCheckIn  = new Date(check_in);
    const parsedCheckOut = new Date(check_out);
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

    const updated = await prisma.reserva.update({
      where: { id_reserva: idReserva },
      data: {
        id_espacio: idEspacio,
        check_in: parsedCheckIn,
        check_out: parsedCheckOut,
        cantidad_adultos: parseInt(cantidad_adultos) || 1,
        cantidad_ninos: parseInt(cantidad_ninos) || 0,
        monto_total: parseFloat(monto_total) || 0,
        anotaciones: anotaciones || null,
        fecha_evento: fecha_evento ? new Date(fecha_evento) : null,
        hora_inicio: hora_inicio || null,
        hora_fin: hora_fin || null
      },
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

module.exports = {
  getReservas,
  createReserva,
  updateReservaDates,
  updateReservaFull,
  deleteReserva,
  updateReservaEstado,
  updateReservaPago,
  updateReservaHuesped,
  updateReservaMonto
};
