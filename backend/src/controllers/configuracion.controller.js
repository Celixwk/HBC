const prisma = require('../config/prisma');

const getConfiguracion = async (req, res) => {
  try {
    let config = await prisma.configuracion_hotel.findFirst();
    if (!config) {
      config = await prisma.configuracion_hotel.create({ data: { nombre_hotel: 'Hotel Boutique', hora_check_in: '15:00', hora_check_out: '13:00' } });
    }
    res.json(config);
  } catch (error) {
    console.error('Error al obtener configuración:', error);
    res.status(500).json({ error: 'Error al obtener configuración' });
  }
};

const updateConfiguracion = async (req, res) => {
  const { nombre_hotel, direccion, telefono, nit, email, ciudad, hora_check_in, hora_check_out } = req.body;
  try {
    let config = await prisma.configuracion_hotel.findFirst();
    if (!config) {
      config = await prisma.configuracion_hotel.create({ data: { nombre_hotel: nombre_hotel || 'Hotel Boutique', hora_check_in: hora_check_in || '15:00', hora_check_out: hora_check_out || '13:00' } });
    }
    const updated = await prisma.configuracion_hotel.update({
      where: { id: config.id },
      data: {
        nombre_hotel,
        direccion,
        telefono,
        nit,
        email,
        ciudad,
        hora_check_in,
        hora_check_out,
        fecha_actualizacion: new Date()
      }
    });
    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error al actualizar configuración:', error);
    res.status(500).json({ error: 'Error al actualizar configuración' });
  }
};

module.exports = { getConfiguracion, updateConfiguracion };
