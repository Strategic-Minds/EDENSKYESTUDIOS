# ES001 Manifest Generation Package

Status: preview source truth
Phase: 3
Step: 41
Model ID: ES001
Model Name: Eden Skye
Identity Lock: ES001-01
Registry: docs/ES001_TAXONOMY_ASSET_REGISTRY_SHOTS_02_54.json
Prompt Library: docs/ES001_PROMPT_LIBRARY_SHOTS_02_54.md
Supabase Plan: docs/ES001_SUPABASE_SEED_AND_AUTOMATION_PLAN.md

## Purpose

This package defines how to generate individual manifest JSON records, queue seed records, receipt records, approval records, and executor promotion criteria for ES001 shots 02 through 54.

## Manifest File Path Pattern

manifests/es001/ES001-##.json

## Individual Manifest JSON Template

{
  "asset_id": "ES001-##",
  "model_id": "ES001",
  "model_name": "Eden Skye",
  "identity_lock": "ES001-01",
  "shot_number": 0,
  "shot_name": "",
  "taxonomy_category": "",
  "filename": "ESS_EDEN_SKYE_ES001_SHOT##_SHOT_NAME_ULTRA_REAL_2026-06-11.png",
  "drive_root_folder_id": "1oCEjD6kUm9FiYDh1w-dNE9PPiggj65MQ",
  "drive_destination": "EDEN_SKYE_STUDIOS_OS/01_ES001_Source_Images/CATEGORY",
  "drive_file_id": null,
  "drive_url": null,
  "github_manifest_path": "manifests/es001/ES001-##.json",
  "prompt_library_ref": "docs/ES001_PROMPT_LIBRARY_SHOTS_02_54.md",
  "source_image_role": "taxonomy_source_asset",
  "generation_role": "canonical_generation_asset",
  "usage_boundary": "private_studio_only",
  "public_use_allowed": false,
  "generation_status": "pending_generation",
  "qa_status": "pending",
  "approval_status": "pending",
  "drive_status": "pending_upload",
  "github_status": "pending_manifest_update",
  "supabase_status": "pending_record",
  "receipt_status": "pending",
  "created_by": "AUTO_BUILDER_OS",
  "approval_required": true
}

## Queue Seed Record Template

{
  "queue_id": "QUEUE-IMAGE-INSTALL-001",
  "drive_queue_id": "QUEUE-DRIVE-UPLOAD-001",
  "capability_id": "CAP-IMAGE-INSTALL-001",
  "asset_id": "ES001-##",
  "model_id": "ES001",
  "identity_lock": "ES001-01",
  "status": "pending_generation",
  "priority": "normal",
  "approval_gate": "required",
  "payload": {
    "manifest_path": "manifests/es001/ES001-##.json",
    "registry_ref": "docs/ES001_TAXONOMY_ASSET_REGISTRY_SHOTS_02_54.json",
    "prompt_library_ref": "docs/ES001_PROMPT_LIBRARY_SHOTS_02_54.md",
    "usage_boundary": "private_studio_only",
    "public_use_allowed": false
  }
}

## Receipt Schema Definition

{
  "receipt_id": "ES001-##-RECEIPT-TIMESTAMP",
  "asset_id": "ES001-##",
  "tool_name": "eden-image-install-workflow",
  "action_type": "generation_or_upload_or_manifest_update",
  "status": "pending_or_success_or_failed",
  "payload": {
    "model_id": "ES001",
    "identity_lock": "ES001-01",
    "shot_number": 0,
    "shot_name": "",
    "drive_file_id": null,
    "drive_url": null,
    "github_manifest_path": "manifests/es001/ES001-##.json",
    "qa_status": "pending",
    "approval_status": "pending",
    "failure_reason": null
  }
}

## Approval Workflow Record Template

{
  "asset_id": "ES001-##",
  "approval_stage": "qa_review",
  "required_checks": [
    "identity_matches_ES001_01",
    "eye_color_consistent",
    "hair_color_consistent",
    "face_shape_consistent",
    "skin_texture_realistic",
    "hands_and_anatomy_valid",
    "platform_safe",
    "private_studio_only",
    "filename_matches_manifest",
    "drive_destination_valid"
  ],
  "approval_status": "pending",
  "approved_by": null,
  "approved_at": null,
  "public_use_allowed": false
}

## Executor Promotion Criteria

The Drive upload executor may be promoted from preview to main only after all criteria below are verified:

1. ES001-01 upload succeeds through the executor.
2. The image appears in EDEN_SKYE_STUDIOS_OS.
3. media_assets contains a matching ES001-01 record.
4. ai_execution_logs contains a successful upload_es001_asset record.
5. eden_tool_receipts contains a successful drive-image-upload receipt.
6. No public sharing is enabled by default.
7. public_use_allowed remains false.
8. Rollback path is documented.
9. Operator explicitly approves merge.

## Activation Readiness States

not_ready:
  - ES001-01 upload not validated

preview_ready:
  - executor deployed on preview branch
  - registry installed
  - prompt library installed
  - manifest generation package installed

merge_ready:
  - ES001-01 upload validated
  - Supabase records verified
  - Drive file verified
  - operator approval received

bulk_ready:
  - merge complete
  - queue processor verified
  - QA flow verified
  - rollback tested

## Governance

Do not generate all 53 remaining images automatically until ES001-01 upload validation succeeds. Do not publish any asset. Do not enable public use. Do not merge executor changes without operator approval.
