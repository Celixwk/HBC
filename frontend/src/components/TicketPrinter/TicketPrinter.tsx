import React, { useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import './TicketPrinter.css';

interface TicketPrinterProps {
  reserva?: any;
  items: any[];
  hotelInfo?: {
    nombre_hotel: string;
    direccion: string;
    telefono: string;
    nit: string;
    ciudad: string;
  };
  paperSize?: '58mm' | '80mm';
  onClose: () => void;
}

export const TicketPrinter: React.FC<TicketPrinterProps> = ({ reserva, items, hotelInfo: initialHotelInfo, paperSize = '80mm', onClose }) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [hotelInfo, setHotelInfo] = React.useState(initialHotelInfo);

  useEffect(() => {
    if (!hotelInfo) {
      fetch('/api/configuracion', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('hb_token')}` }
      })
        .then(res => res.json())
        .then(data => setHotelInfo(data))
        .catch(console.error);
    }
  }, [hotelInfo]);

  useEffect(() => {
    // Automatically trigger print when mounted and data is ready
    if (hotelInfo || initialHotelInfo === undefined) {
      const timer = setTimeout(() => {
        window.print();
        onClose();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [onClose, hotelInfo, initialHotelInfo]);

  const total = items.reduce((sum, i) => sum + parseFloat(i.valor_total || 0), 0) + (reserva ? parseFloat(reserva.monto_total || 0) : 0);
  const pagado = items.filter(i => i.estado === 'pagado').reduce((sum, i) => sum + parseFloat(i.valor_total || 0), 0) + (reserva?.estado_pago === 'pagado' ? parseFloat(reserva.monto_total || 0) : parseFloat(reserva?.monto_pagado || 0));

  return (
    <div className="ticket-printer-overlay">
      <div className={`ticket-container paper-${paperSize}`} ref={printRef}>
        <div className="ticket-header">
          <h2>{hotelInfo?.nombre_hotel || 'Hotel Boutique'}</h2>
          {hotelInfo?.nit && <p>NIT: {hotelInfo.nit}</p>}
          {hotelInfo?.direccion && <p>{hotelInfo.direccion}</p>}
          {(hotelInfo?.ciudad || hotelInfo?.telefono) && <p>{hotelInfo?.ciudad} {hotelInfo?.telefono ? `- Tel: ${hotelInfo.telefono}` : ''}</p>}
          <div className="divider"></div>
          <p><strong>Fecha:</strong> {dayjs().format('DD/MM/YYYY HH:mm')}</p>
          {reserva && (
            <>
              <p><strong>Habitación:</strong> {reserva.espacio?.numero}</p>
              <p><strong>Huésped:</strong> {reserva.huesped?.nombre_completo}</p>
              {reserva.huesped?.documento && <p><strong>Doc:</strong> {reserva.huesped.documento}</p>}
            </>
          )}
          <div className="divider"></div>
        </div>

        <table className="ticket-items">
          <thead>
            <tr>
              <th>CANT</th>
              <th>DESCRIPCIÓN</th>
              <th style={{ textAlign: 'right' }}>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {reserva && parseFloat(reserva.monto_total || 0) > 0 && (
              <tr>
                <td>1</td>
                <td>Alojamiento</td>
                <td style={{ textAlign: 'right' }}>${parseFloat(reserva.monto_total).toLocaleString()}</td>
              </tr>
            )}
            {items.map((item, idx) => (
              <tr key={idx}>
                <td>{item.cantidad}</td>
                <td>{item.nombre_producto || item.descripcion || item.nombre || item.detalle || 'Item'}</td>
                <td style={{ textAlign: 'right' }}>${parseFloat(item.valor_total).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="divider"></div>

        <div className="ticket-totals">
          <div className="total-row">
            <span>TOTAL:</span>
            <span>${total.toLocaleString()}</span>
          </div>
          <div className="total-row sub">
            <span>PAGADO:</span>
            <span>${pagado.toLocaleString()}</span>
          </div>
          <div className="total-row sub">
            <span>SALDO:</span>
            <span>${Math.max(0, total - pagado).toLocaleString()}</span>
          </div>
        </div>

        <div className="divider"></div>

        <div className="ticket-footer">
          <p>¡Gracias por su visita!</p>
          <p>Impreso por Sistema Hotel Boutique</p>
        </div>
      </div>
    </div>
  );
};
