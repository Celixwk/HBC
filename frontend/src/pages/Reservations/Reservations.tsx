import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');
import { ChevronLeft, ChevronRight, Plus, Loader2, Tag } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { TimelineCalendar } from '../../components/TimelineCalendar/TimelineCalendar';
import { NewReservationModal } from '../../components/NewReservationModal/NewReservationModal';
import { EditReservationModal } from '../../components/EditReservationModal/EditReservationModal';
import { PricingModal } from './PricingModal';
import './Reservations.css';
import { apiFetch } from '../../utils/apiFetch';

const SESSION_KEY = 'res_calendar_date';

const saveDate = (d: Date) => sessionStorage.setItem(SESSION_KEY, d.toISOString());

export const Reservations: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) {
      const d = new Date(saved);
      if (!isNaN(d.getTime())) return d;
    }
    return dayjs().startOf('day').toDate();
  });
  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReserva, setEditingReserva] = useState<any | null>(null);
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  const dateInputRef = useRef<HTMLInputElement>(null);

  const goTo = (d: Date) => { setCurrentDate(d); saveDate(d); };
  const handlePrevDay = () => goTo(dayjs(currentDate).subtract(1, 'day').toDate());
  const handleNextDay = () => goTo(dayjs(currentDate).add(1, 'day').toDate());
  const handleToday  = () => goTo(dayjs().startOf('day').toDate());

  const handleMonthClick = () => {
    // Intentar abrir el picker nativo; si no, el input ya es clicable vía overlay
    if (dateInputRef.current) {
      try { (dateInputRef.current as any).showPicker(); } catch { dateInputRef.current.click(); }
    }
  };

  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    const onFocus = () => fetchData();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resEspacios, resReservas, resConfig] = await Promise.all([
        apiFetch('/espacios'),
        apiFetch('/reservas'),
        apiFetch('/configuracion')
      ]);
      if (resEspacios.ok && resReservas.ok) {
        const espaciosData = await resEspacios.json();
        const reservasData = await resReservas.json();
        setRooms(espaciosData.filter((e: any) => e.activo));
        setReservations(reservasData);
      }
      if (resConfig.ok) {
        setConfig(await resConfig.json());
      }
    } catch (error) {
      console.error('Error fetching reservations data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="res-page-container">
      <div className="res-page-header">
        <div>
          <h1 className="page-title">Reservas</h1>
          <p className="page-subtitle">Gestiona la disponibilidad y asignación de habitaciones</p>
        </div>
        <div className="res-page-actions">
          <Button variant="secondary" onClick={handleToday}>Hoy</Button>

          {/* Navegación de fechas */}
          <div className="res-date-nav">
            <Button variant="ghost" onClick={handlePrevDay} className="icon-btn">
              <ChevronLeft size={20} />
            </Button>
            <span
              className="res-date-label"
              onClick={handleMonthClick}
              title="Clic para ir a una fecha exacta"
              style={{ position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            >
              {/* Input nativo oculto — se abre programáticamente */}
              <input
                ref={dateInputRef}
                type="date"
                className="res-date-picker-hidden"
                value={dayjs(currentDate).format('YYYY-MM-DD')}
                onChange={(e) => {
                  if (e.target.value) {
                    const [year, month, day] = e.target.value.split('-');
                    goTo(new Date(Number(year), Number(month) - 1, Number(day)));
                  }
                }}
                tabIndex={-1}
              />
              <span className="res-date-text text-capitalize">
                {dayjs(currentDate).format('MMMM YYYY')}
              </span>
            </span>
            <Button variant="ghost" onClick={handleNextDay} className="icon-btn">
              <ChevronRight size={20} />
            </Button>
          </div>

          {/* Botón precios */}
          <Button variant="secondary" onClick={() => setIsPricingOpen(true)}>
            <Tag size={15} /> Consultar Precios
          </Button>

          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} /> Nueva Reserva
          </Button>
        </div>
      </div>

      <div className="res-calendar-wrapper glass-panel">
        {loading ? (
          <div className="flex justify-center items-center" style={{ height: '400px' }}>
            <Loader2 className="animate-spin text-primary" size={40} />
            <span className="ml-4 text-muted">Cargando calendario...</span>
          </div>
        ) : (
          <TimelineCalendar 
            startDate={currentDate} 
            rooms={rooms} 
            reservations={reservations} 
            onReservationClick={setEditingReserva}
            config={config}
          />
        )}
      </div>

      <NewReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => fetchData()}
        rooms={rooms}
        reservations={reservations}
      />

      <EditReservationModal
        isOpen={!!editingReserva}
        onClose={() => setEditingReserva(null)}
        onSuccess={() => fetchData()}
        reservation={editingReserva}
        rooms={rooms}
        reservations={reservations}
      />

      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        fecha={currentDate}
      />
    </div>
  );
};
