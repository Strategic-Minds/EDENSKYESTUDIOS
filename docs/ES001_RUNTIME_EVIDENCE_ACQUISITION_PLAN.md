# ES001 Runtime Evidence Acquisition Plan

Status: preview source truth
Phase: 3
Step: 58
Model ID: ES001
Model Name: Eden Skye
Identity Lock: ES001-01

## Purpose

Collect the minimum evidence required to move ES001 production readiness from 28 percent to 90 percent or higher without activating bulk generation or public publishing.

## Golden Rule

Do the fewest possible validations. Stop immediately on the first critical failure and preserve evidence.

## Required Test Assets

### Test Asset A

asset_id: ES001-01
purpose: canonical upload validation
status required: approved_locked

### Test Asset B

asset_id: ES001-02
purpose: controlled lifecycle validation
status required: pending_generation

## Validation Sequence

### Step 1: ES001-01 Drive Upload Validation

Objective: prove the Drive upload executor can install one approved locked image.

Route:
/api/bridge/drive-image-upload

Required payload fields:

- assetId: ES001-01
- modelId: ES001
- modelName: Eden Skye
- shotNumber: 1
- shotName: Close-Up Beauty Portrait
- filename: ESS_EDEN_SKYE_ES001_SHOT01_CLOSE_UP_BEAUTY_PORTRAIT_ULTRA_REAL_2026-06-11.png
- mimeType: image/png
- approvalStatus: approved_locked
- qaStatus: approved
- usageBoundary: private_studio_only
- publicUseAllowed: false
- targetFolderId: 1oCEjD6kUm9FiYDh1w-dNE9PPiggj65MQ
- base64Data: approved ES001-01 image

Expected output:

- HTTP 200
- Drive file ID
- Drive URL or webViewLink
- media_assets record ID
- ai_execution_logs record ID
- eden_tool_receipts receipt ID

Pass criteria:

- Drive file exists
- media_assets row exists
- execution log exists
- receipt exists
- publicUseAllowed remains false

Fail criteria:

- upload fails
- missing Drive file ID
- missing receipt
- public access enabled

### Step 2: Supabase Verification

Run these SQL checks after Step 1.

media_assets:

select id, title, storage_url, source_tool, usage_rights, metadata, created_at
from media_assets
where metadata->>'asset_id' = 'ES001-01'
   or title ilike '%ES001-01%'
order by created_at desc;

ai_execution_logs:

select id, event, status, action, details, created_at
from ai_execution_logs
where details::text ilike '%ES001-01%'
   or action ilike '%upload_es001%'
order by created_at desc;

eden_tool_receipts:

select id, receipt_id, tool_name, action_type, status, payload, created_at
from eden_tool_receipts
where payload::text ilike '%ES001-01%'
   or receipt_id ilike '%ES001-01%'
order by created_at desc;

Expected output:

- one matching media_assets row
- one successful upload execution log
- one successful drive upload receipt

### Step 3: Manifest Expansion Validation

Objective: prove the ES001 manifest package can produce a valid per-asset manifest.

Target:
manifests/es001/ES001-02.json

Required fields:

- asset_id: ES001-02
- model_id: ES001
- identity_lock: ES001-01
- public_use_allowed: false
- lifecycle_state: pending_generation
- drive_file_id: null
- drive_url: null
- receipt_status: pending

Pass criteria:

- valid JSON
- correct identity lock
- public flag false
- pending state preserved

### Step 4: Worker Preview Health Validation

Check these routes after preview deployment exists:

- GET /api/workers/es001/image-generate
- GET /api/workers/es001/image-qa
- GET /api/workers/es001/manifest-update
- GET /api/workers/es001/receipt-audit

Expected output:

- status: preview_ready
- modelId: ES001
- identityLock: ES001-01

Pass criteria:

- all routes respond
- no route performs work on GET
- no route exposes secrets

### Step 5: Controlled ES001-02 Lifecycle Test

Objective: prove one asset can move through the full state machine.

Required state progression:

pending_generation
-> generated_pending_qa
-> qa_review
-> approved_locked
-> pending_drive_upload
-> drive_uploaded
-> manifest_updated
-> receipt_audit_pass
-> canonical_available

Minimum evidence:

- generation receipt
- QA receipt
- Drive upload receipt
- manifest update receipt
- receipt audit receipt
- media_assets record
- ai_execution_logs records for every stage
- manifest updated with Drive metadata

### Step 6: Cron Preview Validation

Route:
/api/cron/eden-image-install

Expected behavior:

- processes approved_locked only
- ignores pending_generation
- stops on failure
- writes execution log
- writes receipt

SQL check:

select id, event, status, action, details, created_at
from ai_execution_logs
where event ilike '%cron%'
   or action ilike '%eden-image-install%'
order by created_at desc
limit 20;

Pass criteria:

- cron execution log exists
- no unapproved asset processed
- failure handling produces receipt

## Evidence Artifacts To Save

- Drive file ID
- Drive file URL
- media_assets query screenshot or exported result
- ai_execution_logs query screenshot or exported result
- eden_tool_receipts query screenshot or exported result
- manifest diff
- route response JSON
- cron response JSON
- receipt audit result

## Readiness Lift Model

Current production readiness: 28 percent

After Step 1 and Step 2 pass: 55 percent
After Step 3 pass: 65 percent
After Step 4 pass: 75 percent
After Step 5 pass: 88 percent
After Step 6 pass: 92 percent or higher

## Stop Conditions

Stop immediately if:

- Drive upload fails
- Supabase write fails
- receipt missing
- public access is enabled
- identity_lock changes
- public_use_allowed becomes true
- cron processes unapproved assets

## Final Go Rule

Production readiness can be recommended at 90 percent or higher only when:

- ES001-01 upload is verified
- ES001-02 lifecycle is verified
- receipts are complete
- cron is verified
- rollback path is confirmed
- operator approves promotion

## Current Status

runtime_evidence_ready: false
production_promotion_ready: false
current_blocker: ES001-01 upload validation evidence missing
