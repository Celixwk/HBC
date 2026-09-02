const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/auth.middleware');
const { abrirCaja, getCajaActiva, cerrarCaja, getHistorialCaja } = require('../controllers/caja.controller');

router.post('/abrir',      verifyToken, abrirCaja);
router.get('/activa',      verifyToken, getCajaActiva);
router.post('/cerrar',     verifyToken, cerrarCaja);
router.get('/historial',   verifyToken, requireRole('admin'), getHistorialCaja);

module.exports = router;
