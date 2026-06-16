import { mkdir, writeFile } from "node:fs/promises"

const baseUrl = (process.env.VALIDATION_BASE_URL || "https://edenskyestudios.vercel.app").replace(/\/$/, "")
const lane = process.env.VALIDATION_LANE || "hourly_readiness"
const cronSecret = process.env.CRON_SECRET?.trim()

const receipt = {
  receipt_id: `recursive-route-validation-${Date.now()}`,
  timestamp_utc: new Date().toISOString(),
  actor: "github-actions:recursive-autonomy-validation",
  scope: {
    base_url: baseUrl,
    lane
  },
  accepted_risks_observed: [
    {
      key: "drive_anyone_with_link_writer_policy",
      status: "owner_accepted_required_operating_posture"
    }
  ],
  protected_actions_blocked: [
    "production_deploy",
    "shopify_mutation",
    "public_publishing",
    "payments_or_pricing_change",
    "live_heygen_or_avatar_video",
    "supabase_production_write",
    "destructive_drive_or_github_write",
    "secret_change",
    "paid_generation_burst"
  ],
  routes: [],
  validation_result: "pending",
  blockers: [],
  next_actions: []
}

await validateRoute("readiness", `${baseUrl}/api/recursive-completion/readiness`)
await validateRoute("cron_default", `${baseUrl}/api/cron/recursive-completion-dry-run`, cronHeaders())
await validateRoute("cron_lane", `${baseUrl}/api/cron/recursive-completion-dry-run?lane=${encodeURIComponent(lane)}`, cronHeaders())

const failed = receipt.routes.filter((route) => !route.ok)
const missingLocks = receipt.routes.filter((route) => route.ok && !route.liveMutationLocked)
const missingDryRun = receipt.routes.filter((route) => route.ok && !route.dryRunForced && route.name !== "readiness")

if (!cronSecret) {
  receipt.blockers.push("CRON_SECRET is not available to the workflow; production cron route may correctly reject validation.")
}

if (failed.length || missingLocks.length || missingDryRun.length) {
  receipt.validation_result = "failed_or_blocked"
  receipt.next_actions.push("Review route responses and Vercel CRON_SECRET configuration before claiming 24/7 readiness.")
} else {
  receipt.validation_result = "passed"
  receipt.next_actions.push("Attach this receipt to Drive and readiness issue tracking, then evaluate remaining provider bridge receipts.")
}

await mkdir(".autonomy-receipts", { recursive: true })
await writeFile(".autonomy-receipts/recursive-route-validation.json", `${JSON.stringify(receipt, null, 2)}\n`)

console.log(JSON.stringify(receipt, null, 2))

if (receipt.validation_result !== "passed") {
  process.exitCode = 1
}

function cronHeaders() {
  return cronSecret ? { authorization: `Bearer ${cronSecret}` } : {}
}

async function validateRoute(name, url, headers = {}) {
  const startedAt = new Date().toISOString()
  try {
    const response = await fetch(url, { headers })
    const text = await response.text()
    const parsed = parseJson(text)
    const routeReceipt = {
      name,
      url,
      started_at_utc: startedAt,
      completed_at_utc: new Date().toISOString(),
      http_status: response.status,
      ok: response.ok,
      liveMutationLocked: Boolean(parsed?.liveMutationLocked ?? parsed?.readiness?.liveMutationLocked),
      dryRunForced: Boolean(parsed?.dryRunForced ?? parsed?.readiness?.dryRunForced),
      cronAuthorization: parsed?.cronAuthorization ?? null,
      response_keys: parsed && typeof parsed === "object" ? Object.keys(parsed).sort() : [],
      response_summary: summarize(parsed, text)
    }

    receipt.routes.push(routeReceipt)

    if (!response.ok) {
      receipt.blockers.push(`${name} returned HTTP ${response.status}`)
    }
  } catch (error) {
    receipt.routes.push({
      name,
      url,
      started_at_utc: startedAt,
      completed_at_utc: new Date().toISOString(),
      http_status: null,
      ok: false,
      error: error instanceof Error ? error.message : String(error)
    })
    receipt.blockers.push(`${name} failed to fetch`)
  }
}

function parseJson(text) {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

function summarize(parsed, text) {
  if (parsed && typeof parsed === "object") {
    return {
      ok: parsed.ok ?? null,
      system: parsed.system ?? null,
      status: parsed.status ?? null,
      lane: parsed.lane ?? parsed.receipt?.lane ?? null,
      blockers_count: Array.isArray(parsed.blockers) ? parsed.blockers.length : null
    }
  }

  return {
    non_json_body_prefix: text.slice(0, 200)
  }
}
