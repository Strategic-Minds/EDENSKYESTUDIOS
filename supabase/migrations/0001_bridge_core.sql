create extension if not exists pgcrypto;

create table if not exists public.bridge_locks (
  lock_key text primary key,
  owner text not null,
  locked_until timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists public.bridge_config (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.bridge_queue (
  id uuid primary key default gen_random_uuid(),
  job_type text not null,
  status text not null default 'queued',
  priority int not null default 100,
  payload jsonb not null default '{}'::jsonb,
  result jsonb,
  error text,
  attempts int not null default 0,
  max_attempts int not null default 3,
  not_before timestamptz not null default now(),
  locked_by text,
  locked_until timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.approval_requests (
  id uuid primary key default gen_random_uuid(),
  request_type text not null,
  status text not null default 'pending',
  title text not null,
  summary text not null,
  risk_level text not null default 'yellow',
  payload jsonb not null default '{}'::jsonb,
  requested_by text not null default 'eden_autonomous_bridge',
  decided_by text,
  decision_note text,
  created_at timestamptz not null default now(),
  decided_at timestamptz
);

create table if not exists public.bridge_dead_letters (
  id uuid primary key default gen_random_uuid(),
  original_job_id uuid,
  job_type text not null,
  payload jsonb not null default '{}'::jsonb,
  error text not null,
  attempts int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.bridge_locks enable row level security;
alter table public.bridge_config enable row level security;
alter table public.bridge_queue enable row level security;
alter table public.approval_requests enable row level security;
alter table public.bridge_dead_letters enable row level security;

create index if not exists bridge_queue_status_priority_idx
on public.bridge_queue(status, priority, not_before);

create index if not exists approval_requests_status_idx
on public.approval_requests(status, created_at);
