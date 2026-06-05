# Eden Skye Studios End-to-End Workflow Lock

## Status
SCAFFOLD_ONLY / GOVERNED IMPLEMENTATION PREP.

This document locks the integration contract between Drive, GitHub, Supabase, Vercel, n8n, Shopify, Metricool, GPT Business, AUTO_BUILDER, and the existing Eden Skye Agent.

## Authority Chain
1. Jeremy human approval gates
2. AUTO_BUILDER governance
3. Eden Skye Studios Drive canon
4. EDENSKYESTUDIOS GitHub repo
5. Supabase operational memory
6. Vercel runtime and webhooks
7. n8n workflow harness
8. Connected execution apps

## Core Roles
- GPT Business / Eden Skye Agent: brain, reasoning, content decisions, scoring, prompts, strategy, QA, analytics interpretation.
- AUTO_BUILDER: governance, bridge rules, validation, audit, continuity.
- n8n: 24/7 wiring harness, triggers, retries, app routing, dry-run workflow movement.
- Vercel: secure API/runtime layer, webhook routes, cron endpoints, admin gate stubs.
- Supabase: queues, memory, approvals, workflow state, analytics, errors, audit logs.
- GitHub: source code, workflow docs, configs, schemas, prompts, scaffold scripts.
- Google Drive: brand canon, source assets, generated assets, approvals, exports, evidence.
- Shopify / Stripe: monetization and checkout after approval.
- Metricool: draft scheduling and analytics after approval.
- Canva / Adobe / HeyGen / Runway / Xyla / Higgsfield handoff: media/design execution after approval.

## Default Runtime Mode
- dry_run=true
- draft_only=true
- require_human_approval=true
- autopublish_enabled=false
- media_generation_enabled=false unless explicitly approved
- shopify_write_enabled=false unless explicitly approved
- stripe_write_enabled=false unless explicitly approved
- supabase_schema_apply_enabled=false unless explicitly approved
- vercel_deploy_enabled=false unless explicitly approved

## Operating Loop
Research discovery -> reverse engineering -> topic scoring -> avatar/faceless matching -> content packet -> approval gate -> creative/media draft -> asset QA -> Metricool draft -> final publish gate -> analytics capture -> learning memory -> winner repurpose -> monetization routing.

## Human Gate Rule
Jeremy should only review gates, blockers, revenue opportunities, safety exceptions, and autonomy upgrades. The system should do the repetitive movement and documentation.

## Forbidden Without Exact Approval
No production deploys, Supabase schema apply, Shopify/Stripe writes, live posting, live scheduling, paid media batches, billing changes, Drive canon deletion/move, governance/source-truth overwrite, or unsafe content generation.
