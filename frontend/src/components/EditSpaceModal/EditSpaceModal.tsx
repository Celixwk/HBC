import React, { useState, useEffect } from 'react';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import '../NewSpaceModal/NewSpaceModal.css';
import { apiFetch } from '../../utils/apiFetch';

interface EditSpaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  space: any;
}

export const EditSpaceModal: React.FC<EditSpaceModalProps> = ({ isOpen, onClose, onSuccess, space }) => {
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

  useEffect(() => {
    if (space) {
      setFormData({
        numero: space.numero || '',
        tipo_espacio: space.tipo_espacio || 'habitacion',
        tipo_habitacion: space.tipo_habitacion || 'standard',
        capacidad_personas: space.capacidad_personas?.toString() || '4',
        tiene_minibar: space.tiene_minibar || false,
        activo: space.activo !== undefined ? space.activo : true
      });
      setError('');
    }
  }, [space]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!space) return;
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        capacidad_personas: parseInt(formData.capacidad_personas) || null,
        tipo_habitacion: isSalon ? null : formData.tipo_habitacion,
        tiene_minibar: isSalon ? false : formData.tiene_minibar,
      };

      const response = await apiFetch(`/espacios/${space.id_espacio}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error al actualizar el espacio');

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Editar — ${space?.numero || ''}`}>
      <form onSubmit={handleSubmit} className="space-form">
        {error && <div className="form-error">{error}</div>}

        <div className="form-group">
          <label htmlFor="edit-numero">{isSalon ? 'Nombre / Número del Salón *' : 'Número de Habitación *'}</label>
          <input type="text" id="edit-numero" name="numero" value={formData.numero}
            onChange={handleChange} required className="form-input" />
        </div>

        <div className="form-group">
          <label htmlFor="edit-tipo_espacio">Tipo de Espacio</label>
          <select id="edit-tipo_espacio" name="tipo_espacio" value={formData.tipo_espacio}
            onChange={handleChange} className="form-input">
            <option value="habitacion">Habitación</option>
            <option value="salon">Salón</option>
          </select>
        </div>

        {!isSalon && (
          <div className="form-group">
            <label htmlFor="edit-tipo_habitacion">Categoría</label>
            <select id="edit-tipo_habitacion" name="tipo_habitacion" value={formData.tipo_habitacion}
              onChange={handleChange} className="form-input">
              <option value="standard">Standard</option>
              <option value="deluxe">Deluxe</option>
              <option value="suite">Suite</option>
            </select>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="edit-capacidad">Capacidad Máxima (personas)</label>
          <input type="text" id="edit-capacidad" name="capacidad_personas"
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

        <div className="form-group">
          <label htmlFor="edit-activo">Estado</label>
          <select id="edit-activo" name="activo" value={formData.activo ? 'true' : 'false'}
            onChange={e => setFormData({ ...formData, activo: e.target.value === 'true' })}
            className="form-input">
            <option value="true">Activa</option>
            <option value="false">Inactiva</option>
          </select>
        </div>

        <div className="form-actions">
          <Button variant="ghost" type="button" onClick={onClose} disabled={loading}>Cancelar</Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
