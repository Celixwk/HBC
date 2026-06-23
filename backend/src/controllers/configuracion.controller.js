const prisma = require('../config/prisma');

const getConfiguracion = async (req, res) => {
  try {
    let config = await prisma.configuracion_hotel.findFirst();
    if (!config) {
      config = await prisma.configuracion_hotel.create({ data: { nombre_hotel: 'Hotel Boutique', hora_check_in: '15:00', hora_check_out: '13:00' } });
    }
    res.json(config);
  } catch (error) {
    console.error('Error al obtener configuración:', error);
    res.status(500).json({ error: 'Error al obtener configuración' });
  }
};

const updateConfiguracion = async (req, res) => {
  const { nombre_hotel, direccion, telefono, nit, email, ciudad, hora_check_in, hora_check_out } = req.body;
  try {
    let config = await prisma.configuracion_hotel.findFirst();
    if (!config) {
      config = await prisma.configuracion_hotel.create({ data: { nombre_hotel: nombre_hotel || 'Hotel Boutique', hora_check_in: hora_check_in || '15:00', hora_check_out: hora_check_out || '13:00' } });
    }
    const updated = await prisma.configuracion_hotel.update({
      where: { id: config.id },
      data: {
        nombre_hotel,
        direccion,
        telefono,
        nit,
        email,
        ciudad,
        hora_check_in,
        hora_check_out,
        fecha_actualizacion: new Date()
      }
    });
    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error al actualizar configuración:', error);
    res.status(500).json({ error: 'Error al actualizar configuración' });
  }
};

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const getDbConfig = () => {
  const url = process.env.DATABASE_URL || '';
  const match = url.match(/postgresql:\/\/([^:]+):.*@([^:]+):(\d+)\/(.+)/);
  if (match) {
    return { user: match[1], host: match[2], port: match[3], dbName: match[4] };
  }
  return { user: 'postgres', host: 'localhost', port: '54320', dbName: 'hotel_boutique_db' };
};

const backupDatabase = (req, res) => {
  const date = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
  res.setHeader('Content-Type', 'application/sql');
  res.setHeader('Content-Disposition', `attachment; filename=hotel_boutique_backup_${date}.sql`);

  const dbConfig = getDbConfig();
  const pgBinDir = process.env.PG_BIN_DIR || path.join(__dirname, '../../../postgres-portable/bin');
  const pgDumpPath = path.join(pgBinDir, 'pg_dump.exe');

  const dump = spawn(pgDumpPath, [
    '-U', dbConfig.user,
    '-h', dbConfig.host,
    '-p', dbConfig.port,
    '-d', dbConfig.dbName,
    '--clean',
    '--if-exists'
  ], { windowsHide: true });

  dump.stdout.pipe(res);

  dump.stderr.on('data', data => console.error('[PG_DUMP]', data.toString()));
  
  dump.on('close', code => {
    if(code !== 0) {
      console.error('pg_dump failed with code', code);
      if (!res.headersSent) res.status(500).json({ error: 'Backup failed' });
    }
  });
};

const restoreDatabase = async (req, res) => {
  try {
    const sqlContent = req.body;
    if (!sqlContent || typeof sqlContent !== 'string') {
      return res.status(400).json({ error: 'Contenido SQL no válido o vacío.' });
    }

    const tempFilePath = path.join(require('os').tmpdir(), `restore_${Date.now()}.sql`);
    fs.writeFileSync(tempFilePath, sqlContent);

    const dbConfig = getDbConfig();
    const pgBinDir = process.env.PG_BIN_DIR || path.join(__dirname, '../../../postgres-portable/bin');
    const psqlPath = path.join(pgBinDir, 'psql.exe');

    const psql = spawn(psqlPath, [
      '-U', dbConfig.user,
      '-h', dbConfig.host,
      '-p', dbConfig.port,
      '-d', dbConfig.dbName,
      '-f', tempFilePath
    ], { windowsHide: true });

    let errorOutput = '';
    psql.stderr.on('data', data => { errorOutput += data.toString(); });

    psql.on('close', code => {
      try { fs.unlinkSync(tempFilePath); } catch(e) {}
      
      if (code === 0) {
        res.json({ success: true, message: 'Base de datos restaurada correctamente.' });
      } else {
        console.error('psql failed:', errorOutput);
        res.status(500).json({ error: 'Error al restaurar la base de datos.', details: errorOutput });
      }
    });

  } catch (error) {
    console.error('Error in restoreDatabase:', error);
    res.status(500).json({ error: 'Error interno en la restauración.' });
  }
};

module.exports = { getConfiguracion, updateConfiguracion, backupDatabase, restoreDatabase };
