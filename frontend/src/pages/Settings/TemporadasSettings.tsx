import React, { useState, useEffect } from 'react';
import { CalendarDays, Plus, Trash2, Save, Loader2, X, Info } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { apiFetch } from '../../utils/apiFetch';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

type TipoTemporada = 'alta' | 'media' | 'baja';

interface Temporada {
  id: number;
  nombre: string;
  tipo: TipoTemporada;
  fecha_inicio: string;
  fecha_fin: string;
  activo: boolean;
  anio: number | null;
}

const tipoConfig: Record<TipoTemporada, { label: string; color: string; bg: string; emoji: string }> = {
  alta:  { label: 'Alta',  color: '#ef4444', bg: 'rgba(239,68,68,0.12)',   emoji: '🔴' },
  media: { label: 'Media', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  emoji: '🟡' },
  baja:  { label: 'Baja',  color: '#10b981', bg: 'rgba(16,185,129,0.12)', emoji: '🟢' },
};

const emptyForm = {
  nombre: '',
  tipo: 'alta' as TipoTemporada,
  fecha_inicio: '',
  fecha_fin: '',
  anio: new Date().getFullYear().toString(),
};

export const TemporadasSettings: React.FC = () => {
  const [temporadas, setTemporadas] = useState<Temporada[]>([]);
  const [loading, setLoading]       = useState(true);
  const [anioFiltro, setAnioFiltro] = useState<number>(new Date().getFullYear());
  const [anios, setAnios]           = useState<number[]>([]);
  const [showForm, setShowForm]     = useState(false);
  const [form, setForm]             = useState({ ...emptyForm });
  const [saving, setSaving]         = useState(false);
  const [deleting, setDeleting]     = useState<number | null>(null);
  const [error, setError]           = useState('');

  useEffect(() => { fetchData(); }, [anioFiltro]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resT, resA] = await Promise.all([
        apiFetch(`/temporadas?anio=${anioFiltro}`),
        apiFetch('/temporadas/anios'),
      ]);
      if (resT.ok) setTemporadas(await resT.json());
      if (resA.ok) {
        const a: number[] = await resA.json();
        // Asegurar que el año actual siempre esté en la lista
        const cur = new Date().getFullYear();
        const merged = Array.from(new Set([...a, cur, cur + 1])).sort((x, y) => x - y);
        setAnios(merged);
      }
    } catch (e) {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.nombre.trim() || !form.fecha_inicio || !form.fecha_fin) {
      setError('Completa todos los campos obligatorios');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const res = await apiFetch('/temporadas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setError(err.error || 'Error al crear temporada');
        return;
      }
      setForm({ ...emptyForm, anio: anioFiltro.toString() });
      setShowForm(false);
      await fetchData();
    } catch {
      setError('Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (t: Temporada) => {
    if (!window.confirm(`¿Eliminar "${t.nombre}"?`)) return;
    setDeleting(t.id);
    try {
      await apiFetch(`/temporadas/${t.id}`, { method: 'DELETE' });
      await fetchData();
    } catch {
      setError('Error al eliminar');
    } finally {
      setDeleting(null);
    }
  };

  const handleToggle = async (t: Temporada) => {
    try {
      await apiFetch(`/temporadas/${t.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activo: !t.activo })
      });
      await fetchData();
    } catch {
      setError('Error al actualizar');
    }
  };

  const fmtDate = (d: string) => {
    try { return format(new Date(d), "d MMM", { locale: es }); }
    catch { return d; }
  };

  return (
    <div className="glass-panel" style={{ marginTop: '20px', padding: '20px' }}>
      {/* Header */}
      <div className="settings-section-title flex justify-between items-center" style={{ marginBottom: '15px' }}>
        <span><CalendarDays size={16} /> Temporadas del Año</span>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {/* Selector de año */}
          <select
            className="form-input"
            style={{ width: 'auto', padding: '4px 10px', fontSize: '13px' }}
            value={anioFiltro}
            onChange={e => setAnioFiltro(parseInt(e.target.value))}
          >
            {anios.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          {!showForm && (
            <Button variant="ghost" size="sm" onClick={() => { setShowForm(true); setForm({ ...emptyForm, anio: anioFiltro.toString() }); }}
              className="flex items-center gap-1">
              <Plus size={14} /> Agregar
            </Button>
          )}
        </div>
      </div>

      {/* Leyenda */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '14px', flexWrap: 'wrap' }}>
        {(Object.entries(tipoConfig) as [TipoTemporada, typeof tipoConfig.alta][]).map(([key, cfg]) => (
          <span key={key} style={{ fontSize: '12px', color: cfg.color, display: 'flex', alignItems: 'center', gap: '4px' }}>
            {cfg.emoji} Temporada {cfg.label}
          </span>
        ))}
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: 'auto' }}>
          <Info size={11} style={{ display: 'inline', marginRight: 3 }} />
          🟢 Baja es el precio default fuera de cualquier temporada
        </span>
      </div>

      {error && (
        <div style={{ color: '#f87171', fontSize: '13px', padding: '8px 12px', background: 'rgba(248,113,113,0.08)', borderRadius: '8px', border: '1px solid rgba(248,113,113,0.2)', marginBottom: '12px' }}>
          {error}
          <button onClick={() => setError('')} style={{ marginLeft: 8, cursor: 'pointer', background: 'none', border: 'none', color: '#f87171' }}><X size={12} /></button>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}><Loader2 className="animate-spin inline" /></div>
      ) : (
        <div style={{ display: 'grid', gap: '8px' }}>
          {temporadas.length === 0 && !showForm && (
            <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)', fontSize: '13px' }}>
              No hay temporadas definidas para {anioFiltro}.<br />
              <span style={{ fontSize: '12px' }}>Los precios de 🟢 Temporada Baja se aplicarán por defecto.</span>
            </div>
          )}

          {temporadas.map(t => {
            const cfg = tipoConfig[t.tipo as TipoTemporada] || tipoConfig.baja;
            return (
              <div key={t.id} style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto auto auto auto',
                gap: '12px',
                alignItems: 'center',
                padding: '12px 15px',
                backgroundColor: t.activo ? cfg.bg : 'rgba(255,255,255,0.01)',
                borderRadius: '8px',
                border: `1px solid ${t.activo ? cfg.color + '40' : 'rgba(255,255,255,0.04)'}`,
                opacity: t.activo ? 1 : 0.5,
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: t.activo ? cfg.color : 'var(--text-muted)' }}>
                    {cfg.emoji} {t.nombre}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {fmtDate(t.fecha_inicio)} — {fmtDate(t.fecha_fin)}
                  </div>
                </div>

                {/* Badge tipo */}
                <span style={{
                  padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                  background: cfg.bg, color: cfg.color, textTransform: 'uppercase', letterSpacing: '0.05em',
                  border: `1px solid ${cfg.color}40`
                }}>
                  {cfg.label}
                </span>

                {/* Toggle activo */}
                <button
                  title={t.activo ? 'Desactivar' : 'Activar'}
                  onClick={() => handleToggle(t)}
                  style={{
                    background: t.activo ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${t.activo ? '#10b981' : 'rgba(255,255,255,0.1)'}`,
                    color: t.activo ? '#10b981' : 'var(--text-muted)',
                    borderRadius: '6px', padding: '4px 8px', fontSize: '11px', cursor: 'pointer', fontWeight: 600
                  }}>
                  {t.activo ? 'Activa' : 'Inactiva'}
                </button>

                {/* Eliminar */}
                <Button variant="ghost" size="sm" onClick={() => handleDelete(t)} disabled={deleting === t.id}
                  style={{ color: '#f87171', padding: '4px 6px' }}>
                  {deleting === t.id ? <Loader2 className="animate-spin" size={14} /> : <Trash2 size={14} />}
                </Button>
              </div>
            );
          })}

          {/* Formulario inline */}
          {showForm && (
            <div style={{
              display: 'grid', gap: '10px', padding: '16px',
              backgroundColor: 'rgba(99,179,130,0.06)', borderRadius: '10px',
              border: '1px solid rgba(99,179,130,0.25)'
            }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
                Nueva Temporada para {anioFiltro}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label>Nombre *</label>
                  <input type="text" className="form-input" placeholder="Ej: Semana Santa 2027"
                    value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} autoFocus />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label>Tipo *</label>
                  <select className="form-input" value={form.tipo}
                    onChange={e => setForm({ ...form, tipo: e.target.value as TipoTemporada })}>
                    <option value="alta">🔴 Alta</option>
                    <option value="media">🟡 Media</option>
                    <option value="baja">🟢 Baja</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label>Fecha inicio *</label>
                  <input type="date" className="form-input" value={form.fecha_inicio}
                    onChange={e => setForm({ ...form, fecha_inicio: e.target.value })} />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label>Fecha fin *</label>
                  <input type="date" className="form-input" value={form.fecha_fin}
                    onChange={e => setForm({ ...form, fecha_fin: e.target.value })} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '4px' }}>
                <Button variant="ghost" size="sm" onClick={() => { setShowForm(false); setError(''); }}>
                  <X size={14} /> Cancelar
                </Button>
                <Button variant="primary" size="sm" onClick={handleSubmit} disabled={saving}>
                  {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />} Guardar
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '16px' }}>
        * Las temporadas activas se aplican automáticamente al crear una nueva reserva según la fecha de check-in.
        Si no hay ninguna temporada activa para esa fecha, se usa el precio de Temporada Baja.
      </p>
    </div>
  );
};
