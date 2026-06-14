# Eden's Closet Next.js Implementation Packet

## Build Target

Create the real Eden's Closet PWA in Next.js App Router using the approved standalone page images as route-level design references.

## Folder Structure

```text
app/closet-v2/page.tsx
app/closet-v2/models/page.tsx
app/closet-v2/models/[slug]/page.tsx
app/closet-v2/closet/page.tsx
app/closet-v2/environments/page.tsx
app/closet-v2/viewer/page.tsx
app/closet-v2/chat/page.tsx
app/closet-v2/video/page.tsx
app/closet-v2/dashboard/page.tsx
app/closet-v2/_components/ClosetShell.tsx
app/closet-v2/_components/ModelCard.tsx
app/closet-v2/_components/ViewerStage.tsx
app/closet-v2/_components/EntitlementGate.tsx
app/closet-v2/closet-v2.css
config/eden-closet-ai-designed-page-mockups.json
config/eden-closet-generator-page-assets.json
```

## Data Contracts

Create data modules for models, outfits, environments, 360 frames, AI chat modes, member dashboard activity, and Black Card entitlement state.

## Auth And Entitlement

Use Supabase auth/session. Gate member routes by `black_card_member`. Public preview may show locked state, but must not claim real unlocked access until entitlement is confirmed.

## Shopify Handoff

Shopify checkout success should route to `/success?next=/closet-v2`.

## Tests

Add tests that fail when any required route is missing, internal admin language appears, a generator uses a collage/page screenshot as a model asset, manifests are missing, live provider activation is true by default, or Black Card entitlement is not required.

## Visual Validation

Capture screenshots for desktop 1440x900 and mobile 390x844 for each route. Compare each screenshot against the corresponding standalone page image.
