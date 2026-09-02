const bcrypt = require('bcryptjs');
const prisma = require('../config/prisma');
const { registrarLog } = require('./audit.controller');

/**
 * Al arrancar la aplicación, si no existe ningún usuario admin,
 * crea uno con las credenciales actuales del .env para no perder acceso.
 */
const seedAdminIfNeeded = async () => {
  try {
    const adminCount = await prisma.usuario.count({ where: { rol: 'admin' } });
    if (adminCount === 0) {
      const username = process.env.ADMIN_USER || 'admin';
      const password = process.env.ADMIN_PASS || 'admin123';
      const hash = await bcrypt.hash(password, 10);
      await prisma.usuario.create({
        data: {
          nombre_completo: 'Administrador',
          username,
          password_hash: hash,
          rol: 'admin',
        },
      });
      console.log(`[Auth] Usuario admin creado desde .env: ${username}`);
    }
  } catch (err) {
    console.error('[Auth] Error al crear admin inicial:', err.message);
  }
};

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: { id_usuario: true, nombre_completo: true, username: true, rol: true, activo: true, fecha_creacion: true },
      orderBy: [{ rol: 'asc' }, { nombre_completo: 'asc' }],
    });
    res.json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener usuarios.' });
  }
};

const createUsuario = async (req, res) => {
  const { nombre_completo, username, password, rol } = req.body;
  if (!nombre_completo || !username || !password || !rol) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }
  if (!['admin', 'recepcionista'].includes(rol)) {
    return res.status(400).json({ error: 'Rol inválido.' });
  }
  try {
    const existe = await prisma.usuario.findUnique({ where: { username } });
    if (existe) return res.status(409).json({ error: 'El nombre de usuario ya está en uso.' });

    const hash = await bcrypt.hash(password, 10);
    const nuevo = await prisma.usuario.create({
      data: { nombre_completo, username, password_hash: hash, rol },
      select: { id_usuario: true, nombre_completo: true, username: true, rol: true, activo: true, fecha_creacion: true },
    });
    await registrarLog(req, 'USUARIO_CREADO', `Se creó el usuario "${username}" con rol "${rol}"`, 'usuario', nuevo.id_usuario);
    res.status(201).json(nuevo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear usuario.' });
  }
};

const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre_completo, password, rol, activo } = req.body;
  try {
    const data = {};
    if (nombre_completo) data.nombre_completo = nombre_completo;
    if (rol && ['admin', 'recepcionista'].includes(rol)) data.rol = rol;
    if (typeof activo === 'boolean') data.activo = activo;
    if (password) data.password_hash = await bcrypt.hash(password, 10);

    const updated = await prisma.usuario.update({
      where: { id_usuario: parseInt(id) },
      data,
      select: { id_usuario: true, nombre_completo: true, username: true, rol: true, activo: true },
    });
    await registrarLog(req, 'USUARIO_ACTUALIZADO', `Se actualizó el usuario ID ${id}`, 'usuario', updated.id_usuario);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar usuario.' });
  }
};

const toggleUsuario = async (req, res) => {
  const { id } = req.params;
  if (parseInt(id) === req.user.id_usuario) {
    return res.status(400).json({ error: 'No puedes desactivar tu propia cuenta.' });
  }
  try {
    const current = await prisma.usuario.findUnique({ where: { id_usuario: parseInt(id) } });
    if (!current) return res.status(404).json({ error: 'Usuario no encontrado.' });
    const updated = await prisma.usuario.update({
      where: { id_usuario: parseInt(id) },
      data: { activo: !current.activo },
      select: { id_usuario: true, username: true, activo: true },
    });
    await registrarLog(req, updated.activo ? 'USUARIO_ACTIVADO' : 'USUARIO_DESACTIVADO', `Usuario "${updated.username}" ${updated.activo ? 'activado' : 'desactivado'}`, 'usuario', updated.id_usuario);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error al cambiar estado del usuario.' });
  }
};

module.exports = { seedAdminIfNeeded, getUsuarios, createUsuario, updateUsuario, toggleUsuario };
