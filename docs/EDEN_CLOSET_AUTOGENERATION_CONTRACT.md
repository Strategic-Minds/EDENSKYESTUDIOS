# EDEN CLOSET Autogeneration Contract

## Purpose

Eden's Closet must be generated as a complete interactive vertical inside the Eden Skye site, not as a placeholder page.

## Required Routes

- `/closet`
- `/closet/[slug]`
- `/closet/[slug]/viewer`
- `/closet/[slug]/chat`
- `/closet/[slug]/video`

## Required Source Assets

- `closetFullBody`: full-body Alexis black look model asset.
- `environmentModernBedroom`
- `environmentWalkInCloset`
- `environmentPenthouseLivingRoom`
- `environmentBeachVilla`
- `environmentLuxuryHotelSuite`
- `environmentRooftopTerrace`
- `environmentPhotoStudio`

All assets must come from `docs/EDEN_EXACT_IMAGE_SOURCE_MANIFEST_2026-06-12.json` and `app/visual-source-truth.ts`.

## Closet Home

Generate a dark wardrobe-access hero with:

- locked full-body model asset
- Black Card access CTA
- wardrobe, favorites, model viewer, and environment entry points
- no collage crops
- no beige/generic styling

## Outfit Selector

Generate an outfit selector with:

- center full-body model viewer
- categories: Featured, Dresses, Lingerie, Swim, Lounge, Night Out, VIP Looks
- favorites control
- outfit detail panel
- access state tied to Black Card entitlement fixture or real entitlement state when available

## Environment Selector

Generate room/environment selector with:

- bedroom
- walk-in closet
- penthouse
- beach villa
- luxury hotel
- rooftop
- photo studio

## Full Experience Viewer

Generate viewer controls:

- zoom
- angle
- speed
- background color
- mode controls
- outfit/environment state
- reset control
- favorite control

## Measurements / Details

Generate details page/panel with:

- model stats
- fit notes
- outfit metadata
- locked asset provenance
- membership gate note

## AI Chat / Video

Closet chat/video routes must remain draft-only and use packet generation, not live external video/chat mutation unless approved.

## Validation

Fail generation if:

- closet pages use reference boards or collage crops
- locked closet/environment assets are missing
- Black Card access gate is absent
- viewer controls are missing
- screenshots are not captured for `/closet`, `/closet/[slug]`, and `/closet/[slug]/viewer`