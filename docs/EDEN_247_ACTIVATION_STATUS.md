# Eden 24/7 Activation Status

## Status

Eden Skye 24/7 governed operating workflow has been approved for activation and is controlled by Auto Builder.

## Auto Builder Source

Repository:

```text
Strategic-Minds/AUTO_BUILDER
```

Primary files:

```text
docs/systems/EDEN_247_OPERATING_WORKFLOW.md
docs/rrules/EDEN_247_RRULES.md
docs/systems/EDEN_247_ACTIVATION_APPROVAL.md
.github/workflows/eden-247-ops-tick.yml
supabase/migrations/20260606_eden_247_queue_extension.sql
```

## Shopify Branch

This branch remains the required Shopify V1 website preview lane:

```text
shopify/v1-website-preview
```

## Operating Tick

Schedule:

```text
*/5 * * * *
```

RRULE:

```text
RRULE:FREQ=MINUTELY;INTERVAL=5
```

## What The Tick Watches

- Vercel preview receipts
- mockup validation status
- screenshot proof
- Shopify V1 branch changes
- Drive mockup/assets
- Supabase queue/receipts
- Metricool/Xyla content draft state
- HeyGen video brief/production request state
- approval-held items

## Protected Boundaries

Even after activation approval, the following still require exact confirmation before execution:

- Shopify theme publish
- production Vercel deploy
- public social publishing
- payment/pricing/discount mutation
- destructive Drive/GitHub/Supabase actions
- Supabase production migration

## Shopify Agent Reminder

Every Shopify visual edit must still include:

- desktop screenshot
- mobile screenshot
- mockup comparison or diff proof when possible
- validation receipt or handoff note
