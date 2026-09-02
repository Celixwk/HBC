// Load .env file only if DATABASE_URL is not already set (e.g. by Electron)
if (!process.env.DATABASE_URL) {
  require('dotenv').config();
}

const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');
const rateLimit = require('express-rate-limit');

// Import routes
const authRoutes         = require('./routes/auth.routes');
const espaciosRoutes     = require('./routes/espacios.routes');
const reservasRoutes     = require('./routes/reservas.routes');
const huespedesRoutes    = require('./routes/huespedes.routes');
const cuentasRoutes      = require('./routes/cuentas.routes');
const configuracionRoutes = require('./routes/configuracion.routes');
const dashboardRoutes    = require('./routes/dashboard.routes');
const proveedoresRoutes  = require('./routes/proveedores.routes');
const inventarioRoutes   = require('./routes/inventario.routes');
const gastosRoutes       = require('./routes/gastos.routes');
const reportesRoutes     = require('./routes/reportes.routes');
const temporadasRoutes   = require('./routes/temporadas.routes');
// ── Nuevas rutas (Fase 2-4) ──────────────────────────────────────────────────
const usuariosRoutes     = require('./routes/usuarios.routes');
const auditoriaRoutes    = require('./routes/auditoria.routes');
const cajaRoutes         = require('./routes/caja.routes');
const apiPublicaRoutes = require('./routes/api_publica.routes');
const { sincronizarTodosLosICal } = require('./controllers/ical.controller');

const { verifyToken } = require('./middleware/auth.middleware');
const { seedAdminIfNeeded } = require('./controllers/usuario.controller');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── FASE 1: Seguridad ────────────────────────────────────────────────────────

// Protección de cabeceras HTTP (XSS, Clickjacking, MIME sniffing, etc.)
app.use(helmet({
  // Electron sirve el frontend como archivo local; CSP flexible para eso
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));

app.use(cors());

// Límite de tamaño de payload (anti DoS con cuerpos gigantes)
app.use(express.json({ limit: '2mb' }));

// Rate Limiter global: 200 peticiones / minuto por IP
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiadas peticiones. Intenta de nuevo en un minuto.' },
});

// Rate Limiter estricto para login: 5 intentos en 15 minutos
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiados intentos de inicio de sesión. Bloqueado por 15 minutos.' },
  skipSuccessfulRequests: true, // no cuenta los logins exitosos
});

app.use('/api', globalLimiter);
app.use('/api/auth/login', loginLimiter);

// ── Public routes (no auth) ──────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

// ── Protected routes ─────────────────────────────────────────────────────────
app.use('/api/espacios',      verifyToken, espaciosRoutes);
app.use('/api/reservas',      verifyToken, reservasRoutes);
app.use('/api/huespedes',     verifyToken, huespedesRoutes);
app.use('/api/cuentas',       verifyToken, cuentasRoutes);
app.use('/api/configuracion', verifyToken, configuracionRoutes);
app.use('/api/dashboard',     verifyToken, dashboardRoutes);
app.use('/api/proveedores',   verifyToken, proveedoresRoutes);
app.use('/api/inventario',    verifyToken, inventarioRoutes);
app.use('/api/gastos',        verifyToken, gastosRoutes);
app.use('/api/reportes',      verifyToken, reportesRoutes);
app.use('/api/temporadas',    verifyToken, temporadasRoutes);
// ── Nuevas rutas ─────────────────────────────────────────────────────────────
app.use('/api/usuarios',      usuariosRoutes);    // roles internos
app.use('/api/auditoria',     auditoriaRoutes);   // solo admin
app.use('/api/caja',          cajaRoutes);        // control de caja
app.use('/api/public',        apiPublicaRoutes);  // Web Pública y iCal

// ── Serve frontend static files ──────────────────────────────────────────────
const path = require('path');
const frontendPath = process.env.FRONTEND_PATH || path.join(__dirname, '../../frontend/dist');
if (require('fs').existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
  app.use((req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// ── Start server ─────────────────────────────────────────────────────────────
// ── iCal Cron: Sincronizar cada 30 minutos ───────────────────────────────────
const cron = require('node-cron');
// "*/30 * * * *" = cada 30 minutos. Cambia a "0 * * * *" para cada hora.
cron.schedule('*/30 * * * *', () => {
  console.log('[iCal Cron] Ejecutando sincronización programada...');
  sincronizarTodosLosICal().catch(err => 
    console.error('[iCal Cron] Error en cron:', err.message)
  );
});

if (require.main === module) {
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    // Al arrancar, asegurar que exista al menos un admin
    await seedAdminIfNeeded();
    // Sincronización iCal inicial al arrancar
    sincronizarTodosLosICal().catch(err =>
      console.error('[iCal] Sync inicial fallida:', err.message)
    );
  });
} else {
  // Cuando lo llama Electron, ejecutar seed igualmente
  seedAdminIfNeeded();
  // Sincronización iCal inicial
  sincronizarTodosLosICal().catch(err =>
    console.error('[iCal] Sync inicial fallida:', err.message)
  );
  module.exports = app;
}
