import { NextRequest, NextResponse } from 'next/server';
import { logEdenReceipt } from '@/lib/eden/receipts';

export const dynamic = 'force-dynamic';

type InstallBody = {
  assetId?: string;
  modelId?: string;
  modelName?: string;
  shotNumber?: number;
  shotName?: string;
  approvalStatus?: string;
  qaStatus?: string;
  intendedDriveFilename?: string;
  targetDriveFolderId?: string;
  usageBoundary?: string;
  publicUseAllowed?: boolean;
};

export async function GET() {
  return NextResponse.json({
    name: 'Image Generation Install Bridge',
    status: 'installed_stub',
    mode: 'preview_safe_queue',
    queue: 'QUEUE-IMAGE-INSTALL-001',
    downstreamQueue: 'QUEUE-DRIVE-UPLOAD-001',
    purpose: 'Register approved Eden Skye source images for Drive installation, manifest update, GitHub record, and Supabase notation.',
    acceptedStatus: 'approved_locked',
    execution: 'preview_receipt_only'
  });
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as InstallBody;
  const approved = body.approvalStatus === 'approved_locked';

  const receipt = await logEdenReceipt({
    eventType: 'image_generation_install_bridge',
    action: 'queue_image_install_preview',
    status: approved ? 'dry_run' : 'blocked',
    riskLevel: approved ? 'yellow' : 'red',
    target: body.assetId ?? 'unknown_asset',
    details: {
      queue: 'QUEUE-IMAGE-INSTALL-001',
      downstreamQueue: 'QUEUE-DRIVE-UPLOAD-001',
      body,
      execution: 'preview_receipt_only'
    }
  });

  if (!approved) {
    return NextResponse.json(
      {
        status: 'blocked',
        reason: 'Only approved_locked image assets may enter the install queue.',
        receipt
      },
      { status: 423 }
    );
  }

  return NextResponse.json({
    status: 'queued_preview',
    queue: 'QUEUE-IMAGE-INSTALL-001',
    nextStep: 'Upload execution remains behind Drive Image Upload Bridge preview validation.',
    receipt
  });
}
