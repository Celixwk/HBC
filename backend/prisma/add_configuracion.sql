CREATE TABLE IF NOT EXISTS configuracion_hotel (
  id               SERIAL PRIMARY KEY,
  nombre_hotel     VARCHAR(200) DEFAULT 'Hotel Boutique',
  direccion        VARCHAR(300),
  telefono         VARCHAR(50),
  nit              VARCHAR(50),
  email            VARCHAR(100),
  ciudad           VARCHAR(100),
  fecha_actualizacion TIMESTAMP DEFAULT now()
);

-- Insert default row if empty
INSERT INTO configuracion_hotel (nombre_hotel)
SELECT 'Hotel Boutique'
WHERE NOT EXISTS (SELECT 1 FROM configuracion_hotel);
