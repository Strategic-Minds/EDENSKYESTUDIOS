import { NextResponse } from 'next/server'

import {
  edenForensicRepairWorkflow,
  type EdenForensicRepairInput,
  type EdenForensicRepairMode
} from '@/src/workflows/eden-forensic-repair'

export const dynamic = 'force-dynamic'

const allowedModes: EdenForensicRepairMode[] = [
  'audit',
  'repair_draft',
  'validate',
  'approval_wait',
  'execute_approved'
]

export async function GET(request: Request) {
  const url = new URL(request.url)
  const mode = normalizeMode(url.searchParams.get('mode'))
  const authorization = authorizeMode(request, mode)

  if (!authorization.allowed) {
    return NextResponse.json(authorization.body, { status: authorization.status })
  }

  const result = await edenForensicRepairWorkflow({
    mode,
    lane: url.searchParams.get('lane') ?? detectCronLane(request),
    baseUrl: url.origin,
    approvedActions: parseApprovedActions(url.searchParams.get('approved_actions'))
  })

  return NextResponse.json(result)
}

export async function POST(request: Request) {
  const body = await safeReadBody(request)
  const mode = normalizeMode(body.mode)
  const authorization = authorizeMode(request, mode)

  if (!authorization.allowed) {
    return NextResponse.json(authorization.body, { status: authorization.status })
  }

  const url = new URL(request.url)
  const result = await edenForensicRepairWorkflow({
    mode,
    lane: typeof body.lane === 'string' ? body.lane : 'manual_post',
    baseUrl: typeof body.baseUrl === 'string' ? body.baseUrl : url.origin,
    approvedActions: Array.isArray(body.approvedActions)
      ? body.approvedActions.filter((action): action is string => typeof action === 'string')
      : []
  })

  return NextResponse.json(result)
}

function normalizeMode(mode: unknown): EdenForensicRepairMode {
  return typeof mode === 'string' && allowedModes.includes(mode as EdenForensicRepairMode)
    ? (mode as EdenForensicRepairMode)
    : 'audit'
}

function authorizeMode(request: Request, mode: EdenForensicRepairMode):
  | { allowed: true }
  | { allowed: false; status: 401 | 403; body: Record<string, unknown> } {
  if (mode !== 'execute_approved') return { allowed: true }

  const cronSecret = process.env.CRON_SECRET?.trim()
  const authHeader = request.headers.get('authorization')
  const allowed = Boolean(cronSecret && authHeader === `Bearer ${cronSecret}`)

  if (!allowed) {
    return {
      allowed: false,
      status: cronSecret ? 401 : 403,
      body: {
        ok: false,
        workflow: 'eden-forensic-repair-workflow',
        liveMutationLocked: true,
        error: cronSecret
          ? 'execute_approved mode requires CRON_SECRET bearer authorization.'
          : 'execute_approved mode is disabled until CRON_SECRET is configured.'
      }
    }
  }

  return { allowed: true }
}

async function safeReadBody(request: Request): Promise<Record<string, unknown>> {
  try {
    const parsed = await request.json()
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {}
  } catch {
    return {}
  }
}

function parseApprovedActions(value: string | null) {
  if (!value) return []
  return value
    .split(',')
    .map((action) => action.trim())
    .filter(Boolean)
}

function detectCronLane(request: Request) {
  if (request.headers.get('x-vercel-cron') === '1') return 'scheduled_forensic_watch'
  return 'manual_get'
}
