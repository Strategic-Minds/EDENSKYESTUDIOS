-- Eden Skye Phase 3 Step 35 image install executor schema draft.
-- Do not apply to production without a separate live Supabase migration approval.

create table if not exists eden_image_install_requests (
  id uuid primary key default gen_random_uuid(),
  request_id text not null unique,
  mode text not null default 'dry_run' check (mode in ('dry_run', 'install')),
  status text not null default 'blocked' check (status in ('ready', 'blocked', 'installed', 'failed')),
  approval_receipt_id text,
  payload jsonb not null default '{}'::jsonb,
  errors jsonb not null default '[]'::jsonb,
  warnings jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists eden_image_install_assets (
  id uuid primary key default gen_random_uuid(),
  request_id text not null references eden_image_install_requests(request_id) on delete cascade,
  asset_id text not null,
  status text not null check (status in (
    'reference_board',
    'temporary_preview',
    'generated_pending_review',
    'approved_public',
    'rejected',
    'quarantined',
    'missing_asset'
  )),
  source_kind text not null,
  drive_target_folder_id text,
  supabase_bucket text,
  supabase_path text,
  action text not null default 'blocked',
  created_at timestamptz not null default now()
);

create index if not exists eden_image_install_assets_request_id_idx
  on eden_image_install_assets(request_id);

create index if not exists eden_image_install_assets_asset_id_idx
  on eden_image_install_assets(asset_id);
