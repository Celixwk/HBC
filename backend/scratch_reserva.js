const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Creando huésped de prueba...');
  let huesped = await prisma.huesped.findFirst();
  if (!huesped) {
    huesped = await prisma.huesped.create({
      data: {
        tipo_documento: 'CC',
        documento: '1234567890',
        nombre_completo: 'Juan Pérez',
        telefono: '3001234567',
        procedencia: 'Colombia'
      }
    });
  }

  console.log('Creando reserva de prueba en habitación 101...');
  const espacio = await prisma.espacio.findUnique({ where: { numero: '101' } });
  
  if (espacio && huesped) {
    const hoy = new Date();
    const manana = new Date();
    manana.setDate(hoy.getDate() + 2);

    await prisma.reserva.create({
      data: {
        id_huesped: huesped.id_huesped,
        id_espacio: espacio.id_espacio,
        check_in: hoy,
        check_out: manana,
        estado_reserva: 'activa',
        monto_total: 170000 * 2,
        anotaciones: 'Reserva de prueba generada automáticamente',
        cantidad_adultos: 2
      }
    });
    console.log('Reserva creada exitosamente.');
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
