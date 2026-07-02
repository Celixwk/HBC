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

async function runSimulation() {
  console.log('Iniciando simulacion...');

  const loginRes = await req('POST', '/auth/login', { usuario: 'admin', password: 'hotel2026' });
  if (loginRes.token) {
    authToken = loginRes.token;
    console.log('Login exitoso.');
  } else {
    console.log('Error de login:', loginRes);
    return;
  }

  const espacios = await req('GET', '/espacios');
  if (!Array.isArray(espacios)) {
    console.log('Error al obtener espacios:', espacios);
    return;
  }

  const rooms = espacios.filter(e => e.tipo_espacio === 'habitacion' || e.tipo === 'habitacion').slice(0, 5);
  console.log(`Habitaciones disponibles: ${rooms.length}`);

  const guests = [
    { nombre_completo: 'Juan Perez', documento: 'SIM1' + Date.now() },
    { nombre_completo: 'Clara Gomez', documento: 'SIM2' + Date.now() },
    { nombre_completo: 'Roberto Silva', documento: 'SIM3' + Date.now() },
    { nombre_completo: 'Diana Vargas', documento: 'SIM4' + Date.now() },
    { nombre_completo: 'Esteban Mora', documento: 'SIM5' + Date.now() }
  ];

  const hoy = new Date();
  const manana = new Date(); manana.setDate(manana.getDate() + 1);
  for (let i = 0; i < rooms.length; i++) {
    const h = await req('POST', '/huespedes', { ...guests[i], telefono: '31000000' + i });
    const reserva = await req('POST', '/reservas', {
      id_huesped: h.id_huesped,
      id_espacio: rooms[i].id_espacio,
      check_in: hoy.toISOString().split('T')[0],
      check_out: manana.toISOString().split('T')[0],
      estado_reserva: 'activa',
      monto_total: 100000 + (i * 15000)
    });
    console.log(`Reserva ${i+1} (${guests[i].nombre_completo}):`, reserva.id_reserva ? 'OK hab ' + rooms[i].numero : reserva);
    
    if (reserva.id_reserva) {
      const pago = await req('PUT', `/reservas/${reserva.id_reserva}/pago`, {
        estado_pago: 'pagado',
        metodo_pago: ['Efectivo', 'Transferencia', 'Nequi', 'Efectivo', 'Transferencia'][i],
        monto_pagado: reserva.monto_total
      });
      console.log(`  → Pagado: ${pago.estado_pago || '?'}`);
    }
  }

  const nombresPersonas = ['Ana Garcia', 'Carlos Ruiz', 'Maria Lopez', 'Pedro Sanchez', 'Laura Torres'];
  for (let i = 0; i < 5; i++) {
    const cargo = await req('POST', '/cuentas/persona', {
      nombre_persona: nombresPersonas[i],
      descripcion: `Consumo Externo ${['Café', 'Agua', 'Jugo', 'Cerveza', 'Snack'][i]}`,
      cantidad: `${i + 1}`,
      valor_unitario: `${5000 + (i * 2000)}`
    });
    console.log(`Cargo persona ${i+1} (${nombresPersonas[i]}):`, cargo.id_item_persona ? 'OK id=' + cargo.id_item_persona : cargo);
    
    if (cargo.id_item_persona) {
      const estado = await req('PATCH', `/cuentas/persona/${cargo.id_item_persona}/estado`, {
        estado: 'pagado',
        metodo_pago: ['Efectivo', 'Transferencia', 'Efectivo', 'Nequi', 'Efectivo'][i]
      });
      console.log(`  → Pagado con ${estado.metodo_pago || '?'}`);
    }
  }

  const catGastos = ['Mantenimiento', 'Otros', 'Servicios Públicos', 'Nómina', 'Arriendo'];
  const descGastos = [
    'Revisión plomería',
    'Compra detergente y escobas',
    'Factura agua',
    'Pago nómina julio',
    'Pago arriendo julio',
    'Compra bombillos LED',
    'Pintura paredes lobby',
    'Servicio internet',
    'Compra café y azúcar',
    'Reparación cerradura hab 2'
  ];
  for (let i = 0; i < 10; i++) {
    const gasto = await req('POST', '/gastos', {
      categoria: catGastos[i % catGastos.length],
      descripcion: descGastos[i],
      monto: `${20000 + (i * 7500)}`,
      fecha: hoy.toISOString().split('T')[0]
    });
    console.log(`Gasto ${i+1} (${gasto.categoria}): ${gasto.descripcion} → $${gasto.monto}`);
  }

  console.log('Simulacion completada exitosamente.');
}

runSimulation().catch(console.error);
