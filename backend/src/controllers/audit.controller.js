const prisma = require('../config/prisma');

/**
 * Registra una acción en el audit_log.
 * Se puede llamar desde cualquier controller.
 */
const registrarLog = async (req, accion, descripcion = null, entidad = null, entidad_id = null) => {
  try {
    const id_usuario = req?.user?.id_usuario || null;
    const username = req?.user?.username || req?.user?.usuario || 'sistema';
    const ip = req?.ip || req?.socket?.remoteAddress || null;
    await prisma.audit_log.create({
      data: { id_usuario, username, accion, descripcion, entidad, entidad_id, ip },
    });
  } catch (err) {
    // Log de auditoría nunca debe romper el flujo principal
    console.error('[AuditLog] Error al registrar log:', err.message);
  }
};

const getAuditLogs = async (req, res) => {
  try {
    const { usuario, accion, desde, hasta, limit = 200 } = req.query;
    const where = {};
    if (usuario) where.username = { contains: usuario, mode: 'insensitive' };
    if (accion) where.accion = { contains: accion, mode: 'insensitive' };
    if (desde || hasta) {
      where.fecha = {};
      if (desde) where.fecha.gte = new Date(desde);
      if (hasta) where.fecha.lte = new Date(hasta + 'T23:59:59');
    }
    const logs = await prisma.audit_log.findMany({
      where,
      orderBy: { fecha: 'desc' },
      take: parseInt(limit),
    });
    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el registro de auditoría.' });
  }
};

module.exports = { registrarLog, getAuditLogs };
