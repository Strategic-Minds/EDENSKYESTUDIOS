import { NextResponse } from 'next/server'

import { runEdenImagePipeline, type EdenImageGenerationMode, type EdenImageRuntimeSettings } from '@/src/lib/eden-image-generator'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  return handleImageGeneratorRequest(request, 'manual')
}

export async function POST(request: Request) {
  return handleImageGeneratorRequest(request, 'manual')
}

async function handleImageGeneratorRequest(request: Request, trigger: 'manual' | 'cron') {
  const authorization = getImageGeneratorAuthorizationState(request)

  if (!authorization.allowed) {
    return NextResponse.json(
      {
        ok: false,
        system: 'eden-skye-website-image-generator',
        livePublicationLocked: true,
        error: authorization.error
      },
      { status: authorization.status }
    )
  }

  const url = new URL(request.url)
  const body = request.method === 'POST' ? await readBody(request) : {}
  const requestedMode = String(body.mode ?? url.searchParams.get('mode') ?? 'validate')
  const mode: EdenImageGenerationMode = requestedMode === 'generate' ? 'generate' : 'validate'
  const limit = Number(body.limit ?? url.searchParams.get('limit') ?? '') || undefined
  const promptId = String(body.promptId ?? url.searchParams.get('promptId') ?? '').trim() || undefined
  const settings = normalizeRuntimeSettings(body.settings)
  const result = await runEdenImagePipeline({ mode, limit, promptId, trigger, settings })

  return NextResponse.json({
    ...result,
    authorization: authorization.mode
  })
}

async function readBody(request: Request) {
  try {
    return (await request.json()) as Record<string, unknown>
  } catch {
    return {}
  }
}

function normalizeRuntimeSettings(value: unknown): EdenImageRuntimeSettings | undefined {
  if (!value || typeof value !== 'object') return undefined
  const input = value as Record<string, unknown>
  const settings: EdenImageRuntimeSettings = {}

  if (input.quality === 'low' || input.quality === 'medium' || input.quality === 'high' || input.quality === 'auto') {
    settings.quality = input.quality
  }

  if (input.referenceMode === 'on' || input.referenceMode === 'off') {
    settings.referenceMode = input.referenceMode
  }

  if (typeof input.referenceCount === 'number') {
    settings.referenceCount = input.referenceCount
  }

  if (typeof input.maxBatchSize === 'number') {
    settings.maxBatchSize = input.maxBatchSize
  }

  if (typeof input.providerTimeoutMs === 'number') {
    settings.providerTimeoutMs = input.providerTimeoutMs
  }

  if (typeof input.saveMediaAssets === 'boolean') {
    settings.saveMediaAssets = input.saveMediaAssets
  }

  return settings
}

function getImageGeneratorAuthorizationState(request: Request):
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
        ? 'Unauthorized image generator request.'
        : 'EDEN_IMAGE_GENERATOR_ADMIN_TOKEN or CRON_SECRET is required in production.'
    }
  }

  return { allowed: true, mode: 'preview_manual_validation' }
}
