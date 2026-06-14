-- Eden Media Assets Contract Alignment Draft
-- Status: DRAFT ONLY. Do not apply until operator approval, Supabase project confirmation,
-- RLS/storage review, and rollback plan are complete.
-- Purpose: keep new site-storage upload routes compatible with the existing admin media_assets API contract.

alter table if exists public.media_assets
  add column if not exists model_id text,
  add column if not exists model_code text,
  add column if not exists asset_type text,
  add column if not exists asset_role text,
  add column if not exists file_name text,
  add column if not exists drive_file_id text,
  add column if not exists drive_url text,
  add column if not exists storage_bucket text,
  add column if not exists storage_path text,
  add column if not exists sha256 text,
  add column if not exists width integer,
  add column if not exists height integer,
  add column if not exists source_tool text default 'manual',
  add column if not exists prompt text,
  add column if not exists status text default 'indexed',
  add column if not exists approval_status text default 'pending',
  add column if not exists usage_scope text default 'private_source',
  add column if not exists metadata jsonb default '{}'::jsonb,
  add column if not exists created_at timestamptz default now(),
  add column if not exists updated_at timestamptz default now();

create index if not exists media_assets_model_code_idx on public.media_assets(model_code);
create index if not exists media_assets_file_name_idx on public.media_assets(file_name);
create index if not exists media_assets_storage_path_idx on public.media_assets(storage_bucket, storage_path);
create index if not exists media_assets_status_idx on public.media_assets(status, approval_status);

alter table if exists public.media_assets enable row level security;

drop policy if exists "media assets authenticated read" on public.media_assets;
create policy "media assets authenticated read" on public.media_assets
  for select to authenticated using (true);

-- Writes remain server-only through service-role API routes. No anon/authenticated insert/update/delete
-- policy is created here by design.
