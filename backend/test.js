const prisma = require('./src/config/prisma');

async function test() {
  try {
    const today = new Date();
    const todayStart = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
    const todayEnd = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999));
    
    await prisma.reserva.findMany({
      where: { estado_reserva: { in: ['activa', 'confirmada', 'en_uso'] }, estado_pago: { not: 'pagado' }, check_in: { gte: todayStart, lte: todayEnd } },
      select: { monto_total: true }
    });
    console.log("Query 1 success");

    const reservas = await prisma.reserva.findMany({
      where: { estado_reserva: { in: ['activa', 'confirmada', 'en_uso'] } },
      include: { espacio: { select: { tipo_habitacion: true, tipo_espacio: true } } }
    });
    console.log("Query 2 success", reservas.length);

  } catch (error) {
    console.error("Prisma error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

test();
