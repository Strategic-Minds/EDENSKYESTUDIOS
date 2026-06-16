# Eden Skye Studios Operating Changelog

This file records material operating-system, bridge, workflow, and documentation changes.

## 2026-06-16

### Recursive Autonomy Validation Push Trigger

Updated the recursive autonomy validation workflow so governed pushes to `main` that touch recursive-autonomy, package, or workflow surfaces automatically produce validation evidence.

Updated:

- `.github/workflows/recursive-autonomy-validation.yml`
- `docs/OPERATING_CHANGELOG.md`

Purpose:

- Ensure the validation workflow can run after normal governed merges even when a manual workflow-dispatch connector is unavailable.
- Preserve manual dispatch and six-hour schedule triggers.
- Keep the workflow limited to validation receipts, package-lock candidate generation, install, typecheck, build, and dry-run route checks.

Notes:

- This change does not deploy, publish, mutate Shopify, change payments/pricing, run live avatar/video actions, write Supabase production data, change secrets, perform destructive Drive/GitHub actions, or run paid generation bursts.
- The workflow still requires successful artifact receipts before any full autonomous 24/7 readiness claim can be made.

### Recursive Autonomy Validation Workflow

Added a governed validation workflow for proving recursive completion readiness without weakening production locks.

Created:

- `.github/workflows/recursive-autonomy-validation.yml`
- `scripts/validate-recursive-completion-routes.mjs`
- `docs/autonomy/RECURSIVE_VALIDATION_WORKFLOW.md`

Purpose:

- Generate a `package-lock.json` candidate in a registry-capable GitHub Actions environment.
- Install dependencies from the generated lock and run typecheck/build validation.
- Validate recursive readiness and cron dry-run routes against a configured Vercel base URL.
- Use `CRON_SECRET` when available so the production cron route can remain locked while still producing validation receipts.
- Upload the generated lockfile and `.autonomy-receipts/recursive-route-validation.json` as workflow artifacts.

Notes:

- This workflow does not deploy, publish, mutate Shopify, change payments/pricing, run live avatar/video actions, write Supabase production data, change secrets, perform destructive Drive/GitHub actions, or run paid generation bursts.
- The workflow can produce evidence for the lockfile/build/route/cron readiness gates, but it does not by itself authorize `may_claim_full_autonomous_24_7`.
- Full readiness still requires persistent receipt writer proof, provider boundary rollback receipts, image/content QA receipts, live escalation receipts, and protected-action gate receipts.

### Recursive Completion Engine Draft

Added the first governed recursive completion implementation packet for Eden Skye Studios.

Created:

- `AUTO_SYSTEM_MANIFEST.json`
- `docs/autonomy/RECURSIVE_COMPLETION_ENGINE.md`
- `docs/autonomy/RECURSIVE_COMPLETION_RECEIPT_SCHEMA.md`
- `docs/autonomy/RECURSIVE_COMPLETION_RECEIPT_TEMPLATE.json`
- `src/lib/recursive-completion.ts`
- `app/api/recursive-completion/readiness/route.ts`
- `app/api/cron/recursive-completion-dry-run/route.ts`

Updated:

- `vercel.json`
- `docs/OPERATING_CHANGELOG.md`

Purpose:

- Define the machine-readable manifest for recursive completion.
- Define safe autonomous lanes for readiness, canon drift, generator queue, business discovery, and monthly governance audit work.
- Define what the system may do without human approval: read-only audits, draft generation, receipt creation, blocker logging, issue creation, and draft PR creation.
- Add preview-safe API surfaces for recursive completion readiness and dry-run receipts.
- Register `/api/cron/recursive-completion-dry-run` as an hourly dry-run cron route at minute 30.
- Preserve hard approval gates for production deploys, Shopify mutation, public publishing, payments/pricing, live avatar/video action, Supabase production writes, Drive sharing/parent/delete/destructive moves, destructive GitHub actions, secret/permission changes, and paid generation bursts.
- Provide a repeatable receipt schema and template so future scheduled runs can prove what happened.

Notes:

- This is a dry-run activation packet, not production autonomy.
- The dry-run route forces `liveMutationLocked: true` and `dryRunForced: true`.
- The readiness gate in `AUTO_SYSTEM_MANIFEST.json` remains false until Drive permissions, runtime receipts, build/test receipts, Vercel cron evidence, provider bridge receipts, image/content QA receipts, and protected-action gates are all proven.
- Protected live mutations remain locked by approval gates.

### Autonomous Growth Canon Alignment

Resolved the documentation gap audit by adding a cross-system autonomous-growth documentation stack to Drive, `Strategic-Minds/EDENSKYESTUDIOS`, and `Strategic-Minds/AUTO_BUILDER`.

Created repo mirrors under `docs/canon/`:

- `docs/canon/MASTER_CANON_INDEX.md`
- `docs/canon/BUSINESS_OPERATING_PLAN.md`
- `docs/canon/BUSINESS_GROWTH_STRATEGY.md`
- `docs/canon/FINANCIAL_SYSTEM_PLAN.md`
- `docs/canon/AUTOMATION_AUTONOMY_ROADMAP.md`
- `docs/canon/DISCOVERY_VALIDATION_PLAN.md`
- `docs/canon/OPERATIONS_24_7_RUNBOOK.md`
- `docs/canon/CROSS_SYSTEM_DOCUMENTATION_SYNC_POLICY.md`

Updated:

- `README.md`
- `docs/OPERATING_CHANGELOG.md`

Source-truth alignment recorded:

- Enterprise command folder: `V2 MASTER AUTO BUILDER`
- Eden OS Drive canon: `EDEN_SKYE_STUDIOS_OS`
- Eden source repo: `Strategic-Minds/EDENSKYESTUDIOS`
- Auto Builder control repo: `Strategic-Minds/AUTO_BUILDER`

Notes:

- Drive accepted new canon uploads.
- Drive refused in-place replacement of older stub files because the connected app did not have write access to those specific file IDs. The new full canon files are therefore the active documents, and future agents should use `MASTER_CANON_INDEX.md` instead of treating older one-paragraph stubs as complete plans.
- Protected live mutations remain locked by approval gates.

## 2026-06-06

### Corrected Shopify Page And Vercel Closet Split

Corrected the launch architecture per Jeremy's direction.

Created:

- `docs/EDEN_SHOPIFY_CLOSET_SPLIT_ARCHITECTURE.md`

Updated:

- `README.md`
- `docs/AUTO_BUILDER_SITE_COMPLETION_PACKET.md`
- `docs/SHOPIFY_GIT_LINKING_RUNBOOK.md`
- `docs/SITE_FINISH_NOW_CHECKLIST.md`
- `docs/OPERATING_CHANGELOG.md`

Corrected decision:

- Shopify owns the public page shown in Drive: `EDENSKYEWEBSITEV2.png`.
- Vercel owns Edens Closet, login/member experience, admin/control plane, AI chat, video-chat readiness, model changing-room, bridge APIs, and content workflow.
- The current Next.js repo should remain the Vercel app/control surface.
- A Shopify theme-compatible repo or branch must be created for Shopify GitHub theme integration.

Immediate next action:

1. Build the Shopify page/theme from `EDENSKYEWEBSITEV2.png`.
2. Keep Edens Closet in Vercel.
3. Route Shopify Sign In/Chat/private member actions into Vercel `/login` or `/closet` after approval.
4. Keep Shopify publish, Shopify mutations, and Vercel production deploy locked until approval.

### Auto Builder Site Completion Packet

Created the immediate documentation layer for finishing the Eden Skye Studios website and preparing Git/Vercel/Shopify linkage.

Created:

- `docs/AUTO_BUILDER_SITE_COMPLETION_PACKET.md`
- `docs/SHOPIFY_GIT_LINKING_RUNBOOK.md`
- `docs/SITE_FINISH_NOW_CHECKLIST.md`

Updated:

- `README.md`
- `docs/OPERATING_CHANGELOG.md`

Original decision was superseded by the corrected split above.

Source truth recorded:

- Approved website mockup: `EDENSKYEWEBSITEV2.png`
- Drive file: `https://drive.google.com/file/d/1xaDrBNIaXSwmtdothIZvZSczDjqX6qTR/view`
- Eden Vercel project id: `prj_mtmJQYYqRodNnH2UrDqwaK2MHgoA`
- Shopify store: `eden-skye-studios.myshopify.com`

### Documentation Operating Layer

Added a repo-level documentation system so Eden Skye Studios has a stable first-run and change-management path.

Created:

- `START_HERE.md`
- `AGENTS.md`
- `docs/PLAN_MODE_BUILD_MODE.md`
- `docs/EDEN_SKYE_STUDIOS_CAPABILITIES.md`
- `docs/SYSTEM_OPERATING_CONTRACT.md`
- `docs/OPERATING_CHANGELOG.md`

Updated:

- `README.md`
- `docs/eden-auto-builder-capability-bridge.md`

New mandatory rule:

- Every agent must analyze previous files before material commentary or implementation.
- Every new task, system, workflow, idea, bridge, route, automation, or data model must create or update a to-do list with Plan Mode and Build Mode.
- Every material system change must update relevant docs before it is considered complete.

### Auto Builder Bridge Alignment

Documented Eden Skye Studios alignment with Auto Builder cloud bridge capabilities:

- Universal Eden runtime bridge: `/api/bridge/eden/runtime`
- GitHub workflow bridge: `/api/bridge/github/workflows`
- Vercel governed redeploy bridge: `/api/bridge/vercel/redeploy`
- Eden preview-only deploy bridge: `/api/bridge/vercel/eden-preview`
- Runtime provider readiness: `/api/bridge/providers/runtime-status`

Governance remains locked for:

- production deploys
- Shopify mutations
- Shopify theme publishing
- public publishing
- payment, pricing, subscription, and discount changes
- live avatar/video-chat sessions
- Supabase production migrations or service-role writes
- destructive Drive and GitHub operations

### Current Known System IDs

- Eden Skye Studios repo: `Strategic-Minds/EDENSKYESTUDIOS`
- Auto Builder repo: `Strategic-Minds/AUTO_BUILDER`
- Eden Vercel project id: `prj_mtmJQYYqRodNnH2UrDqwaK2MHgoA`
- Supabase project ref: `prhppuuwcnmfdhwsagug`
- Shopify store: `eden-skye-studios.myshopify.com`
- Drive approval control plane: `https://docs.google.com/spreadsheets/d/1D-2NTRPkvHfItlQ2LoDrrUNUrDZg9Iy1DvZ8GrxlrYg/edit`
