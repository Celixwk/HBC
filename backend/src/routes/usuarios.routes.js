const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/auth.middleware');
const { getUsuarios, createUsuario, updateUsuario, toggleUsuario } = require('../controllers/usuario.controller');

// Todas las rutas de usuarios son solo para admin
router.get('/',         verifyToken, requireRole('admin'), getUsuarios);
router.post('/',        verifyToken, requireRole('admin'), createUsuario);
router.put('/:id',      verifyToken, requireRole('admin'), updateUsuario);
router.patch('/:id/toggle', verifyToken, requireRole('admin'), toggleUsuario);

module.exports = router;
