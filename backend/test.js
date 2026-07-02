const http = require('http');
let authToken = '';

function req(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : '';
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api' + path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'Authorization': `Bearer ${authToken}`
      }
    };
    const req = http.request(options, res => {
      let resData = '';
      res.on('data', chunk => resData += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(resData)); } 
        catch (e) { resolve(resData); }
      });
    });
    req.on('error', reject);
    if (body) req.write(data);
    req.end();
  });
}

async function t() {
  const loginRes = await req('POST', '/auth/login', { usuario: 'admin', password: 'hotel2026' });
  authToken = loginRes.token;
  
  const p = await req('POST', '/cuentas/persona', {
    nombre_persona: 'Test Nuevo',
    descripcion: 'Agua',
    cantidad: 1,
    valor_unitario: 5000
  });
  console.log('Cargo:', p);

  const g = await req('POST', '/gastos/operativo', {
    categoria: 'Aseo',
    descripcion: 'Jabon',
    monto: 10000,
    fecha: new Date().toISOString()
  });
  console.log('Gasto:', g);
}
t();
