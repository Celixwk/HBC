const express = require('express');
const router = express.Router();
const { getConfiguracion, updateConfiguracion, backupDatabase, restoreDatabase } = require('../controllers/configuracion.controller');

router.get('/', getConfiguracion);
router.put('/', updateConfiguracion);
router.get('/backup', backupDatabase);
router.post('/restore', express.text({ limit: '150mb' }), restoreDatabase);

module.exports = router;
