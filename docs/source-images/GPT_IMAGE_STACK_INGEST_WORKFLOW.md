# GPT Image Stack Ingest Workflow

## Purpose

Every image created by GPT, Eden AI, the editor, or a connected image/video agent must enter the Eden Image Stack before it is used anywhere else.

The Image Stack is the visual approval control plane for Eden Skye Studios. It is the place where generated assets become traceable records with filenames, source prompts, Drive locations, QA scores, approval colors, and manifest slots.

## Live Surfaces

- Production editor: https://edenskyestudios.vercel.app/eden-source-images
- Production image stack: https://edenskyestudios.vercel.app/eden-source-images/image-stack
- Title normalization plan: https://edenskyestudios.vercel.app/api/eden/source-images/title-normalization-plan
- Drive approval map: https://edenskyestudios.vercel.app/api/eden/source-images/drive-approval-map

## Required Ingest Rule

No generated image should skip the stack.

All generated images must follow this path:

1. Generate image draft through Eden/GPT/editor.
2. Create an asset record.
3. Assign a proposed system filename.
4. Store the binary in an approved storage lane.
5. Add a Drive receipt or Drive file ID when available.
6. Add or update the Supabase asset record when database write is approved.
7. Surface the image inside Image Stack.
8. Assign approval color: green, yellow, or red.
9. Match to manifest slot or mark as unassigned upload.
10. Promote only after QA and approval are clean.

## Asset Record Contract

Each image record must include:

- asset_id
- old_title, when applicable
- proposed_title
- final_title
- source_prompt
- production_prompt
- generation_model
- provider
- status
- approval_color
- approval_folder
- qa_score
- qa_min_score
- manifest_slot
- drive_file_id
- drive_folder_id
- storage_url
- thumbnail_url
- created_by
- created_at
- updated_at
- receipt_notes

## Approval Folders

- Drafts: image exists but has not been reviewed.
- Needs Review: visual QA or manifest matching is needed.
- Approved: admin approved for use.
- Rejected: blocked, poor quality, wrong identity, unsafe, or not useful.
- Drive Ready: approved and ready for Drive handoff/install packet.

## Approval Colors

- Green: verified, approved, or ready.
- Yellow: needs QA, matching, naming, Drive file ID, or approval.
- Red: blocked, unsafe, rejected, missing source truth, or not allowed.

## Drive Notation

Drive should remain the file source-of-truth for image binaries when possible.

Drive receipt fields:

- drive_file_id
- drive_folder_id
- drive_path
- uploaded_filename
- proposed_system_filename
- approval_folder
- approval_color
- manifest_slot
- qa_score
- operator_email
- receipt_created_at

Primary Drive root:

- `1oCEjD6kUm9FiYDh1w-dNE9PPiggj65MQ`

Approval control folder:

- `1EMnjZKTBT4wlO0ZgR5F6tXDKV1dvK76x`

TEMP IMAGES folder:

- `1RZVPpvAhrBikTLJ2rwIOVedfwoTqpAsE`

## GitHub Notation

This file is the GitHub workflow note for image ingest. Code changes that affect image generation, upload, approval state, title normalization, or Image Stack display must update this document or cite it in the PR.

PR and issue notes should include:

- images generated
- images uploaded
- images rejected
- manifest slots matched
- Drive IDs captured
- Supabase records written
- remaining blockers

## Supabase Notation

Supabase should become the structured state layer after migration approval.

Recommended tables:

- `eden_source_assets`
- `eden_source_asset_events`

Recommended storage bucket:

- `eden-source-images`

Database writes remain approval-gated until the migration is explicitly approved.

## Proposed Supabase Schema

```sql
create table if not exists public.eden_source_assets (
  id uuid primary key default gen_random_uuid(),
  old_title text,
  proposed_title text not null,
  final_title text,
  source_prompt text,
  production_prompt text,
  generation_model text,
  provider text,
  status text not null default 'draft',
  approval_color text not null default 'yellow',
  approval_folder text not null default 'Drafts',
  qa_score integer,
  qa_min_score integer default 90,
  manifest_slot text,
  drive_file_id text,
  drive_folder_id text,
  storage_url text,
  thumbnail_url text,
  created_by text,
  receipt_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.eden_source_asset_events (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid references public.eden_source_assets(id) on delete cascade,
  event_type text not null,
  event_payload jsonb not null default '{}'::jsonb,
  created_by text,
  created_at timestamptz not null default now()
);

alter table public.eden_source_assets enable row level security;
alter table public.eden_source_asset_events enable row level security;
```

RLS policies must be added to match the final admin auth model before exposing this through client-side APIs.

## Current Governance

Allowed now:

- Generate workflow packets.
- Show generated image records in editor state.
- Prepare Drive receipts.
- Prepare Supabase migration.
- Store GitHub workflow notation.

Blocked without explicit approval:

- Live Supabase migration.
- Production database writes.
- Destructive Drive moves or deletes.
- Publishing images to public pages.
- Promoting PR #8 image install executor before manifest matching is clean.

## Next Implementation Target

Add an ingest endpoint:

- `POST /api/eden/source-images/ingest-generated`

The endpoint should accept:

- image binary or image URL
- prompt metadata
- proposed filename
- generation model
- manifest slot hint
- approval folder

It should return:

- asset_id
- title plan
- storage status
- Drive receipt status
- Supabase status
- Image Stack visibility status
