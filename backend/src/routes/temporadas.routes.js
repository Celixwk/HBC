const express = require('express');
const router = express.Router();
const {
  getTemporadas,
  detectarTemporada,
  createTemporada,
  updateTemporada,
  deleteTemporada,
  getAniosDisponibles
} = require('../controllers/temporadas.controller');

router.get('/detectar',  detectarTemporada);
router.get('/anios',     getAniosDisponibles);
router.get('/',          getTemporadas);
router.post('/',         createTemporada);
router.put('/:id',       updateTemporada);
router.delete('/:id',    deleteTemporada);

module.exports = router;
