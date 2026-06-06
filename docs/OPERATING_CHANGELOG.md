# Eden Skye Studios Operating Changelog

This file records material operating-system, bridge, workflow, and documentation changes.

## 2026-06-06

### Auto Builder Site Completion Packet

Created the immediate documentation layer for finishing the Eden Skye Studios website and preparing Git/Vercel/Shopify linkage.

Created:

- `docs/AUTO_BUILDER_SITE_COMPLETION_PACKET.md`
- `docs/SHOPIFY_GIT_LINKING_RUNBOOK.md`
- `docs/SITE_FINISH_NOW_CHECKLIST.md`

Updated:

- `README.md`
- `docs/OPERATING_CHANGELOG.md`

Key decision recorded:

- Track A is the fastest recommended launch path: keep `Strategic-Minds/EDENSKYESTUDIOS` as the Next.js/Vercel storefront and link approved Shopify products, collections, or checkout URLs after approval.
- Track B is the native Shopify GitHub theme path: create a Shopify theme-compatible repo or branch before using Shopify Admin > Online Store > Themes > Add theme > Connect from GitHub.
- The current Next.js repo should not be connected directly as a Shopify theme branch because Shopify GitHub theme integration expects Shopify theme folder structure.

Source truth recorded:

- Approved website mockup: `EDENSKYEWEBSITEV2.png`
- Drive file: `https://drive.google.com/file/d/1xaDrBNIaXSwmtdothIZvZSczDjqX6qTR/view`
- Eden Vercel project id: `prj_mtmJQYYqRodNnH2UrDqwaK2MHgoA`
- Shopify store: `eden-skye-studios.myshopify.com`

Next execution focus:

1. Replace temporary image URLs with durable assets.
2. Run Vercel preview only.
3. Compare preview against the Drive mockup.
4. Draft Shopify product/link map.
5. Request approval before Shopify mutation or production deploy.

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
