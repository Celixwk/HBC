const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/auth.middleware');
const { getAuditLogs } = require('../controllers/audit.controller');

// Solo el admin puede ver los logs de auditoría
router.get('/', verifyToken, requireRole('admin'), getAuditLogs);

module.exports = router;
