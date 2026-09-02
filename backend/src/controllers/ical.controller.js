const prisma = require('../config/prisma');

// ─── EXPORTAR iCal (Habitaciones del sistema → Booking/Airbnb) ───────────────

/**
 * Genera un archivo iCal (texto) con las reservas confirmadas/en uso
 * GET /api/public/ical
 * GET /api/public/ical/:id_espacio  (filtrar por habitación)
 */
const exportarICal = async (req, res) => {
  try {
    const { id_espacio } = req.params;
    const filtroEspacio = id_espacio ? { id_espacio: parseInt(id_espacio) } : {};

    const reservas = await prisma.reserva.findMany({
      where: {
        estado_reserva: { in: ['confirmada', 'en_uso', 'activa'] },
        ...filtroEspacio
      },
      include: { espacio: true, huesped: true }
    });

    let icalContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Hotel Boutique Pro//ES',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:Hotel Boutique - Disponibilidad',
      'X-WR-TIMEZONE:America/Bogota',
    ].join('\r\n') + '\r\n';

    const fmtDate = (fecha) => {
      const d = new Date(fecha);
      return d.toISOString().split('T')[0].replace(/-/g, '');
    };

    const fmtNow = () => new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    reservas.forEach(r => {
      const uid = `reserva-${r.id_reserva}@hotelboutique.local`;
      const summary = `BLOCKED - Hab ${r.espacio?.numero}`;
      const description = r.huesped?.nombre_completo
        ? `Huésped: ${r.huesped.nombre_completo}`
        : 'Reserva confirmada';

      icalContent += [
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${fmtNow()}`,
        `DTSTART;VALUE=DATE:${fmtDate(r.check_in)}`,
        `DTEND;VALUE=DATE:${fmtDate(r.check_out)}`,
        `SUMMARY:${summary}`,
        `DESCRIPTION:${description}\\nOrigen: ${r.origen}`,
        'STATUS:CONFIRMED',
        'TRANSP:OPAQUE',
        'END:VEVENT',
      ].join('\r\n') + '\r\n';
    });

    icalContent += 'END:VCALENDAR';

    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="hotel_boutique_${id_espacio || 'all'}.ics"`);
    res.send(icalContent);
  } catch (error) {
    console.error('[iCal] Error generando iCal:', error);
    res.status(500).send('Error interno');
  }
};

// ─── IMPORTAR iCal (Booking/Airbnb → Sistema) ─────────────────────────────────

const ORIGEN_ICAL_MAP = {
  booking: 'Booking.com',
  airbnb: 'Airbnb',
  external: 'Externo'
};

/**
 * Descarga y parsea el iCal de una URL externa y crea/bloquea reservas en el sistema.
 * Se determina el huésped como "Huésped Booking" si no hay datos disponibles.
 */
const sincronizarICalEspacio = async (espacio) => {
  if (!espacio.url_ical) return { sincronizado: false, razon: 'Sin URL' };

  try {
    // node-ical - parseo asíncrono directo desde URL
    const ical = require('node-ical');
    const events = await ical.async.fromURL(espacio.url_ical);

    const hoy = new Date();
    let creadas = 0;
    let omitidas = 0;

    for (const key of Object.keys(events)) {
      const event = events[key];

      // Solo procesar VEVENT, ignorar VCALENDAR, VTIMEZONE, etc.
      if (event.type !== 'VEVENT') continue;

      const start = event.start ? new Date(event.start) : null;
      const end = event.end ? new Date(event.end) : null;

      // Ignorar eventos pasados
      if (!start || !end || end <= hoy) { omitidas++; continue; }

      // Ver si ya existe una reserva que cubra esas fechas para este espacio y origen externo
      const existente = await prisma.reserva.findFirst({
        where: {
          id_espacio: espacio.id_espacio,
          origen: { in: ['Booking.com', 'Airbnb', 'Externo'] },
          check_in: start,
          check_out: end,
        }
      });

      if (existente) { omitidas++; continue; }

      // Determinar nombre de huésped desde el SUMMARY si viene (Booking a veces lo manda)
      const summary = event.summary || '';
      const isBlocked = summary.toLowerCase().includes('blocked') ||
        summary.toLowerCase().includes('bloqueado') ||
        summary.toLowerCase().includes('not available');

      let nombreHuesped = isBlocked ? 'Huésped Externo' : (summary.trim() || 'Huésped Externo');

      // Determinar el origen (Booking.com, Airbnb, etc.) desde la URL
      let origen = 'Externo';
      if (espacio.url_ical.includes('booking.com')) origen = 'Booking.com';
      else if (espacio.url_ical.includes('airbnb.com')) origen = 'Airbnb';

      // Buscar o crear huésped genérico para este origen
      let huesped = await prisma.huesped.findFirst({
        where: { nombre_completo: nombreHuesped, telefono: `ICAL-${origen}` }
      });

      if (!huesped) {
        huesped = await prisma.huesped.create({
          data: {
            nombre_completo: nombreHuesped,
            telefono: `ICAL-${origen}`,
            tipo_documento: 'No Aplica',
            documento: `ICAL-${Date.now()}`
          }
        });
      }

      // Crear reserva bloqueada
      await prisma.reserva.create({
        data: {
          id_huesped: huesped.id_huesped,
          id_espacio: espacio.id_espacio,
          tipo_reserva: 'alojamiento',
          origen,
          check_in: start,
          check_out: end,
          estado_reserva: 'confirmada',
          estado_pago: 'pendiente',
          cantidad_adultos: 1,
          monto_total: 0,
        }
      });

      creadas++;
    }

    console.log(`[iCal Sync] Hab ${espacio.numero}: ${creadas} reservas creadas, ${omitidas} omitidas.`);
    return { sincronizado: true, creadas, omitidas };

  } catch (err) {
    console.error(`[iCal Sync] Error en habitación ${espacio.numero}:`, err.message);
    return { sincronizado: false, razon: err.message };
  }
};

/**
 * Sincroniza todas las habitaciones que tengan url_ical configurada.
 * Este es el método que invoca el cron job automáticamente.
 */
const sincronizarTodosLosICal = async () => {
  console.log('[iCal Sync] Iniciando sincronización automática...');
  try {
    const espacios = await prisma.espacio.findMany({
      where: { url_ical: { not: null }, activo: true }
    });

    if (espacios.length === 0) {
      console.log('[iCal Sync] Ninguna habitación tiene URL iCal configurada.');
      return;
    }

    for (const espacio of espacios) {
      await sincronizarICalEspacio(espacio);
    }

    console.log(`[iCal Sync] Completado para ${espacios.length} habitación(es).`);
  } catch (err) {
    console.error('[iCal Sync] Error general:', err.message);
  }
};

/**
 * Endpoint manual para disparar la sincronización desde el frontend (admin)
 * POST /api/public/ical/sync
 */
const triggerSincronizacion = async (req, res) => {
  try {
    await sincronizarTodosLosICal();
    res.json({ success: true, message: 'Sincronización completada.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { exportarICal, sincronizarTodosLosICal, triggerSincronizacion };
