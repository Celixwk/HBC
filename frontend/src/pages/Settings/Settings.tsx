import React, { useState, useEffect } from 'react';
import { Save, Building2, Phone, MapPin, Hash, Mail, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import './Settings.css';
import { apiFetch } from '../../utils/apiFetch';
import { TiposEspacioSettings } from './TiposEspacioSettings';
import { SecuritySettings } from './SecuritySettings';

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const res = await apiFetch('/configuracion', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Error al guardar');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError('No se pudo guardar la configuración.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="settings-container">
      <div className="flex justify-center items-center p-8">
        <Loader2 className="animate-spin text-primary" size={36} />
      </div>
    </div>
  );

  return (
    <div className="settings-container">
      <div className="settings-header">
        <div>
          <h1 className="page-title">Configuración</h1>
          <p className="page-subtitle">Datos del hotel para recibos y reportes</p>
        </div>
      </div>

      <div className="settings-body">
        <form onSubmit={handleSave} className="settings-form glass-panel">
          <div className="settings-section-title">
            <Building2 size={16} /> Información del Hotel
          </div>

          {error && <div className="form-error">{error}</div>}

          <div className="settings-grid">
            <div className="form-group settings-full-col">
              <label htmlFor="nombre_hotel">Nombre del Hotel *</label>
              <input type="text" id="nombre_hotel" name="nombre_hotel"
                value={form.nombre_hotel} onChange={handleChange}
                className="form-input" placeholder="Hotel Boutique Las Palmas" required />
            </div>

            <div className="form-group">
              <label htmlFor="nit">
                <Hash size={13} style={{ display:'inline', marginRight: 4 }} />NIT / RUC
              </label>
              <input type="text" id="nit" name="nit"
                value={form.nit} onChange={handleChange}
                className="form-input" placeholder="900.123.456-7" />
            </div>

            <div className="form-group">
              <label htmlFor="telefono">
                <Phone size={13} style={{ display:'inline', marginRight: 4 }} />Teléfono
              </label>
              <input type="text" id="telefono" name="telefono"
                value={form.telefono} onChange={handleChange}
                className="form-input" placeholder="(601) 234 5678" />
            </div>

            <div className="form-group">
              <label htmlFor="ciudad">
                <MapPin size={13} style={{ display:'inline', marginRight: 4 }} />Ciudad
              </label>
              <input type="text" id="ciudad" name="ciudad"
                value={form.ciudad} onChange={handleChange}
                className="form-input" placeholder="Bogotá, Colombia" />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <Mail size={13} style={{ display:'inline', marginRight: 4 }} />Email
              </label>
              <input type="email" id="email" name="email"
                value={form.email} onChange={handleChange}
                className="form-input" placeholder="info@hotelboutique.com" />
            </div>

            <div className="form-group settings-full-col">
              <label htmlFor="direccion">
                <MapPin size={13} style={{ display:'inline', marginRight: 4 }} />Dirección
              </label>
              <input type="text" id="direccion" name="direccion"
                value={form.direccion} onChange={handleChange}
                className="form-input" placeholder="Calle 123 # 45-67, Barrio Centro" />
            </div>

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
            {saved && (
              <div className="saved-badge">
                <CheckCircle size={15} /> Guardado correctamente
              </div>
            )}
            <Button variant="primary" type="submit" disabled={saving}>
              <Save size={16} /> {saving ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </div>
        </form>

        <TiposEspacioSettings />
        <SecuritySettings />
      </div>
    </div>
  );
};
