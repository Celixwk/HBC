import React, { useState, useEffect, useMemo } from 'react';

import { Search, Package, Plus } from 'lucide-react';
import { apiFetch } from '../../utils/apiFetch';

interface ProductPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (product: any) => void;
}

export const ProductPickerModal: React.FC<ProductPickerModalProps> = ({
  isOpen,
  onClose,
  onSelect
}) => {
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      apiFetch('/inventario/productos')
        .then(res => res.json())
        .then(data => {
          setProductos(Array.isArray(data) ? data.filter(p => p.activo) : []);
        })
        .catch(err => console.error('Error fetching productos:', err))
        .finally(() => setLoading(false));
    } else {
      setSearchTerm('');
      setSelectedCategory('');
    }
  }, [isOpen]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    productos.forEach(p => {
      if (p.categoria) cats.add(p.categoria);
    });
    return Array.from(cats).sort();
  }, [productos]);

  const filteredProducts = useMemo(() => {
    return productos.filter(p => {
      const matchSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = selectedCategory ? p.categoria === selectedCategory : true;
      return matchSearch && matchCat;
    });
  }, [productos, searchTerm, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 99999
    }}>
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border-light)', borderRadius: '16px',
        padding: '24px', minWidth: '500px', maxWidth: '600px', boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '400px'
      }}>
        <h3 style={{ margin: '0 0 8px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Package size={18} /> Seleccionar Producto del Inventario
        </h3>
        
        {/* Búsqueda y Filtros */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Buscar producto por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '8px',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--surface-2)',
                color: 'var(--text-primary)',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border-light)',
              backgroundColor: 'var(--surface-2)',
              color: 'var(--text-primary)',
              minWidth: '140px',
              outline: 'none'
            }}
          >
            <option value="">Todas las categorías</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Lista de Productos */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          maxHeight: '400px',
          background: 'var(--surface-2)',
          borderRadius: '12px',
          border: '1px solid var(--border-light)'
        }}>
          {loading ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>Cargando productos...</div>
          ) : filteredProducts.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No se encontraron productos{searchTerm ? ' con esa búsqueda' : ''}.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead style={{ position: 'sticky', top: 0, background: 'var(--surface)', zIndex: 1 }}>
                <tr>
                  <th style={{ textAlign: 'left', padding: '10px 16px', borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)', fontWeight: 600 }}>Producto</th>
                  <th style={{ textAlign: 'center', padding: '10px 16px', borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)', fontWeight: 600 }}>Stock</th>
                  <th style={{ textAlign: 'right', padding: '10px 16px', borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)', fontWeight: 600 }}>Precio</th>
                  <th style={{ textAlign: 'center', padding: '10px 16px', borderBottom: '1px solid var(--border-light)', width: '60px' }}></th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(p => {
                  const stock = parseFloat(p.stock_actual);
                  const isLow = stock <= parseFloat(p.stock_minimo || '0');
                  
                  return (
                    <tr 
                      key={p.id_producto} 
                      onClick={() => onSelect(p)}
                      style={{ 
                        borderBottom: '1px solid var(--border-light)',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '2px' }}>{p.nombre}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}><Package size={10} style={{ display: 'inline', marginRight: 4 }} />{p.categoria}</div>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <span style={{ 
                          padding: '2px 6px', 
                          borderRadius: '12px', 
                          fontSize: '11px', 
                          fontWeight: 600,
                          background: isLow ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
                          color: isLow ? '#ef4444' : '#10b981'
                        }}>
                          {stock} {p.unidad_medida || 'ud'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, color: 'var(--primary)' }}>
                        ${parseFloat(p.precio_venta || 0).toLocaleString()}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <button 
                          style={{
                            background: 'var(--primary)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '4px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Plus size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '8px' }}>
          <button 
            onClick={onClose}
            style={{ 
              padding: '8px 20px', 
              borderRadius: '8px', 
              border: '1px solid var(--border-light)', 
              background: 'transparent', 
              color: 'var(--text-muted)', 
              cursor: 'pointer' 
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
