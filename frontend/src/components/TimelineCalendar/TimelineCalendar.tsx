import React from 'react';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import 'dayjs/locale/es';
import './TimelineCalendar.css';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrBefore);
dayjs.locale('es');

interface TimelineCalendarProps {
  startDate: Date;
  rooms: any[];
  reservations: any[];
  onReservationClick?: (reservation: any) => void;
  config?: { hora_check_in?: string; hora_check_out?: string } | null;
}

// ── Determina color según estado + firma + fechas + hora actual ───────────
const getReservationColor = (res: any, config: any) => {
  const estado = res.estado_reserva?.toLowerCase();
  // firma ahora está en reserva, no en huesped
  const tieneFirma = !!res.firma;
  const ahora = dayjs();
  const hoy = ahora.startOf('day');
  
  // Extraer hora de check out de config o usar 13:00 por defecto
  const [coHour, coMin] = (config?.hora_check_out || '13:00').split(':').map(Number);
  
  const minActual = ahora.hour() * 60 + ahora.minute();
  const pasoCheckOut = minActual >= (coHour * 60 + (coMin || 0));

  const ciDatePart = res.check_in.split('T')[0];
  const coDatePart = res.check_out.split('T')[0];
  
  const checkIn = dayjs.tz(ciDatePart, 'America/Bogota').startOf('day');
  const checkOut = dayjs.tz(coDatePart, 'America/Bogota').startOf('day');

  // Completada si: marcada en BD, checkout anterior a hoy,
  // o es día de checkout y ya pasó la hora límite
  if (
    estado === 'completada' ||
    checkOut.isBefore(hoy) ||
    (checkOut.isSame(hoy, 'day') && pasoCheckOut)
  ) {
    return { bg: 'rgba(139,92,246,0.18)', border: '#8b5cf655', text: '#c4b5fd', label: 'Completada' };
  }

  // no_show → rojo distintivo para que el staff lo identifique
  if (estado === 'no_show') {
    return { bg: 'rgba(239,68,68,0.12)', border: '#ef444450', text: '#f87171', label: 'No Show' };
  }

  // cancelada → gris (por si acaso queda alguna)
  if (estado === 'cancelada') {
    return { bg: 'rgba(107,114,128,0.12)', border: '#6b728040', text: '#9ca3af', label: 'Cancelada' };
  }

  // Verde si firmó — incluso si firmó antes de la fecha de llegada (pre-registrado)
  if (tieneFirma) {
    const enCasa = (checkIn.isSame(hoy, 'day') || checkIn.isBefore(hoy, 'day')) && 
                   (checkOut.isSame(hoy, 'day') || checkOut.isAfter(hoy, 'day'));
    return {
      bg: 'rgba(16,185,129,0.18)',
      border: '#10b98155',
      text: '#34d399',
      label: enCasa ? 'In-House' : 'Pre-firmado'
    };
  }

  // Sin firma → naranja (pendiente de llegada o futura)
  return { bg: 'rgba(245,158,11,0.18)', border: '#f59e0b55', text: '#fbbf24', label: 'Pendiente' };
};

// ── Tipo de bloque para una celda de día ─────────────────────────────────
type BlockType = 'start' | 'mid' | 'checkout' | 'full' | null;

const getDayBlock = (res: any, day: any): BlockType => {
  const ciDatePart = res.check_in.split('T')[0];
  const coDatePart = res.check_out.split('T')[0];
  
  const ci = dayjs.tz(ciDatePart, 'America/Bogota').startOf('day');
  const co = dayjs.tz(coDatePart, 'America/Bogota').startOf('day');
  const d  = dayjs(day).startOf('day');

  if (d.isBefore(ci, 'day') || d.isAfter(co, 'day')) return null;

  const isCI = d.isSame(ci, 'day');
  const isCO = d.isSame(co, 'day');

  if (isCI && isCO) return 'full';
  if (isCI)  return 'start';
  if (isCO)  return 'checkout';
  return 'mid';
};

// ── Posicionamiento absoluto según tipo de bloque ─────────────────────────
const blockPosition = (blockType: BlockType) => {
  switch (blockType) {
    case 'checkout': return { left: '0',    right: '50%' };
    case 'start':    return { left: '50%',  right: '0'   };
    default:         return { left: '0',    right: '0'   };
  }
};

// ── Bordes redondeados ────────────────────────────────────────────────────
const blockRadius = (blockType: BlockType) => {
  switch (blockType) {
    case 'start':    return '0 6px 6px 0';
    case 'checkout': return '6px 0 0 6px';
    case 'full':     return '6px';
    default:         return '0';
  }
};

export const TimelineCalendar: React.FC<TimelineCalendarProps> = ({
  startDate, rooms, reservations, onReservationClick, config
}) => {
  const daysToShow = 14;
  const days = Array.from({ length: daysToShow }).map((_, i) => dayjs(startDate).add(i, 'day'));
  const today = dayjs().startOf('day');

  // Solo ocultar canceladas — no_show se muestra en rojo para que el staff actúe
  const visibleReservations = reservations.filter(r => {
    return r.estado_reserva?.toLowerCase() !== 'cancelada';
  });

  return (
    <div className="timeline-container">
      <div className="timeline-scroll-area">

        {/* ── Header ──────────────────────────────────────── */}
        <div className="timeline-header">
          <div className="timeline-corner">Habitación</div>
          <div className="timeline-days" style={{ gridTemplateColumns: `repeat(${daysToShow}, 1fr)` }}>
            {days.map((day, i) => (
              <div key={i} className={`timeline-day-header ${day.isSame(today, 'day') ? 'today' : ''}`}>
                <span className="day-name">{day.format('ddd').charAt(0).toUpperCase() + day.format('ddd').slice(1)}</span>
                <span className="day-number">{day.format('D')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Leyenda ─────────────────────────────────────── */}
        <div className="cal-legend">
          <span className="cal-legend-item">
            <span className="cal-legend-dot" style={{ background: '#10b981' }}></span>In-House (firmado)
          </span>
          <span className="cal-legend-item">
            <span className="cal-legend-dot" style={{ background: '#f59e0b' }}></span>Pendiente de llegada
          </span>
          <span className="cal-legend-item">
            <span className="cal-legend-dot" style={{ background: '#8b5cf6' }}></span>Completada
          </span>
          <span className="cal-legend-item">
            <span className="cal-legend-dot" style={{ background: '#ef4444' }}></span>No Show
          </span>
        </div>

        {/* ── Body ────────────────────────────────────────── */}
        <div className="timeline-body">
          {rooms.map(room => {
            const roomRes = visibleReservations.filter(r => r.id_espacio === room.id_espacio);

            return (
              <div key={room.id_espacio} className="timeline-row">
                <div className="timeline-room-info">
                  <span className="room-number">{room.numero}</span>
                  <span className="room-type">{room.tipo_habitacion || room.tipo_espacio}</span>
                </div>

                <div className="cal-grid" style={{ gridTemplateColumns: `repeat(${daysToShow}, 1fr)` }}>
                  {days.map((day, di) => {
                    const dayBlocks = roomRes
                      .map(r => ({ res: r, blockType: getDayBlock(r, day) }))
                      .filter(b => b.blockType !== null);

                    return (
                      <div
                        key={di}
                        className={`cal-cell ${day.isSame(today, 'day') ? 'cal-cell-today' : ''}`}
                      >
                        {dayBlocks.map(({ res, blockType }) => {
                          const colors = getReservationColor(res, config);
                          const pos    = blockPosition(blockType);
                          const radius = blockRadius(blockType);
                          const showName = blockType === 'start' || blockType === 'full';

                          return (
                            <motion.div
                              key={res.id_reserva}
                              className="cal-block"
                              style={{
                                position: 'absolute',
                                top: '8px',
                                bottom: '8px',
                                left: pos.left,
                                right: pos.right,
                                background: colors.bg,
                                border: `1px solid ${colors.border}`,
                                color: colors.text,
                                borderRadius: radius,
                                display: 'flex',
                                alignItems: 'center',
                                overflow: 'visible',
                                cursor: 'pointer',
                                paddingLeft: showName ? '8px' : '0',
                                zIndex: 2,
                              }}
                              onClick={() => onReservationClick && onReservationClick(res)}
                              title={`${res.huesped?.nombre_completo} · ${colors.label}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              whileHover={{ filter: 'brightness(1.2)', zIndex: 10 }}
                            >
                              {showName && (
                                <span style={{
                                  fontSize: '12px',
                                  fontWeight: 600,
                                  whiteSpace: 'nowrap',
                                  overflow: 'visible',
                                }}>
                                  {res.huesped?.nombre_completo}
                                </span>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {rooms.length === 0 && (
            <div className="text-center p-8 text-muted">No hay habitaciones disponibles.</div>
          )}
        </div>
      </div>
    </div>
  );
};
