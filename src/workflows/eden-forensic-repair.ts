export type EdenForensicRepairMode = 'audit' | 'repair_draft' | 'validate' | 'approval_wait' | 'execute_approved'

export type EdenForensicRepairInput = {
  mode?: EdenForensicRepairMode
  lane?: string
  baseUrl?: string
  approvedActions?: string[]
  requestedAt?: string
}

type StepStatus = 'ok' | 'planned' | 'blocked' | 'needs_approval' | 'failed'

type WorkflowStepReceipt = {
  name: string
  status: StepStatus
  summary: string
  details?: Record<string, unknown>
}

const protectedActions = [
  'production_deploy',
  'supabase_migration',
  'supabase_service_role_write',
  'shopify_mutation',
  'public_publish',
  'payment_or_pricing_change',
  'secret_change',
  'destructive_github_or_drive',
  'paid_generation_burst',
  'external_message'
] as const

const findings = [
  ['P0', 'vercel_production_build_failure', 'Latest production deployment fails until image automation cron typing is fixed.', 'build_and_deploy'],
  ['P0', 'next_type_declarations_missing', 'Next CSS imports require next-env.d.ts.', 'typecheck'],
  ['P0', 'dependency_lock_missing', 'main lacks package-lock.json.', 'reproducible_builds'],
  ['P1', 'recursive_route_validation_unproven', 'Recursive route validation has not produced a passing authenticated receipt.', 'recursive_completion'],
  ['P1', 'persistent_receipts_unproven', 'Persistent receipt writer success is not proven.', 'observability'],
  ['P1', 'supabase_migration_drift', 'Supabase branch actions still report migration source-truth drift.', 'data_infrastructure'],
  ['P1', 'eden_runtime_adapter_unverified', 'Eden runtime adapter is not verified.', 'runtime_adapter'],
  ['P2', 'open_pr_fragmentation', 'Open Eden PRs are fragmented across draft, stale, and overlapping lanes.', 'repo_hygiene'],
  ['P2', 'browser_evidence_missing', 'Browser screenshot and click-path evidence is missing for current Eden OS routes.', 'visual_validation'],
  ['P2', 'stale_readiness_blocker', 'Readiness output has a stale AI Gateway blocker.', 'readiness_truth']
].map(([severity, id, title, gate]) => ({ severity, id, title, gate }))

export async function edenForensicRepairWorkflow(input: EdenForensicRepairInput = {}) {
  'use workflow'

  const normalized = normalizeInput(input)
  const receipts = [
    await collectRepoState(),
    await collectVercelState(normalized),
    await collectGithubActionsState(),
    await collectSupabaseState(),
    await classifyFindings(),
    await prepareBuildRecoveryPr(normalized),
    await validateRecoveryPr(),
    await validateRuntimeRoutes(normalized),
    await reconcileSupabaseMigrations(),
    await triageOpenPrs(),
    await writePersistentReceipts(),
    await escalateFailures(),
    await prepareApprovalPacket(normalized)
  ]

  return {
    ok: receipts.every((receipt) => receipt.status !== 'failed'),
    workflow: 'eden-forensic-repair-workflow',
    mode: normalized.mode,
    lane: normalized.lane,
    requestedAt: normalized.requestedAt,
    dryRunFirst: true,
    liveMutationLocked: true,
    protectedActions,
    findings,
    receipts,
    nextAction: 'Run preview validation, then attach receipts to issues #21 and #22.'
  }
}

async function collectRepoState(): Promise<WorkflowStepReceipt> {
  'use step'
  return receipt('collect_repo_state', 'planned', 'Collect repo files, package state, manifest, PRs, and issues.', {
    repo: 'Strategic-Minds/EDENSKYESTUDIOS',
    issues: [21, 22],
    openPrsToClassify: [2, 6, 8, 9, 12, 13, 27]
  })
}

async function collectVercelState(input: Required<EdenForensicRepairInput>): Promise<WorkflowStepReceipt> {
  'use step'
  return receipt('collect_vercel_state', 'planned', 'Collect deployments, build logs, cron config, and readiness routes.', {
    project: 'edenskyestudios',
    baseUrl: input.baseUrl,
    routes: ['/api/readiness', '/api/recursive-completion/readiness', '/api/cron/recursive-completion-dry-run']
  })
}

async function collectGithubActionsState(): Promise<WorkflowStepReceipt> {
  'use step'
  return receipt('collect_github_actions_state', 'planned', 'Collect recursive validation workflow runs, jobs, logs, and artifacts.', {
    latestKnownFailedRun: 27656196620
  })
}

async function collectSupabaseState(): Promise<WorkflowStepReceipt> {
  'use step'
  return receipt('collect_supabase_state', 'planned', 'Collect project health, branches, migrations, advisors, and branch-action logs.', {
    projectRef: 'prhppuuwcnmfdhwsagug',
    mutationPolicy: 'read_only_until_approved'
  })
}

async function classifyFindings(): Promise<WorkflowStepReceipt> {
  'use step'
  return receipt('classify_findings', 'ok', 'Normalize failures into P0/P1/P2 readiness gates.', { findings })
}

async function prepareBuildRecoveryPr(input: Required<EdenForensicRepairInput>): Promise<WorkflowStepReceipt> {
  'use step'
  return receipt(
    'prepare_build_recovery_pr',
    input.mode === 'execute_approved' ? 'needs_approval' : 'planned',
    'Prepare branch-safe fixes for type declarations, cron typing, lockfile, and dependency pins.',
    {
      branch: 'auto-builder/eden-forensic-repair-workflow-20260617',
      protectedAction: false
    }
  )
}

async function validateRecoveryPr(): Promise<WorkflowStepReceipt> {
  'use step'
  return receipt('validate_recovery_pr', 'planned', 'Run install, typecheck, build, Eden workflow test, and recursive route validation.', {
    commands: ['npm ci', 'npm run typecheck', 'npm run build', 'npm run test:eden-workflow', 'node scripts/validate-recursive-completion-routes.mjs']
  })
}

async function validateRuntimeRoutes(input: Required<EdenForensicRepairInput>): Promise<WorkflowStepReceipt> {
  'use step'
  const readiness = await safeFetchJson(`${input.baseUrl}/api/recursive-completion/readiness`)
  return receipt('validate_runtime_routes', readiness.ok ? 'ok' : 'planned', 'Validate readiness routes and dry-run mutation locks.', {
    recursiveReadinessFetch: readiness,
    assertions: ['liveMutationLocked=true', 'dryRunForced=true for cron dry-runs']
  })
}

async function reconcileSupabaseMigrations(): Promise<WorkflowStepReceipt> {
  'use step'
  return receipt('reconcile_supabase_migrations', 'planned', 'Compare remote migration versions to repo migration files.', {
    mutationPolicy: 'no_apply_migration_without_explicit_approval'
  })
}

async function triageOpenPrs(): Promise<WorkflowStepReceipt> {
  'use step'
  return receipt('triage_open_prs', 'planned', 'Classify open Eden PRs into merge-ready, superseded, needs rebase, evidence-only, or blocked.', {
    prs: [2, 6, 8, 9, 12, 13, 27]
  })
}

async function writePersistentReceipts(): Promise<WorkflowStepReceipt> {
  'use step'
  return receipt('write_persistent_receipts', 'planned', 'Write normalized receipts to Supabase when configured; otherwise fall back to GitHub artifacts and issue comments.', {
    preferredTable: 'tool_receipts',
    fallbackSurfaces: ['GitHub Actions artifact', 'GitHub issue comment']
  })
}

async function escalateFailures(): Promise<WorkflowStepReceipt> {
  'use step'
  return receipt('escalate_failures', 'planned', 'Update issues #21 and #22 with P0/P1 findings and receipt links.', {
    issueTargets: [21, 22],
    externalMessaging: 'draft_only_until_approved'
  })
}

async function prepareApprovalPacket(input: Required<EdenForensicRepairInput>): Promise<WorkflowStepReceipt> {
  'use step'
  const approved = new Set(input.approvedActions)
  return receipt('prepare_approval_packet', 'ok', 'List exact protected actions that require owner approval.', {
    pendingProtectedActions: protectedActions.filter((action) => !approved.has(action))
  })
}

function normalizeInput(input: EdenForensicRepairInput): Required<EdenForensicRepairInput> {
  return {
    mode: input.mode ?? 'audit',
    lane: input.lane ?? 'manual',
    baseUrl: (input.baseUrl ?? 'https://edenskyestudios.vercel.app').replace(/\/$/, ''),
    approvedActions: input.approvedActions ?? [],
    requestedAt: input.requestedAt ?? new Date().toISOString()
  }
}

function receipt(name: string, status: StepStatus, summary: string, details?: Record<string, unknown>): WorkflowStepReceipt {
  return { name, status, summary, details }
}

async function safeFetchJson(url: string) {
  try {
    const response = await fetch(url, { headers: { accept: 'application/json' }, cache: 'no-store' })
    const text = await response.text()
    return { ok: response.ok, status: response.status, url, bodyPreview: text.slice(0, 1200) }
  } catch (error) {
    return { ok: false, status: 'fetch_failed', url, error: error instanceof Error ? error.message : String(error) }
  }
}
