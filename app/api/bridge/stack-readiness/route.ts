import { NextResponse } from 'next/server';
import { edenBridgeQueues, edenCapabilityRegistry, getCapabilitySummary } from '@/lib/eden/capabilities';
import { EDEN_PUBLICATION_LOCKS } from '@/lib/eden/governance';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    name: 'Eden Skye Studios bridge readiness',
    generatedAt: new Date().toISOString(),
    productionReady: false,
    autoBuilderMode: 'governed_control_plane',
    summary: getCapabilitySummary(),
    approvalLocks: EDEN_PUBLICATION_LOCKS,
    capabilities: edenCapabilityRegistry,
    bridgeQueues: edenBridgeQueues,
    nextHumanApprovals: [
      'Approve Vercel preview environment secrets before runtime bridge calls are activated.',
      'Approve any production deploy separately after preview review.',
      'Approve Drive metadata move execution once the Drive connector exposes direct file parent updates.',
      'Approve Shopify product, media, collection, price, discount, or theme mutations before they run.',
      'Approve Supabase production migrations or service-role writes before they run.'
    ]
  });
}
