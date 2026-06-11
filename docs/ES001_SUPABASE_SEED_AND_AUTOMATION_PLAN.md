# ES001 Supabase Seed and Automation Plan

Status: preview source truth
Phase: 3
Step: 40
Model ID: ES001
Model Name: Eden Skye
Identity Lock: ES001-01
Registry: docs/ES001_TAXONOMY_ASSET_REGISTRY_SHOTS_02_54.json

## Purpose

This packet defines how ES001 assets are registered, installed, validated, and tracked from generation through approval and Drive installation.

## Supabase Target Tables

Verified usable tables:

- media_assets
- ai_execution_logs
- eden_tool_receipts
- ai_content_queue
- ai_work_queue
- queue_jobs
- eden_bridge_queue
- approval_queue
- ai_approval_queue

## Seed Strategy

No production migration is required for the first implementation. Use existing tables.

Seed pending records only after operator approval or through a dry-run staging packet. Do not mark any generated image as approved until QA completes.

## media_assets Seed Shape

asset_type: image
title: ES001-## Shot Name
storage_url: pending_drive_upload
source_tool: eden-image-generation-registry
usage_rights: private_studio_only
metadata:
  model_id: ES001
  model_name: Eden Skye
  asset_id: ES001-##
  shot_number: ##
  shot_name: Shot Name
  taxonomy_category: Category
  identity_lock: ES001-01
  filename: canonical filename
  drive_destination: registry drive destination
  github_manifest_path: manifests/es001/ES001-##.json
  generation_status: pending_generation
  drive_status: pending_upload
  github_status: pending_manifest_update
  supabase_status: pending_record
  qa_status: pending
  approval_status: pending
  public_use_allowed: false

## ai_content_queue Seed Shape

content_type: image_generation
status: pending_generation
payload:
  capability_id: CAP-IMAGE-INSTALL-001
  queue_id: QUEUE-IMAGE-INSTALL-001
  drive_queue_id: QUEUE-DRIVE-UPLOAD-001
  model_id: ES001
  asset_id: ES001-##
  identity_lock: ES001-01
  prompt_library: docs/ES001_PROMPT_LIBRARY_SHOTS_02_54.md
  registry: docs/ES001_TAXONOMY_ASSET_REGISTRY_SHOTS_02_54.json

## Queue Lifecycle

pending_generation
  -> generated_pending_qa
  -> qa_review
  -> approved_locked
  -> pending_drive_upload
  -> drive_uploaded
  -> manifest_updated
  -> supabase_record_created
  -> canonical_available

Failure states:

failed_generation
failed_qa_identity_drift
failed_drive_upload
failed_manifest_update
failed_supabase_write
needs_operator_review

## Manifest JSON Template

{
  "asset_id": "ES001-##",
  "model_id": "ES001",
  "model_name": "Eden Skye",
  "identity_lock": "ES001-01",
  "shot_number": 0,
  "shot_name": "",
  "taxonomy_category": "",
  "filename": "",
  "drive_destination": "",
  "drive_file_id": null,
  "drive_url": null,
  "github_manifest_path": "manifests/es001/ES001-##.json",
  "source_image_role": "taxonomy_source_asset",
  "generation_role": "canonical_generation_asset",
  "usage_boundary": "private_studio_only",
  "public_use_allowed": false,
  "qa_status": "pending",
  "approval_status": "pending",
  "generation_status": "pending_generation",
  "drive_status": "pending_upload",
  "github_status": "pending_manifest_update",
  "supabase_status": "pending_record"
}

## Drive Folder Provisioning Specification

Root:
EDEN_SKYE_STUDIOS_OS
ID:
1oCEjD6kUm9FiYDh1w-dNE9PPiggj65MQ

Required folders under root:

01_ES001_Source_Images
01_ES001_Source_Images/Portraits
01_ES001_Source_Images/Full_Body
01_ES001_Source_Images/Seated
01_ES001_Source_Images/Lifestyle
01_ES001_Source_Images/Website_Social
01_ES001_Source_Images/Creative
01_ES001_Source_Images/Brand_Assets
01_ES001_Source_Images/Continuity
01_ES001_Source_Images/Hero_Final
02_ES001_Manifest_Records
03_ES001_QA_Receipts
04_ES001_Approval_Receipts
05_ES001_Generation_Outputs
06_ES001_Video_Inputs

## Vercel Workflow Plan

Name: eden-es001-image-install-workflow
Schedule: every 5 minutes
Route: /api/cron/eden-image-install
Mode: preview until ES001-01 upload validation succeeds

Steps:

1. Read pending records from registry or queue.
2. Process only approved_locked records.
3. Validate identity_lock equals ES001-01.
4. Validate public_use_allowed is false.
5. Send image payload to /api/bridge/drive-image-upload.
6. Write media_assets record.
7. Write ai_execution_logs record.
8. Write eden_tool_receipts record.
9. Update manifest JSON path.
10. Stop on any failed upload and mark needs_operator_review.

## Validation Queries

media_assets:
select id, title, storage_url, source_tool, usage_rights, created_at from media_assets where title ilike '%ES001%' order by created_at desc;

ai_execution_logs:
select id, event, status, action, created_at from ai_execution_logs where action = 'upload_es001_asset' order by created_at desc;

eden_tool_receipts:
select id, receipt_id, tool_name, action_type, status, created_at from eden_tool_receipts where tool_name = 'drive-image-upload' order by created_at desc;

## Governance

Do not run production migrations from this packet. Do not publish. Do not enable bulk generation until ES001-01 upload validation succeeds. All generated images remain private studio source assets until approved separately.
