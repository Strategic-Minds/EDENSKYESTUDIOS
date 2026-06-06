# Auto Builder Site Completion Packet

Status: immediate execution packet for finishing the Eden Skye Studios website and preparing the Shopify connection path.

## Plan Mode

### Objective

Finish the Eden Skye Studios website from the approved Drive mockup and move it into a clean Git/Vercel/Shopify-ready handoff without breaking governance locks.

### Existing Files Analyzed

- `README.md`
- `START_HERE.md`
- `docs/EDEN_SKYE_STUDIOS_CAPABILITIES.md`
- `docs/OPERATING_CHANGELOG.md`
- `package.json`
- `app/page.tsx`
- Drive mockup: `EDENSKYEWEBSITEV2.png`
- Drive folder: `EDEN SKYE STUDIOS / WEBSITE`

### Source Truth

- Website repo: `Strategic-Minds/EDENSKYESTUDIOS`
- Auto Builder repo: `Strategic-Minds/AUTO_BUILDER`
- Vercel Eden project id: `prj_mtmJQYYqRodNnH2UrDqwaK2MHgoA`
- Shopify store: `eden-skye-studios.myshopify.com`
- Approved mockup image: `https://drive.google.com/file/d/1xaDrBNIaXSwmtdothIZvZSczDjqX6qTR/view`
- Approval control plane: `https://docs.google.com/spreadsheets/d/1D-2NTRPkvHfItlQ2LoDrrUNUrDZg9Iy1DvZ8GrxlrYg/edit`

### Current Reality

The Eden Skye Studios repo is a Next.js App Router site intended for Vercel. It is not currently a native Shopify Liquid theme repository.

That matters because Shopify's GitHub theme integration only connects branches that match the default Shopify theme folder structure. The current Next.js app should not be connected directly as a Shopify theme without either creating a theme-compatible branch/repo or choosing a Vercel storefront plus Shopify commerce-link path.

### Systems Involved

- GitHub for source control and docs
- Vercel for preview builds and production-gated deployment
- Shopify for products, checkout, customer accounts, and commerce routing
- Drive for mockup/source-truth storage
- Supabase for future receipts, approval queue, and content/system records
- Auto Builder for governed routing, readiness checks, redeploy/workflow bridges, and build packets

### Approval Gates

- No production deploy without explicit approval
- No Shopify product/theme/checkout mutation without explicit approval
- No payment, pricing, subscription, or discount changes without explicit approval
- No public publishing without explicit approval
- No Supabase production migration or service-role write without explicit approval
- No destructive GitHub write, branch deletion, merge, force-push, or production-triggering workflow without explicit approval

### Dependencies

- Confirm whether the first launch path is Vercel storefront + Shopify commerce links, or native Shopify theme GitHub integration.
- If native Shopify GitHub theme integration is required, create a Shopify theme-compatible repo or branch with Liquid theme structure.
- Replace temporary/signed/generated image URLs in `app/page.tsx` with durable assets hosted in repo, Shopify CDN, or stable Drive/asset CDN.
- Confirm final product names, prices, membership copy, and checkout destination.
- Confirm Shopify product/collection objects after approval.
- Confirm Vercel environment variables and preview URL.

### Risks

- Connecting the current Next.js repo directly to Shopify GitHub theme integration will not work unless the repo/branch follows Shopify theme structure.
- Shopify admin edits to a connected theme can automatically commit back to the connected GitHub branch.
- Temporary image URLs can expire, breaking the live site.
- Payment/checkout language must stay preview-only until Shopify/Stripe paths are approved.

### Acceptance Criteria

The site is considered ready for Shopify linking when:

1. Home page visually matches the Drive mockup direction.
2. `/login`, `/payment`, `/closet`, `/admin`, and `/admin/eden` render without missing-path errors.
3. All hero/creator/product/service images use durable asset URLs.
4. Product and membership CTAs are mapped to either draft Shopify products, Shopify checkout links, or gated placeholders.
5. Shopify integration path is explicitly chosen and documented.
6. Vercel preview build is green.
7. Production deploy remains locked until approval.
8. Shopify mutations remain locked until approval.

## Build Mode

### Immediate Build Track A: Vercel Storefront + Shopify Commerce Links

Use this path if the goal is to launch the approved Eden website quickly while Shopify handles checkout and product/customer systems.

1. Keep `Strategic-Minds/EDENSKYESTUDIOS` as the Vercel website repo.
2. Finalize homepage parity with `EDENSKYEWEBSITEV2.png`.
3. Finalize `/login`, `/payment`, `/closet`, `/admin`, and `/admin/eden` as preview/portal surfaces.
4. Host all site images durably.
5. Create Shopify products/collections only after approval.
6. Replace payment buttons with Shopify product, checkout, or collection links after approval.
7. Run Vercel preview build.
8. Add preview link to the Drive approval control plane.
9. Request approval before production deploy.

### Immediate Build Track B: Native Shopify Theme GitHub Integration

Use this path if the requirement is specifically to connect GitHub to Shopify's Online Store theme system.

1. Create a separate Shopify theme-compatible repo or branch.
2. Use default Shopify theme folder structure: `assets`, `config`, `layout`, `locales`, `sections`, `snippets`, `templates`.
3. Convert the Eden mockup into Liquid sections and JSON templates.
4. Keep the current Next.js repo as source/reference or Vercel app, not the direct Shopify theme branch.
5. Connect the Shopify theme branch through Shopify Admin > Online Store > Themes > Add theme > Connect from GitHub.
6. Test Shopify-to-GitHub sync on an unpublished theme first.
7. Publish only after preview approval.

### Auto Builder Execution Lanes

1. Intake lane: confirm Track A or Track B.
2. Planning lane: create build packet and acceptance criteria.
3. Source-truth lane: compare repo against `EDENSKYEWEBSITEV2.png`.
4. Website lane: finish visual parity and route coverage.
5. Commerce lane: create Shopify product/link map, mutations locked until approved.
6. Asset lane: move all temporary image URLs to durable assets.
7. Validation lane: run Vercel preview, route checks, and screenshot/visual QA.
8. Control-plane lane: add preview and approval rows to Drive.
9. Promotion lane: production deploy only after approval.

### Route Completion Checklist

- [ ] `/` matches the Drive mockup direction.
- [ ] `/login` supports member entry and model selection preview.
- [ ] `/payment` supports Black Card checkout preview and approved Shopify link placeholders.
- [ ] `/closet` supports model changing-room preview.
- [ ] `/admin` shows approval/media/workflow console.
- [ ] `/admin/eden` resolves to Edens Closet/admin flow.
- [ ] `/api/readiness` returns lock/readiness status.
- [ ] `/api/bridge/stack-readiness` returns connected-system readiness.
- [ ] `/api/xyla/draft` remains draft-only.

### Shopify Linking Checklist

- [ ] Decide Track A or Track B.
- [ ] Confirm Shopify store access and permissions.
- [ ] Confirm product/membership SKU map.
- [ ] Confirm collection map.
- [ ] Confirm customer/account flow.
- [ ] Confirm checkout/payment provider state.
- [ ] Confirm no product, price, discount, inventory, or theme mutation occurs before approval.
- [ ] Add Shopify preview or product links only after approval.

### Validation Receipts

Required receipts before calling the site done:

- GitHub commit SHA for final website/docs update
- Vercel preview URL
- Route check list for `/`, `/login`, `/payment`, `/closet`, `/admin`, `/admin/eden`
- Visual comparison note against `EDENSKYEWEBSITEV2.png`
- Durable asset inventory
- Shopify link map or theme branch link
- Drive approval control-plane row
- Production approval state

### Final Status

Current status: docs packet created; website completion remains in execution queue.

Next action: choose Track A for fastest launch unless native Shopify theme control is required immediately.

Recommended: Track A first. Keep the polished Next.js/Vercel website as the public experience, then link Shopify products/checkout behind approved buttons. Build Track B only if the store must run as a Shopify Online Store theme.

## References

- Shopify GitHub integration for themes: https://shopify.dev/storefronts/themes/tools/github
- Shopify version control best practices: https://shopify.dev/docs/storefronts/themes/best-practices/version-control
- Shopify CLI for themes: https://shopify.dev/docs/storefronts/themes/tools/cli
