const express = require('express');
const router  = express.Router();
const c       = require('../controllers/gastos.controller');

router.get('/categorias',         c.getCategorias);
router.post('/categorias',        c.createCategoria);
router.put('/categorias/:id',     c.updateCategoria);
router.delete('/categorias/:id',  c.deleteCategoria);
router.get('/',                   c.getGastos);
router.post('/',                  c.createGasto);
router.put('/:id',                c.updateGasto);
router.delete('/:id',             c.deleteGasto);
router.post('/recurrentes',       c.generarRecurrentes);

module.exports = router;
