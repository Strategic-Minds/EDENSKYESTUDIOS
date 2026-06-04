# Eden Skye Studios Supabase Data Contract

## Objective

Supabase is the persistence layer for controlled autonomy: state, queues, telemetry, approvals, receipts, leads, media assets, social drafts, and sync events.

## Core Tables

### `leads`

Purpose: capture email/lead data from website and offers.

Fields:

- `id uuid primary key`
- `email text`
- `source text`
- `status text`
- `metadata jsonb`
- `created_at timestamptz`

### `avatar_assets`

Purpose: source image and avatar readiness registry.

Fields:

- `id uuid primary key`
- `avatar_id text`
- `avatar_name text`
- `drive_file_id text`
- `drive_url text`
- `asset_role text`
- `readiness_status text`
- `quality_score numeric`
- `metadata jsonb`
- `created_at timestamptz`

### `media_assets`

Purpose: generated or external media asset registry.

Fields:

- `id uuid primary key`
- `avatar_id text`
- `tool text`
- `asset_type text`
- `source_asset_ids jsonb`
- `output_url text`
- `status text`
- `approval_status text`
- `metadata jsonb`
- `created_at timestamptz`

### `media_jobs`

Purpose: image/video generation job queue.

Fields:

- `id uuid primary key`
- `job_type text`
- `avatar_id text`
- `run_mode text`
- `prompt text`
- `script text`
- `source_image_ids jsonb`
- `status text`
- `approval_request_id uuid`
- `result jsonb`
- `created_at timestamptz`
- `completed_at timestamptz`

### `content_queue`

Purpose: social/content draft queue.

Fields:

- `id uuid primary key`
- `avatar_id text`
- `platform text`
- `content_type text`
- `hook text`
- `caption text`
- `script text`
- `media_asset_id uuid`
- `status text`
- `approval_status text`
- `created_at timestamptz`

### `approval_requests`

Purpose: human approval gates.

Fields:

- `id uuid primary key`
- `action_key text`
- `target_system text`
- `risk_level text`
- `summary text`
- `payload jsonb`
- `status text`
- `requested_by text`
- `decided_by text`
- `created_at timestamptz`
- `decided_at timestamptz`

### `agent_runs`

Purpose: GPT/Higgins/agent run history.

Fields:

- `id uuid primary key`
- `agent_key text`
- `run_mode text`
- `source_files jsonb`
- `input jsonb`
- `output jsonb`
- `status text`
- `error text`
- `started_at timestamptz`
- `finished_at timestamptz`

### `tool_receipts`

Purpose: connector/tool operation records.

Fields:

- `id uuid primary key`
- `agent_run_id uuid`
- `tool_name text`
- `operation text`
- `target_system text`
- `status text`
- `receipt jsonb`
- `created_at timestamptz`

### `social_posts`

Purpose: lifecycle of public/draft posts.

Fields:

- `id uuid primary key`
- `content_queue_id uuid`
- `platform text`
- `status text`
- `scheduled_at timestamptz`
- `published_at timestamptz`
- `external_post_id text`
- `metrics jsonb`
- `created_at timestamptz`

### `shopify_sync_events`

Purpose: store and offer sync receipts.

Fields:

- `id uuid primary key`
- `event_type text`
- `shopify_object_type text`
- `shopify_object_id text`
- `status text`
- `payload jsonb`
- `created_at timestamptz`

### `system_health_checks`

Purpose: readiness, cron, and connector checks.

Fields:

- `id uuid primary key`
- `check_key text`
- `status text`
- `details jsonb`
- `created_at timestamptz`

## RLS / Security Direction

- Public lead capture may insert only limited lead fields.
- Admin dashboards require authenticated/internal access.
- Service-role operations must be server-side only.
- Approval-required actions must validate `approval_requests.status = approved` server-side.
- No raw secrets in telemetry tables.

## Migration Rule

This is a contract, not an applied migration. Generate and apply migrations only after Jeremy approval.
