import { NextResponse } from 'next/server';

import { buildAutoSocialPipelineReport } from '@/src/lib/eden/runtime/auto-social-orchestrator';
import { buildShopifyBridgePayload } from '@/src/lib/eden/runtime/shopify-bridge';
import { runEdenWorkflow } from '@/src/lib/eden/runtime/workflow-runner';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function buildAutoSocialResponse() {
  const workflow = await runEdenWorkflow('status');
  const pipeline = buildAutoSocialPipelineReport();
  const shopifyBridge = buildShopifyBridgePayload();

  return {
    ok: true,
    route: '/api/eden/auto-social',
    mode: 'max_autonomous_governed_test',
    runtimeReady: workflow.validation.readyForAutonomousCron,
    workflowStatus: workflow.status,
    pipeline,
    shopifyBridge: {
      primaryMode: shopifyBridge.primaryMode,
      store: shopifyBridge.store,
      allowedActions: shopifyBridge.allowedActions,
      approvalRequiredActions: shopifyBridge.approvalRequiredActions
    },
    testReadiness: {
      website: true,
      driveSourceTruth: true,
      supabasePayloads: true,
      gitBranch: true,
      vercelPreview: true,
      autoBuilderRunJobAvailable: pipeline.autoBuilder.runJobAvailableInCurrentConnector,
      socialPublishAllowed: false
    }
  };
}

export async function GET() {
  const response = await buildAutoSocialResponse();
  return NextResponse.json(response);
}

export async function POST() {
  const response = await buildAutoSocialResponse();
  return NextResponse.json(response);
}
