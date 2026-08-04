const express = require('express');
const router = express.Router();
const { 
  getConfiguracion, updateConfiguracion, 
  backupDatabase, restoreDatabase,
  getOrigenes, createOrigen, deleteOrigen
} = require('../controllers/configuracion.controller');

router.get('/', getConfiguracion);
router.put('/', updateConfiguracion);
router.get('/backup', backupDatabase);
router.post('/restore', express.text({ limit: '150mb' }), restoreDatabase);

router.get('/origenes', getOrigenes);
router.post('/origenes', createOrigen);
router.delete('/origenes/:id', deleteOrigen);

module.exports = router;
