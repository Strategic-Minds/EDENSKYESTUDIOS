# ES001 Queue State Machine and Runtime Activation Sequence

Status: preview source truth
Phase: 3
Step: 53
Model ID: ES001
Model Name: Eden Skye
Identity Lock: ES001-01

## Purpose

This document defines how ES001 assets move from generation through QA, approval, Drive installation, manifest update, receipt audit, and canonical availability.

## Required Source Truth

- docs/ES001_IDENTITY_LOCK_SPEC.md
- docs/ES001_PROMPT_LIBRARY_SHOTS_02_54.md
- docs/ES001_TAXONOMY_ASSET_REGISTRY_SHOTS_02_54.json
- manifests/es001/ES001_MANIFEST_FILE_PACKAGE_02_54.json
- docs/ES001_RUNTIME_WORKER_ROUTE_SPECS.md
- supabase/seeds/es001_autonomous_image_pipeline_seed.sql

## Queue State Machine

pending_generation
  -> generated_pending_qa
  -> qa_review
  -> approved_locked
  -> pending_drive_upload
  -> drive_uploaded
  -> manifest_updated
  -> receipt_audit_pass
  -> canonical_available

## Failure State Machine

failed_generation
  -> needs_operator_review

failed_qa_identity_drift
  -> needs_operator_review

failed_qa_anatomy
  -> needs_operator_review

failed_qa_compliance
  -> needs_operator_review

failed_drive_upload
  -> needs_operator_review

failed_manifest_update
  -> needs_operator_review

duplicate_receipt
  -> needs_operator_review

missing_receipt
  -> needs_operator_review

orphan_receipt
  -> needs_operator_review

broken_chain
  -> needs_operator_review

## Worker Deployment Packet

### Worker 1

Name: WORKER-IMAGE-GENERATE-001
Route: /api/workers/es001/image-generate
Capability: CAP-IMAGE-GENERATE-001
Reads: pending_generation
Writes: generated_pending_qa or failed_generation
Required receipt: generation_receipt
Required log: ai_execution_logs.event = image_generation

### Worker 2

Name: WORKER-IMAGE-QA-001
Route: /api/workers/es001/image-qa
Capability: CAP-IMAGE-QA-001
Reads: generated_pending_qa
Writes: qa_review, approved_locked, or failed_qa_*
Required receipt: qa_receipt
Required log: ai_execution_logs.event = image_qa

### Worker 3

Name: Drive Upload Executor
Route: /api/bridge/drive-image-upload
Capability: CAP-DRIVE-UPLOAD-001
Reads: approved_locked
Writes: drive_uploaded or failed_drive_upload
Required receipt: drive_upload_receipt
Required log: ai_execution_logs.event = drive_upload

### Worker 4

Name: WORKER-MANIFEST-UPDATE-001
Route: /api/workers/es001/manifest-update
Capability: CAP-MANIFEST-UPDATE-001
Reads: drive_uploaded
Writes: manifest_updated or failed_manifest_update
Required receipt: manifest_update_receipt
Required log: ai_execution_logs.event = manifest_update

### Worker 5

Name: WORKER-RECEIPT-AUDIT-001
Route: /api/workers/es001/receipt-audit
Capability: CAP-RECEIPT-AUDIT-001
Reads: manifest_updated
Writes: receipt_audit_pass or receipt_audit_fail
Required receipt: receipt_audit
Required log: ai_execution_logs.event = receipt_audit

## Manifest File Expansion Strategy

Current materialized package:
manifests/es001/ES001_MANIFEST_FILE_PACKAGE_02_54.json

Expansion target:
manifests/es001/ES001-02.json through manifests/es001/ES001-54.json

Expansion rules:

1. Read each record from ES001_MANIFEST_FILE_PACKAGE_02_54.json.
2. Create one manifest file per asset_id.
3. Preserve identity_lock = ES001-01.
4. Preserve public_use_allowed = false.
5. Set initial lifecycle state to pending_generation.
6. Set drive_file_id and drive_url to null.
7. Set qa_status, approval_status, drive_status, github_status, supabase_status, and receipt_status to pending.
8. Do not mark any asset canonical_available before receipt audit pass.

## Runtime Activation Sequence

### Stage 0: Blocked Until Validation

Required before activation:

- ES001-01 Drive upload verified
- media_assets record verified
- ai_execution_logs upload record verified
- eden_tool_receipts upload receipt verified
- preview executor confirmed

### Stage 1: Manifest Expansion

Generate individual ES001-02 through ES001-54 manifest files.

Activation gate:

- Every file validates as JSON
- Every file references ES001-01 identity lock
- No public_use_allowed true

### Stage 2: Worker Preview Deployment

Deploy worker routes to preview only.

Activation gate:

- GET health checks pass
- POST schema validation rejects invalid requests
- Failure receipts are created for controlled failure tests

### Stage 3: Single-Asset Lifecycle Test

Run one controlled asset through:

pending_generation
  -> generated_pending_qa
  -> qa_review
  -> approved_locked
  -> pending_drive_upload
  -> drive_uploaded
  -> manifest_updated
  -> receipt_audit_pass
  -> canonical_available

Activation gate:

- all receipts exist
- no duplicate receipts
- no orphan receipts
- manifest updated correctly
- asset remains private

### Stage 4: Cron Preview Test

Route: /api/cron/eden-image-install
Schedule: every 5 minutes

Activation gate:

- processes approved_locked only
- ignores pending_generation and qa_review
- stops on failures
- writes receipts and logs

### Stage 5: Operator Review

Operator reviews:

- Drive evidence
- Supabase evidence
- GitHub manifest diff
- receipt audit
- rollback plan

### Stage 6: Production Promotion Recommendation

Only recommend merge when:

- ES001-01 validated
- one full lifecycle validated
- cron validated
- rollback tested
- operator approves

## Downstream Use Gate

No asset may be used for website, social, video, Shopify, memberships, or public content until:

- canonical_available = true
- public_use_allowed = explicitly approved true for that specific use case
- approval receipt exists

## Rollback Behavior

If any worker fails:

1. Stop processing that asset.
2. Create failure receipt.
3. Write ai_execution_logs row.
4. Set state to needs_operator_review.
5. Prevent downstream use.
6. Preserve all evidence.

## Current Activation Status

preview_source_truth_ready: true
runtime_execution_ready: false
production_activation_ready: false
blocker: ES001-01 validation evidence missing
