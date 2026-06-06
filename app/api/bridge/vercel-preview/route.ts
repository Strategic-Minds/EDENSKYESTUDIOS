import { NextRequest, NextResponse } from 'next/server';
import { checkApprovalGate } from '@/lib/eden/governance';
import { logEdenReceipt } from '@/lib/eden/receipts';

export const dynamic = 'force-dynamic';

type VercelPreviewBody = {
  requestedAction?: string;
  requestedBy?: string;
  projectId?: string;
  branch?: string;
  target?: 'preview' | 'production';
  routesToCheck?: string[];
};

export async function GET() {
  return NextResponse.json({
    name: 'Vercel Preview Bridge',
    mode: 'preview_receipt_first',
    executionAvailable: false,
    reason: 'Vercel credentials are not present in the Eden runtime and direct Vercel calls from the current container were blocked.',
    requiredSecrets: ['VERCEL_TOKEN', 'VERCEL_PROJECT_ID', 'VERCEL_TEAM_ID when required'],
    approvalGate: 'Production deploys, rollbacks, domains, and environment changes require explicit approval.',
    defaultRoutesToCheck: ['/', '/login', '/payment', '/closet', '/api/readiness', '/api/bridge/stack-readiness']
  });
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as VercelPreviewBody;
  const target = body.target ?? 'preview';
  const requestedAction = body.requestedAction ?? `queue vercel ${target} preview`;
  const gate = checkApprovalGate(requestedAction);
  const productionRequested = target === 'production' || requestedAction.toLowerCase().includes('production');

  if (!gate.allowed || productionRequested) {
    const receipt = await logEdenReceipt({
      eventType: 'vercel_preview_bridge',
      action: requestedAction,
      status: 'blocked',
      actor: body.requestedBy,
      riskLevel: 'red',
      target: body.projectId ?? 'Eden Skye Studios Vercel project',
      details: {
        target,
        reason: productionRequested ? 'Production deploy requested.' : gate.matchedGate
      }
    });

    return NextResponse.json(
      {
        status: 'blocked',
        requiresApproval: true,
        recommendation: 'Review the preview first, then approve any production deploy in the control plane.',
        receipt
      },
      { status: 423 }
    );
  }

  const routesToCheck = body.routesToCheck ?? ['/', '/login', '/payment', '/closet', '/api/readiness', '/api/bridge/stack-readiness'];
  const receipt = await logEdenReceipt({
    eventType: 'vercel_preview_bridge',
    action: requestedAction,
    status: 'dry_run',
    actor: body.requestedBy,
    riskLevel: gate.risk,
    target: body.projectId ?? 'Eden Skye Studios Vercel project',
    details: {
      branch: body.branch ?? 'main',
      target,
      routesToCheck,
      executionAvailable: false
    }
  });

  return NextResponse.json({
    status: 'queued_dry_run',
    executionAvailable: false,
    requiresApproval: false,
    operationPacket: {
      queue: 'QUEUE-VERCEL-PREVIEW-001',
      branch: body.branch ?? 'main',
      target,
      routesToCheck,
      nextExecutorNeeded: 'Vercel token/project env plus preview deployment runner'
    },
    receipt
  });
}
