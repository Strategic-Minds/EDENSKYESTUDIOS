# Eden's Closet Generator Build Spec

## Purpose

Build Eden's Closet as a production-grade Next.js PWA from standalone page design images. The generator must use each page image as a separate route-level design target, not as a collage.

## Absolute Source Rule

Do not render, crop, or embed any collage board as the app UI.

Do not use a page screenshot as a model/source asset.

Use page images only as visual references for layout, spacing, typography, color, hierarchy, and page structure. Build the real app as HTML/CSS/React components with separate source assets for models, environments, wardrobe, chat, video, and dashboard content.

## Recommended Framework

Use Next.js App Router on Vercel.

Why:

- Current Eden Skye app is already Next.js/Vercel.
- PWA support fits the existing manifest/service worker path.
- Shopify can remain the storefront/payment layer and route paid users into Vercel.
- Supabase auth and Black Card entitlement checks can run in middleware/server routes.
- AI chat, voice, video, and future 3D can be integrated behind gated API routes.

Use Shopify Liquid only for storefront/payment pages. Do not build the full Eden's Closet member app in Shopify Liquid.

## 3D / Near-Human Layer

Phase 1: Build exact visual PWA pages from the approved page images.

Phase 2: Add interactive frame-based 360 viewer using approved standalone full-body angle assets.

Phase 3: Add true 3D avatar engine using one of:

- Three.js + React Three Fiber + VRM/GLB avatar
- Babylon.js + rigged GLB avatar

Required before Phase 3:

- approved rigged model file
- animation clips
- outfit meshes or approved texture sets
- safety rules for live chat/voice/video
- Supabase entitlement enforcement

## Required Routes

- `/closet-v2`
- `/closet-v2/models`
- `/closet-v2/models/alexis-voss`
- `/closet-v2/closet`
- `/closet-v2/environments`
- `/closet-v2/viewer`
- `/closet-v2/chat`
- `/closet-v2/video`
- `/closet-v2/dashboard`

## User Flow

Shopify storefront sells Black Card. Successful checkout routes to `/success?next=/closet-v2`. Supabase validates session and `black_card_member`. Member enters Eden's Closet and moves through model selection, profile, closet, environment, viewer, AI chat, video, and dashboard.
