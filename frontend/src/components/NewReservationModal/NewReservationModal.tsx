import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import { differenceInDays } from 'date-fns';
import { User, Calendar, BedDouble, Users, FileText, Info, Clock, CheckSquare, Search, X } from 'lucide-react';
import './NewReservationModal.css';
import { apiFetch } from '../../utils/apiFetch';

interface NewReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newReserva: any) => void;
  rooms: any[];
  reservations: any[];
}

const fmt = (n: number) => n.toLocaleString('es-CO', { minimumFractionDigits: 0 });

export const NewReservationModal: React.FC<NewReservationModalProps> = ({ isOpen, onClose, onSuccess, rooms, reservations }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [allGuests, setAllGuests] = useState<any[]>([]);
  const [config, setConfig] = useState<any>(null);
  const [tiposConfig, setTiposConfig] = useState<any[]>([]);
  const [guestSearch, setGuestSearch] = useState('');
  const [showGuestDrop, setShowGuestDrop] = useState(false);
  const [selectedGuestId, setSelectedGuestId] = useState<number | null>(null);
  const guestDropRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    nombre_huesped: '',
    documento: '',
    telefono: '',
    procedencia: '',
    id_espacios: [] as string[],
    check_in: '',
    check_out: '',
    cantidad_adultos: '1',
    cantidad_ninos: '',
    anotaciones: ''
  });

  const [montoTotal, setMontoTotal] = useState(0);
  const [noches, setNoches] = useState(0);
  const [precioSalon, setPrecioSalon] = useState('');
  const [fechaEvento, setFechaEvento] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');

  const selectedRooms = rooms.filter(r => formData.id_espacios.includes(r.id_espacio.toString()));
  const isSalon = selectedRooms.length > 0 && selectedRooms[0].tipo_espacio === 'salon';

  useEffect(() => {
    if (isOpen) {
      apiFetch('/huespedes').then(r => r.json()).then(setAllGuests).catch(console.error);
      apiFetch('/configuracion').then(r => r.json()).then(setConfig).catch(console.error);
      apiFetch('/espacios/config/tipos').then(r => r.json()).then(d => setTiposConfig(Array.isArray(d) ? d : [])).catch(() => setTiposConfig([]));
    }
  }, [isOpen]);

  const availableRooms = React.useMemo(() => {
    if (!formData.check_in || !formData.check_out) return rooms.filter(r => r.activo);
    const checkIn = new Date(formData.check_in);
    const checkOut = new Date(formData.check_out);
    return rooms.filter(r => {
      if (!r.activo) return false;
      const roomRes = reservations.filter((res: any) => res.id_espacio === r.id_espacio && res.estado_reserva !== 'cancelada');
      const isOverlapping = roomRes.some((res: any) => {
        const resIn = new Date(res.check_in.substring(0, 10));
        const resOut = new Date(res.check_out.substring(0, 10));
        return checkIn < resOut && checkOut > resIn;
      });
      return !isOverlapping;
    });
  }, [formData.check_in, formData.check_out, rooms, reservations]);

  const getPriceForRoom = useCallback((room: any, adultos: number, ninos: number): number => {
    const totalPersonas = adultos + ninos;
    const tipoConfig = tiposConfig.find(t => t.nombre.toLowerCase() === room.tipo_habitacion?.toLowerCase());
    if (tipoConfig) {
      const base = parseFloat(tipoConfig.precio_base || '0');
      const recPareja = parseFloat(tipoConfig.recargo_pareja || '0');
      const recAdicional = parseFloat(tipoConfig.recargo_adicional || '0');
      if (totalPersonas <= 1) return base;
      if (totalPersonas === 2) return base + recPareja;
      return base + recPareja + recAdicional * (totalPersonas - 2);
    }
    // Fallback a precios individuales de la habitación
    const p1 = room.precio_persona_1 ? parseFloat(room.precio_persona_1) : 0;
    const p2 = room.precio_persona_2 ? parseFloat(room.precio_persona_2) : p1;
    const pAdd = room.precio_adicional ? parseFloat(room.precio_adicional) : 0;
    if (adultos <= 1) return p1;
    if (adultos === 2) return p2;
    return p2 + (adultos - 2) * pAdd + ninos * pAdd;
  }, [tiposConfig]);

  useEffect(() => {
    if (!formData.check_in || !formData.check_out || formData.id_espacios.length === 0) {
      setMontoTotal(0); setNoches(0); return;
    }
    const nights = differenceInDays(new Date(formData.check_out), new Date(formData.check_in));
    setNoches(nights > 0 ? nights : 0);
    if (nights <= 0) { setMontoTotal(0); return; }

    if (isSalon) {
      setMontoTotal(parseFloat(precioSalon) || 0);
      return;
    }

    const adultos = parseInt(formData.cantidad_adultos) || 1;
    const ninos = parseInt(formData.cantidad_ninos) || 0;
    const totalNoche = selectedRooms.reduce((sum, r) => sum + getPriceForRoom(r, adultos, ninos), 0);
    setMontoTotal(totalNoche * nights);
  }, [formData.check_in, formData.check_out, formData.id_espacios, formData.cantidad_adultos, formData.cantidad_ninos, precioSalon, isSalon, selectedRooms, getPriceForRoom]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoomToggle = (roomId: string, esSalon: boolean) => {
    setFormData(prev => {
      const already = prev.id_espacios.includes(roomId);
      if (already) {
        return { ...prev, id_espacios: prev.id_espacios.filter(id => id !== roomId) };
      }
      if (esSalon) {
        // Los salones son selección única
        return { ...prev, id_espacios: [roomId] };
      }
      // Deseleccionar salones si se selecciona una habitación
      const sinSalones = prev.id_espacios.filter(id => {
        const r = rooms.find(rm => rm.id_espacio.toString() === id);
        return r && r.tipo_espacio !== 'salon';
      });
      return { ...prev, id_espacios: [...sinSalones, roomId] };
    });
  };

  const handleSelectGuest = (guest: any) => {
    setSelectedGuestId(guest.id_huesped);
    setGuestSearch(`${guest.nombre_completo} — ${guest.documento}`);
    setShowGuestDrop(false);
    setFormData(prev => ({
      ...prev,
      nombre_huesped: guest.nombre_completo,
      documento: guest.documento,
      telefono: guest.telefono || '',
      procedencia: guest.procedencia || ''
    }));
  };

  const handleClearGuest = () => {
    setSelectedGuestId(null);
    setGuestSearch('');
    setFormData(prev => ({ ...prev, nombre_huesped: '', documento: '', telefono: '', procedencia: '' }));
  };

  const filteredGuests = allGuests.filter(g =>
    g.nombre_completo.toLowerCase().includes(guestSearch.toLowerCase()) ||
    (g.documento && g.documento.includes(guestSearch)) ||
    (g.telefono && g.telefono.includes(guestSearch))
  );

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (guestDropRef.current && !guestDropRef.current.contains(e.target as Node)) {
        setShowGuestDrop(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.id_espacios.length === 0) { setError('Debes seleccionar al menos una habitación.'); return; }
    setLoading(true); setError('');

    try {
      let idHuesped: number;

      if (selectedGuestId) {
        idHuesped = selectedGuestId;
      } else {
        const resCrear = await apiFetch('/huespedes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre_completo: formData.nombre_huesped,
            documento: formData.documento,
            telefono: formData.telefono,
            procedencia: formData.procedencia,
            tipo_documento: 'CC'
          })
        });
        const dataH = await resCrear.json();
        if (!resCrear.ok) throw new Error(dataH.error || 'Error al crear huésped');
        idHuesped = dataH.id_huesped;
      }

      const response = await apiFetch('/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_huesped: idHuesped,
          id_espacio: formData.id_espacios,
          check_in: formData.check_in,
          check_out: formData.check_out,
          cantidad_adultos: parseInt(formData.cantidad_adultos) || 1,
          cantidad_ninos: parseInt(formData.cantidad_ninos) || 0,
          anotaciones: formData.anotaciones || null,
          monto_total: montoTotal,
          tipo_reserva: isSalon ? 'evento' : 'alojamiento',
          fecha_evento: isSalon && fechaEvento ? fechaEvento : null,
          hora_inicio: isSalon && horaInicio ? horaInicio : null,
          hora_fin: isSalon && horaFin ? horaFin : null,
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error al crear la reserva');

      onSuccess(data);
      onClose();
      setFormData({ nombre_huesped: '', documento: '', telefono: '', procedencia: '', id_espacios: [], check_in: '', check_out: '', cantidad_adultos: '1', cantidad_ninos: '', anotaciones: '' });
      setMontoTotal(0); setNoches(0); setPrecioSalon('');
      setGuestSearch(''); setSelectedGuestId(null); setShowGuestDrop(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const adultos = parseInt(formData.cantidad_adultos) || 1;
  const ninos = parseInt(formData.cantidad_ninos) || 0;

  // Agrupar habitaciones disponibles por tipo
  const habitacionesDisponibles = availableRooms.filter(r => r.tipo_espacio !== 'salon');
  const salonesDisponibles = availableRooms.filter(r => r.tipo_espacio === 'salon');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nueva Reserva">
      <form onSubmit={handleSubmit} className="reserva-form">
        {error && <div className="form-error">{error}</div>}

        {/* ── Huésped ── */}
        <div className="form-section">
          <div className="form-section-title"><User size={14} /> Datos del Huésped</div>

          {/* Buscador de huéspedes */}
          <div className="guest-search-container" ref={guestDropRef}>
            <label>Buscar huésped existente</label>
            <div className="guest-search-input-wrap">
              <Search size={14} className="guest-search-icon" />
              <input
                type="text"
                className="form-input guest-search-input"
                placeholder="Nombre, documento o teléfono..."
                value={guestSearch}
                autoComplete="off"
                onChange={e => { setGuestSearch(e.target.value); setShowGuestDrop(true); setSelectedGuestId(null); }}
                onFocus={() => setShowGuestDrop(true)}
              />
              {(guestSearch || selectedGuestId) && (
                <button type="button" className="guest-search-clear" onClick={handleClearGuest}>
                  <X size={13} />
                </button>
              )}
            </div>
            {showGuestDrop && (
              <div className="guest-dropdown">
                {filteredGuests.length === 0 ? (
                  <div className="guest-drop-empty">No hay coincidencias — completa el formulario para crear nuevo</div>
                ) : (
                  filteredGuests.slice(0, 8).map(g => (
                    <div key={g.id_huesped} className="guest-drop-item" onMouseDown={() => handleSelectGuest(g)}>
                      <span className="guest-drop-name">{g.nombre_completo}</span>
                      <span className="guest-drop-meta">{g.documento}{g.telefono ? ` · ${g.telefono}` : ''}{g.procedencia ? ` · ${g.procedencia}` : ''}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label>Nombre completo *</label>
              <input type="text" name="nombre_huesped" value={formData.nombre_huesped} onChange={handleChange} required className="form-input" placeholder="Juan García" autoComplete="off" />
            </div>
            <div className="form-group">
              <label>Documento *</label>
              <input type="text" name="documento" value={formData.documento} onChange={handleChange} required className="form-input" placeholder="1234567890" autoComplete="off" />
            </div>
            <div className="form-group">
              <label>Teléfono</label>
              <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} className="form-input" placeholder="300 000 0000" autoComplete="off" />
            </div>
            <div className="form-group">
              <label>Procedencia</label>
              <input type="text" name="procedencia" value={formData.procedencia} onChange={handleChange} className="form-input" placeholder="Ciudad, País" autoComplete="off" />
            </div>
          </div>
        </div>

        {/* ── Fechas ── */}
        <div className="form-section">
          <div className="form-section-title"><Calendar size={14} /> Fechas de Estadía</div>
          <div className="form-grid-2">
            <div className="form-group">
              <label>Check In *</label>
              <input type="date" name="check_in" value={formData.check_in} onChange={handleChange} required className="form-input" />
            </div>
            <div className="form-group">
              <label>Check Out *</label>
              <input type="date" name="check_out" value={formData.check_out} onChange={handleChange} required className="form-input" />
            </div>
          </div>
          {config && (
            <div className="text-xs text-muted">
              <Info size={12} style={{ display: 'inline', marginRight: 4 }} />
              Entrada a partir de las <strong>{config.hora_check_in}</strong> · Salida hasta las <strong>{config.hora_check_out}</strong>
            </div>
          )}
        </div>

        {/* ── Habitaciones ── */}
        <div className="form-section">
          <div className="form-section-title"><BedDouble size={14} /> Habitación y Ocupantes</div>

          {!formData.check_in || !formData.check_out ? (
            <div className="text-xs text-muted" style={{ padding: '10px 0' }}>
              <Info size={12} style={{ display: 'inline', marginRight: 4 }} />
              Selecciona las fechas primero para ver disponibilidad.
            </div>
          ) : availableRooms.length === 0 ? (
            <div className="form-error">No hay habitaciones disponibles para estas fechas.</div>
          ) : (
            <>
              {habitacionesDisponibles.length > 0 && (
                <div>
                  <div className="room-picker-label">Habitaciones disponibles</div>
                  <div className="room-picker">
                    {habitacionesDisponibles.map(r => {
                      const selected = formData.id_espacios.includes(r.id_espacio.toString());
                      const priceNoche = getPriceForRoom(r, adultos, ninos);
                      return (
                        <label key={r.id_espacio} className={`room-option${selected ? ' selected' : ''}`}>
                          <input type="checkbox" checked={selected}
                            onChange={() => handleRoomToggle(r.id_espacio.toString(), false)} />
                          <div className="room-option-info">
                            <span className="room-number">{r.numero}</span>
                            <span className="room-type-badge">{r.tipo_habitacion || 'habitación'}</span>
                          </div>
                          {priceNoche > 0 && noches > 0 && (
                            <span className="room-price">${fmt(priceNoche)}/noche</span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {salonesDisponibles.length > 0 && (
                <div>
                  <div className="room-picker-label">Salones</div>
                  <div className="room-picker">
                    {salonesDisponibles.map(r => {
                      const selected = formData.id_espacios.includes(r.id_espacio.toString());
                      return (
                        <label key={r.id_espacio} className={`room-option salon-option${selected ? ' selected' : ''}`}>
                          <input type="checkbox" checked={selected}
                            onChange={() => handleRoomToggle(r.id_espacio.toString(), true)} />
                          <div className="room-option-info">
                            <span className="room-number">{r.numero}</span>
                            <span className="room-type-badge">salón</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Resumen de selección */}
          {selectedRooms.length > 1 && (
            <div className="multi-room-summary">
              <CheckSquare size={13} />
              <span>{selectedRooms.length} habitaciones seleccionadas — titulares asignables en el check-in</span>
            </div>
          )}

          {/* Salón: precio y datos del evento */}
          {isSalon && (
            <div className="salon-price-info">
              <div className="rates-header"><Info size={13} /><span>Salón — precio acordado con el cliente</span></div>
              <div className="form-group" style={{ marginTop: 8 }}>
                <label><Users size={13} style={{ display: 'inline', marginRight: 4 }} />Cantidad de personas</label>
                <input type="number" name="cantidad_adultos" min="1" value={formData.cantidad_adultos} onChange={handleChange} className="form-input text-center" placeholder="Ej: 50" />
              </div>
              <div className="form-group" style={{ marginTop: 8 }}>
                <label>Valor total acordado *</label>
                <input type="number" min="1" value={precioSalon} onChange={e => setPrecioSalon(e.target.value)} className="form-input" placeholder="Ej: 500000" />
              </div>
              <div className="rates-header" style={{ marginTop: 12 }}><Clock size={13} /><span>Datos del evento (opcional)</span></div>
              <div className="form-group" style={{ marginTop: 8 }}>
                <label>Fecha del evento</label>
                <input type="date" value={fechaEvento} onChange={e => setFechaEvento(e.target.value)} className="form-input" />
              </div>
              <div className="form-grid-2" style={{ marginTop: 8 }}>
                <div className="form-group">
                  <label>Hora inicio</label>
                  <input type="time" value={horaInicio} onChange={e => setHoraInicio(e.target.value)} className="form-input" />
                </div>
                <div className="form-group">
                  <label>Hora fin</label>
                  <input type="time" value={horaFin} onChange={e => setHoraFin(e.target.value)} className="form-input" />
                </div>
              </div>
            </div>
          )}

          {/* Habitaciones: ocupantes */}
          {!isSalon && selectedRooms.length > 0 && (
            <div className="form-grid-2">
              <div className="form-group">
                <label><Users size={13} style={{ display: 'inline', marginRight: 4 }} />
                  Adultos{selectedRooms.length > 1 ? ' por hab.' : ''} *
                </label>
                <input type="number" name="cantidad_adultos" min="1" value={formData.cantidad_adultos} onChange={handleChange} className="form-input text-center" />
              </div>
              <div className="form-group">
                <label>Niños{selectedRooms.length > 1 ? ' por hab.' : ''}</label>
                <input type="number" name="cantidad_ninos" min="0" value={formData.cantidad_ninos} onChange={handleChange} className="form-input text-center" placeholder="0" />
              </div>
            </div>
          )}
        </div>

        {/* ── Anotaciones ── */}
        <div className="form-section">
          <div className="form-section-title"><FileText size={14} /> Anotaciones</div>
          <div className="form-group">
            <input type="text" name="anotaciones" value={formData.anotaciones} onChange={handleChange}
              className="form-input" placeholder="Ej. Cancela con tarjeta, no fumador, cama adicional..." />
          </div>
        </div>

        {/* ── Resumen de precio ── */}
        <div className="price-summary">
          <div className="price-row">
            <span className="text-muted">Noches</span>
            <span className="font-medium">{noches}</span>
          </div>
          {!isSalon && noches > 0 && selectedRooms.length > 0 && (
            <>
              {selectedRooms.map(r => {
                const p = getPriceForRoom(r, adultos, ninos);
                return p > 0 ? (
                  <div key={r.id_espacio} className="price-row">
                    <span className="text-muted">Hab. {r.numero} — {adultos} adulto{adultos > 1 ? 's' : ''}{ninos > 0 ? ` + ${ninos} niño${ninos > 1 ? 's' : ''}` : ''}</span>
                    <span className="font-medium">${fmt(p)}/noche</span>
                  </div>
                ) : null;
              })}
            </>
          )}
          <div className="price-row price-total">
            <span className="font-bold">Total estimado</span>
            <span className="price-value">{montoTotal > 0 ? `$${fmt(montoTotal)}` : '—'}</span>
          </div>
        </div>

        <div className="form-actions">
          <Button variant="ghost" type="button" onClick={onClose} disabled={loading}>Cancelar</Button>
          <Button variant="primary" type="submit" disabled={loading || noches <= 0 || montoTotal <= 0}>
            {loading ? 'Procesando...' : 'Confirmar Reserva'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
