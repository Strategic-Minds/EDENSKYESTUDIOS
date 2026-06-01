create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text,
  phone text,
  source text not null default 'unknown',
  interest text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.content_queue (
  id uuid primary key default gen_random_uuid(),
  content_type text not null,
  channel text not null,
  hook text,
  caption text,
  cta text,
  asset_url text,
  status text not null default 'draft',
  score numeric,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.agent_runs (
  id uuid primary key default gen_random_uuid(),
  agent_name text not null,
  run_type text not null,
  status text not null default 'queued',
  input_payload jsonb not null default '{}'::jsonb,
  output_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tool_receipts (
  id uuid primary key default gen_random_uuid(),
  tool_name text not null,
  operation text not null,
  status text not null,
  receipt_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.approval_requests (
  id uuid primary key default gen_random_uuid(),
  action_type text not null,
  reason text not null,
  risk_score numeric not null default 0,
  status text not null default 'pending',
  request_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  decided_at timestamptz
);

create table if not exists public.social_posts (
  id uuid primary key default gen_random_uuid(),
  channel text not null,
  content text not null,
  status text not null default 'draft',
  scheduled_for timestamptz,
  published_at timestamptz,
  performance_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  asset_type text not null,
  title text,
  storage_url text,
  source_tool text,
  usage_rights text not null default 'owned_or_generated',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.shopify_sync_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  shop_domain text not null,
  status text not null default 'queued',
  event_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.social_media_bridge (
  id uuid primary key default gen_random_uuid(),
  content_draft text not null,
  channel text not null,
  approved boolean not null default false,
  publish_safe boolean not null default false,
  status text not null default 'drafted',
  created_at timestamptz not null default now()
);

create table if not exists public.runtime_telemetry_events (
  id uuid primary key default gen_random_uuid(),
  telemetry_key text not null,
  event_status text not null,
  event_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists content_queue_status_idx on public.content_queue(status);
create index if not exists content_queue_channel_idx on public.content_queue(channel);
create index if not exists agent_runs_status_idx on public.agent_runs(status);
create index if not exists social_posts_status_idx on public.social_posts(status);
create index if not exists social_media_bridge_status_idx on public.social_media_bridge(status);
create index if not exists runtime_telemetry_key_idx on public.runtime_telemetry_events(telemetry_key);

alter table public.leads enable row level security;
alter table public.content_queue enable row level security;
alter table public.agent_runs enable row level security;
alter table public.tool_receipts enable row level security;
alter table public.approval_requests enable row level security;
alter table public.social_posts enable row level security;
alter table public.media_assets enable row level security;
alter table public.shopify_sync_events enable row level security;
alter table public.social_media_bridge enable row level security;
alter table public.runtime_telemetry_events enable row level security;

create policy "service_role manages leads" on public.leads for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service_role manages content_queue" on public.content_queue for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service_role manages agent_runs" on public.agent_runs for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service_role manages tool_receipts" on public.tool_receipts for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service_role manages approval_requests" on public.approval_requests for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service_role manages social_posts" on public.social_posts for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service_role manages media_assets" on public.media_assets for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service_role manages shopify_sync_events" on public.shopify_sync_events for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service_role manages social_media_bridge" on public.social_media_bridge for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service_role manages runtime_telemetry_events" on public.runtime_telemetry_events for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
