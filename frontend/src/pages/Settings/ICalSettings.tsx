import React, { useState, useEffect } from 'react';
import { Button } from '../../components/Button/Button';
import { Link2, RefreshCw, CheckCircle, AlertCircle, Loader2, Copy, ExternalLink } from 'lucide-react';
import { apiFetch } from '../../utils/apiFetch';

interface Espacio {
  id_espacio: number;
  numero: string;
  tipo_habitacion?: string;
  url_ical?: string;
}

export const ICalSettings: React.FC = () => {
  const [espacios, setEspacios] = useState<Espacio[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);
  const [urlsEdit, setUrlsEdit] = useState<Record<number, string>>({});
  const [saving, setSaving] = useState<Record<number, boolean>>({});
  const [saved, setSaved] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState<number | null>(null);

  const backendBase = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : window.location.origin;

  useEffect(() => {
    fetchEspacios();
  }, []);

  const fetchEspacios = async () => {
    try {
      const res = await apiFetch('/espacios');
      if (res.ok) {
        const data: Espacio[] = await res.json();
        const habs = data.filter(e => (e as any).tipo_espacio === 'habitacion' || !(e as any).tipo_espacio);
        setEspacios(habs);
        const initUrls: Record<number, string> = {};
        habs.forEach(e => { initUrls[e.id_espacio] = e.url_ical || ''; });
        setUrlsEdit(initUrls);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleGuardarUrl = async (espacio: Espacio) => {
    setSaving(prev => ({ ...prev, [espacio.id_espacio]: true }));
    setSaved(prev => ({ ...prev, [espacio.id_espacio]: false }));
    try {
      await apiFetch(`/espacios/${espacio.id_espacio}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url_ical: urlsEdit[espacio.id_espacio] || null })
      });
      setSaved(prev => ({ ...prev, [espacio.id_espacio]: true }));
      await fetchEspacios();
      setTimeout(() => setSaved(prev => ({ ...prev, [espacio.id_espacio]: false })), 2500);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(prev => ({ ...prev, [espacio.id_espacio]: false }));
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    setSyncResult(null);
    try {
      const res = await fetch(`${backendBase}/api/public/ical/sync`, { method: 'POST' });
      const data = await res.json();
      setSyncResult(data.message || 'Sincronización completada.');
    } catch (e: any) {
      setSyncResult('Error al sincronizar: ' + e.message);
    } finally {
      setSyncing(false);
    }
  };

  const handleCopyUrl = (id: number) => {
    const url = `${backendBase}/api/public/ical/${id}`;
    navigator.clipboard.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
      <Loader2 className="animate-spin" size={32} />
    </div>
  );

  return (
    <div className="settings-section" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="settings-section-title" style={{ marginBottom: '8px' }}>
        <Link2 size={16} /> Sincronización iCal — Booking.com / Airbnb
      </div>
      <p className="text-muted" style={{ marginBottom: '24px', fontSize: '13px', lineHeight: '1.6' }}>
        Configura el enlace de calendario de Booking.com o Airbnb para cada habitación.
        El sistema descargará automáticamente las reservas cada 30 minutos y las bloqueará en el sistema.
        <br /><br />
        <strong>¿Cómo obtener el enlace de Booking.com?</strong> Extranet → Calendario → "Exportar calendario" → Copia la URL que aparece.
      </p>

      {/* Panel de sincronización manual */}
      <div style={{
        background: 'var(--surface-50)', borderRadius: '12px',
        border: '1px solid var(--border-light)', padding: '20px',
        marginBottom: '24px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px'
      }}>
        <div>
          <div style={{ fontWeight: 600, marginBottom: '4px', fontSize: '14px' }}>Sincronización Automática</div>
          <div className="text-muted" style={{ fontSize: '12px' }}>
            El sistema sincroniza automáticamente cada 30 minutos. También puedes forzar una sincronización ahora.
          </div>
          {syncResult && (
            <div style={{
              marginTop: '8px', fontSize: '12px',
              color: syncResult.includes('Error') ? '#ef4444' : '#10b981',
              display: 'flex', alignItems: 'center', gap: '6px'
            }}>
              {syncResult.includes('Error') ? <AlertCircle size={14} /> : <CheckCircle size={14} />}
              {syncResult}
            </div>
          )}
        </div>
        <Button onClick={handleSync} disabled={syncing} variant="secondary">
          {syncing ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
          {syncing ? 'Sincronizando...' : 'Sincronizar Ahora'}
        </Button>
      </div>

      {/* Lista de habitaciones */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {espacios.map(espacio => {
          const exportUrl = `${backendBase}/api/public/ical/${espacio.id_espacio}`;
          const hasSavedUrl = !!espacio.url_ical;
          return (
            <div key={espacio.id_espacio} style={{
              background: 'var(--surface)', borderRadius: '12px',
              border: '1px solid var(--border-light)', padding: '20px'
            }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span style={{
                  background: 'var(--primary-light)', color: 'var(--primary)',
                  padding: '4px 10px', borderRadius: '8px', fontWeight: 700, fontSize: '13px'
                }}>
                  Hab. {espacio.numero}
                </span>
                {espacio.tipo_habitacion && (
                  <span className="text-muted" style={{ fontSize: '13px', textTransform: 'capitalize' }}>
                    {espacio.tipo_habitacion}
                  </span>
                )}
                {hasSavedUrl && (
                  <span style={{
                    marginLeft: 'auto', fontSize: '11px', padding: '2px 8px',
                    background: '#10b98120', color: '#10b981', borderRadius: '4px', fontWeight: 600
                  }}>
                    ✓ iCal Configurado
                  </span>
                )}
              </div>

              {/* URL de exportación (para pegar en Booking) */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block', fontWeight: 600 }}>
                  📤 URL para exportar a Booking/Airbnb (pega esta URL en Booking):
                </label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <code style={{
                    flex: 1, padding: '8px 12px', background: 'var(--surface-50)',
                    borderRadius: '6px', fontSize: '11px', color: 'var(--text-muted)',
                    border: '1px solid var(--border-light)', overflow: 'hidden',
                    textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                  }}>
                    {exportUrl}
                  </code>
                  <button
                    onClick={() => handleCopyUrl(espacio.id_espacio)}
                    style={{
                      padding: '8px', borderRadius: '6px', border: '1px solid var(--border-light)',
                      background: 'transparent', cursor: 'pointer',
                      color: copied === espacio.id_espacio ? '#10b981' : 'var(--text-muted)'
                    }}
                    title="Copiar URL"
                  >
                    {copied === espacio.id_espacio ? <CheckCircle size={16} /> : <Copy size={16} />}
                  </button>
                  <a
                    href={exportUrl} target="_blank" rel="noreferrer"
                    style={{
                      padding: '8px', borderRadius: '6px', border: '1px solid var(--border-light)',
                      background: 'transparent', cursor: 'pointer', color: 'var(--text-muted)',
                      display: 'flex', textDecoration: 'none'
                    }}
                    title="Abrir URL"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              {/* URL de importación (de Booking hacia aquí) */}
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block', fontWeight: 600 }}>
                  📥 URL iCal de Booking/Airbnb (pega aquí el enlace de Booking):
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="url"
                    placeholder="https://admin.booking.com/hotel/hoteladmin/ical.html?..."
                    value={urlsEdit[espacio.id_espacio] || ''}
                    onChange={e => setUrlsEdit(prev => ({ ...prev, [espacio.id_espacio]: e.target.value }))}
                    className="form-input"
                    style={{ flex: 1, fontSize: '12px' }}
                  />
                  <Button
                    onClick={() => handleGuardarUrl(espacio)}
                    disabled={saving[espacio.id_espacio]}
                    variant={saved[espacio.id_espacio] ? 'secondary' : 'primary'}
                    style={{ minWidth: '100px' }}
                  >
                    {saving[espacio.id_espacio]
                      ? <Loader2 size={16} className="animate-spin" />
                      : saved[espacio.id_espacio]
                        ? <><CheckCircle size={16} /> Guardado</>
                        : 'Guardar'}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}

        {espacios.length === 0 && (
          <p className="text-muted text-center" style={{ padding: '32px 0' }}>
            No hay habitaciones configuradas. Agrega habitaciones en Tipos de Espacio primero.
          </p>
        )}
      </div>
    </div>
  );
};
