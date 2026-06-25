const express = require('express');
const router = express.Router();
const espaciosController = require('../controllers/espacios.controller');

// Configuración global de tipos de espacio
router.get('/config/tipos', espaciosController.getTiposEspacioConfig);
router.post('/config/tipos', espaciosController.createTipoEspacioConfig);
router.put('/config/tipos/:id', espaciosController.updateTipoEspacioConfig);
router.delete('/config/tipos/:id', espaciosController.deleteTipoEspacioConfig);

// Obtener todos los espacios
router.get('/', espaciosController.getEspacios);

// Obtener un espacio por ID
router.get('/:id', espaciosController.getEspacioById);

// Crear un nuevo espacio
router.post('/', espaciosController.createEspacio);

// Actualizar un espacio
router.put('/:id', espaciosController.updateEspacio);

// Eliminar (o desactivar) un espacio
router.delete('/:id', espaciosController.deleteEspacio);

module.exports = router;
