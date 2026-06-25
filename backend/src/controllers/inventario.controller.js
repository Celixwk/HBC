const prisma = require('../config/prisma');

const CATEGORIAS_DEFAULT = ['Minibar','Cocina','Aseo','Amenities','Lenceria','Otro'];

// ─── Categorías ───────────────────────────────────────────────────────────────

const getCategorias = async (req, res) => {
  try {
    let cats = await prisma.categoria_inventario.findMany({
      where: { activo: true }, orderBy: { nombre: 'asc' }
    });
    if (cats.length === 0) {
      await prisma.categoria_inventario.createMany({
        data: CATEGORIAS_DEFAULT.map(nombre => ({ nombre })),
        skipDuplicates: true
      });
      cats = await prisma.categoria_inventario.findMany({ where: { activo: true }, orderBy: { nombre: 'asc' } });
    }
    res.json(cats);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
};

const createCategoria = async (req, res) => {
  const { nombre } = req.body;
  try {
    if (!nombre?.trim()) return res.status(400).json({ error: 'El nombre es obligatorio' });
    const nueva = await prisma.categoria_inventario.upsert({
      where: { nombre: nombre.trim() },
      update: { activo: true },
      create: { nombre: nombre.trim() }
    });
    res.status(201).json(nueva);
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({ error: 'Error al crear la categoría' });
  }
};

const deleteCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.categoria_inventario.update({
      where: { id_categoria: parseInt(id) },
      data: { activo: false }
    });
    res.json({ message: 'Categoría eliminada' });
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({ error: 'Error al eliminar la categoría' });
  }
};

// ─── Productos ────────────────────────────────────────────────────────────────

const getProductos = async (req, res) => {
  try {
    const { categoria, id_proveedor, stock_bajo } = req.query;
    const where = { activo: true };
    if (categoria) where.categoria = categoria;
    if (id_proveedor) where.id_proveedor = parseInt(id_proveedor);
    if (stock_bajo === 'true') where.stock_actual = { lte: prisma.producto_inventario.fields.stock_minimo };

    const productos = await prisma.producto_inventario.findMany({
      where,
      include: { proveedor: { select: { id_proveedor: true, nombre: true } } },
      orderBy: [{ categoria: 'asc' }, { nombre: 'asc' }]
    });

    // Marcar productos con stock bajo manualmente (comparación en JS)
    const result = productos.map(p => ({
      ...p,
      stock_bajo: Number(p.stock_actual) <= Number(p.stock_minimo)
    }));

    res.json(result);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

const createProducto = async (req, res) => {
  const { nombre, descripcion, categoria, unidad_medida, precio_costo, precio_venta, stock_actual, stock_minimo, id_proveedor } = req.body;
  try {
    if (!nombre || !categoria) return res.status(400).json({ error: 'Nombre y categoría son obligatorios' });
    const nuevo = await prisma.producto_inventario.create({
      data: {
        nombre,
        descripcion,
        categoria,
        unidad_medida: unidad_medida || 'unidad',
        precio_costo: parseFloat(precio_costo) || 0,
        precio_venta: parseFloat(precio_venta) || 0,
        stock_actual: parseFloat(stock_actual) || 0,
        stock_minimo: parseFloat(stock_minimo) || 0,
        id_proveedor: id_proveedor ? parseInt(id_proveedor) : null
      },
      include: { proveedor: { select: { id_proveedor: true, nombre: true } } }
    });
    res.status(201).json(nuevo);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, categoria, unidad_medida, precio_costo, precio_venta, stock_minimo, id_proveedor } = req.body;
  try {
    const updated = await prisma.producto_inventario.update({
      where: { id_producto: parseInt(id) },
      data: {
        nombre, descripcion, categoria, unidad_medida,
        precio_costo: parseFloat(precio_costo) || 0,
        precio_venta: parseFloat(precio_venta) || 0,
        stock_minimo: parseFloat(stock_minimo) || 0,
        id_proveedor: id_proveedor ? parseInt(id_proveedor) : null
      },
      include: { proveedor: { select: { id_proveedor: true, nombre: true } } }
    });
    res.json(updated);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

const deleteProducto = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.producto_inventario.update({
      where: { id_producto: parseInt(id) },
      data: { activo: false }
    });
    res.json({ message: 'Producto desactivado' });
  } catch (error) {
    console.error('Error al desactivar producto:', error);
    res.status(500).json({ error: 'Error al desactivar el producto' });
  }
};

// ─── Movimientos ──────────────────────────────────────────────────────────────

const getMovimientos = async (req, res) => {
  try {
    const { id_producto, tipo, fecha_desde, fecha_hasta, limit } = req.query;
    const where = {};
    if (id_producto) where.id_producto = parseInt(id_producto);
    if (tipo) where.tipo = tipo;
    if (fecha_desde || fecha_hasta) {
      where.fecha = {};
      if (fecha_desde) where.fecha.gte = new Date(fecha_desde);
      if (fecha_hasta) {
        const hasta = new Date(fecha_hasta);
        hasta.setHours(23, 59, 59, 999);
        where.fecha.lte = hasta;
      }
    }

    const movimientos = await prisma.movimiento_inventario.findMany({
      where,
      include: { producto: { select: { id_producto: true, nombre: true, categoria: true, unidad_medida: true } } },
      orderBy: { fecha: 'desc' },
      take: limit ? parseInt(limit) : 500
    });
    res.json(movimientos);
  } catch (error) {
    console.error('Error al obtener movimientos:', error);
    res.status(500).json({ error: 'Error al obtener los movimientos' });
  }
};

const registrarEntrada = async (req, res) => {
  const { id_producto, cantidad, precio_unitario, notas } = req.body;
  try {
    if (!id_producto || !cantidad) return res.status(400).json({ error: 'Producto y cantidad son obligatorios' });
    const cantNum = parseFloat(cantidad);
    if (cantNum <= 0) return res.status(400).json({ error: 'La cantidad debe ser positiva' });

    const producto = await prisma.producto_inventario.findUnique({ where: { id_producto: parseInt(id_producto) } });
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    const stockAntes = Number(producto.stock_actual);
    const stockDespues = stockAntes + cantNum;

    const [movimiento] = await prisma.$transaction([
      prisma.movimiento_inventario.create({
        data: {
          id_producto: parseInt(id_producto),
          tipo: 'entrada',
          motivo: 'compra',
          cantidad: cantNum,
          stock_antes: stockAntes,
          stock_despues: stockDespues,
          precio_unitario: parseFloat(precio_unitario) || 0,
          notas
        },
        include: { producto: { select: { nombre: true, unidad_medida: true } } }
      }),
      prisma.producto_inventario.update({
        where: { id_producto: parseInt(id_producto) },
        data: { stock_actual: stockDespues }
      })
    ]);

    res.status(201).json(movimiento);
  } catch (error) {
    console.error('Error al registrar entrada:', error);
    res.status(500).json({ error: 'Error al registrar la entrada' });
  }
};

const registrarSalida = async (req, res) => {
  const { id_producto, cantidad, motivo, notas } = req.body;
  try {
    if (!id_producto || !cantidad) return res.status(400).json({ error: 'Producto y cantidad son obligatorios' });
    const cantNum = parseFloat(cantidad);
    if (cantNum <= 0) return res.status(400).json({ error: 'La cantidad debe ser positiva' });

    const producto = await prisma.producto_inventario.findUnique({ where: { id_producto: parseInt(id_producto) } });
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    const stockAntes = Number(producto.stock_actual);
    const stockDespues = Math.max(0, stockAntes - cantNum);

    const [movimiento] = await prisma.$transaction([
      prisma.movimiento_inventario.create({
        data: {
          id_producto: parseInt(id_producto),
          tipo: 'salida',
          motivo: motivo || 'ajuste',
          cantidad: cantNum,
          stock_antes: stockAntes,
          stock_despues: stockDespues,
          notas
        },
        include: { producto: { select: { nombre: true, unidad_medida: true } } }
      }),
      prisma.producto_inventario.update({
        where: { id_producto: parseInt(id_producto) },
        data: { stock_actual: stockDespues }
      })
    ]);

    res.status(201).json(movimiento);
  } catch (error) {
    console.error('Error al registrar salida:', error);
    res.status(500).json({ error: 'Error al registrar la salida' });
  }
};

module.exports = { getCategorias, createCategoria, deleteCategoria, getProductos, createProducto, updateProducto, deleteProducto, getMovimientos, registrarEntrada, registrarSalida };
