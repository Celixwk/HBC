require('dotenv').config();
const prisma = require('./src/config/prisma');

async function main() {
  try {
    // Add new columns for temporadas feature
    await prisma.$executeRawUnsafe(`
      ALTER TABLE reserva 
      ADD COLUMN IF NOT EXISTS precio_noche_snapshot DECIMAL(12,2)
    `);
    console.log('✓ Added precio_noche_snapshot column');

    await prisma.$executeRawUnsafe(`
      ALTER TABLE reserva 
      ADD COLUMN IF NOT EXISTS temporada_tipo VARCHAR(10)
    `);
    console.log('✓ Added temporada_tipo column');

    // Create temporada table if it doesn't exist
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS temporada (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('alta', 'media', 'baja')),
        fecha_inicio DATE NOT NULL,
        fecha_fin DATE NOT NULL,
        activo BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✓ Created temporada table');

    // Add season price columns to tipo_espacio_config if they don't exist
    const cols = [
      ['precio_base_media', 'DECIMAL(12,2)'],
      ['precio_base_alta', 'DECIMAL(12,2)'],
      ['recargo_pareja_media', 'DECIMAL(12,2)'],
      ['recargo_pareja_alta', 'DECIMAL(12,2)'],
      ['recargo_adicional_media', 'DECIMAL(12,2)'],
      ['recargo_adicional_alta', 'DECIMAL(12,2)'],
    ];

    for (const [col, type] of cols) {
      await prisma.$executeRawUnsafe(`
        ALTER TABLE tipo_espacio_config 
        ADD COLUMN IF NOT EXISTS ${col} ${type}
      `);
      console.log(`✓ Added ${col} to tipo_espacio_config`);
    }

    console.log('\n✅ Database migration completed successfully!');
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
