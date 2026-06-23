import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Loader2 } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { NewSpaceModal } from '../../components/NewSpaceModal/NewSpaceModal';
import { EditSpaceModal } from '../../components/EditSpaceModal/EditSpaceModal';
import './Spaces.css';
import { apiFetch } from '../../utils/apiFetch';

interface Espacio {
  id_espacio: number;
  numero: string;
  tipo_espacio: string;
  tipo_habitacion: string | null;
  capacidad_personas: number | null;
  precio_persona_1: string | null;
  precio_persona_2: string | null;
  precio_adicional: string | null;
  activo: boolean;
  tiene_minibar: boolean;
  estado_limpieza?: string;
}

export const Spaces: React.FC = () => {
  const [spaces, setSpaces] = useState<Espacio[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [editingSpace, setEditingSpace] = useState<Espacio | null>(null);

  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    try {
      setLoading(true);
      const response = await apiFetch('/espacios');
      if (!response.ok) throw new Error('Error al cargar espacios');
      const data = await response.json();
      setSpaces(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDesactivar = async (id: number) => {
    if (!window.confirm('¿Desactivar esta habitación? Puedes reactivarla desde el menú de edición.')) return;
    try {
      await apiFetch(`/espacios/${id}`, { method: 'DELETE' });
      fetchSpaces();
    } catch (error) {
      console.error('Error al desactivar espacio:', error);
    }
  };

  const filteredSpaces = spaces.filter(space =>
    space.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (space.tipo_habitacion && space.tipo_habitacion.toLowerCase().includes(searchTerm.toLowerCase())) ||
    space.tipo_espacio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="spaces-container">
      <div className="spaces-header">
        <div>
          <h1 className="page-title">Habitaciones y Espacios</h1>
          <p className="page-subtitle">Administra el inventario de espacios y sus tarifas</p>
        </div>
        <Button variant="primary" onClick={() => setIsNewModalOpen(true)}>
          <Plus size={18} /> Nuevo Espacio
        </Button>
      </div>

      <div className="spaces-toolbar glass-panel">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar por número o tipo..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center p-8" style={{ minHeight: '300px' }}>
          <Loader2 className="animate-spin text-primary" size={40} />
          <span className="ml-4 text-muted">Cargando espacios...</span>
        </div>
      ) : (
        <div className="spaces-grid">
          {filteredSpaces.map(space => (
            <Card key={space.id_espacio} className="space-card" glass>
              <div className="space-card-header">
                <span className="space-number">{space.numero}</span>
                <span className={`space-status status-${space.activo ? 'activa' : 'mantenimiento'}`}>
                  {space.activo ? 'Activa' : 'Inactiva'}
                </span>
              </div>
              
              <div className="space-card-body">
                <div className="space-info-row">
                  <span className="info-label">Clase:</span>
                  <span className="info-value text-capitalize">{space.tipo_espacio}</span>
                </div>
                {space.tipo_habitacion && (
                  <div className="space-info-row">
                    <span className="info-label">Tipo:</span>
                    <span className="info-value text-capitalize">{space.tipo_habitacion}</span>
                  </div>
                )}
                <div className="space-info-row">
                  <span className="info-label">Capacidad:</span>
                  <span className="info-value">
                    {space.capacidad_personas ? `${space.capacidad_personas} pers.` : 'No def.'}
                  </span>
                </div>
                <div className="space-info-row">
                  <span className="info-label">Precio Base:</span>
                  <span className="info-value text-gradient font-bold">
                    {space.precio_persona_1 || space.precio_persona_2 
                      ? `$${parseInt(space.precio_persona_1 || space.precio_persona_2 || '0').toLocaleString()}` 
                      : <span className="text-muted text-sm font-normal">Por definir</span>}
                  </span>
                </div>
              </div>

              <div className="space-card-footer">
                {space.tiene_minibar ? (
                  <Button variant="secondary" size="sm">Minibar</Button>
                ) : (
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Sin minibar</span>
                )}
                <div className="action-buttons">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="icon-btn text-info"
                    onClick={() => setEditingSpace(space)}
                    title="Editar habitación"
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`icon-btn ${space.estado_limpieza === 'sucia' ? 'text-warning' : 'text-success'}`}
                    title={space.estado_limpieza === 'sucia' ? 'Marcar Limpia' : 'Marcar Sucia'}
                    onClick={async () => {
                      try {
                        const newEstado = space.estado_limpieza === 'sucia' ? 'limpia' : 'sucia';
                        await apiFetch(`/espacios/${space.id_espacio}`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ estado_limpieza: newEstado })
                        });
                        fetchSpaces();
                      } catch (err) {
                        console.error('Error actualizando limpieza', err);
                      }
                    }}
                  >
                    <span style={{ fontSize: '10px', fontWeight: 'bold' }}>
                      {space.estado_limpieza === 'sucia' ? 'Sucia' : 'Limpia'}
                    </span>
                  </Button>
                  <Button variant="ghost" size="sm" className="icon-btn text-danger" title="Desactivar habitación" onClick={() => handleDesactivar(space.id_espacio)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {filteredSpaces.length === 0 && (
            <div className="col-span-full text-center p-8 text-muted">
              No se encontraron espacios que coincidan con la búsqueda.
            </div>
          )}
        </div>
      )}

      <NewSpaceModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSuccess={fetchSpaces}
      />

      <EditSpaceModal
        isOpen={editingSpace !== null}
        onClose={() => setEditingSpace(null)}
        onSuccess={() => { fetchSpaces(); setEditingSpace(null); }}
        space={editingSpace}
      />
    </div>
  );
};
