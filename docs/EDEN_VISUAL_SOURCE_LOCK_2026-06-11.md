# Eden Skye Visual Source Lock - 2026-06-11

## Status

LOCKED_BY_JEREMY

Approval text: "thats exactly what i want. lock"

## Evidence

- Workflow: Eden Visual Preview Bridge #33
- Commit reviewed: `bf587acddad8d121efee1f8e944239a44e19f157`
- Artifact: `eden-visual-preview-evidence`
- Artifact digest: `sha256:10c5d17b24ef2aae5495c8d65bddfaf395f56ab0bbb1a5f77807adb1e57a21c2`
- Screenshots captured: 24 desktop/mobile Chromium screenshots

## Locked Rule

Use generated standalone source images only for rendered page/model/closet/hero/PWA assets.

Uploaded collage/page-board images remain layout references only. They must not be cropped, used as backgrounds, used as model cards, used in Eden's Closet, or rendered as production page assets.

Rejected Drive thumbnails and previous collage-board candidates remain disqualified and must not expose renderable `src` URLs.

## Generated Standalone Asset Families

- Home hero: Alexis neon ES hero
- Model grid/profile: Luna Moretti, Sienna Cole, Alexis Voss, Natalia Vega, Zoey Parker, Aria Reyes
- Closet: full-body Alexis black look
- Environments: modern bedroom, walk-in closet, penthouse living room, beach villa, luxury hotel suite, rooftop terrace, photo studio
- AI/PWA: AI video still, AI chat portrait, PWA home mockup, PWA navigation mockup

## Enforcement

- `app/visual-source-truth.ts` contains the locked manifest and visual lock record.
- `tests/visual-source-truth.test.mjs` fails if the lock record, generated assets, or no-collage guardrails are removed.
- `scripts/capture-eden-visual-preview.mjs` fails if rendered HTML contains reference-board/collage markers, rejected Drive thumbnail markers, missing-asset placeholders, or visual pages without generated standalone CDN assets.

## Governance

This lock does not authorize production deployment, payment activation, live Shopify product/payment changes, Supabase production mutation, or live social posting. Those remain separate approval gates.
