require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const MESES_CORTOS = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];

async function main() {
  const today = new Date();
  console.log('today =', today.toString());
  console.log('today.getMonth() =', today.getMonth(), '(', MESES[today.getMonth()], ')');
  console.log('today.getFullYear() =', today.getFullYear());
  console.log('---');

  for (let i = 5; i >= 0; i--) {
    const mesStart = new Date(Date.UTC(today.getFullYear(), today.getMonth() - i, 1));
    const mesEnd   = new Date(Date.UTC(today.getFullYear(), today.getMonth() - i + 1, 0, 23, 59, 59, 999));
    const m = mesStart.getUTCMonth();
    const y = mesStart.getUTCFullYear();
    const label = `${MESES[m]} De ${y}`;

    const count = await prisma.reserva.count({
      where: {
        estado_reserva: { notIn: ['cancelada', 'no_show'] },
        check_in: { gte: mesStart, lte: mesEnd }
      }
    });

    console.log(`i=${i} | mesStart=${mesStart.toISOString()} | m=${m} | label="${label}" | reservas=${count}`);
  }

  await prisma.$disconnect();
  await pool.end();
}
main().catch(e => { console.error(e.message); process.exit(1); });
