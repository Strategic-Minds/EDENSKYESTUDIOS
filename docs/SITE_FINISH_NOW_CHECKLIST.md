# Site Finish Now Checklist

This is the immediate checklist to finish Eden Skye Studios from the approved website mockup.

## Plan Mode

### Objective

Finish the Eden Skye Studios site so Jeremy can review the Vercel preview, approve Shopify linkage, and move toward launch without production or Shopify mutations happening early.

### Source Truth

- Drive website mockup: `EDENSKYEWEBSITEV2.png`
- Website folder: `EDEN SKYE STUDIOS / WEBSITE`
- Repo: `Strategic-Minds/EDENSKYESTUDIOS`
- Vercel project: `prj_mtmJQYYqRodNnH2UrDqwaK2MHgoA`
- Shopify store: `eden-skye-studios.myshopify.com`

### Current Site Surfaces

- `/`
- `/login`
- `/payment`
- `/closet`
- `/admin`
- `/admin/eden`
- `/api/readiness`
- `/api/bridge/stack-readiness`
- `/api/xyla/draft`

### Build Decision

Default to Track A: Vercel storefront plus Shopify commerce links.

Do not attempt direct Shopify GitHub theme integration with the current Next.js repo unless a theme-compatible branch/repo is created.

## Build Mode

## Phase 1: Mockup Parity

- [ ] Compare `/` against `EDENSKYEWEBSITEV2.png`.
- [ ] Confirm black/champagne/premium visual system.
- [ ] Confirm hero copy, creator lane, service cards, product cards, membership block, footer trust strip.
- [ ] Confirm mobile responsive layout.
- [ ] Confirm no text overlap or clipped controls.
- [ ] Confirm all imagery is durable, not temporary signed URLs.

## Phase 2: Route Completion

- [ ] `/login` renders member/model entry preview.
- [ ] `/payment` renders Black Card payment preview and approved Shopify placeholder/link area.
- [ ] `/closet` renders Edens Closet model changing-room/admin preview.
- [ ] `/admin` renders approval/media operations console.
- [ ] `/admin/eden` routes cleanly.
- [ ] `/api/readiness` returns JSON status.
- [ ] `/api/bridge/stack-readiness` returns JSON status.

## Phase 3: Commerce Mapping

- [ ] Draft Black Card Membership product map.
- [ ] Draft Creator Starter Pack product map.
- [ ] Draft Content Creator Toolkit product map.
- [ ] Draft Video Content Pack product map.
- [ ] Draft Behind The Scenes Pack product map.
- [ ] Draft Custom Creator Build service map.
- [ ] Draft Content Creation Service map.
- [ ] Draft Brand Collaboration/Sponsorship service map.
- [ ] Add Shopify mutation approval rows before creating or updating objects.

## Phase 4: Shopify Linkage

Track A:

- [ ] Keep the app on Vercel.
- [ ] Use Shopify product/collection/checkout links after approval.
- [ ] Update CTAs only after target Shopify URLs are approved.
- [ ] Preserve `/payment` as a preview until checkout is approved.

Track B:

- [ ] Create Shopify theme-compatible repo/branch.
- [ ] Convert Eden mockup into Liquid sections/templates.
- [ ] Connect through Shopify Admin > Online Store > Themes > Add theme > Connect from GitHub.
- [ ] Keep theme unpublished until approved.

## Phase 5: Auto Builder Preview

- [ ] Call Auto Builder provider readiness.
- [ ] Call Eden runtime readiness.
- [ ] Dispatch preview-only Vercel redeploy for Eden Skye Studios.
- [ ] Confirm preview URL.
- [ ] Check routes.
- [ ] Record receipts in Drive control plane.

## Phase 6: Approval And Promotion

- [ ] Add final preview to Drive control plane.
- [ ] Add Shopify link/product mutation request rows.
- [ ] Add production deploy approval request row.
- [ ] Wait for explicit approval.
- [ ] Production deploy only after approval.
- [ ] Shopify mutation only after approval.

## Immediate Next Actions

1. Replace any temporary signed creator/hero image URLs with durable repo or CDN assets.
2. Run a preview-only Vercel deployment.
3. Review preview against `EDENSKYEWEBSITEV2.png`.
4. Build Shopify product/link map as draft only.
5. Ask Jeremy to approve Track A or Track B.

## Completion Receipt Template

```markdown
## Site Completion Receipt

- GitHub commit:
- Vercel preview URL:
- Mockup compared:
- Routes checked:
- Durable assets confirmed:
- Shopify track selected:
- Shopify mutation approval state:
- Production deploy approval state:
- Drive control-plane row:
- Final status:
```
