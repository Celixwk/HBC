import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BedDouble, Users, DoorOpen, LogOut, Loader2, ArrowUpRight, ArrowDownRight,
  Coffee, Clock, CheckCircle2, Circle, CalendarDays, UserX
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { apiFetch } from '../../utils/apiFetch';
import './Dashboard.css';

interface KpiCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  delay: number;
  trend?: number | null;
}

const KpiCard: React.FC<KpiCardProps> = ({ icon, label, value, sub, color, delay, trend }) => (
  <motion.div
    className="kpi-card glass-panel"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
  >
    <div className="kpi-icon" style={{ background: color }}>
      {icon}
    </div>
    <div className="kpi-content">
      <span className="kpi-label">{label}</span>
      <div className="kpi-value-container">
        <span className="kpi-value">{value}</span>
        {trend !== undefined && trend !== null && (
          <span className={`kpi-trend ${trend >= 0 ? 'positive' : 'negative'}`}>
            {trend >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            {Math.abs(trend).toFixed(1)}%
          </span>
        )}
      </div>
      {sub && <span className="kpi-sub">{sub}</span>}
    </div>
  </motion.div>
);

export const Dashboard: React.FC = () => {
  const [stats, setStats]   = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [ahora, setAhora]   = useState(new Date());

  // Reloj en tiempo real — se actualiza cada 30 s
  useEffect(() => {
    const id = setInterval(() => setAhora(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  // Flags de tiempo calculados en el cliente (no dependen del momento de carga)
  const minActual    = ahora.getHours() * 60 + ahora.getMinutes();
  const pasoCheckOut = minActual >= 13 * 60; // 1:00 PM → hora de salida
  const pasoCheckIn  = minActual >= 15 * 60; // 3:00 PM → hora de entrada

  // Cuando el reloj cruza la hora de check-out, refetch para que el backend
  // ejecute el auto-marcado y devuelva las cifras actualizadas (in-house, etc.)
  useEffect(() => {
    if (pasoCheckOut && stats) fetchStats();
  }, [pasoCheckOut]);

  useEffect(() => {
    if (pasoCheckIn && stats) fetchStats();
  }, [pasoCheckIn]);

  useEffect(() => { fetchStats(); }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await apiFetch('/dashboard/stats');
      if (response.ok) setStats(await response.json());
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatSimpleDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin text-primary" size={40} />
        <span className="ml-4 text-muted">Cargando operaciones...</span>
      </div>
    );
  }

  if (!stats) return <div className="p-8 text-center text-muted">Error al cargar datos</div>;

  const { estadisticas, ocupacion7Dias, activityToday, alertas } = stats;

  const ocupacionReal = estadisticas.habitacionesActivas > 0
    ? Math.round((estadisticas.ocupadasHoy / estadisticas.habitacionesActivas) * 100)
    : 0;

  // Personas de habitaciones que ya hicieron check-out (solo se restan después de la 1 PM)
  const personasSalidas = pasoCheckOut
    ? (activityToday?.checkOuts || []).reduce((s: number, r: any) => s + (r.personas || 0), 0)
    : 0;
  const huespedesActuales = Math.max(0, (estadisticas.huespedesInHouse || 0) - personasSalidas);

  // Check-ins pendientes de firma (se muestran hasta que firmen, sin importar la hora)
  const checkInsPendientes = (activityToday?.checkIns || []).filter((r: any) => !r.firmado);

  return (
    <div className="dashboard-home">
      {/* ── Header ──────────────────────────────────── */}
      <div className="dashboard-home-header">
        <div>
          <h1 className="page-title">Operaciones</h1>
          <p className="page-subtitle">Panel de control de operaciones del hotel</p>
        </div>
      </div>

      {/* ── KPIs ─────────────────────────────────────── */}
      <div className="kpi-section-title">Estado del Hotel (Hoy)</div>
      <div className="kpi-grid">
        <KpiCard
          icon={<BedDouble size={24} />}
          label="Tasa Ocupación"
          value={`${ocupacionReal}%`}
          sub={`${estadisticas.ocupadasHoy} habs ocupadas de ${estadisticas.habitacionesActivas}`}
          color="rgba(62, 139, 55, 0.25)"
          delay={0}
        />
        <KpiCard
          icon={<LogOut size={24} />}
          label="Salidas"
          value={estadisticas.salidasHoy}
          sub={pasoCheckOut ? 'Salidas del día completadas · 1:00 PM' : 'Check-outs programados hoy'}
          color="rgba(245, 158, 11, 0.2)"
          delay={0.1}
        />
        <KpiCard
          icon={<DoorOpen size={24} />}
          label="Llegadas"
          value={estadisticas.llegadasHoy}
          sub={checkInsPendientes.length > 0
            ? `${checkInsPendientes.length} pendiente(s) de firma`
            : pasoCheckIn
              ? 'Llegadas del día completadas · 3:00 PM'
              : 'Check-ins programados hoy'}
          color="rgba(16, 185, 129, 0.2)"
          delay={0.2}
        />
        <KpiCard
          icon={<Users size={24} />}
          label="Huéspedes In-House"
          value={huespedesActuales}
          sub={pasoCheckOut && personasSalidas > 0
            ? `Hospedados · ${personasSalidas} persona(s) salieron hoy`
            : estadisticas.reservasPendientesLlegada > 0
              ? `Hospedados · +${estadisticas.reservasPendientesLlegada} reserva(s) pendiente de llegada`
              : 'Hospedados con firma de entrada'}
          color="rgba(0, 212, 255, 0.2)"
          delay={0.3}
        />
      </div>

      {/* ── Charts Row ───────────────────────────────── */}
      <div className="dashboard-charts-row mt-6">
        {/* Ocupación proyectada */}
        <motion.div
          className="dashboard-chart-container glass-panel"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3>Ocupación Proyectada (Próximos 7 días)</h3>
          <div style={{ height: 300, marginTop: '20px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ocupacion7Dias} margin={{ left: 0, right: 16, top: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorOcupadas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="fecha"
                  stroke="var(--text-muted)"
                  tickFormatter={formatSimpleDate}
                  interval={0}
                  tick={{ fontSize: 11 }}
                />
                <YAxis stroke="var(--text-muted)" allowDecimals={false} width={30} />
                <Tooltip
                  labelFormatter={(label) => formatSimpleDate(label)}
                  formatter={(value: any) => [`${value} habitaciones`, 'Ocupadas']}
                  contentStyle={{ backgroundColor: 'var(--bg-dark)', borderColor: 'var(--border-medium)', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="ocupadas" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorOcupadas)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Actividad del Día */}
        <motion.div
          className="dashboard-traceability glass-panel"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CalendarDays size={18} style={{ color: 'var(--primary)' }} />
              Actividad del Día
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>
              <Clock size={13} />
              {ahora.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: true })}
            </span>
          </h3>

          {/* Check-outs hoy — hora límite 1:00 PM */}
          <div className="activity-section">
            <div className="activity-section-title" style={{ color: '#f59e0b' }}>
              <LogOut size={14} />
              {pasoCheckOut
                ? 'Salidas de hoy'
                : `Check-outs de hoy (${activityToday?.checkOuts?.length || 0})`}
            </div>
            {pasoCheckOut ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 0', color: 'var(--text-muted)', fontSize: '12px' }}>
                <CheckCircle2 size={15} style={{ color: '#f59e0b', flexShrink: 0 }} />
                <span>Horario de salidas finalizado · check-out: 1:00 PM</span>
              </div>
            ) : activityToday?.checkOuts?.length > 0 ? (
              activityToday.checkOuts.map((r: any, i: number) => (
                <div key={i} className="activity-item">
                  <div className="activity-item-left">
                    <span className="activity-room-badge">Hab. {r.hab}</span>
                    <span className="activity-name">{r.nombre}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{r.tipo}</span>
                </div>
              ))
            ) : (
              <p className="activity-empty">No hay check-outs programados hoy</p>
            )}
          </div>

          {/* Check-ins hoy — desaparecen solo cuando el huésped firma */}
          <div className="activity-section" style={{ marginTop: '16px' }}>
            <div className="activity-section-title" style={{ color: '#10b981' }}>
              <DoorOpen size={14} />
              {`Check-ins de hoy (${checkInsPendientes.length} pendiente${checkInsPendientes.length !== 1 ? 's' : ''})`}
            </div>
            {checkInsPendientes.length > 0 ? (
              checkInsPendientes.map((r: any, i: number) => (
                <div key={i} className="activity-item">
                  <div className="activity-item-left">
                    <span className="activity-room-badge">Hab. {r.hab}</span>
                    <span className="activity-name">{r.nombre}</span>
                  </div>
                  <div className="activity-item-right">
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{r.tipo}</span>
                    <span title="Pendiente de firma"><Circle size={16} style={{ color: '#f59e0b' }} /></span>
                  </div>
                </div>
              ))
            ) : activityToday?.checkIns?.length > 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 0', color: 'var(--text-muted)', fontSize: '12px' }}>
                <CheckCircle2 size={15} style={{ color: '#10b981', flexShrink: 0 }} />
                <span>Todas las llegadas del día han firmado</span>
              </div>
            ) : (
              <p className="activity-empty">No hay check-ins programados hoy</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* ── Panel de Alertas ────────────────────────── */}
      {alertas && (alertas.noShows?.length > 0 || alertas.checkOutsManana?.length > 0 || alertas.pagosPendientes?.length > 0 || alertas.minibarVencimiento?.length > 0) && (
        <motion.div
          className="glass-panel"
          style={{ marginTop: '24px', padding: '20px 24px' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
            Alertas del Sistema
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {alertas.noShows?.length > 0 && (
              <div style={{ flex: '1 1 220px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', padding: '12px 16px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#ef4444', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <UserX size={13} />
                  No-Show — No se presentaron ({alertas.noShows.length})
                </div>
                {alertas.noShows.map((r: any, i: number) => (
                  <div key={i} style={{ fontSize: '12px', color: 'var(--text-muted)', padding: '3px 0', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Hab. {r.hab} — {r.nombre}</span>
                    <span style={{ color: '#ef4444', fontSize: '11px' }}>
                      {new Date(r.checkIn + 'T00:00:00').toLocaleDateString('es-CO', { day: '2-digit', month: 'short' })}
                    </span>
                  </div>
                ))}
                <div style={{ marginTop: '8px', fontSize: '11px', color: '#f87171', fontStyle: 'italic' }}>
                  Ir a Reservas para modificar o eliminar
                </div>
              </div>
            )}
            {alertas.checkOutsManana?.length > 0 && (
              <div style={{ flex: '1 1 200px', background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '10px', padding: '12px 16px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#f59e0b', marginBottom: '8px' }}>
                  <LogOut size={13} style={{ display: 'inline', marginRight: 6 }} />
                  Check-outs mañana ({alertas.checkOutsManana.length})
                </div>
                {alertas.checkOutsManana.map((r: any, i: number) => (
                  <div key={i} style={{ fontSize: '12px', color: 'var(--text-muted)', padding: '3px 0' }}>
                    Hab. {r.hab} — {r.nombre}
                  </div>
                ))}
              </div>
            )}
            {alertas.pagosPendientes?.length > 0 && (
              <div style={{ flex: '1 1 200px', background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '12px 16px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#ef4444', marginBottom: '8px' }}>
                  <BedDouble size={13} style={{ display: 'inline', marginRight: 6 }} />
                  Pagos pendientes ({alertas.pagosPendientes.length})
                </div>
                {alertas.pagosPendientes.map((r: any, i: number) => (
                  <div key={i} style={{ fontSize: '12px', color: 'var(--text-muted)', padding: '3px 0' }}>
                    Hab. {r.hab} — {r.nombre} · ${(r.monto || 0).toLocaleString('es-CO')}
                  </div>
                ))}
              </div>
            )}
            {alertas.minibarVencimiento?.length > 0 && (
              <div style={{ flex: '1 1 200px', background: 'rgba(167,139,250,0.07)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: '10px', padding: '12px 16px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#a78bfa', marginBottom: '8px' }}>
                  <Coffee size={13} style={{ display: 'inline', marginRight: 6 }} />
                  Minibar por vencer ({alertas.minibarVencimiento.length})
                </div>
                {alertas.minibarVencimiento.map((m: any, i: number) => (
                  <div key={i} style={{ fontSize: '12px', color: 'var(--text-muted)', padding: '3px 0' }}>
                    Hab. {m.hab} — {m.producto} · {new Date(m.fecha).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' })}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}

    </div>
  );
};
