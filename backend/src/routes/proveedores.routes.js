const express = require('express');
const router = express.Router();
const c = require('../controllers/proveedores.controller');

router.get('/',    c.getProveedores);
router.post('/',   c.createProveedor);
router.put('/:id', c.updateProveedor);
router.delete('/:id', c.deleteProveedor);

module.exports = router;
