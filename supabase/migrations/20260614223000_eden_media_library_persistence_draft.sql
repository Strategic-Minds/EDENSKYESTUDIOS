-- Eden Media Library Persistence Draft
-- Status: DRAFT ONLY. Do not apply to production until operator approval, project confirmation,
-- RLS review, storage policy review, and rollback plan are complete.
-- Purpose: move Eden admin uploads/generated assets toward site storage instead of Drive-first handling.

create extension if not exists pgcrypto;

create table if not exists public.media_portfolios (
  id uuid primary key default gen_random_uuid(),
  portfolio_key text not null unique,
  display_name text not null,
  portfolio_type text not null check (portfolio_type in ('female', 'male', 'international', 'faceless')),
  approved_model_id text,
  source_manifest_slot text,
  approval_color text not null default 'yellow' check (approval_color in ('green', 'yellow', 'red')),
  approval_status text not null default 'needs_review',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  portfolio_id uuid references public.media_portfolios(id) on delete set null,
  asset_kind text not null check (asset_kind in ('source_image', 'generated_image', 'uploaded_image', 'video', 'prompt_pack', 'content_draft')),
  filename text not null,
  storage_bucket text,
  storage_path text,
  public_url text,
  original_drive_file_id text,
  prompt text,
  model_provider text,
  model_name text,
  qa_score numeric(5,2),
  approval_color text not null default 'yellow' check (approval_color in ('green', 'yellow', 'red')),
  approval_status text not null default 'needs_review',
  manifest_slot text,
  receipt jsonb not null default '{}'::jsonb,
  created_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media_variants (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid not null references public.media_assets(id) on delete cascade,
  variant_kind text not null check (variant_kind in ('thumbnail', 'crop', 'upscale', 'edit', 'platform_export')),
  filename text not null,
  storage_bucket text not null,
  storage_path text not null,
  width integer,
  height integer,
  qa_score numeric(5,2),
  approval_color text not null default 'yellow' check (approval_color in ('green', 'yellow', 'red')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.media_videos (
  id uuid primary key default gen_random_uuid(),
  portfolio_id uuid references public.media_portfolios(id) on delete set null,
  source_asset_id uuid references public.media_assets(id) on delete set null,
  title text not null,
  script text,
  heygen_avatar_id text,
  heygen_video_id text,
  storage_bucket text,
  storage_path text,
  approval_color text not null default 'yellow' check (approval_color in ('green', 'yellow', 'red')),
  approval_status text not null default 'draft',
  receipt jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.content_drafts (
  id uuid primary key default gen_random_uuid(),
  portfolio_id uuid references public.media_portfolios(id) on delete set null,
  source_asset_id uuid references public.media_assets(id) on delete set null,
  channel text,
  draft_type text not null check (draft_type in ('hook', 'caption', 'script', 'calendar_item', 'carousel', 'email', 'site_copy')),
  title text not null,
  body text not null,
  scheduled_for timestamptz,
  approval_color text not null default 'yellow' check (approval_color in ('green', 'yellow', 'red')),
  approval_status text not null default 'draft',
  receipt jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.approval_receipts (
  id uuid primary key default gen_random_uuid(),
  subject_type text not null check (subject_type in ('portfolio', 'asset', 'variant', 'video', 'content_draft', 'export_batch')),
  subject_id uuid,
  gate_color text not null check (gate_color in ('green', 'yellow', 'red')),
  gate_name text not null,
  decision text not null check (decision in ('approved', 'needs_review', 'rejected', 'blocked')),
  operator_email text,
  evidence jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists media_portfolios_type_idx on public.media_portfolios(portfolio_type);
create index if not exists media_assets_portfolio_idx on public.media_assets(portfolio_id);
create index if not exists media_assets_manifest_idx on public.media_assets(manifest_slot);
create index if not exists media_assets_approval_idx on public.media_assets(approval_color, approval_status);
create index if not exists media_variants_asset_idx on public.media_variants(asset_id);
create index if not exists media_videos_portfolio_idx on public.media_videos(portfolio_id);
create index if not exists content_drafts_portfolio_idx on public.content_drafts(portfolio_id);
create index if not exists approval_receipts_subject_idx on public.approval_receipts(subject_type, subject_id);

alter table public.media_portfolios enable row level security;
alter table public.media_assets enable row level security;
alter table public.media_variants enable row level security;
alter table public.media_videos enable row level security;
alter table public.content_drafts enable row level security;
alter table public.approval_receipts enable row level security;

-- Admin-safe baseline: authenticated users can read draft/admin records only after app auth is connected.
-- Public/anon writes are intentionally not granted.
drop policy if exists "media portfolios authenticated read" on public.media_portfolios;
create policy "media portfolios authenticated read" on public.media_portfolios
  for select to authenticated using (true);

drop policy if exists "media assets authenticated read" on public.media_assets;
create policy "media assets authenticated read" on public.media_assets
  for select to authenticated using (true);

drop policy if exists "media variants authenticated read" on public.media_variants;
create policy "media variants authenticated read" on public.media_variants
  for select to authenticated using (true);

drop policy if exists "media videos authenticated read" on public.media_videos;
create policy "media videos authenticated read" on public.media_videos
  for select to authenticated using (true);

drop policy if exists "content drafts authenticated read" on public.content_drafts;
create policy "content drafts authenticated read" on public.content_drafts
  for select to authenticated using (true);

drop policy if exists "approval receipts authenticated read" on public.approval_receipts;
create policy "approval receipts authenticated read" on public.approval_receipts
  for select to authenticated using (true);

-- Service/admin writes should be performed by server-side routes only, never browser clients.
-- If role claims are later added, replace these with app_metadata-based admin policies.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('eden-images', 'eden-images', false, 52428800, array['image/png', 'image/jpeg', 'image/webp', 'image/gif']),
  ('eden-videos', 'eden-videos', false, 524288000, array['video/mp4', 'video/webm', 'video/quicktime']),
  ('eden-generated', 'eden-generated', false, 52428800, array['image/png', 'image/jpeg', 'image/webp', 'application/json', 'text/plain'])
on conflict (id) do nothing;

-- Storage policies intentionally allow authenticated reads only. Upload/write policies should be added
-- after the admin auth model is confirmed so browser users cannot write directly into production buckets.
drop policy if exists "eden images authenticated read" on storage.objects;
create policy "eden images authenticated read" on storage.objects
  for select to authenticated using (bucket_id = 'eden-images');

drop policy if exists "eden videos authenticated read" on storage.objects;
create policy "eden videos authenticated read" on storage.objects
  for select to authenticated using (bucket_id = 'eden-videos');

drop policy if exists "eden generated authenticated read" on storage.objects;
create policy "eden generated authenticated read" on storage.objects
  for select to authenticated using (bucket_id = 'eden-generated');
