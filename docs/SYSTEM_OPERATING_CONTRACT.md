# Eden Skye Studios System Operating Contract

This contract defines how Eden Skye Studios work moves from idea to plan to build to validation.

## Operating Objective

Eden Skye Studios should operate as a governed AI creator brand system across:

- website
- Edens Closet
- Shopify storefront path
- approval control plane
- content packet generation
- image and video production planning
- GitHub, Vercel, Supabase, Drive, Shopify, and HeyGen bridges

The goal is strong automation with approval gates, not uncontrolled mutation.

## Required Sequence

1. Analyze previous files.
2. Create or update Plan Mode.
3. Create or update Build Mode.
4. Implement only scoped, governed changes.
5. Validate with receipts.
6. Update docs.
7. Queue approval-gated work instead of executing it.
8. Record final status and next actions.

## Previous-File Analysis

Every agent must inspect the relevant context before acting.

Baseline files:

- `README.md`
- `START_HERE.md`
- `AGENTS.md`
- `docs/PLAN_MODE_BUILD_MODE.md`
- `docs/EDEN_SKYE_STUDIOS_CAPABILITIES.md`
- `docs/eden-auto-builder-capability-bridge.md`
- `docs/OPERATING_CHANGELOG.md`

Task-specific files may include:

- app routes
- API routes
- bridge files
- Supabase migrations
- Vercel config
- package scripts
- Drive control-plane records
- Shopify product or collection records
- media workflow briefs

## Plan Mode Contract

Plan Mode must define:

- Objective
- Files analyzed
- Current reality
- Systems involved
- Dependencies
- Approval gates
- Risks or blockers
- Acceptance criteria

Plan Mode should be visible through the session plan tracker when available, or written into the relevant repo/control-plane doc when persistent tracking is needed.

## Build Mode Contract

Build Mode must define:

- Implementation steps
- Validation method
- Receipt location
- Docs to update
- Approval queue entry, when relevant
- Final status
- Next actions

Build Mode should be updated as work progresses, not only after completion.

## Approval Model

Preview, draft, read-only, and queue-first work can proceed when it is reversible and documented.

The following require explicit approval:

- production deploy
- Shopify mutation
- public publishing
- payment, pricing, subscription, or discount change
- live HeyGen/avatar/video-chat session
- Supabase production migration or service-role write
- Drive parent, sharing, delete, or destructive move
- destructive GitHub write, merge, force-push, delete, or production-triggering workflow

## Receipt Model

Every material action should leave a receipt.

Acceptable receipts include:

- GitHub commit SHA
- Vercel preview URL or blocked deployment response
- API route response
- Supabase row, migration id, or documented blocker
- Drive file URL or spreadsheet row
- Shopify object id or documented approval block
- HeyGen/video generation id or approval block
- Screenshot or visual QA note
- Changelog entry

## Documentation Model

Update docs whenever the system changes.

Top-level docs:

- `README.md` for the repo overview and current scope
- `START_HERE.md` for first-run steps and priority stack
- `AGENTS.md` for agent behavior rules

System docs:

- `docs/PLAN_MODE_BUILD_MODE.md` for checklist behavior
- `docs/EDEN_SKYE_STUDIOS_CAPABILITIES.md` for capability map
- `docs/SYSTEM_OPERATING_CONTRACT.md` for governance and receipts
- `docs/eden-auto-builder-capability-bridge.md` for bridge details
- `docs/OPERATING_CHANGELOG.md` for running change history

## Control Plane Model

The Drive approval control plane should show anything waiting for approval, including:

- website changes
- images
- videos
- social posts
- AI avatar/video items
- bridge gates
- Shopify changes
- Supabase changes
- deployment changes

Every approval item should include a visual or a link to the visual when possible.

## Completion Standard

A system is complete only when:

1. It has been analyzed against prior files.
2. It has a Plan Mode and Build Mode record.
3. It has been implemented or honestly marked blocked.
4. It has validation evidence.
5. It has updated docs.
6. Approval-gated items are queued and visible.
