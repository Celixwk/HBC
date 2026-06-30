import React, { useState, useEffect } from 'react';
import { Search, Loader2, PenLine, CheckCircle, Edit2, Trash2, UserX, ClipboardList, RotateCcw } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { SignatureModal } from '../../components/SignatureModal/SignatureModal';
import { EditGuestModal } from '../../components/EditGuestModal/EditGuestModal';
import { GuestRegistry } from '../../components/GuestRegistry/GuestRegistry';
import './Guests.css';
import { apiFetch } from '../../utils/apiFetch';

interface ReservaRow {
  fecha_creacion: string;
  check_in: string;
  check_out: string;
  estado_reserva: string;
  id_reserva: number;
  firma: string | null;
  espacio?: { numero: string | null } | null;
}

interface Huesped {
  id_huesped: number;
  nombre_completo: string;
  documento: string;
  tipo_documento: string;
  telefono: string;
  procedencia: string;
  firma: string | null;
  fecha_creacion: string;
  reserva?: ReservaRow[];
}

// Una fila por estadía: si el huésped tiene N reservas → N filas
interface GuestRow extends Huesped {
  _reserva: ReservaRow | null; // la reserva de esta fila específica
}

const PAGE_SIZE = 15;

export const Guests: React.FC = () => {
  const [guests, setGuests] = useState<Huesped[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sigGuest, setSigGuest] = useState<Huesped | null>(null);
  const [editGuest, setEditGuest] = useState<Huesped | null>(null);
  const [page, setPage] = useState(1);
  const [showRegistry, setShowRegistry] = useState(false);
  const [usarFirma, setUsarFirma] = useState(() => localStorage.getItem('hbc_usar_firma') === '1');

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      setLoading(true);
      const response = await apiFetch('/huespedes');
      if (!response.ok) throw new Error('Error al cargar huéspedes');
      const data = await response.json();
      setGuests(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReactivar = async (idReserva: number) => {
    try {
      const res = await apiFetch(`/reservas/${idReserva}/estado`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado_reserva: 'activa' })
      });
      if (!res.ok) throw new Error('Error al reactivar');
      fetchGuests();
    } catch (err: any) {
      console.error(err.message);
    }
  };

  // Registrar ingreso sin firma (marca el check-in manualmente)
  const handleCheckInManual = async (row: GuestRow) => {
    try {
      const res = await apiFetch(`/huespedes/${row.id_huesped}/firma`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firma: 'CHECK-IN_MANUAL' })
      });
      if (!res.ok) throw new Error('Error al registrar ingreso');
      fetchGuests();
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleDeleteRow = async (row: GuestRow) => {
    try {
      let res;
      if (row._reserva?.id_reserva) {
        res = await apiFetch(`/reservas/${row._reserva.id_reserva}`, { method: 'DELETE' });
      } else {
        res = await apiFetch(`/huespedes/${row.id_huesped}`, { method: 'DELETE' });
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al eliminar');
      fetchGuests();
    } catch (err: any) {
      console.error(err.message);
    }
  };

  // Aplanar: una fila por reserva (o una fila si no tiene reservas)
  const flatRows: GuestRow[] = guests.flatMap((guest): GuestRow[] => {
    if (!guest.reserva || guest.reserva.length === 0) {
      return [{ ...guest, _reserva: null }];
    }
    return guest.reserva.map(res => ({ ...guest, _reserva: res }));
  });

  const filteredRows = flatRows.filter(row =>
    row.nombre_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (row.documento && row.documento.includes(searchTerm))
  );

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  const pagedRows = filteredRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const parseLocalDate = (dateStr: string) => {
    if (!dateStr) return new Date();
    const [year, month, day] = dateStr.substring(0, 10).split('-');
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  const formatDate = (dateStr: string, isLocal: boolean = false) => {
    if (!dateStr) return '-';
    try {
      const date = isLocal ? parseLocalDate(dateStr) : new Date(dateStr);
      return format(date, "d MMM yyyy", { locale: es });
    } catch {
      return '-';
    }
  };

  return (
    <div className="guests-container">
      <div className="guests-header">
        <div>
          <h1 className="page-title">Historial de Personas</h1>
          <p className="page-subtitle">Registro de todos los huéspedes del hotel</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)', cursor: 'pointer', userSelect: 'none' }}>
            <input 
              type="checkbox" 
              checked={usarFirma}
              onChange={(e) => {
                setUsarFirma(e.target.checked);
                localStorage.setItem('hbc_usar_firma', e.target.checked ? '1' : '0');
              }}
              style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: 'var(--primary)' }}
            />
            Habilitar Firma Digital
          </label>
          <button
            onClick={() => setShowRegistry(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', border: '1px solid var(--border-medium)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '13px' }}
          >
            <ClipboardList size={16} /> Registro de Firmas
          </button>
        </div>
      </div>

      <div className="guests-content glass-panel">
        <div className="guests-toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por nombre o documento..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
            />
          </div>
        </div>

        <div className="table-container">
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="animate-spin text-primary" size={40} />
            </div>
          ) : (
            <table className="guests-table">
              <thead>
                <tr>
                  <th>Nombre Completo</th>
                  <th>Documento</th>
                  <th>Teléfono</th>
                  <th>Procedencia</th>
                  <th>Fecha Registro</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th style={{ width: '180px' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pagedRows.map((row, idx) => {
                  const res = row._reserva;
                  const esNoShow = res?.estado_reserva === 'no_show';
                  const esCheckInManual = res?.firma === 'CHECK-IN_MANUAL';
                  const firmadoEnReserva = !!(res?.firma) && !esCheckInManual;
                  // Solo bloqueado si no tiene reserva alguna — siempre se puede firmar si existe reserva
                  const bloqueado = !res;

                  return (
                  <tr key={`${row.id_huesped}-${res?.id_reserva ?? idx}`}
                    style={esNoShow ? { background: 'rgba(239,68,68,0.05)', borderLeft: '3px solid rgba(239,68,68,0.4)' } : undefined}>
                    <td>
                      <div className="guest-name-cell">
                        <div className="guest-avatar" style={esNoShow ? { background: 'rgba(239,68,68,0.2)', color: '#ef4444' } : undefined}>
                          {row.nombre_completo.charAt(0).toUpperCase()}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span className="font-medium text-capitalize">{row.nombre_completo}</span>
                          {esNoShow && (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontWeight: 700, color: '#ef4444', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '4px', padding: '1px 6px', width: 'fit-content' }}>
                              <UserX size={10} /> NO SE PRESENTÓ
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td><span className="text-muted">{row.tipo_documento}</span> {row.documento}</td>
                    <td>{row.telefono || '-'}</td>
                    <td>{row.procedencia || '-'}</td>
                    <td className="text-muted">{res ? formatDate(res.fecha_creacion, false) : '-'}</td>
                    <td className="text-muted">{res ? formatDate(res.check_in, true) : '-'}</td>
                    <td className="text-muted">{res ? formatDate(res.check_out, true) : '-'}</td>
                    <td>
                      <div className="flex gap-2">
                        <button className="edit-guest-btn" onClick={() => setEditGuest(row)} title="Editar información">
                          <Edit2 size={14} />
                        </button>
                        <button className="edit-guest-btn" onClick={() => handleDeleteRow(row)} title="Eliminar estadía" style={{ color: '#ef4444' }}>
                          <Trash2 size={14} />
                        </button>
                        {esNoShow && res?.id_reserva && (
                          <button
                            className="edit-guest-btn"
                            onClick={() => handleReactivar(res.id_reserva)}
                            title="Reactivar reserva (el huésped llegó tarde)"
                            style={{ color: '#f59e0b' }}
                          >
                            <RotateCcw size={14} />
                          </button>
                        )}
                        {/* 1. Ya tiene ingreso manual */}
                        {esCheckInManual && (
                          <span
                            title="Ingreso registrado manualmente"
                            style={{
                              color: '#10b981',
                              background: 'rgba(16,185,129,0.1)',
                              border: '1px solid rgba(16,185,129,0.3)',
                              borderRadius: '6px',
                              padding: '4px 8px',
                              fontSize: '11px',
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <CheckCircle size={13} /> Ingresó
                          </span>
                        )}

                        {/* 2. Ya tiene firma real */}
                        {firmadoEnReserva && (
                          <button
                            className="firma-btn has-firma"
                            onClick={() => setSigGuest(row)}
                            title="Ver firma registrada"
                          >
                            <CheckCircle size={14} /> Firmado
                          </button>
                        )}

                        {/* 3. Aún no tiene nada -> Mostrar opción según el switch */}
                        {!res?.firma && (
                          <>
                            <button
                              className="edit-guest-btn"
                              onClick={() => !bloqueado && handleCheckInManual(row)}
                              disabled={bloqueado}
                              title={bloqueado ? 'Sin reserva activa' : 'Registrar ingreso sin firma'}
                              style={{
                                color: bloqueado ? 'var(--text-muted)' : '#10b981',
                                background: bloqueado ? 'rgba(0,0,0,0.05)' : 'rgba(16,185,129,0.1)',
                                border: `1px solid ${bloqueado ? 'var(--border-medium)' : 'rgba(16,185,129,0.3)'}`,
                                borderRadius: '6px',
                                padding: '4px 8px',
                                fontSize: '11px',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                cursor: bloqueado ? 'not-allowed' : 'pointer',
                                opacity: bloqueado ? 0.6 : 1
                              }}
                            >
                              <CheckCircle size={13} /> {bloqueado ? 'Bloqueado' : 'Ya Llegó'}
                            </button>

                            {usarFirma && (
                              <button
                                className={`firma-btn ${bloqueado ? 'firma-btn-locked' : ''}`}
                                onClick={() => !bloqueado && setSigGuest(row)}
                                title={bloqueado ? 'Sin reserva activa' : 'Agregar firma de entrada'}
                              >
                                <PenLine size={14} /> {bloqueado ? 'Bloqueado' : 'Firmar'}
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                  );
                })}

                {filteredRows.length === 0 && (
                  <tr>
                    <td colSpan={8} className="empty-state">No se encontraron huéspedes.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', padding: '16px 0 4px' }}>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid var(--border-medium)', background: 'transparent', color: 'var(--text-muted)', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.4 : 1 }}
            >
              ‹ Anterior
            </button>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Página {page} de {totalPages} · {filteredRows.length} registros
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid var(--border-medium)', background: 'transparent', color: 'var(--text-muted)', cursor: page === totalPages ? 'not-allowed' : 'pointer', opacity: page === totalPages ? 0.4 : 1 }}
            >
              Siguiente ›
            </button>
          </div>
        )}
      </div>

      {sigGuest && (
        <SignatureModal
          isOpen={sigGuest !== null}
          onClose={() => setSigGuest(null)}
          huesped={sigGuest}
          onSaved={() => { fetchGuests(); setSigGuest(null); }}
        />
      )}

      {editGuest && (
        <EditGuestModal
          isOpen={editGuest !== null}
          onClose={() => setEditGuest(null)}
          guest={editGuest}
          onSuccess={() => { fetchGuests(); setEditGuest(null); }}
        />
      )}

      <GuestRegistry
        isOpen={showRegistry}
        onClose={() => setShowRegistry(false)}
        rows={filteredRows}
      />
    </div>
  );
};
