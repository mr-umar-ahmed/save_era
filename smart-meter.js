// smart-meter.js
// Run this in a separate terminal using: node smart-meter.js

const API_URL = 'http://localhost:3000/api/iot';

console.log("==========================================");
console.log("🔌 SAVERA IoT Smart Meter Network Booting...");
console.log("📡 Establishing handshake with:", API_URL);
console.log("==========================================\n");

let baseLoad = 65;

setInterval(async () => {
  // 1. Simulate realistic grid fluctuations
  baseLoad += (Math.random() * 10 - 5);
  if (baseLoad > 95) baseLoad = 95;
  if (baseLoad < 40) baseLoad = 40;

  // 2. Construct the IoT JSON Payload
  const payload = {
    load: Math.floor(baseLoad),
    regions: [
      { region: "North Sector", usage: Math.floor(Math.random() * 20 + 75) }, // Runs hot
      { region: "South Sector", usage: Math.floor(Math.random() * 30 + 30) },
      { region: "East Sector", usage: Math.floor(Math.random() * 30 + 40) },
      { region: "West Sector", usage: Math.floor(Math.random() * 20 + 20) }, // Optimal
    ]
  };

  // 3. Transmit to Next.js Server
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (res.ok) {
      console.log(`[${new Date().toLocaleTimeString()}] ✅ TELEMETRY SYNC | Total Load: ${payload.load}MW`);
    } else {
      console.log(`[${new Date().toLocaleTimeString()}] ⚠️ SERVER REJECTED PAYLOAD`);
    }
  } catch (err) {
    console.error(`[${new Date().toLocaleTimeString()}] ❌ CONNECTION LOST. Is Next.js running?`);
  }
}, 3000); // 3000ms = 3 seconds