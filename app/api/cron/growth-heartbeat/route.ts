import { NextResponse } from 'next/server'

import { logEdenReceipt } from '@/lib/eden/receipts'

export const dynamic = 'force-dynamic'

type HeartbeatCheck = {
  name: string
  ok: boolean
  status: 'healthy' | 'degraded' | 'paused' | 'blocked'
  detail: string
}

const PUBLIC_EXECUTION_ENABLED = false

export async function GET(request: Request) {
  const authorization = getCronAuthorizationState(request)

  if (!authorization.allowed) {
    return NextResponse.json(
      {
        ok: false,
        system: 'eden-growth-os-heartbeat',
        publicExecutionEnabled: PUBLIC_EXECUTION_ENABLED,
        error: authorization.error
      },
      { status: authorization.status }
    )
  }

  const mode = normalizeSystemMode(process.env.SYSTEM_MODE)
  const checks: HeartbeatCheck[] = [
    {
      name: 'runtime_mode',
      ok: mode !== 'off',
      status: mode === 'off' ? 'paused' : 'healthy',
      detail: `SYSTEM_MODE=${mode}`
    },
    {
      name: 'public_execution_gate',
      ok: process.env.GROWTH_PUBLIC_EXECUTION_ENABLED !== 'true' && !PUBLIC_EXECUTION_ENABLED,
      status: process.env.GROWTH_PUBLIC_EXECUTION_ENABLED === 'true' ? 'blocked' : 'healthy',
      detail: 'Public/social/Shopify/payment execution remains locked.'
    },
    {
      name: 'cron_secret_presence',
      ok: Boolean(process.env.CRON_SECRET?.trim()) || process.env.VERCEL_ENV !== 'production',
      status: Boolean(process.env.CRON_SECRET?.trim()) || process.env.VERCEL_ENV !== 'production' ? 'healthy' : 'degraded',
      detail: process.env.CRON_SECRET?.trim() ? 'CRON_SECRET configured.' : 'CRON_SECRET missing; required for hardened production cron auth.'
    },
    {
      name: 'metricool_eden_handle_reconciliation',
      ok: Boolean(process.env.METRICOOL_EDEN_SKYE_HANDLE?.trim()),
      status: process.env.METRICOOL_EDEN_SKYE_HANDLE?.trim() ? 'healthy' : 'degraded',
      detail: process.env.METRICOOL_EDEN_SKYE_HANDLE?.trim() || 'Expected handle to reconcile: thereal_edenskye.'
    }
  ]

  const ok = checks.every((check) => check.ok) || mode === 'monitor' || mode === 'draft_safe'
  const health = checks.some((check) => check.status === 'blocked')
    ? 'blocked'
    : checks.some((check) => check.status === 'degraded')
      ? 'degraded'
      : mode === 'off'
        ? 'paused'
        : 'healthy'

  const receipt = await logEdenReceipt({
    eventType: 'eden.growth_os.heartbeat',
    action: 'run_growth_os_five_minute_heartbeat',
    status: ok ? 'allowed' : 'failed',
    riskLevel: 'green',
    target: 'eden_growth_os_runtime',
    details: {
      mode,
      health,
      cronAuthorization: authorization.mode,
      publicExecutionEnabled: PUBLIC_EXECUTION_ENABLED,
      checks
    }
  })

  return NextResponse.json({
    ok,
    system: 'eden-growth-os-heartbeat',
    mode,
    health,
    cronAuthorization: authorization.mode,
    publicExecutionEnabled: PUBLIC_EXECUTION_ENABLED,
    blockedActions: [
      'public_posting',
      'public_replies',
      'customer_messages',
      'paid_promotion',
      'shopify_mutation',
      'payment_changes',
      'live_avatar_video_publication'
    ],
    checks,
    receipt
  })
}

function normalizeSystemMode(value: string | undefined) {
  if (value === 'off' || value === 'monitor' || value === 'draft_safe' || value === 'approval_ready' || value === 'live_guarded') {
    return value
  }

  return 'draft_safe'
}

function getCronAuthorizationState(request: Request):
  | { allowed: true; mode: 'authorized_cron' | 'vercel_cron' | 'preview_manual_validation' }
  | { allowed: false; status: 401 | 503; error: string } {
  const cronSecret = process.env.CRON_SECRET?.trim()
  const authHeader = request.headers.get('authorization')
  const isProduction = process.env.VERCEL_ENV === 'production'
  const isVercelCron = request.headers.get('x-vercel-cron') === '1'

  if (cronSecret && authHeader === `Bearer ${cronSecret}`) {
    return { allowed: true, mode: 'authorized_cron' }
  }

  if (isVercelCron) {
    return { allowed: true, mode: 'vercel_cron' }
  }

  if (isProduction) {
    return {
      allowed: false,
      status: cronSecret ? 401 : 503,
      error: cronSecret ? 'Unauthorized cron request.' : 'CRON_SECRET is required for production cron execution.'
    }
  }

  return { allowed: true, mode: 'preview_manual_validation' }
}
