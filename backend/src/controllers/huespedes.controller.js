const prisma = require('../config/prisma');

// Obtener todos los huéspedes — devuelve TODAS las reservas por huésped (no solo la última)
const getHuespedes = async (req, res) => {
  try {
    const huespedes = await prisma.huesped.findMany({
      include: {
        reserva: {
          orderBy: { check_in: 'desc' },
          select: {
            fecha_creacion: true, check_in: true, check_out: true,
            estado_reserva: true, id_reserva: true, firma: true,
            espacio: { select: { numero: true } }
          }
        }
      },
      orderBy: {
        fecha_creacion: 'desc'
      }
    });
    res.json(huespedes);
  } catch (error) {
    console.error('Error al obtener huespedes:', error);
    res.status(500).json({ error: 'Error al obtener los huéspedes' });
  }
};

// Crear un nuevo huésped
const createHuesped = async (req, res) => {
  const {
    nombre_completo,
    telefono,
    documento,
    tipo_documento,
    procedencia
  } = req.body;

  try {
    if (!nombre_completo || !documento) {
      return res.status(400).json({ error: 'Nombre y documento son obligatorios' });
    }

    // Cada estadía crea un registro nuevo — el mismo documento puede aparecer varias veces
    const nuevoHuesped = await prisma.huesped.create({
      data: {
        nombre_completo,
        telefono,
        documento,
        tipo_documento: tipo_documento || 'CC',
        procedencia
      }
    });

    res.status(201).json(nuevoHuesped);
  } catch (error) {
    console.error('Error al crear huésped:', error);
    res.status(500).json({ error: 'Error al crear el huésped' });
  }
};

const updateFirma = async (req, res) => {
  const { id } = req.params;
  const { firma } = req.body;
  try {
    const idHuesped = parseInt(id);

    // Buscar la reserva activa/confirmada más próxima del huésped (sin restricción de fecha, permitiendo firma anticipada)
    const reservaHoy = await prisma.reserva.findFirst({
      where: {
        id_huesped: idHuesped,
        estado_reserva: { in: ['activa', 'confirmada'] }
      },
      orderBy: { check_in: 'desc' }
    });

    if (!reservaHoy) {
      return res.status(403).json({
        error: 'No se encontró una reserva activa o confirmada para firmar.'
      });
    }

    // Guardar la firma en la reserva activa (no en el huésped) para que
    // cada estadía tenga su propia firma independiente
    await prisma.reserva.update({
      where: { id_reserva: reservaHoy.id_reserva },
      data: { firma }
    });
    res.json({ success: true, id_reserva: reservaHoy.id_reserva });
  } catch (error) {
    console.error('Error al guardar firma:', error);
    res.status(500).json({ error: 'Error al guardar la firma' });
  }
};

const updateHuesped = async (req, res) => {
  const { id } = req.params;
  const { nombre_completo, documento, tipo_documento, telefono, procedencia } = req.body;
  try {
    const updated = await prisma.huesped.update({
      where: { id_huesped: parseInt(id) },
      data: {
        nombre_completo,
        documento,
        tipo_documento,
        telefono,
        procedencia
      }
    });
    res.json(updated);
  } catch (error) {
    console.error('Error al actualizar huésped:', error);
    res.status(500).json({ error: 'Error al actualizar el huésped' });
  }
};

const deleteHuesped = async (req, res) => {
  const { id } = req.params;
  try {
    const idHuesped = parseInt(id);
    const reservas = await prisma.reserva.findMany({
      where: { id_huesped: idHuesped },
      select: { id_reserva: true, estado_reserva: true }
    });

    if (reservas.length > 0) {
      const todasNoShow = reservas.every(r => r.estado_reserva === 'no_show');
      if (!todasNoShow) {
        return res.status(400).json({
          error: 'No se puede eliminar: el huésped tiene reservas activas, confirmadas o completadas.'
        });
      }
      // Todas son no_show — eliminar en cascada antes de borrar el huésped
      const ids = reservas.map(r => r.id_reserva);
      await prisma.cuenta_espacio.deleteMany({ where: { id_reserva: { in: ids } } });
      // Cubrir FK de cuenta_persona tanto por reserva como por huesped directo
      await prisma.cuenta_persona.deleteMany({
        where: { OR: [{ id_reserva: { in: ids } }, { id_huesped: idHuesped }] }
      });
      await prisma.reserva.deleteMany({ where: { id_huesped: idHuesped } });
    }

    await prisma.huesped.delete({ where: { id_huesped: idHuesped } });
    res.json({ message: 'Huésped eliminado' });
  } catch (error) {
    console.error('Error al eliminar huésped:', error);
    res.status(500).json({ error: 'Error al eliminar el huésped' });
  }
};

module.exports = {
  getHuespedes,
  createHuesped,
  updateFirma,
  updateHuesped,
  deleteHuesped
};
