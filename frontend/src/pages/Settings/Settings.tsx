import React, { useState, useEffect } from 'react';
import { Save, Building2, MapPin, Mail, Loader2, CheckCircle, Lock, CreditCard, Database, Globe } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import './Settings.css';
import { apiFetch } from '../../utils/apiFetch';
import { TiposEspacioSettings } from './TiposEspacioSettings';
import { TemporadasSettings } from './TemporadasSettings';
import { SecuritySettings } from './SecuritySettings';
import { BackupRestoreSettings } from './BackupRestoreSettings';
import { MetodosPagoSettings } from './MetodosPagoSettings';
import { OrigenesSettings } from './OrigenesSettings';

interface ConfigData {
  nombre_hotel: string;
  direccion: string;
  telefono: string;
  nit: string;
  email: string;
  ciudad: string;
  hora_check_in: string;
  hora_check_out: string;
}

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [form, setForm] = useState<ConfigData>({
    nombre_hotel: '', direccion: '', telefono: '', nit: '', email: '', ciudad: '', hora_check_in: '15:00', hora_check_out: '13:00'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { fetchConfig(); }, []);

  const fetchConfig = async () => {
    try {
      const res = await apiFetch('/configuracion');
      if (res.ok) {
        const data = await res.json();
        setForm({
          nombre_hotel: data.nombre_hotel || '',
          direccion: data.direccion || '',
          telefono: data.telefono || '',
          nit: data.nit || '',
          email: data.email || '',
          ciudad: data.ciudad || '',
          hora_check_in: data.hora_check_in || '15:00',
          hora_check_out: data.hora_check_out || '13:00'
        });
      }
    } catch (e) {
      setError('No se pudo cargar la configuración.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const res = await apiFetch('/configuracion', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) setSaved(true);
      else throw new Error('Error al guardar');
    } catch (e) {
      setError('Error de conexión.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <Loader2 className="animate-spin" size={32} style={{ color: 'var(--primary)' }} />
      </div>
    );
  }

  return (
    <div className="settings-container">
      <div className="settings-header">
        <div>
          <h2 className="page-title">Configuración</h2>
          <p className="page-subtitle">Gestiona las preferencias y parámetros del sistema</p>
        </div>
      </div>

      <div className="settings-tabs">
        <button className={`settings-tab ${activeTab === 'general' ? 'active' : ''}`} onClick={() => setActiveTab('general')}>
          <Building2 size={15} /> Hotel
        </button>
        <button className={`settings-tab ${activeTab === 'tipos' ? 'active' : ''}`} onClick={() => setActiveTab('tipos')}>
          Tipos de Espacio
        </button>
        <button className={`settings-tab ${activeTab === 'temporadas' ? 'active' : ''}`} onClick={() => setActiveTab('temporadas')}>
          Temporadas
        </button>
        <button className={`settings-tab ${activeTab === 'origenes' ? 'active' : ''}`} onClick={() => setActiveTab('origenes')}>
          <Globe size={15} /> Orígenes
        </button>
        <button className={`settings-tab ${activeTab === 'pagos' ? 'active' : ''}`} onClick={() => setActiveTab('pagos')}>
          <CreditCard size={15} /> Pagos
        </button>
        <button className={`settings-tab ${activeTab === 'seguridad' ? 'active' : ''}`} onClick={() => setActiveTab('seguridad')}>
          <Lock size={15} /> Seguridad
        </button>
        <button className={`settings-tab ${activeTab === 'backup' ? 'active' : ''}`} onClick={() => setActiveTab('backup')}>
          <Database size={15} /> Respaldo
        </button>
      </div>

      <div className="glass-panel settings-panel">
        {activeTab === 'general' && (
          <form onSubmit={handleSubmit} className="settings-form">
            {error && (
              <div style={{ color: '#f87171', fontSize: '13px', padding: '12px 14px', background: 'rgba(248,113,113,0.08)', borderRadius: '10px', border: '1px solid rgba(248,113,113,0.2)' }}>
                {error}
              </div>
            )}

            <div className="settings-section-title">
              <span className="settings-section-title-left">
                <Building2 size={15} /> Información del Hotel
              </span>
            </div>

            <div className="settings-grid">
              <div className="form-group settings-full-col">
                <label htmlFor="nombre_hotel">Nombre del Hotel</label>
                <input type="text" id="nombre_hotel" name="nombre_hotel"
                  value={form.nombre_hotel} onChange={handleChange}
                  className="form-input" placeholder="Hotel Boutique XYZ" />
              </div>

              <div className="form-group">
                <label htmlFor="nit">NIT / RUT</label>
                <input type="text" id="nit" name="nit"
                  value={form.nit} onChange={handleChange}
                  className="form-input" placeholder="900.000.000-1" />
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input type="text" id="telefono" name="telefono"
                  value={form.telefono} onChange={handleChange}
                  className="form-input" placeholder="+57 320 000 0000" />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <Mail size={13} style={{ display:'inline', marginRight: 4 }} />Email
                </label>
                <input type="email" id="email" name="email"
                  value={form.email} onChange={handleChange}
                  className="form-input" placeholder="info@hotelboutique.com" />
              </div>

              <div className="form-group">
                <label htmlFor="ciudad">Ciudad</label>
                <input type="text" id="ciudad" name="ciudad"
                  value={form.ciudad} onChange={handleChange}
                  className="form-input" placeholder="Bogotá, Colombia" />
              </div>

              <div className="form-group settings-full-col">
                <label htmlFor="direccion">
                  <MapPin size={13} style={{ display:'inline', marginRight: 4 }} />Dirección
                </label>
                <input type="text" id="direccion" name="direccion"
                  value={form.direccion} onChange={handleChange}
                  className="form-input" placeholder="Calle 123 # 45-67, Barrio Centro" />
              </div>
            </div>

            <div className="settings-section-title" style={{ marginTop: '8px' }}>
              <span className="settings-section-title-left">
                Horarios
              </span>
            </div>

            <div className="settings-grid">
              <div className="form-group">
                <label htmlFor="hora_check_in">Hora Check-in</label>
                <input type="time" id="hora_check_in" name="hora_check_in"
                  value={form.hora_check_in} onChange={handleChange}
                  className="form-input" required />
              </div>

              <div className="form-group">
                <label htmlFor="hora_check_out">Hora Check-out</label>
                <input type="time" id="hora_check_out" name="hora_check_out"
                  value={form.hora_check_out} onChange={handleChange}
                  className="form-input" required />
              </div>
            </div>

            <div className="settings-actions">
              <Button type="submit" variant="primary" disabled={saving}>
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {saving ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
              {saved && (
                <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500 }}>
                  <CheckCircle size={16} /> Cambios guardados correctamente
                </span>
              )}
            </div>
          </form>
        )}

        {activeTab === 'tipos' && <TiposEspacioSettings />}
        {activeTab === 'temporadas' && <TemporadasSettings />}
        {activeTab === 'origenes' && <OrigenesSettings />}
        {activeTab === 'pagos' && <MetodosPagoSettings />}
        {activeTab === 'seguridad' && <SecuritySettings />}
        {activeTab === 'backup' && <BackupRestoreSettings />}
      </div>
    </div>
  );
};
