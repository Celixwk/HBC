import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/apiFetch';
import { Button } from '../../components/Button/Button';
import { Loader2, Plus, Edit2, Shield, User, CheckCircle, XCircle } from 'lucide-react';

export const UsuariosSettings: React.FC = () => {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ id_usuario: '', nombre_completo: '', username: '', password: '', rol: 'recepcionista', activo: true });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/usuarios');
      if (res.ok) setUsuarios(await res.json());
    } catch { setError('Error al cargar usuarios'); }
    setLoading(false);
  };

  useEffect(() => { fetchUsuarios(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const url = form.id_usuario ? `/usuarios/${form.id_usuario}` : '/usuarios';
      const method = form.id_usuario ? 'PUT' : 'POST';
      const res = await apiFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setShowForm(false);
        fetchUsuarios();
      } else {
        const err = await res.json();
        setError(err.error || 'Error al guardar');
      }
    } catch { setError('Error de red'); }
    setSaving(false);
  };

  const handleToggleActivo = async (id: number) => {
    try {
      const res = await apiFetch(`/usuarios/${id}/toggle`, { method: 'PATCH' });
      if (res.ok) fetchUsuarios();
      else {
        const err = await res.json();
        alert(err.error || 'Error al cambiar estado');
      }
    } catch { alert('Error de conexión'); }
  };

  const openEdit = (u: any) => {
    setForm({ ...u, password: '' });
    setShowForm(true);
  };

  const openNew = () => {
    setForm({ id_usuario: '', nombre_completo: '', username: '', password: '', rol: 'recepcionista', activo: true });
    setShowForm(true);
  };

  if (loading) return <div><Loader2 className="animate-spin" size={24} /></div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h3 style={{ margin: 0 }}>Gestión de Usuarios</h3>
          <p className="text-muted" style={{ margin: 0, fontSize: '0.9rem' }}>Administra el acceso y roles de tu equipo.</p>
        </div>
        {!showForm && <Button variant="primary" size="sm" onClick={openNew}><Plus size={16} /> Nuevo Usuario</Button>}
      </div>

      {error && <div style={{ color: '#ef4444', marginBottom: 12 }}>{error}</div>}

      {showForm ? (
        <form onSubmit={handleSubmit} style={{ background: 'var(--bg-card)', padding: 20, borderRadius: 8, border: '1px solid var(--border-medium)', marginBottom: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label>Nombre Completo</label>
              <input required className="form-input" value={form.nombre_completo} onChange={e => setForm({...form, nombre_completo: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Usuario (Login)</label>
              <input required className="form-input" value={form.username} onChange={e => setForm({...form, username: e.target.value})} disabled={!!form.id_usuario} />
            </div>
            <div className="form-group">
              <label>{form.id_usuario ? 'Nueva Contraseña (dejar en blanco para no cambiar)' : 'Contraseña'}</label>
              <input required={!form.id_usuario} type="password" className="form-input" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Rol</label>
              <select className="form-input" value={form.rol} onChange={e => setForm({...form, rol: e.target.value})}>
                <option value="recepcionista">Recepcionista</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <Button variant="primary" type="submit" isLoading={saving}>Guardar</Button>
            <Button variant="ghost" onClick={() => setShowForm(false)}>Cancelar</Button>
          </div>
        </form>
      ) : (
        <table className="inv-table">
          <thead><tr><th>Nombre</th><th>Usuario</th><th>Rol</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id_usuario}>
                <td>{u.nombre_completo}</td>
                <td>@{u.username}</td>
                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {u.rol === 'admin' ? <Shield size={14} style={{ color: '#8b5cf6' }}/> : <User size={14} style={{ color: '#10b981' }}/>}
                    {u.rol}
                  </span>
                </td>
                <td>
                  {u.activo ? 
                    <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.85rem' }}><CheckCircle size={14}/> Activo</span> : 
                    <span style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.85rem' }}><XCircle size={14}/> Inactivo</span>}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Button variant="ghost" size="sm" onClick={() => openEdit(u)}><Edit2 size={14}/></Button>
                    <Button variant="ghost" size="sm" onClick={() => handleToggleActivo(u.id_usuario)} style={{ color: u.activo ? '#ef4444' : '#10b981' }}>
                      {u.activo ? 'Desactivar' : 'Activar'}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
