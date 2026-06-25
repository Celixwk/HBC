import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { CalendarDays, Home, Users, BedDouble, FileText, Settings, LogOut, Truck, Package, Receipt, BarChart2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './MainLayout.css';

const MainLayout: React.FC = () => {
  const { usuario, logout } = useAuth();
  return (
    <div className="layout-container">
      <aside className="sidebar glass-panel">
        <div className="logo-container">
          <div className="logo-icon">HB</div>
          <h1 className="logo-text">Boutique</h1>
        </div>

        <nav className="nav-menu">
          <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
            <Home className="nav-icon" size={20} />
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink to="/reservas" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <CalendarDays className="nav-icon" size={20} />
            <span>Reservas</span>
          </NavLink>

          <NavLink to="/habitaciones" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <BedDouble className="nav-icon" size={20} />
            <span>Habitaciones</span>
          </NavLink>

          <NavLink to="/huespedes" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Users className="nav-icon" size={20} />
            <span>Huéspedes</span>
          </NavLink>

          <NavLink to="/cuentas" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <FileText className="nav-icon" size={20} />
            <span>Facturación</span>
          </NavLink>

          <NavLink to="/proveedores" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Truck className="nav-icon" size={20} />
            <span>Proveedores</span>
          </NavLink>

          <NavLink to="/inventario" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Package className="nav-icon" size={20} />
            <span>Inventario</span>
          </NavLink>

          <NavLink to="/gastos" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Receipt className="nav-icon" size={20} />
            <span>Gastos</span>
          </NavLink>

          <NavLink to="/reportes" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <BarChart2 className="nav-icon" size={20} />
            <span>Reportes</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <NavLink to="/configuracion" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Settings className="nav-icon" size={20} />
            <span>Configuración</span>
          </NavLink>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-header glass-panel">
          <div className="header-search">
            {/* Search bar can go here */}
          </div>
          <div className="header-user">
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginRight: '12px' }}>{usuario}</span>
            <button
              onClick={logout}
              title="Cerrar sesión"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '6px 10px', borderRadius: '8px', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.1)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}
            >
              <LogOut size={16} /> Salir
            </button>
          </div>
        </header>

        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
