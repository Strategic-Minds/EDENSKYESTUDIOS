# Eden 24/7 Operating Workflow Reference

## Purpose

This branch participates in the Eden Skye 24/7 operating workflow governed by Auto Builder.

## Required Shopify Branch

```text
shopify/v1-website-preview
```

All Shopify V1 website edits must stay on this branch unless Jeremy explicitly names another branch in the current session.

## Auto Builder Source Files

The 24/7 system lives in `Strategic-Minds/AUTO_BUILDER`:

```text
docs/systems/EDEN_247_OPERATING_WORKFLOW.md
docs/rrules/EDEN_247_RRULES.md
.github/workflows/eden-247-ops-tick.yml
supabase/migrations/20260606_eden_247_queue_extension.sql
```

## Operating Loop

Auto Builder runs a governed 5-minute operating tick:

```text
RRULE:FREQ=MINUTELY;INTERVAL=5
```

The tick reviews:

- Vercel preview receipts
- Shopify V1 branch status
- mockup validation state
- screenshot proof
- Supabase queue and receipts
- Drive mockup/assets
- content/video draft queues
- approval-held items

## Shopify Agent Requirement

When editing this branch, agents must:

1. inspect `docs/SHOPIFY_V1_PREVIEW_BRANCH.md`
2. use `EDENSKYEWEBSITEV2.png` as the approved mockup source
3. capture desktop and mobile screenshot proof after visual edits
4. trigger or request mockup validation when a preview URL exists
5. avoid Shopify publish or production deploy without approval

## Content And Video Integration

The 24/7 system routes draft work through:

- Drive for source assets and approved canon
- Supabase for queue, receipts, approvals, and content/media state
- Vercel for runtime, cron, preview, and validation routes
- GitHub for source, workflows, branches, and artifacts
- Shopify for public commerce/storefront after approval
- Metricool or Xyla for social draft distribution and scheduling proposals
- HeyGen for approved avatar/video generation

Publishing and live production actions remain approval-gated.
