import React, { useState, useEffect } from 'react';
import { Button } from '../../components/Button/Button';
import { Plus, Trash2, Globe, Loader2 } from 'lucide-react';
import { apiFetch } from '../../utils/apiFetch';

export const OrigenesSettings = () => {
  const [origenes, setOrigenes] = useState<any[]>([]);
  const [nuevoOrigen, setNuevoOrigen] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrigenes();
  }, []);

  const fetchOrigenes = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/configuracion/origenes');
      if (res.ok) {
        setOrigenes(await res.json());
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAgregar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoOrigen.trim()) return;
    setSaving(true);
    setError('');

    try {
      const res = await apiFetch('/configuracion/origenes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nuevoOrigen.trim() })
      });
      if (res.ok) {
        setNuevoOrigen('');
        fetchOrigenes();
      } else {
        const d = await res.json();
        setError(d.error || 'Error al agregar origen');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEliminar = async (id: number, nombre: string) => {
    if (nombre === 'Propia') {
      alert('El origen "Propia" es el sistema base y no se puede eliminar.');
      return;
    }
    if (!window.confirm(`¿Eliminar origen ${nombre}?`)) return;

    try {
      const res = await apiFetch(`/configuracion/origenes/${id}`, { method: 'DELETE' });
      if (res.ok) fetchOrigenes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="settings-section" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="settings-section-title" style={{ marginBottom: '8px' }}>
        <Globe size={16} /> Orígenes de Reserva (Booking, Airbnb, etc.)
      </div>
      <p className="text-muted" style={{ marginBottom: '24px', fontSize: '13px' }}>
        Administra las plataformas de donde provienen tus reservas. Si seleccionas un origen distinto a "Propia", el sistema te permitirá ingresar el precio de forma manual.
      </p>

      {error && <div className="form-error" style={{ marginBottom: '16px' }}>{error}</div>}

      <div style={{ background: 'var(--surface-50)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
        <form onSubmit={handleAgregar} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <input
            type="text"
            value={nuevoOrigen}
            onChange={(e) => setNuevoOrigen(e.target.value)}
            placeholder="Ej. Booking.com"
            className="form-input"
            style={{ flex: 1 }}
          />
          <Button type="submit" variant="primary" disabled={saving || !nuevoOrigen.trim()}>
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
            Agregar
          </Button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {loading ? (
            <div style={{ padding: '20px', textAlign: 'center' }}><Loader2 className="animate-spin" size={24} /></div>
          ) : origenes.map((origen) => (
            <div
              key={origen.id_origen}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: 'var(--surface)',
                border: '1px solid var(--border-light)',
                borderRadius: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontWeight: 500, fontSize: '14px' }}>
                  {origen.nombre}
                </span>
                {origen.nombre === 'Propia' && (
                  <span style={{ fontSize: '11px', padding: '2px 6px', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '4px' }}>
                    Por defecto
                  </span>
                )}
              </div>
              {origen.nombre !== 'Propia' && (
                <button
                  onClick={() => handleEliminar(origen.id_origen, origen.nombre)}
                  style={{
                    background: 'none', border: 'none', color: 'var(--danger)',
                    cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center',
                    opacity: 0.7, transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
                  title="Eliminar"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
