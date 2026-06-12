# ES001 Manifest Template and Expansion Packet

Status: preview source truth
Phase: 3
Step: 54
Model ID: ES001
Model Name: Eden Skye
Identity Lock: ES001-01

## Purpose

Define the per-asset manifest template and expansion strategy for ES001-02 through ES001-54.

## Source Package

manifests/es001/ES001_MANIFEST_FILE_PACKAGE_02_54.json

## Expansion Targets

manifests/es001/ES001-02.json through manifests/es001/ES001-54.json

## Manifest Template

Each file must include:

- asset_id
- model_id: ES001
- model_name: Eden Skye
- identity_lock: ES001-01
- shot_number
- shot_name
- taxonomy_category
- filename
- drive_root_folder_id: 1oCEjD6kUm9FiYDh1w-dNE9PPiggj65MQ
- drive_destination
- drive_file_id: null
- drive_url: null
- github_manifest_path
- queue_id: QUEUE-IMAGE-INSTALL-001
- drive_queue_id: QUEUE-DRIVE-UPLOAD-001
- lifecycle_state: pending_generation
- generation_status: pending_generation
- qa_status: pending
- approval_status: pending
- drive_status: pending_upload
- github_status: pending_manifest_update
- supabase_status: pending_record
- receipt_status: pending
- usage_boundary: private_studio_only
- public_use_allowed: false
- canonical_available: false

## Required Receipt Chain

- generation_receipt
- qa_receipt
- drive_upload_receipt
- manifest_update_receipt
- receipt_audit

## Expansion Rules

1. Create one file per asset.
2. Preserve identity_lock ES001-01.
3. Keep public_use_allowed false.
4. Keep canonical_available false.
5. Do not populate drive_file_id until Drive upload is verified.
6. Do not mark approval_status approved_locked without QA approval.
7. Do not mark canonical_available without receipt audit pass.

## Activation Status

Ready for expansion after ES001-01 validation evidence is complete.
