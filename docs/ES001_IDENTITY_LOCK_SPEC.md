# ES001 Identity Lock Specification

Status: approved and locked by operator
Phase: 3
Step: 36
Model ID: ES001
Model Name: Eden Skye
Canonical Asset: ES001-01
Shot Name: Close-Up Beauty Portrait
Usage Boundary: private_studio_only
Public Use Allowed: false

## Canonical Baseline

The approved ES001-01 image is the active identity baseline for Eden Skye. All future Eden Skye source images, videos, website assets, social assets, and manifest-driven generations must preserve this baseline unless the operator explicitly approves a new identity lock.

## Identity Anchors

- Adult female digital avatar subject.
- Dark brown wavy hair.
- Hazel-brown eyes.
- Mixed Asian and European facial influence.
- Warm luxury editorial expression.
- Natural realistic skin texture.
- Soft facial structure with consistent jawline, nose, lips, eye spacing, brow shape, and cheek proportions.
- Premium modern penthouse / soft luxury visual language.

## Consistency Rules

Every ES001 generation must preserve:

1. Face shape and facial proportions.
2. Eye spacing, eye color, and eye expression.
3. Brow shape and brow density.
4. Nose bridge and nose tip proportions.
5. Lip shape, lip fullness, and relaxed mouth expression.
6. Hair color, wave pattern, and general length.
7. Skin tone and realistic skin texture.
8. Adult presentation and platform-safe styling.
9. Luxury editorial realism.
10. Private-studio usage boundary unless separately approved.

## Drift Rejection Criteria

Reject or regenerate any asset with:

- Different ethnicity impression.
- Different eye color.
- Different hair color or hair silhouette.
- Uncanny, plastic, wax, or over-smoothed face.
- Distorted hands or body anatomy.
- Teen-coded or ambiguous-age styling.
- Celebrity likeness.
- Explicit nudity or unsafe platform-risk content.
- Public-use flag set true without approval.

## Canonical Filename

ESS_EDEN_SKYE_ES001_SHOT01_CLOSE_UP_BEAUTY_PORTRAIT_ULTRA_REAL_2026-06-11.png

## Drive Target

Folder: EDEN_SKYE_STUDIOS_OS
Folder ID: 1oCEjD6kUm9FiYDh1w-dNE9PPiggj65MQ

## Supabase Metadata Definition

model_id: ES001
model_name: Eden Skye
asset_id: ES001-01
shot_number: 1
shot_name: Close-Up Beauty Portrait
taxonomy_category: Portraits
source_image_role: identity_baseline
generation_role: canonical_reference
qa_status: approved
approval_status: approved_locked
usage_boundary: private_studio_only
public_use_allowed: false
drive_status: pending_upload_validation
github_status: identity_lock_spec_created
supabase_status: pending_record_after_upload_validation

## Future Generation Instruction

Use ES001-01 as the reference identity anchor for all 54 taxonomy shots. Create one standalone image per shot. Do not create contact sheets, collages, UI galleries, or bundled images for source assets. Each source image must be manifest-ready, private-studio-only, and approval-gated.

## Validation Gate

Do not merge executor changes to main until ES001-01 is successfully uploaded to Drive and records exist in media_assets, ai_execution_logs, and eden_tool_receipts.
