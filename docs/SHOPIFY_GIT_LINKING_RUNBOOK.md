# Shopify Git Linking Runbook

Purpose: show the safe path to build the Eden Skye Shopify page from the Drive mockup while keeping Edens Closet in Vercel.

## Plan Mode

### Objective

Prepare Eden Skye Studios so Jeremy can connect Git, Vercel, and Shopify in the right order:

- Shopify owns the public storefront page shown in Drive.
- Vercel owns Edens Closet and the app/control experience.

### Correct Architecture

- Shopify page/storefront: the black/champagne website mockup `EDENSKYEWEBSITEV2.png`.
- Vercel app: Edens Closet, login, admin, AI chat, video chat readiness, model changing-room, bridge APIs, and automation surfaces.

### Current Repo Reality

`Strategic-Minds/EDENSKYESTUDIOS` is a Next.js/Vercel app. It contains `app/page.tsx`, `package.json`, and App Router routes. This repo is correct for Edens Closet and Vercel app surfaces.

Shopify's GitHub theme integration expects a buildless theme or compiled theme branch with Shopify theme folders. A raw Next.js app is not directly compatible with that theme integration.

### Key Decision

Build two connected surfaces:

- Surface A: Shopify storefront/theme built from `EDENSKYEWEBSITEV2.png`.
- Surface B: Vercel Edens Closet app using the current Next.js repo.

### Approval Gates

- Do not mutate Shopify products, prices, inventory, discounts, checkout settings, or theme files without explicit approval.
- Do not publish a Shopify theme without explicit approval.
- Do not deploy Vercel production without explicit approval.

## Build Mode

## Surface A: Shopify Storefront From Drive Mockup

Use this for the public shop page Jeremy showed in Drive.

### Architecture

- Shopify store: `eden-skye-studios.myshopify.com`
- Source mockup: `EDENSKYEWEBSITEV2.png`
- Theme source: Shopify theme-compatible repo or branch
- Commerce: Shopify products, collections, checkout, customer account/membership entry

### Shopify Theme Requirements

The connected Shopify branch/repo must include default Shopify theme folders, such as:

- `assets`
- `config`
- `layout`
- `locales`
- `sections`
- `snippets`
- `templates`

Do not connect the current Next.js branch directly to Shopify theme integration.

### Steps To Connect In Shopify Admin

1. Create or choose the Shopify theme-compatible repo/branch.
2. Install or authorize the Shopify GitHub app if it is not already installed.
3. In Shopify admin, go to `Online Store > Themes`.
4. In Theme library, choose `Add theme > Connect from GitHub`.
5. Select the GitHub organization/account.
6. Select the Shopify theme-compatible repository.
7. Select the theme-compatible branch.
8. Add it as an unpublished theme first.
9. Open the theme preview and validate it against `EDENSKYEWEBSITEV2.png`.
10. Make one tiny theme-editor setting change, save, and verify Shopify creates a GitHub commit authored by the Shopify bot.
11. Publish only after approval.

### Shopify Page Sections

Convert the Drive mockup into these Shopify sections:

- Header/navigation
- Creator Experience hero
- Right-side feature rail: Chat, Video Chat, Downloads, Licenses, Membership
- Capability strip: Chat, Video Chat, Downloads, Licenses, Products, Services, Secure, Support
- Meet Our Creators card row
- Popular Downloads
- Top Products
- Premium Services
- Trust/footer strip

### Product And CTA Map

Initial draft map:

- `Join Now` -> Shopify Black Card Membership product or checkout
- `Explore Creators` -> creator collection or Vercel `/login`
- `Chat` -> Vercel `/login` or gated `/closet`
- `Video Chat` -> Vercel gated video-chat route after access
- `Downloads` -> Shopify digital collection or member downloads route
- `Licenses` -> Shopify commercial license products/collection
- `Products` -> Shopify products/collections
- `Services` -> Shopify service products or inquiry page
- post-purchase/member CTA -> Vercel `/closet`

No live links should be added until the target Shopify objects and Vercel routes are approved.

## Surface B: Vercel Edens Closet App

Use the existing Next.js repo for the private/member app and operations surfaces.

### Vercel Routes

- `/closet`
- `/login`
- `/admin`
- `/admin/eden`
- `/api/eden/chat`
- `/api/closet/session`
- `/api/xyla/draft`
- `/api/readiness`
- `/api/bridge/*`

### Vercel Responsibilities

- Member login preview and future auth
- Model changing-room
- AI chat/personality surface
- Voice/video chat readiness
- Admin control plane
- Xyla content packets
- Supabase and approval receipts
- Auto Builder bridges and readiness surfaces

## Commerce And Access Bridge

After approval, connect Shopify purchase/access state to Vercel Edens Closet:

1. User sees public Shopify site.
2. User buys or joins through Shopify.
3. User is routed to Vercel `/login` or `/closet`.
4. Vercel verifies access using approved customer/session data.
5. Supabase records receipts and access state only after approved schema/write path exists.

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

Build the Shopify page from the Drive mockup as a Shopify theme-compatible surface, while keeping Edens Closet in Vercel.

This preserves the intended split:

- Shopify = public commerce page.
- Vercel = private app/control room.

## References

- Shopify GitHub integration for themes: https://shopify.dev/storefronts/themes/tools/github
- Shopify version control for themes: https://shopify.dev/docs/storefronts/themes/best-practices/version-control
- Shopify CLI for themes: https://shopify.dev/docs/storefronts/themes/tools/cli
