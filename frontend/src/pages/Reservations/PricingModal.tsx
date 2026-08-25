import React, { useState, useEffect } from 'react';
import { X, Tag, Loader2, AlertCircle } from 'lucide-react';
import { apiFetch } from '../../utils/apiFetch';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  fecha: Date;
}

const fmt = (v: number) => `$${v.toLocaleString('es-CO', { maximumFractionDigits: 0 })}`;

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, fecha }) => {
  const [temporada, setTemporada] = useState<any>(null);
  const [tipos, setTipos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const loadData = async () => {
      setLoading(true);
      setError('');
      try {
        const fechaStr = dayjs(fecha).format('YYYY-MM-DD');
        const [resTemp, resTipos] = await Promise.all([
          apiFetch(`/temporadas/detectar?fecha=${fechaStr}`),
          apiFetch('/espacios/config/tipos'),
        ]);
        if (resTemp.ok && resTipos.ok) {
          setTemporada(await resTemp.json());
          setTipos(await resTipos.json());
        } else {
          setError('No se pudo cargar la informacion de precios.');
        }
      } catch {
        setError('Error de conexion.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [isOpen, fecha]);

  if (!isOpen) return null;

  const tipoLabel =
    temporada?.tipo === 'alta'  ? 'Temporada Alta'  :
    temporada?.tipo === 'media' ? 'Temporada Media' : 'Temporada Baja';

  const tipoEmoji =
    temporada?.tipo === 'alta'  ? '🔴' :
    temporada?.tipo === 'media' ? '🟡' : '🟢';

  const getPrecio = (tipo: any, campo: string) => {
    const t = temporada?.tipo;
    if (t === 'alta'  && tipo[`${campo}_alta`]  != null) return parseFloat(tipo[`${campo}_alta`]);
    if (t === 'media' && tipo[`${campo}_media`] != null) return parseFloat(tipo[`${campo}_media`]);
    return parseFloat(tipo[campo] ?? 0);
  };

  const accentColor =
    temporada?.tipo === 'alta'  ? 'rgba(239,68,68,0.15)'   :
    temporada?.tipo === 'media' ? 'rgba(245,158,11,0.15)'  : 'rgba(16,185,129,0.15)';
  const borderColor =
    temporada?.tipo === 'alta'  ? 'rgba(239,68,68,0.3)'   :
    temporada?.tipo === 'media' ? 'rgba(245,158,11,0.3)'  : 'rgba(16,185,129,0.3)';

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 99999,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border-light)',
        width: '100%', maxWidth: '520px', maxHeight: '80vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>

        {/* Header */}
        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--border-light)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Tag size={18} style={{ color: 'var(--primary)' }} />
              <span style={{ fontWeight: 700, fontSize: '16px' }}>Precios Actuales</span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              {dayjs(fecha).format('dddd D \'de\' MMMM YYYY')}
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-muted)', padding: '4px', borderRadius: '6px', display: 'flex' }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              <Loader2 className="animate-spin" size={28} style={{ display: 'inline-block', color: 'var(--primary)' }} />
              <p style={{ marginTop: '10px' }}>Cargando precios...</p>
            </div>
          ) : error ? (
            <div style={{ display: 'flex', gap: '8px', color: '#f87171', padding: '12px',
              background: 'rgba(248,113,113,0.08)', borderRadius: '8px' }}>
              <AlertCircle size={16} /> {error}
            </div>
          ) : (
            <>
              {/* Temporada badge */}
              <div style={{ padding: '12px 16px', borderRadius: '10px', marginBottom: '20px',
                background: accentColor, border: `1px solid ${borderColor}` }}>
                <div style={{ fontWeight: 700, fontSize: '15px' }}>{tipoEmoji} {tipoLabel}</div>
                {temporada?.nombre && (
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {temporada.nombre}
                  </div>
                )}
              </div>

              {/* Tipos */}
              {tipos.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>
                  No hay tipos de habitacion configurados.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {tipos.map((t: any) => {
                    const base    = getPrecio(t, 'precio_base');
                    const pareja  = getPrecio(t, 'recargo_pareja');
                    const adicion = getPrecio(t, 'recargo_adicional');
                    return (
                      <div key={t.id} style={{ background: 'rgba(255,255,255,0.03)',
                        border: '1px solid var(--border-light)', borderRadius: '10px', padding: '14px 16px' }}>
                        <div style={{ fontWeight: 700, marginBottom: '10px', fontSize: '14px' }}>{t.nombre}</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '2px' }}>1 Persona</div>
                            <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '15px' }}>{fmt(base)}</div>
                          </div>
                          <div style={{ textAlign: 'center', borderLeft: '1px solid var(--border-light)',
                            borderRight: '1px solid var(--border-light)' }}>
                            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '2px' }}>Pareja</div>
                            <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '15px' }}>{fmt(base + pareja)}</div>
                            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>+{fmt(pareja)} recargo</div>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '2px' }}>+ Persona</div>
                            <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '15px' }}>+{fmt(adicion)}</div>
                            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>por adicional</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
