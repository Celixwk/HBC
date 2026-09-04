const prisma = require('../config/prisma');
const { registrarLog } = require('./audit.controller');

/** Abre un nuevo turno de caja para el usuario autenticado */
const abrirCaja = async (req, res) => {
  const { monto_apertura } = req.body;
  const id_usuario = req.user.id_usuario;
  try {
    // Verificar que no haya un turno ya abierto para este usuario
    const turnoActivo = await prisma.turno_caja.findFirst({
      where: { id_usuario, estado: 'abierto' },
    });
    if (turnoActivo) {
      return res.status(409).json({ error: 'Ya tienes un turno de caja abierto.' });
    }
    const turno = await prisma.turno_caja.create({
      data: {
        id_usuario,
        monto_apertura: parseFloat(monto_apertura) || 0,
        estado: 'abierto',
      },
    });
    await registrarLog(req, 'CAJA_APERTURA', `Turno abierto con base de $${monto_apertura}`, 'turno_caja', turno.id_turno);
    res.status(201).json(turno);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al abrir caja.' });
  }
};

/** Devuelve el turno activo del usuario autenticado (si existe) */
const getCajaActiva = async (req, res) => {
  const id_usuario = req.user.id_usuario;
  try {
    const turno = await prisma.turno_caja.findFirst({
      where: { id_usuario, estado: 'abierto' },
      include: { usuario: { select: { nombre_completo: true, username: true } } },
    });
    if (!turno) return res.json(null);

    // Calcular cuánto efectivo/transferencia/tarjeta debería haber (de cuentas pagadas en este turno)
    const pagosDuranteTurno = await prisma.$queryRaw`
      SELECT
        metodo_pago,
        SUM(valor_total) as total
      FROM cuenta_espacio
      WHERE fecha_registro >= ${turno.fecha_apertura}
        AND estado IN ('pagado', 'finalizado')
      GROUP BY metodo_pago
      UNION ALL
      SELECT
        metodo_pago,
        SUM(valor_total) as total
      FROM cuenta_persona
      WHERE fecha_registro >= ${turno.fecha_apertura}
        AND estado IN ('pagado', 'finalizado')
      GROUP BY metodo_pago
    `;
    res.json({ ...turno, pagos_detalle: pagosDuranteTurno });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener caja activa.' });
  }
};

/** Cierra el turno activo registrando lo que el cajero contó físicamente */
const cerrarCaja = async (req, res) => {
  const { monto_real, notas } = req.body;
  const id_usuario = req.user.id_usuario;
  try {
    const turno = await prisma.turno_caja.findFirst({
      where: { id_usuario, estado: 'abierto' },
    });
    if (!turno) return res.status(404).json({ error: 'No tienes un turno de caja abierto.' });

    // Calcular total efectivo del sistema en este turno
    const [efectivoResult] = await prisma.$queryRaw`
      SELECT COALESCE(SUM(valor_total), 0) as total FROM (
        SELECT valor_total FROM cuenta_espacio
          WHERE fecha_registro >= ${turno.fecha_apertura} AND estado IN ('pagado', 'finalizado') AND metodo_pago ILIKE '%efectivo%'
        UNION ALL
        SELECT valor_total FROM cuenta_persona
          WHERE fecha_registro >= ${turno.fecha_apertura} AND estado IN ('pagado', 'finalizado') AND metodo_pago ILIKE '%efectivo%'
      ) sub
    `;
    const montoSistema = parseFloat(turno.monto_apertura) + parseFloat(efectivoResult?.total || 0);
    const montoRealNum = parseFloat(monto_real) || 0;
    const diferencia = montoRealNum - montoSistema;

    const updated = await prisma.turno_caja.update({
      where: { id_turno: turno.id_turno },
      data: {
        fecha_cierre: new Date(),
        monto_sistema: montoSistema,
        monto_real: montoRealNum,
        diferencia,
        estado: 'cerrado',
        notas,
      },
    });
    await registrarLog(req, 'CAJA_CIERRE', `Turno cerrado. Sistema: $${montoSistema} | Real: $${montoRealNum} | Diferencia: $${diferencia}`, 'turno_caja', turno.id_turno);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al cerrar caja.' });
  }
};

/** Historial de todos los turnos (solo admin) */
const getHistorialCaja = async (req, res) => {
  try {
    const { limit = 50 } = req.query;
    const historial = await prisma.turno_caja.findMany({
      orderBy: { fecha_apertura: 'desc' },
      take: parseInt(limit),
      include: { usuario: { select: { nombre_completo: true, username: true } } },
    });
    res.json(historial);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener historial de caja.' });
  }
};

module.exports = { abrirCaja, getCajaActiva, cerrarCaja, getHistorialCaja };
