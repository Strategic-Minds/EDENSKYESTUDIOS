# Shopify V1 Website Preview Branch Contract

## Branch

```text
shopify/v1-website-preview
```

## Purpose

This is the dedicated working branch for the Eden Skye Studios Shopify V1 public website.

All Shopify storefront edits, theme source edits, mockup-match work, visual QA, Shopify preview preparation, and storefront documentation must happen on this branch unless Jeremy explicitly names a different branch in the current session.

## Approved Website Source Of Truth

The approved visual mockup is:

```text
EDENSKYEWEBSITEV2.png
```

The Shopify V1 site must match the approved black/champagne website mockup before any agent can call the Shopify website complete.

## Required Architecture Boundary

Shopify owns:

- public storefront
- homepage
- creators
- downloads
- licenses
- products
- services
- membership offer
- checkout/cart commerce paths

Vercel owns:

- Eden Closet
- `/login`
- `/closet`
- `/admin`
- AI chat
- voice/video readiness
- agent/control-plane surfaces
- bridge APIs

Do not rebuild Eden Closet as the Shopify public website. Do not use the Vercel app branch as the Shopify theme branch.

## Agent Editing Rule

Every agent editing the Shopify website must:

1. use branch `shopify/v1-website-preview`
2. inspect `README.md`, `AGENTS.md`, this file, and the approved mockup-match docs before editing
3. keep the storefront aligned to `EDENSKYEWEBSITEV2.png`
4. commit only reversible Shopify V1 website/theme/source changes to this branch
5. avoid production deploys and Shopify publishes without approval
6. take screenshot proof after every meaningful visual edit
7. attach or reference screenshot proof in the validation receipt, PR, issue, or handoff note

## Screenshot Proof Requirement

Every visual edit must produce proof:

- desktop screenshot at approximately `1920x1243`
- mobile screenshot at approximately `390x844`
- visual diff or side-by-side comparison against `EDENSKYEWEBSITEV2.png` when available
- validation summary naming what changed and what still differs from the mockup

No visual Shopify website edit is complete without screenshot proof.

## Required Mockup Sections

The Shopify V1 page must include:

- Eden Skye Studios black/champagne header
- Home / Creators / Downloads / Chat / Video Chat / Licenses / Products / Services navigation
- search icon
- Sign In button
- Join Now button
- hero headline: `CREATOR EXPERIENCE. REAL. BEAUTIFUL. UNFORGETTABLE.`
- hero model/creator image as the dominant first-screen visual
- right action rail: Chat, Video Chat, Downloads, Licenses, Membership
- feature strip: Chat, Video Chat, Downloads, Licenses, Products, Services, Secure, Support
- creator cards: Eden Skye, Solara Vane, Liora Vale, Nova Rain, Celeste Noir, Maya Velvet
- Popular Downloads section
- Top Products section
- Premium Services section
- trust strip: 100% Secure, Private & Encrypted, Safe Payments, 24/7 Support, Cancel Anytime

## Validation Workflow

When a Vercel or Shopify preview URL exists, agents must trigger or request the Auto Builder validation workflow:

```text
eden-mockup-visual-validation.yml
```

Required validation inputs:

```json
{
  "preview_url": "<preview URL>",
  "approved_mockup_url": "<stable EDENSKYEWEBSITEV2.png URL>",
  "validation_mode": "strict",
  "threshold_percent": "0.5",
  "request_id": "shopify-v1-website-preview-validation"
}
```

## Governance Locks

This branch does not authorize:

- Shopify theme publish
- production deploy
- payment/pricing/discount changes
- product mutation
- public publishing
- destructive GitHub/Drive/Supabase actions

Those actions require explicit approval in the current session.

## Acceptance Criteria

The branch is ready for review only when:

1. Shopify V1 website source exists on this branch.
2. A preview URL exists.
3. Desktop and mobile screenshots are captured.
4. Screenshot evidence matches the approved mockup structure.
5. Auto Builder validation evidence exists or the blocker is documented.
6. Any mismatch has a correction task.
7. Production and Shopify publish remain locked until approval.
