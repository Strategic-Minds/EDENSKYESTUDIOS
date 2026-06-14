create extension if not exists pgcrypto;

create table if not exists public.eden_video_assets (
  id uuid primary key default gen_random_uuid(),
  heygen_video_id text unique,
  title text not null,
  status text not null default 'draft',
  approval_color text not null default 'yellow' check (approval_color in ('green', 'yellow', 'red')),
  approval_status text not null default 'Draft',
  source_asset_id uuid references public.eden_source_image_assets(id) on delete set null,
  avatar_id text,
  avatar_name text,
  voice_id text,
  style_id text,
  aspect_ratio text not null default '9:16',
  duration_seconds numeric,
  thumbnail_url text,
  video_url text,
  heygen_page_url text,
  script text,
  caption text,
  platform_targets text[] not null default array[]::text[],
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.eden_video_draft_jobs (
  id uuid primary key default gen_random_uuid(),
  job_id text not null unique,
  title text not null,
  script text not null default '',
  avatar_id text,
  avatar_name text,
  voice_id text,
  style_id text,
  aspect_ratio text not null default '9:16',
  source_image_asset_id uuid references public.eden_source_image_assets(id) on delete set null,
  video_asset_id uuid references public.eden_video_assets(id) on delete set null,
  status text not null default 'draft',
  approval_color text not null default 'yellow' check (approval_color in ('green', 'yellow', 'red')),
  approval_status text not null default 'Draft',
  heygen_request jsonb not null default '{}'::jsonb,
  heygen_response jsonb not null default '{}'::jsonb,
  failure_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.eden_video_receipts (
  id uuid primary key default gen_random_uuid(),
  receipt_id text not null unique,
  video_asset_id uuid references public.eden_video_assets(id) on delete set null,
  draft_job_id uuid references public.eden_video_draft_jobs(id) on delete set null,
  event_type text not null default 'video_draft_receipt',
  approval_color text not null default 'yellow' check (approval_color in ('green', 'yellow', 'red')),
  approval_status text not null default 'Draft',
  heygen_video_id text,
  supabase_receipt_id text,
  github_notation text,
  write_mode text not null default 'receipt_only',
  live_mutation jsonb not null default '{}'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists eden_video_assets_status_idx on public.eden_video_assets(status, approval_color);
create index if not exists eden_video_assets_heygen_video_idx on public.eden_video_assets(heygen_video_id) where heygen_video_id is not null;
create index if not exists eden_video_assets_source_asset_idx on public.eden_video_assets(source_asset_id) where source_asset_id is not null;
create index if not exists eden_video_draft_jobs_status_idx on public.eden_video_draft_jobs(status, approval_color);
create index if not exists eden_video_draft_jobs_source_image_idx on public.eden_video_draft_jobs(source_image_asset_id) where source_image_asset_id is not null;
create index if not exists eden_video_receipts_created_at_idx on public.eden_video_receipts(created_at desc);
create index if not exists eden_video_receipts_video_asset_idx on public.eden_video_receipts(video_asset_id) where video_asset_id is not null;
create index if not exists eden_video_receipts_draft_job_idx on public.eden_video_receipts(draft_job_id) where draft_job_id is not null;

create or replace function public.set_eden_video_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_eden_video_assets_updated_at on public.eden_video_assets;
create trigger set_eden_video_assets_updated_at
before update on public.eden_video_assets
for each row
execute function public.set_eden_video_updated_at();

drop trigger if exists set_eden_video_draft_jobs_updated_at on public.eden_video_draft_jobs;
create trigger set_eden_video_draft_jobs_updated_at
before update on public.eden_video_draft_jobs
for each row
execute function public.set_eden_video_updated_at();

alter table public.eden_video_assets enable row level security;
alter table public.eden_video_draft_jobs enable row level security;
alter table public.eden_video_receipts enable row level security;

revoke all on table public.eden_video_assets from anon, authenticated;
revoke all on table public.eden_video_draft_jobs from anon, authenticated;
revoke all on table public.eden_video_receipts from anon, authenticated;

comment on table public.eden_video_assets is 'Durable Eden video asset ledger for HeyGen and generated video outputs. Service-role only until admin API policies are explicitly approved.';
comment on table public.eden_video_draft_jobs is 'Approval-gated Eden video draft job queue for HeyGen generation requests. Service-role only until admin API policies are explicitly approved.';
comment on table public.eden_video_receipts is 'Durable receipt log for Eden video stack events. Service-role only until admin API policies are explicitly approved.';
