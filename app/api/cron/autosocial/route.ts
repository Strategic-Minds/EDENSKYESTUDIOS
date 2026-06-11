export const dynamic = 'force-dynamic';

function payload() {
  return { ok: true, route: '/api/cron/autosocial', mode: process.env.SYSTEM_MODE || 'draft', live: false, metricoolPublishEnabled: false, socialPublishingEnabled: false };
}

export async function GET() { return Response.json(payload()); }
export async function POST() { return Response.json(payload()); }
