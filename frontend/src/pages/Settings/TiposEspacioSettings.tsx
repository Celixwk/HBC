import React, { useState, useEffect } from 'react';
import { Save, Bed, Loader2, CheckCircle, Plus, X, Trash2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { apiFetch } from '../../utils/apiFetch';

const emptyNew = {
  nombre: '',
  precio_base: '',
  recargo_pareja: '',
  recargo_adicional: '',
  max_personas_adicionales: '1',
  precio_base_media: '',
  precio_base_alta: '',
  recargo_pareja_media: '',
  recargo_pareja_alta: '',
  recargo_adicional_media: '',
  recargo_adicional_alta: '',
};

const SeasonBadge: React.FC<{ tipo: 'baja' | 'media' | 'alta' }> = ({ tipo }) => {
  const cfg = {
    baja:  { emoji: '🟢', label: 'Baja',  color: '#10b981' },
    media: { emoji: '🟡', label: 'Media', color: '#f59e0b' },
    alta:  { emoji: '🔴', label: 'Alta',  color: '#ef4444' },
  }[tipo];
  return (
    <span style={{ fontSize: '11px', color: cfg.color, fontWeight: 600, letterSpacing: '0.03em' }}>
      {cfg.emoji} {cfg.label}
    </span>
  );
};

export const TiposEspacioSettings: React.FC = () => {
  const [tipos, setTipos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [saving, setSaving] = useState<number | null>(null);
  const [saved, setSaved] = useState<number | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTipo, setNewTipo] = useState({ ...emptyNew });
  const [addingNew, setAddingNew] = useState(false);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  useEffect(() => { fetchTipos(); }, []);

  const fetchTipos = async () => {
    setFetchError('');
    try {
      const res = await apiFetch('/espacios/config/tipos');
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setFetchError(err.error || `Error ${res.status} al cargar los tipos.`);
        return;
      }
      let data = await res.json();
      if (data.length === 0) {
        const defaults = ['Standard', 'Deluxe', 'Suite'];
        for (const nombre of defaults) {
          await apiFetch('/espacios/config/tipos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, precio_base: 170000, recargo_pareja: 50000, recargo_adicional: 80000, max_personas_adicionales: 1 })
          });
        }
        const res2 = await apiFetch('/espacios/config/tipos');
        data = res2.ok ? await res2.json() : [];
      }
      setTipos(data);
    } catch (e: any) {
      console.error(e);
      setFetchError('No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (tipo: any) => {
    setSaving(tipo.id);
    try {
      await apiFetch(`/espacios/config/tipos/${tipo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tipo)
      });
      setSaved(tipo.id);
      setTimeout(() => setSaved(null), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(null);
    }
  };

  const handleChange = (index: number, field: string, value: string) => {
    const newTipos = [...tipos];
    newTipos[index][field] = value;
    setTipos(newTipos);
  };

  const handleDelete = async (tipo: any) => {
    if (!window.confirm(`¿Eliminar el tipo "${tipo.nombre}"? Esta acción no se puede deshacer.`)) return;
    setDeleting(tipo.id);
    setDeleteError('');
    try {
      const res = await apiFetch(`/espacios/config/tipos/${tipo.id}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setDeleteError(err.error || 'Error al eliminar');
        return;
      }
      fetchTipos();
    } catch (e) {
      setDeleteError('No se pudo conectar con el servidor.');
    } finally {
      setDeleting(null);
    }
  };

  const handleAddSubmit = async () => {
    if (!newTipo.nombre.trim()) return;
    setAddingNew(true);
    try {
      await apiFetch('/espacios/config/tipos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: newTipo.nombre.trim(),
          precio_base: parseFloat(newTipo.precio_base) || 0,
          recargo_pareja: parseFloat(newTipo.recargo_pareja) || 0,
          recargo_adicional: parseFloat(newTipo.recargo_adicional) || 0,
          max_personas_adicionales: parseInt(newTipo.max_personas_adicionales) || 1,
          precio_base_media: newTipo.precio_base_media ? parseFloat(newTipo.precio_base_media) : null,
          precio_base_alta: newTipo.precio_base_alta ? parseFloat(newTipo.precio_base_alta) : null,
          recargo_pareja_media: newTipo.recargo_pareja_media ? parseFloat(newTipo.recargo_pareja_media) : null,
          recargo_pareja_alta: newTipo.recargo_pareja_alta ? parseFloat(newTipo.recargo_pareja_alta) : null,
          recargo_adicional_media: newTipo.recargo_adicional_media ? parseFloat(newTipo.recargo_adicional_media) : null,
          recargo_adicional_alta: newTipo.recargo_adicional_alta ? parseFloat(newTipo.recargo_adicional_alta) : null,
        })
      });
      setNewTipo({ ...emptyNew });
      setShowAddForm(false);
      fetchTipos();
    } catch (e) {
      console.error(e);
    } finally {
      setAddingNew(false);
    }
  };

  const fmtMoney = (v: number) => `$${v.toLocaleString('es-CO', { maximumFractionDigits: 0 })}`;

  if (loading) return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <Loader2 className="animate-spin" size={28} style={{ color: 'var(--primary)', display: 'inline-block' }} />
    </div>
  );

  if (fetchError) return (
    <div style={{ color: '#f87171', fontSize: '13px', padding: '14px 16px', background: 'rgba(248,113,113,0.08)', borderRadius: '10px', border: '1px solid rgba(248,113,113,0.2)', display: 'flex', alignItems: 'center', gap: '10px' }}>
      <AlertCircle size={15} />
      {fetchError}
      <button onClick={fetchTipos} style={{ marginLeft: 'auto', color: 'var(--primary)', cursor: 'pointer', background: 'none', border: 'none', fontSize: '13px', fontWeight: 600 }}>
        Reintentar
      </button>
    </div>
  );

  return (
    <div>
      {/* Section Header */}
      <div className="settings-section-title">
        <span className="settings-section-title-left">
          <Bed size={16} /> Precios por Tipo de Habitación
        </span>
        {!showAddForm && (
          <Button variant="ghost" size="sm" onClick={() => setShowAddForm(true)}>
            <Plus size={14} /> Añadir Tipo
          </Button>
        )}
      </div>

      <div style={{ display: 'grid', gap: '10px' }}>
        {tipos.map((tipo, idx) => {
          const isExpanded = expanded[tipo.id];
          return (
            <div key={tipo.id} style={{
              borderRadius: '10px', border: '1px solid rgba(255,255,255,0.07)',
              backgroundColor: 'rgba(255,255,255,0.02)', overflow: 'hidden'
            }}>
              {/* Fila principal */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 0.6fr auto auto auto', gap: '10px', alignItems: 'center', padding: '12px 15px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tipo</label>
                  <input type="text" className="form-input" value={tipo.nombre} style={{ fontWeight: 600 }}
                    onChange={(e) => handleChange(idx, 'nombre', e.target.value)} />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label style={{ fontSize: '10px', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>🟢 Base (Baja)</label>
                  <input type="number" className="form-input" value={tipo.precio_base} onChange={(e) => handleChange(idx, 'precio_base', e.target.value)} />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Recargo Pareja</label>
                  <input type="number" className="form-input" value={tipo.recargo_pareja} onChange={(e) => handleChange(idx, 'recargo_pareja', e.target.value)} />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Adic. c/u</label>
                  <input type="number" className="form-input" value={tipo.recargo_adicional} onChange={(e) => handleChange(idx, 'recargo_adicional', e.target.value)} />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Máx. Adic.</label>
                  <input type="number" className="form-input text-center" value={tipo.max_personas_adicionales ?? 1} min={0} max={10}
                    onChange={(e) => handleChange(idx, 'max_personas_adicionales', e.target.value)} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Button variant="secondary" onClick={() => handleSave(tipo)} disabled={saving === tipo.id}>
                    {saving === tipo.id ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                  </Button>
                  {saved === tipo.id && <CheckCircle size={14} style={{ color: '#10b981' }} />}
                </div>
                {/* Expandir precios de temporada */}
                <button
                  title="Precios por temporada"
                  onClick={() => setExpanded(e => ({ ...e, [tipo.id]: !e[tipo.id] }))}
                  style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', cursor: 'pointer', color: 'var(--text-muted)', padding: '6px 8px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  Temp.
                </button>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Button variant="ghost" onClick={() => handleDelete(tipo)} disabled={deleting === tipo.id}
                    style={{ color: '#f87171', padding: '6px' }} title="Eliminar tipo">
                    {deleting === tipo.id ? <Loader2 className="animate-spin" size={16} /> : <Trash2 size={16} />}
                  </Button>
                </div>
              </div>

              {isExpanded && (
                <div style={{ padding: '12px 15px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', backgroundColor: 'rgba(0,0,0,0.1)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Precios por Temporada (dejar vacío = usar precio baja)
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    {/* Temporada Media */}
                    <div style={{ padding: '10px', background: 'rgba(245,158,11,0.06)', borderRadius: '8px', border: '1px solid rgba(245,158,11,0.2)' }}>
                      <div style={{ marginBottom: '8px' }}><SeasonBadge tipo="media" /></div>
                      <div className="form-group" style={{ margin: '0 0 6px' }}>
                        <label style={{ fontSize: '11px' }}>Precio Base</label>
                        <input type="number" className="form-input" placeholder={`Vacío = ${fmtMoney(parseFloat(tipo.precio_base || 0))}`}
                          value={tipo.precio_base_media ?? ''} onChange={e => handleChange(idx, 'precio_base_media', e.target.value)} />
                      </div>
                      <div className="form-group" style={{ margin: '0 0 6px' }}>
                        <label style={{ fontSize: '11px' }}>Rec. Pareja</label>
                        <input type="number" className="form-input" placeholder={`Vacío = ${fmtMoney(parseFloat(tipo.recargo_pareja || 0))}`}
                          value={tipo.recargo_pareja_media ?? ''} onChange={e => handleChange(idx, 'recargo_pareja_media', e.target.value)} />
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label style={{ fontSize: '11px' }}>Rec. Adicional</label>
                        <input type="number" className="form-input" placeholder={`Vacío = ${fmtMoney(parseFloat(tipo.recargo_adicional || 0))}`}
                          value={tipo.recargo_adicional_media ?? ''} onChange={e => handleChange(idx, 'recargo_adicional_media', e.target.value)} />
                      </div>
                    </div>

                    {/* Temporada Alta */}
                    <div style={{ padding: '10px', background: 'rgba(239,68,68,0.06)', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.2)' }}>
                      <div style={{ marginBottom: '8px' }}><SeasonBadge tipo="alta" /></div>
                      <div className="form-group" style={{ margin: '0 0 6px' }}>
                        <label style={{ fontSize: '11px' }}>Precio Base</label>
                        <input type="number" className="form-input" placeholder={`Vacío = ${fmtMoney(parseFloat(tipo.precio_base || 0))}`}
                          value={tipo.precio_base_alta ?? ''} onChange={e => handleChange(idx, 'precio_base_alta', e.target.value)} />
                      </div>
                      <div className="form-group" style={{ margin: '0 0 6px' }}>
                        <label style={{ fontSize: '11px' }}>Rec. Pareja</label>
                        <input type="number" className="form-input" placeholder={`Vacío = ${fmtMoney(parseFloat(tipo.recargo_pareja || 0))}`}
                          value={tipo.recargo_pareja_alta ?? ''} onChange={e => handleChange(idx, 'recargo_pareja_alta', e.target.value)} />
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label style={{ fontSize: '11px' }}>Rec. Adicional</label>
                        <input type="number" className="form-input" placeholder={`Vacío = ${fmtMoney(parseFloat(tipo.recargo_adicional || 0))}`}
                          value={tipo.recargo_adicional_alta ?? ''} onChange={e => handleChange(idx, 'recargo_adicional_alta', e.target.value)} />
                      </div>
                    </div>

                    {/* Preview resumen */}
                    <div style={{ padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Precios Resultantes (Base)</div>
                      <div style={{ display: 'grid', gap: '4px', fontSize: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#10b981' }}>🟢 Baja:</span>
                          <span>{fmtMoney(parseFloat(tipo.precio_base || 0))}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#f59e0b' }}>🟡 Media:</span>
                          <span>{tipo.precio_base_media ? fmtMoney(parseFloat(tipo.precio_base_media)) : '= Baja'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#ef4444' }}>🔴 Alta:</span>
                          <span>{tipo.precio_base_alta ? fmtMoney(parseFloat(tipo.precio_base_alta)) : '= Baja'}</span>
                        </div>
                      </div>
                      <div style={{ marginTop: '10px' }}>
                        <Button variant="secondary" size="sm" onClick={() => handleSave(tipo)} disabled={saving === tipo.id} style={{ width: '100%' }}>
                          {saving === tipo.id ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />} Guardar Precios
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Formulario agregar nuevo */}
        {showAddForm && (
          <div style={{ padding: '16px', backgroundColor: 'rgba(99,179,130,0.06)', borderRadius: '10px', border: '1px solid rgba(99,179,130,0.25)' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '10px', color: 'var(--text-muted)' }}>Nuevo tipo de habitación</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 0.6fr auto auto', gap: '10px', alignItems: 'end' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <input type="text" className="form-input" placeholder="Ej: Presidencial"
                  value={newTipo.nombre} onChange={e => setNewTipo({ ...newTipo, nombre: e.target.value })} autoFocus />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <input type="number" className="form-input" placeholder="Precio base"
                  value={newTipo.precio_base} onChange={e => setNewTipo({ ...newTipo, precio_base: e.target.value })} />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <input type="number" className="form-input" placeholder="Rec. pareja"
                  value={newTipo.recargo_pareja} onChange={e => setNewTipo({ ...newTipo, recargo_pareja: e.target.value })} />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <input type="number" className="form-input" placeholder="Rec. adicional"
                  value={newTipo.recargo_adicional} onChange={e => setNewTipo({ ...newTipo, recargo_adicional: e.target.value })} />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <input type="number" className="form-input text-center" placeholder="1" min={0} max={10}
                  value={newTipo.max_personas_adicionales} onChange={e => setNewTipo({ ...newTipo, max_personas_adicionales: e.target.value })} />
              </div>
              <Button variant="primary" size="sm" onClick={handleAddSubmit} disabled={addingNew || !newTipo.nombre.trim()}>
                {addingNew ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => { setShowAddForm(false); setNewTipo({ ...emptyNew }); }}>
                <X size={16} />
              </Button>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
              Los precios por temporada (Media/Alta) se pueden configurar después expandiendo el tipo creado.
            </p>
          </div>
        )}
      </div>

      {deleteError && (
        <div style={{ color: '#f87171', fontSize: '12px', marginTop: '12px', padding: '10px 14px', background: 'rgba(248,113,113,0.08)', borderRadius: '8px', border: '1px solid rgba(248,113,113,0.2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertCircle size={13} /> {deleteError}
        </div>
      )}

      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '15px', lineHeight: 1.5 }}>
        * Si una habitación no pertenece a ninguno de estos tipos, usará los precios configurados de forma individual.
        Los cambios de precio solo afectan reservas nuevas — los precios históricos se mantienen intactos.
      </p>
    </div>
  );
};
