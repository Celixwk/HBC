const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prisma = require('../config/prisma');
const { registrarLog } = require('./audit.controller');

const login = async (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña requeridos.' });
  }

  try {
    // Buscar en la tabla de usuarios de la BD
    const user = await prisma.usuario.findUnique({ where: { username: usuario } });

    if (!user || !user.activo) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    const token = jwt.sign(
      { id_usuario: user.id_usuario, username: user.username, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Registrar login exitoso en auditoría
    await registrarLog(
      { user: { id_usuario: user.id_usuario, username: user.username }, ip: req.ip },
      'LOGIN',
      `Inicio de sesión exitoso — Rol: ${user.rol}`,
      'usuario',
      user.id_usuario
    );

    res.json({
      token,
      usuario: user.username,
      nombre_completo: user.nombre_completo,
      rol: user.rol,
    });
  } catch (err) {
    console.error('[Auth] Error en login:', err);
    res.status(500).json({ error: 'Error interno al iniciar sesión.' });
  }
};

const verifySession = (req, res) => {
  res.json({ ok: true, usuario: req.user.username, rol: req.user.rol });
};

/**
 * Cambiar contraseña del propio usuario autenticado.
 */
const updateMyPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const id_usuario = req.user.id_usuario;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Se requieren contraseña actual y nueva.' });
  }

  try {
    const user = await prisma.usuario.findUnique({ where: { id_usuario } });
    const isValid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'La contraseña actual es incorrecta.' });
    }

    const hash = await bcrypt.hash(newPassword, 10);
    await prisma.usuario.update({ where: { id_usuario }, data: { password_hash: hash } });
    await registrarLog(req, 'CONTRASENA_CAMBIADA', `El usuario cambió su propia contraseña`, 'usuario', id_usuario);
    res.json({ success: true, message: 'Contraseña actualizada correctamente.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar contraseña.' });
  }
};

module.exports = { login, verifySession, updateMyPassword };
