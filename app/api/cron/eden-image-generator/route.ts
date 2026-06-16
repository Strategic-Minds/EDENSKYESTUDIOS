import { NextResponse } from 'next/server'

import { runEdenImagePipeline } from '@/src/lib/eden-image-generator'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const authorization = getCronAuthorizationState(request)

  if (!authorization.allowed) {
    return NextResponse.json(
      {
        ok: false,
        system: 'eden-image-generator-cron',
        livePublicationLocked: true,
        error: authorization.error
      },
      { status: authorization.status }
    )
  }

  const url = new URL(request.url)
  const requestedMode = url.searchParams.get('mode')
  const mode = requestedMode === 'generate' || process.env.EDEN_IMAGE_CRON_MODE === 'generate' ? 'generate' : 'validate'
  const limit = Number(url.searchParams.get('limit') ?? process.env.EDEN_IMAGE_CRON_LIMIT ?? '') || undefined
  const result = await runEdenImagePipeline({ mode, limit, trigger: 'cron' })

  return NextResponse.json({
    ...result,
    cronAuthorization: authorization.mode
  })
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
