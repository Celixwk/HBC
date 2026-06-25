import { useRef, useState } from 'react';
import { SignaturePad } from './SignaturePad';
import type { SignaturePadHandle } from './SignaturePad';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import { RotateCcw, Save } from 'lucide-react';
import './SignatureModal.css';
import { apiFetch } from '../../utils/apiFetch';

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  huesped: { id_huesped: number; nombre_completo: string; firma?: string | null };
  onSaved: () => void;
}

export const SignatureModal: React.FC<SignatureModalProps> = ({ isOpen, onClose, huesped, onSaved }) => {
  const padRef = useRef<SignaturePadHandle>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleClear = () => {
    padRef.current?.clear();
    setError('');
  };

  const handleSave = async () => {
    if (padRef.current?.isEmpty()) {
      setError('Por favor, dibuja la firma antes de guardar.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const firmaBase64 = padRef.current?.getDataUrl();

      const res = await apiFetch(`/huespedes/${huesped.id_huesped}/firma`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firma: firmaBase64 })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error al guardar la firma');
      }

      onSaved();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Firma — ${huesped?.nombre_completo}`}>
      <div className="signature-wrapper">
        <p className="signature-hint">
          {huesped?.firma
            ? 'Ya tiene una firma guardada. Dibuja una nueva para reemplazarla.'
            : 'Pide al huésped que firme en el recuadro con el dedo o lápiz táctil.'}
        </p>

        {huesped?.firma && (
          <div className="existing-signature">
            <p className="text-muted text-sm">Firma actual:</p>
            <img src={huesped.firma} alt="Firma actual" className="signature-preview" />
          </div>
        )}

        <div className="canvas-container">
          <SignaturePad ref={padRef} className="signature-canvas" />
          <p className="canvas-label">↑ Área de firma</p>
        </div>

        {error && <div className="form-error">{error}</div>}

        <div className="signature-actions">
          <Button variant="ghost" onClick={handleClear} type="button">
            <RotateCcw size={16} /> Limpiar
          </Button>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button variant="ghost" onClick={onClose} type="button">Cancelar</Button>
            <Button variant="primary" onClick={handleSave} disabled={saving} type="button">
              <Save size={16} /> {saving ? 'Guardando...' : 'Guardar Firma'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
