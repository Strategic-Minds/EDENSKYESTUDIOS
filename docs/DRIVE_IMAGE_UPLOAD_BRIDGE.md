# Drive Image Upload Bridge

Status: installed as governed notation and implementation handoff.
Date: 2026-06-11
Owner: Strategic Minds / Eden Skye Studios

## Purpose

This bridge exists because the current ChatGPT Google Drive connector can create and edit native Google Docs, Sheets, and Slides, but does not expose raw PNG/JPG upload for generated source images.

The required system capability is:

1. Accept an approved generated source image.
2. Upload the raw PNG/JPG bytes into the correct Google Drive folder.
3. Rename the file using the canonical manifest filename.
4. Link the Drive file ID and URL back to the canonical image manifest.
5. Queue matching GitHub and Supabase records.
6. Keep all assets private until explicit public-use approval.

## Canonical Example

- Model ID: ES001
- Model Name: Eden Skye
- Approved canonical source image: ES001 Shot 01
- Shot Name: Close-Up Beauty Portrait
- Intended filename: `ESS_EDEN_SKYE_ES001_SHOT01_CLOSE_UP_BEAUTY_PORTRAIT_ULTRA_REAL_2026-06-11.png`
- Intended folder: `V2 MASTER AUTO BUILDER / Eden Skye Studios / 00 Source Truth / ES001_reference_identity`

## Required Environment Variables

The runtime bridge expects these variables in the Vercel/Auto Builder environment:

- `GOOGLE_CLIENT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_DRIVE_ROOT_FOLDER_ID`
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY` or `AI_GATEWAY_API_KEY`
- `EDEN_RUNTIME_BRIDGE_TOKEN`

## Safe Upload Contract

Required metadata fields:

- `model_id`
- `asset_id`
- `shot_number`
- `shot_name`
- `filename`
- `target_folder_id`
- `mime_type`
- `source_image_role`
- `usage_boundary`
- `approval_status`
- `public_use_allowed`

## Governance

- Raw image upload is allowed only for private studio source assets or approved public assets.
- Public use stays false unless separately approved.
- Drive parent moves, sharing changes, deletes, and bulk destructive operations remain approval-gated.
- Supabase production migrations remain locked.
- Shopify mutation and public publishing remain locked.

## Automation Design

The bridge should support two routes when implemented in runtime code:

- `POST /api/bridge/drive-image-upload`
  - Upload a raw image file to Drive.
  - Attach Drive file ID and URL to manifest metadata.
  - Log a receipt.

- `POST /api/bridge/image-generation-install`
  - Generate or receive an approved image.
  - Validate manifest metadata.
  - Route image into Drive upload bridge.
  - Queue GitHub JSON manifest and Supabase record.

A 5-minute cron should inspect pending approved image-install jobs and process only safe private-studio assets.

## Current Verified State

- Canonical manifest workbook found: `Eden Skye Studios Image Library Workflow Integrated - 2026-06-05`.
- Manifest spreadsheet ID: `1XUZzOsCHbz6JEftYJy2RKiM3QizVn_TIJ915hQeV-q0`.
- ES001 was not found in the current Image Library Queue search.
- ES001 Shot 01 has operator approval and lock in chat context.
- Actual raw PNG still needs Drive upload through this bridge or manual upload.

## Completion Criteria

This bridge is complete only when:

1. Runtime code exists.
2. Vercel env variables are present.
3. A private test upload succeeds.
4. Drive file ID is returned.
5. Manifest row is updated or created.
6. GitHub JSON record is committed.
7. Supabase queue/asset record is inserted after schema verification.
8. Receipt is written.

Until then, this file is the durable notation and implementation contract for future GPT, Codex, and Auto Builder sessions.
