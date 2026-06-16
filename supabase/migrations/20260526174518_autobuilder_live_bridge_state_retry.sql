-- Reconciles remote Supabase migration 20260526174518_autobuilder_live_bridge_state_retry.
-- Production already records this migration. This file restores local version presence for Supabase branch-action source-truth checks.
-- No production database mutation is authorized by this repository-only repair.

select 1;
