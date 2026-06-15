import { NextResponse } from "next/server"

import { runEdenWorkflow } from "@/src/lib/eden-workflow"

const DAILY_SEQUENCE = [
  "source_truth_reconciliation",
  "viral_discovery_digest",
  "content_generation_batch",
  "content_quality_gate",
  "sandbox_test_runner",
  "analytics_ingestion",
  "optimization_recommender",
  "validator_gate"
]

export async function GET(request: Request) {
  const authorization = getCronAuthorizationState(request)

  if (!authorization.allowed) {
    return NextResponse.json(
      {
        ok: false,
        system: "eden-skye-generator-tick",
        liveMutationLocked: true,
        error: authorization.error
      },
      { status: authorization.status }
    )
  }

  const url = new URL(request.url)
  const workflowId = url.searchParams.get("workflowId")

  if (workflowId) {
    const receipt = runEdenWorkflow({ workflowId, trigger: "cron", dryRun: true })
    return NextResponse.json(receipt, { status: receipt.status === "blocked" ? 409 : 200 })
  }

  const receipts = DAILY_SEQUENCE.map((id) =>
    runEdenWorkflow({ workflowId: id, trigger: "cron", dryRun: true })
  )

  return NextResponse.json({
    ok: true,
    system: "eden-skye-generator-tick",
    liveMutationLocked: true,
    dryRunForced: true,
    cronAuthorization: authorization.mode,
    receipts
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
