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
    if (!window.confirm('¿Reactivar esta reserva? El huésped volverá a aparecer como activo.')) return;
    try {
      const res = await apiFetch(`/reservas/${idReserva}/estado`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado_reserva: 'activa' })
      });
      if (!res.ok) throw new Error('Error al reactivar');
      fetchGuests();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteRow = async (row: GuestRow) => {
    if (!window.confirm(`¿Eliminar esta estadía de ${row.nombre_completo}? También se eliminará del calendario.`)) return;
    try {
      let res;
      if (row._reserva?.id_reserva) {
        // Borrar por reserva — el backend borra al huésped si no le quedan más
        res = await apiFetch(`/reservas/${row._reserva.id_reserva}`, { method: 'DELETE' });
      } else {
        res = await apiFetch(`/huespedes/${row.id_huesped}`, { method: 'DELETE' });
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al eliminar');
      fetchGuests();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Aplanar: una fila por reserva (o una fila si no tiene reservas)
  const flatRows: GuestRow[] = guests.flatMap(guest => {
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
        <button
          onClick={() => setShowRegistry(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', border: '1px solid var(--border-medium)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '13px' }}
        >
          <ClipboardList size={16} /> Registro de Firmas
        </button>
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
                  const firmadoEnReserva = !!(res?.firma);
                  // Solo bloqueado si no tiene reserva alguna — siempre se puede firmar si existe reserva
                  const bloqueado = !firmadoEnReserva && !res;

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
                        <button
                          className={`firma-btn ${firmadoEnReserva ? 'has-firma' : ''} ${bloqueado ? 'firma-btn-locked' : ''}`}
                          onClick={() => !bloqueado && setSigGuest(row)}
                          title={firmadoEnReserva ? 'Ver firma registrada' : bloqueado ? 'Sin reserva activa' : 'Agregar firma de entrada'}
                        >
                          {firmadoEnReserva ? <><CheckCircle size={14} /> Firmado</> : bloqueado ? <><PenLine size={14} /> Bloqueado</> : <><PenLine size={14} /> Firmar</>}
                        </button>
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
