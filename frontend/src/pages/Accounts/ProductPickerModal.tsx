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
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: '16px'
    }}>
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border-light)', borderRadius: '16px',
        padding: '24px', width: '100%', maxWidth: '600px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '90vh'
      }}>
        <h3 style={{ margin: '0 0 8px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Package size={18} /> Seleccionar Producto del Inventario
        </h3>
        
        {/* Búsqueda y Filtros */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 200px', position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                padding: '10px 12px 10px 38px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(255,255,255,0.03)',
                color: '#ffffff',
                boxSizing: 'border-box',
                outline: 'none',
                fontSize: '14px'
              }}
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              backgroundColor: '#1e1e24',
              color: '#ffffff',
              flex: '0 1 auto',
              minWidth: '160px',
              outline: 'none',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            <option value="" style={{ background: '#1e1e24', color: '#fff' }}>Todas las categorías</option>
            {categories.map(cat => (
              <option key={cat} value={cat} style={{ background: '#1e1e24', color: '#fff' }}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Lista de Productos */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          minHeight: '300px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          {loading ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>Cargando productos...</div>
          ) : filteredProducts.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No se encontraron productos{searchTerm ? ' con esa búsqueda' : ''}.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead style={{ position: 'sticky', top: 0, background: '#1a1a1f', zIndex: 1, boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
                <tr>
                  <th style={{ textAlign: 'left', padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.5px' }}>PRODUCTO</th>
                  <th style={{ textAlign: 'center', padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.5px' }}>STOCK</th>
                  <th style={{ textAlign: 'right', padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.5px' }}>PRECIO</th>
                  <th style={{ textAlign: 'center', padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', width: '60px' }}></th>
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
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      <td style={{ padding: '16px' }}>
                        <div style={{ fontWeight: 600, color: '#ffffff', fontSize: '14px', marginBottom: '4px' }}>{p.nombre}</div>
                        <div style={{ fontSize: '11px', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Package size={12} opacity={0.7} /> {p.categoria}
                        </div>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <span style={{ 
                          padding: '4px 8px', 
                          borderRadius: '12px', 
                          fontSize: '11px', 
                          fontWeight: 600,
                          background: isLow ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)',
                          color: isLow ? '#f87171' : '#34d399',
                          border: `1px solid ${isLow ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'}`
                        }}>
                          {stock} {p.unidad_medida || 'ud'}
                        </span>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'right', fontWeight: 600, color: '#34d399', fontSize: '14px' }}>
                        ${parseFloat(p.precio_venta || 0).toLocaleString()}
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <button 
                          style={{
                            background: 'var(--primary)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            width: '32px',
                            height: '32px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'transform 0.2s'
                          }}
                          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                          <Plus size={16} />
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
