                  <td>
                    {g.descripcion}
                    {g.es_recurrente && <span className="recurrente-tag" title="Plantilla recurrente"><Repeat size={11} /> mensual</span>}
                  </td>
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
                <td colSpan={3} style={{ textAlign: 'right', fontWeight: 600, paddingRight: '12px', fontSize: '0.85rem' }}>
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
                <option value="" disabled>Selecciona una categoría...</option>
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

          <div className="form-group">
            <label>Monto ($) *</label>
            <input type="number" min="0" step="100" className="form-input" value={form.monto}
              placeholder="0"
              onChange={e => setForm(f => ({ ...f, monto: e.target.value }))} />
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
      <ConfirmDialog {...dialog} onCancel={close} />
    </div>
  );
};
