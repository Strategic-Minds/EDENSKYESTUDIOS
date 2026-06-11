export const dynamic = 'force-dynamic';

function payload() {
  return { ok: true, route: '/api/workflows/eden-skye-tick', mode: process.env.SYSTEM_MODE || 'draft', live: false, blockedActions: ['production_deploy', 'payment_activation', 'social_publish', 'external_email', 'live_content_release'] };
}

export async function GET() { return Response.json(payload()); }
export async function POST() { return Response.json(payload()); }
