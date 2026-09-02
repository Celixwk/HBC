const express = require('express');
const router = express.Router();
const { exportarICal, triggerSincronizacion } = require('../controllers/ical.controller');

// ─── iCal EXPORTAR (Para Booking/Airbnb - sin autenticación) ─────────────────
// URL a pegar en Booking: GET /api/public/ical  (todas las habitaciones)
// URL por habitación:     GET /api/public/ical/:id_espacio
router.get('/ical', exportarICal);
router.get('/ical/:id_espacio', exportarICal);

// ─── Trigger manual de sincronización (requiere estar logueado, se llama desde Settings) ─
router.post('/ical/sync', triggerSincronizacion);

// ─── DISPONIBILIDAD (Para página web propia) ──────────────────────────────────
/**
 * GET /api/public/disponibilidad?checkIn=YYYY-MM-DD&checkOut=YYYY-MM-DD&personas=2
 */
const prisma = require('../config/prisma');

router.get('/disponibilidad', async (req, res) => {
  const { checkIn, checkOut, personas } = req.query;

  if (!checkIn || !checkOut) {
    return res.status(400).json({ error: 'Faltan fechas de checkIn o checkOut' });
  }

  try {
    const espacios = await prisma.espacio.findMany({
      where: {
        tipo_espacio: 'habitacion',
        activo: true,
        reserva: {
          none: {
            AND: [
              { estado_reserva: { in: ['confirmada', 'en_uso', 'activa'] } },
              { check_in: { lt: new Date(checkOut) } },
              { check_out: { gt: new Date(checkIn) } }
            ]
          }
        }
      },
      select: {
        id_espacio: true,
        numero: true,
        tipo_habitacion: true,
        capacidad_personas: true,
        precio_persona_1: true,
        precio_persona_2: true,
      }
    });

    res.json(espacios);
  } catch (err) {
    console.error('[API Public] Error disponibilidad:', err);
    res.status(500).json({ error: 'Error al consultar disponibilidad' });
  }
});

// ─── CREAR RESERVA (Desde página web propia) ──────────────────────────────────
/**
 * POST /api/public/reservar
 */
router.post('/reservar', async (req, res) => {
  const { nombre_completo, email, telefono, checkIn, checkOut, id_espacio, cantidad_personas } = req.body;

  try {
    // 1. Validar disponibilidad en tiempo real
    const conflicto = await prisma.reserva.findFirst({
      where: {
        id_espacio: parseInt(id_espacio),
        estado_reserva: { in: ['confirmada', 'en_uso', 'activa'] },
        check_in: { lt: new Date(checkOut) },
        check_out: { gt: new Date(checkIn) }
      }
    });

    if (conflicto) {
      return res.status(409).json({ error: 'La habitación ya no está disponible para esas fechas.' });
    }

    // 2. Buscar o crear huésped
    let huesped = email
      ? await prisma.huesped.findFirst({ where: { nombre_completo, telefono } })
      : null;

    if (!huesped) {
      huesped = await prisma.huesped.create({
        data: {
          nombre_completo,
          email,
          telefono,
          tipo_documento: 'No Especificado',
          documento: `WEB-${Date.now()}`
        }
      });
    }

    // 3. Calcular monto
    const espacio = await prisma.espacio.findUnique({ where: { id_espacio: parseInt(id_espacio) } });
    const numPersonas = parseInt(cantidad_personas) || 1;
    const precioBase = numPersonas === 1
      ? parseFloat(espacio?.precio_persona_1 || 0)
      : parseFloat(espacio?.precio_persona_2 || 0);
    const noches = Math.max(1, Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)));
    const montoTotal = precioBase * noches;

    // 4. Crear reserva con origen "Página Web"
    const nuevaReserva = await prisma.reserva.create({
      data: {
        id_huesped: huesped.id_huesped,
        id_espacio: parseInt(id_espacio),
        tipo_reserva: 'alojamiento',
        origen: 'Página Web',    // ← Origen correcto para reservas web
        check_in: new Date(checkIn),
        check_out: new Date(checkOut),
        estado_reserva: 'confirmada',
        estado_pago: 'pendiente',
        cantidad_adultos: numPersonas,
        monto_total: montoTotal,
      }
    });

    res.json({ success: true, reserva: nuevaReserva });
  } catch (err) {
    console.error('[API Public] Error reservar:', err);
    res.status(500).json({ error: 'Error al procesar reserva' });
  }
});

module.exports = router;
