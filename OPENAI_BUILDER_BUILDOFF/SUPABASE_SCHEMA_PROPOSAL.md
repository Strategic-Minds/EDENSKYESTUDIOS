# Supabase Schema Proposal

## VERIFIED
- This file is a proposal only. No Supabase migration was applied.
- Eden repo already contains or proposes runtime scaffold concepts for workflow queue, workflow runs, approval gates, audit log, connector health, and metric snapshots.

## INFERRED
- The replica needs a normalized schema that can support both AUTO BUILDER and Eden without mixing execution and governance.

## COULD NOT VERIFY
- Existing production Supabase tables and RLS policies.
- Existing database naming conventions.

## BLOCKERS
- User forbids production Supabase writes.

## WORKAROUNDS
- Provide SQL proposal only.
- Require future migration approval and backup plan before apply.

## NEXT ACTIONS
1. Inspect live schema only if user approves read-only Supabase inspection.
2. Convert to migration after approval.

## Proposed Tables

```sql
-- PROPOSAL ONLY. DO NOT APPLY WITHOUT EXPLICIT APPROVAL.

create table if not exists openai_buildoff_runs (
  id uuid primary key default gen_random_uuid(),
  run_key text unique not null,
  branch_name text not null,
  mode text not null default 'branch_sandbox_only',
  production_mutation boolean not null default false,
  publishing_enabled boolean not null default false,
  deployment_enabled boolean not null default false,
  shopify_mutation_enabled boolean not null default false,
  heygen_training_enabled boolean not null default false,
  approval_required boolean not null default true,
  status text not null default 'draft',
  verdict text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists openai_buildoff_sources (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references openai_buildoff_runs(id),
  source_type text not null,
  title text not null,
  url_or_path text,
  verification_status text not null default 'unverified',
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists openai_buildoff_agents (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references openai_buildoff_runs(id),
  agent_key text not null,
  domain text not null,
  allowed_actions jsonb not null default '[]'::jsonb,
  approval_required_actions jsonb not null default '[]'::jsonb,
  blocked_actions jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists openai_buildoff_approval_gates (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references openai_buildoff_runs(id),
  action_key text not null,
  risk_level text not null,
  status text not null default 'blocked',
  required_evidence jsonb not null default '[]'::jsonb,
  rollback_plan text,
  created_at timestamptz not null default now()
);

create table if not exists openai_buildoff_validation_cases (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references openai_buildoff_runs(id),
  case_key text not null,
  expected_result text not null,
  actual_result text,
  status text not null default 'not_run',
  evidence jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists eden_studio_registries (
  id uuid primary key default gen_random_uuid(),
  registry_type text not null,
  registry_key text not null,
  payload jsonb not null default '{}'::jsonb,
  approval_status text not null default 'draft',
  public_use_allowed boolean not null default false,
  created_at timestamptz not null default now()
);
```
