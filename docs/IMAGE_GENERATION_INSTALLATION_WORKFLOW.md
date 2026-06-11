# Image Generation Installation Workflow

Status: persistent notation installed.
Date: 2026-06-11
Owner: Strategic Minds / Eden Skye Studios

## Purpose

This file defines the approved automation path for Eden Skye image generation, approval review, Google Drive installation, manifest linkage, GitHub record creation, and Supabase notation.

## Canonical Flow

1. Select a canonical manifest row.
2. Generate one standalone source image.
3. Operator approves and locks the image.
4. Drive Image Upload Bridge installs the raw PNG or JPG into the correct private Drive folder.
5. Manifest row is updated with Drive file ID, Drive URL, QA status, and approval state.
6. GitHub JSON manifest record is created or updated.
7. Supabase queue or asset record is inserted after table verification.
8. The image becomes available for future image, video, website, and social workflows within its usage boundary.

## Bridge Surfaces To Implement

- POST /api/bridge/drive-image-upload
- POST /api/bridge/image-generation-install
- GET /api/bridge/image-generation-install
- GET /api/cron/eden-image-install

## ES001 Canonical Baseline

- Model ID: ES001
- Model Name: Eden Skye
- First approved source image: ES001 Shot 01, Close-Up Beauty Portrait
- Role: canonical identity baseline and future generation reference

## Safety Locks

- No public publishing without explicit approval.
- No Shopify mutation.
- No production deploy.
- No Supabase migration.
- No unverified service-role write.
- No Drive sharing, delete, or destructive move.

## Completion Criteria

This workflow is complete only after a private end-to-end test proves image approval, Drive installation, manifest update, GitHub record creation, Supabase notation, and receipt creation.
