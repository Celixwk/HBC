import React, { useState, useEffect } from 'react';
import { addDays, format, subDays, startOfToday } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Plus, Loader2 } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { TimelineCalendar } from '../../components/TimelineCalendar/TimelineCalendar';
import { NewReservationModal } from '../../components/NewReservationModal/NewReservationModal';
import { EditReservationModal } from '../../components/EditReservationModal/EditReservationModal';
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
    return startOfToday();
  });
  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReserva, setEditingReserva] = useState<any | null>(null);

  const goTo = (d: Date) => { setCurrentDate(d); saveDate(d); };
  const handlePrevDay = () => goTo(subDays(currentDate, 1));
  const handleNextDay = () => goTo(addDays(currentDate, 1));
  const handleToday  = () => goTo(startOfToday());

  useEffect(() => { fetchData(); }, []);

  // Refrescar cuando la pestaña/ventana recupera el foco (cubre borrados desde otras páginas)
  useEffect(() => {
    const onFocus = () => fetchData();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resEspacios, resReservas] = await Promise.all([
        apiFetch('/espacios'),
        apiFetch('/reservas')
      ]);
      if (resEspacios.ok && resReservas.ok) {
        const espaciosData = await resEspacios.json();
        const reservasData = await resReservas.json();
        setRooms(espaciosData.filter((e: any) => e.activo));
        setReservations(reservasData);
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
          <div className="res-date-nav">
            <Button variant="ghost" onClick={handlePrevDay} className="icon-btn">
              <ChevronLeft size={20} />
            </Button>
            <span className="res-date-label" style={{ position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="date"
                className="res-date-picker-hidden"
                value={format(currentDate, 'yyyy-MM-dd')}
                onChange={(e) => {
                  if (e.target.value) {
                    const [year, month, day] = e.target.value.split('-');
                    goTo(new Date(Number(year), Number(month) - 1, Number(day)));
                  }
                }}
                title="Seleccionar fecha exacta"
              />
              <span className="res-date-text text-capitalize">
                {format(currentDate, "MMMM yyyy", { locale: es })}
              </span>
            </span>
            <Button variant="ghost" onClick={handleNextDay} className="icon-btn">
              <ChevronRight size={20} />
            </Button>
          </div>
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
    </div>
  );
};
