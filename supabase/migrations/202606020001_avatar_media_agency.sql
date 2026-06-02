create table if not exists public.avatar_profiles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  display_name text not null,
  agency_role text not null,
  brand_lane text not null,
  avatar_status text not null default 'concept' check (avatar_status in ('concept', 'production', 'launch-ready', 'live')),
  platform_safe_boundary text not null default 'Fictional adult AI avatar. Platform-safe, non-explicit, non-deceptive, consent-based brand media only.',
  persona_prompt text,
  visual_direction text,
  voice_direction text,
  primary_channels text[] not null default '{}',
  shopify_collection_handle text,
  heygen_avatar_id text,
  runway_reference_asset_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.avatar_offers (
  id uuid primary key default gen_random_uuid(),
  avatar_id uuid not null references public.avatar_profiles(id) on delete cascade,
  offer_type text not null check (offer_type in ('license', 'download', 'service', 'product')),
  title text not null,
  description text,
  price_cents integer check (price_cents is null or price_cents >= 0),
  currency text not null default 'USD',
  delivery_mode text not null default 'shopify' check (delivery_mode in ('shopify', 'manual', 'hybrid')),
  offer_status text not null default 'planned' check (offer_status in ('planned', 'draft', 'live', 'paused')),
  shopify_product_gid text,
  shopify_collection_gid text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media_campaigns (
  id uuid primary key default gen_random_uuid(),
  avatar_id uuid references public.avatar_profiles(id) on delete set null,
  campaign_name text not null,
  objective text not null,
  stage text not null default 'intake' check (stage in ('intake', 'script', 'asset', 'draft', 'approval', 'scheduled', 'live', 'review')),
  channels text[] not null default '{}',
  source_site text,
  shopify_cta text,
  approval_status text not null default 'needs_approval' check (approval_status in ('needs_approval', 'approved', 'rejected', 'published')),
  performance_goal jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media_jobs (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references public.media_campaigns(id) on delete cascade,
  avatar_id uuid references public.avatar_profiles(id) on delete set null,
  provider text not null check (provider in ('heygen', 'runway', 'descript', 'invideo', 'canva', 'adobe', 'manual')),
  job_type text not null,
  job_status text not null default 'planned' check (job_status in ('planned', 'queued', 'running', 'complete', 'failed', 'approved')),
  source_url text,
  output_url text,
  receipt_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.agency_automation_receipts (
  id uuid primary key default gen_random_uuid(),
  lane text not null,
  run_status text not null default 'queued' check (run_status in ('queued', 'running', 'complete', 'failed', 'blocked')),
  receipt_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.avatar_profiles enable row level security;
alter table public.avatar_offers enable row level security;
alter table public.media_campaigns enable row level security;
alter table public.media_jobs enable row level security;
alter table public.agency_automation_receipts enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'avatar_profiles' and policyname = 'Service role manages avatar profiles') then
    create policy "Service role manages avatar profiles" on public.avatar_profiles for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'avatar_offers' and policyname = 'Service role manages avatar offers') then
    create policy "Service role manages avatar offers" on public.avatar_offers for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'media_campaigns' and policyname = 'Service role manages media campaigns') then
    create policy "Service role manages media campaigns" on public.media_campaigns for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'media_jobs' and policyname = 'Service role manages media jobs') then
    create policy "Service role manages media jobs" on public.media_jobs for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'agency_automation_receipts' and policyname = 'Service role manages automation receipts') then
    create policy "Service role manages automation receipts" on public.agency_automation_receipts for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
  end if;
end $$;

insert into public.avatar_profiles (
  slug,
  display_name,
  agency_role,
  brand_lane,
  avatar_status,
  persona_prompt,
  visual_direction,
  voice_direction,
  primary_channels,
  shopify_collection_handle
) values
  ('eden-skye', 'Eden Skye', 'Founder avatar and premium host', 'Luxury AI creator, emotional intelligence, high-trust selling', 'launch-ready', 'Warm, composed fictional adult AI creator and brand operator.', 'Cinematic feminine luxury, refined sensual editorial, polished and platform-safe.', 'Warm, composed, intimate, strategic, soft authority.', array['Instagram','TikTok','Facebook','Shopify'], 'eden-skye'),
  ('solara-vane', 'Solara Vane', 'Sales psychology avatar', 'Confidence, conversion, founder motivation, launch persuasion', 'production', 'Premium sales mentor for ethical conversion and creator launch momentum.', 'Golden editorial lighting, confident luxury business styling, aspirational studio mood.', 'Smooth, direct, motivating, premium sales mentor.', array['TikTok','Instagram','Facebook'], 'solara-vane'),
  ('liora-vale', 'Liora Vale', 'Wellness and transformation avatar', 'Soft reset, healing, personal reinvention, calm self-belief', 'production', 'Nurturing transformation guide for calm confidence and personal renewal.', 'Soft luminous interiors, wellness editorial, silk textures, calm luxury.', 'Nurturing, slow, emotionally safe, quietly persuasive.', array['Instagram','TikTok','Pinterest'], 'liora-vale'),
  ('nova-rain', 'Nova Rain', 'AI fear-to-hope narrator', 'AI disruption, survival, adaptation, future skills', 'production', 'Clear future-skills narrator translating AI fear into practical adaptation.', 'Future noir, clean tech editorial, cool lighting, sharp contrast.', 'Clear, urgent, hopeful, intelligent, controlled intensity.', array['TikTok','Facebook','YouTube Shorts'], 'nova-rain'),
  ('seraphina-quartz', 'Seraphina Quartz', 'Epoxy design muse', 'Epoxy transformation, maker confidence, premium surfaces', 'production', 'Elegant maker muse for epoxy transformation, beauty, and confidence.', 'High-gloss resin, studio craft luxury, jewel tones, macro product beauty.', 'Elegant, encouraging, tactile, maker-focused.', array['Instagram','TikTok','Facebook','Shopify'], 'seraphina-quartz'),
  ('maya-velvet', 'Maya Velvet', 'Lifestyle commerce avatar', 'Aspirational routines, product desire, soft daily upgrades', 'concept', 'Lifestyle commerce guide for aspirational products and daily upgrades.', 'Velvet lounge, warm luxury, refined glamour, intimate lifestyle frames.', 'Friendly, magnetic, relaxed, softly seductive but safe.', array['Instagram','TikTok','Facebook'], 'maya-velvet'),
  ('aria-stone', 'Aria Stone', 'DIY authority avatar', 'Hands-on tutorials, tools, practical epoxy education', 'concept', 'Practical DIY educator for epoxy tutorials and beginner confidence.', 'Clean workshop, premium tools, practical closeups, bright confident framing.', 'Concise, useful, calm expert, beginner-friendly.', array['TikTok','Facebook','YouTube Shorts'], 'aria-stone'),
  ('celeste-noir', 'Celeste Noir', 'Luxury nightlife campaign avatar', 'High-status storytelling, desire, premium brand magnetism', 'concept', 'Luxury nightlife narrator for premium, tasteful, platform-safe campaign energy.', 'Nightlife editorial, black satin, city lights, cinematic restraint.', 'Low, elegant, mysterious, composed, premium.', array['Instagram','TikTok'], 'celeste-noir'),
  ('isla-glass', 'Isla Glass', 'Product demo and catalog avatar', 'Clear product explanation, demos, bundles, Shopify conversion', 'concept', 'Warm product presenter for Shopify demos, bundles, and purchase clarity.', 'Bright product studio, glassy surfaces, clean commerce visuals, premium catalog.', 'Clear, warm, practical, trust-building.', array['Facebook','Instagram','Shopify'], 'isla-glass'),
  ('ren-voss', 'Ren Voss', 'Operations and agency systems avatar', 'Automation, systems, creator workflow, behind-the-scenes authority', 'concept', 'Systems operator avatar explaining automation, workflows, and agency infrastructure.', 'Modern command center, clean dashboards, premium operator aesthetic.', 'Precise, composed, strategic, systems-minded.', array['Facebook','TikTok','LinkedIn'], 'ren-voss')
on conflict (slug) do update set
  display_name = excluded.display_name,
  agency_role = excluded.agency_role,
  brand_lane = excluded.brand_lane,
  avatar_status = excluded.avatar_status,
  persona_prompt = excluded.persona_prompt,
  visual_direction = excluded.visual_direction,
  voice_direction = excluded.voice_direction,
  primary_channels = excluded.primary_channels,
  shopify_collection_handle = excluded.shopify_collection_handle,
  updated_at = now();

insert into public.avatar_offers (avatar_id, offer_type, title, description, price_cents, delivery_mode, offer_status)
select id, 'license', display_name || ' Avatar License', 'Commercial license package for fictional AI avatar media usage, scripts, persona guardrails, and production direction.', null, 'shopify', 'planned'
from public.avatar_profiles
on conflict do nothing;

insert into public.media_campaigns (avatar_id, campaign_name, objective, stage, channels, source_site, shopify_cta, approval_status, performance_goal)
select id,
  display_name || ' 30-Day Launch Track',
  'Produce platform-safe short-form content that drives attention to Shopify licenses, downloads, services, and products.',
  'intake',
  primary_channels,
  case when slug in ('seraphina-quartz','aria-stone') then 'epoxywillchangeyourlife.com' else 'aicantdothis.net' end,
  '/collections/' || shopify_collection_handle,
  'needs_approval',
  jsonb_build_object('monthlyFollowerTarget', 10000, 'budgetRange', '$1000-$2000', 'primaryMetric', 'qualified leads and store clicks')
from public.avatar_profiles
on conflict do nothing;
