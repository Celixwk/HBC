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

module.exports = { login, verifySession };
