# ES001 Runtime Worker Route Specifications

Status: preview source truth
Phase: 3
Step: 51
Model ID: ES001
Model Name: Eden Skye
Identity Lock: ES001-01

## Global Rules

All routes are preview-only until ES001-01 upload validation succeeds.

All routes must enforce:

- identity_lock = ES001-01
- usage_boundary = private_studio_only
- public_use_allowed = false
- approval gate required before upload or activation
- receipt created for success and failure
- execution log created for success and failure

No route may publish, sell, expose publicly, mutate Shopify, spend money, or run destructive operations.

---

# WORKER-IMAGE-GENERATE-001

## Capability

CAP-IMAGE-GENERATE-001

## Route

POST /api/workers/es001/image-generate

## Purpose

Generate one ES001 source image from the registry and prompt library.

## Request Schema

{
  "assetId": "ES001-##",
  "modelId": "ES001",
  "identityLock": "ES001-01",
  "shotNumber": 0,
  "shotName": "",
  "promptRef": "docs/ES001_PROMPT_LIBRARY_SHOTS_02_54.md",
  "manifestPath": "manifests/es001/ES001-##.json",
  "outputFilename": "",
  "usageBoundary": "private_studio_only",
  "publicUseAllowed": false
}

## Response Schema

{
  "status": "generated_pending_qa",
  "assetId": "ES001-##",
  "outputFilename": "",
  "receiptId": "",
  "nextQueue": "WORKER-IMAGE-QA-001"
}

## Supabase Writes

ai_execution_logs:
- event: image_generation
- action: generate_es001_asset
- status: success or failed

eden_tool_receipts:
- tool_name: image-generation-worker
- action_type: generate
- status: success or failed

ai_content_queue:
- status: generated_pending_qa or failed_generation

## Failure Handling

Failure creates failed_generation receipt and moves asset to needs_operator_review.

---

# WORKER-IMAGE-QA-001

## Capability

CAP-IMAGE-QA-001

## Route

POST /api/workers/es001/image-qa

## Purpose

Validate generated image before approval or installation.

## Request Schema

{
  "assetId": "ES001-##",
  "modelId": "ES001",
  "identityLock": "ES001-01",
  "imageLocation": "",
  "manifestPath": "manifests/es001/ES001-##.json",
  "qaChecklist": [
    "identity_matches_ES001_01",
    "eye_color_consistent",
    "hair_color_consistent",
    "face_shape_consistent",
    "skin_texture_realistic",
    "hands_and_anatomy_valid",
    "platform_safe",
    "private_studio_only",
    "filename_matches_manifest"
  ]
}

## Response Schema

{
  "status": "approved_locked_or_failed",
  "assetId": "ES001-##",
  "passedChecks": [],
  "failedChecks": [],
  "receiptId": "",
  "nextQueue": "QUEUE-DRIVE-UPLOAD-001"
}

## Supabase Writes

approval_queue or ai_approval_queue:
- asset_id
- stage: qa_review
- status: approved_locked or failed

ai_execution_logs:
- event: image_qa
- action: qa_es001_asset
- status: success or failed

eden_tool_receipts:
- tool_name: image-qa-worker
- action_type: qa_review
- status: approved_locked or failed

## Failure Handling

Any failed identity, anatomy, compliance, or manifest check blocks Drive upload.

---

# WORKER-MANIFEST-UPDATE-001

## Capability

CAP-MANIFEST-UPDATE-001

## Route

POST /api/workers/es001/manifest-update

## Purpose

Update GitHub manifest after Drive upload and Supabase record creation.

## Request Schema

{
  "assetId": "ES001-##",
  "modelId": "ES001",
  "identityLock": "ES001-01",
  "manifestPath": "manifests/es001/ES001-##.json",
  "driveFileId": "",
  "driveUrl": "",
  "mediaAssetId": "",
  "uploadReceiptId": ""
}

## Response Schema

{
  "status": "manifest_updated",
  "assetId": "ES001-##",
  "manifestPath": "manifests/es001/ES001-##.json",
  "receiptId": "",
  "nextQueue": "WORKER-RECEIPT-AUDIT-001"
}

## Supabase Writes

ai_execution_logs:
- event: manifest_update
- action: update_es001_manifest
- status: success or failed

eden_tool_receipts:
- tool_name: manifest-update-worker
- action_type: manifest_update
- status: success or failed

## GitHub Writes

Update manifest file with:
- drive_file_id
- drive_url
- media_asset_id
- drive_status = drive_uploaded
- github_status = manifest_updated
- supabase_status = record_created

## Failure Handling

Failure blocks canonical_available and creates failed_manifest_update receipt.

---

# WORKER-RECEIPT-AUDIT-001

## Capability

CAP-RECEIPT-AUDIT-001

## Route

POST /api/workers/es001/receipt-audit

## Purpose

Audit receipt chain integrity before canonical availability.

## Request Schema

{
  "assetId": "ES001-##",
  "modelId": "ES001",
  "identityLock": "ES001-01",
  "manifestPath": "manifests/es001/ES001-##.json",
  "requiredReceipts": [
    "generation_receipt",
    "qa_receipt",
    "drive_upload_receipt",
    "manifest_update_receipt"
  ]
}

## Response Schema

{
  "status": "receipt_audit_pass_or_fail",
  "assetId": "ES001-##",
  "missingReceipts": [],
  "duplicateReceipts": [],
  "orphanReceipts": [],
  "receiptId": "",
  "canonicalAvailable": false
}

## Supabase Writes

ai_execution_logs:
- event: receipt_audit
- action: audit_es001_asset_receipts
- status: success or failed

eden_tool_receipts:
- tool_name: receipt-audit-worker
- action_type: receipt_audit
- status: success or failed

## Failure Handling

Audit failure freezes the asset and prevents downstream website, video, social, or public use.

---

# Preview Deployment Requirements

Before implementation:

1. ES001-01 upload executor validation must succeed.
2. All worker routes must deploy to preview first.
3. One non-public controlled asset must pass each worker.
4. No production merge without operator approval.
