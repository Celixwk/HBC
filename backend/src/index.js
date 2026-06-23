// Load .env file only if DATABASE_URL is not already set (e.g. by Electron)
if (!process.env.DATABASE_URL) {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/auth.routes');
const espaciosRoutes = require('./routes/espacios.routes');
const reservasRoutes = require('./routes/reservas.routes');
const huespedesRoutes = require('./routes/huespedes.routes');
const cuentasRoutes = require('./routes/cuentas.routes');
const configuracionRoutes = require('./routes/configuracion.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const proveedoresRoutes = require('./routes/proveedores.routes');
const inventarioRoutes  = require('./routes/inventario.routes');
const gastosRoutes      = require('./routes/gastos.routes');
const reportesRoutes    = require('./routes/reportes.routes');

const { verifyToken } = require('./middleware/auth.middleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Public routes (no auth)
app.use('/api/auth', authRoutes);
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

app.get('/api/debug-reservas', async (req, res) => {
  const prisma = require('./config/prisma');
  const reservas = await prisma.reserva.findMany();
  res.json(reservas.map(x => ({id: x.id_reserva, in: x.check_in, out: x.check_out, h: x.id_huesped})));
});

app.get('/api/fix-fernando', async (req, res) => {
  const prisma = require('./config/prisma');
  await prisma.reserva.update({
    where: { id_reserva: 7 },
    data: { check_in: new Date('2026-05-11T00:00:00.000Z'), check_out: new Date('2026-05-12T00:00:00.000Z') }
  });
  res.json({ success: true });
});

// Protected routes
app.use('/api/espacios', verifyToken, espaciosRoutes);
app.use('/api/reservas', verifyToken, reservasRoutes);
app.use('/api/huespedes', verifyToken, huespedesRoutes);
app.use('/api/cuentas', verifyToken, cuentasRoutes);
app.use('/api/configuracion', verifyToken, configuracionRoutes);
app.use('/api/dashboard', verifyToken, dashboardRoutes);
app.use('/api/proveedores', verifyToken, proveedoresRoutes);
app.use('/api/inventario', verifyToken, inventarioRoutes);
app.use('/api/gastos',     verifyToken, gastosRoutes);
app.use('/api/reportes',   verifyToken, reportesRoutes);

// Serve frontend static files if FRONTEND_PATH is provided
const path = require('path');
const frontendPath = process.env.FRONTEND_PATH || path.join(__dirname, '../../frontend/dist');
if (require('fs').existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
  app.use((req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} else {
  module.exports = app;
}
