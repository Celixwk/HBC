const express = require('express');
const router  = express.Router();
const c       = require('../controllers/reportes.controller');

router.get('/pnl',    c.getPnL);
router.get('/meses',  c.getResumenMeses);
router.get('/anual',  c.getResumenAnual);

module.exports = router;
