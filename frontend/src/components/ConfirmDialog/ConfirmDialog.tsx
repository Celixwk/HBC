import React from 'react';
import './ConfirmDialog.css';

interface ConfirmDialogProps {
  isOpen: boolean;
  type?: 'confirm' | 'alert' | 'danger';
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  type = 'confirm',
  title,
  message,
  confirmLabel,
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const defaultTitle = type === 'danger' ? 'Eliminar' : type === 'alert' ? 'Atención' : 'Confirmar';
  const defaultConfirm = type === 'danger' ? 'Eliminar' : 'Aceptar';

  return (
    <div className="cdialog-overlay" onClick={onCancel}>
      <div className="cdialog-box" onClick={e => e.stopPropagation()}>
        <div className={`cdialog-icon ${type}`}>
          {type === 'danger' ? '🗑️' : type === 'alert' ? '⚠️' : '❓'}
        </div>
        <div className="cdialog-title">{title || defaultTitle}</div>
        <div className="cdialog-message">{message}</div>
        <div className="cdialog-actions">
          {type !== 'alert' && (
            <button className="cdialog-btn cdialog-btn-cancel" onClick={onCancel}>
              {cancelLabel}
            </button>
          )}
          <button
            className={`cdialog-btn cdialog-btn-confirm ${type === 'danger' ? 'danger' : ''}`}
            onClick={() => { onConfirm?.(); onCancel(); }}
          >
            {confirmLabel || defaultConfirm}
          </button>
        </div>
      </div>
    </div>
  );
};

/** Hook helper — uso: const { dialog, showConfirm, showAlert } = useConfirmDialog() */
export function useConfirmDialog() {
  const [dialog, setDialog] = React.useState<{
    isOpen: boolean;
    type: 'confirm' | 'alert' | 'danger';
    title?: string;
    message: string;
    onConfirm?: () => void;
  }>({ isOpen: false, type: 'confirm', message: '' });

  const close = () => setDialog(d => ({ ...d, isOpen: false }));

  const showConfirm = (message: string, onConfirm: () => void, title?: string) =>
    setDialog({ isOpen: true, type: 'confirm', message, title, onConfirm });

  const showDanger = (message: string, onConfirm: () => void, title?: string) =>
    setDialog({ isOpen: true, type: 'danger', message, title, onConfirm });

  const showAlert = (message: string, title?: string) =>
    setDialog({ isOpen: true, type: 'alert', message, title, onConfirm: undefined });

  return { dialog, close, showConfirm, showDanger, showAlert };
}
