const prisma = require('../config/prisma');

// ─── Listar temporadas ─────────────────────────────────────────────────────
const getTemporadas = async (req, res) => {
  const { anio } = req.query;
  try {
    const where = anio ? { anio: parseInt(anio) } : {};
    const temporadas = await prisma.temporada.findMany({
      where,
      orderBy: [{ fecha_inicio: 'asc' }]
    });
    res.json(temporadas);
  } catch (error) {
    console.error('Error al obtener temporadas:', error);
    res.status(500).json({ error: 'Error al obtener temporadas' });
  }
};

// ─── Detectar temporada para una fecha ─────────────────────────────────────
// GET /api/temporadas/detectar?fecha=YYYY-MM-DD
const detectarTemporada = async (req, res) => {
  const { fecha } = req.query;
  if (!fecha) return res.status(400).json({ error: 'Falta el parámetro fecha' });

  try {
    const fechaObj = new Date(fecha + 'T00:00:00Z');

    // Buscar temporada activa que contenga esta fecha
    const temporada = await prisma.temporada.findFirst({
      where: {
        activo: true,
        fecha_inicio: { lte: fechaObj },
        fecha_fin:    { gte: fechaObj }
      },
      orderBy: [
        // Si hay múltiples (ej. media y alta), priorizar alta
        { tipo: 'asc' } // 'alta' < 'baja' < 'media' → 'alta' primero
      ]
    });

    if (temporada) {
      res.json({ tipo: temporada.tipo, nombre: temporada.nombre, id: temporada.id });
    } else {
      // Sin temporada definida = baja por defecto
      res.json({ tipo: 'baja', nombre: 'Temporada Baja (por defecto)', id: null });
    }
  } catch (error) {
    console.error('Error al detectar temporada:', error);
    res.status(500).json({ error: 'Error al detectar temporada' });
  }
};

// ─── Crear temporada ────────────────────────────────────────────────────────
const createTemporada = async (req, res) => {
  const { nombre, tipo, fecha_inicio, fecha_fin, activo, anio } = req.body;

  if (!nombre || !tipo || !fecha_inicio || !fecha_fin) {
    return res.status(400).json({ error: 'Faltan campos requeridos: nombre, tipo, fecha_inicio, fecha_fin' });
  }

  if (!['alta', 'media', 'baja'].includes(tipo)) {
    return res.status(400).json({ error: 'El tipo debe ser: alta, media o baja' });
  }

  try {
    const inicio = new Date(fecha_inicio + 'T00:00:00Z');
    const fin    = new Date(fecha_fin + 'T00:00:00Z');

    if (fin < inicio) {
      return res.status(400).json({ error: 'La fecha de fin debe ser posterior a la de inicio' });
    }

    const nueva = await prisma.temporada.create({
      data: {
        nombre,
        tipo,
        fecha_inicio: inicio,
        fecha_fin:    fin,
        activo:       activo !== undefined ? activo : true,
        anio:         anio ? parseInt(anio) : inicio.getUTCFullYear()
      }
    });
    res.status(201).json(nueva);
  } catch (error) {
    console.error('Error al crear temporada:', error);
    res.status(500).json({ error: 'Error al crear temporada' });
  }
};

// ─── Actualizar temporada ───────────────────────────────────────────────────
const updateTemporada = async (req, res) => {
  const { id } = req.params;
  const { nombre, tipo, fecha_inicio, fecha_fin, activo, anio } = req.body;

  try {
    const data = {};
    if (nombre !== undefined)       data.nombre = nombre;
    if (tipo   !== undefined)       data.tipo   = tipo;
    if (activo !== undefined)       data.activo = activo;
    if (anio   !== undefined)       data.anio   = parseInt(anio);
    if (fecha_inicio !== undefined) data.fecha_inicio = new Date(fecha_inicio + 'T00:00:00Z');
    if (fecha_fin    !== undefined) data.fecha_fin    = new Date(fecha_fin + 'T00:00:00Z');

    const updated = await prisma.temporada.update({
      where: { id: parseInt(id) },
      data
    });
    res.json(updated);
  } catch (error) {
    console.error('Error al actualizar temporada:', error);
    res.status(500).json({ error: 'Error al actualizar temporada' });
  }
};

// ─── Eliminar temporada ─────────────────────────────────────────────────────
const deleteTemporada = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.temporada.delete({ where: { id: parseInt(id) } });
    res.json({ success: true });
  } catch (error) {
    console.error('Error al eliminar temporada:', error);
    res.status(500).json({ error: 'Error al eliminar temporada' });
  }
};

// ─── Años disponibles ───────────────────────────────────────────────────────
const getAniosDisponibles = async (req, res) => {
  try {
    const rows = await prisma.temporada.findMany({
      select: { anio: true },
      distinct: ['anio'],
      orderBy: { anio: 'asc' }
    });
    const anios = rows.map(r => r.anio).filter(Boolean);
    res.json(anios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener años' });
  }
};

module.exports = {
  getTemporadas,
  detectarTemporada,
  createTemporada,
  updateTemporada,
  deleteTemporada,
  getAniosDisponibles
};
