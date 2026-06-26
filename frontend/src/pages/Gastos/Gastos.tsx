import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Edit2, Trash2, Loader2, Receipt, AlertCircle, Repeat, Tags, X } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { apiFetch } from '../../utils/apiFetch';
import './Gastos.css';

const fmt = (n: number) => n.toLocaleString('es-CO', { minimumFractionDigits: 0 });
const hoy = () => new Date().toISOString().slice(0, 10);

// Normaliza strings para comparaciones resilientes a problemas de encoding
// (strips diacritics AND non-ASCII replacement chars like U+FFFD)
const normCat = (s: string) => (s || '').replace(/[^\x00-\x7F]/g, '').toLowerCase().trim();

const EMPTY_FORM = {
  categoria: '',
  descripcion: '',
  monto: '',
  fecha: hoy(),
  comprobante: '',
  proveedor_nombre: '',
  es_recurrente: false,
  dia_recurrente: '1',
  notas: ''
};

// Paleta de colores para categorías (se asignan en orden)
const PALETTE = [
  '#3b82f6','#f59e0b','#8b5cf6','#ec4899','#06b6d4','#6b7280',
  '#10b981','#ef4444','#f97316','#84cc16','#14b8a6','#a855f7'
];

const catColor = (nombre: string, categorias: string[]): string => {
  const CAT_FIXED: Record<string, string> = {
    'Servicios Públicos': '#3b82f6',
    'Mantenimiento': '#f59e0b',
    'Nómina': '#8b5cf6',
    'Arriendo': '#ec4899',
    'Marketing': '#06b6d4',
    'Otros': '#6b7280'
  };
  if (CAT_FIXED[nombre]) return CAT_FIXED[nombre];
  const idx = categorias.indexOf(nombre);
  return PALETTE[idx % PALETTE.length];
};

interface CatItem { id: number; nombre: string; }

export const Gastos: React.FC = () => {
  const [gastos, setGastos]       = useState<any[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [catItems, setCatItems]   = useState<CatItem[]>([]);
  const [loading, setLoading]     = useState(true);
  const [generando, setGenerando] = useState(false);
  const [error, setError]         = useState('');
  const [success, setSuccess]     = useState('');

  // Filtros
  const [catFilter, setCatFilter] = useState('');
  const [desde, setDesde] = useState(() =>
    localStorage.getItem('hbc_gastos_desde') || (() => { const d = new Date(); d.setDate(1); return d.toISOString().slice(0, 10); })()
  );
  const [hasta, setHasta] = useState(() =>
    localStorage.getItem('hbc_gastos_hasta') || hoy()
  );

  // Modal gasto
  const [modal, setModal]     = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm]       = useState({ ...EMPTY_FORM });
  const [saving, setSaving]   = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  // Panel categorías
  const [showCats, setShowCats]   = useState(false);
  const [nuevaCat, setNuevaCat]   = useState('');
  const [savingCat, setSavingCat] = useState(false);
  const [deletingCat, setDeletingCat] = useState<number | null>(null);
  const [catError, setCatError]   = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ desde, hasta });
      if (catFilter) params.set('categoria', catFilter);
      const [gRes, cRes] = await Promise.all([
        apiFetch(`/gastos?${params}`),
        apiFetch('/gastos/categorias?full=true')
      ]);
      if (gRes.ok) setGastos(await gRes.json());
      if (cRes.ok) {
        const items: CatItem[] = await cRes.json();
        setCatItems(items);
        setCategorias(items.map(c => c.nombre));
      }
    } catch { setError('Error al cargar gastos'); }
    finally { setLoading(false); }
  }, [desde, hasta, catFilter]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Persistir rango de fechas en localStorage
  useEffect(() => { localStorage.setItem('hbc_gastos_desde', desde); }, [desde]);
  useEffect(() => { localStorage.setItem('hbc_gastos_hasta', hasta); }, [hasta]);

  // ── Gestión de categorías ──────────────────────────────────────────────
  const handleAddCat = async () => {
    if (!nuevaCat.trim()) {
      setCatError('Por favor escribe un nombre para la categoría');
      return;
    }
    setSavingCat(true); setCatError('');
    try {
      const res = await apiFetch('/gastos/categorias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nuevaCat.trim() })
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error); }
      setNuevaCat('');
      showSuccess(`Categoría "${nuevaCat.trim()}" creada`);
      fetchData();
    } catch (e: any) { setCatError(e.message); }
    finally { setSavingCat(false); }
  };

  const handleDeleteCat = async (item: CatItem) => {
    if (!window.confirm(`¿Eliminar la categoría "${item.nombre}"?`)) return;
    setDeletingCat(item.id); setCatError('');
    try {
      const res = await apiFetch(`/gastos/categorias/${item.id}`, { method: 'DELETE' });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error); }
      showSuccess(`Categoría "${item.nombre}" eliminada`);
      fetchData();
    } catch (e: any) { setCatError(e.message); }
    finally { setDeletingCat(null); }
  };

  // ── Gastos CRUD ─────────────────────────────────────────────────────────
  const openNew = () => {
    setEditing(null);
    setForm({ ...EMPTY_FORM, categoria: categorias[0] || '' });
    setModal(true);
  };

  const openEdit = (g: any) => {
    setEditing(g);
    setForm({
      categoria: g.categoria,
      descripcion: g.descripcion,
      monto: String(g.monto),
      fecha: g.fecha.slice(0, 10),
      comprobante: g.comprobante || '',
      proveedor_nombre: g.proveedor_nombre || '',
      es_recurrente: g.es_recurrente,
      dia_recurrente: String(g.dia_recurrente || 1),
      notas: g.notas || ''
    });
    setModal(true);
  };

  const handleSave = async () => {
    if (!form.categoria || !form.descripcion || !form.monto || !form.fecha) {
      setError('Categoría, descripción, monto y fecha son obligatorios'); return;
    }
    setSaving(true); setError('');
    try {
      const body = JSON.stringify({
        ...form,
        monto: parseFloat(form.monto),
        dia_recurrente: form.es_recurrente ? parseInt(form.dia_recurrente) : null
      });
      const res = editing
        ? await apiFetch(`/gastos/${editing.id_gasto}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body })
        : await apiFetch('/gastos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error); }
      setModal(false);
      showSuccess(editing ? 'Gasto actualizado' : 'Gasto registrado');
      fetchData();
    } catch (e: any) { setError(e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (g: any) => {
    if (!window.confirm(`¿Eliminar "${g.descripcion}"?`)) return;
    setDeleting(g.id_gasto);
    try {
      await apiFetch(`/gastos/${g.id_gasto}`, { method: 'DELETE' });
      showSuccess('Gasto eliminado');
      fetchData();
    } finally { setDeleting(null); }
  };

  const generarRecurrentes = async () => {
    setGenerando(true);
    try {
      const res = await apiFetch('/gastos/recurrentes', { method: 'POST' });
      const d = await res.json();
      showSuccess(`${d.generados} gasto(s) recurrente(s) generados para este mes`);
      if (d.generados > 0) fetchData();
    } finally { setGenerando(false); }
  };

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(''), 3500);
  };

  const totalPeriodo = gastos.reduce((s, g) => s + parseFloat(g.monto), 0);

  // Usa normalización para manejar posibles diferencias de encoding en datos existentes
  const resumenCat = categorias.reduce<Record<string, number>>((acc, cat) => {
    const catN = normCat(cat);
    acc[cat] = gastos.filter(g => normCat(g.categoria) === catN).reduce((s, g) => s + parseFloat(g.monto), 0);
    return acc;
  }, {});

  // Devuelve el nombre canónico de una categoría (desde la lista oficial)
  const canonicalCat = (raw: string) =>
    categorias.find(c => normCat(c) === normCat(raw)) || raw;

  return (
    <div className="gastos-container">
      <div className="gastos-header">
        <div>
          <h2 className="page-title">Gastos Operativos</h2>
          <p className="page-subtitle">Servicios, mantenimiento y otros egresos del hotel</p>
        </div>
        <div className="gastos-header-actions">
          <Button variant="ghost" size="sm" onClick={() => { setShowCats(!showCats); setCatError(''); }} title="Gestionar categorías">
            <Tags size={14} /> Categorías
          </Button>
          <Button variant="ghost" size="sm" onClick={generarRecurrentes} disabled={generando}
            title="Genera gastos recurrentes del mes actual que aún no existan">
            {generando ? <Loader2 size={14} className="animate-spin" /> : <Repeat size={14} />}
            Generar recurrentes
          </Button>
          <Button variant="primary" onClick={openNew}>
            <Plus size={15} /> Nuevo Gasto
          </Button>
        </div>
      </div>

      {error && <div className="gastos-alert error"><AlertCircle size={14} />{error}</div>}
      {success && <div className="gastos-alert success"><AlertCircle size={14} />{success}</div>}

      {/* Panel gestión de categorías */}
      {showCats && (
        <div className="glass-panel cat-manager-panel">
          <div className="cat-manager-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Tags size={15} style={{ color: 'var(--primary)' }} />
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Gestionar Categorías</span>
            </div>
            <button className="icon-btn" onClick={() => setShowCats(false)}><X size={16} /></button>
          </div>
          {catError && <div className="gastos-alert error" style={{ margin: '0 0 10px 0' }}><AlertCircle size={13} />{catError}</div>}
          <div className="cat-manager-list">
            {categorias.map(nombre => (
              <div key={nombre} className="cat-manager-item">
                <span className="cat-manager-dot" style={{ background: catColor(nombre, categorias) }} />
                <span className="cat-manager-name">{nombre}</span>
                <button
                  className="icon-btn danger"
                  title="Eliminar categoría"
                  onClick={() => handleDeleteCat(catItems.find(c => c.nombre === nombre)!)}
                  disabled={deletingCat !== null}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
          <div className="cat-manager-add">
            <input
              type="text"
              className="form-input"
              placeholder="Nueva categoría..."
              value={nuevaCat}
              onChange={e => setNuevaCat(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleAddCat(); }}
              style={{ flex: 1 }}
            />
            <Button variant="primary" size="sm" onClick={handleAddCat} disabled={savingCat}>
              {savingCat ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
              Agregar
            </Button>
          </div>
        </div>
      )}

      {/* Resumen por categoría */}
      <div className="gastos-resumen-cats">
        {categorias.map(cat => (
          <div key={cat} className={`gasto-cat-card ${catFilter === cat ? 'active' : ''}`}
            style={{ '--cat-color': catColor(cat, categorias) } as React.CSSProperties}
            onClick={() => setCatFilter(catFilter === cat ? '' : cat)}>
            <span className="gcat-nombre">{cat}</span>
            <span className="gcat-monto">${fmt(resumenCat[cat] || 0)}</span>
          </div>
        ))}
        <div className={`gasto-cat-card total-card ${!catFilter ? 'active' : ''}`}
          onClick={() => setCatFilter('')}>
          <span className="gcat-nombre">Total período</span>
          <span className="gcat-monto">${fmt(totalPeriodo)}</span>
        </div>
      </div>

      {/* Filtros */}
      <div className="glass-panel" style={{ padding: '14px 20px' }}>
        <div className="filters-row">
          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Desde</label>
            <input type="date" className="filter-input" value={desde} onChange={e => setDesde(e.target.value)} />
          </div>
          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Hasta</label>
            <input type="date" className="filter-input" value={hasta} onChange={e => setHasta(e.target.value)} />
          </div>
          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Categoría</label>
            <select className="filter-select" value={catFilter} onChange={e => setCatFilter(e.target.value)}>
              <option value="">Todas</option>
              {categorias.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center' }}><Loader2 className="animate-spin" size={24} /></div>
        ) : gastos.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
            <Receipt size={32} style={{ marginBottom: '12px', opacity: 0.4 }} /><br />
            No hay gastos en este período. Registra el primero.
          </div>
        ) : (
          <table className="gastos-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Categoría</th>
                <th>Descripción</th>
                <th>Proveedor / Empresa</th>
                <th>Comprobante</th>
                <th style={{ textAlign: 'right' }}>Monto</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {gastos.map(g => (
                <tr key={g.id_gasto} className={g.es_recurrente ? 'gasto-recurrente' : ''}>
                  <td>{format(parseISO(g.fecha), 'd MMM yyyy', { locale: es })}</td>
                  <td>
                    <span className="gasto-cat-badge"
                      style={{ background: catColor(canonicalCat(g.categoria), categorias) + '22', color: catColor(canonicalCat(g.categoria), categorias) }}>
                      {canonicalCat(g.categoria)}
                    </span>
                  </td>
                  <td>
                    {g.descripcion}
                    {g.es_recurrente && <span className="recurrente-tag" title="Plantilla recurrente"><Repeat size={11} /> mensual</span>}
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{g.proveedor_nombre || '—'}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{g.comprobante || '—'}</td>
                  <td style={{ textAlign: 'right', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                    ${fmt(parseFloat(g.monto))}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                      <button className="icon-btn" onClick={() => openEdit(g)} title="Editar"><Edit2 size={14} /></button>
                      <button className="icon-btn danger" onClick={() => handleDelete(g)}
                        disabled={deleting === g.id_gasto} title="Eliminar">
                        {deleting === g.id_gasto ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="gastos-total-row">
                <td colSpan={5} style={{ textAlign: 'right', fontWeight: 600, paddingRight: '12px', fontSize: '0.85rem' }}>
                  Total {catFilter || 'período'}
                </td>
                <td style={{ textAlign: 'right', fontWeight: 700, fontSize: '0.95rem', color: '#ef4444' }}>
                  ${fmt(totalPeriodo)}
                </td>
                <td />
              </tr>
            </tfoot>
          </table>
        )}
      </div>

      {/* Modal nuevo / editar */}
      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Editar Gasto' : 'Nuevo Gasto'}>
        <div className="gastos-form">
          {error && <div className="gastos-alert error" style={{ marginBottom: '12px' }}><AlertCircle size={13} />{error}</div>}

          <div className="form-grid-2">
            <div className="form-group">
              <label>Categoría *</label>
              <select className="form-input" value={form.categoria} onChange={e => setForm(f => ({ ...f, categoria: e.target.value }))}>
                {categorias.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Fecha *</label>
              <input type="date" className="form-input" value={form.fecha}
                onChange={e => setForm(f => ({ ...f, fecha: e.target.value }))} />
            </div>
          </div>

          <div className="form-group">
            <label>Descripción *</label>
            <input type="text" className="form-input" value={form.descripcion}
              placeholder="Ej. Factura energía eléctrica enero"
              onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} />
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label>Monto ($) *</label>
              <input type="number" min="0" step="100" className="form-input" value={form.monto}
                placeholder="0"
                onChange={e => setForm(f => ({ ...f, monto: e.target.value }))} />
            </div>
            <div className="form-group">
              <label>N° Comprobante / Factura</label>
              <input type="text" className="form-input" value={form.comprobante}
                placeholder="Ej. FE-2026-001"
                onChange={e => setForm(f => ({ ...f, comprobante: e.target.value }))} />
            </div>
          </div>

          <div className="form-group">
            <label>Proveedor / Empresa</label>
            <input type="text" className="form-input" value={form.proveedor_nombre}
              placeholder="Ej. EPM, ETB, Empresas Municipales..."
              onChange={e => setForm(f => ({ ...f, proveedor_nombre: e.target.value }))} />
          </div>

          <div className="recurrente-toggle">
            <label className="toggle-label">
              <input type="checkbox" checked={form.es_recurrente}
                onChange={e => setForm(f => ({ ...f, es_recurrente: e.target.checked }))} />
              <span>Gasto recurrente (se repite cada mes)</span>
              <Repeat size={13} style={{ marginLeft: 6, opacity: 0.6 }} />
            </label>
            {form.es_recurrente && (
              <div className="form-group" style={{ marginTop: '10px' }}>
                <label>Día del mes en que se paga</label>
                <input type="number" min="1" max="31" className="form-input" style={{ width: '80px' }}
                  value={form.dia_recurrente}
                  onChange={e => setForm(f => ({ ...f, dia_recurrente: e.target.value }))} />
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '8px' }}>
                  El botón "Generar recurrentes" creará la instancia de cada mes automáticamente.
                </span>
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Notas</label>
            <input type="text" className="form-input" value={form.notas}
              placeholder="Observaciones opcionales"
              onChange={e => setForm(f => ({ ...f, notas: e.target.value }))} />
          </div>

          <div className="form-actions">
            <Button variant="ghost" onClick={() => setModal(false)} disabled={saving}>Cancelar</Button>
            <Button variant="primary" onClick={handleSave} disabled={saving}>
              {saving ? <><Loader2 size={14} className="animate-spin" /> Guardando...</> : 'Guardar Gasto'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
