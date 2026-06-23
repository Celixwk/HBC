import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import './NewSpaceModal.css';
import { apiFetch } from '../../utils/apiFetch';

interface NewSpaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const NewSpaceModal: React.FC<NewSpaceModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    numero: '',
    tipo_espacio: 'habitacion',
    tipo_habitacion: 'standard',
    capacidad_personas: '4',
    tiene_minibar: false,
    activo: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isSalon = formData.tipo_espacio === 'salon';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        capacidad_personas: parseInt(formData.capacidad_personas) || null,
        tipo_habitacion: isSalon ? null : formData.tipo_habitacion,
        tiene_minibar: isSalon ? false : formData.tiene_minibar,
      };

      const response = await apiFetch('/espacios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error al crear el espacio');

      onSuccess();
      onClose();
      setFormData({
        numero: '', tipo_espacio: 'habitacion', tipo_habitacion: 'standard',
        capacidad_personas: '4', tiene_minibar: false, activo: true
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nuevo Espacio">
      <form onSubmit={handleSubmit} className="space-form">
        {error && <div className="form-error">{error}</div>}

        <div className="form-group">
          <label htmlFor="numero">{isSalon ? 'Nombre / Número del Salón *' : 'Número de Habitación *'}</label>
          <input type="text" id="numero" name="numero" value={formData.numero}
            onChange={handleChange} required className="form-input"
            placeholder={isSalon ? 'Ej: Salón Principal, Salón A...' : 'Ej: 101, 201...'} />
        </div>

        <div className="form-group">
          <label htmlFor="tipo_espacio">Tipo de Espacio</label>
          <select id="tipo_espacio" name="tipo_espacio" value={formData.tipo_espacio}
            onChange={handleChange} className="form-input">
            <option value="habitacion">Habitación</option>
            <option value="salon">Salón</option>
          </select>
        </div>

        {!isSalon && (
          <div className="form-group">
            <label htmlFor="tipo_habitacion">Categoría</label>
            <select id="tipo_habitacion" name="tipo_habitacion" value={formData.tipo_habitacion}
              onChange={handleChange} className="form-input">
              <option value="standard">Standard</option>
              <option value="deluxe">Deluxe</option>
              <option value="suite">Suite</option>
            </select>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="capacidad_personas">Capacidad Máxima (personas)</label>
          <input type="text" id="capacidad_personas" name="capacidad_personas"
            value={formData.capacidad_personas} onChange={handleChange}
            className="form-input text-center" />
        </div>

        {!isSalon && (
          <div className="minibar-toggle">
            <label className="toggle-label">
              <input type="checkbox" name="tiene_minibar" checked={formData.tiene_minibar}
                onChange={handleChange} className="toggle-input" />
              <span className="toggle-track"></span>
              <span>Incluye Minibar</span>
            </label>
          </div>
        )}

        {isSalon && (
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
            El precio del salón se acuerda con el cliente por evento al momento de la reserva.
          </div>
        )}

        <div className="form-actions">
          <Button variant="ghost" type="button" onClick={onClose} disabled={loading}>Cancelar</Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Guardando...' : 'Crear Espacio'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
