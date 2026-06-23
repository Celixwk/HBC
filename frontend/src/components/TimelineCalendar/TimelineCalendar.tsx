import React from 'react';
import { addDays, format, isSameDay, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { motion } from 'framer-motion';
import './TimelineCalendar.css';

interface TimelineCalendarProps {
  startDate: Date;
  rooms: any[];
  reservations: any[];
  onReservationClick?: (reservation: any) => void;
}

// ── Determina color según estado + firma + fechas + hora actual ───────────
const getReservationColor = (res: any) => {
  const estado = res.estado_reserva?.toLowerCase();
  // firma ahora está en reserva, no en huesped
  const tieneFirma = !!res.firma;
  const ahora = new Date();
  const hoy = startOfDay(ahora);
  const minActual = ahora.getHours() * 60 + ahora.getMinutes();
  const pasoCheckOut = minActual >= 13 * 60; // 1:00 PM

  const checkIn  = startOfDay(new Date(res.check_in));
  const checkOut = startOfDay(new Date(res.check_out));

  // Completada si: marcada en BD, checkout anterior a hoy,
  // o es día de checkout y ya pasó la 1 PM
  if (
    estado === 'completada' ||
    checkOut < hoy ||
    (isSameDay(checkOut, hoy) && pasoCheckOut)
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
    const enCasa = checkIn <= hoy && checkOut >= hoy;
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

const parseLocalDate = (isoString: string) => {
  if (!isoString) return new Date();
  const datePart = isoString.split('T')[0];
  const [year, month, day] = datePart.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const getDayBlock = (res: any, day: Date): BlockType => {
  const ci = startOfDay(parseLocalDate(res.check_in));
  const co = startOfDay(parseLocalDate(res.check_out));
  const d  = startOfDay(day);

  if (d < ci || d > co) return null;

  const isCI = isSameDay(d, ci);
  const isCO = isSameDay(d, co);

  if (isCI && isCO) return 'full';
  if (isCI)  return 'start';
  if (isCO)  return 'checkout';
  return 'mid';
};

// ── Posicionamiento absoluto según tipo de bloque ─────────────────────────
//  checkout → mitad izquierda  (left: 0   → right: 50%)
//  start    → mitad derecha    (left: 50% → right: 0)
//  mid/full → celda completa   (left: 0   → right: 0)
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
  startDate, rooms, reservations, onReservationClick
}) => {
  const daysToShow = 14;
  const days = Array.from({ length: daysToShow }).map((_, i) => addDays(startDate, i));
  const today = startOfDay(new Date());

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
              <div key={i} className={`timeline-day-header ${isSameDay(day, today) ? 'today' : ''}`}>
                <span className="day-name">{format(day, 'EEE', { locale: es })}</span>
                <span className="day-number">{format(day, 'd')}</span>
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
                        className={`cal-cell ${isSameDay(day, today) ? 'cal-cell-today' : ''}`}
                      >
                        {dayBlocks.map(({ res, blockType }) => {
                          const colors = getReservationColor(res);
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
