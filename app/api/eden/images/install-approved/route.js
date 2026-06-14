import { NextResponse } from 'next/server';
import { buildInstallPlan } from '../../../../../lib/eden-image-install-governance.mjs';

function hasValidBearerToken(request) {
  const configuredToken = process.env.EDEN_IMAGE_INSTALL_EXECUTOR_TOKEN;
  const header = request.headers.get('authorization') ?? '';

  if (!configuredToken) {
    return {
      ok: false,
      reason: 'EDEN_IMAGE_INSTALL_EXECUTOR_TOKEN is not configured'
    };
  }

  return {
    ok: header === `Bearer ${configuredToken}`,
    reason: 'Bearer token is missing or invalid'
  };
}

export async function POST(request) {
  const auth = hasValidBearerToken(request);

  if (!auth.ok) {
    return NextResponse.json(
      {
        status: 'blocked',
        install_allowed: false,
        error: auth.reason
      },
      { status: 401 }
    );
  }

  const payload = await request.json();
  const plan = buildInstallPlan(payload);

  return NextResponse.json(plan, { status: plan.status === 'ready' ? 200 : 422 });
}
