import { NextResponse } from 'next/server';

import { buildShopifyBridgePayload } from '@/src/lib/eden/runtime/shopify-bridge';
import { runEdenWorkflow } from '@/src/lib/eden/runtime/workflow-runner';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function buildBridgeResponse() {
  const workflow = await runEdenWorkflow('status');
  const bridge = buildShopifyBridgePayload();

  return {
    ok: true,
    route: '/api/eden/shopify-bridge',
    mode: 'governed_shopify_bridge',
    workflowStatus: workflow.status,
    runtimeReady: workflow.validation.readyForAutonomousCron,
    bridge,
    productionGates: {
      liveThemePublish: 'approval_required',
      onlineStorePublish: 'approval_required',
      customerMessaging: 'approval_required',
      billingOrPaymentMutation: 'blocked',
      secretExposure: 'blocked'
    }
  };
}

export async function GET() {
  const response = await buildBridgeResponse();
  return NextResponse.json(response);
}

export async function POST() {
  const response = await buildBridgeResponse();
  return NextResponse.json(response);
}
