export const dynamic = 'force-dynamic';

function payload() {
  return { ok: true, route: '/api/cron/metricool-sync', mode: process.env.SYSTEM_MODE || 'draft', live: false, metricoolPublishEnabled: false, analyticsSyncMode: 'dry_run' };
}

export async function GET() { return Response.json(payload()); }
export async function POST() { return Response.json(payload()); }
