-- Reconciles remote Supabase migration 20260614165418_eden_source_image_function_search_path.

create or replace function public.set_eden_source_image_asset_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_eden_source_image_asset_updated_at on public.eden_source_image_assets;
create trigger set_eden_source_image_asset_updated_at
before update on public.eden_source_image_assets
for each row
execute function public.set_eden_source_image_asset_updated_at();
