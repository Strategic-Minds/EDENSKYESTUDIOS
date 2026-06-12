# EDEN FULL SITE Route Generation Matrix

## Generation Groups

### Storefront Group

Routes: `/`, `/models`, `/models/[slug]`, `/pricing`, `/checkout`, `/payment`, `/success`, `/dashboard`, `/login`, `/media-vault`.

Source files:

- `app/visual-source-truth.ts`
- `docs/EDEN_EXACT_IMAGE_SOURCE_MANIFEST_2026-06-12.json`
- `docs/EDEN_BLACK_CARD_COMMERCE_GENERATION_CONTRACT.md`

### Closet Group

Routes: `/closet`, `/closet/[slug]`, `/closet/[slug]/viewer`, `/closet/[slug]/chat`, `/closet/[slug]/video`.

Source files:

- `docs/EDEN_CLOSET_AUTOGENERATION_CONTRACT.md`
- `app/visual-source-truth.ts`

### AI And Media Group

Routes: `/ai-chat`, `/ai-video`, `/messages`, `/media-vault`.

Source files:

- exact image source manifest
- HeyGen packet route
- Eden chat route
- protected gate docs

### PWA Group

Routes/files: `/pwa-app`, `public/manifest.webmanifest`, `public/sw.js`, `app/manifest.ts`.

Source files:

- PWA assets in exact image source manifest
- existing PWA registration route/component

### Admin Group

Routes: all `/admin` routes in `docs/EDEN_ADMIN_AUTOGENERATION_CONTRACT.md`.

Source files:

- black chat UI source map
- admin builder docs
- approval gates
- bridge registry

### API Group

Routes: admin APIs, Shopify draft/test APIs, entitlement sync, HeyGen packet, Eden chat, bridge queue worker.

Source files:

- `docs/EDEN_BLACK_CARD_COMMERCE_GENERATION_CONTRACT.md`
- approval gates
- bridge registry
- Supabase bridge queue

## Generator Receipt Fields

Every run must write:

- generator name
- branch
- timestamp
- input docs and hashes if available
- route groups generated
- files written
- files skipped and why
- protected actions blocked
- tests requested
- screenshot evidence target set

## Failure Conditions

- missing exact image manifest
- missing admin source map
- missing page registry
- missing Black Card commerce contract
- missing approval gates
- missing validation matrix
- any protected live action attempted without approval