# Eden Skye Studios Telemetry And Receipts

## Telemetry Objective

Every automated or semi-automated action should leave enough evidence to answer:

- what happened
- who/what did it
- what source truth was used
- what system was touched
- whether approval was required
- whether approval was granted
- where the output lives
- what should happen next

## Required Tables / State Objects

Supabase should eventually support these tables or equivalent state objects:

### `leads`

Captures audience and store lead data.

### `content_queue`

Draft posts, scripts, prompts, captions, and campaign items.

### `agent_runs`

Each GPT/Higgins/agent run and outcome.

### `tool_receipts`

Connector/tool operations and results.

### `approval_requests`

Actions awaiting human approval or already approved/rejected.

### `social_posts`

Draft, scheduled, published, rejected, or archived social items.

### `media_assets`

Drive, Git, HeyGen, Runway, Canva, Descript, or other asset references.

### `avatar_assets`

Avatar source images, canonical references, looks, trained IDs, and readiness status.

### `shopify_sync_events`

Store/offer/product sync checks and mutation receipts.

### `system_health_checks`

Readiness, connector status, cron outcomes, and validation checks.

## Receipt Schema

Minimum receipt:

```json
{
  "timestamp": "ISO-8601",
  "operator": "gpt|higgins|eden|tool-name",
  "run_mode": "read_only|draft|sandbox|approved_mutation|production",
  "source_files": [],
  "target_system": "github|drive|supabase|vercel|heygen|shopify|metricool|other",
  "action": "string",
  "input_summary": "string",
  "output_location": "string",
  "approval_required": true,
  "approval_status": "not_required|pending|approved|rejected",
  "validation_status": "not_checked|passed|failed|blocked",
  "blockers": [],
  "next_action": "string"
}
```

## Media Receipt Additions

For image/video work:

- avatar ID
- source image IDs
- prompt
- negative prompt / avoid rules
- tool used
- output asset ID/URL
- face continuity score
- brand fit score
- rejection reason if rejected

## Cron Receipt Additions

For cron-triggered work:

- cron route
- scheduled trigger time
- job count created
- job count completed
- job count blocked
- retry count
- next scheduled run

## Health Check Signals

Minimum readiness dashboard should track:

- GitHub reachable
- Drive reachable
- Supabase reachable
- Vercel route health
- avatar stock index present
- F01 source images present
- approval queue count
- pending publishing items
- failed tool receipts
- missing asset requirements

## Storage Rule

Receipts should be stored in Supabase first when backend is ready. Until then, Git/Drive receipt docs are acceptable as bootstrap receipts.
