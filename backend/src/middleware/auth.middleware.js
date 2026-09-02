const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Inicia sesión.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    // Fallback for legacy tokens that only had { usuario: 'admin' }
    if (!req.user.id_usuario && req.user.usuario) {
      const dbUser = await prisma.usuario.findUnique({ where: { username: req.user.usuario } });
      if (dbUser) {
        req.user.id_usuario = dbUser.id_usuario;
        req.user.username = dbUser.username;
        req.user.rol = dbUser.rol;
      }
    }
    
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Sesión inválida o expirada.' });
  }
};

/**
 * Middleware para restringir rutas a un rol específico.
 * Úsalo DESPUÉS de verifyToken: router.get('/ruta', verifyToken, requireRole('admin'), handler)
 */
const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.rol)) {
    return res.status(403).json({ error: 'No tienes permisos para realizar esta acción.' });
  }
  next();
};

module.exports = { verifyToken, requireRole };
