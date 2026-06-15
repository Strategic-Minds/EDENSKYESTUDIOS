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
    receipts
  })
}
