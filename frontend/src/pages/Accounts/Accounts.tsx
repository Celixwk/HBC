import React, { useState, useEffect } from 'react';
import { Plus, Loader2, ChevronDown, ChevronUp, Pencil, Trash2, Check, X, Printer } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { Receipt } from '../../components/Receipt/Receipt';
import { PersonaReceipt } from '../../components/PersonaReceipt/PersonaReceipt';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import './Accounts.css';
import { apiFetch } from '../../utils/apiFetch';

type TabType = 'espacio' | 'persona' | 'minibar' | 'historial' | 'historialHab';

// ─── Inline add row ───────────────────────────────────────────────────────────
const AddRowForm: React.FC<{
  fields: { name: string; placeholder?: string }[];
  onSave: (values: Record<string, string>) => Promise<void>;
}> = ({ fields, onSave }) => {
  const initial = Object.fromEntries(fields.map(f => [f.name, f.name === 'cantidad' ? '1' : '']));
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try { await onSave(values); setValues(initial); }
    finally { setSaving(false); }
  };

  return (
    <tr className="add-row">
      {fields.map(f => (
        <td key={f.name}>
          <input type="text" value={values[f.name]}
            onChange={e => setValues({ ...values, [f.name]: e.target.value })}
            placeholder={f.placeholder || ''}
            className="row-input" />
        </td>
      ))}
      <td>
        <button className="add-row-btn" onClick={handleSave} disabled={saving}>
          {saving ? '...' : '+ Agregar'}
        </button>
      </td>
    </tr>
  );
};

// ─── Inline edit row ──────────────────────────────────────────────────────────
function EditableRow<T extends { [key: string]: any }>({
  item, fields, idKey, apiPath, onDone
}: {
  item: T;
  fields: { name: string; label: string }[];
  idKey: string;
  apiPath: string;
  onDone: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(fields.map(f => [f.name, String(item[f.name] ?? '')]))
  );
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiFetch(`/cuentas/${apiPath}/${item[idKey]}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      onDone();
      setEditing(false);
    } finally { setSaving(false); }
  };

  const handleChangeStatus = async (estado: string) => {
    if (!window.confirm(`¿Marcar este cargo como ${estado}?`)) return;
    try {
      await apiFetch(`/cuentas/${apiPath}/${item[idKey]}/estado`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado })
      });
      onDone();
    } catch (e) { console.error(e); }
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Eliminar este cargo?')) return;
    await apiFetch(`/cuentas/${apiPath}/${item[idKey]}`, { method: 'DELETE' });
    onDone();
  };

  return editing ? (
    <tr className="editing-row">
      {fields.map(f => (
        <td key={f.name}>
          <input type="text" value={values[f.name]}
            onChange={e => setValues({ ...values, [f.name]: e.target.value })}
            className="row-input" />
        </td>
      ))}
      <td>
        <div className="row-actions">
          <button className="icon-action save" onClick={handleSave} disabled={saving} title="Guardar"><Check size={15} /></button>
          <button className="icon-action cancel" onClick={() => setEditing(false)} title="Cancelar"><X size={15} /></button>
        </div>
      </td>
    </tr>
  ) : (
    <tr>
      {fields.map(f => (
        <td key={f.name} className={f.name.includes('total') ? 'font-bold text-gradient' : f.name === 'fecha_registro' || f.name === 'fecha_vencimiento' ? 'text-muted text-sm' : ''}>
          {f.name === 'fecha_registro' || f.name === 'fecha_vencimiento'
            ? item[f.name] ? format(new Date(item[f.name]), "d MMM yyyy", { locale: es }) : 'Sin venc.'
            : f.name.includes('valor') || f.name.includes('precio')
              ? `$${parseFloat(item[f.name] || 0).toLocaleString()}`
              : item[f.name]}
        </td>
      ))}
      {apiPath !== 'minibar' && (
        <td>
          <span className={`status-badge status-${item.estado?.toLowerCase() || 'pendiente'}`}>
            {item.estado || 'Pendiente'}
          </span>
        </td>
      )}
      <td>
        <div className="row-actions">
          <button className="icon-action edit" onClick={() => setEditing(true)} title="Editar"><Pencil size={14} /></button>
          
          {apiPath !== 'minibar' ? (
            <>
              {item.estado !== 'pagado' && (
                <button className="icon-action save" style={{ color: '#10b981' }} onClick={() => handleChangeStatus('pagado')} title="Marcar Pagado"><Check size={14} /></button>
              )}
              {item.estado !== 'anulado' && (
                <button className="icon-action cancel" style={{ color: '#ef4444' }} onClick={() => handleChangeStatus('anulado')} title="Anular"><X size={14} /></button>
              )}
            </>
          ) : (
            <button className="icon-action del" onClick={handleDelete} title="Eliminar"><Trash2 size={14} /></button>
          )}
        </div>
      </td>
    </tr>
  );
}

// ─── Cargos a Habitación ──────────────────────────────────────────────────────
const CargosEspacio: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [reservas, setReservas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({});
  
  // Receipt State
  const [receiptData, setReceiptData] = useState<{ reserva: any, items: any[] } | null>(null);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const [resItems, resReservas] = await Promise.all([
        apiFetch('/cuentas/espacio'),
        apiFetch('/reservas')
      ]);
      if (resItems.ok) setItems(await resItems.json());
      if (resReservas.ok) {
        const all = await resReservas.json();
        setReservas(all.filter((r: any) => ['activa', 'confirmada'].includes(r.estado_reserva)));
      }
    } finally { setLoading(false); }
  };

  const handleBulkStatus = async (e: React.MouseEvent, itemsToUpdate: any[], estado: string, reserva: any) => {
    e.stopPropagation();
    const actionName = estado === 'pagado' ? 'Pagados' : 'Anulados';
    if (!window.confirm(`¿Marcar todos los cargos pendientes como ${actionName}?`)) return;
    
    let metodoPago = undefined;
    if (estado === 'pagado') {
      const input = window.prompt("¿Método de pago? (Ej: Efectivo, Tarjeta, Transferencia)", "Efectivo");
      if (input === null) return; // Cancelado
      metodoPago = input || 'Efectivo';
    }

    setLoading(true);
    try {
      // 1. Update items
      const pending = itemsToUpdate.filter(i => i.estado === 'pendiente' || !i.estado);
      for (const item of pending) {
        await apiFetch(`/cuentas/espacio/${item.id_item}/estado`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ estado })
        });
      }
      
      // 2. Update room cost if it's pending
      if (reserva.estado_pago !== 'pagado' && reserva.estado_pago !== 'anulado') {
        let montoPagado = undefined;
        if (estado === 'pagado') {
          montoPagado = parseFloat(reserva.monto_total || '0');
        } else if (estado === 'anulado') {
          montoPagado = 0;
        }
        await apiFetch(`/reservas/${reserva.id_reserva}/pago`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ estado_pago: estado, metodo_pago: metodoPago, monto_pagado: montoPagado })
        });
      }

      await fetchItems();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleRoomStatus = async (idReserva: number, estado: string, montoTotal: number = 0) => {
    if (!window.confirm(`¿Marcar el alojamiento como ${estado}?`)) return;

    let metodoPago = undefined;
    let montoPagado = undefined;
    if (estado === 'pagado') {
      const input = window.prompt("¿Método de pago? (Ej: Efectivo, Tarjeta, Transferencia)", "Efectivo");
      if (input === null) return; // Cancelado
      metodoPago = input || 'Efectivo';
      montoPagado = montoTotal;
    } else if (estado === 'anulado') {
      montoPagado = 0;
    }

    setLoading(true);
    try {
      await apiFetch(`/reservas/${idReserva}/pago`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado_pago: estado, metodo_pago: metodoPago, monto_pagado: montoPagado })
      });
      await fetchItems();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const addCargo = async (idReserva: number, values: Record<string, string>) => {
    await apiFetch('/cuentas/espacio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_reserva: idReserva, nombre_producto: values.nombre_producto, cantidad: values.cantidad, valor_unitario: values.valor_unitario })
    });
    await fetchItems();
  };

  const handleFinalizar = async (e: React.MouseEvent, idReserva: number) => {
    e.stopPropagation();
    if (!window.confirm('¿Confirmas finalizar esta estadía? La reserva desaparecerá de las cuentas activas.')) return;
    
    setLoading(true);
    try {
      await apiFetch(`/reservas/${idReserva}/estado`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado_reserva: 'completada' })
      });
      await fetchItems();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const grouped: Record<number, { reserva: any; items: any[] }> = {};
  reservas.forEach(r => { grouped[r.id_reserva] = { reserva: r, items: [] }; });
  items.forEach(item => {
    if (grouped[item.id_reserva]) grouped[item.id_reserva].items.push(item);
    else grouped[item.id_reserva] = { reserva: item.reserva, items: [item] };
  });

  const entries = Object.values(grouped).filter(g => g.reserva);

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-primary" size={36} /></div>;

  return (
    <div className="grouped-sections">
      {entries.map(({ reserva, items: roomItems }) => {
        const isCollapsed = collapsed[reserva.id_reserva];
        const roomPrice = parseFloat(reserva.monto_total || 0);
        const roomPendiente = (reserva.estado_pago !== 'pagado' && reserva.estado_pago !== 'anulado') ? roomPrice : 0;
        const roomPagado = reserva.estado_pago === 'pagado' ? roomPrice : 0;

        const totalPendiente = roomItems.filter(i => i.estado !== 'pagado' && i.estado !== 'anulado').reduce((acc, i) => acc + parseFloat(i.valor_total || 0), 0) + roomPendiente;
        const totalPagado = roomItems.filter(i => i.estado === 'pagado').reduce((acc, i) => acc + parseFloat(i.valor_total || 0), 0) + roomPagado;
        
        // El count ahora incluye el cargo de la habitación implícito
        const totalCargosCount = roomItems.length + (roomPrice > 0 ? 1 : 0);

        return (
          <div key={reserva.id_reserva} className="room-section glass-panel">
            <div className="room-section-header" onClick={() => setCollapsed(c => ({ ...c, [reserva.id_reserva]: !c[reserva.id_reserva] }))}>
              <div className="room-section-title">
                <span className="room-badge">Hab. {reserva.espacio?.numero}</span>
                <span className="font-medium">{reserva.huesped?.nombre_completo}</span>
              </div>
              <div className="room-section-meta flex items-center gap-4">
                {totalPendiente > 0 && (
                  <div style={{ textAlign: 'right' }}>
                    <span className="total-chip">${totalPendiente.toLocaleString()} <span style={{ fontSize: '11px', opacity: 0.7 }}>pendiente</span></span>
                    {totalPagado > 0 && <div style={{ fontSize: '11px', color: '#10b981', marginTop: '2px' }}>✓ ${totalPagado.toLocaleString()} pagado</div>}
                  </div>
                )}
                {totalPendiente === 0 && totalPagado > 0 && (
                  <span style={{ color: '#10b981', fontSize: '13px', fontWeight: 600 }}>✓ Todo pagado (${totalPagado.toLocaleString()})</span>
                )}
                <span className="text-muted text-sm">{totalCargosCount} cargo{totalCargosCount !== 1 ? 's' : ''}</span>
                
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={(e: React.MouseEvent) => handleBulkStatus(e, roomItems, 'pagado', reserva)} style={{ color: '#10b981', borderColor: 'transparent', padding: '4px 8px' }} title="Pagar todo lo pendiente">
                    <Check size={16} /> Todo
                  </Button>
                  <Button variant="ghost" size="sm" onClick={(e: React.MouseEvent) => handleBulkStatus(e, roomItems, 'anulado', reserva)} style={{ color: '#ef4444', borderColor: 'transparent', padding: '4px 8px' }} title="Anular todo lo pendiente">
                    <X size={16} /> Todo
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e: React.MouseEvent) => { e.stopPropagation(); setReceiptData({ reserva, items: roomItems }); }}
                    className="text-info flex items-center gap-1"
                    title="Imprimir Cuenta de Cobro"
                    style={{ padding: '4px 8px' }}
                  >
                    <Printer size={16} /> Imprimir
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e: React.MouseEvent) => handleFinalizar(e, reserva.id_reserva)}
                    style={{ color: 'var(--primary)', borderColor: 'transparent', padding: '4px 8px' }}
                  >
                    Finalizar Hab.
                  </Button>
                </div>
                {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
              </div>
            </div>
            {!isCollapsed && (
              <div className="room-table-wrapper">
                <table className="inner-table">
                  <thead>
                    <tr>
                      <th>Concepto / Producto</th>
                      <th>Cantidad</th>
                      <th>Precio Unit.</th>
                      <th>Total</th>
                      <th>Fecha</th>
                      <th>Estado</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Fila virtual para el Alojamiento */}
                    {parseFloat(reserva.monto_total || 0) > 0 && (
                      <tr>
                        <td className="font-medium">Alojamiento (Hab. {reserva.espacio?.numero})</td>
                        <td>-</td>
                        <td>${parseFloat(reserva.monto_total).toLocaleString()}</td>
                        <td className="font-bold text-gradient">${parseFloat(reserva.monto_total).toLocaleString()}</td>
                        <td className="text-muted text-sm">{format(new Date(reserva.fecha_creacion || reserva.check_in), "d MMM yyyy", { locale: es })}</td>
                        <td>
                          <span className={`status-badge status-${reserva.estado_pago?.toLowerCase() || 'pendiente'}`}>
                            {reserva.estado_pago || 'Pendiente'}
                          </span>
                        </td>
                        <td>
                          <div className="row-actions">
                            {reserva.estado_pago !== 'pagado' && (
                              <button className="icon-action save" style={{ color: '#10b981' }} onClick={() => handleRoomStatus(reserva.id_reserva, 'pagado', parseFloat(reserva.monto_total || '0'))} title="Marcar Alojamiento como Pagado"><Check size={14} /></button>
                            )}
                            {reserva.estado_pago !== 'anulado' && (
                              <button className="icon-action cancel" style={{ color: '#ef4444' }} onClick={() => handleRoomStatus(reserva.id_reserva, 'anulado')} title="Anular Alojamiento"><X size={14} /></button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}

                    {/* Consumos */}
                    {roomItems.map((item: any) => (
                      <EditableRow key={item.id_item} item={item} idKey="id_item" apiPath="espacio" onDone={fetchItems}
                        fields={[
                          { name: 'nombre_producto', label: 'Concepto' },
                          { name: 'cantidad', label: 'Cant.' },
                          { name: 'valor_unitario', label: 'Precio' },
                          { name: 'valor_total', label: 'Total' },
                          { name: 'fecha_registro', label: 'Fecha' },
                        ]} />
                    ))}
                    <AddRowForm
                      fields={[
                        { name: 'nombre_producto', placeholder: 'Concepto / Producto' },
                        { name: 'cantidad', placeholder: 'Cant.' },
                        { name: 'valor_unitario', placeholder: 'Precio unitario' },
                      ]}
                      onSave={vals => addCargo(reserva.id_reserva, vals)}
                    />
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
      {entries.length === 0 && <p className="text-muted text-center p-8">No hay reservas. Crea una reserva primero.</p>}

      {/* Modal de Impresión */}
      {receiptData && (
        <Receipt 
          isOpen={true} 
          onClose={() => setReceiptData(null)} 
          reserva={receiptData.reserva} 
          items={receiptData.items} 
        />
      )}
    </div>
  );
};

// ─── Cargos a Persona ─────────────────────────────────────────────────────────
const CargosPersona: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [newPersona, setNewPersona] = useState('');
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [receiptPersona, setReceiptPersona] = useState<{ nombre: string; items: any[] } | null>(null);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/cuentas/persona');
      if (res.ok) setItems(await res.json());
    } finally { setLoading(false); }
  };

  const handleBulkStatus = async (e: React.MouseEvent, itemsToUpdate: any[], estado: string) => {
    e.stopPropagation();
    const actionName = estado === 'pagado' ? 'Pagados' : 'Anulados';
    if (!window.confirm(`¿Marcar todos los cargos pendientes como ${actionName}?`)) return;
    
    setLoading(true);
    try {
      const pending = itemsToUpdate.filter(i => i.estado === 'pendiente' || !i.estado);
      for (const item of pending) {
        await apiFetch(`/cuentas/persona/${item.id_item_persona}/estado`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ estado })
        });
      }
      await fetchItems();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const addCargo = async (nombre: string, values: Record<string, string>) => {
    await apiFetch('/cuentas/persona', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre_persona: nombre, descripcion: values.descripcion, cantidad: values.cantidad, valor_unitario: values.valor_unitario })
    });
    await fetchItems();
  };

  const grouped: Record<string, any[]> = {};
  items.forEach(item => {
    if (!grouped[item.nombre_persona]) grouped[item.nombre_persona] = [];
    grouped[item.nombre_persona].push(item);
  });

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-primary" size={36} /></div>;

  return (
    <div className="grouped-sections">
      <div className="tab-header">
        <span className="text-muted">{Object.keys(grouped).length} persona(s) con cargos</span>
        <Button variant="primary" onClick={() => setIsOpen(true)}><Plus size={16} /> Nueva Persona</Button>
      </div>
      {Object.entries(grouped).map(([nombre, personItems]) => {
        const isCollapsed = collapsed[nombre];
        const totalPendiente = personItems.filter(i => i.estado !== 'pagado' && i.estado !== 'anulado').reduce((acc, i) => acc + parseFloat(i.valor_total || 0), 0);
        const totalPagado = personItems.filter(i => i.estado === 'pagado').reduce((acc, i) => acc + parseFloat(i.valor_total || 0), 0);
        return (
          <div key={nombre} className="room-section glass-panel">
            <div className="room-section-header" onClick={() => setCollapsed(c => ({ ...c, [nombre]: !c[nombre] }))}>
              <div className="room-section-title">
                <div className="guest-avatar-sm">{nombre.charAt(0).toUpperCase()}</div>
                <span className="font-medium text-capitalize">{nombre}</span>
              </div>
              <div className="room-section-meta flex items-center gap-4">
                {totalPendiente > 0 && (
                  <div style={{ textAlign: 'right' }}>
                    <span className="total-chip">${totalPendiente.toLocaleString()} <span style={{ fontSize: '11px', opacity: 0.7 }}>pendiente</span></span>
                    {totalPagado > 0 && <div style={{ fontSize: '11px', color: '#10b981', marginTop: '2px' }}>✓ ${totalPagado.toLocaleString()} pagado</div>}
                  </div>
                )}
                {totalPendiente === 0 && totalPagado > 0 && (
                  <span style={{ color: '#10b981', fontSize: '13px', fontWeight: 600 }}>✓ Todo pagado (${totalPagado.toLocaleString()})</span>
                )}
                <span className="text-muted text-sm">{personItems.length} cargo{personItems.length !== 1 ? 's' : ''}</span>
                
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={(e: React.MouseEvent) => handleBulkStatus(e, personItems, 'pagado')} style={{ color: '#10b981', borderColor: 'transparent', padding: '4px 8px' }} title="Pagar todo lo pendiente">
                    <Check size={16} /> Todo
                  </Button>
                  <Button variant="ghost" size="sm" onClick={(e: React.MouseEvent) => handleBulkStatus(e, personItems, 'anulado')} style={{ color: '#ef4444', borderColor: 'transparent', padding: '4px 8px' }} title="Anular todo lo pendiente">
                    <X size={16} /> Todo
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e: React.MouseEvent) => { e.stopPropagation(); setReceiptPersona({ nombre, items: personItems }); }}
                    className="text-info flex items-center gap-1"
                    title="Imprimir Cuenta de Cobro"
                    style={{ padding: '4px 8px' }}
                  >
                    <Printer size={16} /> Imprimir
                  </Button>
                </div>
                {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
              </div>
            </div>
            {!isCollapsed && (
              <div className="room-table-wrapper">
                <table className="inner-table">
                  <thead>
                    <tr><th>Descripción</th><th>Cantidad</th><th>Precio Unit.</th><th>Total</th><th>Fecha</th><th>Estado</th><th></th></tr>
                  </thead>
                  <tbody>
                    {personItems.map((item: any) => (
                      <EditableRow key={item.id_item_persona} item={item} idKey="id_item_persona" apiPath="persona" onDone={fetchItems}
                        fields={[
                          { name: 'descripcion', label: 'Descripción' },
                          { name: 'cantidad', label: 'Cant.' },
                          { name: 'valor_unitario', label: 'Precio' },
                          { name: 'valor_total', label: 'Total' },
                          { name: 'fecha_registro', label: 'Fecha' },
                        ]} />
                    ))}
                    <AddRowForm
                      fields={[
                        { name: 'descripcion', placeholder: 'Descripción / Concepto' },
                        { name: 'cantidad', placeholder: 'Cant.' },
                        { name: 'valor_unitario', placeholder: 'Precio' },
                      ]}
                      onSave={vals => addCargo(nombre, vals)}
                    />
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
      {Object.keys(grouped).length === 0 && <p className="text-muted text-center p-8">No hay cargos. Crea una nueva persona para comenzar.</p>}

      {receiptPersona && (
        <PersonaReceipt
          isOpen={true}
          onClose={() => setReceiptPersona(null)}
          nombre={receiptPersona.nombre}
          items={receiptPersona.items}
        />
      )}

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Nueva Persona">
        <div className="cargo-form">
          <div className="form-group">
            <label>Nombre de la Persona *</label>
            <input type="text" value={newPersona} onChange={e => setNewPersona(e.target.value)} className="form-input" />
          </div>
          <div className="form-actions">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancelar</Button>
            <Button variant="primary" onClick={async () => {
              if (!newPersona.trim()) return;
              await addCargo(newPersona.trim(), { descripcion: '—', cantidad: '0', valor_unitario: '0' });
              setNewPersona(''); setIsOpen(false);
            }}>Crear</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ─── Inventario Minibar ───────────────────────────────────────────────────────
const InventarioMinibar: React.FC<{ espacios: any[] }> = ({ espacios }) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({});

  const minibarRooms = espacios.filter(e => e.tiene_minibar);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/cuentas/minibar');
      if (res.ok) setItems(await res.json());
    } finally { setLoading(false); }
  };

  const addItem = async (idEspacio: number, values: Record<string, string>) => {
    await apiFetch('/cuentas/minibar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_espacio: idEspacio, nombre_producto: values.nombre_producto, cantidad: values.cantidad, precio_unitario: values.precio_unitario, fecha_vencimiento: values.fecha_vencimiento || null })
    });
    await fetchItems();
  };

  const grouped: Record<number, { espacio: any; items: any[] }> = {};
  minibarRooms.forEach(e => { grouped[e.id_espacio] = { espacio: e, items: [] }; });
  items.forEach(item => { if (grouped[item.id_espacio]) grouped[item.id_espacio].items.push(item); });

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-primary" size={36} /></div>;

  return (
    <div className="grouped-sections">
      {Object.values(grouped).map(({ espacio, items: roomItems }) => {
        const isCollapsed = collapsed[espacio.id_espacio];
        return (
          <div key={espacio.id_espacio} className="room-section glass-panel">
            <div className="room-section-header" onClick={() => setCollapsed(c => ({ ...c, [espacio.id_espacio]: !c[espacio.id_espacio] }))}>
              <div className="room-section-title">
                <span className="room-badge">Hab. {espacio.numero}</span>
                <span className="text-muted text-capitalize">{espacio.tipo_habitacion}</span>
              </div>
              <div className="room-section-meta">
                <span className="text-muted text-sm">{roomItems.length} producto{roomItems.length !== 1 ? 's' : ''}</span>
                {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
              </div>
            </div>
            {!isCollapsed && (
              <div className="room-table-wrapper">
                <table className="inner-table">
                  <thead>
                    <tr><th>Producto</th><th>Cantidad</th><th>Precio Unit.</th><th>Vencimiento</th><th></th></tr>
                  </thead>
                  <tbody>
                    {roomItems.map((item: any) => (
                      <EditableRow key={item.id_inventario} item={item} idKey="id_inventario" apiPath="minibar" onDone={fetchItems}
                        fields={[
                          { name: 'nombre_producto', label: 'Producto' },
                          { name: 'cantidad', label: 'Cant.' },
                          { name: 'precio_unitario', label: 'Precio' },
                          { name: 'fecha_vencimiento', label: 'Vencimiento' },
                        ]} />
                    ))}
                    <AddRowForm
                      fields={[
                        { name: 'nombre_producto', placeholder: 'Nombre del producto' },
                        { name: 'cantidad', placeholder: 'Cant.' },
                        { name: 'precio_unitario', placeholder: 'Precio' },
                        { name: 'fecha_vencimiento', placeholder: 'YYYY-MM-DD' },
                      ]}
                      onSave={vals => addItem(espacio.id_espacio, vals)}
                    />
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
      {minibarRooms.length === 0 && <p className="text-muted text-center p-8">No hay habitaciones con minibar registradas.</p>}
    </div>
  );
};

// ─── Historial de Cargos por Persona ──────────────────────────────────────
const HistorialPersonas: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    apiFetch('/cuentas/historial/personas')
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then(data => { setItems(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-primary" size={36} /></div>;
  if (error) return <div className="text-center p-8 text-muted">Error al cargar el historial de personas.</div>;

  const estadoColor: Record<string, string> = { pagado: '#10b981', anulado: '#ef4444', pendiente: '#f59e0b' };

  return (
    <div className="grouped-sections">
      {items.map((persona: any) => {
        const isCollapsed = collapsed[persona.nombre];
        return (
          <div key={persona.nombre} className="room-section glass-panel">
            <div className="room-section-header" onClick={() => setCollapsed(c => ({ ...c, [persona.nombre]: !c[persona.nombre] }))}>
              <div className="room-section-title">
                <div className="guest-avatar-sm">{persona.nombre.charAt(0).toUpperCase()}</div>
                <span className="font-medium">{persona.nombre}</span>
              </div>
              <div className="room-section-meta flex items-center gap-4">
                {persona.total_pendiente > 0 && (
                  <div style={{ textAlign: 'right' }}>
                    <span className="total-chip">${persona.total_pendiente.toLocaleString()} <span style={{ fontSize: '11px', opacity: 0.7 }}>pendiente</span></span>
                    {persona.total_pagado > 0 && <div style={{ fontSize: '11px', color: '#10b981', marginTop: '2px' }}>✓ ${persona.total_pagado.toLocaleString()} pagado</div>}
                  </div>
                )}
                {persona.total_pendiente === 0 && persona.total_pagado > 0 && (
                  <span style={{ color: '#10b981', fontSize: '13px', fontWeight: 600 }}>✓ Todo pagado (${persona.total_pagado.toLocaleString()})</span>
                )}
                <span className="text-muted text-sm">{persona.cargos.length} cargo{persona.cargos.length !== 1 ? 's' : ''}</span>
                {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
              </div>
            </div>

            {!isCollapsed && (
              <div style={{ padding: '0 20px 16px' }}>
                <table className="inner-table">
                  <thead>
                    <tr><th>Fecha</th><th>Descripción</th><th>Cant.</th><th>Precio</th><th>Total</th><th>Hab.</th><th>Estado</th></tr>
                  </thead>
                  <tbody>
                    {persona.cargos.map((c: any) => (
                      <tr key={c.id} style={{ opacity: c.estado === 'anulado' ? 0.5 : 1, textDecoration: c.estado === 'anulado' ? 'line-through' : 'none' }}>
                        <td className="text-muted" style={{ fontSize: '12px' }}>{format(new Date(c.fecha_registro), 'd MMM yyyy', { locale: es })}</td>
                        <td>{c.descripcion}</td>
                        <td>{c.cantidad}</td>
                        <td className="text-muted" style={{ fontSize: '12px' }}>${c.valor_unitario.toLocaleString()}</td>
                        <td className="font-bold" style={{ color: 'var(--primary)' }}>${c.valor_total.toLocaleString()}</td>
                        <td className="text-muted" style={{ fontSize: '12px' }}>
                          {c.referencia_hab !== 'Externo' ? `Hab. ${c.referencia_hab}` : 'Externo'}
                        </td>
                        <td>
                          <span style={{
                            display: 'inline-block', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 600,
                            background: `${estadoColor[c.estado] || '#f59e0b'}22`,
                            color: estadoColor[c.estado] || '#f59e0b',
                          }}>{c.estado}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '8px', borderTop: '1px solid var(--border-light)', marginTop: '8px' }}>
                  <div style={{ textAlign: 'right', fontSize: '13px' }}>
                    <span className="text-muted">Total General: </span>
                    <span className="font-bold" style={{ color: 'var(--primary)', fontSize: '16px' }}>
                      ${(persona.total_pendiente + persona.total_pagado).toLocaleString()}
                    </span>
                    {persona.total_anulado > 0 && (
                      <div className="text-muted" style={{ fontSize: '11px' }}>({persona.total_anulado.toLocaleString()} anulado, no incluido)</div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
      {items.length === 0 && <p className="text-muted text-center p-8">No hay historial de cargos por persona.</p>}
    </div>
  );
};

// ─── Historial por Habitación ─────────────────────────────────────────
const HistorialHabitaciones: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({});

  useEffect(() => {
    apiFetch('/cuentas/historial/habitaciones')
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then(data => { setItems(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-primary" size={36} /></div>;
  if (error) return <div className="text-center p-8 text-muted">Error al cargar el historial de habitaciones.</div>;

  const estadoReservaColor: Record<string, string> = {
    activa: '#10b981',
    confirmada: '#3b82f6',
    completada: '#8b5cf6',
    cancelada: '#ef4444'
  };

  return (
    <div className="grouped-sections">
      {items.map((r: any) => {
        const isCollapsed = collapsed[r.id_reserva];
        const hayExtras = r.extras && r.extras.length > 0;
        return (
          <div key={r.id_reserva} className="room-section glass-panel">
            <div className="room-section-header" onClick={() => setCollapsed(c => ({ ...c, [r.id_reserva]: !c[r.id_reserva] }))}>
              <div className="room-section-title">
                <span className="room-badge">Hab. {r.numero_habitacion}</span>
                <div>
                  <span className="font-medium">{r.huesped}</span>
                  <div className="text-muted" style={{ fontSize: '12px' }}>
                    {r.tipo_ocupacion}
                    {' • '}
                    {format(new Date(r.check_in), 'd MMM', { locale: es })} → {format(new Date(r.check_out), 'd MMM yyyy', { locale: es })}
                  </div>
                </div>
              </div>
              <div className="room-section-meta flex items-center gap-4">
                <div style={{ textAlign: 'right' }}>
                  <div className="font-bold" style={{ color: 'var(--primary)', fontSize: '15px' }}>
                    ${r.total_general.toLocaleString()}
                  </div>
                  {hayExtras && (
                    <div className="text-muted" style={{ fontSize: '11px' }}>
                      Hab: ${r.monto_habitacion.toLocaleString()} + Extras: ${r.total_extras.toLocaleString()}
                    </div>
                  )}
                </div>
                <span style={{
                  display: 'inline-block',
                  padding: '2px 10px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: `${estadoReservaColor[r.estado_reserva] || '#888'}22`,
                  color: estadoReservaColor[r.estado_reserva] || '#888',
                  border: `1px solid ${estadoReservaColor[r.estado_reserva] || '#888'}55`,
                }}>
                  {r.estado_reserva}
                </span>
                {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
              </div>
            </div>

            {!isCollapsed && (
              <div style={{ padding: '0 20px 16px' }}>
                {/* Info de la reserva */}
                <div style={{ display: 'flex', gap: '24px', marginBottom: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
                  <div><div className="text-muted" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tipo</div><div style={{ fontSize: '14px' }}>{r.tipo_habitacion}</div></div>
                  <div><div className="text-muted" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ocupación</div><div style={{ fontSize: '14px' }}>{r.tipo_ocupacion}</div></div>
                  <div><div className="text-muted" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Adultos</div><div style={{ fontSize: '14px' }}>{r.cantidad_adultos}</div></div>
                  <div><div className="text-muted" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Niños</div><div style={{ fontSize: '14px' }}>{r.cantidad_ninos}</div></div>
                  <div><div className="text-muted" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Alojamiento</div><div className="font-bold" style={{ fontSize: '14px', color: 'var(--primary)' }}>${r.monto_habitacion.toLocaleString()}</div></div>
                </div>

                {/* Extras */}
                {hayExtras && (
                  <>
                    <div className="text-muted" style={{ fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Consumos / Extras</div>
                    <table className="inner-table" style={{ marginBottom: '12px' }}>
                      <thead>
                        <tr><th>Concepto</th><th>Cant.</th><th>Total</th><th>Estado</th></tr>
                      </thead>
                      <tbody>
                        {r.extras.map((e: any) => (
                          <tr key={e.id} style={{ opacity: e.estado === 'anulado' ? 0.5 : 1, textDecoration: e.estado === 'anulado' ? 'line-through' : 'none' }}>
                            <td>{e.nombre}</td>
                            <td>{e.cantidad}</td>
                            <td className="font-bold" style={{ color: 'var(--primary)' }}>${e.valor_total.toLocaleString()}</td>
                            <td>
                              <span style={{
                                display: 'inline-block', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 600,
                                background: e.estado === 'pagado' ? '#10b98122' : e.estado === 'anulado' ? '#ef444422' : '#f59e0b22',
                                color: e.estado === 'pagado' ? '#10b981' : e.estado === 'anulado' ? '#ef4444' : '#f59e0b',
                              }}>{e.estado}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}

                {/* Total final */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '8px', borderTop: '1px solid var(--border-light)' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div className="text-muted" style={{ fontSize: '12px' }}>Total General (Alojamiento + Extras)</div>
                    <div className="font-bold" style={{ fontSize: '20px', color: 'var(--primary)' }}>${r.total_general.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
      {items.length === 0 && <p className="text-muted text-center p-8">No hay historial de habitaciones registrado.</p>}
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export const Accounts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('espacio');
  const [espacios, setEspacios] = useState<any[]>([]);

  useEffect(() => {
    apiFetch('/espacios').then(r => r.json()).then(esp => setEspacios(esp));
  }, []);

  return (
    <div className="accounts-container">
      <div className="accounts-header">
        <div>
          <h1 className="page-title">Cuentas</h1>
          <p className="page-subtitle">Gestiona cargos a habitaciones, huéspedes e inventario minibar</p>
        </div>
      </div>
      <div className="tabs-row glass-panel">
        {([
          ['espacio', 'Cargos Habitación'],
          ['persona', 'Cargos Persona'],
          ['minibar', 'Inventario Minibar'],
          ['historial', 'Historial Personas'],
          ['historialHab', 'Historial Habitaciones']
        ] as [TabType, string][]).map(([tab, label]) => (
          <button key={tab} className={`tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>{label}</button>
        ))}
      </div>
      {activeTab === 'espacio' && <CargosEspacio />}
      {activeTab === 'persona' && <CargosPersona />}
      {activeTab === 'minibar' && <InventarioMinibar espacios={espacios} />}
      {activeTab === 'historial' && <HistorialPersonas />}
      {activeTab === 'historialHab' && <HistorialHabitaciones />}
    </div>
  );
};
