const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

let mainWindow;
let serverProcess;
const isDev = !app.isPackaged;

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    console.log('⚠️ Ya hay una instancia de la aplicación corriendo');
    app.quit();
} else {
    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });
}

const userDataPath = app.getPath('userData');
const pgDataDir = path.join(userDataPath, isDev ? 'pgdata_dev' : 'pgdata_prod_v3');
const settingsPath = path.join(userDataPath, 'settings.json');
let userSettings = { adminUser: 'admin', adminPass: 'hotel2026' };
try {
    if (fs.existsSync(settingsPath)) {
        userSettings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    } else {
        fs.writeFileSync(settingsPath, JSON.stringify(userSettings, null, 2));
    }
} catch (err) {
    console.error('Error leyendo settings.json:', err);
}

const pgBinDir = isDev
    ? path.join(__dirname, '../postgres-portable/bin')
    : path.join(process.resourcesPath, 'postgres-portable', 'bin');

let PG_PORT = 54320;
const DB_NAME = 'hotel_boutique_db';
const DB_USER = 'postgres';
let EXPRESS_PORT = 5001; // will be updated at runtime with first available port

// Find first available TCP port starting from startPort
function findAvailablePort(startPort, maxTries = 20) {
    const net = require('net');
    return new Promise((resolve, reject) => {
        let port = startPort;
        const tryPort = () => {
            const server = net.createServer();
            server.once('error', (err) => {
                if (err.code === 'EADDRINUSE') {
                    console.log(`⚠️  Puerto ${port} ocupado, probando ${port + 1}...`);
                    port++;
                    if (port - startPort >= maxTries) {
                        reject(new Error(`No se encontró un puerto libre entre ${startPort} y ${startPort + maxTries}`));
                    } else {
                        tryPort();
                    }
                } else {
                    reject(err);
                }
            });
            server.once('listening', () => {
                server.close(() => resolve(port));
            });
            server.listen(port, '127.0.0.1');
        };
        tryPort();
    });
}

let isFirstInstall = false;

async function startPostgres() {
    console.log('📍 startPostgres - Verificando directorio pgData:', pgDataDir);

    if (!fs.existsSync(pgDataDir)) {
        console.log('📍 startPostgres - Primera instalación detectada. Ejecutando initDatabase...');
        isFirstInstall = true;
        await initDatabase();
    }

    const pgctlPath = path.join(pgBinDir, 'pg_ctl.exe');

    return new Promise((resolve) => {
        const pgctl = spawn(pgctlPath, ['start', '-D', pgDataDir, '-o', `-p ${PG_PORT} -k ""`]);

        pgctl.stdout.on('data', (data) => console.log(`[PGCTL-OUT] ${data}`));
        pgctl.stderr.on('data', (data) => console.log(`[PGCTL-ERR] ${data}`));

        setTimeout(() => {
            console.log('✅ PostgreSQL listo');
            process.env.DATABASE_URL = `postgresql://${DB_USER}:@localhost:${PG_PORT}/${DB_NAME}`;
            resolve();
        }, 4000);
    });
}

async function ensureDatabaseExists() {
    const psqlPath = path.join(pgBinDir, 'psql.exe');

    return new Promise((resolve) => {
        const psql = spawn(psqlPath, [
            '-U', DB_USER,
            '-p', PG_PORT.toString(),
            '-h', 'localhost',
            '-d', 'postgres',
            '-c', `SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}'`
        ]);

        let output = '';
        psql.stdout.on('data', (data) => {
            output += data.toString();
        });

        psql.on('close', (code) => {
            if (output.includes('(1 row)') || output.includes('(1 fila)') || output.includes('1')) {
                console.log(`✅ Base de datos "${DB_NAME}" ya existe`);
                resolve();
            } else {
                console.log('📍 Creando base de datos...');
                createDatabase().then(resolve);
            }
        });
    });
}

async function createDatabase() {
    const createdbPath = path.join(pgBinDir, 'createdb.exe');

    return new Promise((resolve) => {
        const createdb = spawn(createdbPath, [
            '-U', DB_USER,
            '-p', PG_PORT.toString(),
            '-h', 'localhost',
            DB_NAME
        ]);

        createdb.on('close', (code) => {
            console.log(code === 0 ? `✅ Base de datos "${DB_NAME}" creada exitosamente` : `⚠️ La base de datos ya podría existir o hubo un error`);
            resolve();
        });
    });
}

async function runMigrationsAndSeed(appRootPath) {
    const psqlPath = path.join(pgBinDir, 'psql.exe');

    // 1. Aplicar schema.sql (idempotente: CREATE TABLE IF NOT EXISTS)
    const schemaPath = isDev
        ? path.join(__dirname, '../prisma/schema.sql')
        : path.join(process.resourcesPath, 'app', 'prisma', 'schema.sql');

    console.log('📍 Aplicando schema de base de datos...');
    if (fs.existsSync(schemaPath)) {
        await new Promise((resolve) => {
            const psql = spawn(psqlPath, [
                '-U', DB_USER,
                '-h', 'localhost',
                '-p', PG_PORT.toString(),
                '-d', DB_NAME,
                '-f', schemaPath
            ], { windowsHide: true });
            psql.stdout.on('data', d => console.log('[SCHEMA]', d.toString().trim()));
            psql.stderr.on('data', d => console.log('[SCHEMA-ERR]', d.toString().trim()));
            psql.on('close', (code) => {
                console.log('✅ Schema aplicado, código:', code);
                resolve();
            });
        });
    } else {
        console.log('⚠️ No se encontró schema.sql en:', schemaPath);
    }

    // 2. Detectar si el seed ya fue aplicado (consultar si la tabla espacio tiene filas)
    const needsSeed = await new Promise((resolve) => {
        let output = '';
        const psql = spawn(psqlPath, [
            '-U', DB_USER,
            '-h', 'localhost',
            '-p', PG_PORT.toString(),
            '-d', DB_NAME,
            '-t', '-c', 'SELECT COUNT(*) FROM espacio'
        ], { windowsHide: true });
        psql.stdout.on('data', d => { output += d.toString(); });
        psql.on('close', () => {
            const count = parseInt(output.trim()) || 0;
            console.log(`📍 Espacios en BD: ${count}`);
            resolve(count === 0);
        });
        psql.on('error', () => resolve(true)); // Si falla, mejor intentar el seed
    });

    // 3. Aplicar seed si la BD está vacía
    if (needsSeed) {
        console.log('📍 BD vacía — aplicando datos iniciales (seed)...');
        const seedPath = isDev
            ? path.join(__dirname, '../prisma/seed.sql')
            : path.join(process.resourcesPath, 'app', 'prisma', 'seed.sql');

        if (fs.existsSync(seedPath)) {
            await new Promise((resolve) => {
                const psql = spawn(psqlPath, [
                    '-U', DB_USER,
                    '-h', 'localhost',
                    '-p', PG_PORT.toString(),
                    '-d', DB_NAME,
                    '-f', seedPath
                ], { windowsHide: true });
                psql.stdout.on('data', d => console.log('[SEED]', d.toString().trim()));
                psql.stderr.on('data', d => console.log('[SEED-ERR]', d.toString().trim()));
                psql.on('close', (code) => {
                    console.log(code === 0 ? '✅ Seed aplicado correctamente' : '⚠️ Seed finalizó con código: ' + code);
                    resolve();
                });
            });
        } else {
            console.log('⚠️ No se encontró seed.sql en:', seedPath);
        }
    } else {
        console.log('✅ BD ya tiene datos — omitiendo seed');
    }
}

async function initDatabase() {
    const initdbPath = path.join(pgBinDir, 'initdb.exe');

    return new Promise((resolve, reject) => {
        const initdb = spawn(initdbPath, [
            '-D', pgDataDir,
            '-U', DB_USER,
            '--encoding=UTF8',
            '--locale=C',
            '--auth=trust',
            '--no-instructions'
        ]);

        initdb.on('close', (code) => {
            if (code === 0) {
                console.log('✅ Cluster PostgreSQL inicializado');
                resolve();
            } else {
                reject(new Error(`initdb falló con código ${code}`));
            }
        });
    });
}

async function stopPostgres() {
    console.log('📍 Deteniendo PostgreSQL...');
    const pgctlPath = path.join(pgBinDir, 'pg_ctl.exe');

    return new Promise((resolve) => {
        const pgctl = spawn(pgctlPath, ['stop', '-D', pgDataDir, '-m', 'fast', '-w']);

        pgctl.on('close', () => {
            console.log('✅ PostgreSQL detenido');
            resolve();
        });

        setTimeout(() => resolve(), 5000);
    });
}

function startExpressServer() {
    let serverPath = isDev
        ? path.join(__dirname, '../src/index.js')
        : path.join(process.resourcesPath, 'app', 'src', 'index.js');

    // cwd must be the PARENT of src/ so that node_modules is found at ../node_modules
    const appRootPath = isDev
        ? path.join(__dirname, '..')
        : path.join(process.resourcesPath, 'app');

    const frontendPath = isDev
        ? path.join(__dirname, '../../frontend/dist')
        : path.join(process.resourcesPath, 'app', 'frontend-build');

    const logPath = path.join(app.getPath('userData'), 'express.log');
    console.log('🚀 Arrancando Express en:', serverPath);
    console.log('📂 cwd:', appRootPath);

    serverProcess = spawn(process.execPath, [serverPath], {
        env: {
            ...process.env,
            ELECTRON_RUN_AS_NODE: '1',
            NODE_ENV: 'production',
            PORT: String(EXPRESS_PORT),
            DATABASE_URL: process.env.DATABASE_URL,
            FRONTEND_PATH: frontendPath,
            JWT_SECRET: process.env.JWT_SECRET || 'hotel-boutique-secret-2026',
            ADMIN_USER: userSettings.adminUser,
            ADMIN_PASS: userSettings.adminPass,
            SETTINGS_PATH: settingsPath
        },
        cwd: appRootPath,
        stdio: ['ignore', 'pipe', 'pipe'],
        shell: false,
        windowsHide: true
    });

    serverProcess.stdout.on('data', (data) => {
        const msg = data.toString().trim();
        console.log('[EXPRESS]', msg);
        try { fs.appendFileSync(logPath, '[OUT] ' + msg + '\n'); } catch(e) {}
    });

    serverProcess.stderr.on('data', (data) => {
        const msg = data.toString().trim();
        console.error('[EXPRESS-ERR]', msg);
        try { fs.appendFileSync(logPath, '[ERR] ' + msg + '\n'); } catch(e) {}
    });

    serverProcess.on('exit', (code) => {
        console.log('[EXPRESS] proceso terminó con código:', code);
    });
}

async function waitForServer(url, timeout) {
    const startTime = Date.now();
    let attempts = 0;

    while (Date.now() - startTime < timeout) {
        attempts++;
        try {
            const http = require('http');
            const result = await new Promise((resolve, reject) => {
                const req = http.get(url, (res) => {
                    res.on('data', () => { });
                    res.on('end', () => {
                        if (res.statusCode === 200 || res.statusCode === 304 || res.statusCode === 404) {
                            resolve(true);
                        } else {
                            reject(new Error(`Status inesperado: ${res.statusCode}`));
                        }
                    });
                });

                req.on('error', reject);
                req.setTimeout(2000, () => {
                    req.destroy();
                    reject(new Error('Timeout'));
                });
                req.end();
            });

            if (result) return;
        } catch (err) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    throw new Error('Timeout: El servidor no respondió');
}

async function createWindow() {
    try {
        // Init log file
        try { fs.writeFileSync(path.join(app.getPath('userData'), 'express.log'), ''); } catch(e) {}

        // Find a free port for PostgreSQL
        PG_PORT = await findAvailablePort(54320);
        console.log(`✅ Puerto PostgreSQL disponible encontrado: ${PG_PORT}`);

        await startPostgres();
        await ensureDatabaseExists();

        // Apply schema migrations and seed data (on first install)
        const appRootPath = isDev
            ? path.join(__dirname, '..')
            : path.join(process.resourcesPath, 'app');
        await runMigrationsAndSeed(appRootPath);

        // Find a free port dynamically
        EXPRESS_PORT = await findAvailablePort(5001);
        console.log(`✅ Puerto disponible encontrado: ${EXPRESS_PORT}`);

        startExpressServer();

        // Give Express a moment to start up before polling
        await new Promise(r => setTimeout(r, 2000));
        await waitForServer(`http://127.0.0.1:${EXPRESS_PORT}/api/health`, 60000);

        mainWindow = new BrowserWindow({
            width: 1400,
            height: 900,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true
            },
            show: false,
            autoHideMenuBar: true
        });

        mainWindow.loadURL(`http://127.0.0.1:${EXPRESS_PORT}`);

        mainWindow.once('ready-to-show', () => {
            mainWindow.show();
            mainWindow.focus();
        });

        mainWindow.on('close', (e) => {
            const choice = dialog.showMessageBoxSync(mainWindow, {
                type: 'question',
                buttons: ['Sí', 'No'],
                title: 'Confirmar Salida',
                message: '¿Seguro que quieres salir de la aplicación?'
            });
            if (choice === 1) {
                e.preventDefault();
            }
        });

        mainWindow.on('closed', () => {
            mainWindow = null;
        });

    } catch (error) {
        dialog.showErrorBox('Error de Inicio', `No se pudo iniciar la aplicación:\n\n${error.message}`);
        app.quit();
    }
}

app.whenReady().then(createWindow);

app.on('before-quit', async (e) => {
    e.preventDefault();
    if (serverProcess) serverProcess.kill();
    await stopPostgres();
    app.exit(0);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
