# Eden Drive Vault + HeyGen Content Workflow

This document defines the governed media pipeline for Eden's Closet and Eden Skye Studios.

## Verdict

Use Google Drive as the permanent production vault and review system. Use HeyGen as the avatar/video generation layer. Use the app, Supabase, Shopify CDN, or another public media host for assets that must render inside the public-facing app.

Drive is the archive and approval source of truth. It is not the best app CDN unless files are explicitly shared or proxied, because Drive permissions can block image/video rendering.

## Current Grounded Assets

- Drive contains Eden Skye operating files, including `ESS ASSET MANIFEST`, model roster documents, and brand source-of-truth files.
- HeyGen contains private Eden/Jeremy avatar inventory.
- A completed private Eden Skye photo avatar look is available for draft avatar videos.
- Public publishing remains locked until approval.
- Live HeyGen sessions remain locked until approval.

## Media Storage Roles

| Layer | Purpose | Approval State |
| --- | --- | --- |
| Google Drive | Master vault for generated images, scripts, videos, thumbnails, manifests, review docs, and receipts | Safe for drafts |
| Supabase | Structured records for model profiles, media assets, approvals, social drafts, and receipt logs | Test branch first |
| Shopify CDN | Stable public image hosting for storefront/app visuals when approved | Approval required before mutation |
| HeyGen | Avatar video drafts, voice-led intros, model explainers, approval briefings | Drafts allowed, live sessions gated |
| Metricool/Klaviyo | Scheduling and lifecycle handoff | Draft only until approval |

## Required App Objects

### media_assets

Tracks every generated image, video, voice, and thumbnail.

Recommended fields:

- id
- model_id
- asset_type: image, video, audio, thumbnail, script
- title
- drive_url
- public_url
- source_tool: Runway, HeyGen, Canva, Adobe, Upload
- approval_status: draft, pending_review, approved, rejected, archived
- black_card_visibility
- created_by_agent
- created_at
- updated_at

### heygen_drafts

Tracks avatar content drafts before release.

Recommended fields:

- id
- heygen_video_id
- model_id
- avatar_id
- voice_id
- script
- status: waiting, processing, completed, failed
- video_url
- thumbnail_url
- subtitle_url
- drive_url
- approval_status
- recommended_action
- created_at

### approval_requests

Every asset needing Jeremy's decision becomes an approval card.

Recommended fields:

- id
- request_type: image, video, voice, caption, product, schedule, live_session
- asset_id
- preview_url
- recommendation
- risk_level: good, caution, stop
- action_required
- decision
- decided_at

## Eden's Closet UI Additions

Add two visible admin lanes:

1. Drive Vault
   - shows asset manifest link
   - shows model image/video count
   - shows which assets are archived vs public-ready
   - flags assets missing permanent display URLs

2. HeyGen Draft Studio
   - shows available Eden avatar looks
   - shows generated video drafts
   - shows processing/completed/failed status
   - previews video, thumbnail, subtitle, and script
   - routes completed drafts into approval theater

## Governed Workflow

1. Generate or upload media.
2. Save source asset into Drive vault or asset manifest.
3. Create or update Supabase media record.
4. If public app display is needed, copy approved asset to a stable host.
5. Create approval request with image/video/audio preview.
6. Eden recommends approve, revise, or reject.
7. Jeremy approves.
8. Approved assets can move to Shopify, Metricool, Klaviyo, or public release.

## HeyGen Draft Workflow

1. Select avatar look.
2. Generate script from Eden's brand voice.
3. Create private HeyGen draft video.
4. Poll HeyGen until completed.
5. Store returned video URL and thumbnail URL.
6. Add it to Drive/Supabase asset record.
7. Show the video inside Eden's Closet approval theater.
8. Keep publishing locked until Jeremy approves.

## Current Test Draft

A private HeyGen draft was started for:

- Title: `Eden's Closet Black Card Intro - Draft 01`
- HeyGen video id: `f2abdcd817aa4356946153405b549225`
- Status at creation: `processing`
- Purpose: private Black Card intro/approval-flow explainer

## Safety Locks

The following remain approval-gated:

- public publishing
- live HeyGen avatar sessions
- Shopify mutations
- payment/subscription changes
- Klaviyo sends
- Supabase production migrations
- production deploy promotion

## Next Build Step

Wire the app to show:

- Drive Vault card
- HeyGen Draft Studio card
- pending HeyGen video status
- asset manifest link
- missing public URL warnings
- approval buttons for completed videos
