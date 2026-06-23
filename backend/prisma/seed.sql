-- Seed file generated automatically
-- Contains: room configuration, hotel config, space types, gasto categories
-- Does NOT contain: reservations, guests, bills, inventory movements
SET client_encoding = 'UTF8';
BEGIN;

-- Habitaciones/Espacios
INSERT INTO espacio (id_espacio, numero, tipo_espacio, tipo_habitacion, capacidad_personas, precio_persona_1, precio_persona_2, precio_adicional, estado_limpieza, activo, tiene_minibar) VALUES (1, '101', 'habitacion', 'standard', NULL, NULL, NULL, 80000.00, 'limpia', true, false) ON CONFLICT (id_espacio) DO NOTHING;
INSERT INTO espacio (id_espacio, numero, tipo_espacio, tipo_habitacion, capacidad_personas, precio_persona_1, precio_persona_2, precio_adicional, estado_limpieza, activo, tiene_minibar) VALUES (2, '102', 'habitacion', 'standard', NULL, NULL, NULL, 80000.00, 'limpia', true, false) ON CONFLICT (id_espacio) DO NOTHING;
INSERT INTO espacio (id_espacio, numero, tipo_espacio, tipo_habitacion, capacidad_personas, precio_persona_1, precio_persona_2, precio_adicional, estado_limpieza, activo, tiene_minibar) VALUES (3, '103', 'habitacion', 'deluxe', 4, NULL, NULL, 80000.00, 'limpia', true, true) ON CONFLICT (id_espacio) DO NOTHING;
INSERT INTO espacio (id_espacio, numero, tipo_espacio, tipo_habitacion, capacidad_personas, precio_persona_1, precio_persona_2, precio_adicional, estado_limpieza, activo, tiene_minibar) VALUES (4, '104', 'habitacion', 'deluxe', 4, NULL, NULL, 80000.00, 'limpia', true, true) ON CONFLICT (id_espacio) DO NOTHING;
INSERT INTO espacio (id_espacio, numero, tipo_espacio, tipo_habitacion, capacidad_personas, precio_persona_1, precio_persona_2, precio_adicional, estado_limpieza, activo, tiene_minibar) VALUES (5, '105', 'habitacion', 'suite', 4, NULL, NULL, 80000.00, 'limpia', true, true) ON CONFLICT (id_espacio) DO NOTHING;
INSERT INTO espacio (id_espacio, numero, tipo_espacio, tipo_habitacion, capacidad_personas, precio_persona_1, precio_persona_2, precio_adicional, estado_limpieza, activo, tiene_minibar) VALUES (6, '106', 'habitacion', 'suite', 4, NULL, NULL, 80000.00, 'limpia', true, true) ON CONFLICT (id_espacio) DO NOTHING;
INSERT INTO espacio (id_espacio, numero, tipo_espacio, tipo_habitacion, capacidad_personas, precio_persona_1, precio_persona_2, precio_adicional, estado_limpieza, activo, tiene_minibar) VALUES (7, '201', 'habitacion', 'deluxe', 4, NULL, NULL, 80000.00, 'limpia', true, true) ON CONFLICT (id_espacio) DO NOTHING;
INSERT INTO espacio (id_espacio, numero, tipo_espacio, tipo_habitacion, capacidad_personas, precio_persona_1, precio_persona_2, precio_adicional, estado_limpieza, activo, tiene_minibar) VALUES (8, '202', 'habitacion', 'standard', NULL, NULL, NULL, 80000.00, 'limpia', true, false) ON CONFLICT (id_espacio) DO NOTHING;
INSERT INTO espacio (id_espacio, numero, tipo_espacio, tipo_habitacion, capacidad_personas, precio_persona_1, precio_persona_2, precio_adicional, estado_limpieza, activo, tiene_minibar) VALUES (9, '203', 'habitacion', 'deluxe', 4, NULL, NULL, 80000.00, 'limpia', true, true) ON CONFLICT (id_espacio) DO NOTHING;
INSERT INTO espacio (id_espacio, numero, tipo_espacio, tipo_habitacion, capacidad_personas, precio_persona_1, precio_persona_2, precio_adicional, estado_limpieza, activo, tiene_minibar) VALUES (10, '204', 'habitacion', 'standard', NULL, NULL, NULL, 80000.00, 'limpia', true, false) ON CONFLICT (id_espacio) DO NOTHING;
INSERT INTO espacio (id_espacio, numero, tipo_espacio, tipo_habitacion, capacidad_personas, precio_persona_1, precio_persona_2, precio_adicional, estado_limpieza, activo, tiene_minibar) VALUES (11, '205', 'habitacion', 'standard', NULL, NULL, NULL, 80000.00, 'limpia', true, false) ON CONFLICT (id_espacio) DO NOTHING;
INSERT INTO espacio (id_espacio, numero, tipo_espacio, tipo_habitacion, capacidad_personas, precio_persona_1, precio_persona_2, precio_adicional, estado_limpieza, activo, tiene_minibar) VALUES (12, '206', 'habitacion', 'standard', NULL, NULL, NULL, 80000.00, 'limpia', true, false) ON CONFLICT (id_espacio) DO NOTHING;
INSERT INTO espacio (id_espacio, numero, tipo_espacio, tipo_habitacion, capacidad_personas, precio_persona_1, precio_persona_2, precio_adicional, estado_limpieza, activo, tiene_minibar) VALUES (13, '1', 'salon', NULL, NULL, NULL, NULL, 80000.00, 'limpia', true, false) ON CONFLICT (id_espacio) DO NOTHING;
SELECT setval('espacio_id_espacio_seq', (SELECT MAX(id_espacio) FROM espacio));

-- Configuracion del hotel
INSERT INTO configuracion_hotel (id, nombre_hotel, direccion, telefono, nit, email, ciudad, hora_check_in, hora_check_out) VALUES (1, 'Hotel Boutique', NULL, NULL, NULL, NULL, NULL, '15:00', '13:00') ON CONFLICT (id) DO NOTHING;

-- Tipos de espacio y precios
INSERT INTO tipo_espacio_config (id, nombre, precio_base, recargo_pareja, recargo_adicional, max_personas_adicionales) VALUES (1, 'Standard', 170000.00, 50000.00, 80000.00, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO tipo_espacio_config (id, nombre, precio_base, recargo_pareja, recargo_adicional, max_personas_adicionales) VALUES (2, 'Deluxe', 170000.00, 50000.00, 80000.00, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO tipo_espacio_config (id, nombre, precio_base, recargo_pareja, recargo_adicional, max_personas_adicionales) VALUES (3, 'Suite', 170000.00, 50000.00, 80000.00, 1) ON CONFLICT (id) DO NOTHING;
SELECT setval('tipo_espacio_config_id_seq', (SELECT MAX(id) FROM tipo_espacio_config));

-- Categorias de gastos
INSERT INTO categoria_gasto (id, nombre, activo) VALUES (1, 'Servicios PÃºblicos', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO categoria_gasto (id, nombre, activo) VALUES (2, 'Mantenimiento', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO categoria_gasto (id, nombre, activo) VALUES (3, 'NÃ³mina', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO categoria_gasto (id, nombre, activo) VALUES (4, 'Arriendo', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO categoria_gasto (id, nombre, activo) VALUES (5, 'Marketing', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO categoria_gasto (id, nombre, activo) VALUES (6, 'Otros', true) ON CONFLICT (id) DO NOTHING;
SELECT setval('categoria_gasto_id_seq', (SELECT MAX(id) FROM categoria_gasto));

-- Categorias de inventario
INSERT INTO categoria_inventario (id_categoria, nombre, activo) VALUES (1, 'Bebidas', true) ON CONFLICT (id_categoria) DO NOTHING;
SELECT setval('categoria_inventario_id_categoria_seq', (SELECT MAX(id_categoria) FROM categoria_inventario));

COMMIT;
