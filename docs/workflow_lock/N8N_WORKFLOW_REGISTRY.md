# N8N_WORKFLOW_REGISTRY

## Status
SCAFFOLD_ONLY / COMMITTED SOURCE ARTIFACT.

## Purpose
Defines the governed n8n workflow map for Eden Skye Studios 24/7 automation.

## Operating Principle
n8n is the wiring harness. GPT is the reasoning brain. Supabase is the memory and queue. Metricool, Shopify, Stripe, Drive, GitHub, and media tools are execution limbs.

## Workflow Registry
| ID | Workflow | Trigger | Output | Default Mode | Approval Gate |
|---|---|---|---|---|---|
| WF-001 | Trend Discovery | schedule/webhook | trend candidates | dry_run | none |
| WF-002 | Audience Research | schedule/manual | audience briefs | dry_run | none |
| WF-003 | Idea Scoring | Supabase insert | scored ideas | dry_run | score threshold |
| WF-004 | Script Generation | approved idea | scripts/hooks/captions | draft_only | content approval |
| WF-005 | Safety QA | generated content | pass/fail/rewrite | enforce | required |
| WF-006 | Avatar Assignment | approved script | avatar/content pairing | draft_only | new-avatar approval |
| WF-007 | Media Generation Routing | approved creative | HeyGen/Runway/Canva job | draft_only | spend + identity |
| WF-008 | Asset Storage | completed media | Drive asset record | additive | destructive changes blocked |
| WF-009 | Social Draft Scheduling | approved asset | Metricool draft | draft_only | publish approval |
| WF-010 | Commerce Offer Drafting | approved monetization idea | Shopify/Stripe drafts | draft_only | price/offer approval |
| WF-011 | Analytics Intake | schedule | performance records | read_only | none |
| WF-012 | A/B Test Analyzer | analytics update | winners/losers | dry_run | repost approval |
| WF-013 | Repost Repurpose Router | winning content | derivative drafts | draft_only | content approval |
| WF-014 | Lead Capture Sync | Shopify/Klaviyo/HubSpot events | lead records | read/draft | outreach approval |
| WF-015 | Daily Executive Report | schedule | report artifact | read_only | none |
| WF-016 | Kill Switch Listener | Slack/webhook/manual | global pause/resume state | enforce | Jeremy only |
| WF-017 | Readiness Validator | schedule/manual | layer readiness score | read_only | none |

## Required n8n Standards
- Every workflow must support dry_run=true.
- Every workflow must write audit events to Supabase.
- Every external write must include idempotency key or duplicate guard.
- Every publish, payment, product activation, spend, or irreversible action requires explicit approval.
- Every workflow must include error handling, retry policy, and dead-letter routing.

## Naming Convention
eden_<layer>_<workflow_name>_v1

## Gate
Workflow is READY only when: trigger tested, dry-run tested, audit row recorded, failure route tested, and approval policy attached.
