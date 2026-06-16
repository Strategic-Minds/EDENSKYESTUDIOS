import manifest from "@/AUTO_SYSTEM_MANIFEST.json"

type RecursiveLane = (typeof manifest.recursive_run_lanes)[number]

export type RecursiveCompletionReceipt = {
  receipt_id: string
  timestamp_utc: string
  lane: string
  actor: string
  scope: {
    drive_folders: string[]
    repositories: string[]
    branches: string[]
    routes: string[]
    providers: string[]
  }
  inputs_read: string[]
  actions_attempted: string[]
  actions_completed: string[]
  protected_actions_blocked: string[]
  artifacts_created: string[]
  validation_result: {
    status: "pass" | "partial" | "blocked" | "fail"
    evidence: string[]
    notes: string
  }
  blockers: string[]
  next_actions: string[]
  canonical_storage: string[]
  accepted_risks_observed: string[]
}

export function getRecursiveCompletionReadiness() {
  return {
    ok: true,
    system: "eden-recursive-completion-engine",
    mode: manifest.autonomy_policy.operating_mode,
    status: manifest.status,
    liveMutationLocked: true,
    productionReady: false,
    mayClaimFullAutonomous247: manifest.readiness_gate.may_claim_full_autonomous_24_7,
    authority: manifest.authority,
    acceptedRisks: manifest.accepted_risks,
    allowedWithoutHumanApproval: manifest.autonomy_policy.allowed_without_human_approval,
    protectedActionsRequiringApproval: manifest.autonomy_policy.protected_actions_requiring_explicit_approval,
    lanes: manifest.recursive_run_lanes.map((lane) => ({
      lane: lane.lane,
      cadenceTarget: lane.cadence_target,
      protected: lane.protected,
      actions: lane.actions
    })),
    readinessGateConditions: manifest.readiness_gate.conditions_required_before_true,
    receiptSchemaRequiredFields: manifest.receipt_schema.required_fields,
    blockers: [
      "Live Vercel cron/readiness receipts are still required.",
      "Repo lockfile/build/typecheck/test receipts are still required.",
      "Persistent receipt writer receipts are still required.",
      "Failure escalation receipts are still required.",
      "Provider bridge boundary and rollback receipts are still required.",
      "Image/content QA, quarantine, and approval receipts are still required."
    ],
    acceptedRiskDisclosures: [
      "Drive anyone-with-link writer access is owner-accepted and must be disclosed in receipts instead of treated as an unresolved blocker."
    ]
  }
}

export function runRecursiveCompletionDryRun(options: {
  laneName?: string | null
  trigger: "manual" | "cron" | "system"
}): { ok: boolean; system: string; liveMutationLocked: true; dryRunForced: true; receipts: RecursiveCompletionReceipt[] } {
  const selectedLanes = selectLanes(options.laneName)

  return {
    ok: true,
    system: "eden-recursive-completion-engine",
    liveMutationLocked: true,
    dryRunForced: true,
    receipts: selectedLanes.map((lane) => buildDryRunReceipt(lane, options.trigger))
  }
}

function selectLanes(laneName?: string | null): RecursiveLane[] {
  if (!laneName) {
    return manifest.recursive_run_lanes
  }

  return manifest.recursive_run_lanes.filter((lane) => lane.lane === laneName)
}

function buildDryRunReceipt(lane: RecursiveLane, trigger: "manual" | "cron" | "system"): RecursiveCompletionReceipt {
  const timestamp = new Date().toISOString()
  const receiptTimestamp = timestamp.replace(/[-:.]/g, "").replace("Z", "Z")

  return {
    receipt_id: `recursive-${receiptTimestamp}-${lane.lane}`,
    timestamp_utc: timestamp,
    lane: lane.lane,
    actor: "Eden recursive completion dry-run route",
    scope: {
      drive_folders: [
        manifest.authority.parent_enterprise_command_folder.drive_folder_id,
        manifest.authority.eden_os_drive_canon.drive_folder_id
      ],
      repositories: [manifest.authority.eden_repo, manifest.authority.auto_builder_repo],
      branches: ["main"],
      routes: ["/api/recursive-completion/readiness", "/api/cron/recursive-completion-dry-run"],
      providers: ["Google Drive", "GitHub", "Vercel"]
    },
    inputs_read: ["AUTO_SYSTEM_MANIFEST.json", "docs/autonomy/RECURSIVE_COMPLETION_ENGINE.md"],
    actions_attempted: lane.actions,
    actions_completed: lane.actions.map((action) => `dry_run_planned:${action}`),
    protected_actions_blocked: manifest.autonomy_policy.protected_actions_requiring_explicit_approval,
    artifacts_created: [],
    validation_result: {
      status: "partial",
      evidence: [
        `Lane ${lane.lane} loaded from recursive manifest.`,
        `Trigger ${trigger} forced dry-run mode.`,
        "No live mutation performed.",
        "Protected actions were listed as blocked, not executed.",
        "Owner-accepted Drive writer-link policy was disclosed."
      ],
      notes: "Dry-run activation receipt only. Durable Drive receipt storage is the next wiring step."
    },
    blockers: manifest.readiness_gate.conditions_required_before_true.filter(
      (condition) => condition !== "drive_writer_link_policy_owner_accepted_and_disclosed"
    ),
    next_actions: [
      "Persist this receipt to Drive audit or validation storage.",
      "Wire approved scheduler/agent runner to call this route.",
      "Close missing readiness-gate conditions with receipts before enabling higher autonomy."
    ],
    canonical_storage: [],
    accepted_risks_observed: manifest.accepted_risks.map((risk) => risk.key)
  }
}
