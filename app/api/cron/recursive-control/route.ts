import { NextRequest, NextResponse } from 'next/server';
import { runRecursiveControl } from '@/lib/bridge/orchestrator';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get('authorization');
  const isVercelCron = request.headers.get('x-vercel-cron') === '1';

  if (cronSecret && authHeader !== `Bearer ${cronSecret}` && !isVercelCron) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  const result = await runRecursiveControl({
    trigger: isVercelCron ? 'vercel_cron' : 'manual_safe_check',
    route: '/api/cron/recursive-control',
    schedule: request.headers.get('x-vercel-cron-schedule') ?? '*/5 * * * *',
    dryRun: process.env.BRIDGE_DRY_RUN !== 'false'
  });

  return NextResponse.json(result);
}
