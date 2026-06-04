# Eden Skye Studios Implementation Roadmap

## Current State

Validated:

- Active repo is `Strategic-Minds/EDENSKYESTUDIOS`.
- AUTO_BUILDER sync manifest exists.
- Eden Skye Studios Drive root exists.
- AUTO SOCIAL and avatar network exist.
- F01 Eden Skye has three source images indexed.
- Finalization pack is now added under `ops/finalization/`.

Not yet complete:

- HeyGen avatar inventory verification.
- Clean F01 HeyGen primary portrait.
- Supabase migrations applied.
- Admin console built out.
- Vercel cron config committed and deployed.
- Metricool/SocialHub publishing path confirmed.
- Shopify offer/store mutation path approved.

## Phase 1 - Lock And Validate

Status: mostly complete.

Tasks:

- Finalization source-of-truth pack.
- Brand lock.
- Workflow lock.
- Stack lock.
- Connectivity lock.
- Autonomy/gates.
- Governance/safety.
- Telemetry contract.
- AI media stack.
- Frontend/backend contract.
- Supabase data contract.

Remaining:

- Update root README with finalization read order.
- Add Auto Builder latest sync receipt.

## Phase 2 - F01 Avatar Completion

Tasks:

1. Create clean F01 HeyGen primary portrait.
2. Add portrait to Drive.
3. Update `avatar-stock-index.json` with new Drive file ID.
4. Create HeyGen avatar creation packet.
5. Request Jeremy approval.
6. After approval, create/train HeyGen avatar.
7. Log HeyGen avatar/look IDs.

## Phase 3 - Backend Foundation

Tasks:

1. Generate Supabase migration from `SUPABASE_DATA_CONTRACT.md`.
2. Request approval to apply migration.
3. Add server-side Supabase helpers.
4. Add receipt writer.
5. Add approval request API.
6. Add media jobs API.
7. Add health/readiness API.

## Phase 4 - Admin Console

Tasks:

1. Readiness dashboard.
2. Avatar readiness panel.
3. Approval queue.
4. Media job packet viewer.
5. Content queue panel.
6. Tool receipts panel.
7. Blocker/next-action panel.

## Phase 5 - Automation Routes

Tasks:

1. `/api/cron/readiness`
2. `/api/cron/content-draft`
3. `/api/cron/analytics-review`
4. `/api/cron/shopify-sync-check`
5. `vercel.json` cron config after approval.

Cron routes should enqueue jobs and write receipts, not directly publish or mutate live systems.

## Phase 6 - Social Draft System

Tasks:

1. Draft hooks/scripts/captions from brand lock.
2. Attach avatar/source image IDs.
3. Validate brand and safety.
4. Queue drafts.
5. Request approval for scheduling/publishing.
6. Sync approved posts to Metricool/SocialHub when approved.

## Phase 7 - Commerce And Offer Layer

Tasks:

1. Define Eden primary offer.
2. Draft Shopify product/collection copy.
3. Create approval packet.
4. Mutate Shopify only after approval.
5. Track Shopify sync events.

## Phase 8 - Analytics And Winner Cloning

Tasks:

1. Pull metrics.
2. Score hooks, visuals, CTAs, topics.
3. Identify winners.
4. Clone winning patterns into drafts.
5. Refill content queue.

## Immediate Next Action

Create the clean F01 HeyGen primary portrait, then update Drive and `avatar-stock-index.json`.

Do not create/train HeyGen avatar or apply backend migrations until Jeremy explicitly approves those actions.
