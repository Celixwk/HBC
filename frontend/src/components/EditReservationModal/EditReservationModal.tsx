import React, { useState, useEffect, useMemo } from 'react';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import { Calendar, Trash2, Save, BedDouble, Users, FileText, CreditCard, Clock, UserCog } from 'lucide-react';
import { differenceInDays } from 'date-fns';
import '../NewReservationModal/NewReservationModal.css';
import './EditReservationModal.css';
import { apiFetch } from '../../utils/apiFetch';
import { ChangeGuestModal } from '../ChangeGuestModal/ChangeGuestModal';

interface EditReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  reservation: any | null;
  rooms: any[];
  reservations: any[];
}

const fmt = (n: number) => n.toLocaleString('es-CO', { minimumFractionDigits: 0 });

export const EditReservationModal: React.FC<EditReservationModalProps> = ({
  isOpen, onClose, onSuccess, reservation, rooms, reservations
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');
  const [tiposConfig, setTiposConfig] = useState<any[]>([]);

  // State for Change Guest Modal
  const [isChangeGuestOpen, setIsChangeGuestOpen] = useState(false);

  const [checkIn,           setCheckIn]           = useState('');
  const [checkOut,          setCheckOut]          = useState('');
  const [idEspacio,         setIdEspacio]         = useState('');
  const [cantAdultos,       setCantAdultos]       = useState('1');
  const [cantNinos,         setCantNinos]         = useState('0');
  const [anotaciones,       setAnotaciones]       = useState('');
  const [precioSalonManual, setPrecioSalonManual] = useState('');
  const [fechaEvento,       setFechaEvento]       = useState('');
  const [horaInicio,        setHoraInicio]        = useState('');
  const [horaFin,           setHoraFin]           = useState('');
  const [estadoPago,        setEstadoPago]        = useState('pendiente');
  const [savingPago,        setSavingPago]        = useState(false);

  // Inicializar cuando cambia la reserva
  useEffect(() => {
    if (reservation) {
      setCheckIn(reservation.check_in.substring(0, 10));
      setCheckOut(reservation.check_out.substring(0, 10));
      setIdEspacio(String(reservation.id_espacio));
      setCantAdultos(String(reservation.cantidad_adultos || 1));
      setCantNinos(String(reservation.cantidad_ninos || 0));
      setAnotaciones(reservation.anotaciones || '');
      setPrecioSalonManual(String(reservation.monto_total || ''));
      setFechaEvento(reservation.fecha_evento ? reservation.fecha_evento.substring(0, 10) : '');
      setHoraInicio(reservation.hora_inicio ? reservation.hora_inicio.substring(0, 5) : '');
      setHoraFin(reservation.hora_fin ? reservation.hora_fin.substring(0, 5) : '');
      setEstadoPago(reservation.estado_pago || 'pendiente');
      setError('');
      
      apiFetch('/espacios/config/tipos')
        .then(res => res.json())
        .then(data => setTiposConfig(data))
        .catch(err => console.error('Error fetching tipos config:', err));
    }
  }, [reservation]);

  const selectedRoom = rooms.find(r => r.id_espacio.toString() === idEspacio);
  const isSalon      = selectedRoom?.tipo_espacio === 'salon';

  // Habitaciones disponibles para las fechas seleccionadas (excluyendo la reserva actual)
  const availableRooms = useMemo(() => {
    if (!checkIn || !checkOut) return rooms.filter(r => r.activo);
    const ci = new Date(checkIn);
    const co = new Date(checkOut);
    return rooms.filter(r => {
      if (!r.activo) return false;
      const roomRes = reservations.filter(
        (rv: any) =>
          rv.id_espacio === r.id_espacio &&
          rv.id_reserva !== reservation?.id_reserva &&
          !['cancelada', 'no_show'].includes(rv.estado_reserva)
      );
      const overlap = roomRes.some((rv: any) => {
        const rvIn  = new Date(rv.check_in.substring(0, 10));
        const rvOut = new Date(rv.check_out.substring(0, 10));
        return ci < rvOut && co > rvIn;
      });
      return !overlap;
    });
  }, [checkIn, checkOut, rooms, reservations, reservation]);

  // Cálculo de precio igual que en NewReservationModal
  const { montoTotal, noches, precioNoche } = useMemo(() => {
    if (!checkIn || !checkOut || !selectedRoom) return { montoTotal: 0, noches: 0, precioNoche: 0 };
    const ci = new Date(checkIn);
    const co = new Date(checkOut);
    const n  = differenceInDays(co, ci);
    if (n <= 0) return { montoTotal: 0, noches: 0, precioNoche: 0 };

    if (isSalon) {
      const manualPrice = parseFloat(precioSalonManual.replace(/[^0-9.]/g, '')) || 0;
      return { montoTotal: manualPrice, noches: n, precioNoche: 0 };
    }

    const isModified = 
      checkIn !== reservation?.check_in?.substring(0, 10) ||
      checkOut !== reservation?.check_out?.substring(0, 10) ||
      idEspacio !== String(reservation?.id_espacio) ||
      cantAdultos !== String(reservation?.cantidad_adultos || 1) ||
      cantNinos !== String(reservation?.cantidad_ninos || 0);

    if (!isModified && reservation) {
      const originalTotal = parseFloat(reservation.monto_total || '0');
      return { montoTotal: originalTotal, noches: n, precioNoche: originalTotal / (n || 1) };
    }

    const adultos = parseInt(cantAdultos) || 1;
    const ninos   = parseInt(cantNinos)   || 0;
    const totalPersonas = adultos + ninos;

    let pxN = 0;
    const tipoConfig = tiposConfig.find(t => t.nombre.toLowerCase() === selectedRoom?.tipo_habitacion?.toLowerCase());

    if (tipoConfig) {
      const base = parseFloat(tipoConfig.precio_base || '0');
      const recPareja = parseFloat(tipoConfig.recargo_pareja || '0');
      const recAdicional = parseFloat(tipoConfig.recargo_adicional || '0');
      
      if (totalPersonas === 1) pxN = base;
      else if (totalPersonas === 2) pxN = base + recPareja;
      else pxN = base + recPareja + (recAdicional * (totalPersonas - 2));
    } else {
      const p1   = parseFloat(selectedRoom.precio_persona_1 || 0);
      const p2   = parseFloat(selectedRoom.precio_persona_2 || 0) || p1;
      const pAdd = parseFloat(selectedRoom.precio_adicional || 0);
      
      if (adultos === 1)     pxN = p1;
      else if (adultos === 2) pxN = p2;
      else                    pxN = p2 + (adultos - 2) * pAdd;
      pxN += ninos * pAdd;
    }

    return { montoTotal: pxN * n, noches: n, precioNoche: pxN };
  }, [checkIn, checkOut, selectedRoom, cantAdultos, cantNinos, isSalon, precioSalonManual, tiposConfig, reservation]);

  if (!reservation) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idEspacio) { setError('Selecciona una habitación.'); return; }
    if (!checkIn || !checkOut) { setError('Indica las fechas de estadía.'); return; }
    if (new Date(checkOut) <= new Date(checkIn)) { setError('Check-out debe ser posterior al check-in.'); return; }

    setLoading(true);
    setError('');

    try {
      const res = await apiFetch(`/reservas/${reservation.id_reserva}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_espacio:       parseInt(idEspacio),
          check_in:         checkIn,
          check_out:        checkOut,
          cantidad_adultos: parseInt(cantAdultos) || 1,
          cantidad_ninos:   parseInt(cantNinos)   || 0,
          monto_total:      montoTotal,
          anotaciones:      anotaciones || null,
          fecha_evento:     fechaEvento || null,
          hora_inicio:      horaInicio || null,
          hora_fin:         horaFin || null,
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al actualizar reserva');

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = async () => {
    if (!window.confirm('¿Cancelar esta reserva? Quedará marcada como cancelada pero el historial se conserva.')) return;
    setLoading(true);
    try {
      const res = await apiFetch(`/reservas/${reservation.id_reserva}/estado`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado_reserva: 'cancelada' })
      });
      if (!res.ok) throw new Error('Error al cancelar reserva');
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Eliminar permanentemente esta reserva? Esta acción no se puede deshacer.')) return;
    setLoading(true);
    try {
      const res = await apiFetch(`/reservas/${reservation.id_reserva}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar reserva');
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMarcarPagado = async () => {
    const nuevoEstado = estadoPago === 'pagado' ? 'pendiente' : 'pagado';
    setSavingPago(true);
    try {
      const res = await apiFetch(`/reservas/${reservation.id_reserva}/pago`, {
        method: 'PUT',
        body: JSON.stringify({ estado_pago: nuevoEstado, monto_pagado: nuevoEstado === 'pagado' ? montoTotal : 0 })
      });
      if (!res.ok) throw new Error('Error al actualizar pago');
      setEstadoPago(nuevoEstado);
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSavingPago(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Modificar Reserva: ${reservation.huesped?.nombre_completo}`}>
      <form onSubmit={handleSave} className="edit-reserva-form p-4">
        {error && <div className="form-error">{error}</div>}

        {/* ── Fechas ── */}
        <div className="form-section">
          <div className="form-section-title"><Calendar size={14} /> Fechas de Estadía</div>
          <div className="form-grid-2">
            <div className="form-group">
              <label htmlFor="edit_check_in">Check In *</label>
              <input type="date" id="edit_check_in"
                value={checkIn} onChange={e => setCheckIn(e.target.value)}
                required className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="edit_check_out">Check Out *</label>
              <input type="date" id="edit_check_out"
                value={checkOut} onChange={e => setCheckOut(e.target.value)}
                required className="form-input" />
            </div>
          </div>
        </div>

        {/* ── Habitación ── */}
        <div className="form-section">
          <div className="form-section-title"><BedDouble size={14} /> Habitación</div>
          <div className="form-group">
            <label htmlFor="edit_espacio">Habitación *</label>
            <select id="edit_espacio" value={idEspacio}
              onChange={e => setIdEspacio(e.target.value)}
              required className="form-input">
              <option value="">Seleccionar habitación...</option>
              {/* Siempre mostrar la habitación actual aunque no esté en availableRooms */}
              {rooms.filter(r => r.activo).map(room => {
                const isAvailable = availableRooms.some(ar => ar.id_espacio === room.id_espacio);
                const isCurrent   = room.id_espacio.toString() === idEspacio;
                if (!isAvailable && !isCurrent) return null;
                return (
                  <option key={room.id_espacio} value={room.id_espacio}>
                    Hab. {room.numero} — {room.tipo_habitacion || room.tipo_espacio}
                    {isCurrent && !isAvailable ? ' (actual)' : ''}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Precios de la habitación seleccionada */}
          {selectedRoom && !isSalon && (
            <div className="room-price-info" style={{ marginTop: '8px', padding: '10px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <span>1 persona: <strong style={{ color: 'var(--text-primary)' }}>${fmt(parseFloat(selectedRoom.precio_persona_1 || 0))}</strong></span>
              {selectedRoom.precio_persona_2 && <span>2 personas: <strong style={{ color: 'var(--text-primary)' }}>${fmt(parseFloat(selectedRoom.precio_persona_2))}</strong></span>}
              {selectedRoom.precio_adicional  && <span>c/adicional: <strong style={{ color: 'var(--text-primary)' }}>${fmt(parseFloat(selectedRoom.precio_adicional))}</strong></span>}
            </div>
          )}

          {isSalon && (
            <>
              <div className="form-group" style={{ marginTop: '8px' }}>
                <label htmlFor="edit_salon_personas"><Users size={13} style={{ display: 'inline', marginRight: 4 }} />Cantidad de personas</label>
                <input type="number" id="edit_salon_personas" min="1"
                  value={cantAdultos} onChange={e => setCantAdultos(e.target.value)}
                  className="form-input text-center" placeholder="Ej: 50" />
              </div>
              <div className="form-group" style={{ marginTop: '8px' }}>
                <label htmlFor="edit_precio_salon">Valor total acordado *</label>
                <input type="number" id="edit_precio_salon" min="1"
                  value={precioSalonManual}
                  onChange={e => setPrecioSalonManual(e.target.value)}
                  placeholder="Ej: 500000"
                  className="form-input" />
              </div>
            </>
          )}
        </div>

        {/* ── Personas ── */}
        {!isSalon && (
          <div className="form-section">
            <div className="form-section-title"><Users size={14} /> Cantidad de Personas</div>
            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="edit_adultos">Adultos *</label>
                <input type="number" id="edit_adultos" min="1" max="10"
                  value={cantAdultos} onChange={e => setCantAdultos(e.target.value)}
                  required className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="edit_ninos">Niños</label>
                <input type="number" id="edit_ninos" min="0" max="10"
                  value={cantNinos} onChange={e => setCantNinos(e.target.value)}
                  className="form-input" />
              </div>
            </div>
          </div>
        )}

        {/* ── Campos de Evento (solo salón) ── */}
        {isSalon && (
          <div className="form-section">
            <div className="form-section-title"><Clock size={14} /> Datos del Evento</div>
            <div className="form-group">
              <label htmlFor="edit_fecha_evento">Fecha del evento</label>
              <input type="date" id="edit_fecha_evento"
                value={fechaEvento} onChange={e => setFechaEvento(e.target.value)}
                className="form-input" />
            </div>
            <div className="form-grid-2" style={{ marginTop: 8 }}>
              <div className="form-group">
                <label htmlFor="edit_hora_inicio">Hora inicio</label>
                <input type="time" id="edit_hora_inicio"
                  value={horaInicio} onChange={e => setHoraInicio(e.target.value)}
                  className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="edit_hora_fin">Hora fin</label>
                <input type="time" id="edit_hora_fin"
                  value={horaFin} onChange={e => setHoraFin(e.target.value)}
                  className="form-input" />
              </div>
            </div>
          </div>
        )}

        {/* ── Anotaciones ── */}
        <div className="form-section">
          <div className="form-section-title"><FileText size={14} /> Anotaciones</div>
          <div className="form-group">
            <textarea id="edit_anotaciones"
              value={anotaciones} onChange={e => setAnotaciones(e.target.value)}
              placeholder="Notas adicionales (opcional)"
              className="form-input" rows={2} style={{ resize: 'vertical' }} />
          </div>
        </div>

        {/* ── Titular de la Reserva ── */}
        <div className="form-section" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10, padding: '12px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="form-section-title" style={{ marginBottom: 2 }}><UserCog size={14} /> Titular Actual</div>
              <span style={{ fontSize: '13px', fontWeight: 'bold' }}>
                {reservation.huesped?.nombre_completo} ({reservation.huesped?.documento})
              </span>
            </div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsChangeGuestOpen(true)}
            >
              Cambiar Titular
            </Button>
          </div>
        </div>

        {/* ── Estado de Pago ── */}
        <div className="form-section" style={{ background: estadoPago === 'pagado' ? 'rgba(16,185,129,0.06)' : 'rgba(245,158,11,0.06)', border: `1px solid ${estadoPago === 'pagado' ? 'rgba(16,185,129,0.25)' : 'rgba(245,158,11,0.25)'}`, borderRadius: 10, padding: '12px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="form-section-title" style={{ marginBottom: 2 }}><CreditCard size={14} /> Estado de Pago</div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {estadoPago === 'pagado' ? 'Reserva pagada en su totalidad' : 'Pago pendiente de recibir'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleMarcarPagado}
              disabled={savingPago}
              style={{
                padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '13px',
                background: estadoPago === 'pagado' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)',
                color: estadoPago === 'pagado' ? '#10b981' : '#f59e0b',
                transition: 'opacity 0.2s'
              }}
            >
              {savingPago ? '...' : estadoPago === 'pagado' ? '✓ Pagado' : 'Marcar como Pagado'}
            </button>
          </div>
        </div>

        {/* ── Resumen precio ── */}
        {noches > 0 && (
          <div className="price-summary" style={{ background: 'rgba(79,70,229,0.1)', border: '1px solid rgba(79,70,229,0.3)', borderRadius: '10px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              {isSalon ? `Salón — ${noches} noche(s)` : `${noches} noche(s) × $${fmt(precioNoche)}/noche`}
            </div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--primary)' }}>
              ${fmt(montoTotal)}
            </div>
          </div>
        )}

        {/* ── Acciones ── */}
        <div className="edit-actions">
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button type="button" variant="ghost" onClick={handleCancelar} disabled={loading}
              style={{ color: '#f59e0b', borderColor: '#f59e0b' }}>
              Cancelar Reserva
            </Button>
            <Button type="button" variant="ghost" onClick={handleDelete} disabled={loading}
              style={{ color: '#ef4444', borderColor: '#ef4444' }}>
              <Trash2 size={16} /> Eliminar
            </Button>
          </div>
          <div className="edit-actions-right">
            <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>Cerrar</Button>
            <Button type="submit" variant="primary" disabled={loading}>
              <Save size={16} /> {loading ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </div>
        </div>
      </form>
      <ChangeGuestModal
        isOpen={isChangeGuestOpen}
        onClose={() => setIsChangeGuestOpen(false)}
        idReserva={reservation?.id_reserva}
        currentGuestName={reservation?.huesped?.nombre_completo}
        onSuccess={() => {
          setIsChangeGuestOpen(false);
          onSuccess(); // Refresh to get the new guest data in the parent
        }}
      />
    </Modal>
  );
};
