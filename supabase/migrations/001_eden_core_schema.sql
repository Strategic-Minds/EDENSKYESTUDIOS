create extension if not exists pgcrypto;

create or replace function public.set_eden_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.visual_source_assets (
  id uuid primary key default gen_random_uuid(),
  source_key text not null unique,
  title text not null,
  asset_type text not null default 'image',
  storage_uri text,
  drive_file_id text,
  status text not null default 'pending_validation',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.image_registry (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid references public.visual_source_assets(id) on delete set null,
  image_key text not null unique,
  model_lane text,
  status text not null default 'pending_validation',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.image_manifest (
  id uuid primary key default gen_random_uuid(),
  manifest_key text not null unique,
  lane text not null,
  expected_count integer not null default 0,
  verified_count integer not null default 0,
  status text not null default 'pending_validation',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.model_lanes (
  id uuid primary key default gen_random_uuid(),
  lane_key text not null unique,
  title text not null,
  status text not null default 'pending_validation',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.model_personas (
  id uuid primary key default gen_random_uuid(),
  lane_id uuid references public.model_lanes(id) on delete set null,
  persona_key text not null unique,
  display_name text not null,
  approval_status text not null default 'pending_approval',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.model_images (
  id uuid primary key default gen_random_uuid(),
  persona_id uuid references public.model_personas(id) on delete cascade,
  image_id uuid references public.image_registry(id) on delete cascade,
  relationship_type text not null default 'source_reference',
  status text not null default 'pending_validation',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (persona_id, image_id, relationship_type)
);

create table if not exists public.model_descriptions (
  id uuid primary key default gen_random_uuid(),
  persona_id uuid references public.model_personas(id) on delete cascade,
  description_type text not null default 'profile',
  body text not null,
  approval_status text not null default 'pending_approval',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.faceless_account_themes (
  id uuid primary key default gen_random_uuid(),
  theme_key text not null unique,
  title text not null,
  niche text not null,
  approval_status text not null default 'pending_approval',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.creator_identities (
  id uuid primary key default gen_random_uuid(),
  creator_key text not null unique,
  display_name text not null,
  identity_type text not null default 'digital_creator',
  approval_status text not null default 'pending_approval',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.creator_channels (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid references public.creator_identities(id) on delete cascade,
  platform text not null,
  channel_key text not null,
  approval_status text not null default 'pending_approval',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (platform, channel_key)
);

create table if not exists public.content_permissions (
  id uuid primary key default gen_random_uuid(),
  subject_type text not null,
  subject_key text not null,
  permission text not null,
  allowed boolean not null default false,
  approval_status text not null default 'pending_approval',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (subject_type, subject_key, permission)
);

create table if not exists public.content_queue_items (
  id uuid primary key default gen_random_uuid(),
  queue_key text not null default gen_random_uuid()::text,
  channel text not null default 'internal',
  content_type text not null default 'workflow_item',
  approval_status text not null default 'pending_approval',
  scheduled_for timestamptz,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (queue_key)
);

create table if not exists public.avatar_registry (
  id uuid primary key default gen_random_uuid(),
  avatar_key text not null unique,
  persona_id uuid references public.model_personas(id) on delete set null,
  provider text,
  approval_status text not null default 'pending_approval',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.avatar_image_links (
  id uuid primary key default gen_random_uuid(),
  avatar_id uuid references public.avatar_registry(id) on delete cascade,
  image_id uuid references public.image_registry(id) on delete cascade,
  relationship_type text not null default 'source_reference',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (avatar_id, image_id, relationship_type)
);

create table if not exists public.website_page_specs (
  id uuid primary key default gen_random_uuid(),
  page_key text not null unique,
  route_path text not null,
  approval_status text not null default 'pending_approval',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.website_visual_references (
  id uuid primary key default gen_random_uuid(),
  page_spec_id uuid references public.website_page_specs(id) on delete cascade,
  asset_id uuid references public.visual_source_assets(id) on delete set null,
  reference_type text not null default 'visual_source_truth',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.drive_folder_targets (
  id uuid primary key default gen_random_uuid(),
  target_key text not null unique,
  drive_folder_id text,
  purpose text not null,
  status text not null default 'pending_validation',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.source_truth_receipts (
  id uuid primary key default gen_random_uuid(),
  receipt_id text not null unique,
  receipt_type text not null,
  actor text not null,
  status text not null,
  source_truth text[] not null default array[]::text[],
  blocked_actions text[] not null default array[]::text[],
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.automation_health_checks (
  id uuid primary key default gen_random_uuid(),
  check_id text not null unique,
  runtime text not null,
  trigger text not null,
  readiness_score integer not null default 0,
  ready_for_autonomous_cron boolean not null default false,
  ready_for_production_release boolean not null default false,
  missing_files text[] not null default array[]::text[],
  missing_required_env text[] not null default array[]::text[],
  blocked_actions text[] not null default array[]::text[],
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.auto_heal_events (
  id uuid primary key default gen_random_uuid(),
  event_key text not null unique,
  event_type text not null,
  status text not null default 'pending_review',
  blocked_actions text[] not null default array[]::text[],
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.hardening_findings (
  id uuid primary key default gen_random_uuid(),
  finding_key text not null unique,
  severity text not null default 'medium',
  status text not null default 'open',
  finding text not null,
  remediation text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_source_truth_receipts_created_at on public.source_truth_receipts(created_at desc);
create index if not exists idx_automation_health_checks_created_at on public.automation_health_checks(created_at desc);
create index if not exists idx_content_queue_items_approval_status on public.content_queue_items(approval_status);
create index if not exists idx_image_registry_model_lane on public.image_registry(model_lane);

alter table public.visual_source_assets enable row level security;
alter table public.image_registry enable row level security;
alter table public.image_manifest enable row level security;
alter table public.model_lanes enable row level security;
alter table public.model_personas enable row level security;
alter table public.model_images enable row level security;
alter table public.model_descriptions enable row level security;
alter table public.faceless_account_themes enable row level security;
alter table public.creator_identities enable row level security;
alter table public.creator_channels enable row level security;
alter table public.content_permissions enable row level security;
alter table public.content_queue_items enable row level security;
alter table public.avatar_registry enable row level security;
alter table public.avatar_image_links enable row level security;
alter table public.website_page_specs enable row level security;
alter table public.website_visual_references enable row level security;
alter table public.drive_folder_targets enable row level security;
alter table public.source_truth_receipts enable row level security;
alter table public.automation_health_checks enable row level security;
alter table public.auto_heal_events enable row level security;
alter table public.hardening_findings enable row level security;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'visual_source_assets', 'image_registry', 'image_manifest', 'model_lanes', 'model_personas',
    'model_images', 'model_descriptions', 'faceless_account_themes', 'creator_identities',
    'creator_channels', 'content_permissions', 'content_queue_items', 'avatar_registry',
    'avatar_image_links', 'website_page_specs', 'website_visual_references', 'drive_folder_targets',
    'source_truth_receipts', 'automation_health_checks', 'auto_heal_events', 'hardening_findings'
  ]
  loop
    execute format('drop policy if exists eden_service_role_all on public.%I', table_name);
    execute format('create policy eden_service_role_all on public.%I for all using (auth.role() = ''service_role'') with check (auth.role() = ''service_role'')', table_name);
  end loop;
end;
$$;

drop trigger if exists set_visual_source_assets_updated_at on public.visual_source_assets;
create trigger set_visual_source_assets_updated_at before update on public.visual_source_assets for each row execute function public.set_eden_updated_at();

drop trigger if exists set_image_registry_updated_at on public.image_registry;
create trigger set_image_registry_updated_at before update on public.image_registry for each row execute function public.set_eden_updated_at();

drop trigger if exists set_content_queue_items_updated_at on public.content_queue_items;
create trigger set_content_queue_items_updated_at before update on public.content_queue_items for each row execute function public.set_eden_updated_at();

drop trigger if exists set_auto_heal_events_updated_at on public.auto_heal_events;
create trigger set_auto_heal_events_updated_at before update on public.auto_heal_events for each row execute function public.set_eden_updated_at();
