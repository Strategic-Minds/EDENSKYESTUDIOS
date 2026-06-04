# Telemetry, KPIs, And Receipts

## Objective

Measure the agency like a real business and operate every automation with receipts.

## Core KPI Groups

### Model Readiness

- models in roster
- models with Drive folder
- models with source image pack
- models with HeyGen-ready portrait
- models with trained/approved HeyGen avatar
- models with prompt bank
- models licensing-ready

### Content Factory

- hooks generated
- scripts generated
- image packets generated
- video packets generated
- drafts approved
- drafts rejected
- posts scheduled
- posts published
- winners cloned

### Media Production

- images generated
- videos generated
- assets approved
- assets rejected
- face continuity score
- brand fit score
- tool cost/credit usage

### Commerce

- leads captured
- products drafted
- products live
- downloads sold
- services sold
- licensing inquiries
- revenue by offer
- conversion by page

### Automation Health

- runs completed
- runs blocked
- connector failures
- approval queue count
- stale drafts
- missing source assets
- cron health

## Receipt Types

- `source_image_receipt`
- `media_job_receipt`
- `content_draft_receipt`
- `approval_receipt`
- `publishing_receipt`
- `shopify_sync_receipt`
- `licensing_receipt`
- `tool_error_receipt`
- `health_check_receipt`

## Receipt Required Fields

```json
{
  "receipt_id": "string",
  "timestamp": "ISO-8601",
  "operator": "string",
  "run_mode": "read_only|draft|sandbox|approved|production",
  "model_id": "string_or_null",
  "source_asset_ids": [],
  "target_system": "string",
  "action": "string",
  "status": "passed|failed|blocked|pending|approved|rejected",
  "approval_required": true,
  "approval_status": "not_required|pending|approved|rejected",
  "output_location": "string",
  "next_action": "string"
}
```

## Dashboard Widgets

Minimum admin dashboard should show:

- model readiness score
- F01 readiness status
- missing image packs
- pending approval count
- media jobs by status
- content queue by status
- publishing queue
- Shopify offer status
- licensing inquiry count
- recent receipts
- blockers
- next recommended action

## Weekly Review

Every week:

1. Review model readiness.
2. Review content output.
3. Review performance metrics.
4. Review revenue paths.
5. Clone winners.
6. Clear blockers.
7. Update next production priorities.

## No Invisible Automation Rule

No autonomous action is considered complete unless it has a receipt.
