# ES001 Mobile Operator Execution Checklist

Status: preview source truth
Phase: 3
Step: 59
Model ID: ES001
Model Name: Eden Skye
Identity Lock: ES001-01

## Purpose

Give the operator a mobile-friendly checklist to collect runtime evidence for the ES001 canonical image pipeline.

## Golden Rule

Do not approve production until every required screenshot and evidence item is collected.

## Mobile Prep

Required on phone:

- Approved ES001-01 image saved to camera roll or files
- Access to preview deployment URL
- Access to Supabase dashboard
- Access to Google Drive
- Access to GitHub preview branch

## Known Drive Folder

Folder name: EDEN_SKYE_STUDIOS_OS
Folder ID: 1oCEjD6kUm9FiYDh1w-dNE9PPiggj65MQ

## Expected ES001-01 Filename

ESS_EDEN_SKYE_ES001_SHOT01_CLOSE_UP_BEAUTY_PORTRAIT_ULTRA_REAL_2026-06-11.png

---

# Step 1: Upload ES001-01 From Mobile

Open the mobile upload bridge on the preview deployment:

https://<preview-deployment-domain>/api/bridge/mobile-es001-upload

Action:

1. Tap choose file.
2. Select approved ES001-01 image.
3. Tap Install ES001-01 Into Drive.
4. Wait for the JSON response.
5. Screenshot the full response.

Pass if response includes:

- HTTP 200
- uploaded or success status
- Drive file ID or Drive URL
- receipt ID or Supabase IDs

Fail if response includes:

- missing credentials
- permission denied
- missing base64Data
- folder not found
- upload failed

Screenshot required:

ES001_STEP_1_UPLOAD_RESPONSE.png

---

# Step 2: Verify Drive File On Mobile

Open Google Drive.

Search exact filename:

ESS_EDEN_SKYE_ES001_SHOT01_CLOSE_UP_BEAUTY_PORTRAIT_ULTRA_REAL_2026-06-11.png

Pass if:

- File exists
- File is inside EDEN_SKYE_STUDIOS_OS
- File is not publicly shared

Screenshot required:

ES001_STEP_2_DRIVE_FILE_FOUND.png

Record:

- Drive file ID
- Drive file URL
- Folder name

---

# Step 3: Verify Supabase media_assets

Open Supabase SQL editor and run:

select id, title, storage_url, source_tool, usage_rights, metadata, created_at
from media_assets
where metadata::text ilike '%ES001-01%'
   or title ilike '%ES001-01%'
order by created_at desc;

Pass if at least one row exists and includes:

- ES001-01
- ES001
- private_studio_only
- public_use_allowed false if present in metadata

Screenshot required:

ES001_STEP_3_MEDIA_ASSETS_RESULT.png

Record:

- media_assets.id

---

# Step 4: Verify Supabase ai_execution_logs

Run:

select id, event, status, action, details, created_at
from ai_execution_logs
where details::text ilike '%ES001-01%'
   or action ilike '%upload_es001%'
order by created_at desc;

Pass if at least one row exists and includes:

- upload action
- success status
- ES001-01 reference

Screenshot required:

ES001_STEP_4_EXECUTION_LOG_RESULT.png

Record:

- ai_execution_logs.id

---

# Step 5: Verify Supabase eden_tool_receipts

Run:

select id, receipt_id, tool_name, action_type, status, payload, created_at
from eden_tool_receipts
where payload::text ilike '%ES001-01%'
   or receipt_id ilike '%ES001-01%'
order by created_at desc;

Pass if at least one row exists and includes:

- drive upload receipt
- success status
- ES001-01 reference

Screenshot required:

ES001_STEP_5_RECEIPT_RESULT.png

Record:

- receipt_id

---

# Step 6: Verify Manifest Package

Open GitHub preview branch:

branch: eden/drive-upload-executor-es001-preview

Check file:

manifests/es001/ES001_MANIFEST_FILE_PACKAGE_02_54.json

Pass if file exists and includes:

- ES001-02 through ES001-54
- identity_lock ES001-01
- public_use_allowed false

Screenshot required:

ES001_STEP_6_MANIFEST_PACKAGE.png

---

# Step 7: Verify Cron Route Health

Open preview route:

https://<preview-deployment-domain>/api/cron/eden-image-install

Pass if response confirms preview route exists or cron route installed.

Fail if route is missing, crashes, or processes unapproved assets.

Screenshot required:

ES001_STEP_7_CRON_ROUTE_RESPONSE.png

---

# Step 8: Verify Cron Logs In Supabase

Run:

select id, event, status, action, details, created_at
from ai_execution_logs
where event ilike '%cron%'
   or action ilike '%eden-image-install%'
order by created_at desc
limit 20;

Pass if cron execution log exists and does not show unsafe processing.

Screenshot required:

ES001_STEP_8_CRON_LOGS.png

---

# Step 9: Final Evidence Folder

Create or use a Drive folder:

EDEN_SKYE_STUDIOS_OS/03_ES001_QA_Receipts

Upload screenshots:

- ES001_STEP_1_UPLOAD_RESPONSE.png
- ES001_STEP_2_DRIVE_FILE_FOUND.png
- ES001_STEP_3_MEDIA_ASSETS_RESULT.png
- ES001_STEP_4_EXECUTION_LOG_RESULT.png
- ES001_STEP_5_RECEIPT_RESULT.png
- ES001_STEP_6_MANIFEST_PACKAGE.png
- ES001_STEP_7_CRON_ROUTE_RESPONSE.png
- ES001_STEP_8_CRON_LOGS.png

---

# Pass / Fail Decision

## Pass

All required evidence exists:

- upload response success
- Drive file exists
- media_assets row exists
- ai_execution_logs row exists
- eden_tool_receipts row exists
- manifest package exists
- cron route exists
- cron log exists

## Fail

Any required evidence is missing.

Fail action:

- remain preview-only
- paste failure response into ChatGPT
- create remediation note
- do not approve production

---

# Final Production Approval Worksheet

production_approval_status: pending

Required checkboxes:

- [ ] ES001-01 upload succeeded
- [ ] Drive file verified
- [ ] media_assets verified
- [ ] ai_execution_logs verified
- [ ] eden_tool_receipts verified
- [ ] manifest package verified
- [ ] cron route verified
- [ ] cron logs verified
- [ ] public_use_allowed remains false
- [ ] no public sharing enabled
- [ ] rollback path understood
- [ ] operator approval granted

Operator decision:

- [ ] APPROVE PROMOTION
- [ ] DO NOT APPROVE PROMOTION

Operator notes:

Add notes here.

---

# Current Status

production_ready: false
reason: runtime evidence not yet collected
