import { readFileSync } from "node:fs"
import { strict as assert } from "node:assert"

const workflowSource = readFileSync("src/lib/eden-workflow.ts", "utf8")
const workflowRouteSource = readFileSync("app/api/workflows/eden-skye-autonomous-generator/route.ts", "utf8")
const cronRouteSource = readFileSync("app/api/cron/eden-skye-generator-tick/route.ts", "utf8")

const requiredWorkflowIds = [
  "source_truth_reconciliation",
  "route_env_asset_scan",
  "viral_discovery_digest",
  "content_generation_batch",
  "content_quality_gate",
  "ab_test_builder",
  "sandbox_test_runner",
  "analytics_ingestion",
  "optimization_recommender",
  "self_heal_safe_fixes",
  "validator_gate",
  "investor_report_draft"
]

for (const id of requiredWorkflowIds) {
  assert(workflowSource.includes(`id: "${id}"`), `Missing workflow ID: ${id}`)
}

const lockedActionIds = [
  "production_deploy",
  "live_shopify_mutation",
  "live_payment_activation",
  "public_social_publishing",
  "production_database_mutation",
  "drive_rename_copy_promotion",
  "production_manifest_mutation",
  "paid_generation_burst",
  "destructive_delete",
  "secret_exposure"
]

for (const id of lockedActionIds) {
  assert(workflowSource.includes(`id: "${id}"`), `Missing locked action rule: ${id}`)
}

const requiredAliasPhrases = [
  "production deploy",
  "publish product",
  "charge customer",
  "publish social",
  "execute sql",
  "drive promotion",
  "green status",
  "paid generation",
  "drop table",
  "show api key"
]

for (const phrase of requiredAliasPhrases) {
  assert(workflowSource.includes(`"${phrase}"`), `Missing locked action alias phrase: ${phrase}`)
}

assert(workflowSource.includes("collectStringCandidates"), "Nested payload string scanning is missing")
assert(workflowSource.includes("normalizeActionText"), "Locked action normalization is missing")
assert(workflowSource.includes("live_mutation_performed: false"), "Receipts must force live_mutation_performed false")
assert(workflowSource.includes("dryRun: true"), "Workflow runner must force dry-run true")
assert(workflowRouteSource.includes("dryRunForced: true"), "Workflow route must advertise forced dry-run")
assert(workflowRouteSource.includes("dryRun: true"), "Workflow route must force dry-run true")
assert(cronRouteSource.includes("CRON_SECRET"), "Cron route must check CRON_SECRET")
assert(cronRouteSource.includes("preview_manual_validation"), "Cron route must preserve preview manual validation mode")
assert(cronRouteSource.includes("dryRunForced: true"), "Cron route must advertise forced dry-run")

console.log("Eden workflow smoke checks passed")
