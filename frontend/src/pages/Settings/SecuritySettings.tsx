import React, { useState } from 'react';
import { Save, Lock, CheckCircle } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { apiFetch } from '../../utils/apiFetch';
import { useAuth } from '../../context/AuthContext';

export const SecuritySettings: React.FC = () => {
  const { logout } = useAuth();
  const [form, setForm] = useState({
    newUsuario: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
    setError('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      setError('Las contraseñas nuevas no coinciden');
      return;
    }
    
    setSaving(true);
    setError('');
    
    try {
      const res = await apiFetch('/auth/credentials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newUsuario: form.newUsuario,
          newPassword: form.newPassword
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Error al actualizar credenciales');
      }
      
      setSaved(true);
      setTimeout(() => {
        logout(); // Force logout to re-authenticate with new credentials
      }, 2000);
      
    } catch (err: any) {
      setError(err.message || 'Error de conexión');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="settings-form glass-panel mt-6">
      <div className="settings-section-title">
        <Lock size={16} /> Credenciales de Acceso
      </div>

      {error && <div className="form-error">{error}</div>}
      
      <p className="text-sm text-gray-500 mb-4">
        Al actualizar el usuario y/o la contraseña, la sesión actual se cerrará por seguridad y deberás volver a iniciar sesión con las nuevas credenciales.
      </p>

      <div className="settings-grid">
        <div className="form-group settings-full-col">
          <label htmlFor="newUsuario">Nuevo Nombre de Usuario *</label>
          <input type="text" id="newUsuario" name="newUsuario"
            value={form.newUsuario} onChange={handleChange}
            className="form-input" placeholder="admin" required />
        </div>

        <div className="form-group settings-full-col">
          <label htmlFor="currentPassword">Contraseña Actual *</label>
          <input type="password" id="currentPassword" name="currentPassword"
            value={form.currentPassword} onChange={handleChange}
            className="form-input" placeholder="Contraseña actual para verificar" required />
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">Nueva Contraseña *</label>
          <input type="password" id="newPassword" name="newPassword"
            value={form.newPassword} onChange={handleChange}
            className="form-input" placeholder="Nueva contraseña" required minLength={6} />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Nueva Contraseña *</label>
          <input type="password" id="confirmPassword" name="confirmPassword"
            value={form.confirmPassword} onChange={handleChange}
            className="form-input" placeholder="Repite la nueva contraseña" required minLength={6} />
        </div>
      </div>

      <div className="settings-actions">
        {saved && (
          <div className="saved-badge">
            <CheckCircle size={15} /> Actualizado. Cerrando sesión...
          </div>
        )}
        <Button variant="danger" type="submit" disabled={saving}>
          <Save size={16} /> {saving ? 'Actualizando...' : 'Actualizar Credenciales'}
        </Button>
      </div>
    </form>
  );
};
