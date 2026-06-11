export const dynamic = 'force-dynamic';

function payload() {
  return { ok: true, route: '/api/cron/shopify-sync', mode: process.env.SYSTEM_MODE || 'draft', live: false, shopifyMutationEnabled: false, entitlementSyncMode: 'dry_run' };
}

export async function GET() { return Response.json(payload()); }
export async function POST() { return Response.json(payload()); }
