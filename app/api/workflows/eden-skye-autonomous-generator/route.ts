import { NextResponse } from "next/server"

import { EDEN_WORKFLOWS, runEdenWorkflow } from "@/src/lib/eden-workflow"

export async function GET() {
  return NextResponse.json({
    ok: true,
    system: "eden-skye-autonomous-generator-validation-loop",
    roleModel: "one_operating_agent_one_independent_validator",
    liveMutationLocked: true,
    workflows: EDEN_WORKFLOWS
  })
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const receipt = runEdenWorkflow({
    workflowId: body.workflowId ?? "source_truth_reconciliation",
    trigger: body.trigger ?? "manual",
    dryRun: body.dryRun ?? true,
    payload: body.payload ?? {}
  })

  return NextResponse.json(receipt, { status: receipt.status === "blocked" ? 409 : 200 })
}
