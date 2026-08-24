import React, { useState, useEffect } from 'react';
import { CalendarDays, Plus, Trash2, Save, Loader2, X, Info } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { apiFetch } from '../../utils/apiFetch';
import { ConfirmDialog, useConfirmDialog } from '../../components/ConfirmDialog/ConfirmDialog';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

type TipoTemporada = 'alta' | 'media' | 'baja';

interface Temporada {
  id: number;
  nombre: string;
  tipo: TipoTemporada;
  mes_dia_inicio: string;
  mes_dia_fin: string;
  activo: boolean;
  es_exacta: boolean;
  fecha_exacta_inicio?: string | null;
  fecha_exacta_fin?: string | null;
}

const MESES = [
  { v: '01', l: 'Enero' }, { v: '02', l: 'Febrero' }, { v: '03', l: 'Marzo' },
  { v: '04', l: 'Abril' }, { v: '05', l: 'Mayo' }, { v: '06', l: 'Junio' },
  { v: '07', l: 'Julio' }, { v: '08', l: 'Agosto' }, { v: '09', l: 'Septiembre' },
  { v: '10', l: 'Octubre' }, { v: '11', l: 'Noviembre' }, { v: '12', l: 'Diciembre' },
];

const tipoConfig: Record<TipoTemporada, { label: string; color: string; bg: string; emoji: string }> = {
  alta:  { label: 'Alta',  color: '#ef4444', bg: 'rgba(239,68,68,0.12)',   emoji: '🔴' },
  media: { label: 'Media', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  emoji: '🟡' },
  baja:  { label: 'Baja',  color: '#10b981', bg: 'rgba(16,185,129,0.12)', emoji: '🟢' },
};

const emptyForm = {
  nombre: '',
  tipo: 'alta' as TipoTemporada,
  es_exacta: false,
  // Recurrente (anual)
  mes_inicio: '01', dia_inicio: '01',
  mes_fin:    '12', dia_fin:    '31',
  // Exacta (con año)
  fecha_inicio: '',
  fecha_fin: '',
};

export const TemporadasSettings: React.FC = () => {
  const [temporadas, setTemporadas] = useState<Temporada[]>([]);
  const [loading, setLoading]       = useState(true);
  const [showForm, setShowForm]     = useState(false);
  const [form, setForm]             = useState({ ...emptyForm });
  const [saving, setSaving]         = useState(false);
  const [error, setError]           = useState('');
  const { dialog, close, showDanger } = useConfirmDialog();

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const resT = await apiFetch(`/temporadas`);
      if (resT.ok) setTemporadas(await resT.json());
    } catch (e) {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.nombre.trim()) {
      setError('El nombre es obligatorio');
      return;
    }
    // Validar fechas
    if (form.es_exacta) {
      if (!form.fecha_inicio || !form.fecha_fin) { setError('Ingresa fecha de inicio y fin'); return; }
    } else {
      if (!form.dia_inicio || !form.dia_fin) { setError('Ingresa el día de inicio y fin'); return; }
    }
    setSaving(true);
    setError('');
    try {
      let body: any;
      if (form.es_exacta) {
        body = { nombre: form.nombre, tipo: form.tipo, es_exacta: true, fecha_inicio: form.fecha_inicio, fecha_fin: form.fecha_fin };
      } else {
        const ini = `${form.mes_inicio}-${form.dia_inicio.padStart(2,'0')}`;
        const fin = `${form.mes_fin}-${form.dia_fin.padStart(2,'0')}`;
        body = { nombre: form.nombre, tipo: form.tipo, es_exacta: false, fecha_inicio: ini, fecha_fin: fin };
      }
      const res = await apiFetch('/temporadas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setError(err.error || 'Error al crear temporada');
        return;
      }
      setForm({ ...emptyForm });
      setShowForm(false);
      await fetchData();
    } catch {
      setError('Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (t: Temporada) => {
    showDanger(
      `¿Eliminar "${t.nombre}"?`,
      async () => {
        try {
          const res = await apiFetch(`/temporadas/${t.id}`, { method: 'DELETE' });
          if (res.ok) await fetchData();
          else setError('Error al eliminar');
        } catch {
          setError('Error de conexión');
        }
      },
      'Eliminar temporada'
    );
  };

  const handleToggle = async (t: Temporada) => {
    try {
      const res = await apiFetch(`/temporadas/${t.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activo: !t.activo })
      });
      if (res.ok) await fetchData();
    } catch {
      setError('Error al cambiar estado');
    }
  };

  const formatMesDia = (md: string) => {
    if (!md) return '';
    const [m, d] = md.split('-');
    const date = new Date(2000, parseInt(m) - 1, parseInt(d));
    return format(date, 'd MMM', { locale: es });
  };

  const formatRango = (t: Temporada) => {
    if (t.es_exacta && t.fecha_exacta_inicio && t.fecha_exacta_fin) {
      return `${t.fecha_exacta_inicio} — ${t.fecha_exacta_fin}`;
    }
    const ini = formatMesDia(t.mes_dia_inicio);
    const fin = formatMesDia(t.mes_dia_fin);
    return `${ini} — ${fin} (anual)`;
  };

  // Selector de día y mes para temporadas recurrentes
  const DayMonthPicker = ({ label, mes, dia, onMes, onDia }: any) => (
    <div className="form-group" style={{ margin: 0 }}>
      <label>{label} *</label>
      <div style={{ display: 'flex', gap: '6px' }}>
        <input type="number" min="1" max="31" className="form-input" style={{ flex: 1 }}
          placeholder="Día" value={dia}
          onChange={e => onDia(e.target.value)} />
        <select className="form-input" style={{ flex: 2 }} value={mes} onChange={e => onMes(e.target.value)}>
          {MESES.map(m => <option key={m.v} value={m.v}>{m.l}</option>)}
        </select>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CalendarDays size={18} style={{ color: 'var(--primary)' }} />
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>Temporadas del Año (Recurrentes)</h2>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {!showForm && (
            <Button variant="ghost" size="sm" onClick={() => { setShowForm(true); setForm({ ...emptyForm }); }}
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
              No hay temporadas definidas.<br />
              <span style={{ fontSize: '12px' }}>Los precios de 🟢 Temporada Baja se aplicarán por defecto todo el año.</span>
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
                    {t.es_exacta && (
                      <span style={{ marginLeft: '6px', fontSize: '10px', fontWeight: 700,
                        background: 'rgba(139,92,246,0.2)', color: '#a78bfa',
                        padding: '2px 6px', borderRadius: '10px', border: '1px solid rgba(139,92,246,0.3)' }}>
                        FECHA EXACTA
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {formatRango(t)}
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
                <Button variant="ghost" size="sm" onClick={() => handleDelete(t)}
                  style={{ color: '#f87171', padding: '4px 6px' }}>
                  <Trash2 size={14} />
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
              {/* Tipo de temporada (Anual vs Exacta) */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '2px' }}>
                <button type="button"
                  onClick={() => setForm({ ...form, es_exacta: false })}
                  style={{
                    flex: 1, padding: '8px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '12px',
                    border: `2px solid ${!form.es_exacta ? '#10b981' : 'rgba(255,255,255,0.1)'}`,
                    background: !form.es_exacta ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.03)',
                    color: !form.es_exacta ? '#10b981' : 'var(--text-muted)'
                  }}>
                  Anual (todos los anos)
                </button>
                <button type="button"
                  onClick={() => setForm({ ...form, es_exacta: true })}
                  style={{
                    flex: 1, padding: '8px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '12px',
                    border: `2px solid ${form.es_exacta ? '#a78bfa' : 'rgba(255,255,255,0.1)'}`,
                    background: form.es_exacta ? 'rgba(139,92,246,0.12)' : 'rgba(255,255,255,0.03)',
                    color: form.es_exacta ? '#a78bfa' : 'var(--text-muted)'
                  }}>
                  Fecha Exacta (ej. Semana Santa 2027)
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label>Nombre *</label>
                  <input type="text" className="form-input" placeholder="Ej: Semana Santa"
                    value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} autoFocus />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label>Tipo *</label>
                  <select className="form-input" value={form.tipo}
                    onChange={e => setForm({ ...form, tipo: e.target.value as TipoTemporada })}>
                    <option value="alta">Alta</option>
                    <option value="media">Media</option>
                    <option value="baja">Baja</option>
                  </select>
                </div>
              </div>

              {/* Fechas segun modo */}
              {form.es_exacta ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label>Fecha de Inicio (con ano) *</label>
                    <input type="date" className="form-input" value={form.fecha_inicio}
                      onChange={e => setForm({ ...form, fecha_inicio: e.target.value })} />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label>Fecha de Fin (con ano) *</label>
                    <input type="date" className="form-input" value={form.fecha_fin}
                      onChange={e => setForm({ ...form, fecha_fin: e.target.value })} />
                  </div>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <DayMonthPicker
                    label="Inicio (dia + mes)"
                    dia={form.dia_inicio} mes={form.mes_inicio}
                    onDia={(v: string) => setForm({ ...form, dia_inicio: v })}
                    onMes={(v: string) => setForm({ ...form, mes_inicio: v })}
                  />
                  <DayMonthPicker
                    label="Fin (dia + mes)"
                    dia={form.dia_fin} mes={form.mes_fin}
                    onDia={(v: string) => setForm({ ...form, dia_fin: v })}
                    onMes={(v: string) => setForm({ ...form, mes_fin: v })}
                  />
                </div>
              )}

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
        * Las temporadas se aplican automáticamente todos los años. Si una reserva cruza año nuevo (ej: del 15 Dic al 15 Ene), la temporada funcionará correctamente.
      </p>

      <ConfirmDialog {...dialog} onCancel={close} />
    </div>
  );
};
