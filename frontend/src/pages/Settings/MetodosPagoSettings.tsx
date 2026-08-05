import { useState, useEffect } from 'react';
import { Button } from '../../components/Button/Button';
import { Plus, Trash2, Edit2, CreditCard } from 'lucide-react';

export const MetodosPagoSettings = () => {
  const [metodos, setMetodos] = useState<string[]>([]);
  const [nuevoMetodo, setNuevoMetodo] = useState('');
  const [editando, setEditando] = useState<{ index: number, valor: string } | null>(null);

  useEffect(() => {
    const guardados = localStorage.getItem('hbc_metodos_pago');
    if (guardados) {
      setMetodos(JSON.parse(guardados));
    } else {
      // Valores por defecto
      const porDefecto = ['Efectivo', 'Tarjeta', 'Transferencia', 'Nequi', 'Daviplata', 'Otro'];
      setMetodos(porDefecto);
      localStorage.setItem('hbc_metodos_pago', JSON.stringify(porDefecto));
    }
  }, []);

  const handleAgregar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoMetodo.trim()) return;
    
    if (metodos.includes(nuevoMetodo.trim())) {
      alert('Este método de pago ya existe.');
      return;
    }

    const actualizados = [...metodos, nuevoMetodo.trim()];
    setMetodos(actualizados);
    localStorage.setItem('hbc_metodos_pago', JSON.stringify(actualizados));
    setNuevoMetodo('');
  };

  const handleEliminar = (index: number) => {
    const actualizados = metodos.filter((_, i) => i !== index);
    setMetodos(actualizados);
    localStorage.setItem('hbc_metodos_pago', JSON.stringify(actualizados));
  };

  const handleGuardarEdicion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editando || !editando.valor.trim()) return;

    const actualizados = [...metodos];
    actualizados[editando.index] = editando.valor.trim();
    setMetodos(actualizados);
    localStorage.setItem('hbc_metodos_pago', JSON.stringify(actualizados));
    setEditando(null);
  };

  return (
    <div className="settings-section" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="settings-section-title" style={{ marginBottom: '8px' }}>
        <CreditCard size={16} /> Métodos de Pago
      </div>
      <p className="text-muted" style={{ marginBottom: '24px', fontSize: '13px' }}>
        Administra las opciones que aparecerán en la lista de métodos de pago al finalizar una reserva o registrar un gasto.
      </p>

      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <form onSubmit={handleAgregar} style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', marginBottom: '24px', maxWidth: '500px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>Nuevo método de pago</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ej. Bitcoin, Zelle, etc."
              value={nuevoMetodo}
              onChange={(e) => setNuevoMetodo(e.target.value)}
            />
          </div>
          <Button type="submit" variant="primary" style={{ padding: '10px 16px', height: '42px' }}>
            <Plus size={16} /> Agregar
          </Button>
        </form>

        <div className="list-container" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {metodos.map((metodo, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-medium)', transition: 'all 0.2s' }}>
              {editando?.index === index ? (
                <form onSubmit={handleGuardarEdicion} style={{ display: 'flex', gap: '10px', flex: 1, maxWidth: '400px' }}>
                  <input
                    type="text"
                    className="form-input"
                    value={editando.valor}
                    onChange={(e) => setEditando({ ...editando, valor: e.target.value })}
                    autoFocus
                    style={{ flex: 1 }}
                  />
                  <Button type="submit" variant="primary" size="sm">Guardar</Button>
                  <Button type="button" variant="ghost" size="sm" onClick={() => setEditando(null)}>Cancelar</Button>
                </form>
              ) : (
                <>
                  <span style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '14px' }}>{metodo}</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      className="icon-action edit"
                      onClick={() => setEditando({ index, valor: metodo })}
                      title="Editar"
                      style={{ color: 'var(--primary)' }}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      className="icon-action delete"
                      onClick={() => handleEliminar(index)}
                      title="Eliminar"
                      style={{ color: '#ef4444' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
          {metodos.length === 0 && (
            <p className="text-muted" style={{ textAlign: 'center', padding: '20px' }}>No hay métodos de pago configurados.</p>
          )}
        </div>
      </div>
    </div>
  );
};
