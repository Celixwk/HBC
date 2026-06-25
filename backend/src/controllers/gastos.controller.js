const prisma = require('../config/prisma');

const CATEGORIAS_DEFAULT = [
  'Servicios Públicos', 'Mantenimiento', 'Nómina', 'Arriendo', 'Marketing', 'Otros'
];

// ── Asegura que las categorías default existan (lazy seed) ──────────────
async function ensureDefaultCategorias() {
  const count = await prisma.categoria_gasto.count({ where: { activo: true } });
  if (count === 0) {
    for (const nombre of CATEGORIAS_DEFAULT) {
      await prisma.categoria_gasto.upsert({ where: { nombre }, update: {}, create: { nombre } });
    }
  }
}

// ── CRUD Categorías ─────────────────────────────────────────────────────
const getCategorias = async (req, res) => {
  // ?full=true devuelve objetos {id,nombre}, de lo contrario solo strings
  const full = req.query.full === 'true';
  try {
    await ensureDefaultCategorias();
    const cats = await prisma.categoria_gasto.findMany({
      where: { activo: true },
      orderBy: { nombre: 'asc' }
    });
    res.json(full ? cats : cats.map(c => c.nombre));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
};

const createCategoria = async (req, res) => {
  const { nombre } = req.body;
  if (!nombre || !nombre.trim())
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  try {
    const cat = await prisma.categoria_gasto.upsert({
      where: { nombre: nombre.trim() },
      update: { activo: true },
      create: { nombre: nombre.trim() }
    });
    res.status(201).json(cat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear categoría' });
  }
};

const deleteCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const cat = await prisma.categoria_gasto.findUnique({ where: { id: parseInt(id) } });
    if (!cat) return res.status(404).json({ error: 'Categoría no encontrada' });

    const enUso = await prisma.gasto_operativo.count({
      where: { categoria: cat.nombre, activo: true }
    });
    if (enUso > 0)
      return res.status(409).json({ error: `No se puede eliminar: ${enUso} gasto(s) usan esta categoría.` });

    await prisma.categoria_gasto.update({ where: { id: parseInt(id) }, data: { activo: false } });
    res.json({ message: 'Categoría eliminada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar categoría' });
  }
};

// ── CRUD Gastos ─────────────────────────────────────────────────────────
const getGastos = async (req, res) => {
  const { desde, hasta, categoria } = req.query;
  try {
    const where = { activo: true };
    if (categoria) where.categoria = categoria;
    if (desde || hasta) {
      where.fecha = {};
      if (desde) where.fecha.gte = new Date(desde);
      if (hasta) {
        const h = new Date(hasta);
        h.setHours(23, 59, 59, 999);
        where.fecha.lte = h;
      }
    }
    const gastos = await prisma.gasto_operativo.findMany({
      where,
      orderBy: { fecha: 'desc' }
    });
    res.json(gastos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener gastos' });
  }
};

const createGasto = async (req, res) => {
  const { categoria, descripcion, monto, fecha, comprobante, proveedor_nombre, es_recurrente, dia_recurrente, notas } = req.body;
  try {
    if (!categoria || !descripcion || !monto || !fecha)
      return res.status(400).json({ error: 'Categoría, descripción, monto y fecha son obligatorios' });
    const nuevo = await prisma.gasto_operativo.create({
      data: {
        categoria,
        descripcion,
        monto: parseFloat(monto),
        fecha: new Date(fecha),
        comprobante: comprobante || null,
        proveedor_nombre: proveedor_nombre || null,
        es_recurrente: !!es_recurrente,
        dia_recurrente: es_recurrente && dia_recurrente ? parseInt(dia_recurrente) : null,
        notas: notas || null
      }
    });
    res.status(201).json(nuevo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear gasto' });
  }
};

const updateGasto = async (req, res) => {
  const { id } = req.params;
  const { categoria, descripcion, monto, fecha, comprobante, proveedor_nombre, es_recurrente, dia_recurrente, notas } = req.body;
  try {
    const updated = await prisma.gasto_operativo.update({
      where: { id_gasto: parseInt(id) },
      data: {
        categoria,
        descripcion,
        monto: parseFloat(monto),
        fecha: new Date(fecha),
        comprobante: comprobante || null,
        proveedor_nombre: proveedor_nombre || null,
        es_recurrente: !!es_recurrente,
        dia_recurrente: es_recurrente && dia_recurrente ? parseInt(dia_recurrente) : null,
        notas: notas || null
      }
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar gasto' });
  }
};

const deleteGasto = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.gasto_operativo.update({
      where: { id_gasto: parseInt(id) },
      data: { activo: false }
    });
    res.json({ message: 'Gasto eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar gasto' });
  }
};

// ── Genera recurrentes del mes actual ───────────────────────────────────
const generarRecurrentes = async (req, res) => {
  const hoy = new Date();
  const mesActual = hoy.getMonth();
  const anioActual = hoy.getFullYear();
  const inicioMes = new Date(anioActual, mesActual, 1);
  const finMes    = new Date(anioActual, mesActual + 1, 0, 23, 59, 59, 999);

  try {
    const plantillas = await prisma.gasto_operativo.findMany({
      where: { activo: true, es_recurrente: true }
    });

    const generados = [];
    for (const p of plantillas) {
      const dia = p.dia_recurrente || 1;
      const fechaEsperada = new Date(anioActual, mesActual, Math.min(dia, new Date(anioActual, mesActual + 1, 0).getDate()));

      const existe = await prisma.gasto_operativo.findFirst({
        where: {
          categoria: p.categoria,
          descripcion: p.descripcion,
          activo: true,
          fecha: { gte: inicioMes, lte: finMes },
          es_recurrente: false
        }
      });

      if (!existe) {
        const nuevo = await prisma.gasto_operativo.create({
          data: {
            categoria: p.categoria,
            descripcion: p.descripcion,
            monto: p.monto,
            fecha: fechaEsperada,
            comprobante: null,
            proveedor_nombre: p.proveedor_nombre,
            es_recurrente: false,
            notas: `Generado automáticamente desde plantilla #${p.id_gasto}`
          }
        });
        generados.push(nuevo);
      }
    }

    res.json({ generados: generados.length, items: generados });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al generar recurrentes' });
  }
};

module.exports = { getCategorias, createCategoria, deleteCategoria, getGastos, createGasto, updateGasto, deleteGasto, generarRecurrentes };
