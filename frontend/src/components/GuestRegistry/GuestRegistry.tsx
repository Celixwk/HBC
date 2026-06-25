import React, { useRef } from 'react';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import { Printer } from 'lucide-react';
import { fmtLocalDate } from '../../utils/dateUtils';
import './GuestRegistry.css';

interface ReservaRow {
  fecha_creacion: string;
  check_in: string;
  check_out: string;
  estado_reserva: string;
  id_reserva: number;
  firma: string | null;
  espacio?: { numero: string | null } | null;
}

interface GuestRow {
  id_huesped: number;
  nombre_completo: string;
  documento: string;
  tipo_documento: string;
  telefono: string;
  procedencia: string;
  _reserva: ReservaRow | null;
}

interface GuestRegistryProps {
  isOpen: boolean;
  onClose: () => void;
  rows: GuestRow[];
}

export const GuestRegistry: React.FC<GuestRegistryProps> = ({ isOpen, onClose, rows }) => {
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

  const today = new Date().toLocaleDateString('es-CO');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Registro de Huéspedes" className="registry-modal">
      <div className="registry-container" ref={contentRef}>
        <div className="registry-header">
          <div className="registry-header-left">
            <h2 className="registry-title">Registro de Huéspedes</h2>
            <p className="registry-hotel-name">Hotel Boutique</p>
          </div>
          <div className="registry-header-right">
            <p><strong>Fecha:</strong> {today}</p>
            <p><strong>Total registros:</strong> {rows.length}</p>
          </div>
        </div>

        <table className="registry-table">
          <thead>
            <tr>
              <th className="col-num">#</th>
              <th className="col-name">Nombre</th>
              <th className="col-tdoc">Tipo Doc.</th>
              <th className="col-doc">Documento</th>
              <th className="col-proc">Procedencia</th>
              <th className="col-tel">Teléfono</th>
              <th className="col-hab">Hab.</th>
              <th className="col-ci">Check-In</th>
              <th className="col-co">Check-Out</th>
              <th className="col-firma">Firma</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
              const res = row._reserva;
              return (
                <tr key={`${row.id_huesped}-${res?.id_reserva ?? idx}`}>
                  <td className="col-num">{idx + 1}</td>
                  <td className="col-name">{row.nombre_completo}</td>
                  <td className="col-tdoc">{row.tipo_documento}</td>
                  <td className="col-doc">{row.documento}</td>
                  <td className="col-proc">{row.procedencia || '—'}</td>
                  <td className="col-tel">{row.telefono || '—'}</td>
                  <td className="col-hab" style={{ textAlign: 'center' }}>
                    {res?.espacio?.numero ?? '—'}
                  </td>
                  <td className="col-ci">{res ? fmtLocalDate(res.check_in) : '—'}</td>
                  <td className="col-co">{res ? fmtLocalDate(res.check_out) : '—'}</td>
                  <td className="col-firma">
                    {res?.firma
                      ? <img src={res.firma} alt="firma" className="registry-firma-img" />
                      : <span className="registry-sin-firma">Sin firma</span>}
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={10} style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                  No hay registros.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="registry-footer">
          <p>Hotel Boutique — Registro generado el {today}</p>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>Cerrar</Button>
        <Button onClick={handlePrint} className="flex items-center gap-2">
          <Printer size={18} /> Imprimir Registro
        </Button>
      </div>
    </Modal>
  );
};
