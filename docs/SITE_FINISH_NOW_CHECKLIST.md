# Site Finish Now Checklist

This is the immediate checklist to finish Eden Skye Studios with the correct split:

- Shopify page: the public website mockup shown in Drive.
- Vercel app: Edens Closet and all private/app/control surfaces.

## Plan Mode

### Objective

Finish the Eden Skye Studios Shopify page and Vercel Edens Closet app so Jeremy can review both previews, approve linking, and move toward launch without early production deploys or Shopify mutations.

### Source Truth

- Drive website mockup: `EDENSKYEWEBSITEV2.png`
- Website folder: `EDEN SKYE STUDIOS / WEBSITE`
- Repo: `Strategic-Minds/EDENSKYESTUDIOS`
- Vercel project: `prj_mtmJQYYqRodNnH2UrDqwaK2MHgoA`
- Shopify store: `eden-skye-studios.myshopify.com`

### Correct Build Decision

- Build the Drive mockup as the Shopify public storefront/page.
- Keep Edens Closet in Vercel.
- Do not connect the current Next.js branch directly as a Shopify theme.
- Create a Shopify theme-compatible branch/repo for the Shopify page if using Shopify GitHub integration.

## Build Mode

## Phase 1: Shopify Page From Drive Mockup

- [ ] Create or select Shopify theme-compatible repo/branch.
- [ ] Build Shopify theme folder structure: `assets`, `config`, `layout`, `locales`, `sections`, `snippets`, `templates`.
- [ ] Convert `EDENSKYEWEBSITEV2.png` into Shopify sections.
- [ ] Build header/navigation.
- [ ] Build Creator Experience hero.
- [ ] Build right-side feature cards: Chat, Video Chat, Downloads, Licenses, Membership.
- [ ] Build capability strip.
- [ ] Build Meet Our Creators row.
- [ ] Build Popular Downloads.
- [ ] Build Top Products.
- [ ] Build Premium Services.
- [ ] Build trust/footer strip.
- [ ] Use durable Shopify/repo/CDN assets.
- [ ] Keep Shopify theme unpublished until approval.

## Phase 2: Vercel Edens Closet App

- [ ] `/login` renders member/model entry preview.
- [ ] `/closet` renders model changing-room/admin preview.
- [ ] `/admin` renders approval/media operations console.
- [ ] `/admin/eden` routes cleanly.
- [ ] `/api/eden/chat` remains governed.
- [ ] `/api/closet/session` remains draft/session builder.
- [ ] `/api/xyla/draft` remains draft-only.
- [ ] `/api/readiness` returns JSON status.
- [ ] `/api/bridge/stack-readiness` returns JSON status.
- [ ] Vercel preview only; production stays locked.

## Phase 3: Shopify Commerce Mapping

- [ ] Draft Black Card Membership product map.
- [ ] Draft Creator Starter Pack product map.
- [ ] Draft Content Creator Toolkit product map.
- [ ] Draft Video Content Pack product map.
- [ ] Draft Behind The Scenes Pack product map.
- [ ] Draft Custom Creator Build service map.
- [ ] Draft Content Creation Service map.
- [ ] Draft Brand Collaboration/Sponsorship service map.
- [ ] Add Shopify mutation approval rows before creating or updating objects.

## Phase 4: Shopify To Vercel Routing

- [ ] Shopify `Sign In` -> Vercel `/login`.
- [ ] Shopify `Chat` -> Vercel `/login` or gated `/closet`.
- [ ] Shopify `Video Chat` -> Vercel gated video-chat route after access.
- [ ] Shopify post-purchase/member CTA -> Vercel `/closet`.
- [ ] Shopify `Join Now`, products, downloads, licenses, and services remain Shopify commerce surfaces unless approved otherwise.

## Phase 5: Auto Builder Preview

- [ ] Call Auto Builder provider readiness.
- [ ] Call Eden runtime readiness.
- [ ] Run Vercel preview for Edens Closet app.
- [ ] Create Shopify unpublished theme preview for public page.
- [ ] Check routes and visual parity.
- [ ] Record receipts in Drive control plane.

## Phase 6: Approval And Promotion

- [ ] Add Vercel preview to Drive control plane.
- [ ] Add Shopify theme preview to Drive control plane.
- [ ] Add Shopify product/link mutation request rows.
- [ ] Add production deploy approval request row.
- [ ] Wait for explicit approval.
- [ ] Vercel production deploy only after approval.
- [ ] Shopify theme publish only after approval.
- [ ] Shopify product/payment mutations only after approval.

## Immediate Next Actions

1. Build the Shopify theme-compatible page from `EDENSKYEWEBSITEV2.png`.
2. Keep current Next.js/Vercel app focused on Edens Closet and private app surfaces.
3. Replace any temporary signed image URLs with durable assets.
4. Produce Shopify unpublished theme preview and Vercel preview.
5. Add both previews to the Drive approval control plane.

## Completion Receipt Template

```markdown
## Site Completion Receipt

- Shopify theme repo/branch:
- Shopify unpublished preview URL:
- Vercel app commit:
- Vercel preview URL:
- Mockup compared:
- Vercel routes checked:
- Durable assets confirmed:
- Shopify-to-Vercel routing confirmed:
- Shopify mutation approval state:
- Vercel production approval state:
- Drive control-plane rows:
- Final status:
```
