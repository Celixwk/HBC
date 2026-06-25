import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import './NewGuestModal.css';
import { apiFetch } from '../../utils/apiFetch';

interface NewGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newGuest: any) => void;
}

export const NewGuestModal: React.FC<NewGuestModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    nombre_completo: '',
    tipo_documento: 'CC',
    documento: '',
    telefono: '',
    procedencia: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiFetch('/huespedes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al guardar el huésped');
      }

      onSuccess(data);
      setFormData({
        nombre_completo: '',
        tipo_documento: 'CC',
        documento: '',
        telefono: '',
        procedencia: ''
      });
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nuevo Huésped">
      <form onSubmit={handleSubmit} className="guest-form">
        {error && <div className="form-error">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="nombre_completo">Nombre Completo *</label>
          <input 
            type="text" 
            id="nombre_completo" 
            name="nombre_completo" 
            value={formData.nombre_completo} 
            onChange={handleChange} 
            required 
            className="form-input"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="tipo_documento">Tipo Doc.</label>
            <select 
              id="tipo_documento" 
              name="tipo_documento" 
              value={formData.tipo_documento} 
              onChange={handleChange}
              className="form-input"
            >
              <option value="CC">CC</option>
              <option value="CE">CE</option>
              <option value="Pasaporte">Pasaporte</option>
              <option value="NIT">NIT</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="documento">No. Documento *</label>
            <input 
              type="text" 
              id="documento" 
              name="documento" 
              value={formData.documento} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input 
              type="text" 
              id="telefono" 
              name="telefono" 
              value={formData.telefono} 
              onChange={handleChange} 
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="procedencia">Procedencia / Ciudad</label>
            <input 
              type="text" 
              id="procedencia" 
              name="procedencia" 
              value={formData.procedencia} 
              onChange={handleChange} 
              className="form-input"
            />
          </div>
        </div>

        <div className="form-actions">
          <Button variant="ghost" type="button" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar Huésped'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
