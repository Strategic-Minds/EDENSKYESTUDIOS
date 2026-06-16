# Eden Skye Studios Operating Changelog

This file records material operating-system, bridge, workflow, and documentation changes.

## 2026-06-16

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
