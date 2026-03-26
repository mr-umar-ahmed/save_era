import { NextResponse } from 'next/server';

// In-memory state to hold the latest IoT reading
let latestTelemetry = {
  load: 65,
  regions: [
    { region: "North Sector", usage: 70 },
    { region: "South Sector", usage: 45 },
    { region: "East Sector", usage: 60 },
    { region: "West Sector", usage: 30 },
  ]
};

// 1. The IoT Device pushes data here (POST)
export async function POST(req: Request) {
  try {
    const data = await req.json();
    latestTelemetry = data; // Update the "database"
    return NextResponse.json({ success: true, timestamp: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ error: "Invalid IoT payload" }, { status: 400 });
  }
}

// 2. The Dashboard fetches data from here (GET)
export async function GET() {
  return NextResponse.json(latestTelemetry);
}