const prisma = require('../config/prisma');

// ─── Listar temporadas ────────────────────────────────────────────────────────
const getTemporadas = async (req, res) => {
  try {
    const temporadas = await prisma.temporada.findMany({
      orderBy: [{ mes_dia_inicio: 'asc' }]
    });
    res.json(temporadas);
  } catch (error) {
    console.error('Error al obtener temporadas:', error);
    res.status(500).json({ error: 'Error al obtener temporadas' });
  }
};

// ─── Detectar temporada para una fecha ──────────────────────────────────────
// GET /api/temporadas/detectar?fecha=YYYY-MM-DD
const detectarTemporada = async (req, res) => {
  const { fecha } = req.query;
  if (!fecha) return res.status(400).json({ error: 'Falta el parámetro fecha' });

  try {
    // Extraer MM-DD de la fecha (ej. "2026-12-15" -> "12-15")
    const mmdd = fecha.substring(5, 10);

    const activas = await prisma.temporada.findMany({
      where: { activo: true },
      orderBy: { tipo: 'asc' } // 'alta' < 'baja' < 'media' -> 'alta' primero
    });

    let detectada = null;

    for (const temp of activas) {
      const inicio = temp.mes_dia_inicio;
      const fin = temp.mes_dia_fin;

      if (inicio <= fin) {
        // Año normal (ej. "02-15" a "03-15")
        if (mmdd >= inicio && mmdd <= fin) {
          detectada = temp;
          break;
        }
      } else {
        // Cruza año nuevo (ej. "12-15" a "01-15")
        if (mmdd >= inicio || mmdd <= fin) {
          detectada = temp;
          break;
        }
      }
    }

    if (detectada) {
      res.json({ tipo: detectada.tipo, nombre: detectada.nombre, id: detectada.id });
    } else {
      res.json({ tipo: 'baja', nombre: 'Temporada Baja (por defecto)', id: null });
    }
  } catch (error) {
    console.error('Error al detectar temporada:', error);
    res.status(500).json({ error: 'Error al detectar temporada' });
  }
};

// ─── Crear temporada ────────────────────────────────────────────────────────
const createTemporada = async (req, res) => {
  const { nombre, tipo, fecha_inicio, fecha_fin, activo } = req.body;

  if (!nombre || !tipo || !fecha_inicio || !fecha_fin) {
    return res.status(400).json({ error: 'Faltan campos requeridos: nombre, tipo, fecha_inicio, fecha_fin' });
  }

  if (!['alta', 'media', 'baja'].includes(tipo)) {
    return res.status(400).json({ error: 'El tipo debe ser: alta, media o baja' });
  }

  try {
    const mes_dia_inicio = fecha_inicio.substring(5, 10);
    const mes_dia_fin = fecha_fin.substring(5, 10);

    const nueva = await prisma.temporada.create({
      data: {
        nombre,
        tipo,
        mes_dia_inicio,
        mes_dia_fin,
        activo: activo !== undefined ? activo : true
      }
    });
    res.status(201).json(nueva);
  } catch (error) {
    console.error('Error al crear temporada:', error);
    res.status(500).json({ error: error.message || 'Error interno al crear temporada' });
  }
};

// ─── Actualizar temporada ───────────────────────────────────────────────────
const updateTemporada = async (req, res) => {
  const { id } = req.params;
  const { nombre, tipo, fecha_inicio, fecha_fin, activo } = req.body;

  try {
    const data = {};
    if (nombre !== undefined) data.nombre = nombre;
    if (tipo !== undefined) data.tipo = tipo;
    if (activo !== undefined) data.activo = activo;
    if (fecha_inicio !== undefined) data.mes_dia_inicio = fecha_inicio.substring(5, 10);
    if (fecha_fin !== undefined) data.mes_dia_fin = fecha_fin.substring(5, 10);

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

module.exports = {
  getTemporadas,
  detectarTemporada,
  createTemporada,
  updateTemporada,
  deleteTemporada
};
