import { NextResponse } from 'next/server'

import { logEdenReceipt } from '@/lib/eden/receipts'
import { createSupabaseServerClient, hasSupabaseServerConfig, usesServiceRole } from '@/lib/supabase-server'
import { runEdenImagePipeline } from '@/src/lib/eden-image-generator'

export const dynamic = 'force-dynamic'

type AutomationStep = {
  name: string
  ok: boolean
  status: 'completed' | 'skipped' | 'failed'
  detail?: string
  count?: number
}

export async function GET(request: Request) {
  const authorization = getCronAuthorizationState(request)

  if (!authorization.allowed) {
    return NextResponse.json(
      {
        ok: false,
        system: 'eden-image-automation-cron',
        livePublicationLocked: true,
        error: authorization.error
      },
      { status: authorization.status }
    )
  }

  const steps: AutomationStep[] = []
  const validateResult = await runEdenImagePipeline({
    mode: 'validate',
    limit: 1,
    trigger: 'cron',
    settings: getCronRuntimeSettings()
  })

  steps.push({
    name: 'validate_generator_readiness',
    ok: validateResult.ok,
    status: validateResult.ok ? 'completed' : 'failed',
    detail: validateResult.readiness?.blockers?.join('; ') || 'ready'
  })

  if (process.env.EDEN_IMAGE_WORKFLOW_GENERATE_ENABLED === 'true') {
    const generateResult = await runEdenImagePipeline({
      mode: 'generate',
      limit: 1,
      trigger: 'cron',
      settings: getCronRuntimeSettings()
    })

    steps.push({
      name: 'generate_one_stored_draft',
      ok: generateResult.ok,
      status: generateResult.ok ? 'completed' : 'failed',
      count: generateResult.generated?.filter((item) => item.status === 'generated').length ?? 0,
      detail: generateResult.readiness?.blockers?.join('; ') || generateResult.nextAction
    })
  } else {
    steps.push({
      name: 'generate_one_stored_draft',
      ok: true,
      status: 'skipped',
      detail: 'Set EDEN_IMAGE_WORKFLOW_GENERATE_ENABLED=true to let the 5-minute workflow generate one stored draft per tick.'
    })
  }

  const promotionResult = await promoteApprovedDrafts()
  steps.push(promotionResult)

  const receipt = await logEdenReceipt({
    eventType: 'eden.image_automation.tick',
    action: 'run_five_minute_image_asset_workflow',
    status: steps.every((step) => step.ok) ? 'allowed' : 'failed',
    riskLevel: 'yellow',
    target: 'eden_image_asset_pipeline',
    details: {
      livePublicationLocked: true,
      cronAuthorization: authorization.mode,
      generationEnabled: process.env.EDEN_IMAGE_WORKFLOW_GENERATE_ENABLED === 'true',
      promotionEnabled: process.env.EDEN_IMAGE_WORKFLOW_PROMOTE_ENABLED !== 'false',
      steps
    }
  })

  return NextResponse.json({
    ok: steps.every((step) => step.ok),
    system: 'eden-image-automation-cron',
    livePublicationLocked: true,
    publicWebsiteMutationAllowed: false,
    cronAuthorization: authorization.mode,
    steps,
    receipt
  })
}

async function promoteApprovedDrafts(): Promise<AutomationStep> {
  if (process.env.EDEN_IMAGE_WORKFLOW_PROMOTE_ENABLED === 'false') {
    return {
      name: 'promote_approved_drafts_to_website_candidates',
      ok: true,
      status: 'skipped',
      detail: 'EDEN_IMAGE_WORKFLOW_PROMOTE_ENABLED=false'
    }
  }

  if (!hasSupabaseServerConfig() || !usesServiceRole) {
    return {
      name: 'promote_approved_drafts_to_website_candidates',
      ok: true,
      status: 'skipped',
      detail: 'Supabase service role is not configured.'
    }
  }

  try {
    const supabase = createSupabaseServerClient()
    const { data: approvedAssets, error: selectError } = await supabase
      .from('media_assets')
      .select('id, asset_role, storage_bucket, storage_path, approval_status, usage_scope')
      .eq('source_tool', 'eden-skye-website-image-generator')
      .eq('approval_status', 'approved_for_next_review')
      .limit(10)

    if (selectError) throw selectError

    const ids = approvedAssets?.map((asset) => asset.id).filter(Boolean) ?? []
    if (ids.length === 0) {
      return {
        name: 'promote_approved_drafts_to_website_candidates',
        ok: true,
        status: 'completed',
        count: 0,
        detail: 'No approved drafts are waiting for promotion.'
      }
    }

    const { error: updateError } = await supabase
      .from('media_assets')
      .update({
        status: 'approved',
        approval_status: 'approved_for_website_asset',
        usage_scope: 'website_candidate'
      })
      .in('id', ids)

    if (updateError) throw updateError

    return {
      name: 'promote_approved_drafts_to_website_candidates',
      ok: true,
      status: 'completed',
      count: ids.length,
      detail: 'Approved drafts promoted to website_candidate. Public website mutation remains locked.'
    }
  } catch (error) {
    return {
      name: 'promote_approved_drafts_to_website_candidates',
      ok: false,
      status: 'failed',
      detail: describeAutomationError(error)
    }
  }
}

function getCronRuntimeSettings() {
  return {
    quality: normalizeQuality(process.env.EDEN_IMAGE_WORKFLOW_QUALITY),
    referenceMode: process.env.EDEN_IMAGE_WORKFLOW_REFERENCE_MODE === 'off' ? 'off' as const : 'on' as const,
    referenceCount: 1,
    maxBatchSize: 1,
    providerTimeoutMs: normalizeTimeout(process.env.EDEN_IMAGE_WORKFLOW_TIMEOUT_MS),
    saveMediaAssets: process.env.EDEN_IMAGE_WORKFLOW_SAVE_MEDIA_ASSETS !== 'false'
  }
}

function normalizeQuality(value: string | undefined) {
  if (value === 'low' || value === 'medium' || value === 'high' || value === 'auto') return value
  return 'medium'
}

function normalizeTimeout(value: string | undefined) {
  const configured = Number(value ?? '')
  if (Number.isFinite(configured) && configured >= 10_000) return Math.min(Math.floor(configured), 300_000)
  return 120_000
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

function describeAutomationError(error: unknown) {
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
