import React, { useRef, useState, useEffect } from 'react';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import { Printer } from 'lucide-react';
import { apiFetch } from '../../utils/apiFetch';
import { fmtLocalDate } from '../../utils/dateUtils';
import './Receipt.css';

interface ReceiptProps {
  isOpen: boolean;
  onClose: () => void;
  reserva: any;
  items: any[];
}

export const Receipt: React.FC<ReceiptProps> = ({ isOpen, onClose, reserva, items }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [tiposConfig, setTiposConfig] = useState<any[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    apiFetch('/espacios/config/tipos')
      .then(r => r.json())
      .then(d => setTiposConfig(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, [isOpen]);

  // When config loads, if the stored monto_total is stale, silently correct it in the DB
  useEffect(() => {
    if (!reserva || tiposConfig.length === 0) return;
    const tipoNombre = reserva.espacio?.tipo_habitacion;
    if (!tipoNombre) return;
    const config = tiposConfig.find(
      (t: any) => t.nombre.toLowerCase() === tipoNombre.toLowerCase()
    );
    if (!config) return;

    const base      = parseFloat(config.precio_base);
    const pareja    = parseFloat(config.recargo_pareja);
    const adicional = parseFloat(config.recargo_adicional);
    const adultos   = reserva.cantidad_adultos || 1;
    const ninos     = reserva.cantidad_ninos   || 0;
    const personas  = adultos + ninos;

    let precioNoche: number;
    if (personas <= 1)      precioNoche = base;
    else if (personas === 2) precioNoche = base + pareja;
    else                     precioNoche = base + pareja + adicional * (personas - 2);

    const start  = new Date(reserva.check_in);
    const end    = new Date(reserva.check_out);
    const noches = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    const montoCalculado = Math.round(precioNoche * noches);
    const montoActual    = parseFloat(reserva.monto_total || '0');

    if (Math.abs(montoCalculado - montoActual) > 1) {
      apiFetch(`/reservas/${reserva.id_reserva}/monto`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ monto_total: montoCalculado })
      }).catch(() => {});
    }
  }, [tiposConfig, reserva]);

  if (!reserva) return null;

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

  const calcularNoches = () => {
    const start = new Date(reserva.check_in);
    const end = new Date(reserva.check_out);
    return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  };

  // Calculates the correct per-night price from current tipo_espacio_config
  const calcularPrecioPorNocheDesdeConfig = (): number | null => {
    const tipoNombre = reserva.espacio?.tipo_habitacion;
    if (!tipoNombre || tiposConfig.length === 0) return null;
    const config = tiposConfig.find(
      (t: any) => t.nombre.toLowerCase() === tipoNombre.toLowerCase()
    );
    if (!config) return null;

    const base     = parseFloat(config.precio_base);
    const pareja   = parseFloat(config.recargo_pareja);
    const adicional = parseFloat(config.recargo_adicional);
    const adultos  = reserva.cantidad_adultos || 1;
    const ninos    = reserva.cantidad_ninos   || 0;
    const personas = adultos + ninos;

    if (personas <= 1) return base;
    if (personas === 2) return base + pareja;
    return base + pareja + adicional * (personas - 2);
  };

  const noches = calcularNoches();
  const precioPorNocheConfig = calcularPrecioPorNocheDesdeConfig();

  // Use config-based price if available; fallback to stored monto_total / noches
  const precioPorNoche = precioPorNocheConfig ?? (noches > 0
    ? parseFloat(reserva.monto_total || '0') / noches
    : parseFloat(reserva.monto_total || '0'));

  const subtotalAlojamiento = Math.round(precioPorNoche * noches);
  const subtotalConsumos = items
    .filter(i => i.estado === 'pagado')
    .reduce((acc, item) => acc + parseFloat(item.valor_total || '0'), 0);
  const total = subtotalAlojamiento + subtotalConsumos;

  const fmt = (n: number) => '$' + Math.round(n).toLocaleString('es-CO', { minimumFractionDigits: 0 });

  const tipoHab = reserva.espacio?.tipo_habitacion
    ? reserva.espacio.tipo_habitacion.charAt(0).toUpperCase() + reserva.espacio.tipo_habitacion.slice(1)
    : reserva.espacio?.tipo_espacio === 'salon' ? 'Salón' : 'Habitación';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Vista de Impresión">
      <div className="receipt-container" ref={contentRef}>
        <div className="receipt-header">
          <h2 className="receipt-title">CUENTA DE COBRO</h2>
          <p className="receipt-hotel-name">HOTEL BOUTIQUE</p>
          <div className="receipt-details">
            <p><strong>Fecha:</strong> {new Date().toLocaleDateString('es-CO')}</p>
            <p><strong>Factura N°:</strong> {reserva.id_reserva.toString().padStart(6, '0')}</p>
          </div>
        </div>

        <div className="receipt-guest-info">
          <p><strong>Huésped:</strong> {reserva.huesped?.nombre_completo}</p>
          <p><strong>Habitación:</strong> {tipoHab} {reserva.espacio?.numero}</p>
          <p><strong>Fechas:</strong> {fmtLocalDate(reserva.check_in)} al {fmtLocalDate(reserva.check_out)} ({noches} {noches === 1 ? 'noche' : 'noches'})</p>
          <p><strong>Personas:</strong> {reserva.cantidad_adultos} {reserva.cantidad_adultos === 1 ? 'Adulto' : 'Adultos'}{(reserva.cantidad_ninos || 0) > 0 ? `, ${reserva.cantidad_ninos} Niño${reserva.cantidad_ninos > 1 ? 's' : ''}` : ''}</p>
          {reserva.anotaciones && <p><strong>Notas:</strong> {reserva.anotaciones}</p>}
        </div>

        <table className="receipt-table">
          <thead>
            <tr>
              <th className="col-desc">Descripción</th>
              <th className="col-cant text-center">Noches</th>
              <th className="col-unit text-right">V. Unit.</th>
              <th className="col-total text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="col-desc">{tipoHab} {reserva.espacio?.numero}</td>
              <td className="col-cant text-center">{noches}</td>
              <td className="col-unit text-right">{fmt(precioPorNoche)}</td>
              <td className="col-total text-right">{fmt(subtotalAlojamiento)}</td>
            </tr>
            {items.filter(i => i.estado === 'pagado').map((item, idx) => (
              <tr key={idx}>
                <td className="col-desc">{item.nombre_producto}</td>
                <td className="col-cant text-center">{item.cantidad}</td>
                <td className="col-unit text-right">{fmt(parseFloat(item.valor_unitario || '0'))}</td>
                <td className="col-total text-right">{fmt(parseFloat(item.valor_total || '0'))}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="receipt-totals">
          {subtotalConsumos > 0 && (
            <>
              <div className="receipt-totals-row">
                <span>Subtotal alojamiento:</span>
                <span>{fmt(subtotalAlojamiento)}</span>
              </div>
              <div className="receipt-totals-row">
                <span>Subtotal consumos:</span>
                <span>{fmt(subtotalConsumos)}</span>
              </div>
            </>
          )}
          <div className="receipt-totals-row grand-total">
            <span>TOTAL A PAGAR:</span>
            <span>{fmt(total)}</span>
          </div>
          {reserva.metodo_pago && (
            <div className="receipt-totals-row">
              <span>Método de pago:</span>
              <span style={{ textTransform: 'capitalize' }}>{reserva.metodo_pago}</span>
            </div>
          )}
        </div>

        <div className="receipt-footer">
          <p>¡Gracias por su visita!</p>
          <p className="firma-line">Firma del huésped: _________________________</p>
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
