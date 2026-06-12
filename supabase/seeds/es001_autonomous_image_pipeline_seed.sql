-- ES001 Autonomous Image Pipeline Seed SQL
-- Status: preview source truth only
-- Phase 3 / Step 50
-- Do not run in production without operator approval.

begin;

-- 1. Seed ES001 capability registry into ai_system_events as durable notation.
insert into ai_system_events (event_type, source, payload)
select 'capability_seed', 'AUTO_BUILDER_OS', '{"capability_id":"CAP-IMAGE-GENERATE-001","model_id":"ES001","status":"preview_defined","worker":"WORKER-IMAGE-GENERATE-001"}'::jsonb
where not exists (
  select 1 from ai_system_events where event_type='capability_seed' and payload->>'capability_id'='CAP-IMAGE-GENERATE-001'
);

insert into ai_system_events (event_type, source, payload)
select 'capability_seed', 'AUTO_BUILDER_OS', '{"capability_id":"CAP-IMAGE-QA-001","model_id":"ES001","status":"preview_defined","worker":"WORKER-IMAGE-QA-001"}'::jsonb
where not exists (
  select 1 from ai_system_events where event_type='capability_seed' and payload->>'capability_id'='CAP-IMAGE-QA-001'
);

insert into ai_system_events (event_type, source, payload)
select 'capability_seed', 'AUTO_BUILDER_OS', '{"capability_id":"CAP-MANIFEST-UPDATE-001","model_id":"ES001","status":"preview_defined","worker":"WORKER-MANIFEST-UPDATE-001"}'::jsonb
where not exists (
  select 1 from ai_system_events where event_type='capability_seed' and payload->>'capability_id'='CAP-MANIFEST-UPDATE-001'
);

insert into ai_system_events (event_type, source, payload)
select 'capability_seed', 'AUTO_BUILDER_OS', '{"capability_id":"CAP-RECEIPT-AUDIT-001","model_id":"ES001","status":"preview_defined","worker":"WORKER-RECEIPT-AUDIT-001"}'::jsonb
where not exists (
  select 1 from ai_system_events where event_type='capability_seed' and payload->>'capability_id'='CAP-RECEIPT-AUDIT-001'
);

-- 2. Seed lifecycle states as notation receipts.
insert into eden_tool_receipts (receipt_id, tool_name, action_type, status, payload)
select 'ES001-LIFECYCLE-SEED-V1', 'auto-builder-seed', 'seed_lifecycle_states', 'preview_defined', '{"states":["pending_generation","generated_pending_qa","qa_review","approved_locked","pending_drive_upload","drive_uploaded","manifest_updated","receipt_audit_pass","canonical_available","needs_operator_review"]}'::jsonb
where not exists (
  select 1 from eden_tool_receipts where receipt_id='ES001-LIFECYCLE-SEED-V1'
);

-- 3. Seed queue definitions as notation receipts.
insert into eden_tool_receipts (receipt_id, tool_name, action_type, status, payload)
select 'ES001-QUEUE-SEED-V1', 'auto-builder-seed', 'seed_queue_definitions', 'preview_defined', '{"queues":["QUEUE-IMAGE-INSTALL-001","QUEUE-DRIVE-UPLOAD-001"],"model_id":"ES001","identity_lock":"ES001-01"}'::jsonb
where not exists (
  select 1 from eden_tool_receipts where receipt_id='ES001-QUEUE-SEED-V1'
);

-- 4. Seed ES001 source asset placeholders into media_assets.
insert into media_assets (asset_type, title, storage_url, source_tool, usage_rights, metadata)
select 'image', 'ES001-01 Close-Up Beauty Portrait', 'pending_drive_upload_validation', 'eden-es001-seed', 'private_studio_only', '{"asset_id":"ES001-01","model_id":"ES001","model_name":"Eden Skye","identity_lock":"ES001-01","approval_status":"approved_locked","qa_status":"approved","public_use_allowed":false,"generation_status":"approved_locked","drive_status":"pending_upload_validation"}'::jsonb
where not exists (
  select 1 from media_assets where title='ES001-01 Close-Up Beauty Portrait' and source_tool='eden-es001-seed'
);

-- 5. Seed runtime worker definitions as execution logs.
insert into ai_execution_logs (event, status, action, details)
select 'runtime_worker_seed', 'preview_defined', 'seed_es001_runtime_workers', '{"workers":["WORKER-IMAGE-GENERATE-001","WORKER-IMAGE-QA-001","WORKER-MANIFEST-UPDATE-001","WORKER-RECEIPT-AUDIT-001"],"activation":"blocked_until_es001_01_validation"}'::jsonb
where not exists (
  select 1 from ai_execution_logs where event='runtime_worker_seed' and action='seed_es001_runtime_workers'
);

commit;

-- Rollback SQL
-- delete from media_assets where source_tool='eden-es001-seed';
-- delete from eden_tool_receipts where receipt_id in ('ES001-LIFECYCLE-SEED-V1','ES001-QUEUE-SEED-V1');
-- delete from ai_execution_logs where event='runtime_worker_seed' and action='seed_es001_runtime_workers';
-- delete from ai_system_events where event_type='capability_seed' and payload->>'model_id'='ES001';

-- Verification SQL
-- select * from ai_system_events where event_type='capability_seed' and payload->>'model_id'='ES001';
-- select * from eden_tool_receipts where receipt_id in ('ES001-LIFECYCLE-SEED-V1','ES001-QUEUE-SEED-V1');
-- select * from media_assets where title ilike '%ES001-01%';
-- select * from ai_execution_logs where event='runtime_worker_seed';
