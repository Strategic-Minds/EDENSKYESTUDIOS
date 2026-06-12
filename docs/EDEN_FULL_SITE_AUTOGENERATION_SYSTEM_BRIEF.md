# EDEN FULL SITE AUTOGENERATION System Brief

## Purpose

Create a governed generator that can rebuild the entire Eden Skye Studios website, Eden's Closet, EDEN SKYE ADMIN, PWA surfaces, media/AI pages, and draft-safe Black Card commerce flow from canonical manifests and builder docs.

## Required Outcome

The full site must be reproducible from source truth, not hand-patched page by page. The generator must read page specs, route registry, asset manifests, admin source maps, approval gates, commerce contracts, and validation matrices, then write deterministic routes/components/tests.

## Current Gap

The existing `scripts/reset-eden-generator.mjs` is intentionally narrow. It rebuilds readiness/admin scaffold surfaces and refuses to touch locked storefront, model, closet, public assets, and visual source truth. That is safe, but it is not enough for full-site generation.

## Generator Expansion Required

Add a new generator layer that owns the whole site while preserving locked source truth:

- Homepage
- Models grid
- Model profile
- Membership/pricing
- Draft-safe checkout
- Payment/success test-mode flow
- Dashboard
- Eden's Closet home
- Closet outfit selector
- Closet environment selector
- Full experience viewer
- Measurements/details
- AI Video Chat / HeyGen
- AI Chat
- Messages
- Mobile PWA screens
- EDEN SKYE ADMIN
- Admin bridge/API surfaces
- Evidence and approval gates

## Non-Negotiable Source Truth

- `docs/EDEN_EXACT_IMAGE_SOURCE_MANIFEST_2026-06-12.json` is canonical render image truth.
- `app/visual-source-truth.ts` is the app-facing visual registry.
- `config/eden-skye-admin-chat-ui-source-map.json` is canonical admin source-package truth.
- Collage/page-board images are layout references only.
- No generated page may crop a collage board and treat it as a standalone image.

## Protected Actions

The generator may create draft code, docs, manifests, tests, and preview evidence. It must not activate live Shopify payments, mutate Supabase production schema, deploy production, publish social content, send real Gmail, create external Calendar events, change DNS/billing/secrets, merge, or release without explicit approval.