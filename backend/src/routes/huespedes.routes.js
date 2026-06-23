const express = require('express');
const router = express.Router();
const huespedesController = require('../controllers/huespedes.controller');

router.get('/', huespedesController.getHuespedes);
router.post('/', huespedesController.createHuesped);
router.put('/:id', huespedesController.updateHuesped);
router.put('/:id/firma', huespedesController.updateFirma);
router.delete('/:id', huespedesController.deleteHuesped);

module.exports = router;

