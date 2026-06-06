# Shopify Git Linking Runbook

Purpose: show the safe path to connect Eden Skye Studios from Git to Shopify without confusing a Vercel/Next.js app with a Shopify Liquid theme.

## Plan Mode

### Objective

Prepare Eden Skye Studios so Jeremy can connect Git, Vercel, and Shopify in the right order and launch the site without accidentally publishing, mutating products, or connecting an incompatible repo to Shopify themes.

### Key Decision

Choose one of these paths:

- Track A: Vercel storefront + Shopify commerce links. Fastest path for the current Next.js repo.
- Track B: Native Shopify theme GitHub integration. Requires a Shopify theme-compatible repo or branch.

### Current Repo Reality

`Strategic-Minds/EDENSKYESTUDIOS` is a Next.js/Vercel app. It contains `app/page.tsx`, `package.json`, and App Router routes. This is not the default Shopify theme folder structure.

Shopify's GitHub theme integration expects a buildless theme or compiled theme branch with Shopify theme folders. A raw Next.js app is not directly compatible with that theme integration.

### Approval Gates

- Do not mutate Shopify products, prices, inventory, discounts, checkout settings, or theme files without explicit approval.
- Do not publish a Shopify theme without explicit approval.
- Do not deploy production from Vercel without explicit approval.

## Build Mode

## Track A: Fastest Launch - Vercel Site + Shopify Commerce

Use this if the goal is to get the Eden website live fast and let Shopify handle commerce.

### Architecture

- GitHub repo: `Strategic-Minds/EDENSKYESTUDIOS`
- Frontend hosting: Vercel
- Storefront UI: Next.js pages/routes
- Commerce: Shopify products, collections, checkout links, or Storefront API
- Approval: Drive control plane before live mutations

### Steps

1. Finish website visual parity against `EDENSKYEWEBSITEV2.png`.
2. Run Vercel preview only.
3. Create a Shopify product/link map in draft form.
4. After approval, create or identify Shopify products and collections.
5. Add approved Shopify product/collection/checkout URLs into site CTAs.
6. Confirm `/payment` routes users to the approved checkout or product page.
7. Confirm `/login` and `/closet` are preview/member surfaces and not pretending to be Shopify customer accounts unless connected.
8. Add preview URL to the Drive approval control plane.
9. Request production approval.

### Track A Environment Variables

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` only for approved server writes
- `SHOPIFY_SHOP=eden-skye-studios.myshopify.com`
- `SHOPIFY_ADMIN_TOKEN` only for approved server-side Shopify operations
- Optional Storefront API token if using Shopify Storefront API

### Track A Acceptance Criteria

- Vercel preview URL works.
- Website mockup parity is confirmed.
- Shopify links are mapped but not mutated until approved.
- Payment page uses approved checkout path.
- Production is still locked.

## Track B: Native Shopify GitHub Theme Integration

Use this if the Eden website must live inside Shopify Online Store as a native theme.

### Architecture

- Shopify theme repo or branch: must contain Shopify theme structure.
- Required default folders include: `assets`, `config`, `layout`, `locales`, `sections`, `snippets`, `templates`.
- Eden Next.js repo can remain as the design/prototype/source app, but the connected Shopify branch must be a Shopify theme branch.

### Steps To Connect In Shopify Admin

1. Install or authorize the Shopify GitHub app if it is not already installed.
2. In Shopify admin, go to `Online Store > Themes`.
3. In Theme library, choose `Add theme > Connect from GitHub`.
4. Select the GitHub organization/account.
5. Select the Shopify theme-compatible repository.
6. Select the theme-compatible branch.
7. Add it as an unpublished theme first.
8. Open the theme preview and validate the storefront.
9. Make one tiny theme-editor setting change, save, and verify Shopify creates a GitHub commit authored by the Shopify bot.
10. Publish only after approval.

### Track B Theme Build Requirements

- Convert Eden homepage into Liquid sections.
- Create JSON templates for homepage, product, collection, page, cart, and policy surfaces as needed.
- Put reusable UI in snippets.
- Put CSS/JS/images in assets.
- Store merchant-editable content in sections/settings.
- Run `shopify theme check` before connecting.
- Use an unpublished theme for validation.

### Track B Acceptance Criteria

- The repo/branch is accepted by Shopify GitHub integration.
- Theme appears in Shopify Theme library as connected to the branch.
- Last commit/sync status is visible on the Shopify theme card.
- Theme preview works.
- GitHub receives a Shopify bot commit after a safe test setting change.
- Theme remains unpublished until approved.

## Product And CTA Map

Initial draft map:

- `Join Now` -> Black Card Membership product or membership checkout
- `Explore Creators` -> creator/model collection or `/login`
- `Chat` -> gated member login/creator chat surface
- `Video Chat` -> gated approved avatar/video-chat offer
- `Downloads` -> digital content collection
- `Licenses` -> commercial license product/collection
- `Products` -> Shopify product collection
- `Services` -> service inquiry/productized service collection

No live links should be added until the target Shopify objects are approved.

## Shopify Mutation Approval Checklist

Before any Shopify mutation:

- [ ] Product title approved
- [ ] Product price approved
- [ ] Description approved
- [ ] Image approved
- [ ] Collection approved
- [ ] Inventory/digital delivery behavior approved
- [ ] Checkout/payment behavior approved
- [ ] Approval row exists in Drive control plane

## Known Shopify Constraints

- Shopify GitHub theme integration syncs theme code with a Shopify theme branch.
- Shopify can commit admin/theme-editor changes back to the connected GitHub branch.
- Only repos/branches with Shopify theme structure are valid for theme integration.
- If the frontend uses a build pipeline, the connected Shopify branch should contain compiled theme output, not incompatible source-only app code.

## Recommended Immediate Decision

Use Track A now.

Reason: Eden Skye Studios is already a Next.js/Vercel site matching the approved website mockup. Track A lets Jeremy connect Shopify commerce quickly while preserving the richer app surfaces: Edens Closet, login, payment preview, admin console, Xyla packets, and future avatar/video-chat workflows.

Track B can be built afterward if Jeremy wants the Shopify Online Store theme itself to mirror the same design.

## References

- Shopify GitHub integration for themes: https://shopify.dev/storefronts/themes/tools/github
- Shopify version control for themes: https://shopify.dev/docs/storefronts/themes/best-practices/version-control
- Shopify CLI for themes: https://shopify.dev/docs/storefronts/themes/tools/cli
