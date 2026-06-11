export const dynamic = 'force-dynamic';

function payload() {
  return { ok: true, route: '/api/metricool/draft', mode: process.env.SYSTEM_MODE || 'draft', live: false, publishEnabled: false, packetStatus: 'draft_only' };
}

export async function GET() { return Response.json(payload()); }
export async function POST() { return Response.json(payload()); }
