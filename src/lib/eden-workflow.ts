export type RiskClass =
  | "read_only"
  | "draft_write"
  | "preview_write"
  | "approval_required"
  | "forbidden_without_explicit_operator_override"

export type WorkflowStatus = "passed" | "failed" | "blocked" | "pending" | "partial"

export interface WorkflowDefinition {
  id: string
  title: string
  purpose: string
  riskClass: RiskClass
  outputs: string[]
}

export interface WorkflowReceipt {
  receipt_id: string
  created_at: string
  workflow_id: string
  run_id: string
  risk_class: RiskClass
  status: WorkflowStatus
  inputs: Record<string, unknown>
  outputs: Record<string, unknown>
  evidence: string[]
  blockers: string[]
  rollback: string
  live_mutation_performed: boolean
  approval_reference: string | null
  next_action: string
}

export const EDEN_WORKFLOWS: WorkflowDefinition[] = [
  { id: "source_truth_reconciliation", title: "Source Truth Reconciliation", purpose: "Compare source truth, repo, Drive metadata, preview state, receipts, and memory.", riskClass: "read_only", outputs: ["source_truth_conflict_ledger", "blocker_list", "receipt"] },
  { id: "route_env_asset_scan", title: "Route, Env, And Asset Scan", purpose: "Inventory routes, env contract, assets, links, leakage, and readiness states.", riskClass: "read_only", outputs: ["route_inventory", "env_gap_list", "asset_gap_list", "receipt"] },
  { id: "viral_discovery_digest", title: "Viral Discovery Digest", purpose: "Collect viral patterns, hooks, formats, CTAs, comments, and content opportunities.", riskClass: "read_only", outputs: ["trend_digest", "opportunity_queue", "receipt"] },
  { id: "content_generation_batch", title: "Content Generation Batch", purpose: "Generate draft hooks, scripts, captions, image prompts, video briefs, emails, and CTAs.", riskClass: "draft_write", outputs: ["content_draft_queue", "receipt"] },
  { id: "content_quality_gate", title: "Content Quality Gate", purpose: "Score drafts and assign approve, revise, or block state.", riskClass: "draft_write", outputs: ["quality_scores", "approval_candidates", "blocked_drafts", "receipt"] },
  { id: "ab_test_builder", title: "A/B Test Builder", purpose: "Create A/B experiments with hypotheses, variants, metrics, thresholds, and decision rules.", riskClass: "draft_write", outputs: ["experiment_specs", "receipt"] },
  { id: "sandbox_test_runner", title: "Sandbox Test Runner", purpose: "Run isolated tests, generated scripts, route checks, and build checks in sandbox.", riskClass: "preview_write", outputs: ["sandbox_receipt", "test_artifacts"] },
  { id: "analytics_ingestion", title: "Analytics Ingestion", purpose: "Pull approved analytics metrics and create snapshots.", riskClass: "read_only", outputs: ["metrics_snapshot", "receipt"] },
  { id: "optimization_recommender", title: "Optimization Recommender", purpose: "Recommend kill, revise, scale, replicate, hold, or archive decisions.", riskClass: "draft_write", outputs: ["optimization_queue", "receipt"] },
  { id: "self_heal_safe_fixes", title: "Self-Heal Safe Fixes", purpose: "Apply safe fixes only and escalate risky issues.", riskClass: "draft_write", outputs: ["fix_receipts", "blocked_action_tickets"] },
  { id: "validator_gate", title: "Independent Validator Gate", purpose: "Independent validator reviews evidence and returns go/no-go.", riskClass: "read_only", outputs: ["validation_evidence_ledger", "go_no_go", "retest_schedule"] },
  { id: "investor_report_draft", title: "Investor Report Draft", purpose: "Create evidence-backed investor/mentor update draft.", riskClass: "draft_write", outputs: ["investor_report_draft", "receipt"] }
]

type LockedActionRule = {
  id: string
  phrases: string[]
}

const LOCKED_ACTION_RULES: LockedActionRule[] = [
  { id: "production_deploy", phrases: ["production deploy", "deploy production", "prod deploy", "promote production", "production promotion", "ship live", "go live"] },
  { id: "live_shopify_mutation", phrases: ["live shopify", "shopify mutation", "publish product", "update product", "create product", "set inventory", "discount live"] },
  { id: "live_payment_activation", phrases: ["live payment", "activate payment", "create payment link", "finalize invoice", "charge customer", "stripe live"] },
  { id: "public_social_publishing", phrases: ["public social", "publish social", "post social", "go public", "publish instagram", "publish tiktok", "publish youtube"] },
  { id: "production_database_mutation", phrases: ["production database", "prod database", "database mutation", "apply migration", "execute sql", "write database"] },
  { id: "drive_rename_copy_promotion", phrases: ["drive rename", "drive copy", "drive promotion", "promote drive", "rename file", "copy file"] },
  { id: "production_manifest_mutation", phrases: ["production manifest", "manifest mutation", "update manifest", "promote manifest", "green status"] },
  { id: "paid_generation_burst", phrases: ["paid generation", "generation burst", "spend credits", "paid run", "buy credits"] },
  { id: "destructive_delete", phrases: ["destructive delete", "delete production", "hard delete", "drop table", "remove live"] },
  { id: "secret_exposure", phrases: ["secret exposure", "expose secret", "return secret", "print secret", "show api key", "show token", "leak secret"] }
]

const LOCKED_ACTION_IDS = new Set(LOCKED_ACTION_RULES.map((rule) => rule.id))

export function getWorkflowDefinition(workflowId: string) {
  return EDEN_WORKFLOWS.find((workflow) => workflow.id === workflowId)
}

export function findLockedActionMatches(payload: unknown): string[] {
  const candidates = collectStringCandidates(payload)
  const matches = new Set<string>()

  for (const candidate of candidates) {
    const normalized = normalizeActionText(candidate)

    for (const rule of LOCKED_ACTION_RULES) {
      if (LOCKED_ACTION_IDS.has(normalized.replace(/ /g, "_"))) {
        matches.add(normalized.replace(/ /g, "_"))
      }

      if (rule.id === candidate || rule.id === normalized.replace(/ /g, "_")) {
        matches.add(rule.id)
      }

      if (rule.phrases.some((phrase) => normalized.includes(normalizeActionText(phrase)))) {
        matches.add(rule.id)
      }
    }
  }

  return Array.from(matches).sort()
}

export function runEdenWorkflow(input: {
  workflowId: string
  trigger: "manual" | "cron" | "validator" | "system"
  dryRun?: boolean
  payload?: Record<string, unknown>
}): WorkflowReceipt {
  const workflow = getWorkflowDefinition(input.workflowId)

  if (!workflow) {
    return createReceipt({
      workflow: { id: input.workflowId, title: "Unknown workflow", purpose: "Unknown workflow", riskClass: "read_only", outputs: [] },
      input: { ...input, dryRun: true },
      status: "blocked",
      outputs: {},
      evidence: [],
      blockers: [`Unknown workflow: ${input.workflowId}`],
      nextAction: "Use a registered workflow ID."
    })
  }

  const safeInput = { ...input, dryRun: true }
  const blockedActions = findLockedActionMatches(safeInput.payload ?? {})

  if (blockedActions.length > 0 || workflow.riskClass === "approval_required" || workflow.riskClass === "forbidden_without_explicit_operator_override") {
    return createReceipt({
      workflow,
      input: safeInput,
      status: "blocked",
      outputs: { blockedActions },
      evidence: [`Gate evaluated for ${workflow.id}`, "Locked-action aliases and nested payload strings were scanned"],
      blockers: blockedActions.length ? blockedActions : [`Workflow ${workflow.id} requires approval.`],
      nextAction: "Request explicit operator approval before attempting this action."
    })
  }

  return createReceipt({
    workflow,
    input: safeInput,
    status: "passed",
    outputs: {
      workflowTitle: workflow.title,
      plannedOutputs: workflow.outputs,
      dryRun: true,
      note: "Sandbox/preview-safe workflow scaffold receipt completed."
    },
    evidence: [
      `Workflow registry contains ${workflow.id}`,
      `Risk class ${workflow.riskClass} allowed without live mutation`,
      "No live mutation performed",
      "Dry-run mode forced by preview workflow runner"
    ],
    blockers: [],
    nextAction: "Persist receipt, hand to validator, and continue next scheduled workflow."
  })
}

function createReceipt({
  workflow,
  input,
  status,
  outputs,
  evidence,
  blockers,
  nextAction
}: {
  workflow: WorkflowDefinition
  input: { workflowId: string; trigger: string; dryRun?: boolean; payload?: Record<string, unknown> }
  status: WorkflowStatus
  outputs: Record<string, unknown>
  evidence: string[]
  blockers: string[]
  nextAction: string
}): WorkflowReceipt {
  const timestamp = new Date().toISOString()
  const runId = `${workflow.id}-${timestamp.replace(/[:.]/g, "-")}`

  return {
    receipt_id: `receipt-${runId}`,
    created_at: timestamp,
    workflow_id: workflow.id,
    run_id: runId,
    risk_class: workflow.riskClass,
    status,
    inputs: {
      trigger: input.trigger,
      dryRun: true,
      payload: input.payload ?? {}
    },
    outputs,
    evidence,
    blockers,
    rollback: "No live mutation performed. Re-run or discard generated draft/receipt artifacts.",
    live_mutation_performed: false,
    approval_reference: null,
    next_action: nextAction
  }
}

function collectStringCandidates(value: unknown): string[] {
  if (typeof value === "string") {
    return [value]
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => collectStringCandidates(item))
  }

  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).flatMap(([key, nestedValue]) => [
      key,
      ...collectStringCandidates(nestedValue)
    ])
  }

  return []
}

function normalizeActionText(value: string) {
  return value
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}
