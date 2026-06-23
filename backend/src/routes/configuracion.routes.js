const express = require('express');
const router = express.Router();
const { getConfiguracion, updateConfiguracion } = require('../controllers/configuracion.controller');

router.get('/', getConfiguracion);
router.put('/', updateConfiguracion);

module.exports = router;
