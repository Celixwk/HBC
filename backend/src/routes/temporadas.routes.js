const express = require('express');
const router = express.Router();
const {
  getTemporadas,
  detectarTemporada,
  createTemporada,
  updateTemporada,
  deleteTemporada
} = require('../controllers/temporadas.controller');

router.get('/detectar',  detectarTemporada);
router.get('/',          getTemporadas);
router.post('/',         createTemporada);
router.put('/:id',       updateTemporada);
router.delete('/:id',    deleteTemporada);

module.exports = router;
