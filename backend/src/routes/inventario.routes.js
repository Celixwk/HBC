const express = require('express');
const router = express.Router();
const c = require('../controllers/inventario.controller');

router.get('/categorias',           c.getCategorias);
router.post('/categorias',          c.createCategoria);
router.delete('/categorias/:id',    c.deleteCategoria);
router.get('/productos',            c.getProductos);
router.post('/productos',           c.createProducto);
router.put('/productos/:id',        c.updateProducto);
router.delete('/productos/:id',     c.deleteProducto);
router.get('/movimientos',          c.getMovimientos);
router.post('/movimientos/entrada', c.registrarEntrada);
router.post('/movimientos/salida',  c.registrarSalida);

module.exports = router;
