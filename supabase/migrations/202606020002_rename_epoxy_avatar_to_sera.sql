-- Rename the epoxy-focused avatar from Seraphina Quartz to Sera.
-- This preserves future fresh installs while keeping the final operating handle short and campaign-ready.

update public.avatar_profiles
set
  slug = 'sera',
  display_name = 'Sera',
  shopify_collection_handle = 'sera',
  updated_at = now()
where slug = 'seraphina-quartz';

update public.avatar_offers
set
  title = replace(title, 'Seraphina Quartz', 'Sera'),
  updated_at = now()
where avatar_id in (
  select id from public.avatar_profiles where slug = 'sera'
);

update public.media_campaigns
set
  campaign_name = replace(campaign_name, 'Seraphina Quartz', 'Sera'),
  source_site = 'epoxywillchangeyourlife.com',
  shopify_cta = '/collections/sera',
  updated_at = now()
where avatar_id in (
  select id from public.avatar_profiles where slug = 'sera'
);
