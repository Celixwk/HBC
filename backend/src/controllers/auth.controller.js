const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Hash generado del ADMIN_PASS al arrancar para comparar con bcrypt
let adminHashCache = null;

const getAdminHash = async () => {
  if (!adminHashCache) {
    adminHashCache = await bcrypt.hash(process.env.ADMIN_PASS, 10);
  }
  return adminHashCache;
};

const login = async (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña requeridos.' });
  }

  if (usuario !== process.env.ADMIN_USER) {
    return res.status(401).json({ error: 'Credenciales inválidas.' });
  }

  const isValid = password === process.env.ADMIN_PASS;
  if (!isValid) {
    return res.status(401).json({ error: 'Credenciales inválidas.' });
  }

  const token = jwt.sign(
    { usuario: process.env.ADMIN_USER, rol: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );

  res.json({ token, usuario: process.env.ADMIN_USER });
};

const verifySession = (req, res) => {
  res.json({ ok: true, usuario: req.user.usuario });
};

const fs = require('fs');

const updateCredentials = (req, res) => {
  const { currentPassword, newUsuario, newPassword } = req.body;

  if (currentPassword !== process.env.ADMIN_PASS) {
    return res.status(401).json({ error: 'La contraseña actual es incorrecta.' });
  }

  if (!newUsuario || !newPassword) {
    return res.status(400).json({ error: 'El nuevo usuario y contraseña son requeridos.' });
  }

  try {
    const settingsPath = process.env.SETTINGS_PATH;
    if (settingsPath && fs.existsSync(settingsPath)) {
      const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
      settings.adminUser = newUsuario;
      settings.adminPass = newPassword;
      fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

      // Update env variables for current process
      process.env.ADMIN_USER = newUsuario;
      process.env.ADMIN_PASS = newPassword;
      adminHashCache = null;

      res.json({ success: true, message: 'Credenciales actualizadas correctamente.' });
    } else {
      res.status(500).json({ error: 'No se pudo encontrar el archivo de configuración.' });
    }
  } catch (error) {
    console.error('Error actualizando credenciales:', error);
    res.status(500).json({ error: 'Error interno al actualizar credenciales.' });
  }
};

module.exports = { login, verifySession, updateCredentials };
