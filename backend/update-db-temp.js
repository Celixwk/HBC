require('dotenv').config();
const prisma = require('./src/config/prisma');

async function main() {
  await prisma.$executeRawUnsafe('CREATE TABLE IF NOT EXISTS origen_reserva (id_origen SERIAL NOT NULL, nombre VARCHAR(50) NOT NULL UNIQUE, activo BOOLEAN NOT NULL DEFAULT true, CONSTRAINT origen_reserva_pkey PRIMARY KEY (id_origen));');
  await prisma.$executeRawUnsafe('ALTER TABLE reserva ADD COLUMN IF NOT EXISTS origen VARCHAR(50) NOT NULL DEFAULT \'Propia\';');
  await prisma.$executeRawUnsafe('INSERT INTO origen_reserva (nombre, activo) VALUES (\'Propia\', true) ON CONFLICT (nombre) DO NOTHING;');
  console.log('DB Updated');
}
main().catch(console.error).finally(() => prisma.$disconnect());
