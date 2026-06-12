# ES001 Runtime Capability Implementation Packets

Status: preview source truth
Phase: 3
Step: 49
Model ID: ES001
Model Name: Eden Skye
Identity Lock: ES001-01

## Purpose

This packet defines the governed implementation requirements for the missing autonomous runtime capabilities needed to move Eden Skye from source-truth ready to fully autonomous.

## Shared Governance

All workers must preserve:

- identity_lock: ES001-01
- usage_boundary: private_studio_only
- public_use_allowed: false
- approval_required: true
- production_merge: blocked until ES001-01 validation succeeds

All workers must write receipts and logs. Any destructive action, public publishing, payment, Shopify mutation, production migration, or bulk generation requires explicit operator approval.

---

# CAP-IMAGE-GENERATE-001

## Worker

WORKER-IMAGE-GENERATE-001

## Purpose

Generate one manifest-ready ES001 source image from a registry record and prompt-library record.

## Inputs

- asset_id
- manifest record
- ES001 identity lock
- prompt library entry
- negative prompt
- output filename
- taxonomy category

## Queue Integration

Reads from:

- ai_content_queue
- QUEUE-IMAGE-INSTALL-001

Allowed input status:

- pending_generation

Writes next status:

- generated_pending_qa

Failure statuses:

- failed_generation
- needs_operator_review

## Supabase Mapping

ai_content_queue:

- content_type: image_generation
- status: pending_generation or generated_pending_qa
- payload: registry, prompt, filename, identity_lock, usage_boundary

ai_execution_logs:

- event: image_generation
- action: generate_es001_asset
- status: success or failed
- details: asset_id, model_id, shot_number, prompt_ref, failure_reason

eden_tool_receipts:

- tool_name: image-generation-worker
- action_type: generate
- status: success or failed
- payload: asset_id, filename, generation_status

## Receipt Schema

{
  "receipt_type": "generation_receipt",
  "asset_id": "ES001-##",
  "worker": "WORKER-IMAGE-GENERATE-001",
  "status": "success_or_failed",
  "identity_lock": "ES001-01",
  "filename": "",
  "failure_reason": null
}

## Failure Handling

If generation fails, create failure receipt, write ai_execution_logs row, set status to failed_generation, and stop processing that asset.

## Rollback Behavior

No generated asset is deleted automatically. Failed outputs are quarantined for operator review.

## Activation Criteria

- ES001-01 upload validation succeeds.
- Prompt library exists.
- Registry exists.
- One test generation completes and enters QA without public exposure.

---

# CAP-IMAGE-QA-001

## Worker

WORKER-IMAGE-QA-001

## Purpose

Validate generated ES001 images before approval or installation.

## Inputs

- generated image
- manifest record
- ES001 identity lock
- QA checklist

## Queue Integration

Reads status:

- generated_pending_qa

Writes next status:

- qa_review
- approved_locked

Failure statuses:

- failed_qa_identity_drift
- failed_qa_anatomy
- failed_qa_compliance
- needs_operator_review

## QA Checks

- identity_matches_ES001_01
- eye_color_consistent
- hair_color_consistent
- face_shape_consistent
- skin_texture_realistic
- hands_and_anatomy_valid
- platform_safe
- private_studio_only
- filename_matches_manifest
- drive_destination_valid

## Supabase Mapping

approval_queue or ai_approval_queue:

- asset_id
- model_id
- stage: qa_review
- status: pending, approved_locked, or failed
- payload: QA checklist results

ai_execution_logs:

- event: image_qa
- action: qa_es001_asset
- status: success or failed

eden_tool_receipts:

- tool_name: image-qa-worker
- action_type: qa_review
- status: approved_locked or failed

## Receipt Schema

{
  "receipt_type": "qa_receipt",
  "asset_id": "ES001-##",
  "worker": "WORKER-IMAGE-QA-001",
  "identity_lock": "ES001-01",
  "qa_status": "approved_or_failed",
  "failed_checks": [],
  "approval_status": "pending_or_approved_locked"
}

## Failure Handling

Any identity drift, anatomy error, unsafe styling, or manifest mismatch blocks install and sends the asset to needs_operator_review.

## Rollback Behavior

QA failure prevents Drive upload. No public use. No manifest activation.

## Activation Criteria

- QA checklist exists.
- Operator approves QA criteria.
- One generated asset passes QA and remains private-studio-only.

---

# CAP-MANIFEST-UPDATE-001

## Worker

WORKER-MANIFEST-UPDATE-001

## Purpose

Update GitHub manifest records after Drive upload and Supabase registration.

## Inputs

- asset_id
- drive_file_id
- drive_url
- media_asset_id
- upload receipt
- manifest path

## Queue Integration

Reads status:

- drive_uploaded

Writes next status:

- manifest_updated
- canonical_available

Failure statuses:

- failed_manifest_update
- needs_operator_review

## GitHub Mapping

Updates:

- manifests/es001/ES001-##.json

Fields updated:

- drive_file_id
- drive_url
- media_asset_id
- drive_status
- github_status
- supabase_status
- receipt_status
- canonical_status

## Supabase Mapping

ai_execution_logs:

- event: manifest_update
- action: update_es001_manifest
- status: success or failed

eden_tool_receipts:

- tool_name: manifest-update-worker
- action_type: manifest_update
- status: success or failed

## Receipt Schema

{
  "receipt_type": "manifest_update_receipt",
  "asset_id": "ES001-##",
  "worker": "WORKER-MANIFEST-UPDATE-001",
  "github_manifest_path": "manifests/es001/ES001-##.json",
  "drive_file_id": "",
  "drive_url": "",
  "status": "success_or_failed"
}

## Failure Handling

If manifest update fails, do not mark canonical_available. Write failure receipt and block next queue step.

## Rollback Behavior

Rollback manifest to previous commit if incorrect Drive or Supabase metadata is written.

## Activation Criteria

- Drive upload executor validated.
- GitHub write permission verified.
- One ES001 manifest update succeeds in preview.

---

# CAP-RECEIPT-AUDIT-001

## Worker

WORKER-RECEIPT-AUDIT-001

## Purpose

Validate receipt chain integrity for every ES001 asset.

## Inputs

- asset_id
- ai_execution_logs rows
- eden_tool_receipts rows
- media_assets record
- GitHub manifest record

## Queue Integration

Runs after:

- generation
- QA
- Drive upload
- manifest update

Writes status:

- receipt_audit_pass
- receipt_audit_fail

Failure statuses:

- duplicate_receipt
- missing_receipt
- orphan_receipt
- broken_chain

## Audit Rules

1. No duplicate receipt IDs.
2. No orphan receipts.
3. Every upload has a media_assets row.
4. Every upload has an ai_execution_logs row.
5. Every upload has an eden_tool_receipts row.
6. Every canonical_available asset has a manifest record.
7. Every approved asset has a QA receipt.

## Supabase Mapping

ai_execution_logs:

- event: receipt_audit
- action: audit_es001_asset_receipts
- status: success or failed

eden_tool_receipts:

- tool_name: receipt-audit-worker
- action_type: receipt_audit
- status: success or failed

## Receipt Schema

{
  "receipt_type": "receipt_audit",
  "asset_id": "ES001-##",
  "worker": "WORKER-RECEIPT-AUDIT-001",
  "audit_status": "pass_or_fail",
  "missing_records": [],
  "duplicate_records": [],
  "orphan_records": []
}

## Failure Handling

Audit failure blocks canonical_available and requires operator review.

## Rollback Behavior

If a receipt chain is broken, freeze the asset state and prevent downstream website, video, or social use.

## Activation Criteria

- Upload executor validated.
- Manifest updater validated.
- One full ES001 asset lifecycle produces a clean receipt chain.

---

# Combined Activation Criteria

The autonomous loop is not active until:

1. ES001-01 upload is validated.
2. Drive file exists.
3. media_assets record exists.
4. ai_execution_logs record exists.
5. eden_tool_receipts record exists.
6. QA worker passes one controlled asset.
7. Manifest update succeeds in preview.
8. Receipt audit passes.
9. Cron behavior is verified.
10. Operator explicitly approves promotion.

# Governance Status

Preview only. Do not merge to main, run bulk generation, or activate production until all criteria are true.
