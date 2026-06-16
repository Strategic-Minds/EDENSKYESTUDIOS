-- Reconciles remote Supabase migration 20260610114121_autobuilder_run_receipts.
-- Includes Gate 3 dev-validated service-role hardening.
-- Rollback: drop table if exists public.autobuilder_run_receipts;

create table if not exists public.autobuilder_run_receipts (
  id text primary key,
  agent_id text not null,
  status text not null,
  risk text not null,
  approval text not null,
  title text not null,
  requested_action text not null,
  receipt jsonb not null,
  source text not null,
  deployment_url text,
  created_at timestamptz not null,
  updated_at timestamptz not null,
  persisted_at timestamptz not null default now()
);

create index if not exists autobuilder_run_receipts_created_at_idx
  on public.autobuilder_run_receipts (created_at desc);
create index if not exists autobuilder_run_receipts_agent_id_idx
  on public.autobuilder_run_receipts (agent_id);
create index if not exists autobuilder_run_receipts_status_idx
  on public.autobuilder_run_receipts (status);

alter table public.autobuilder_run_receipts enable row level security;

revoke all on table public.autobuilder_run_receipts from anon, authenticated;

drop policy if exists "service_role manages autobuilder_run_receipts" on public.autobuilder_run_receipts;
create policy "service_role manages autobuilder_run_receipts"
  on public.autobuilder_run_receipts
  for all
  to service_role
  using (true)
  with check (true);

comment on table public.autobuilder_run_receipts is
  'Governed AUTO BUILDER run-loop receipts for StrategicMinds. Explicit service-role-only RLS policy; anon/authenticated grants revoked.';
