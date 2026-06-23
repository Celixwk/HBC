const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:@127.0.0.1:5002/hotel_boutique_db'
});

async function clean() {
  try {
    await client.connect();
    console.log('Connected to database on port 5002');
    
    // Truncate tables with CASCADE to handle foreign keys
    const tables = [
      'reserva',
      'cuenta_espacio',
      'cuenta_persona',
      'huesped',
      'movimiento_inventario',
      'gasto_operativo'
    ];
    
    for (const table of tables) {
      console.log(`Truncating table: ${table}...`);
      await client.query(`TRUNCATE TABLE ${table} CASCADE;`);
      console.log(`Table ${table} truncated successfully.`);
    }
    
    console.log('Database cleaned successfully.');
  } catch (error) {
    console.error('Error cleaning database:', error);
  } finally {
    await client.end();
  }
}

clean();
