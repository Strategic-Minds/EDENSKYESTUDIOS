export const dynamic = 'force-dynamic';

function payload() {
  return { ok: true, route: '/api/heygen/packet', mode: process.env.SYSTEM_MODE || 'draft', live: false, heygenLiveActivationEnabled: false, paidGenerationEnabled: false, packetStatus: 'approval_required' };
}

export async function GET() { return Response.json(payload()); }
export async function POST() { return Response.json(payload()); }
