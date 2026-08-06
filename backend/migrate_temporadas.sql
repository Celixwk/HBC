-- ============================================================
-- Migración: Sistema de Temporadas + Precio Histórico Snapshot
-- Fecha: 2026-08-04
-- ============================================================

-- 1. Columnas de precio por temporada en tipo_espacio_config
ALTER TABLE tipo_espacio_config
  ADD COLUMN IF NOT EXISTS precio_base_media       NUMERIC(12,2) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS precio_base_alta        NUMERIC(12,2) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS recargo_pareja_media    NUMERIC(12,2) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS recargo_pareja_alta     NUMERIC(12,2) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS recargo_adicional_media NUMERIC(12,2) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS recargo_adicional_alta  NUMERIC(12,2) DEFAULT NULL;

-- 2. Columnas de snapshot en reserva
ALTER TABLE reserva
  ADD COLUMN IF NOT EXISTS precio_noche_snapshot NUMERIC(12,2) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS temporada_tipo        VARCHAR(10)   DEFAULT NULL;

-- 3. Tabla de temporadas
CREATE TABLE IF NOT EXISTS temporada (
  id             SERIAL PRIMARY KEY,
  nombre         VARCHAR(100) NOT NULL,
  tipo           VARCHAR(10)  NOT NULL CHECK (tipo IN ('alta','media','baja')),
  fecha_inicio   DATE         NOT NULL,
  fecha_fin      DATE         NOT NULL,
  activo         BOOLEAN      NOT NULL DEFAULT TRUE,
  anio           INTEGER,
  fecha_creacion TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_temporada_inicio ON temporada(fecha_inicio);
CREATE INDEX IF NOT EXISTS idx_temporada_fin    ON temporada(fecha_fin);
CREATE INDEX IF NOT EXISTS idx_temporada_anio   ON temporada(anio);

-- 4. Datos iniciales de temporadas Colombia para 2026 y 2027
INSERT INTO temporada (nombre, tipo, fecha_inicio, fecha_fin, activo, anio) VALUES
  ('Fin de año 2025 - Año nuevo 2026',    'alta',  '2025-12-15', '2026-01-15', true, 2026),
  ('Semana Santa 2026',                   'alta',  '2026-03-29', '2026-04-05', true, 2026),
  ('Vacaciones mitad de año 2026',        'alta',  '2026-06-15', '2026-07-15', true, 2026),
  ('Receso escolar octubre 2026',         'media', '2026-10-12', '2026-10-18', true, 2026),
  ('Fin de año 2026 - Año nuevo 2027',    'alta',  '2026-12-15', '2027-01-15', true, 2027),
  ('Semana Santa 2027',                   'alta',  '2027-03-25', '2027-04-01', true, 2027),
  ('Vacaciones mitad de año 2027',        'alta',  '2027-06-15', '2027-07-15', true, 2027),
  ('Receso escolar octubre 2027',         'media', '2027-10-11', '2027-10-17', true, 2027)
ON CONFLICT DO NOTHING;
