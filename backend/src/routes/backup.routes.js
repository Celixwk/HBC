const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');

// La carpeta de datos de postgres y backups es relativa al userData de Electron
// En producción, el userData es %APPDATA%\hotel-boutique-app
const userDataPath = process.env.USER_DATA_PATH || path.join(
    process.env.APPDATA || require('os').homedir(),
    'hotel-boutique-app'
);
const pgDataDir = path.join(userDataPath, 'pgdata');
const backupsDir = path.join(userDataPath, 'backups');

// GET /api/backup/list → lista los backups disponibles
router.get('/list', (req, res) => {
    try {
        if (!fs.existsSync(backupsDir)) return res.json([]);
        const files = fs.readdirSync(backupsDir)
            .filter(f => f.endsWith('.zip'))
            .map(f => {
                const stats = fs.statSync(path.join(backupsDir, f));
                return {
                    name: f,
                    sizeMB: Math.round(stats.size / 1024 / 1024 * 10) / 10,
                    fecha: stats.mtime
                };
            })
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        res.json(files);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/backup/create → crea un backup manual
router.post('/create', async (req, res) => {
    if (!fs.existsSync(pgDataDir)) {
        return res.status(400).json({ error: 'No hay base de datos para respaldar.' });
    }
    try {
        if (!fs.existsSync(backupsDir)) fs.mkdirSync(backupsDir, { recursive: true });

        const now = new Date();
        const stamp = [
            now.getFullYear(),
            String(now.getMonth()+1).padStart(2,'0'),
            String(now.getDate()).padStart(2,'0')
        ].join('-') + '_' + String(now.getHours()).padStart(2,'0') + String(now.getMinutes()).padStart(2,'0');
        const zipName = `backup_manual_${stamp}.zip`;
        const zipPath = path.join(backupsDir, zipName);

        await new Promise((resolve, reject) => {
            const output = fs.createWriteStream(zipPath);
            const archive = archiver('zip', { zlib: { level: 6 } });
            archive.on('error', (err) => { try { fs.unlinkSync(zipPath); } catch(e) {} reject(err); });
            output.on('close', resolve);
            archive.pipe(output);
            archive.directory(pgDataDir, 'pgdata');
            archive.finalize();
        });

        const stats = fs.statSync(zipPath);
        res.json({
            success: true,
            message: `Backup creado exitosamente`,
            filename: zipName,
            sizeMB: Math.round(stats.size / 1024 / 1024 * 10) / 10
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/backup/folder → retorna la ruta de la carpeta de backups
router.get('/folder', (req, res) => {
    res.json({ path: backupsDir });
});

module.exports = router;
