require('dotenv').config();
const { getDashboardStats } = require('./src/controllers/dashboard.controller.js');
const { getPnL } = require('./src/controllers/reportes.controller.js');

const req = {
  query: { desde: '2026-07-01', hasta: '2026-07-30' }
};

const res = {
  json: (data) => console.log('SUCCESS JSON:', JSON.stringify(data).substring(0, 200)),
  status: (code) => {
    return {
      json: (data) => console.log(`ERROR ${code}:`, data)
    };
  }
};

(async () => {
  console.log("Testing dashboard...");
  await getDashboardStats(req, res);
  
  console.log("Testing PnL...");
  await getPnL(req, res);
})();
