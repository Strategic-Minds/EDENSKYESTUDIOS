# Eden Skye Studios Bootstrap

This folder is the source-controlled bootstrap layer for Eden Skye Studios: the Drive-backed avatar image vault, the GitHub repo manifest, and the controlled autonomous handoff for GPT, Higgins, HeyGen, and Auto Builder.

## Purpose

Create a clean operating base so Eden Skye Studios can generate images, avatar videos, social drafts, and media campaigns from governed source assets without drifting, losing face continuity, or bypassing approval gates.

## Source Of Truth

- Brand/control repo: `Strategic-Minds/EDENSKYESTUDIOS`
- Auto Builder orchestration repo: `Strategic-Minds/AUTO_BUILDER`
- Eden Skye Studios Drive root: https://drive.google.com/drive/folders/1Agdaq28Lha01ASVdpm1g_CS_x_aObRcT
- AUTO SOCIAL folder: https://drive.google.com/drive/folders/1jr4mrgdzvdywfY9j-QD4Ma2LurR9yLo9
- Avatar network folder: https://drive.google.com/drive/folders/19qdJPbuWdPxl9oU6KKYR-IWIoGRpHlhw
- F01 Eden Skye avatar source folder: https://drive.google.com/drive/folders/1q3JsMoHs_EKxn2NyMfX7-uSAE6QcBuJl

## Bootstrap Files

- `manifest.json`: canonical system manifest for repo, Drive, avatar network, and automation rules.
- `drive-index.md`: readable Drive folder map and validation notes.
- `avatar-stock-index.json`: structured avatar/persona/source-image registry.
- `gpt-higgins-heygen-handoff.md`: execution handoff for GPT, Higgins, and HeyGen.
- `automation-approval-matrix.json`: allowed, sandbox-first, and approval-required actions.
- `sync-receipt.md`: validation and sync receipt from the bootstrap pass.

## Media Architecture

Drive stores the binary image/video source assets.
Git stores manifests, IDs, automation contracts, prompts, approval gates, and receipts.
HeyGen consumes approved source images or trained avatar IDs after consent/training approval.
GPT and Higgins consume the manifests and indexes to select the right avatar, visual canon, and output path.
Auto Builder governs cross-system orchestration, validation, and promotion.

## Current State

Eden Skye is bootstrapped as the primary avatar persona with three discovered Drive image assets. The larger avatar network is indexed, but most non-Eden personas still need stock images, face-continuity packs, and media-readiness validation.

## Hard Rule

This bootstrap does not authorize production publishing, Shopify mutation, Vercel env edits, Supabase schema mutation, HeyGen avatar creation/training, or public content scheduling. Those require explicit current-session approval.
