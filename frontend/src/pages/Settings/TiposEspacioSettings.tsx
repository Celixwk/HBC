import React, { useState, useEffect } from 'react';
import { Save, Bed, Loader2, CheckCircle, Plus, X, Trash2, AlertCircle } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { apiFetch } from '../../utils/apiFetch';

const emptyNew = {
  nombre: '',
  precio_base: '',
  recargo_pareja: '',
  recargo_adicional: '',
  max_personas_adicionales: '1'
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
          max_personas_adicionales: parseInt(newTipo.max_personas_adicionales) || 1
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

      <div className="tipos-list">
        {/* New tipo form */}
        {showAddForm && (
          <div className="tipo-card tipo-card-new">
            <div className="tipo-card-header">
              <input
                type="text"
                className="tipo-card-name-input"
                placeholder="Nombre del tipo (Ej: Presidencial)"
                value={newTipo.nombre}
                onChange={e => setNewTipo({ ...newTipo, nombre: e.target.value })}
                autoFocus
              />
              <div className="tipo-card-actions">
                <Button variant="primary" size="sm" onClick={handleAddSubmit} disabled={addingNew || !newTipo.nombre.trim()}>
                  {addingNew ? <Loader2 className="animate-spin" size={14} /> : <Plus size={14} />}
                  Guardar
                </Button>
                <button
                  onClick={() => { setShowAddForm(false); setNewTipo({ ...emptyNew }); }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', padding: '4px' }}
                  title="Cancelar"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            <div className="tipo-card-fields">
              <div className="tipo-field-group">
                <span className="tipo-field-label">Precio Base (1 pers.)</span>
                <input type="number" className="form-input" placeholder="170000"
                  value={newTipo.precio_base} onChange={e => setNewTipo({ ...newTipo, precio_base: e.target.value })} />
              </div>
              <div className="tipo-field-group">
                <span className="tipo-field-label">Recargo Pareja (+1)</span>
                <input type="number" className="form-input" placeholder="50000"
                  value={newTipo.recargo_pareja} onChange={e => setNewTipo({ ...newTipo, recargo_pareja: e.target.value })} />
              </div>
              <div className="tipo-field-group">
                <span className="tipo-field-label">Adicional c/u</span>
                <input type="number" className="form-input" placeholder="80000"
                  value={newTipo.recargo_adicional} onChange={e => setNewTipo({ ...newTipo, recargo_adicional: e.target.value })} />
              </div>
              <div className="tipo-field-group">
                <span className="tipo-field-label">Máx. Adicionales</span>
                <input type="number" className="form-input" placeholder="1" min={0} max={10}
                  value={newTipo.max_personas_adicionales} onChange={e => setNewTipo({ ...newTipo, max_personas_adicionales: e.target.value })} />
              </div>
            </div>
          </div>
        )}

        {/* Existing tipos */}
        {tipos.map((tipo, idx) => (
          <div key={tipo.id} className="tipo-card">
            <div className="tipo-card-header">
              <input
                type="text"
                className="tipo-card-name-input"
                value={tipo.nombre}
                onChange={(e) => handleChange(idx, 'nombre', e.target.value)}
              />
              <div className="tipo-card-actions">
                {saved === tipo.id && (
                  <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: 4, fontSize: '12px', fontWeight: 600 }}>
                    <CheckCircle size={13} /> Guardado
                  </span>
                )}
                <Button variant="secondary" size="sm" onClick={() => handleSave(tipo)} disabled={saving === tipo.id}>
                  {saving === tipo.id ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                  Guardar
                </Button>
                <button
                  onClick={() => handleDelete(tipo)}
                  disabled={deleting === tipo.id}
                  title="Eliminar tipo"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f87171', display: 'flex', alignItems: 'center', padding: '4px', opacity: deleting === tipo.id ? 0.5 : 1 }}
                >
                  {deleting === tipo.id ? <Loader2 className="animate-spin" size={15} /> : <Trash2 size={15} />}
                </button>
              </div>
            </div>

            <div className="tipo-card-fields">
              <div className="tipo-field-group">
                <span className="tipo-field-label">Precio Base (1 pers.)</span>
                <input type="number" className="form-input" value={tipo.precio_base}
                  onChange={(e) => handleChange(idx, 'precio_base', e.target.value)} />
              </div>
              <div className="tipo-field-group">
                <span className="tipo-field-label">Recargo Pareja (+1)</span>
                <input type="number" className="form-input" value={tipo.recargo_pareja}
                  onChange={(e) => handleChange(idx, 'recargo_pareja', e.target.value)} />
              </div>
              <div className="tipo-field-group">
                <span className="tipo-field-label">Adicional c/u</span>
                <input type="number" className="form-input" value={tipo.recargo_adicional}
                  onChange={(e) => handleChange(idx, 'recargo_adicional', e.target.value)} />
              </div>
              <div className="tipo-field-group">
                <span className="tipo-field-label">Máx. Adicionales</span>
                <input type="number" className="form-input" value={tipo.max_personas_adicionales ?? 1} min={0} max={10}
                  onChange={(e) => handleChange(idx, 'max_personas_adicionales', e.target.value)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {deleteError && (
        <div style={{ color: '#f87171', fontSize: '12px', marginTop: '12px', padding: '10px 14px', background: 'rgba(248,113,113,0.08)', borderRadius: '8px', border: '1px solid rgba(248,113,113,0.2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertCircle size={13} /> {deleteError}
        </div>
      )}

      <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '18px', lineHeight: 1.5 }}>
        * Si una habitación no pertenece a ningún tipo, usará los precios configurados de forma individual.
      </p>
    </div>
  );
};
