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
  
  const hoy = new Date();
  const desde = '2026-07-01';
  const hasta = hoy.toISOString().split('T')[0];
  
  const reporte = await req('GET', `/reportes/pnl?desde=${desde}&hasta=${hasta}`);
  console.log('\n=== REPORTE P&L ===');
  console.log(JSON.stringify(reporte, null, 2).substring(0, 2000));
}
t();
