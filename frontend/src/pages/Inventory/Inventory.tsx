import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Loader2, Edit2, ArrowDownCircle, ArrowUpCircle, AlertTriangle, Tags, Trash2 } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { apiFetch } from '../../utils/apiFetch';
import './Inventory.css';

type TabType = 'productos' | 'movimientos' | 'entrada';

const MOTIVOS_SALIDA = ['ajuste', 'merma', 'devolucion', 'consumo_habitacion', 'consumo_persona'];

const EMPTY_PROD = { nombre: '', descripcion: '', categoria: '', unidad_medida: 'unidad',
  precio_costo: '', precio_venta: '', stock_actual: '', stock_minimo: '', id_proveedor: '' };

export const Inventory: React.FC = () => {
  const [tab, setTab] = useState<TabType>('productos');
  const [productos, setProductos] = useState<any[]>([]);
  const [movimientos, setMovimientos] = useState<any[]>([]);
  const [proveedores, setProveedores] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<{ id_categoria: number; nombre: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [catFilter, setCatFilter] = useState('');
  const [stockBajoOnly, setStockBajoOnly] = useState(false);

  // Categorías modal
  const [catModal, setCatModal] = useState(false);
  const [newCatNombre, setNewCatNombre] = useState('');
  const [savingCat, setSavingCat] = useState(false);

  // Producto modal
  const [prodModal, setProdModal] = useState(false);
  const [editingProd, setEditingProd] = useState<any>(null);
  const [prodForm, setProdForm] = useState({ ...EMPTY_PROD });
  const [savingProd, setSavingProd] = useState(false);

  // Movimientos filtros
  const [movTipo, setMovTipo] = useState('');
  const [movFechaDesde, setMovFechaDesde] = useState('');
  const [movFechaHasta, setMovFechaHasta] = useState('');

  // Entrada rápida
  const [entradaForm, setEntradaForm] = useState({ id_producto: '', cantidad: '', precio_unitario: '', notas: '' });
  const [savingEntrada, setSavingEntrada] = useState(false);

  // Salida manual modal
  const [salidaModal, setSalidaModal] = useState(false);
  const [salidaForm, setSalidaForm] = useState({ id_producto: '', cantidad: '', motivo: 'ajuste', notas: '' });
  const [savingSalida, setSavingSalida] = useState(false);

  const fetchCategorias = useCallback(async () => {
    const res = await apiFetch('/inventario/categorias');
    if (res.ok) {
      const data = await res.json();
      setCategorias(data);
      setProdForm(f => ({ ...f, categoria: f.categoria || (data[0]?.nombre ?? '') }));
    }
  }, []);

  useEffect(() => {
    apiFetch('/proveedores').then(r => r.json()).then(d => setProveedores(Array.isArray(d) ? d.filter((p: any) => p.activo) : []));
    fetchCategorias();
  }, [fetchCategorias]);

  const addCategoria = async () => {
    if (!newCatNombre.trim()) return;
    setSavingCat(true);
    try {
      const res = await apiFetch('/inventario/categorias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: newCatNombre.trim() })
      });
      if (!res.ok) throw new Error();
      setNewCatNombre('');
      fetchCategorias();
    } catch { alert('Error al crear categoría'); }
    finally { setSavingCat(false); }
  };

  const removeCategoria = async (id: number, nombre: string) => {
    if (!window.confirm(`¿Eliminar la categoría "${nombre}"? Los productos ya asignados la conservarán.`)) return;
    await apiFetch(`/inventario/categorias/${id}`, { method: 'DELETE' });
    fetchCategorias();
  };

  const fetchProductos = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (catFilter) params.set('categoria', catFilter);
      const res = await apiFetch(`/inventario/productos${params.toString() ? '?' + params : ''}`);
      if (res.ok) setProductos(await res.json());
    } finally { setLoading(false); }
  }, [catFilter]);

  const fetchMovimientos = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (movTipo) params.set('tipo', movTipo);
      if (movFechaDesde) params.set('fecha_desde', movFechaDesde);
      if (movFechaHasta) params.set('fecha_hasta', movFechaHasta);
      const res = await apiFetch(`/inventario/movimientos${params.toString() ? '?' + params : ''}`);
      if (res.ok) setMovimientos(await res.json());
    } finally { setLoading(false); }
  }, [movTipo, movFechaDesde, movFechaHasta]);

  useEffect(() => { if (tab === 'productos' || tab === 'entrada') fetchProductos(); }, [tab, fetchProductos]);
  useEffect(() => { if (tab === 'movimientos') fetchMovimientos(); }, [tab, fetchMovimientos]);

  // ── Producto CRUD ────────────────────────────────────────────
  const openNewProd = () => { setEditingProd(null); setProdForm({ ...EMPTY_PROD }); setProdModal(true); };
  const openEditProd = (p: any) => {
    setEditingProd(p);
    setProdForm({ nombre: p.nombre, descripcion: p.descripcion || '', categoria: p.categoria,
      unidad_medida: p.unidad_medida, precio_costo: String(p.precio_costo),
      precio_venta: String(p.precio_venta), stock_actual: String(p.stock_actual),
      stock_minimo: String(p.stock_minimo), id_proveedor: p.id_proveedor ? String(p.id_proveedor) : '' });
    setProdModal(true);
  };

  const saveProd = async () => {
    if (!prodForm.nombre || !prodForm.categoria) return alert('Nombre y categoría son obligatorios');
    setSavingProd(true);
    try {
      const body = { ...prodForm, id_proveedor: prodForm.id_proveedor || null };
      const res = editingProd
        ? await apiFetch(`/inventario/productos/${editingProd.id_producto}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
        : await apiFetch('/inventario/productos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error();
      setProdModal(false);
      fetchProductos();
    } catch { alert('Error al guardar'); }
    finally { setSavingProd(false); }
  };

  const deleteProd = async (id: number, nombre: string) => {
    if (!window.confirm(`¿Desactivar el producto "${nombre}"?`)) return;
    await apiFetch(`/inventario/productos/${id}`, { method: 'DELETE' });
    fetchProductos();
  };

  // ── Entrada rápida ───────────────────────────────────────────
  const saveEntrada = async () => {
    if (!entradaForm.id_producto || !entradaForm.cantidad) return alert('Selecciona un producto e ingresa la cantidad');
    setSavingEntrada(true);
    try {
      const res = await apiFetch('/inventario/movimientos/entrada', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(entradaForm)
      });
      if (!res.ok) throw new Error();
      setEntradaForm({ id_producto: '', cantidad: '', precio_unitario: '', notas: '' });
      fetchProductos();
      alert('Entrada registrada correctamente');
    } catch { alert('Error al registrar entrada'); }
    finally { setSavingEntrada(false); }
  };

  // ── Salida manual ────────────────────────────────────────────
  const saveSalida = async () => {
    if (!salidaForm.id_producto || !salidaForm.cantidad) return alert('Selecciona un producto e ingresa la cantidad');
    setSavingSalida(true);
    try {
      const res = await apiFetch('/inventario/movimientos/salida', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(salidaForm)
      });
      if (!res.ok) throw new Error();
      setSalidaModal(false);
      setSalidaForm({ id_producto: '', cantidad: '', motivo: 'ajuste', notas: '' });
      fetchProductos();
    } catch { alert('Error al registrar salida'); }
    finally { setSavingSalida(false); }
  };

  const pf = (k: string) => (e: React.ChangeEvent<any>) => setProdForm(v => ({ ...v, [k]: e.target.value }));
  const ef = (k: string) => (e: React.ChangeEvent<any>) => setEntradaForm(v => ({ ...v, [k]: e.target.value }));
  const sf = (k: string) => (e: React.ChangeEvent<any>) => setSalidaForm(v => ({ ...v, [k]: e.target.value }));

  const prodFiltered = productos.filter(p => !stockBajoOnly || p.stock_bajo);
  const stockBajoCount = productos.filter(p => p.stock_bajo).length;
  const fmt = (n: any) => '$' + Number(n).toLocaleString('es-CO');

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <div>
          <h1 className="page-title">Inventario</h1>
          <p className="page-subtitle">
            {productos.length} productos
            {stockBajoCount > 0 && (
              <span style={{ marginLeft: '10px', color: '#ef4444', fontWeight: 600, fontSize: '0.8rem' }}>
                <AlertTriangle size={13} style={{ display: 'inline', marginRight: '3px' }} />
                {stockBajoCount} con stock bajo
              </span>
            )}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="ghost" size="sm" onClick={() => setCatModal(true)} style={{ color: 'var(--text-muted)', borderColor: 'var(--border-medium)' }}>
            <Tags size={16} /> Categorías
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setSalidaModal(true)} style={{ color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)' }}>
            <ArrowUpCircle size={16} /> Registrar Salida
          </Button>
          <Button variant="primary" onClick={openNewProd}><Plus size={16} /> Nuevo Producto</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-row glass-panel">
        {(['productos', 'movimientos', 'entrada'] as TabType[]).map(t => (
          <button key={t} className={`tab-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t === 'productos' ? 'Productos' : t === 'movimientos' ? 'Movimientos' : 'Entrada Rápida'}
          </button>
        ))}
      </div>

      {/* ─── Tab Productos ─── */}
      {tab === 'productos' && (
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="filters-row">
            <select className="filter-select" value={catFilter} onChange={e => setCatFilter(e.target.value)}>
              <option value="">Todas las categorías</option>
              {categorias.map(c => <option key={c.id_categoria} value={c.nombre}>{c.nombre}</option>)}
            </select>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <input type="checkbox" checked={stockBajoOnly} onChange={e => setStockBajoOnly(e.target.checked)} />
              Solo stock bajo
            </label>
            <span className="text-muted" style={{ fontSize: '0.8rem', marginLeft: 'auto' }}>{prodFiltered.length} producto{prodFiltered.length !== 1 ? 's' : ''}</span>
          </div>

          {loading ? (
            <div className="flex justify-center p-8"><Loader2 className="animate-spin text-primary" size={36} /></div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="inv-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Unidad</th>
                    <th>Proveedor</th>
                    <th>P. Costo</th>
                    <th>P. Venta</th>
                    <th>Stock Actual</th>
                    <th>Mínimo</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {prodFiltered.map((p: any) => (
                    <tr key={p.id_producto} className={p.stock_bajo ? 'stock-low' : 'stock-ok'}>
                      <td style={{ fontWeight: 500 }}>
                        {p.stock_bajo && <AlertTriangle size={13} style={{ color: '#ef4444', marginRight: '5px', display: 'inline' }} />}
                        {p.nombre}
                      </td>
                      <td><span className="cat-badge">{p.categoria}</span></td>
                      <td className="text-muted">{p.unidad_medida}</td>
                      <td className="text-muted" style={{ fontSize: '0.8rem' }}>{p.proveedor?.nombre || '—'}</td>
                      <td>{fmt(p.precio_costo)}</td>
                      <td>{fmt(p.precio_venta)}</td>
                      <td><span className="stock-val">{Number(p.stock_actual)}</span></td>
                      <td className="text-muted">{Number(p.stock_minimo)}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button onClick={() => openEditProd(p)} title="Editar"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '3px' }}>
                            <Edit2 size={14} />
                          </button>
                          <button onClick={() => deleteProd(p.id_producto, p.nombre)} title="Desactivar"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: '3px', opacity: 0.7 }}>
                            ✕
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {prodFiltered.length === 0 && (
                    <tr><td colSpan={9} style={{ textAlign: 'center', padding: '28px', color: 'var(--text-muted)' }}>
                      {catFilter || stockBajoOnly ? 'No hay productos con esos filtros.' : 'Aún no hay productos. Crea el primero.'}
                    </td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ─── Tab Movimientos ─── */}
      {tab === 'movimientos' && (
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="filters-row">
            <select className="filter-select" value={movTipo} onChange={e => setMovTipo(e.target.value)}>
              <option value="">Todos los tipos</option>
              <option value="entrada">Entradas</option>
              <option value="salida">Salidas</option>
            </select>
            <input type="date" className="filter-input" value={movFechaDesde} onChange={e => setMovFechaDesde(e.target.value)} title="Desde" />
            <input type="date" className="filter-input" value={movFechaHasta} onChange={e => setMovFechaHasta(e.target.value)} title="Hasta" />
            <Button variant="ghost" size="sm" onClick={fetchMovimientos}>Aplicar</Button>
            {(movTipo || movFechaDesde || movFechaHasta) && (
              <Button variant="ghost" size="sm" onClick={() => { setMovTipo(''); setMovFechaDesde(''); setMovFechaHasta(''); }}>
                Limpiar
              </Button>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center p-8"><Loader2 className="animate-spin text-primary" size={36} /></div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="inv-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Tipo</th>
                    <th>Motivo</th>
                    <th>Cantidad</th>
                    <th>Stock Antes</th>
                    <th>Stock Después</th>
                    <th>Precio Unit.</th>
                    <th>Notas</th>
                  </tr>
                </thead>
                <tbody>
                  {movimientos.map((m: any) => (
                    <tr key={m.id_movimiento}>
                      <td className="text-muted" style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                        {format(new Date(m.fecha), 'd MMM yyyy HH:mm', { locale: es })}
                      </td>
                      <td style={{ fontWeight: 500 }}>{m.producto?.nombre}</td>
                      <td><span className="cat-badge">{m.producto?.categoria}</span></td>
                      <td>
                        {m.tipo === 'entrada'
                          ? <span className="mov-tipo-entrada"><ArrowDownCircle size={11} style={{ display: 'inline', marginRight: '3px' }} />Entrada</span>
                          : <span className="mov-tipo-salida"><ArrowUpCircle size={11} style={{ display: 'inline', marginRight: '3px' }} />Salida</span>}
                      </td>
                      <td className="text-muted" style={{ fontSize: '0.8rem', textTransform: 'capitalize' }}>{m.motivo.replace(/_/g, ' ')}</td>
                      <td style={{ fontWeight: 600 }}>{Number(m.cantidad)} {m.producto?.unidad_medida}</td>
                      <td className="text-muted">{Number(m.stock_antes)}</td>
                      <td style={{ fontWeight: 600, color: m.tipo === 'entrada' ? '#10b981' : '#f59e0b' }}>{Number(m.stock_despues)}</td>
                      <td>{Number(m.precio_unitario) > 0 ? fmt(m.precio_unitario) : '—'}</td>
                      <td className="text-muted" style={{ fontSize: '0.8rem' }}>{m.notas || '—'}</td>
                    </tr>
                  ))}
                  {movimientos.length === 0 && (
                    <tr><td colSpan={10} style={{ textAlign: 'center', padding: '28px', color: 'var(--text-muted)' }}>
                      No hay movimientos con esos filtros.
                    </td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ─── Tab Entrada Rápida ─── */}
      {tab === 'entrada' && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <p className="text-muted" style={{ marginBottom: '20px', fontSize: '0.875rem' }}>
            Registra una compra o ingreso de mercancía al inventario.
          </p>
          <div className="entrada-form">
            <div className="form-group">
              <label>Producto *</label>
              <select className="form-input" value={entradaForm.id_producto} onChange={ef('id_producto')}>
                <option value="">— Selecciona un producto —</option>
                {productos.map(p => (
                  <option key={p.id_producto} value={p.id_producto}>
                    {p.nombre} ({p.categoria}) — Stock actual: {Number(p.stock_actual)} {p.unidad_medida}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Cantidad *</label>
              <input className="form-input" type="number" min="0.001" step="0.001" value={entradaForm.cantidad} onChange={ef('cantidad')} placeholder="Ej: 12" />
            </div>
            <div className="form-group">
              <label>Precio unitario de compra</label>
              <input className="form-input" type="number" min="0" value={entradaForm.precio_unitario} onChange={ef('precio_unitario')} placeholder="$0" />
            </div>
            <div className="form-group">
              <label>Notas</label>
              <input className="form-input" value={entradaForm.notas} onChange={ef('notas')} placeholder="Ej: Factura #001 — Proveedor X" />
            </div>
            <div className="form-actions">
              <Button variant="primary" onClick={saveEntrada} isLoading={savingEntrada}>
                <ArrowDownCircle size={16} /> Registrar Entrada
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Modal Producto ─── */}
      <Modal isOpen={prodModal} onClose={() => setProdModal(false)} title={editingProd ? 'Editar Producto' : 'Nuevo Producto'}>
        <div className="inv-modal-grid">
          <div className="form-group full">
            <label>Nombre *</label>
            <input className="form-input" value={prodForm.nombre} onChange={pf('nombre')} placeholder="Nombre del producto" />
          </div>
          <div className="form-group">
            <label>Categoría *</label>
            <select className="form-input" value={prodForm.categoria} onChange={pf('categoria')}>
              {categorias.map(c => <option key={c.id_categoria} value={c.nombre}>{c.nombre}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Unidad de medida</label>
            <input className="form-input" value={prodForm.unidad_medida} onChange={pf('unidad_medida')} placeholder="unidad, kg, L, caja..." />
          </div>
          <div className="form-group">
            <label>Precio de costo</label>
            <input className="form-input" type="number" min="0" value={prodForm.precio_costo} onChange={pf('precio_costo')} placeholder="$0" />
          </div>
          <div className="form-group">
            <label>Precio de venta</label>
            <input className="form-input" type="number" min="0" value={prodForm.precio_venta} onChange={pf('precio_venta')} placeholder="$0" />
          </div>
          {!editingProd && (
            <div className="form-group">
              <label>Stock inicial</label>
              <input className="form-input" type="number" min="0" step="0.001" value={prodForm.stock_actual} onChange={pf('stock_actual')} placeholder="0" />
            </div>
          )}
          <div className="form-group">
            <label>Stock mínimo (alerta)</label>
            <input className="form-input" type="number" min="0" step="0.001" value={prodForm.stock_minimo} onChange={pf('stock_minimo')} placeholder="0" />
          </div>
          <div className="form-group full">
            <label>Proveedor</label>
            <select className="form-input" value={prodForm.id_proveedor} onChange={pf('id_proveedor')}>
              <option value="">— Sin proveedor —</option>
              {proveedores.map(p => <option key={p.id_proveedor} value={p.id_proveedor}>{p.nombre}</option>)}
            </select>
          </div>
          <div className="form-group full">
            <label>Descripción</label>
            <input className="form-input" value={prodForm.descripcion} onChange={pf('descripcion')} placeholder="Descripción opcional" />
          </div>
        </div>
        <div className="form-actions" style={{ marginTop: '16px' }}>
          <Button variant="secondary" onClick={() => setProdModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={saveProd} isLoading={savingProd}>
            {editingProd ? 'Guardar cambios' : 'Crear producto'}
          </Button>
        </div>
      </Modal>

      {/* ─── Modal Categorías ─── */}
      <Modal isOpen={catModal} onClose={() => { setCatModal(false); setNewCatNombre(''); }} title="Gestionar Categorías">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '320px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              className="form-input"
              style={{ flex: 1 }}
              value={newCatNombre}
              onChange={e => setNewCatNombre(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addCategoria()}
              placeholder="Nueva categoría..."
            />
            <Button variant="primary" onClick={addCategoria} isLoading={savingCat} style={{ whiteSpace: 'nowrap' }}>
              <Plus size={15} /> Agregar
            </Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '300px', overflowY: 'auto' }}>
            {categorias.map(c => (
              <div key={c.id_categoria} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '8px', background: 'var(--bg-elevated)', border: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: '0.9rem' }}>{c.nombre}</span>
                <button
                  onClick={() => removeCategoria(c.id_categoria, c.nombre)}
                  title="Eliminar categoría"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', opacity: 0.7, padding: '2px 4px', display: 'flex' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            {categorias.length === 0 && <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '12px' }}>Sin categorías.</p>}
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Al eliminar una categoría, los productos que ya la tienen la conservan.
          </p>
        </div>
      </Modal>

      {/* ─── Modal Salida Manual ─── */}
      <Modal isOpen={salidaModal} onClose={() => setSalidaModal(false)} title="Registrar Salida">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="form-group">
            <label>Producto *</label>
            <select className="form-input" value={salidaForm.id_producto} onChange={sf('id_producto')}>
              <option value="">— Selecciona un producto —</option>
              {productos.map(p => (
                <option key={p.id_producto} value={p.id_producto}>
                  {p.nombre} — Stock: {Number(p.stock_actual)} {p.unidad_medida}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Cantidad *</label>
            <input className="form-input" type="number" min="0.001" step="0.001" value={salidaForm.cantidad} onChange={sf('cantidad')} placeholder="0" />
          </div>
          <div className="form-group">
            <label>Motivo</label>
            <select className="form-input" value={salidaForm.motivo} onChange={sf('motivo')}>
              {MOTIVOS_SALIDA.map(m => <option key={m} value={m}>{m.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Notas</label>
            <input className="form-input" value={salidaForm.notas} onChange={sf('notas')} placeholder="Observaciones" />
          </div>
          <div className="form-actions">
            <Button variant="secondary" onClick={() => setSalidaModal(false)}>Cancelar</Button>
            <Button variant="primary" onClick={saveSalida} isLoading={savingSalida}>
              Registrar Salida
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
