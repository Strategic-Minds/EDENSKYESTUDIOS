export const dynamic = 'force-dynamic';

function payload() {
  return { ok: true, route: '/api/entitlements/sync', mode: process.env.SYSTEM_MODE || 'draft', live: false, entitlementWritesEnabled: false, source: 'Shopify membership feed placeholder' };
}

export async function GET() { return Response.json(payload()); }
export async function POST() { return Response.json(payload()); }
