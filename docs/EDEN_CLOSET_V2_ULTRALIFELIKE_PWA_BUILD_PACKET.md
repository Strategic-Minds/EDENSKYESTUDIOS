# Eden Closet V2 Ultra-Lifelike PWA Build Packet

## Mission

Create a clean Eden's Closet PWA branch that links from Shopify after Black Card payment and presents a premium member-only virtual model experience.

## Source Images

The current approved image source set was uploaded to Shopify CDN for deployment stability:

- `eden-closet-v2-approved-neon-closet-hero.png`
- `eden-closet-v2-approved-model-lounge-01.png`
- `eden-closet-v2-approved-model-lounge-02.png`
- `eden-closet-v2-approved-full-body-viewer.png`

Canonical manifest: `config/eden-closet-v2-ultralifelike-pwa.json`.

## Customer Flow

1. Customer discovers Eden Skye on Shopify.
2. Customer joins Black Card through Shopify checkout.
3. Shopify success path routes to `/success?next=/closet-v2`.
4. Vercel PWA verifies session and `black_card_member` entitlement.
5. Approved members enter Eden's Closet.

## PWA Modules

- Home command surface for members
- Full-body viewer
- Wardrobe selector
- Identity styling controls
- Environment selector
- AI text chat UI
- AI voice chat UI
- AI video chat UI
- Shopify payment return status
- Supabase entitlement gate adapter

## 3D Engine Plan

The current branch installs a production-looking image-backed PWA and a 3D-ready interface. True game-quality movement requires these assets before activation:

- Approved rigged GLB or VRM avatar
- Motion clips for idle, turn, wave, pose, outfit preview, and walk-in
- Voice provider keys and safety rules
- Video avatar provider keys and safety rules
- Entitlement middleware connected to Supabase customer identity

Recommended engine path: Three.js or Babylon.js with a VRM/GLB avatar, animation mixer, morph targets, and gated provider bridges for chat, voice, and video.

## Safety and Gates

The PWA must stay tasteful and brand-safe. It can support intimate styling, fashion, lounge, glam, swim, and private member experiences. It must not present explicit sexual services or unrestricted adult actions. Production payment, live video, real voice, public release, and entitlement changes remain gated until Jeremy approves the final runtime configuration.

## Validation

Run:

- `npm test`
- `npm run build`
- Browser screenshots for `/closet-v2` on desktop and mobile
- Manifest fetch: `/api/closet-v2/manifest`
