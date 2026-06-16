-- Reconciles remote Supabase migration 20260614083819_eden_black_card_entitlements_v2.

create extension if not exists pgcrypto;

create table if not exists public.eden_black_card_entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  email text,
  entitlement text not null default 'black_card_member',
  status text not null default 'active' check (status in ('active','revoked','expired','pending')),
  source text not null default 'shopify',
  shopify_order_id text,
  shopify_customer_id text,
  valid_until timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint eden_black_card_entitlements_identity check (user_id is not null or email is not null)
);

create unique index if not exists eden_black_card_entitlements_active_user_idx
  on public.eden_black_card_entitlements(user_id, entitlement)
  where status = 'active' and user_id is not null;

create unique index if not exists eden_black_card_entitlements_active_email_idx
  on public.eden_black_card_entitlements(lower(email), entitlement)
  where status = 'active' and email is not null;

alter table public.eden_black_card_entitlements enable row level security;

drop policy if exists "Members can read their own Black Card entitlement" on public.eden_black_card_entitlements;
create policy "Members can read their own Black Card entitlement"
  on public.eden_black_card_entitlements
  for select
  to authenticated
  using (
    auth.uid() = user_id
    or lower(coalesce(auth.jwt() ->> 'email', '')) = lower(coalesce(email, ''))
  );

create table if not exists public.eden_payment_handoffs (
  id uuid primary key default gen_random_uuid(),
  provider text not null default 'shopify',
  event text not null,
  email text,
  user_id uuid references auth.users(id) on delete set null,
  entitlement text not null default 'black_card_member',
  status text not null default 'received',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.eden_payment_handoffs enable row level security;

drop policy if exists "Members can read their own payment handoffs" on public.eden_payment_handoffs;
create policy "Members can read their own payment handoffs"
  on public.eden_payment_handoffs
  for select
  to authenticated
  using (
    auth.uid() = user_id
    or lower(coalesce(auth.jwt() ->> 'email', '')) = lower(coalesce(email, ''))
  );
