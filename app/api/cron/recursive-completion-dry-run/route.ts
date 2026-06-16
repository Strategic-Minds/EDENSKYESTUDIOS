import { NextResponse } from "next/server"

import { runRecursiveCompletionDryRun } from "@/src/lib/recursive-completion"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const authorization = getCronAuthorizationState(request)

  if (!authorization.allowed) {
    return NextResponse.json(
      {
        ok: false,
        system: "eden-recursive-completion-engine",
        liveMutationLocked: true,
        dryRunForced: true,
        error: authorization.error
      },
      { status: authorization.status }
    )
  }

  const url = new URL(request.url)
  const lane = url.searchParams.get("lane")
  const result = runRecursiveCompletionDryRun({ laneName: lane, trigger: "cron" })

  return NextResponse.json({
    ...result,
    cronAuthorization: authorization.mode
  })
}

function getCronAuthorizationState(request: Request):
  | { allowed: true; mode: "authorized_cron" | "preview_manual_validation" }
  | { allowed: false; status: 401 | 503; error: string } {
  const cronSecret = process.env.CRON_SECRET?.trim()
  const authHeader = request.headers.get("authorization")
  const isProduction = process.env.VERCEL_ENV === "production"

  if (cronSecret) {
    if (authHeader === `Bearer ${cronSecret}`) {
      return { allowed: true, mode: "authorized_cron" }
    }

    if (isProduction) {
      return { allowed: false, status: 401, error: "Unauthorized cron request." }
    }
  }

  if (isProduction) {
    return { allowed: false, status: 503, error: "CRON_SECRET is required for production cron execution." }
  }

  return { allowed: true, mode: "preview_manual_validation" }
}
