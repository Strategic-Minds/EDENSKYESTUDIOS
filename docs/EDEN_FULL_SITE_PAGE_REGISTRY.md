# EDEN FULL SITE Page Registry

## Public Website Routes

| Route | Required Status | Generator Responsibility |
|---|---:|---|
| `/` | required | Black/neon Eden Skye hero using locked home hero asset, no generic landing page. |
| `/models` | required | Real model grid using locked standalone model assets. |
| `/models/[slug]` | required | Alexis Voss-style profile with gallery, stats, work-with-model panel, video/AI CTA, Black Card CTA. |
| `/pricing` | required | Four plans with Black Card highlighted. |
| `/checkout` | required | Draft-safe Shopify bridge checkout layout. No live activation by default. |
| `/payment` | required | Test-mode payment bridge status and approval-gated live payment warning. |
| `/success` | required | Test-mode post-checkout entitlement confirmation. Must not hardcode live entitlement. |
| `/dashboard` | required | Member dashboard with Black Card state from entitlement source or draft fixture. |
| `/media-vault` | optional | Premium media vault placeholder gated by membership state. |
| `/login` | optional | Auth/draft login surface. |

## Eden's Closet Routes

| Route | Required Status | Generator Responsibility |
|---|---:|---|
| `/closet` | required | Dark closet hero with wardrobe access and locked closet asset. |
| `/closet/[slug]` | required | Outfit selector with full-body model viewer, categories, favorites, controls. |
| `/closet/[slug]/viewer` | required | Full experience viewer with zoom, angle, speed, background color, mode controls. |
| `/closet/[slug]/chat` | required | Closet AI chat surface. |
| `/closet/[slug]/video` | required | Closet video/HeyGen surface. |

## AI And Messaging Routes

| Route | Required Status | Generator Responsibility |
|---|---:|---|
| `/ai-chat` | required | AI Chat page with locked AI chat portrait. |
| `/ai-video` | required | AI Video Chat / HeyGen page with locked AI video still. |
| `/messages` | required | Member messages surface with draft-only actions. |

## Mobile PWA Routes

| Route | Required Status | Generator Responsibility |
|---|---:|---|
| `/pwa-app` | required | Mobile PWA home/navigation using locked PWA assets. |
| `/manifest.webmanifest` | required | PWA manifest. |
| `/sw.js` | required | Service worker. |

## EDEN SKYE ADMIN Routes

The generator must preserve and regenerate these routes:

- `/admin`
- `/admin/eden`
- `/admin/agent-console`
- `/admin/bridge`
- `/admin/builders`
- `/admin/git-vercel`
- `/admin/supabase`
- `/admin/drive`
- `/admin/gmail-calendar`
- `/admin/media`
- `/admin/social`
- `/admin/gates`
- `/admin/workflows`
- `/admin/receipts`
- `/admin/evidence`
- `/admin/images`
- `/admin/models`
- `/admin/quarantine`
- `/admin/exceptions`

## API Routes

The generator must preserve and regenerate:

- `/api/admin/eden/readiness`
- `/api/admin/eden/bridge-registry`
- `/api/admin/eden/approval-gates`
- `/api/admin/eden/evidence`
- `/api/admin/eden/command-queue`
- `/api/admin/eden/builder-docs`
- `/api/shopify/webhook` in test/draft mode only
- `/api/entitlements/sync` in test/draft mode only
- `/api/heygen/packet`
- `/api/eden/chat`

## Visual Rule

Every generated visual page must declare the exact asset keys it uses from `docs/EDEN_EXACT_IMAGE_SOURCE_MANIFEST_2026-06-12.json` or mark the required asset as `MISSING_ASSET`.