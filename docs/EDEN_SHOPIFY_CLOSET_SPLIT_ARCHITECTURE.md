# Eden Shopify And Closet Split Architecture

Status: corrected architecture for the Eden Skye Studios launch.

## Plan Mode

### Objective

Separate the Eden Skye Studios public Shopify storefront from the Edens Closet Vercel app so the build matches Jeremy's intended workflow.

### Correct Architecture

- Shopify page/storefront: the black/champagne mock website shown in Drive, `EDENSKYEWEBSITEV2.png`.
- Vercel app: Edens Closet, login/member experience, admin/control plane, AI chat, voice/video chat readiness, model changing-room, Xyla/content workflow, and bridge/automation surfaces.

### Source Truth

- Shopify website mockup: `EDENSKYEWEBSITEV2.png`
- Drive file: `https://drive.google.com/file/d/1xaDrBNIaXSwmtdothIZvZSczDjqX6qTR/view`
- Eden Vercel project id: `prj_mtmJQYYqRodNnH2UrDqwaK2MHgoA`
- Shopify store: `eden-skye-studios.myshopify.com`
- GitHub source repo: `Strategic-Minds/EDENSKYESTUDIOS`
- Auto Builder guide repo: `Strategic-Minds/AUTO_BUILDER`

### Why This Matters

The mockup in Drive is the Shopify page. It should become the public commerce storefront and product/membership conversion experience.

Edens Closet is not the Shopify storefront. It is the private/member app experience and should live in Vercel because it needs app-style behavior:

- login/member routing
- model selection
- outfit/pose/personality configuration
- AI chat
- AI voice and video-chat readiness
- admin review/control plane
- Xyla/content packet generation
- Git/Vercel/Supabase/Drive/Shopify/HeyGen bridge routing

### Systems Involved

- Shopify: public storefront, product pages, collections, Black Card membership, checkout, commerce navigation.
- Vercel: Edens Closet app, admin app, AI runtime surfaces, bridge APIs, preview workflows.
- GitHub: source control, theme branch/repo, Vercel app repo, docs, workflows.
- Supabase: future app data, leads, member state, approval queue, receipts.
- Drive: mockup source truth and approval control plane.
- Auto Builder: governed build packets and readiness/promotion lanes.

### Approval Gates

- No Shopify theme publish without approval.
- No Shopify product, price, discount, payment, inventory, or checkout mutation without approval.
- No Vercel production deploy without approval.
- No Supabase production migration or service-role write without approval.
- No public publishing without approval.

## Build Mode

## Target Surfaces

### Shopify Public Site

The Shopify site should implement the Drive mockup:

- Home page: `EDENSKYEWEBSITEV2.png` visual direction.
- Navigation: Home, Creators, Downloads, Chat, Video Chat, Licenses, Products, Services.
- Conversion buttons: Sign In, Join Now, Explore Creators.
- Right-side feature cards: Chat, Video Chat, Downloads, Licenses, Membership.
- Creator cards: Eden Skye, Solara Vane, Liora Vale, Nova Rain, Celeste Noir, Maya Velvet.
- Popular downloads.
- Top products.
- Premium services.
- Trust/footer strip.

Shopify owns:

- product pages
- collection pages
- cart/checkout path
- customer account or membership product entry point
- product images and copy
- membership purchase/checkout

### Vercel Edens Closet App

Vercel owns:

- `/closet`
- `/login`
- `/admin`
- `/admin/eden`
- `/api/eden/chat`
- `/api/closet/session`
- `/api/xyla/draft`
- `/api/readiness`
- `/api/bridge/*`
- future voice/video chat app flows
- future Supabase-backed member/model/session data

## Routing Contract

Shopify should send approved traffic into Vercel app surfaces only where the user enters the private experience.

Suggested routing:

- Shopify `Sign In` -> Vercel `/login`
- Shopify `Join Now` -> Shopify Black Card product/checkout
- Shopify `Chat` -> Vercel `/login` or `/closet` after access
- Shopify `Video Chat` -> Vercel gated video-chat route after access
- Shopify `Downloads` -> Shopify digital collection or member download route
- Shopify `Licenses` -> Shopify license collection/product page
- Shopify `Products` -> Shopify products/collections
- Shopify `Services` -> Shopify service products or inquiry form
- Shopify post-purchase/member CTA -> Vercel `/closet`

## Repo Strategy

### Required Split

Do not connect the current Next.js app directly to Shopify as a theme branch.

Use one of these structures:

1. Same GitHub repo, separate Shopify theme branch/folder generated from the mockup.
2. Separate repo for Shopify theme, connected to Shopify GitHub integration.
3. Keep current repo for Vercel app and create a `shopify-theme` repo when ready.

Recommended immediate structure:

- `Strategic-Minds/EDENSKYESTUDIOS`: Vercel app and docs.
- New Shopify theme branch or repo: Eden Shopify storefront built from `EDENSKYEWEBSITEV2.png`.

## Auto Builder Work Packets

### Packet 1: Shopify Page Build

- Convert `EDENSKYEWEBSITEV2.png` into Shopify theme sections/templates.
- Create Shopify theme-compatible structure.
- Use durable image assets.
- Keep unpublished theme until approval.
- Add preview link to Drive control plane.

### Packet 2: Vercel Closet App Finish

- Keep `/closet`, `/login`, `/admin`, `/admin/eden`, and API routes in Vercel.
- Wire Shopify membership entry points to Vercel private surfaces after approval.
- Keep production deploy locked until approval.

### Packet 3: Commerce And Access Bridge

- Map Shopify purchase/membership state to Edens Closet access.
- Define post-purchase redirect to Vercel `/login` or `/closet`.
- Define Supabase tables or receipts after approval.
- Keep customer/account linkage governed.

## Acceptance Criteria

The split is ready when:

1. Shopify preview shows the Drive mockup as the public storefront.
2. Vercel preview shows Edens Closet app surfaces.
3. Shopify Sign In/Chat/private-access links point to Vercel routes.
4. Shopify Join Now/Product links remain in Shopify commerce.
5. Production and Shopify publishing remain approval-gated.
6. Drive control plane contains both preview links and approval rows.

## Immediate Next Action

Create the Shopify theme build packet from `EDENSKYEWEBSITEV2.png` and keep the Vercel app focused on Edens Closet.
