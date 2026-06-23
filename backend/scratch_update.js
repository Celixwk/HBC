const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Actualizando precios de habitaciones Standard...');
  await prisma.espacio.updateMany({
    where: { tipo_habitacion: 'standard' },
    data: {
      precio_persona_1: 170000,
      precio_persona_2: 220000,
      capacidad_personas: 4
    }
  });

  console.log('Actualizando precios de habitaciones Deluxe...');
  await prisma.espacio.updateMany({
    where: { tipo_habitacion: 'deluxe' },
    data: {
      precio_persona_1: 200000,
      precio_persona_2: 250000,
      capacidad_personas: 4
    }
  });

  console.log('Actualizando precios de habitaciones Suite...');
  await prisma.espacio.updateMany({
    where: { tipo_habitacion: 'suite' },
    data: {
      precio_persona_1: 250000,
      precio_persona_2: 290000,
      capacidad_personas: 4
    }
  });

  console.log('Actualización completada exitosamente.');
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
