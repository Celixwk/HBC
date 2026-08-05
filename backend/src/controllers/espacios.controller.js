const prisma = require('../config/prisma');

// Obtener todos los espacios
const getEspacios = async (req, res) => {
  try {
    const espacios = await prisma.espacio.findMany({
      orderBy: {
        numero: 'asc'
      }
    });
    res.json(espacios);
  } catch (error) {
    console.error('Error al obtener espacios:', error);
    res.status(500).json({ error: 'Error al obtener los espacios' });
  }
};

// Obtener un espacio por ID
const getEspacioById = async (req, res) => {
  const { id } = req.params;
  try {
    const espacio = await prisma.espacio.findUnique({
      where: { id_espacio: parseInt(id) }
    });
    
    if (!espacio) {
      return res.status(404).json({ error: 'Espacio no encontrado' });
    }
    
    res.json(espacio);
  } catch (error) {
    console.error('Error al obtener el espacio:', error);
    res.status(500).json({ error: 'Error al obtener el espacio' });
  }
};

// Crear un nuevo espacio
const createEspacio = async (req, res) => {
  const { 
    numero, 
    tipo_espacio, 
    tipo_habitacion, 
    capacidad_personas, 
    precio_persona_1, 
    precio_persona_2, 
    precio_adicional, 
    activo 
  } = req.body;

  try {
    // Validar si el número ya existe
    const existeEspacio = await prisma.espacio.findUnique({
      where: { numero }
    });

    if (existeEspacio) {
      return res.status(400).json({ error: 'Ya existe un espacio con ese número' });
    }

    const nuevoEspacio = await prisma.espacio.create({
      data: {
        numero,
        tipo_espacio,
        tipo_habitacion,
        capacidad_personas,
        precio_persona_1,
        precio_persona_2,
        precio_adicional,
        activo: activo !== undefined ? activo : true
      }
    });
    
    res.status(201).json(nuevoEspacio);
  } catch (error) {
    console.error('Error al crear espacio:', error);
    res.status(500).json({ error: 'Error al crear el espacio' });
  }
};

// Actualizar un espacio
const updateEspacio = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const espacioActualizado = await prisma.espacio.update({
      where: { id_espacio: parseInt(id) },
      data
    });
    
    res.json(espacioActualizado);
  } catch (error) {
    console.error('Error al actualizar espacio:', error);
    res.status(500).json({ error: 'Error al actualizar el espacio' });
  }
};

// Eliminar un espacio (soft delete recomendado, pero aquí hacemos hard delete o marcamos inactivo)
const deleteEspacio = async (req, res) => {
  const { id } = req.params;

  try {
    // En lugar de borrarlo de la base de datos, lo marcamos como inactivo
    const espacioInactivo = await prisma.espacio.update({
      where: { id_espacio: parseInt(id) },
      data: { activo: false }
    });
    
    res.json({ message: 'Espacio desactivado exitosamente', espacio: espacioInactivo });
  } catch (error) {
    console.error('Error al eliminar espacio:', error);
    res.status(500).json({ error: 'Error al eliminar el espacio' });
  }
};

// ─── TIPO ESPACIO CONFIG ───

const getTiposEspacioConfig = async (req, res) => {
  try {
    const tipos = await prisma.tipo_espacio_config.findMany();
    res.json(tipos);
  } catch (error) {
    console.error('Error al obtener tipos de espacio:', error);
    res.status(500).json({ error: 'Error al obtener tipos de espacio' });
  }
};

const updateTipoEspacioConfig = async (req, res) => {
  const { id } = req.params;
    nombre,
    precio_base, recargo_pareja, recargo_adicional, max_personas_adicionales,
    // Precios por temporada (opcionales)
    precio_base_media, precio_base_alta,
    recargo_pareja_media, recargo_pareja_alta,
    recargo_adicional_media, recargo_adicional_alta
  } = req.body;

  const parseOptional = (v) => (v !== undefined && v !== '' && v !== null) ? parseFloat(v) : null;

  try {
    const data = {
      nombre,
      precio_base:              parseFloat(precio_base),
      recargo_pareja:           parseFloat(recargo_pareja),
      recargo_adicional:        parseFloat(recargo_adicional),
      max_personas_adicionales: parseInt(max_personas_adicionales) || 1,
      // Precios por temporada — null significa "usar el precio base"
      precio_base_media:        parseOptional(precio_base_media),
      precio_base_alta:         parseOptional(precio_base_alta),
      recargo_pareja_media:     parseOptional(recargo_pareja_media),
      recargo_pareja_alta:      parseOptional(recargo_pareja_alta),
      recargo_adicional_media:  parseOptional(recargo_adicional_media),
      recargo_adicional_alta:   parseOptional(recargo_adicional_alta),
    };

    const upserted = await prisma.tipo_espacio_config.upsert({
      where: { id: parseInt(id) },
      update: data,
      create: data
    });

    // NOTA: Ya no recalculamos monto_total de reservas existentes.
    // El precio se congela al momento de crear la reserva (precio_noche_snapshot).
    // Los cambios de configuración solo afectan reservas nuevas.
    res.json(upserted);
  } catch (error) {
    console.error('Error al actualizar tipo espacio config:', error);
    res.status(500).json({ error: 'Error al actualizar' });
  }
};

const createTipoEspacioConfig = async (req, res) => {
  const { nombre, precio_base, recargo_pareja, recargo_adicional, max_personas_adicionales } = req.body;
  try {
    const created = await prisma.tipo_espacio_config.create({
      data: {
        nombre,
        precio_base: parseFloat(precio_base),
        recargo_pareja: parseFloat(recargo_pareja),
        recargo_adicional: parseFloat(recargo_adicional),
        max_personas_adicionales: parseInt(max_personas_adicionales) || 1
      }
    });
    res.json(created);
  } catch (error) {
    console.error('Error al crear tipo espacio config:', error);
    res.status(500).json({ error: 'Error al crear' });
  }
};

const deleteTipoEspacioConfig = async (req, res) => {
  const { id } = req.params;
  try {
    const tipo = await prisma.tipo_espacio_config.findUnique({ where: { id: parseInt(id) } });
    if (!tipo) return res.status(404).json({ error: 'Tipo no encontrado' });

    const habitacionesEnUso = await prisma.espacio.count({
      where: { tipo_habitacion: { equals: tipo.nombre, mode: 'insensitive' }, activo: true }
    });
    if (habitacionesEnUso > 0) {
      return res.status(409).json({
        error: `No se puede eliminar: ${habitacionesEnUso} habitación(es) usa(n) este tipo. Reasígnalas primero.`
      });
    }

    await prisma.tipo_espacio_config.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Tipo eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar tipo espacio config:', error);
    res.status(500).json({ error: 'Error al eliminar' });
  }
};

module.exports = {
  getEspacios,
  getEspacioById,
  createEspacio,
  updateEspacio,
  deleteEspacio,
  getTiposEspacioConfig,
  updateTipoEspacioConfig,
  createTipoEspacioConfig,
  deleteTipoEspacioConfig
};
