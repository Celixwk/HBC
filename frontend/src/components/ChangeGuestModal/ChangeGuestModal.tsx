import React, { useState, useEffect } from 'react';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import { apiFetch } from '../../utils/apiFetch';
import { Loader2 } from 'lucide-react';

interface ChangeGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  idReserva: number;
  currentGuestName: string;
  onSuccess: () => void;
}

export const ChangeGuestModal: React.FC<ChangeGuestModalProps> = ({ isOpen, onClose, idReserva, currentGuestName, onSuccess }) => {
  const [allGuests, setAllGuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [nombre, setNombre] = useState('');
  const [documento, setDocumento] = useState('');
  const [selectedGuestId, setSelectedGuestId] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      apiFetch('/huespedes')
        .then(res => res.json())
        .then(data => setAllGuests(data))
        .catch(console.error);
      setNombre('');
      setDocumento('');
      setSelectedGuestId('');
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let idHuespedToAssign = selectedGuestId;

      // Si no seleccionó uno existente, debemos crearlo rápido
      if (!idHuespedToAssign) {
        if (!nombre || !documento) {
          throw new Error('Debes seleccionar un huésped o llenar el nombre y documento del nuevo.');
        }

        const resCrear = await apiFetch('/huespedes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre_completo: nombre,
            documento: documento,
            tipo_documento: 'CC'
          })
        });
        const dataH = await resCrear.json();
        if (!resCrear.ok) throw new Error(dataH.error || 'Error al crear el nuevo titular.');
        idHuespedToAssign = dataH.id_huesped;
      }

      // Reasignar la reserva
      const response = await apiFetch(`/reservas/${idReserva}/huesped`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id_huesped: idHuespedToAssign,
          anotacion_extra: `Titular cambiado. Original: ${currentGuestName}`
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al cambiar el titular');
      }

      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cambiar Titular de Reserva">
      <form onSubmit={handleSubmit} className="reserva-form" style={{ padding: '0 10px' }}>
        <p style={{ marginBottom: '15px', fontSize: '14px', color: 'var(--text-muted)' }}>
          Titular actual: <strong>{currentGuestName}</strong>
        </p>

        {error && <div className="form-error">{error}</div>}

        <div className="form-group guest-search-container">
          <label>1. Selecciona un huésped existente...</label>
          <select 
            className="form-input" 
            value={selectedGuestId}
            onChange={(e) => {
              setSelectedGuestId(e.target.value);
              setNombre(''); setDocumento(''); // Clear manual inputs
            }}
          >
            <option value="">-- Crear Nuevo Huésped --</option>
            {allGuests.map(g => (
              <option key={g.id_huesped} value={g.id_huesped}>
                {g.nombre_completo} - {g.documento}
              </option>
            ))}
          </select>
        </div>

        {!selectedGuestId && (
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginTop: '10px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontSize: '13px', fontWeight: 'bold' }}>
              2. O ingresa los datos del nuevo titular:
            </label>
            <div className="form-grid-2">
              <div className="form-group">
                <label>Nombre Completo</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={nombre} 
                  onChange={e => setNombre(e.target.value)}
                  placeholder="Juan Pérez"
                />
              </div>
              <div className="form-group">
                <label>Documento</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={documento} 
                  onChange={e => setDocumento(e.target.value)}
                  placeholder="123456789"
                />
              </div>
            </div>
          </div>
        )}

        <div className="form-actions" style={{ marginTop: '20px' }}>
          <Button variant="secondary" onClick={onClose} type="button">Cancelar</Button>
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={16} /> : 'Guardar y Reasignar'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
