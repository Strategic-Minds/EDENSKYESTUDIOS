-- Eden Skye Studios enterprise content automation schema.
-- Apply only through the approved Supabase production migration gate.

create table if not exists public.eden_trend_signals (
  id uuid primary key default gen_random_uuid(),
  signal_id text unique not null,
  topic text not null,
  source_type text not null,
  source_url text,
  source_status text not null default 'unverified',
  evidence jsonb not null default '{}'::jsonb,
  scores jsonb not null default '{}'::jsonb,
  weighted_score numeric(5,2),
  approval_state text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.eden_content_calendar (
  id uuid primary key default gen_random_uuid(),
  plan_id text unique not null,
  scheduled_at timestamptz not null,
  account text not null,
  model_key text not null,
  pillar text not null,
  post_type text not null,
  hook text not null,
  caption_brief text,
  cta text,
  hashtags text[] not null default array[]::text[],
  visual_brief text,
  offer_path text,
  approval_state text not null default 'draft',
  publish_state text not null default 'not_public',
  performance_hypothesis text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.eden_generator_tasks (
  id uuid primary key default gen_random_uuid(),
  task_id text unique not null,
  post_id text,
  generator_type text not null,
  model_key text,
  prompt text not null,
  source_priority text[] not null default array[]::text[],
  watermark_required boolean not null default true,
  rights_state text not null default 'requires_source_receipt',
  approval_state text not null default 'draft',
  task_state text not null default 'queued',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.eden_generator_receipts (
  id uuid primary key default gen_random_uuid(),
  receipt_id text unique not null,
  task_id text,
  generator_type text not null,
  status text not null,
  output_ref text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.eden_watermark_receipts (
  id uuid primary key default gen_random_uuid(),
  receipt_id text unique not null,
  asset_id text not null,
  source_ref text,
  processed_ref text,
  watermark_state text not null default 'required',
  public_use_allowed boolean not null default false,
  approval_state text not null default 'draft',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.eden_post_performance (
  id uuid primary key default gen_random_uuid(),
  post_id text not null,
  account text not null,
  model_key text,
  captured_at timestamptz not null default now(),
  metrics jsonb not null default '{}'::jsonb,
  score numeric(5,2),
  winner_state text not null default 'unscored',
  adjustment_notes text,
  payload jsonb not null default '{}'::jsonb
);

create table if not exists public.eden_winner_patterns (
  id uuid primary key default gen_random_uuid(),
  pattern_id text unique not null,
  source_post_id text,
  pattern_type text not null,
  rule text not null,
  evidence jsonb not null default '{}'::jsonb,
  clone_plan jsonb not null default '{}'::jsonb,
  approval_state text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.eden_offer_catalog (
  id uuid primary key default gen_random_uuid(),
  offer_id text unique not null,
  title text not null,
  offer_type text not null,
  source_doc_ref text,
  audience text,
  pricing_logic text,
  fulfillment_type text,
  checkout_path text,
  approval_state text not null default 'draft',
  shopify_sync_state text not null default 'not_synced',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.eden_trend_signals enable row level security;
alter table public.eden_content_calendar enable row level security;
alter table public.eden_generator_tasks enable row level security;
alter table public.eden_generator_receipts enable row level security;
alter table public.eden_watermark_receipts enable row level security;
alter table public.eden_post_performance enable row level security;
alter table public.eden_winner_patterns enable row level security;
alter table public.eden_offer_catalog enable row level security;

create index if not exists eden_trend_signals_score_idx on public.eden_trend_signals (weighted_score desc, created_at desc);
create index if not exists eden_content_calendar_schedule_idx on public.eden_content_calendar (scheduled_at, approval_state, publish_state);
create index if not exists eden_content_calendar_model_idx on public.eden_content_calendar (model_key, account, pillar);
create index if not exists eden_generator_tasks_state_idx on public.eden_generator_tasks (task_state, approval_state, created_at);
create index if not exists eden_generator_receipts_task_idx on public.eden_generator_receipts (task_id, created_at desc);
create index if not exists eden_watermark_receipts_asset_idx on public.eden_watermark_receipts (asset_id, watermark_state, public_use_allowed);
create index if not exists eden_post_performance_post_idx on public.eden_post_performance (post_id, captured_at desc);
create index if not exists eden_winner_patterns_type_idx on public.eden_winner_patterns (pattern_type, approval_state);
create index if not exists eden_offer_catalog_type_idx on public.eden_offer_catalog (offer_type, approval_state, shopify_sync_state);

-- Public policies are intentionally omitted. Server-side routes use service-role access only after route-level authorization.
