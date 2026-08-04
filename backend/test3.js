require('dotenv').config();

async function testApi() {
  try {
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario: process.env.ADMIN_USER, password: process.env.ADMIN_PASS })
    });
    const loginData = await loginRes.json();
    const token = loginData.token;
    console.log("Logged in!");

    const dashboardRes = await fetch('http://localhost:5000/api/dashboard/stats', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!dashboardRes.ok) {
        console.error("Dashboard failed:", await dashboardRes.text());
    } else {
        const dashboardData = await dashboardRes.json();
        console.log("Dashboard:", Object.keys(dashboardData));
    }

    const pnlRes = await fetch('http://localhost:5000/api/reportes/pnl?desde=2026-07-01&hasta=2026-07-30', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!pnlRes.ok) {
        console.error("PnL failed:", await pnlRes.text());
    } else {
        const pnlData = await pnlRes.json();
        console.log("PnL:", Object.keys(pnlData));
    }

  } catch (error) {
    console.error("Error:", error);
  }
}

testApi();
