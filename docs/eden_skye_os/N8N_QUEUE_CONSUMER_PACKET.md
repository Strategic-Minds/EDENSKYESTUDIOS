# EDEN SKYE OS n8n Queue Consumer Packet

## Purpose
Defines the n8n consumer that polls Supabase/GitHub bridge queues and routes approved EDEN SKYE OS work.

## Default Mode
- dry_run=true
- draft_only=true
- require_human_approval=true

## Consumer Responsibilities
1. Poll eden_workflow_queue or `.eden/bridge-requests`.
2. Validate workflow_key against whitelist.
3. Check kill-switch state.
4. Check approval gate status.
5. Route to OpenAI/GPT, Vercel, Metricool, Shopify draft, media draft, or analytics workflow.
6. Write workflow result.
7. Write audit log.
8. Notify Slack/Gmail only on blockers, gates, or failures.

## Whitelisted Workflows
- discovery_pass
- reverse_engineering_pass
- content_packet_create
- media_job_request
- metricool_draft_request
- shopify_draft_request
- analytics_ingest
- readiness_audit

## Forbidden Without Explicit Approval
Publishing, live scheduling, paid media generation, Shopify activation, Stripe activation, schema application, Vercel production deploy, billing changes.
