-- Crear tabla si no existe (primera vez)
CREATE TABLE IF NOT EXISTS tipo_espacio_config (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) UNIQUE NOT NULL,
  precio_base DECIMAL(12,2) NOT NULL DEFAULT 0,
  recargo_pareja DECIMAL(12,2) NOT NULL DEFAULT 0,
  recargo_adicional DECIMAL(12,2) NOT NULL DEFAULT 0,
  max_personas_adicionales INTEGER NOT NULL DEFAULT 1
);

-- Agregar columna si la tabla ya existía sin ella
ALTER TABLE tipo_espacio_config
ADD COLUMN IF NOT EXISTS max_personas_adicionales INTEGER NOT NULL DEFAULT 1;
