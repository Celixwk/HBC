import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/apiFetch';
import { Button } from '../../components/Button/Button';
import { Loader2, Search, Filter } from 'lucide-react';
import dayjs from 'dayjs';

export const AuditoriaSettings: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({ usuario: '', accion: '', desde: '', hasta: '' });

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (filtros.usuario) query.append('usuario', filtros.usuario);
      if (filtros.accion) query.append('accion', filtros.accion);
      if (filtros.desde) query.append('desde', filtros.desde);
      if (filtros.hasta) query.append('hasta', filtros.hasta);
      
      const res = await apiFetch(`/auditoria?${query.toString()}`);
      if (res.ok) setLogs(await res.json());
    } catch { console.error('Error al cargar logs'); }
    setLoading(false);
  };

  useEffect(() => { fetchLogs(); }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLogs();
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ margin: 0 }}>Registro de Auditoría</h3>
        <p className="text-muted" style={{ margin: 0, fontSize: '0.9rem' }}>Monitorea las acciones realizadas por los usuarios en el sistema.</p>
      </div>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20, background: 'var(--bg-card)', padding: 16, borderRadius: 8, border: '1px solid var(--border-medium)' }}>
        <div className="form-group" style={{ flex: 1, minWidth: 150 }}>
          <label style={{ fontSize: '0.8rem' }}>Usuario</label>
          <input className="form-input" placeholder="Ej: admin" value={filtros.usuario} onChange={e => setFiltros({...filtros, usuario: e.target.value})} />
        </div>
        <div className="form-group" style={{ flex: 1, minWidth: 150 }}>
          <label style={{ fontSize: '0.8rem' }}>Acción</label>
          <input className="form-input" placeholder="Ej: LOGIN" value={filtros.accion} onChange={e => setFiltros({...filtros, accion: e.target.value})} />
        </div>
        <div className="form-group" style={{ flex: 1, minWidth: 130 }}>
          <label style={{ fontSize: '0.8rem' }}>Desde</label>
          <input type="date" className="form-input" value={filtros.desde} onChange={e => setFiltros({...filtros, desde: e.target.value})} />
        </div>
        <div className="form-group" style={{ flex: 1, minWidth: 130 }}>
          <label style={{ fontSize: '0.8rem' }}>Hasta</label>
          <input type="date" className="form-input" value={filtros.hasta} onChange={e => setFiltros({...filtros, hasta: e.target.value})} />
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <Button variant="primary" type="submit"><Search size={16}/> Filtrar</Button>
        </div>
      </form>

      {loading ? <div style={{ textAlign: 'center', padding: 40 }}><Loader2 className="animate-spin" size={24} /></div> : (
        <table className="inv-table">
          <thead>
            <tr>
              <th>Fecha y Hora</th>
              <th>Usuario</th>
              <th>Acción</th>
              <th>Detalle</th>
              <th>IP</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id_log}>
                <td style={{ fontSize: '0.85rem' }}>{dayjs(log.fecha).format('DD MMM YYYY, HH:mm:ss')}</td>
                <td style={{ fontWeight: 600 }}>@{log.username}</td>
                <td>
                  <span style={{ fontSize: '0.75rem', padding: '2px 6px', background: 'var(--bg-elevated)', border: '1px solid var(--border-medium)', borderRadius: 4 }}>
                    {log.accion}
                  </span>
                </td>
                <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{log.descripcion || '—'}</td>
                <td style={{ fontSize: '0.8rem', fontFamily: 'monospace' }}>{log.ip || '—'}</td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 30, color: 'var(--text-muted)' }}>No se encontraron registros de auditoría.</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};
