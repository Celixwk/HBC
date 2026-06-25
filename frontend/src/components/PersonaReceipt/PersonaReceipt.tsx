import React, { useRef } from 'react';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import { Printer } from 'lucide-react';
import '../Receipt/Receipt.css';

interface PersonaReceiptProps {
  isOpen: boolean;
  onClose: () => void;
  nombre: string;
  items: any[];
}

export const PersonaReceipt: React.FC<PersonaReceiptProps> = ({ isOpen, onClose, nombre, items }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = contentRef.current?.innerHTML;
    const originalContent = document.body.innerHTML;
    if (printContent) {
      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

  const activeItems = items.filter(i => i.estado !== 'anulado');
  const pagados = activeItems.filter(i => i.estado === 'pagado');
  const pendientes = activeItems.filter(i => i.estado !== 'pagado');

  const totalPagado = pagados.reduce((acc, i) => acc + parseFloat(i.valor_total || '0'), 0);
  const totalPendiente = pendientes.reduce((acc, i) => acc + parseFloat(i.valor_total || '0'), 0);
  const total = totalPagado + totalPendiente;

  const fmt = (n: number) => '$' + Math.round(n).toLocaleString('es-CO', { minimumFractionDigits: 0 });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Vista de Impresión — Persona">
      <div className="receipt-container" ref={contentRef}>
        <div className="receipt-header">
          <h2 className="receipt-title">CUENTA DE COBRO</h2>
          <p className="receipt-hotel-name">HOTEL BOUTIQUE</p>
          <div className="receipt-details">
            <p><strong>Fecha:</strong> {new Date().toLocaleDateString('es-CO')}</p>
          </div>
        </div>

        <div className="receipt-guest-info">
          <p><strong>Persona:</strong> {nombre}</p>
        </div>

        <table className="receipt-table">
          <thead>
            <tr>
              <th className="col-desc">Descripción</th>
              <th className="col-cant text-center">Cant.</th>
              <th className="col-unit text-right">V. Unit.</th>
              <th className="col-total text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {activeItems.map((item, idx) => (
              <tr key={idx} style={item.estado === 'anulado' ? { textDecoration: 'line-through', opacity: 0.5 } : undefined}>
                <td className="col-desc">{item.descripcion}</td>
                <td className="col-cant text-center">{item.cantidad}</td>
                <td className="col-unit text-right">{fmt(parseFloat(item.valor_unitario || '0'))}</td>
                <td className="col-total text-right">{fmt(parseFloat(item.valor_total || '0'))}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="receipt-totals">
          {totalPagado > 0 && totalPendiente > 0 && (
            <>
              <div className="receipt-totals-row">
                <span>Pagado:</span>
                <span>{fmt(totalPagado)}</span>
              </div>
              <div className="receipt-totals-row">
                <span>Pendiente:</span>
                <span>{fmt(totalPendiente)}</span>
              </div>
            </>
          )}
          <div className="receipt-totals-row grand-total">
            <span>TOTAL:</span>
            <span>{fmt(total)}</span>
          </div>
        </div>

        <div className="receipt-footer">
          <p>¡Gracias por su visita!</p>
          <p className="firma-line">Firma: _________________________</p>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>Cerrar</Button>
        <Button onClick={handlePrint} className="flex items-center gap-2">
          <Printer size={18} /> Imprimir Recibo
        </Button>
      </div>
    </Modal>
  );
};
