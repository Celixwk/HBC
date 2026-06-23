import React, { useState, useEffect } from 'react';
import { Plus, Loader2, Edit2, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { apiFetch } from '../../utils/apiFetch';
import './Providers.css';

interface Proveedor {
  id_proveedor: number;
  nombre: string;
  nit: string | null;
  telefono: string | null;
  email: string | null;
  direccion: string | null;
  ciudad: string | null;
  contacto: string | null;
  notas: string | null;
  activo: boolean;
  _count?: { productos: number };
}

const EMPTY: Omit<Proveedor, 'id_proveedor' | 'activo' | '_count'> = {
  nombre: '', nit: '', telefono: '', email: '', direccion: '', ciudad: '', contacto: '', notas: ''
};

export const Providers: React.FC = () => {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Proveedor | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [showInactivos, setShowInactivos] = useState(false);

  useEffect(() => { fetchProveedores(); }, []);

  const fetchProveedores = async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/proveedores');
      if (res.ok) setProveedores(await res.json());
    } finally { setLoading(false); }
  };

  const openNew = () => { setEditing(null); setForm({ ...EMPTY }); setModalOpen(true); };
  const openEdit = (p: Proveedor) => {
    setEditing(p);
    setForm({ nombre: p.nombre, nit: p.nit || '', telefono: p.telefono || '', email: p.email || '',
      direccion: p.direccion || '', ciudad: p.ciudad || '', contacto: p.contacto || '', notas: p.notas || '' });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.nombre.trim()) return alert('El nombre es obligatorio');
    setSaving(true);
    try {
      const res = editing
        ? await apiFetch(`/proveedores/${editing.id_proveedor}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
        : await apiFetch('/proveedores', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      setModalOpen(false);
      fetchProveedores();
    } catch { alert('Error al guardar'); }
    finally { setSaving(false); }
  };

  const toggleActivo = async (p: Proveedor) => {
    const accion = p.activo ? 'desactivar' : 'activar';
    if (!window.confirm(`¿Deseas ${accion} a ${p.nombre}?`)) return;
    await apiFetch(`/proveedores/${p.id_proveedor}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activo: !p.activo })
    });
    fetchProveedores();
  };

  const f = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(v => ({ ...v, [k]: e.target.value }));

  const visible = proveedores.filter(p => showInactivos || p.activo);

  return (
    <div className="providers-container">
      <div className="providers-header">
        <div>
          <h1 className="page-title">Proveedores</h1>
          <p className="page-subtitle">{visible.length} proveedor{visible.length !== 1 ? 'es' : ''} registrado{visible.length !== 1 ? 's' : ''}</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={() => setShowInactivos(v => !v)}
            style={{ fontSize: '13px', color: 'var(--text-muted)', background: 'none', border: '1px solid var(--border-medium)', borderRadius: '8px', padding: '7px 12px', cursor: 'pointer' }}>
            {showInactivos ? 'Ocultar inactivos' : 'Ver inactivos'}
          </button>
          <Button variant="primary" onClick={openNew}><Plus size={16} /> Nuevo Proveedor</Button>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        {loading ? (
          <div className="flex justify-center p-8"><Loader2 className="animate-spin text-primary" size={36} /></div>
        ) : (
          <div className="providers-table-wrap">
            <table className="providers-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>NIT</th>
                  <th>Ciudad</th>
                  <th>Teléfono</th>
                  <th>Email</th>
                  <th>Contacto</th>
                  <th>Productos</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {visible.map(p => (
                  <tr key={p.id_proveedor} style={{ opacity: p.activo ? 1 : 0.55 }}>
                    <td style={{ fontWeight: 600 }}>{p.nombre}</td>
                    <td className="text-muted">{p.nit || '—'}</td>
                    <td>{p.ciudad || '—'}</td>
                    <td>{p.telefono || '—'}</td>
                    <td>{p.email || '—'}</td>
                    <td>{p.contacto || '—'}</td>
                    <td style={{ textAlign: 'center' }}>{p._count?.productos ?? 0}</td>
                    <td>
                      {p.activo
                        ? <span className="badge-activo">Activo</span>
                        : <span className="badge-inactivo">Inactivo</span>}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => openEdit(p)} title="Editar"
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}>
                          <Edit2 size={15} />
                        </button>
                        <button onClick={() => toggleActivo(p)} title={p.activo ? 'Desactivar' : 'Activar'}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: p.activo ? '#f59e0b' : '#10b981', padding: '4px' }}>
                          {p.activo ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {visible.length === 0 && (
                  <tr><td colSpan={9} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                    No hay proveedores registrados.
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Editar Proveedor' : 'Nuevo Proveedor'}>
        <div className="form-grid">
          <div className="form-group full">
            <label>Nombre *</label>
            <input className="form-input" value={form.nombre} onChange={f('nombre')} placeholder="Razón social o nombre" />
          </div>
          <div className="form-group">
            <label>NIT</label>
            <input className="form-input" value={form.nit || ''} onChange={f('nit')} placeholder="900.000.000-0" />
          </div>
          <div className="form-group">
            <label>Ciudad</label>
            <input className="form-input" value={form.ciudad || ''} onChange={f('ciudad')} placeholder="Bogotá" />
          </div>
          <div className="form-group">
            <label>Teléfono</label>
            <input className="form-input" value={form.telefono || ''} onChange={f('telefono')} placeholder="601 000 0000" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input className="form-input" type="email" value={form.email || ''} onChange={f('email')} placeholder="ventas@proveedor.com" />
          </div>
          <div className="form-group full">
            <label>Dirección</label>
            <input className="form-input" value={form.direccion || ''} onChange={f('direccion')} placeholder="Calle 00 # 00-00" />
          </div>
          <div className="form-group">
            <label>Persona de contacto</label>
            <input className="form-input" value={form.contacto || ''} onChange={f('contacto')} placeholder="Nombre del contacto" />
          </div>
          <div className="form-group">
            <label>Notas</label>
            <input className="form-input" value={form.notas || ''} onChange={f('notas')} placeholder="Observaciones adicionales" />
          </div>
        </div>
        <div className="form-actions" style={{ marginTop: '16px' }}>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleSave} isLoading={saving}>
            {editing ? 'Guardar cambios' : 'Crear proveedor'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};
