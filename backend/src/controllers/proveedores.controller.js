const prisma = require('../config/prisma');

const getProveedores = async (req, res) => {
  try {
    const proveedores = await prisma.proveedor.findMany({
      include: { _count: { select: { productos: true } } },
      orderBy: [{ activo: 'desc' }, { nombre: 'asc' }]
    });
    res.json(proveedores);
  } catch (error) {
    console.error('Error al obtener proveedores:', error);
    res.status(500).json({ error: 'Error al obtener los proveedores' });
  }
};

const createProveedor = async (req, res) => {
  const { nombre, nit, telefono, email, direccion, ciudad, contacto, notas } = req.body;
  try {
    if (!nombre) return res.status(400).json({ error: 'El nombre es obligatorio' });
    const nuevo = await prisma.proveedor.create({
      data: { nombre, nit, telefono, email, direccion, ciudad, contacto, notas }
    });
    res.status(201).json(nuevo);
  } catch (error) {
    console.error('Error al crear proveedor:', error);
    res.status(500).json({ error: 'Error al crear el proveedor' });
  }
};

const updateProveedor = async (req, res) => {
  const { id } = req.params;
  const { nombre, nit, telefono, email, direccion, ciudad, contacto, notas, activo } = req.body;
  try {
    const updated = await prisma.proveedor.update({
      where: { id_proveedor: parseInt(id) },
      data: { nombre, nit, telefono, email, direccion, ciudad, contacto, notas,
        ...(activo !== undefined && { activo: Boolean(activo) }) }
    });
    res.json(updated);
  } catch (error) {
    console.error('Error al actualizar proveedor:', error);
    res.status(500).json({ error: 'Error al actualizar el proveedor' });
  }
};

const deleteProveedor = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.proveedor.update({
      where: { id_proveedor: parseInt(id) },
      data: { activo: false }
    });
    res.json({ message: 'Proveedor desactivado' });
  } catch (error) {
    console.error('Error al desactivar proveedor:', error);
    res.status(500).json({ error: 'Error al desactivar el proveedor' });
  }
};

module.exports = { getProveedores, createProveedor, updateProveedor, deleteProveedor };
