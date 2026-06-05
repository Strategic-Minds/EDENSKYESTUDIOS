# SUPABASE_MEMORY_CONTRACT

## Purpose
Defines Supabase as the persistent operational memory layer.

## Required Tables (Scaffold)
- workflow_runs
- audit_log
- approvals
- trend_signals
- content_ideas
- scripts
- media_jobs
- media_assets
- publishing_queue
- analytics_snapshots
- ab_tests
- monetization_routes
- avatar_registry
- connector_health
- prompt_templates
- system_settings

## Principles
- RLS enabled.
- Service role for automation.
- Admin role for approved dashboard access.
- No public write access.
- Every write audited.

## States
proposed -> approved -> queued -> processing -> completed -> archived

## Gate
Schema files may be created. Schema application requires explicit approval.
