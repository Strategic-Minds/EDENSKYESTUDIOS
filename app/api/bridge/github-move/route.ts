import { NextRequest, NextResponse } from 'next/server';
import { checkApprovalGate } from '@/lib/eden/governance';
import { logEdenReceipt } from '@/lib/eden/receipts';

export const dynamic = 'force-dynamic';

type GitHubMoveItem = {
  repository?: string;
  sourcePath?: string;
  destinationPath?: string;
  branch?: string;
  mode?: 'rename' | 'move' | 'copy_then_remove' | 'folder_plan';
  reason?: string;
  approvalRowId?: string;
};

type GitHubMoveBody = {
  requestedAction?: string;
  requestedBy?: string;
  dryRun?: boolean;
  items?: GitHubMoveItem[];
};

const DESTRUCTIVE_WORDS = ['delete', 'remove source', 'overwrite', 'force', 'merge', 'deploy'];

function destructiveExecutionRequested(action: string) {
  const normalized = action.toLowerCase();
  return DESTRUCTIVE_WORDS.some((word) => normalized.includes(word));
}

function normalizeItems(items: GitHubMoveItem[] | undefined) {
  return (items ?? []).map((item, index) => ({
    id: item.approvalRowId ?? `github-move-${index + 1}`,
    repository: item.repository ?? 'Strategic-Minds/EDENSKYESTUDIOS',
    sourcePath: item.sourcePath ?? null,
    destinationPath: item.destinationPath ?? null,
    branch: item.branch ?? 'eden/bridge-move-plan',
    mode: item.mode ?? 'move',
    reason: item.reason ?? 'Queued from Eden GitHub move bridge.'
  }));
}

export async function GET() {
  return NextResponse.json({
    name: 'GitHub File And Folder Move Bridge',
    mode: 'branch_or_patch_first',
    executionAvailable: true,
    defaultRepository: 'Strategic-Minds/EDENSKYESTUDIOS',
    requiredFields: ['sourcePath', 'destinationPath', 'repository'],
    acceptedModes: ['rename', 'move', 'copy_then_remove', 'folder_plan'],
    approvalGate: 'Delete, overwrite, merge, deploy-triggering, or force operations require explicit approval.',
    recommendedFlow: ['queue move packet', 'create branch or patch', 'review diff', 'approve', 'merge or promote']
  });
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as GitHubMoveBody;
  const requestedAction = body.requestedAction ?? 'queue github move preview';
  const gate = checkApprovalGate(requestedAction);
  const destructive = destructiveExecutionRequested(requestedAction);
  const items = normalizeItems(body.items);

  if (!gate.allowed || destructive) {
    const receipt = await logEdenReceipt({
      eventType: 'github_move_bridge',
      action: requestedAction,
      status: 'blocked',
      actor: body.requestedBy,
      riskLevel: 'red',
      target: 'Strategic-Minds/EDENSKYESTUDIOS',
      details: {
        reason: destructive ? 'Destructive GitHub move execution requested.' : gate.matchedGate,
        items
      }
    });

    return NextResponse.json(
      {
        status: 'blocked',
        requiresApproval: true,
        recommendation: 'Review the move plan and approve destructive, overwrite, merge, or deploy-triggering actions before execution.',
        receipt
      },
      { status: 423 }
    );
  }

  const receipt = await logEdenReceipt({
    eventType: 'github_move_bridge',
    action: requestedAction,
    status: 'dry_run',
    actor: body.requestedBy,
    riskLevel: gate.risk,
    target: 'Strategic-Minds/EDENSKYESTUDIOS',
    details: {
      mode: 'branch_or_patch_first',
      items
    }
  });

  return NextResponse.json({
    status: 'queued_dry_run',
    requiresApproval: false,
    operationPacket: {
      queue: 'QUEUE-GITHUB-MOVE-001',
      items,
      nextExecutorNeeded: 'GitHub branch patch or reviewed connector write'
    },
    receipt
  });
}
