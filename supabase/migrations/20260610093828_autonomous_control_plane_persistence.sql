-- Reconciles remote Supabase migration 20260610093828_autonomous_control_plane_persistence.
-- Production already contains this migration; this file restores repo source truth.

create extension if not exists pgcrypto;

create table if not exists public.autonomous_control_plane_runs (
  id uuid primary key default gen_random_uuid(),
  run_key text not null unique,
  mode text not null check (mode in ('preview_sandbox_autonomous', 'production_gated_autonomous')),
  production_action_allowed boolean not null default false,
  readiness_score integer not null default 0 check (readiness_score between 0 and 100),
  receipt jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.autonomous_control_plane_tasks (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references public.autonomous_control_plane_runs(id) on delete cascade,
  task_key text not null,
  lane text not null,
  title text not null,
  status text not null check (status in ('ready', 'done', 'blocked')),
  risk_class integer not null check (risk_class between 1 and 5),
  mutation boolean not null default false,
  approval_required boolean not null default true,
  next_action text not null,
  created_at timestamptz not null default now(),
  unique (run_id, task_key)
);

create index if not exists autonomous_control_plane_runs_created_at_idx
  on public.autonomous_control_plane_runs(created_at desc);
create index if not exists autonomous_control_plane_tasks_run_id_idx
  on public.autonomous_control_plane_tasks(run_id);
create index if not exists autonomous_control_plane_tasks_status_idx
  on public.autonomous_control_plane_tasks(status);

alter table public.autonomous_control_plane_runs enable row level security;
alter table public.autonomous_control_plane_tasks enable row level security;

drop policy if exists "service_role manages autonomous_control_plane_runs" on public.autonomous_control_plane_runs;
create policy "service_role manages autonomous_control_plane_runs"
  on public.autonomous_control_plane_runs
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

drop policy if exists "service_role manages autonomous_control_plane_tasks" on public.autonomous_control_plane_tasks;
create policy "service_role manages autonomous_control_plane_tasks"
  on public.autonomous_control_plane_tasks
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
