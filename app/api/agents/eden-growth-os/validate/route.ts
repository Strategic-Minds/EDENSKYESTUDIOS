import { NextResponse } from 'next/server'

import { logEdenReceipt } from '@/lib/eden/receipts'

export const dynamic = 'force-dynamic'

type ValidationLane = {
  key: string
  purpose: string
  readiness: 'R1' | 'R2' | 'R3'
  externalExecutionAllowed: false
  requiredNextStep: string
}

const LANES: ValidationLane[] = [
  {
    key: 'discovery-validation',
    purpose: 'Validate trend, keyword, phrase, hashtag, competitor, audience, and performance signals.',
    readiness: 'R1',
    externalExecutionAllowed: false,
    requiredNextStep: 'Connect approved signal sources and write signal_events.'
  },
  {
    key: 'opportunity-scoring',
    purpose: 'Score opportunities by trend, competition, velocity, audience match, and conversion value.',
    readiness: 'R2',
    externalExecutionAllowed: false,
    requiredNextStep: 'Persist opportunity_scores with source evidence.'
  },
  {
    key: 'persona-routing',
    purpose: 'Verify persona, platform, account label, screen name, and approval state before execution.',
    readiness: 'R2',
    externalExecutionAllowed: false,
    requiredNextStep: 'Reconcile thereal_edenskye and other handles into the live account map.'
  },
  {
    key: 'prompt-registry',
    purpose: 'Version prompts, pause weak prompts, and connect prompt performance to outcomes.',
    readiness: 'R2',
    externalExecutionAllowed: false,
    requiredNextStep: 'Create prompt_registry and migrate active image/social/video prompts.'
  },
  {
    key: 'image-asset-qa',
    purpose: 'Validate realism, source consistency, duplicate risk, storage, and approval status.',
    readiness: 'R2',
    externalExecutionAllowed: false,
    requiredNextStep: 'Connect generated_asset_jobs to media_assets and approval_queue.'
  },
  {
    key: 'social-draft-qa',
    purpose: 'Validate captions, hooks, scripts, hashtag sets, platform fit, and brand safety.',
    readiness: 'R2',
    externalExecutionAllowed: false,
    requiredNextStep: 'Create approval-ready social draft packet schema.'
  },
  {
    key: 'kpi-performance',
    purpose: 'Import Metricool, Shopify, Vercel, and Supabase performance metrics.',
    readiness: 'R1',
    externalExecutionAllowed: false,
    requiredNextStep: 'Verify read-only analytics credentials and write performance_metrics.'
  },
  {
    key: 'auto-diagnosis',
    purpose: 'Find stale jobs, failed providers, missing env vars, storage failures, and queue problems.',
    readiness: 'R2',
    externalExecutionAllowed: false,
    requiredNextStep: 'Write diagnostics_events from heartbeat and workflow failures.'
  },
  {
    key: 'auto-heal',
    purpose: 'Safely retry or quarantine low-risk internal failures without public consequences.',
    readiness: 'R2',
    externalExecutionAllowed: false,
    requiredNextStep: 'Implement allowlisted auto_heal_actions only.'
  },
  {
    key: 'hardening',
    purpose: 'Check auth, rate limits, RLS, receipts, route modes, and unsafe configuration.',
    readiness: 'R2',
    externalExecutionAllowed: false,
    requiredNextStep: 'Add release gate checks before any live_guarded mode.'
  },
  {
    key: 'growth-review',
    purpose: 'Convert outcomes into scale, stop, and test-next decisions.',
    readiness: 'R2',
    externalExecutionAllowed: false,
    requiredNextStep: 'Schedule weekly growth review after metrics import is live.'
  }
]

export async function GET(request: Request) {
  const authorization = getValidationAuthorizationState(request)

  if (!authorization.allowed) {
    return NextResponse.json(
      {
        ok: false,
        system: 'eden-growth-os-validation-agents',
        error: authorization.error
      },
      { status: authorization.status }
    )
  }

  const publicExecutionEnabled = process.env.GROWTH_PUBLIC_EXECUTION_ENABLED === 'true'
  const safe = !publicExecutionEnabled

  const receipt = await logEdenReceipt({
    eventType: 'eden.growth_os.agent_validation',
    action: 'validate_growth_os_agent_lanes',
    status: safe ? 'allowed' : 'blocked',
    riskLevel: safe ? 'green' : 'red',
    target: 'eden_growth_os_validation_agents',
    details: {
      authorization: authorization.mode,
      publicExecutionEnabled,
      lanes: LANES.map((lane) => ({ key: lane.key, readiness: lane.readiness }))
    }
  })

  return NextResponse.json({
    ok: safe,
    system: 'eden-growth-os-validation-agents',
    authorization: authorization.mode,
    publicExecutionEnabled,
    executionGate: safe ? 'draft_safe_validation_only' : 'blocked_public_execution_flag_enabled',
    lanes: LANES,
    blockedActions: [
      'public_posting',
      'public_replies',
      'customer_messages',
      'paid_promotion',
      'shopify_mutation',
      'payment_changes',
      'production_database_migration',
      'live_avatar_video_publication'
    ],
    receipt
  })
}

function getValidationAuthorizationState(request: Request):
  | { allowed: true; mode: 'operator_token' | 'authorized_cron' | 'preview_manual_validation' }
  | { allowed: false; status: 401 | 503; error: string } {
  const operatorToken = process.env.EDEN_ADMIN_OPERATOR_TOKEN?.trim() || process.env.EDEN_IMAGE_GENERATOR_ADMIN_TOKEN?.trim()
  const cronSecret = process.env.CRON_SECRET?.trim()
  const authHeader = request.headers.get('authorization')
  const isProduction = process.env.VERCEL_ENV === 'production'

  if (operatorToken && authHeader === `Bearer ${operatorToken}`) {
    return { allowed: true, mode: 'operator_token' }
  }

  if (cronSecret && authHeader === `Bearer ${cronSecret}`) {
    return { allowed: true, mode: 'authorized_cron' }
  }

  if (isProduction) {
    return {
      allowed: false,
      status: operatorToken || cronSecret ? 401 : 503,
      error: operatorToken || cronSecret ? 'Unauthorized validation request.' : 'Operator token or CRON_SECRET is required in production.'
    }
  }

  return { allowed: true, mode: 'preview_manual_validation' }
}
