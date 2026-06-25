import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Hotel, Eye, EyeOff, Loader2 } from 'lucide-react';
import './Login.css';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(usuario, password);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card glass-panel">
        <div className="login-logo">
          <Hotel size={36} style={{ color: 'var(--primary)' }} />
        </div>
        <h1 className="login-title">Hotel Boutique</h1>
        <p className="login-subtitle">Sistema de Gestión</p>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}

          <div className="login-field">
            <label htmlFor="usuario">Usuario</label>
            <input
              id="usuario"
              type="text"
              value={usuario}
              onChange={e => setUsuario(e.target.value)}
              required
              autoFocus
              className="form-input"
              placeholder="admin"
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Contraseña</label>
            <div className="login-pass-wrapper">
              <input
                id="password"
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="form-input"
                placeholder="••••••••"
              />
              <button type="button" className="toggle-pass" onClick={() => setShowPass(v => !v)}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? <Loader2 size={18} className="animate-spin" /> : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};
