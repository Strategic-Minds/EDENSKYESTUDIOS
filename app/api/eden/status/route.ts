import { NextResponse } from 'next/server';

import { getEdenStatusReport } from '@/src/lib/eden/runtime/workflow-runner';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const report = await getEdenStatusReport();

  return NextResponse.json({
    ok: report.status === 'ready',
    route: '/api/eden/status',
    report
  });
}
