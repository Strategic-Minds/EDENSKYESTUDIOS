# Automation And Connectivity Blueprint

## Objective

Build an autonomous but controlled agency operating system that drafts, generates, validates, queues, and improves content without taking live/public/financial actions without approval.

## Automation Lanes

### Readiness Lane

Runs checks:

- repo manifests present
- Drive folders reachable
- source images indexed
- Supabase reachable
- approval queue status
- pending media jobs
- missing model asset packs

### Content Lane

Runs:

- trend intake
- hook generation
- script/caption generation
- model assignment
- visual packet creation
- draft queue creation

### Media Lane

Runs:

- source image selection
- image prompt packet creation
- private draft image/video generation where approved
- face/brand/safety validation
- asset indexing

### Approval Lane

Runs:

- risk classification
- approval request creation
- approval state validation
- promotion blocking

### Commerce Lane

Runs:

- Shopify product/offer draft packet
- collection/copy recommendations
- storefront image needs
- sync event logging

### Analytics Lane

Runs:

- performance collection
- winner scoring
- hook/visual/CTA analysis
- clone recommendations
- queue refill

## Cron Philosophy

Cron triggers work. Cron does not perform irreversible work directly.

Cron can:

- check readiness
- enqueue draft jobs
- collect metrics
- flag approvals
- write receipts

Cron cannot without approval:

- publish
- deploy
- mutate schema
- change commerce
- train avatars
- charge money

## Required Queues

- `media_jobs`
- `content_queue`
- `approval_requests`
- `tool_receipts`
- `agent_runs`
- `system_health_checks`

## Connectivity Map

```text
Drive -> Git manifests -> GPT/Higgins -> Supabase queues -> Tool execution -> Receipts -> Approval -> Public/commerce/deploy promotion
```

## Default Run Modes

- `read_only`
- `draft`
- `sandbox`
- `approval_pending`
- `approved_mutation`
- `production`

## Automation Safety

Automation must stop when:

- source image missing
- model identity uncertain
- approval required but missing
- connector declined
- output unsafe/off-brand
- schema or production change requested
- public publishing requested

## First Automations To Build

1. `readiness-check`
2. `avatar-asset-gap-check`
3. `f01-clean-portrait-packet`
4. `content-draft-generator`
5. `approval-request-generator`
6. `receipt-writer`
7. `weekly-winner-review`

## Receipt Rule

No automation is complete until a receipt exists.
