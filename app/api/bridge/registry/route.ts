import { NextResponse } from 'next/server';
import { edenBridgeQueues, edenCapabilityRegistry, getCapabilitySummary } from '@/lib/eden/capabilities';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    name: 'Eden Skye Studios bridge registry',
    generatedAt: new Date().toISOString(),
    summary: getCapabilitySummary(),
    registry: {
      capabilities: edenCapabilityRegistry,
      queues: edenBridgeQueues
    },
    primaryReadinessRoute: '/api/bridge/stack-readiness'
  });
}
