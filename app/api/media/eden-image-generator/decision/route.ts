import { NextResponse } from 'next/server'

import { logEdenReceipt } from '@/lib/eden/receipts'
import { createSupabaseServerClient, hasSupabaseServerConfig, usesServiceRole } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

type Decision = 'approve' | 'revise' | 'reject'

type DecisionPersistence =
  | { status: 'updated' }
  | { status: 'skipped'; reason: string }
  | { status: 'failed'; error: string }

export async function POST(request: Request) {
  const authorization = getDecisionAuthorizationState(request)

  if (!authorization.allowed) {
    return NextResponse.json({ ok: false, error: authorization.error }, { status: authorization.status })
  }

  const body = await readBody(request)
  const promptId = String(body.promptId ?? '').trim()
  const placement = String(body.placement ?? '').trim()
  const mediaAssetId = typeof body.mediaAssetId === 'string' ? body.mediaAssetId.trim() : undefined
  const decision = normalizeDecision(body.decision)

  if (!promptId || !decision) {
    return NextResponse.json(
      { ok: false, error: 'promptId and decision are required.' },
      { status: 400 }
    )
  }

  const decisionPersistence = await persistDecision({ mediaAssetId, decision })

  const receipt = await logEdenReceipt({
    eventType: 'eden.image_generator.decision',
    action: `operator_${decision}_draft_image`,
    status: decision === 'approve' ? 'allowed' : 'dry_run',
    riskLevel: decision === 'approve' ? 'yellow' : 'green',
    target: mediaAssetId ?? promptId,
    details: {
      promptId,
      placement,
      mediaAssetId: mediaAssetId ?? null,
      decision,
      decisionPersistence,
      publicUseAllowed: false,
      note: 'Decision captured inside approval UI. Public website use still requires final asset promotion step.'
    }
  })

  return NextResponse.json({
    ok: true,
    promptId,
    placement,
    mediaAssetId: mediaAssetId ?? null,
    decision,
    decisionPersistence,
    publicUseAllowed: false,
    receipt
  })
}

async function persistDecision(input: { mediaAssetId?: string; decision: Decision }): Promise<DecisionPersistence> {
  if (!input.mediaAssetId) {
    return { status: 'skipped', reason: 'No mediaAssetId was supplied for this decision.' }
  }

  if (!hasSupabaseServerConfig() || !usesServiceRole) {
    return { status: 'skipped', reason: 'Supabase service role persistence is not configured.' }
  }

  try {
    const supabase = createSupabaseServerClient()
    const { error } = await supabase
      .from('media_assets')
      .update({ approval_status: decisionToApprovalStatus(input.decision) })
      .eq('id', input.mediaAssetId)

    if (error) throw error
    return { status: 'updated' }
  } catch (error) {
    return { status: 'failed', error: describeDecisionPersistenceError(error) }
  }
}

async function readBody(request: Request) {
  try {
    return (await request.json()) as Record<string, unknown>
  } catch {
    return {}
  }
}

function normalizeDecision(value: unknown): Decision | null {
  if (value === 'approve' || value === 'revise' || value === 'reject') return value
  return null
}

function decisionToApprovalStatus(decision: Decision) {
  if (decision === 'approve') return 'approved_for_next_review'
  if (decision === 'revise') return 'revision_requested'
  return 'rejected'
}

function getDecisionAuthorizationState(request: Request):
  | { allowed: true; mode: 'authorized_operator' | 'authorized_cron' | 'preview_manual_validation' }
  | { allowed: false; status: 401 | 503; error: string } {
  const adminToken = process.env.EDEN_IMAGE_GENERATOR_ADMIN_TOKEN?.trim()
  const cronSecret = process.env.CRON_SECRET?.trim()
  const authHeader = request.headers.get('authorization')
  const isProduction = process.env.VERCEL_ENV === 'production'

  if (adminToken && authHeader === `Bearer ${adminToken}`) {
    return { allowed: true, mode: 'authorized_operator' }
  }

  if (cronSecret && authHeader === `Bearer ${cronSecret}`) {
    return { allowed: true, mode: 'authorized_cron' }
  }

  if (isProduction) {
    return {
      allowed: false,
      status: adminToken || cronSecret ? 401 : 503,
      error: adminToken || cronSecret
        ? 'Unauthorized image decision request.'
        : 'EDEN_IMAGE_GENERATOR_ADMIN_TOKEN or CRON_SECRET is required in production.'
    }
  }

  return { allowed: true, mode: 'preview_manual_validation' }
}

function describeDecisionPersistenceError(error: unknown) {
  if (error instanceof Error) return error.message

  if (error && typeof error === 'object') {
    const maybeMessage = 'message' in error ? error.message : undefined
    const maybeCode = 'code' in error ? error.code : undefined
    const maybeDetails = 'details' in error ? error.details : undefined
    const maybeHint = 'hint' in error ? error.hint : undefined

    return JSON.stringify({
      message: maybeMessage,
      code: maybeCode,
      details: maybeDetails,
      hint: maybeHint
    })
  }

  return String(error)
}
