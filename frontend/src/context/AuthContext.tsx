import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface AuthContextType {
  token: string | null;
  usuario: string | null;
  login: (usuario: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('hb_token'));
  const [usuario, setUsuario] = useState<string | null>(() => localStorage.getItem('hb_user'));

  const login = async (usr: string, password: string) => {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario: usr, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al iniciar sesión');
    localStorage.setItem('hb_token', data.token);
    localStorage.setItem('hb_user', data.usuario);
    setToken(data.token);
    setUsuario(data.usuario);
  };

  const logout = useCallback(() => {
    localStorage.removeItem('hb_token');
    localStorage.removeItem('hb_user');
    setToken(null);
    setUsuario(null);
  }, []);

  // Verificar sesión al arrancar
  useEffect(() => {
    if (!token) return;
    fetch('http://localhost:5000/api/auth/verify', {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(res => {
      if (!res.ok) logout();
    }).catch(() => logout());
  }, []);

  return (
    <AuthContext.Provider value={{ token, usuario, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
