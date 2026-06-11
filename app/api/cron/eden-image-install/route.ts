import { NextResponse } from 'next/server';
import { logEdenReceipt } from '@/lib/eden/receipts';

export const dynamic = 'force-dynamic';

export async function GET() {
  const receipt = await logEdenReceipt({
    eventType: 'eden_image_install_cron',
    action: 'cron_preview_scan',
    status: 'dry_run',
    riskLevel: 'green',
    target: 'QUEUE-IMAGE-INSTALL-001',
    details: {
      queue: 'QUEUE-IMAGE-INSTALL-001',
      downstreamQueue: 'QUEUE-DRIVE-UPLOAD-001',
      schedule: 'every_5_minutes_preview',
      execution: 'receipt_only'
    }
  });

  return NextResponse.json({
    status: 'preview_scan_complete',
    queue: 'QUEUE-IMAGE-INSTALL-001',
    downstreamQueue: 'QUEUE-DRIVE-UPLOAD-001',
    processed: 0,
    receipt
  });
}
