# Eden Skye Studios Brand Mockup Vercel Handoff Packet

Packet ID: `brand-mockup-handoff-20260605`

## Objective

Implement the Eden Skye Studios website mockup and brand lock inside the Vercel app, then hand the work to the sandbox-first Auto Builder/Vercel workflow with five-minute cron receipts.

## Source Inputs

- `public/brand/mockups/storefront-home-reference.svg`
- `public/brand/mockups/brand-lock-reference.svg`
- `public/brand/mockups/black-card-commerce-reference.svg`
- `public/brand/creators/*.svg`
- Drive/Git source-of-truth rule: use existing Eden Skye content before creating new Shopify or public assets.

## Implemented Surfaces

- `/` storefront rebuilt around creator commerce, Black Card membership, shop architecture, license governance, and Vercel handoff status.
- `/admin/eden` remains the Edens Closet control plane for chat, assets, files, workflow lanes, receipts, revenue controls, and approval gates.
- `/manifest.webmanifest` added for PWA install behavior.
- `/public/sw.js` updated to cache the app shell and brand-lock assets.
- `/api/cron/brand-mockup-handoff` added as a five-minute sandbox receipt route.
- `/api/cron/bridge-queue-worker` remains the five-minute queue worker for Auto Builder handoff.

## Vercel Workflow

- Preview validation: `.github/workflows/eden-preview-validation.yml`
- Production workflow: `.github/workflows/eden-production-deploy.yml`
- Cron cadence: `*/5 * * * *`
- Sandbox route: `/api/cron/brand-mockup-handoff`
- Bridge worker route: `/api/cron/bridge-queue-worker`

## Guardrails

- No Shopify mutation performed in this packet.
- No public publishing performed in this packet.
- No payment or discount changes performed in this packet.
- No Supabase production migration performed in this packet.
- The route emits receipts and defers external mutation to approved workflow gates.

## Next Action

Push this packet to the Vercel branch through the GitHub/Auto Builder connector, let Vercel build the preview, then let the five-minute cron produce brand mockup handoff receipts.
