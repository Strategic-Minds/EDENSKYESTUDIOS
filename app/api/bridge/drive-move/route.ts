import { NextRequest, NextResponse } from 'next/server';
import { checkApprovalGate } from '@/lib/eden/governance';
import { logEdenReceipt } from '@/lib/eden/receipts';

export const dynamic = 'force-dynamic';

type DriveMoveItem = {
  itemType?: 'image' | 'file' | 'folder';
  sourceUrl?: string;
  fileId?: string;
  currentParentId?: string;
  targetFolderId?: string;
  targetFolderName?: string;
  visualUrl?: string;
  reason?: string;
  approvalRowId?: string;
};

type DriveMoveBody = {
  requestedAction?: string;
  requestedBy?: string;
  dryRun?: boolean;
  items?: DriveMoveItem[];
};

const EXECUTION_WORDS = ['execute', 'move now', 'bulk move', 'change parent', 'delete', 'share publicly'];

function requiresDirectExecutionApproval(action: string) {
  const normalized = action.toLowerCase();
  return EXECUTION_WORDS.some((word) => normalized.includes(word));
}

function normalizeItems(items: DriveMoveItem[] | undefined) {
  return (items ?? []).map((item, index) => ({
    id: item.approvalRowId ?? `drive-move-${index + 1}`,
    itemType: item.itemType ?? 'file',
    sourceUrl: item.sourceUrl ?? null,
    fileId: item.fileId ?? null,
    currentParentId: item.currentParentId ?? null,
    targetFolderId: item.targetFolderId ?? null,
    targetFolderName: item.targetFolderName ?? null,
    visualUrl: item.visualUrl ?? item.sourceUrl ?? null,
    reason: item.reason ?? 'Queued from Eden Drive move bridge.'
  }));
}

export async function GET() {
  return NextResponse.json({
    name: 'Move Images To Drive Bridge',
    mode: 'queue_first',
    executionAvailable: false,
    reason: 'The current Drive connector can create, read, and update native files, but direct metadata parent moves are not exposed in this session.',
    requiredFields: ['fileId or sourceUrl', 'targetFolderId or targetFolderName', 'visualUrl'],
    acceptedItemTypes: ['image', 'file', 'folder'],
    approvalGate: 'Any direct Drive move, sharing change, delete, or bulk folder operation requires explicit approval and a receipt.',
    fallback: 'Queue the move packet in the approval control plane, then execute through Drive metadata tooling when available.'
  });
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as DriveMoveBody;
  const requestedAction = body.requestedAction ?? 'queue drive move preview';
  const gate = checkApprovalGate(requestedAction);
  const directExecutionRequested = requiresDirectExecutionApproval(requestedAction);
  const items = normalizeItems(body.items);

  if (!gate.allowed || directExecutionRequested) {
    const receipt = await logEdenReceipt({
      eventType: 'drive_move_bridge',
      action: requestedAction,
      status: 'blocked',
      actor: body.requestedBy,
      riskLevel: 'red',
      target: 'Google Drive',
      details: {
        reason: directExecutionRequested ? 'Direct Drive move execution requested.' : gate.matchedGate,
        items
      }
    });

    return NextResponse.json(
      {
        status: 'blocked',
        executionAvailable: false,
        requiresApproval: true,
        recommendation: 'Approve the move in the control plane and provide direct Drive metadata move capability before execution.',
        receipt
      },
      { status: 423 }
    );
  }

  const receipt = await logEdenReceipt({
    eventType: 'drive_move_bridge',
    action: requestedAction,
    status: 'dry_run',
    actor: body.requestedBy,
    riskLevel: gate.risk,
    target: 'Google Drive',
    details: {
      mode: 'queue_first',
      directMoveToolAvailable: false,
      items
    }
  });

  return NextResponse.json({
    status: 'queued_dry_run',
    executionAvailable: false,
    requiresApproval: false,
    operationPacket: {
      queue: 'QUEUE-DRIVE-MOVE-001',
      items,
      nextExecutorNeeded: 'Drive metadata addParents/removeParents or equivalent folder move capability'
    },
    receipt
  });
}
