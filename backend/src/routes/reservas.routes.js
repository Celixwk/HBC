const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservas.controller');

// Obtener todas las reservas
router.get('/', reservasController.getReservas);

// Crear nueva reserva
router.post('/', reservasController.createReserva);

// Actualizar reserva completa (habitación, personas, fechas, monto)
router.put('/:id', reservasController.updateReservaFull);

// Actualizar solo fechas
router.put('/:id/dates', reservasController.updateReservaDates);

// Eliminar reserva
router.delete('/:id', reservasController.deleteReserva);

// Actualizar estado de reserva
router.put('/:id/estado', reservasController.updateReservaEstado);

// Actualizar estado de pago
router.put('/:id/pago', reservasController.updateReservaPago);

// Actualizar titular de la reserva
router.patch('/:id/huesped', reservasController.updateReservaHuesped);

// Corregir monto_total (usado cuando el precio de config difiere del almacenado)
router.patch('/:id/monto', reservasController.updateReservaMonto);

module.exports = router;
