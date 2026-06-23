const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Connect to the SYSTEM postgres (the one used in development)
const client = new Client({
  host: '127.0.0.1',
  port: 5432,
  user: 'postgres',
  password: 'admin',
  database: 'postgres'
});

async function exportSeed() {
  try {
    await client.connect();
    console.log('Connected to hotel_boutique_db on port 54320');

    let sql = `-- Seed file generated automatically
-- Contains: room configuration, hotel config, space types, gasto categories
-- Does NOT contain: reservations, guests, bills, inventory movements
SET client_encoding = 'UTF8';
BEGIN;

`;

    // Export espacios (habitaciones)
    const espacios = await client.query(`
      SELECT id_espacio, numero, tipo_espacio, tipo_habitacion, capacidad_personas,
             precio_persona_1, precio_persona_2, precio_adicional, estado_limpieza, activo, tiene_minibar
      FROM espacio ORDER BY id_espacio
    `);
    if (espacios.rows.length > 0) {
      sql += `-- Habitaciones/Espacios\n`;
      for (const r of espacios.rows) {
        sql += `INSERT INTO espacio (id_espacio, numero, tipo_espacio, tipo_habitacion, capacidad_personas, precio_persona_1, precio_persona_2, precio_adicional, estado_limpieza, activo, tiene_minibar) VALUES (${r.id_espacio}, ${JSON.stringify(r.numero)}, ${JSON.stringify(r.tipo_espacio)}, ${r.tipo_habitacion ? JSON.stringify(r.tipo_habitacion) : 'NULL'}, ${r.capacidad_personas ?? 'NULL'}, ${r.precio_persona_1 ?? 'NULL'}, ${r.precio_persona_2 ?? 'NULL'}, ${r.precio_adicional ?? 'NULL'}, ${JSON.stringify(r.estado_limpieza ?? 'limpia')}, ${r.activo}, ${r.tiene_minibar}) ON CONFLICT (id_espacio) DO NOTHING;\n`;
      }
      sql += `SELECT setval('espacio_id_espacio_seq', (SELECT MAX(id_espacio) FROM espacio));\n\n`;
    }

    // Export configuracion_hotel
    const config = await client.query(`SELECT * FROM configuracion_hotel ORDER BY id`);
    if (config.rows.length > 0) {
      sql += `-- Configuracion del hotel\n`;
      for (const r of config.rows) {
        sql += `INSERT INTO configuracion_hotel (id, nombre_hotel, direccion, telefono, nit, email, ciudad, hora_check_in, hora_check_out) VALUES (${r.id}, ${r.nombre_hotel ? JSON.stringify(r.nombre_hotel) : 'NULL'}, ${r.direccion ? JSON.stringify(r.direccion) : 'NULL'}, ${r.telefono ? JSON.stringify(r.telefono) : 'NULL'}, ${r.nit ? JSON.stringify(r.nit) : 'NULL'}, ${r.email ? JSON.stringify(r.email) : 'NULL'}, ${r.ciudad ? JSON.stringify(r.ciudad) : 'NULL'}, ${r.hora_check_in ? JSON.stringify(r.hora_check_in) : "'15:00'"}, ${r.hora_check_out ? JSON.stringify(r.hora_check_out) : "'13:00'"}) ON CONFLICT (id) DO NOTHING;\n`;
      }
      sql += '\n';
    }

    // Export tipo_espacio_config
    const tipos = await client.query(`SELECT * FROM tipo_espacio_config ORDER BY id`);
    if (tipos.rows.length > 0) {
      sql += `-- Tipos de espacio y precios\n`;
      for (const r of tipos.rows) {
        sql += `INSERT INTO tipo_espacio_config (id, nombre, precio_base, recargo_pareja, recargo_adicional, max_personas_adicionales) VALUES (${r.id}, ${JSON.stringify(r.nombre)}, ${r.precio_base}, ${r.recargo_pareja}, ${r.recargo_adicional}, ${r.max_personas_adicionales}) ON CONFLICT (id) DO NOTHING;\n`;
      }
      sql += `SELECT setval('tipo_espacio_config_id_seq', (SELECT MAX(id) FROM tipo_espacio_config));\n\n`;
    }

    // Export categoria_gasto
    const catGastos = await client.query(`SELECT * FROM categoria_gasto ORDER BY id`);
    if (catGastos.rows.length > 0) {
      sql += `-- Categorias de gastos\n`;
      for (const r of catGastos.rows) {
        sql += `INSERT INTO categoria_gasto (id, nombre, activo) VALUES (${r.id}, ${JSON.stringify(r.nombre)}, ${r.activo}) ON CONFLICT (id) DO NOTHING;\n`;
      }
      sql += `SELECT setval('categoria_gasto_id_seq', (SELECT MAX(id) FROM categoria_gasto));\n\n`;
    }

    // Export categoria_inventario
    const catInv = await client.query(`SELECT * FROM categoria_inventario ORDER BY id_categoria`);
    if (catInv.rows.length > 0) {
      sql += `-- Categorias de inventario\n`;
      for (const r of catInv.rows) {
        sql += `INSERT INTO categoria_inventario (id_categoria, nombre, activo) VALUES (${r.id_categoria}, ${JSON.stringify(r.nombre)}, ${r.activo}) ON CONFLICT (id_categoria) DO NOTHING;\n`;
      }
      sql += `SELECT setval('categoria_inventario_id_categoria_seq', (SELECT MAX(id_categoria) FROM categoria_inventario));\n\n`;
    }

    sql += `COMMIT;\n`;

    const outPath = path.join(__dirname, 'prisma', 'seed.sql');
    fs.writeFileSync(outPath, sql, 'utf8');
    console.log('✅ Seed SQL generated at:', outPath);
    console.log('Rows exported:');
    console.log('  - espacios:', espacios.rows.length);
    console.log('  - configuracion_hotel:', config.rows.length);
    console.log('  - tipo_espacio_config:', tipos.rows.length);
    console.log('  - categoria_gasto:', catGastos.rows.length);
    console.log('  - categoria_inventario:', catInv.rows.length);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.end();
  }
}

exportSeed();
