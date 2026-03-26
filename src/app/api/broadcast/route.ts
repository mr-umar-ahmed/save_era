import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, priority } = await req.json();
    
    // The ntfy.sh endpoint using your unique topic name
    const ntfyUrl = 'https://ntfy.sh/savera_alert_raichur_9988';

    // Map your frontend priority to ntfy's priority scale (1-5)
    const priorityLevel = priority.includes('Critical') ? 'urgent' : 'high';

    const response = await fetch(ntfyUrl, {
      method: 'POST',
      body: message,
      headers: {
        // FIX: Removed the emoji here. Node.js headers crash if they contain emojis!
        'Title': 'SAVERA GRID COMMAND', 
        'Priority': priorityLevel,
        'Tags': 'warning,zap', // ntfy uses this to add the emojis safely
      }
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      const errorText = await response.text();
      console.error("Ntfy rejection:", errorText);
      throw new Error('Failed to send push notification');
    }
  } catch (error) {
    console.error("Broadcast API Error:", error);
    return NextResponse.json({ success: false, error: 'Broadcast failed' }, { status: 500 });
  }
}