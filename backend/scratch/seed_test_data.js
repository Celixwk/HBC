require('dotenv').config();
const prisma = require('../src/config/prisma');

async function run() {
  console.log('Seeding test data...');

  // 1. Create Guests (if needed)
  let huesped1 = await prisma.huesped.findFirst({ where: { documento: '1001' } });
  if (!huesped1) {
    huesped1 = await prisma.huesped.create({
      data: { nombre_completo: 'Carlos Test', documento: '1001', tipo_documento: 'CC', telefono: '300123' }
    });
  }

  let huesped2 = await prisma.huesped.findFirst({ where: { documento: '1002' } });
  if (!huesped2) {
    huesped2 = await prisma.huesped.create({
      data: { nombre_completo: 'Maria Prueba', documento: '1002', tipo_documento: 'CC', telefono: '300456' }
    });
  }

  // 2. Create 5 Reservations
  console.log('Creating 5 reservations...');
  for (let i = 1; i <= 5; i++) {
    const espacio = await prisma.espacio.findFirst({ skip: i % 2 }); // pick a room
    if (!espacio) continue;

    await prisma.reserva.create({
      data: {
        id_huesped: i % 2 === 0 ? huesped2.id_huesped : huesped1.id_huesped,
        id_espacio: espacio.id_espacio,
        check_in: new Date(),
        check_out: new Date(Date.now() + 86400000 * 2),
        cantidad_adultos: 2,
        cantidad_ninos: 0,
        monto_total: 150000 + (i * 10000),
        estado_reserva: i % 2 === 0 ? 'activa' : 'en_uso', // Some active, some checked-in
        estado_pago: 'pendiente',
        tipo_reserva: 'alojamiento',
        anotaciones: `Reserva de prueba ${i}`
      }
    });
  }

  // 3. Create 5 Person Charges
  console.log('Creating 5 person charges...');
  for (let i = 1; i <= 5; i++) {
    await prisma.cuenta_persona.create({
      data: {
        nombre_persona: `Persona Extra ${i}`,
        descripcion: `Consumo en bar ${i}`,
        cantidad: 1,
        valor_unitario: 15000 * i,
        estado: 'pendiente'
      }
    });
  }

  // 4. Create 10 Expenses
  console.log('Creating 10 expenses...');
  let categoria = await prisma.categoria_gasto.findFirst();
  if (!categoria) {
    categoria = await prisma.categoria_gasto.create({
      data: { nombre: 'General', tipo: 'operativo' }
    });
  }

  for (let i = 1; i <= 10; i++) {
    await prisma.gasto_operativo.create({
      data: {
        categoria: 'Mantenimiento',
        descripcion: `Gasto de prueba ${i} - ${i % 2 === 0 ? 'Cafeteria' : 'Aseo'}`,
        monto: 25000 + (i * 2000),
        fecha: new Date(),
        proveedor_nombre: 'Proveedor Genérico',
        comprobante: null
      }
    });
  }

  console.log('Test data seeded successfully!');
}

run()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
