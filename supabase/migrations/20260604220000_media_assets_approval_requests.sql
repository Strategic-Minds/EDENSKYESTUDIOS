-- Eden Skye Studios media asset registry and approval workflow
-- Created 2026-06-04
-- This migration is designed for Supabase/Postgres with RLS enabled.

create extension if not exists pgcrypto;

create table if not exists public.model_profiles (
  id uuid primary key default gen_random_uuid(),
  model_code text not null unique,
  primary_name text not null,
  status text not null default 'draft',
  gender text,
  age integer,
  archetype text,
  niche text,
  visual_signature jsonb not null default '{}'::jsonb,
  voice_signature jsonb not null default '{}'::jsonb,
  safety_rules jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  model_id uuid references public.model_profiles(id) on delete set null,
  model_code text,
  asset_type text not null,
  asset_role text not null,
  file_name text not null,
  drive_file_id text,
  drive_url text,
  storage_bucket text,
  storage_path text,
  sha256 text,
  width integer,
  height integer,
  source_tool text,
  prompt text,
  status text not null default 'draft',
  approval_status text not null default 'pending',
  usage_scope text not null default 'private_source',
  safety_review jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_by text,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint media_assets_status_check check (status in ('draft','generated','indexed','rejected','approved_private','approved_public','archived')),
  constraint media_assets_approval_check check (approval_status in ('pending','approved','rejected','needs_revision')),
  constraint media_assets_usage_scope_check check (usage_scope in ('private_source','private_test','public_marketing','commerce','training_source'))
);

create table if not exists public.approval_requests (
  id uuid primary key default gen_random_uuid(),
  request_type text not null,
  target_table text not null,
  target_id uuid,
  requested_action text not null,
  risk_level text not null default 'medium',
  status text not null default 'pending',
  requester text,
  approver text,
  approved_at timestamptz,
  rejected_at timestamptz,
  notes text,
  decision_notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint approval_requests_risk_check check (risk_level in ('low','medium','high','critical')),
  constraint approval_requests_status_check check (status in ('pending','approved','rejected','cancelled','expired'))
);

create index if not exists idx_model_profiles_code on public.model_profiles(model_code);
create index if not exists idx_media_assets_model_id on public.media_assets(model_id);
create index if not exists idx_media_assets_model_code on public.media_assets(model_code);
create index if not exists idx_media_assets_status on public.media_assets(status, approval_status, usage_scope);
create index if not exists idx_media_assets_created_at on public.media_assets(created_at desc);
create index if not exists idx_approval_requests_status on public.approval_requests(status, risk_level, created_at desc);
create index if not exists idx_approval_requests_target on public.approval_requests(target_table, target_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_model_profiles_updated_at on public.model_profiles;
create trigger set_model_profiles_updated_at
before update on public.model_profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_media_assets_updated_at on public.media_assets;
create trigger set_media_assets_updated_at
before update on public.media_assets
for each row execute function public.set_updated_at();

drop trigger if exists set_approval_requests_updated_at on public.approval_requests;
create trigger set_approval_requests_updated_at
before update on public.approval_requests
for each row execute function public.set_updated_at();

alter table public.model_profiles enable row level security;
alter table public.media_assets enable row level security;
alter table public.approval_requests enable row level security;

-- Public read is restricted to explicitly approved public model records and media.
drop policy if exists "Public can read approved models" on public.model_profiles;
create policy "Public can read approved models"
  on public.model_profiles
  for select
  using (status = 'approved_public');

drop policy if exists "Public can read approved public media" on public.media_assets;
create policy "Public can read approved public media"
  on public.media_assets
  for select
  using (status = 'approved_public' and approval_status = 'approved' and usage_scope = 'public_marketing');

-- Authenticated users can read private operational records. A stricter app role policy can replace this later.
drop policy if exists "Authenticated can read model profiles" on public.model_profiles;
create policy "Authenticated can read model profiles"
  on public.model_profiles
  for select
  to authenticated
  using (true);

drop policy if exists "Authenticated can read media assets" on public.media_assets;
create policy "Authenticated can read media assets"
  on public.media_assets
  for select
  to authenticated
  using (true);

drop policy if exists "Authenticated can read approval requests" on public.approval_requests;
create policy "Authenticated can read approval requests"
  on public.approval_requests
  for select
  to authenticated
  using (true);

-- Writes should happen server-side with service role or through a hardened admin role. Do not expose service role to clients.

grant usage on schema public to anon, authenticated;
grant select on public.model_profiles to anon, authenticated;
grant select on public.media_assets to anon, authenticated;
grant select on public.approval_requests to authenticated;

comment on table public.media_assets is 'Private-first registry of generated and uploaded media assets for Eden Skye Studios.';
comment on table public.approval_requests is 'Approval workflow for public publishing, HeyGen training, Shopify mutations, deploys, and asset usage changes.';
