-- Eden Skye receipt compatibility migration.
-- Purpose: let governed runtime receipts work with older tool_receipts tables.
-- Apply to Supabase branches first. Production remains approval-gated.

alter table public.tool_receipts add column if not exists event_type text;
alter table public.tool_receipts add column if not exists actor text;
alter table public.tool_receipts add column if not exists status text;
alter table public.tool_receipts add column if not exists risk_level text;
alter table public.tool_receipts add column if not exists request_id text;
alter table public.tool_receipts add column if not exists target text;
alter table public.tool_receipts add column if not exists details jsonb not null default '{}'::jsonb;

alter table public.tool_receipts alter column connector set default 'eden-runtime';
alter table public.tool_receipts alter column receipt_json set default '{}'::jsonb;

update public.tool_receipts set connector = 'eden-runtime' where connector is null;
update public.tool_receipts set receipt_json = '{}'::jsonb where receipt_json is null;
update public.tool_receipts set event_type = coalesce(event_type, connector, 'legacy.receipt');
update public.tool_receipts set actor = coalesce(actor, 'Eden Skye Runtime');
update public.tool_receipts set status = coalesce(status, 'created');
update public.tool_receipts set risk_level = coalesce(risk_level, 'yellow');

alter table public.tool_receipts alter column event_type set not null;
alter table public.tool_receipts alter column actor set not null;
alter table public.tool_receipts alter column action set not null;
alter table public.tool_receipts alter column status set not null;
alter table public.tool_receipts alter column risk_level set not null;

create index if not exists tool_receipts_created_idx on public.tool_receipts(created_at desc, status);
