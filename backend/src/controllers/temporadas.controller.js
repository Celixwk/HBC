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
    const activas = await prisma.temporada.findMany({ where: { activo: true } });

    // 1) Prioridad: temporadas EXACTAS (con año específico)
    const exactas = activas.filter(t => t.es_exacta && t.fecha_exacta_inicio && t.fecha_exacta_fin);
    for (const temp of exactas) {
      if (fecha >= temp.fecha_exacta_inicio && fecha <= temp.fecha_exacta_fin) {
        return res.json({ tipo: temp.tipo, nombre: temp.nombre, id: temp.id, exacta: true });
      }
    }

    // 2) Fallback: temporadas RECURRENTES (sólo MM-DD)
    const mmdd = fecha.substring(5, 10);
    const recurrentes = activas.filter(t => !t.es_exacta);
    // Ordenar: alta > media > baja
    const prioridad = { alta: 0, media: 1, baja: 2 };
    recurrentes.sort((a, b) => (prioridad[a.tipo] ?? 3) - (prioridad[b.tipo] ?? 3));

    for (const temp of recurrentes) {
      const inicio = temp.mes_dia_inicio;
      const fin    = temp.mes_dia_fin;
      let coincide;
      if (inicio <= fin) {
        // Rango normal (ej. 02-15 a 03-15)
        coincide = mmdd >= inicio && mmdd <= fin;
      } else {
        // Cruza año nuevo (ej. 12-15 a 01-15)
        coincide = mmdd >= inicio || mmdd <= fin;
      }
      if (coincide) {
        return res.json({ tipo: temp.tipo, nombre: temp.nombre, id: temp.id, exacta: false });
      }
    }

    // Default: baja
    res.json({ tipo: 'baja', nombre: 'Temporada Baja (por defecto)', id: null, exacta: false });
  } catch (error) {
    console.error('Error al detectar temporada:', error);
    res.status(500).json({ error: 'Error al detectar temporada' });
  }
};

// ─── Crear temporada ────────────────────────────────────────────────────────
const createTemporada = async (req, res) => {
  const { nombre, tipo, fecha_inicio, fecha_fin, activo, es_exacta } = req.body;

  if (!nombre || !tipo) {
    return res.status(400).json({ error: 'Faltan campos requeridos: nombre, tipo' });
  }
  if (!['alta', 'media', 'baja'].includes(tipo)) {
    return res.status(400).json({ error: 'El tipo debe ser: alta, media o baja' });
  }

  try {
    const esExacta = es_exacta === true || es_exacta === 'true';
    let data;

    if (esExacta) {
      // Temporada exacta: guardar fecha completa
      if (!fecha_inicio || !fecha_fin) {
        return res.status(400).json({ error: 'Las temporadas exactas requieren fecha_inicio y fecha_fin con año' });
      }
      data = {
        nombre, tipo,
        es_exacta: true,
        fecha_exacta_inicio: fecha_inicio,
        fecha_exacta_fin: fecha_fin,
        // mes_dia de fallback extraídos de las fechas exactas
        mes_dia_inicio: fecha_inicio.substring(5, 10),
        mes_dia_fin:    fecha_fin.substring(5, 10),
        activo: activo !== undefined ? activo : true
      };
    } else {
      // Temporada recurrente: solo MM-DD
      if (!fecha_inicio || !fecha_fin) {
        return res.status(400).json({ error: 'Faltan campos requeridos: fecha_inicio, fecha_fin' });
      }
      data = {
        nombre, tipo,
        es_exacta: false,
        mes_dia_inicio: fecha_inicio.length === 5 ? fecha_inicio : fecha_inicio.substring(5, 10),
        mes_dia_fin:    fecha_fin.length   === 5 ? fecha_fin   : fecha_fin.substring(5, 10),
        activo: activo !== undefined ? activo : true
      };
    }

    const nueva = await prisma.temporada.create({ data });
    res.status(201).json(nueva);
  } catch (error) {
    console.error('Error al crear temporada:', error);
    res.status(500).json({ error: error.message || 'Error interno al crear temporada' });
  }
};

// ─── Actualizar temporada ───────────────────────────────────────────────────
const updateTemporada = async (req, res) => {
  const { id } = req.params;
  const { nombre, tipo, fecha_inicio, fecha_fin, activo, es_exacta } = req.body;

  try {
    const data = {};
    if (nombre    !== undefined) data.nombre  = nombre;
    if (tipo      !== undefined) data.tipo    = tipo;
    if (activo    !== undefined) data.activo  = activo;
    if (es_exacta !== undefined) {
      const esExacta = es_exacta === true || es_exacta === 'true';
      data.es_exacta = esExacta;
      if (esExacta) {
        if (fecha_inicio) { data.fecha_exacta_inicio = fecha_inicio; data.mes_dia_inicio = fecha_inicio.substring(5, 10); }
        if (fecha_fin)    { data.fecha_exacta_fin    = fecha_fin;    data.mes_dia_fin    = fecha_fin.substring(5, 10); }
      } else {
        data.fecha_exacta_inicio = null;
        data.fecha_exacta_fin    = null;
        if (fecha_inicio) data.mes_dia_inicio = fecha_inicio.length === 5 ? fecha_inicio : fecha_inicio.substring(5, 10);
        if (fecha_fin)    data.mes_dia_fin    = fecha_fin.length   === 5 ? fecha_fin   : fecha_fin.substring(5, 10);
      }
    } else {
      if (fecha_inicio !== undefined) data.mes_dia_inicio = fecha_inicio.length === 5 ? fecha_inicio : fecha_inicio.substring(5, 10);
      if (fecha_fin    !== undefined) data.mes_dia_fin    = fecha_fin.length   === 5 ? fecha_fin   : fecha_fin.substring(5, 10);
    }

    const updated = await prisma.temporada.update({ where: { id: parseInt(id) }, data });
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
