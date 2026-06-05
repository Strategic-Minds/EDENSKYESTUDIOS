-- Eden Skye governed runtime dry-run migration.
-- Status: branch/source only. Do not apply to production without explicit approval.
-- Purpose: support factory maps, model records, wardrobe states, chat receipts, drafts, and governed automation.

create extension if not exists pgcrypto;

create table if not exists public.eden_model_profiles (
  id uuid primary key default gen_random_uuid(),
  model_code text not null unique,
  primary_name text not null,
  country text,
  region text,
  age_min integer not null default 25 check (age_min >= 25),
  archetype text,
  voice_tone text,
  wardrobe_state_id uuid,
  approved_image_asset_id uuid,
  black_card_visibility boolean not null default false,
  approval_status text not null default 'pending' check (approval_status in ('pending', 'approved', 'rejected', 'needs_revision')),
  status text not null default 'draft' check (status in ('draft', 'active', 'paused', 'archived')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.eden_wardrobe_states (
  id uuid primary key default gen_random_uuid(),
  model_id uuid references public.eden_model_profiles(id) on delete cascade,
  current_outfit text not null,
  underwear_color text,
  styling_notes text,
  tattoos text,
  glasses boolean not null default false,
  background text,
  preview_asset_id uuid,
  approval_status text not null default 'pending' check (approval_status in ('pending', 'approved', 'rejected', 'needs_revision')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'eden_model_profiles_wardrobe_state_fk'
      and conrelid = 'public.eden_model_profiles'::regclass
  ) then
    alter table public.eden_model_profiles
      add constraint eden_model_profiles_wardrobe_state_fk
      foreign key (wardrobe_state_id) references public.eden_wardrobe_states(id)
      deferrable initially deferred;
  end if;
end $$;

create table if not exists public.eden_social_drafts (
  id uuid primary key default gen_random_uuid(),
  model_id uuid references public.eden_model_profiles(id) on delete set null,
  platform text not null,
  region text,
  timezone text,
  hook text not null,
  caption text not null,
  script text,
  visual_prompt text,
  cta text,
  hashtags text[] not null default '{}',
  scheduled_for timestamptz,
  status text not null default 'draft' check (status in ('draft', 'pending_approval', 'approved_for_handoff', 'rejected', 'scheduled_external')),
  approval_request_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.eden_chat_sessions (
  id uuid primary key default gen_random_uuid(),
  user_label text,
  channel text not null default 'web',
  model text,
  status text not null default 'active' check (status in ('active', 'closed', 'blocked')),
  last_gate_result jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.eden_agent_runs (
  id uuid primary key default gen_random_uuid(),
  lane text not null,
  job_type text not null,
  risk_level text not null default 'yellow' check (risk_level in ('green', 'yellow', 'red', 'critical')),
  status text not null default 'queued' check (status in ('queued', 'running', 'completed', 'failed', 'blocked', 'cancelled')),
  trigger_source text,
  approval_required boolean not null default false,
  approval_request_id uuid,
  input jsonb not null default '{}'::jsonb,
  output jsonb not null default '{}'::jsonb,
  started_at timestamptz,
  finished_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.tool_receipts (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  actor text not null default 'Eden Skye Runtime',
  action text not null,
  status text not null check (status in ('created', 'allowed', 'blocked', 'failed', 'dry_run')),
  risk_level text not null default 'yellow' check (risk_level in ('green', 'yellow', 'red', 'critical')),
  request_id text,
  target text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists eden_model_profiles_status_idx on public.eden_model_profiles(status, approval_status);
create index if not exists eden_social_drafts_status_idx on public.eden_social_drafts(status, scheduled_for);
create index if not exists eden_agent_runs_status_idx on public.eden_agent_runs(status, job_type, created_at desc);
create index if not exists tool_receipts_created_idx on public.tool_receipts(created_at desc, status);

alter table public.eden_model_profiles enable row level security;
alter table public.eden_wardrobe_states enable row level security;
alter table public.eden_social_drafts enable row level security;
alter table public.eden_chat_sessions enable row level security;
alter table public.eden_agent_runs enable row level security;
alter table public.tool_receipts enable row level security;

-- No anon/authenticated policies are added in the dry-run migration.
-- Server-side admin routes should use SUPABASE_SERVICE_ROLE_KEY only after approval.
