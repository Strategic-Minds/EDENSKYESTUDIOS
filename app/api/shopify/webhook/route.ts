export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({ ok: true, route: '/api/shopify/webhook', mode: 'draft', live: false, webhookVerificationRequired: true, mutationEnabled: false });
}

export async function POST() {
  return Response.json({ ok: true, route: '/api/shopify/webhook', mode: 'draft', live: false, received: true, processed: false, reason: 'Draft branch does not mutate Shopify or entitlements.' });
}
