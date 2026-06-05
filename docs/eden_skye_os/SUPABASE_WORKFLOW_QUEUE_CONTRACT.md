# EDEN SKYE OS Supabase Workflow Queue Contract

## Purpose
Defines Supabase as the operational queue, memory, audit, approval, and workflow-state layer for EDEN SKYE OS.

## Required Tables
- eden_workflow_queue
- eden_workflow_runs
- eden_workflow_results
- eden_audit_log
- eden_approval_gates
- eden_connector_health
- eden_system_settings
- eden_content_packets
- eden_media_jobs
- eden_metric_snapshots

## Queue States
pending -> claimed -> processing -> completed -> failed -> dead_letter -> archived

## Required Fields
- id
- workflow_key
- payload_json
- status
- priority
- dry_run
- approval_gate_id
- idempotency_key
- claimed_by
- claimed_at
- completed_at
- error_json
- created_at
- updated_at

## Safety
- RLS enabled on all tables.
- No public writes.
- Service role automation only.
- Admin dashboard reads gated by authenticated admin role.
- Every workflow write must create an audit row.

## Gate
This contract does not apply schema. SQL migration must be separately approved before execution.
