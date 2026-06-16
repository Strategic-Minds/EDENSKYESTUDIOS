-- Reconciles remote Supabase migration 20260614165303_eden_source_image_persistence.
-- Includes Gate 3 dev-validated service-role hardening.

create extension if not exists pgcrypto;

create table if not exists public.eden_source_image_assets (
  id uuid primary key default gen_random_uuid(),
  asset_id text unique,
  filename text not null,
  target_filename text not null,
  manifest_slot text,
  approval_color text not null default 'yellow' check (approval_color in ('green', 'yellow', 'red')),
  approval_folder text not null default 'Needs Review' check (approval_folder in ('Drafts', 'Needs Review', 'Approved', 'Rejected', 'Drive Ready')),
  approval_status text not null default 'Needs QA, Drive ID, or manifest review',
  qa_score integer not null default 0 check (qa_score between 0 and 100),
  qa_min_score integer not null default 90 check (qa_min_score between 0 and 100),
  drive_file_id text,
  drive_url text,
  mime_type text not null default 'image/png',
  size_bytes bigint not null default 0 check (size_bytes >= 0),
  source text not null default 'editor',
  model text,
  provider text,
  original_prompt text,
  production_prompt text,
  match_confidence text,
  status text not null default 'needs_review',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.eden_source_image_ingest_receipts (
  id uuid primary key default gen_random_uuid(),
  receipt_id text not null unique,
  asset_id uuid references public.eden_source_image_assets(id) on delete set null,
  source_filename text not null,
  target_filename text not null,
  manifest_slot text,
  event_type text not null default 'image_stack_ingest',
  approval_color text not null default 'yellow' check (approval_color in ('green', 'yellow', 'red')),
  approval_folder text not null default 'Needs Review' check (approval_folder in ('Drafts', 'Needs Review', 'Approved', 'Rejected', 'Drive Ready')),
  approval_status text,
  qa_score integer not null default 0 check (qa_score between 0 and 100),
  qa_min_score integer not null default 90 check (qa_min_score between 0 and 100),
  drive_file_id text,
  drive_url text,
  supabase_receipt_id text,
  github_notation text,
  write_mode text not null default 'receipt_only',
  live_mutation jsonb not null default '{}'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists eden_source_image_assets_manifest_slot_idx on public.eden_source_image_assets(manifest_slot);
create index if not exists eden_source_image_assets_approval_idx on public.eden_source_image_assets(approval_color, approval_folder);
create index if not exists eden_source_image_assets_drive_file_idx on public.eden_source_image_assets(drive_file_id) where drive_file_id is not null;
create index if not exists eden_source_image_ingest_receipts_manifest_slot_idx on public.eden_source_image_ingest_receipts(manifest_slot);
create index if not exists eden_source_image_ingest_receipts_created_at_idx on public.eden_source_image_ingest_receipts(created_at desc);
create index if not exists eden_source_image_ingest_receipts_asset_idx on public.eden_source_image_ingest_receipts(asset_id) where asset_id is not null;

alter table public.eden_source_image_assets enable row level security;
alter table public.eden_source_image_ingest_receipts enable row level security;

revoke all on table public.eden_source_image_assets from anon, authenticated;
revoke all on table public.eden_source_image_ingest_receipts from anon, authenticated;

drop policy if exists "service_role manages eden_source_image_assets" on public.eden_source_image_assets;
create policy "service_role manages eden_source_image_assets"
  on public.eden_source_image_assets
  for all
  to service_role
  using (true)
  with check (true);

drop policy if exists "service_role manages eden_source_image_ingest_receipts" on public.eden_source_image_ingest_receipts;
create policy "service_role manages eden_source_image_ingest_receipts"
  on public.eden_source_image_ingest_receipts
  for all
  to service_role
  using (true)
  with check (true);

comment on table public.eden_source_image_assets is
  'Durable Eden Source Images asset ledger. Explicit service-role-only RLS policy; anon/authenticated grants revoked.';
comment on table public.eden_source_image_ingest_receipts is
  'Durable receipt log for generated/uploaded Eden image stack events. Explicit service-role-only RLS policy; anon/authenticated grants revoked.';
