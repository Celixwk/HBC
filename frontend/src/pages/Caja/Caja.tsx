import React, { useEffect, useState, useCallback } from 'react';
import { apiFetch } from '../../utils/apiFetch';
import { Button } from '../../components/Button/Button';
import dayjs from 'dayjs';
import { DollarSign, Lock, Unlock, Clock, BarChart2, AlertTriangle, CheckCircle } from 'lucide-react';
import './Caja.css';

interface TurnoCaja {
  id_turno: number;
  fecha_apertura: string;
  monto_apertura: number;
  estado: string;
  usuario: { nombre_completo: string; username: string };
  pagos_detalle?: { metodo_pago: string; total: number }[];
}

interface HistorialTurno extends TurnoCaja {
  fecha_cierre?: string;
  monto_sistema?: number;
  monto_real?: number;
  diferencia?: number;
  notas?: string;
}

type View = 'turno' | 'historial';

export const Caja: React.FC = () => {
  const [view, setView] = useState<View>('turno');
  const [turno, setTurno] = useState<TurnoCaja | null>(null);
  const [historial, setHistorial] = useState<HistorialTurno[]>([]);
  const [loading, setLoading] = useState(true);
  const [montoApertura, setMontoApertura] = useState('');
  const [montoReal, setMontoReal] = useState('');
  const [notasCierre, setNotasCierre] = useState('');
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<{ msg: string; tipo: 'ok' | 'err' } | null>(null);

  const rol = localStorage.getItem('hb_rol') || 'recepcionista';

  const showAlert = (msg: string, tipo: 'ok' | 'err' = 'ok') => {
    setAlert({ msg, tipo });
    setTimeout(() => setAlert(null), 4000);
  };

  const fetchTurno = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/caja/activa');
      if (res.ok) setTurno(await res.json());
      else setTurno(null);
    } catch { setTurno(null); }
    setLoading(false);
  }, []);

  const fetchHistorial = useCallback(async () => {
    const res = await apiFetch('/caja/historial?limit=30');
    if (res.ok) setHistorial(await res.json());
  }, []);

  useEffect(() => { fetchTurno(); }, [fetchTurno]);
  useEffect(() => { if (view === 'historial') fetchHistorial(); }, [view, fetchHistorial]);

  const handleAbrir = async () => {
    setSaving(true);
    try {
      const res = await apiFetch('/caja/abrir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ monto_apertura: parseFloat(montoApertura) || 0 }),
      });
      if (res.ok) {
        showAlert('Turno de caja abierto exitosamente.', 'ok');
        setMontoApertura('');
        fetchTurno();
      } else {
        const err = await res.json();
        showAlert(err.error || 'Error al abrir caja.', 'err');
      }
    } catch { showAlert('Error de conexión.', 'err'); }
    setSaving(false);
  };

  const handleCerrar = async () => {
    if (!montoReal) return showAlert('Ingresa el monto que contaste físicamente.', 'err');
    setSaving(true);
    try {
      const res = await apiFetch('/caja/cerrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ monto_real: parseFloat(montoReal), notas: notasCierre }),
      });
      if (res.ok) {
        const data = await res.json();
        const dif = parseFloat(data.diferencia || 0);
        showAlert(`Turno cerrado. Diferencia: ${dif >= 0 ? '+' : ''}$${dif.toLocaleString()}`, dif === 0 ? 'ok' : 'err');
        setMontoReal('');
        setNotasCierre('');
        fetchTurno();
      } else {
        const err = await res.json();
        showAlert(err.error || 'Error al cerrar caja.', 'err');
      }
    } catch { showAlert('Error de conexión.', 'err'); }
    setSaving(false);
  };

  const totalEfectivo = turno?.pagos_detalle
    ?.filter(p => p.metodo_pago?.toLowerCase().includes('efectivo'))
    .reduce((a, p) => a + parseFloat(String(p.total || 0)), 0) || 0;

  const totalOtros = turno?.pagos_detalle
    ?.filter(p => !p.metodo_pago?.toLowerCase().includes('efectivo'))
    .reduce((a, p) => a + parseFloat(String(p.total || 0)), 0) || 0;

  const cajaEsperada = (turno ? parseFloat(String(turno.monto_apertura)) : 0) + totalEfectivo;

  return (
    <div className="caja-container">
      {alert && (
        <div className={`caja-alert caja-alert-${alert.tipo}`}>
          {alert.tipo === 'ok' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
          {alert.msg}
        </div>
      )}

      <div className="caja-header">
        <div>
          <h1 className="page-title"><DollarSign size={22} style={{ display: 'inline', marginRight: 8 }} />Control de Caja</h1>
          <p className="page-subtitle">Gestión de turnos y arqueo de efectivo</p>
        </div>
        {rol === 'admin' && (
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant={view === 'turno' ? 'primary' : 'ghost'} size="sm" onClick={() => setView('turno')}>
              <DollarSign size={15} /> Mi Turno
            </Button>
            <Button variant={view === 'historial' ? 'primary' : 'ghost'} size="sm" onClick={() => setView('historial')}>
              <BarChart2 size={15} /> Historial
            </Button>
          </div>
        )}
      </div>

      {view === 'turno' && (
        loading ? <div className="caja-loading">Cargando estado de caja...</div> :
        !turno ? (
          // ─── SIN TURNO ACTIVO ───
          <div className="glass-panel caja-open-panel">
            <div className="caja-status-icon caja-closed">
              <Lock size={40} />
            </div>
            <h2>Caja Cerrada</h2>
            <p className="text-muted">No hay ningún turno activo. Ingresa el monto en efectivo con el que abres tu turno.</p>
            <div className="caja-open-form">
              <label>Monto de apertura (efectivo en caja)</label>
              <input
                className="form-input"
                type="number"
                min="0"
                placeholder="Ej: 100000"
                value={montoApertura}
                onChange={e => setMontoApertura(e.target.value)}
              />
              <Button variant="primary" onClick={handleAbrir} isLoading={saving}>
                <Unlock size={16} /> Abrir Turno de Caja
              </Button>
            </div>
          </div>
        ) : (
          // ─── TURNO ACTIVO ───
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="glass-panel caja-active-panel">
              <div className="caja-active-header">
                <div className="caja-status-icon caja-open"><Unlock size={28} /></div>
                <div>
                  <h2 style={{ margin: 0 }}>Turno Activo</h2>
                  <p className="text-muted" style={{ margin: 0 }}>
                    {turno.usuario?.nombre_completo} · Abierto {dayjs(turno.fecha_apertura).format('D MMM, HH:mm')}
                  </p>
                </div>
              </div>

              <div className="caja-summary-grid">
                <div className="caja-summary-card">
                  <span className="text-muted">Base de apertura</span>
                  <span className="caja-amount">${parseFloat(String(turno.monto_apertura)).toLocaleString()}</span>
                </div>
                <div className="caja-summary-card">
                  <span className="text-muted">Cobros en efectivo</span>
                  <span className="caja-amount caja-green">+${totalEfectivo.toLocaleString()}</span>
                </div>
                <div className="caja-summary-card">
                  <span className="text-muted">Otros métodos (tarj./transf.)</span>
                  <span className="caja-amount caja-blue">+${totalOtros.toLocaleString()}</span>
                </div>
                <div className="caja-summary-card caja-total-card">
                  <span className="text-muted">Efectivo esperado en caja</span>
                  <span className="caja-amount caja-total">${cajaEsperada.toLocaleString()}</span>
                </div>
              </div>

              {turno.pagos_detalle && turno.pagos_detalle.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  <p className="text-muted" style={{ fontSize: '0.8rem', marginBottom: 6 }}>Detalle de cobros del turno:</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {turno.pagos_detalle.map((p, i) => (
                      <span key={i} style={{ fontSize: '0.8rem', padding: '4px 10px', borderRadius: 8, background: 'rgba(99,102,241,0.1)', color: '#818cf8' }}>
                        {p.metodo_pago}: ${parseFloat(String(p.total)).toLocaleString()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="glass-panel">
              <h3 style={{ marginTop: 0, marginBottom: 12 }}><Lock size={16} style={{ display: 'inline', marginRight: 6 }} />Cerrar Turno (Arqueo)</h3>
              <p className="text-muted" style={{ marginBottom: 12, fontSize: '0.875rem' }}>
                Cuenta el efectivo físico en la caja e ingresa el total que tienes. El sistema calculará la diferencia automáticamente.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 380 }}>
                <div className="form-group">
                  <label>Efectivo físico contado</label>
                  <input className="form-input" type="number" min="0" placeholder="$0" value={montoReal} onChange={e => setMontoReal(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Notas del cierre (opcional)</label>
                  <input className="form-input" placeholder="Ej: Faltaron $5.000 en monedas..." value={notasCierre} onChange={e => setNotasCierre(e.target.value)} />
                </div>
                <Button variant="secondary" onClick={handleCerrar} isLoading={saving} style={{ color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)' }}>
                  <Lock size={16} /> Cerrar Turno
                </Button>
              </div>
            </div>
          </div>
        )
      )}

      {view === 'historial' && (
        <div className="glass-panel">
          <h3 style={{ marginTop: 0 }}>Historial de Turnos</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="inv-table">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Apertura</th>
                  <th>Cierre</th>
                  <th>Base</th>
                  <th>Sistema</th>
                  <th>Real</th>
                  <th>Diferencia</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {historial.map(t => {
                  const dif = parseFloat(String(t.diferencia || 0));
                  return (
                    <tr key={t.id_turno}>
                      <td>{t.usuario?.nombre_completo}<br/><span className="text-muted" style={{ fontSize: '0.75rem' }}>@{t.usuario?.username}</span></td>
                      <td>{dayjs(t.fecha_apertura).format('D MMM HH:mm')}</td>
                      <td>{t.fecha_cierre ? dayjs(t.fecha_cierre).format('D MMM HH:mm') : '—'}</td>
                      <td>${parseFloat(String(t.monto_apertura)).toLocaleString()}</td>
                      <td>{t.monto_sistema != null ? `$${parseFloat(String(t.monto_sistema)).toLocaleString()}` : '—'}</td>
                      <td>{t.monto_real != null ? `$${parseFloat(String(t.monto_real)).toLocaleString()}` : '—'}</td>
                      <td style={{ color: dif < 0 ? '#ef4444' : dif > 0 ? '#10b981' : 'inherit', fontWeight: 600 }}>
                        {t.diferencia != null ? `${dif >= 0 ? '+' : ''}$${dif.toLocaleString()}` : '—'}
                      </td>
                      <td>
                        <span style={{ padding: '2px 8px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 600,
                          background: t.estado === 'abierto' ? 'rgba(16,185,129,0.15)' : 'rgba(99,102,241,0.12)',
                          color: t.estado === 'abierto' ? '#10b981' : '#818cf8' }}>
                          {t.estado}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {historial.length === 0 && (
                  <tr><td colSpan={8} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '30px' }}>No hay turnos registrados aún.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
