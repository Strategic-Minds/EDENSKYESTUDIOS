# Auto Builder Site Completion Packet

Status: corrected execution packet for finishing Eden Skye Studios with Shopify as the public store page and Vercel as Edens Closet.

## Plan Mode

### Objective

Finish the Eden Skye Studios launch architecture from the approved Drive mockup without mixing the Shopify storefront with the Vercel Edens Closet app.

### Existing Files Analyzed

- `README.md`
- `START_HERE.md`
- `docs/EDEN_SKYE_STUDIOS_CAPABILITIES.md`
- `docs/OPERATING_CHANGELOG.md`
- `package.json`
- `app/page.tsx`
- Drive mockup: `EDENSKYEWEBSITEV2.png`
- Drive folder: `EDEN SKYE STUDIOS / WEBSITE`

### Correct Source Truth

- Shopify public page mockup: `EDENSKYEWEBSITEV2.png`
- Drive file: `https://drive.google.com/file/d/1xaDrBNIaXSwmtdothIZvZSczDjqX6qTR/view`
- Vercel Edens Closet app repo: `Strategic-Minds/EDENSKYESTUDIOS`
- Auto Builder repo: `Strategic-Minds/AUTO_BUILDER`
- Eden Vercel project id: `prj_mtmJQYYqRodNnH2UrDqwaK2MHgoA`
- Shopify store: `eden-skye-studios.myshopify.com`
- Approval control plane: `https://docs.google.com/spreadsheets/d/1D-2NTRPkvHfItlQ2LoDrrUNUrDZg9Iy1DvZ8GrxlrYg/edit`

### Correct Architecture

- Shopify owns the public website/page shown in Drive.
- Vercel owns Edens Closet and the app/control surfaces.

This means:

- Build the Drive mockup as a Shopify theme/page.
- Keep `/closet`, `/login`, `/admin`, `/admin/eden`, AI chat, model-changing room, video-chat readiness, and bridge APIs in Vercel.

### Current Reality

The current repo is a Next.js App Router site intended for Vercel. It is correct for Edens Closet and app-like surfaces.

Shopify's GitHub theme integration only connects branches that match Shopify theme structure. A Shopify theme branch/repo must be created for the Drive mockup if the public page is going into Shopify.

### Systems Involved

- Shopify for public storefront, product pages, collections, membership checkout, customer/account paths.
- Vercel for Edens Closet, login, admin, AI chat, video-chat app, bridge APIs, Xyla/content workflows.
- GitHub for source control and separate app/theme branches or repos.
- Drive for mockup/source-truth storage.
- Supabase for future access/receipts/approval tables.
- Auto Builder for governed build packets and preview/promotion lanes.

### Approval Gates

- No production deploy without explicit approval.
- No Shopify product/theme/checkout mutation without explicit approval.
- No Shopify theme publish without explicit approval.
- No payment, pricing, subscription, or discount changes without explicit approval.
- No public publishing without explicit approval.
- No Supabase production migration or service-role write without explicit approval.
- No destructive GitHub write, branch deletion, merge, force-push, or production-triggering workflow without explicit approval.

### Dependencies

- Create or select Shopify theme-compatible repo/branch.
- Convert `EDENSKYEWEBSITEV2.png` into Shopify sections/templates.
- Preserve Vercel for Edens Closet and app routes.
- Decide Shopify-to-Vercel routing for Sign In, Chat, Video Chat, and post-purchase access.
- Replace temporary/signed/generated image URLs with durable Shopify/repo/CDN assets.
- Confirm final product names, prices, membership copy, and checkout destination.
- Confirm Vercel preview URL and Shopify unpublished theme preview URL.

### Risks

- Connecting the current Next.js branch directly to Shopify theme integration will fail or produce an invalid theme.
- Shopify admin edits to connected themes can automatically commit back to GitHub.
- Temporary image URLs can expire.
- Payment/checkout language must stay preview-only until Shopify paths are approved.

### Acceptance Criteria

The architecture is ready when:

1. Shopify preview shows the Drive mockup as the public store page.
2. Vercel preview shows Edens Closet/private app surfaces.
3. Shopify `Sign In`, `Chat`, `Video Chat`, and post-purchase paths route to Vercel when approved.
4. Shopify product, license, download, service, and membership CTAs stay in Shopify commerce.
5. Durable image assets are used.
6. Both preview links are recorded in Drive control plane.
7. Production and Shopify publishing remain approval-gated.

## Build Mode

### Packet 1: Shopify Public Page Build

1. Create Shopify theme-compatible branch/repo.
2. Convert the Drive mockup into Shopify theme sections.
3. Build these sections:
   - header/navigation
   - Creator Experience hero
   - right-side feature cards
   - capability strip
   - creator card row
   - popular downloads
   - top products
   - premium services
   - trust/footer strip
4. Add durable assets.
5. Keep it as unpublished Shopify theme preview.
6. Add preview to Drive control plane.
7. Request approval before publish.

### Packet 2: Vercel Edens Closet Finish

1. Keep `Strategic-Minds/EDENSKYESTUDIOS` focused on Vercel app routes.
2. Finish `/closet`, `/login`, `/admin`, `/admin/eden`.
3. Keep AI chat and video-chat readiness in Vercel.
4. Keep bridge and readiness APIs in Vercel.
5. Run preview-only Vercel deploy.
6. Add preview to Drive control plane.
7. Request approval before production.

### Packet 3: Shopify To Vercel Access Bridge

1. Map Shopify customer/membership purchase to Vercel access intent.
2. Route approved member links to `/login` or `/closet`.
3. Add Supabase access/receipt logic only after approval.
4. Log approval rows before live mutations.

### Route Completion Checklist For Vercel

- [ ] `/login` supports member entry and model selection preview.
- [ ] `/closet` supports model changing-room preview.
- [ ] `/admin` shows approval/media/workflow console.
- [ ] `/admin/eden` routes cleanly.
- [ ] `/api/readiness` returns lock/readiness status.
- [ ] `/api/bridge/stack-readiness` returns connected-system readiness.
- [ ] `/api/xyla/draft` remains draft-only.

### Shopify Page Checklist

- [ ] Drive mockup is translated into Shopify theme sections.
- [ ] Products/services/downloads/licenses map to Shopify product or collection objects.
- [ ] Join Now maps to Shopify membership/checkout after approval.
- [ ] Sign In maps to Vercel `/login` after approval.
- [ ] Chat/Video Chat map to Vercel app surfaces after approval.
- [ ] Unpublished theme preview is created.
- [ ] Publish remains locked.

### Validation Receipts

- GitHub commit SHA for docs/theme/app updates
- Shopify unpublished theme preview URL
- Vercel preview URL for Edens Closet
- Visual comparison note against `EDENSKYEWEBSITEV2.png`
- Durable asset inventory
- Shopify product/link map
- Drive approval control-plane rows
- Production approval state

### Final Status

Corrected status: Shopify page and Vercel Closet are separate surfaces.

Next action: build the Shopify theme/page from `EDENSKYEWEBSITEV2.png`, while keeping Edens Closet in Vercel.

## References

- Shopify GitHub integration for themes: https://shopify.dev/storefronts/themes/tools/github
- Shopify version control best practices: https://shopify.dev/docs/storefronts/themes/best-practices/version-control
- Shopify CLI for themes: https://shopify.dev/docs/storefronts/themes/tools/cli
