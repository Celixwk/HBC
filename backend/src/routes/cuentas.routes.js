const express = require('express');
const router = express.Router();
const c = require('../controllers/cuentas.controller');

// Cuentas Espacio
router.get('/espacio', c.getCuentasEspacio);
router.post('/espacio', c.createCuentaEspacio);
router.put('/espacio/:id', c.updateCuentaEspacio);
router.patch('/espacio/:id/estado', c.cambiarEstadoCuentaEspacio);
router.delete('/espacio/:id', c.deleteCuentaEspacio);

// Cuentas Persona
router.get('/persona', c.getCuentasPersona);
router.post('/persona', c.createCuentaPersona);
router.put('/persona/:id', c.updateCuentaPersona);
router.patch('/persona/:id/estado', c.cambiarEstadoCuentaPersona);
router.delete('/persona/:id', c.deleteCuentaPersona);

// Historial Cuentas
router.get('/historial', c.getHistorialCuentas);
router.get('/historial/habitaciones', c.getHistorialHabitaciones);
router.get('/historial/personas', c.getHistorialPersonas);

// Inventario Minibar
router.get('/minibar', c.getInventarioMinibar);
router.post('/minibar', c.createInventarioMinibar);
router.put('/minibar/:id', c.updateInventarioMinibar);
router.delete('/minibar/:id', c.deleteInventarioMinibar);

module.exports = router;
