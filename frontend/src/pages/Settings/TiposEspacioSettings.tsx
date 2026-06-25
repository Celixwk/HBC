import React, { useState, useEffect } from 'react';
import { Save, Bed, Loader2, CheckCircle, Plus, X, Trash2 } from 'lucide-react';
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

  if (loading) return <div className="p-8 text-center"><Loader2 className="animate-spin inline" /></div>;
  if (fetchError) return (
    <div className="glass-panel" style={{ marginTop: '20px', padding: '20px' }}>
      <div style={{ color: '#f87171', fontSize: '13px', padding: '12px', background: 'rgba(248,113,113,0.08)', borderRadius: '8px', border: '1px solid rgba(248,113,113,0.2)' }}>
        {fetchError}
        <button onClick={fetchTipos} style={{ marginLeft: '12px', color: 'var(--primary)', cursor: 'pointer', background: 'none', border: 'none', fontSize: '13px' }}>
          Reintentar
        </button>
      </div>
    </div>
  );

  const colStyle = { gridTemplateColumns: '1.2fr 1fr 1fr 1fr 0.7fr auto auto', gap: '10px', alignItems: 'end' };

  return (
    <div className="glass-panel" style={{ marginTop: '20px', padding: '20px' }}>
      <div className="settings-section-title flex justify-between items-center" style={{ marginBottom: '15px' }}>
        <span><Bed size={16} /> Precios por Tipo de Habitación</span>
        {!showAddForm && (
          <Button variant="ghost" size="sm" onClick={() => setShowAddForm(true)} className="flex items-center gap-1">
            <Plus size={14} /> Añadir Tipo
          </Button>
        )}
      </div>

      {/* Header labels */}
      {tipos.length > 0 && (
        <div style={{ display: 'grid', ...colStyle, padding: '0 15px', marginBottom: '4px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tipo</span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Precio Base (1 pers.)</span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Recargo Pareja (+1)</span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Adicional c/u</span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Máx. Adic.</span>
          <span></span>
          <span></span>
        </div>
      )}

      <div style={{ display: 'grid', gap: '8px' }}>
        {tipos.map((tipo, idx) => (
          <div key={tipo.id} style={{ display: 'grid', ...colStyle, padding: '12px 15px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <input type="text" className="form-input" value={tipo.nombre} style={{ fontWeight: 600 }}
                onChange={(e) => handleChange(idx, 'nombre', e.target.value)} />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <input type="number" className="form-input" value={tipo.precio_base} onChange={(e) => handleChange(idx, 'precio_base', e.target.value)} />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <input type="number" className="form-input" value={tipo.recargo_pareja} onChange={(e) => handleChange(idx, 'recargo_pareja', e.target.value)} />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <input type="number" className="form-input" value={tipo.recargo_adicional} onChange={(e) => handleChange(idx, 'recargo_adicional', e.target.value)} />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <input type="number" className="form-input text-center" value={tipo.max_personas_adicionales ?? 1} min={0} max={10}
                onChange={(e) => handleChange(idx, 'max_personas_adicionales', e.target.value)} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Button variant="secondary" onClick={() => handleSave(tipo)} disabled={saving === tipo.id}>
                {saving === tipo.id ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
              </Button>
              {saved === tipo.id && <CheckCircle size={14} style={{ color: '#10b981' }} />}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button variant="ghost" onClick={() => handleDelete(tipo)} disabled={deleting === tipo.id}
                style={{ color: '#f87171', padding: '6px' }} title="Eliminar tipo">
                {deleting === tipo.id ? <Loader2 className="animate-spin" size={16} /> : <Trash2 size={16} />}
              </Button>
            </div>
          </div>
        ))}

        {/* Inline add form */}
        {showAddForm && (
          <div style={{ display: 'grid', ...colStyle, padding: '12px 15px', backgroundColor: 'rgba(99,179,130,0.06)', borderRadius: '8px', border: '1px solid rgba(99,179,130,0.25)' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <input type="text" className="form-input" placeholder="Ej: Presidencial"
                value={newTipo.nombre} onChange={e => setNewTipo({ ...newTipo, nombre: e.target.value })}
                autoFocus />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <input type="number" className="form-input" placeholder="170000"
                value={newTipo.precio_base} onChange={e => setNewTipo({ ...newTipo, precio_base: e.target.value })} />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <input type="number" className="form-input" placeholder="50000"
                value={newTipo.recargo_pareja} onChange={e => setNewTipo({ ...newTipo, recargo_pareja: e.target.value })} />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <input type="number" className="form-input" placeholder="80000"
                value={newTipo.recargo_adicional} onChange={e => setNewTipo({ ...newTipo, recargo_adicional: e.target.value })} />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <input type="number" className="form-input text-center" placeholder="1" min={0} max={10}
                value={newTipo.max_personas_adicionales} onChange={e => setNewTipo({ ...newTipo, max_personas_adicionales: e.target.value })} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Button variant="primary" size="sm" onClick={handleAddSubmit} disabled={addingNew || !newTipo.nombre.trim()}>
                {addingNew ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => { setShowAddForm(false); setNewTipo({ ...emptyNew }); }}>
                <X size={16} />
              </Button>
            </div>
            <div /> {/* columna vacía para alinear con el botón eliminar */}
          </div>
        )}
      </div>

      {deleteError && (
        <div style={{ color: '#f87171', fontSize: '12px', marginTop: '10px', padding: '8px 12px', background: 'rgba(248,113,113,0.08)', borderRadius: '6px', border: '1px solid rgba(248,113,113,0.2)' }}>
          {deleteError}
        </div>
      )}

      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '15px' }}>
        * Si una habitación en específico no pertenece a ninguno de estos tipos, usará los precios que tenga configurados de forma individual.
      </p>
    </div>
  );
};
