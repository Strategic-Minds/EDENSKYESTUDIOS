import { NextResponse, type NextRequest } from 'next/server';

import { runEdenWorkflow } from '@/src/lib/eden/runtime/workflow-runner';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getCronAuthorization(request: NextRequest) {
  const expectedSecret = process.env.EDEN_CRON_SECRET;

  if (!expectedSecret) {
    return {
      authorized: true,
      state: 'warn' as const,
      detail: 'EDEN_CRON_SECRET is not configured; production cron access should be locked before release.'
    };
  }

  const header = request.headers.get('authorization') || '';
  const authorized = header === `Bearer ${expectedSecret}`;

  return {
    authorized,
    state: authorized ? ('pass' as const) : ('blocked' as const),
    detail: authorized ? 'Cron request authorized.' : 'Cron request rejected by secret check.'
  };
}

async function handleCron(request: NextRequest) {
  const authorization = getCronAuthorization(request);

  if (!authorization.authorized) {
    return NextResponse.json(
      {
        ok: false,
        route: '/api/eden/cron',
        authorization,
        blockedActions: ['production_deploy', 'shopify_live_publish', 'social_publish', 'customer_messages', 'dns_changes', 'secret_exposure']
      },
      { status: 401 }
    );
  }

  const report = await runEdenWorkflow('cron');

  return NextResponse.json({
    ok: report.status === 'ready',
    route: '/api/eden/cron',
    authorization,
    report
  });
}

export async function GET(request: NextRequest) {
  return handleCron(request);
}

export async function POST(request: NextRequest) {
  return handleCron(request);
}
