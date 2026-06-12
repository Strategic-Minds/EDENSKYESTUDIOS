# EDEN FULL SITE Generator Implementation Packet

## Current Status

Full-site autogeneration docs and manifests are now installed. The current generator `scripts/reset-eden-generator.mjs` is readiness-scaffold-only and intentionally excludes storefront, models, closet, public assets, and locked visual source truth.

## Source Truth

Use these files as the generator contract:

- `docs/EDEN_FULL_SITE_AUTOGENERATION_SYSTEM_BRIEF.md`
- `docs/EDEN_FULL_SITE_GENERATOR_SOURCE_CONTRACT.md`
- `docs/EDEN_FULL_SITE_PAGE_REGISTRY.md`
- `docs/EDEN_FULL_SITE_ROUTE_GENERATION_MATRIX.md`
- `docs/EDEN_CLOSET_AUTOGENERATION_CONTRACT.md`
- `docs/EDEN_ADMIN_AUTOGENERATION_CONTRACT.md`
- `docs/EDEN_BLACK_CARD_COMMERCE_GENERATION_CONTRACT.md`
- `docs/EDEN_FULL_SITE_AUTOGENERATION_VALIDATION_PLAN.md`
- `docs/EDEN_FULL_SITE_AUTOGENERATION_OPERATOR_RUNBOOK.md`
- `config/eden-full-site-autogeneration-manifest.json`
- `config/eden-full-site-page-registry.json`
- `config/eden-full-site-validation-matrix.json`

## System Boundary

Implement a deterministic generator that writes site/app/admin/API surfaces from manifests. Do not activate live Shopify payments, deploy production, mutate Supabase production schema, publish social content, send real email, create external calendar events, change DNS/billing/secrets, merge, or release.

## Frontend Plan

Create or update reusable generated components for:

- storefront layout
- model grid/profile
- membership/pricing
- draft checkout/payment/success
- dashboard membership state
- closet home/outfit/viewer/environment/chat/video
- AI chat/video/messages
- PWA home/navigation
- EDEN SKYE ADMIN command center modules

## Backend Plan

Create or update draft/test-safe API routes for:

- admin readiness/bridges/gates/evidence/command queue/builder docs
- Shopify webhook in test mode
- entitlement sync fixture/test mode
- HeyGen packet prep
- Eden chat draft route

## Repo And File Map

Add:

- `scripts/generate-eden-full-site.mjs`
- `data/factory/receipts/eden-full-site-generator-latest.json`
- tests for full-site route registry, Black Card draft flow, closet assets, admin source map, and protected gates
- package script `generator:full-site`

Update:

- `package.json`
- `tests/eden-skye-admin.test.mjs` or add `tests/eden-full-site-generator.test.mjs`
- visual preview bridge screenshot targets if needed

## Tool And Integration Plan

- Read manifests from `config/` and `docs/`.
- Generate TSX/route files with locked assets from `app/visual-source-truth.ts`.
- Never read or render reference board images as production assets.
- Write generator receipt.
- Run tests/build.
- Run visual bridge.

## Validation Plan

1. `npm run generator:full-site`
2. `npm test`
3. `npm run build`
4. `npm run visual:preview-bridge`
5. Review screenshots.

## Blockers Or Missing Pieces

- Current local workspace cannot clone/build due network 403.
- Full-site generator script is not yet implemented; this packet defines it.
- Black Card is currently scaffolded, not fully test-mode wired.
- `/payment`, `/success`, `/ai-chat`, `/ai-video`, and `/messages` are marked missing and must be generated.

## Next Best Prompt

Implement `scripts/generate-eden-full-site.mjs` from the full-site autogeneration manifests. Add `npm run generator:full-site`, generate all required routes including Closet, EDEN SKYE ADMIN, Black Card draft/test commerce, AI pages, PWA pages, and write tests/receipt. Run `npm test` and `npm run build`. Keep live Shopify payments and production mutation blocked.