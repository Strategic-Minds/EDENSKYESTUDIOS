-- Reconciles remote Supabase migration 20260602002916_rename_epoxy_avatar_to_sera.
-- Production already records this migration. This file restores local version presence for Supabase branch-action source-truth checks.
-- No production database mutation is authorized by this repository-only repair.

select 1;
