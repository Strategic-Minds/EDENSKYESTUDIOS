# Supabase Image Generation Notation

Status: persistent notation installed.
Date: 2026-06-11
Owner: Strategic Minds / Eden Skye Studios

## Purpose

Supabase is the database notation layer for image generation, Drive installation, queue state, asset records, approval state, and receipts.

## Known Project

- Project ref: prhppuuwcnmfdhwsagug
- Project name: Strategic Minds Advisory
- Region: us-east-2

## Required Tables Or Equivalent

Future implementation should verify or create these through a governed migration packet:

- image_generation_jobs
- image_assets
- image_manifest_records
- image_install_receipts
- approval_queue
- tool_receipts

## Minimal Image Asset Fields

- asset_id
- model_id
- model_name
- shot_number
- shot_name
- taxonomy_category
- drive_file_id
- drive_file_url
- github_manifest_path
- qa_status
- approval_status
- usage_boundary
- public_use_allowed
- source_image_role
- generation_role

## Safe Status Values

- pending_generation
- generated_pending_approval
- approved_locked
- pending_drive_upload
- drive_uploaded
- manifest_updated
- github_record_created
- supabase_record_created
- failed_needs_review

## ES001 Canonical Asset

- model_id: ES001
- model_name: Eden Skye
- canonical baseline: ES001-01
- shot_name: Close-Up Beauty Portrait
- source_image_role: identity_baseline
- public_use_allowed: false unless separately approved

## Governance

No production migration should run without approval. Service-role writes must be restricted to verified tables and receipt-producing operations. Public publishing, Shopify mutation, and production deploy remain locked.

## Future GPT Instruction

Before inserting image records, verify tables with Supabase list_tables. If tables are missing, create a migration packet but do not apply production migrations without approval.
