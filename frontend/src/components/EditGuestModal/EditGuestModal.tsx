import React, { useState, useEffect } from 'react';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import { User, CreditCard, Phone, MapPin } from 'lucide-react';
import { apiFetch } from '../../utils/apiFetch';

interface EditGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  guest: any;
}

export const EditGuestModal: React.FC<EditGuestModalProps> = ({ isOpen, onClose, onSuccess, guest }) => {
  const [formData, setFormData] = useState({
    nombre_completo: '',
    documento: '',
    tipo_documento: 'CC',
    telefono: '',
    procedencia: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (guest) {
      setFormData({
        nombre_completo: guest.nombre_completo || '',
        documento: guest.documento || '',
        tipo_documento: guest.tipo_documento || 'CC',
        telefono: guest.telefono || '',
        procedencia: guest.procedencia || ''
      });
    }
  }, [guest]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiFetch(`/huespedes/${guest.id_huesped}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error al actualizar el huésped');
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Información del Huésped">
      <form onSubmit={handleSubmit} className="form-container">
        {error && <div className="form-error">{error}</div>}

        <div className="form-group">
          <label htmlFor="nombre_completo">
            <User size={14} style={{ display: 'inline', marginRight: 4 }} />
            Nombre Completo *
          </label>
          <input
            type="text"
            id="nombre_completo"
            name="nombre_completo"
            value={formData.nombre_completo}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-grid-2">
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
              <option value="TI">TI</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="documento">
              <CreditCard size={14} style={{ display: 'inline', marginRight: 4 }} />
              Documento *
            </label>
            <input
              type="text"
              id="documento"
              name="documento"
              value={formData.documento}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label htmlFor="telefono">
              <Phone size={14} style={{ display: 'inline', marginRight: 4 }} />
              Teléfono
            </label>
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
            <label htmlFor="procedencia">
              <MapPin size={14} style={{ display: 'inline', marginRight: 4 }} />
              Procedencia
            </label>
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

        <div className="form-actions" style={{ marginTop: 20 }}>
          <Button variant="ghost" type="button" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
