import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import { Login } from './pages/Login/Login';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Reservations } from './pages/Reservations/Reservations';
import { Spaces } from './pages/Spaces/Spaces';
import { Guests } from './pages/Guests/Guests';
import { Accounts } from './pages/Accounts/Accounts';
import { Settings } from './pages/Settings/Settings';
import { Providers } from './pages/Providers/Providers';
import { Inventory } from './pages/Inventory/Inventory';
import { Gastos } from './pages/Gastos/Gastos';
import { Reportes } from './pages/Reportes/Reportes';

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="reservas" element={<Reservations />} />
        <Route path="habitaciones" element={<Spaces />} />
        <Route path="huespedes" element={<Guests />} />
        <Route path="cuentas" element={<Accounts />} />
        <Route path="configuracion" element={<Settings />} />
        <Route path="proveedores" element={<Providers />} />
        <Route path="inventario" element={<Inventory />} />
        <Route path="gastos" element={<Gastos />} />
        <Route path="reportes" element={<Reportes />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/*" element={<ProtectedRoutes />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

const LoginRoute = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <Login />;
};

export default App;
