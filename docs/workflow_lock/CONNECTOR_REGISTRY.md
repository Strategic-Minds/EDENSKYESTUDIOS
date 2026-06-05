# CONNECTOR_REGISTRY

## Status
SCAFFOLD_ONLY / COMMITTED SOURCE ARTIFACT.

## Purpose
Registry for all Eden Skye Studios workflow connectors and their governed operating mode.

## Connector Table
| Layer | Connector | Role | Default Mode | Write Allowed Without Jeremy Approval |
|---|---|---|---|---|
| Brain | OpenAI Platform / GPT Business | Reasoning, prompts, QA, strategy | draft_only | No |
| Orchestration | n8n | Triggering, routing, retries, dry-run execution | dry_run | No |
| Runtime | Vercel | Webhooks, API routes, cron endpoints | inspect/scaffold | No |
| Memory | Supabase | Queues, approvals, logs, analytics state | schema_proposed | No |
| Canon | Google Drive | Brand canon, source assets, approvals, exports | read/write additive only | No destructive writes |
| Source | GitHub | Docs, contracts, code, migrations, workflows | additive commits | Yes, additive docs/scaffolds only |
| Commerce | Shopify | Draft products, offers, collections, checkout routes | draft_only | No |
| Payments | Stripe | Products, prices, links, invoices | draft_or_read_only | No |
| Social Planning | Metricool | Draft scheduling, analytics, best-time scoring | draft_only | No live publish |
| Design | Canva / Adobe Express | Editable creatives, templates, brand assets | draft_only | No publish |
| Video | HeyGen / Runway / Xyla / Higgsfield | Avatar/faceless media generation | approval_required | No |
| CRM/Email | HubSpot / Klaviyo | CRM, lists, campaign drafts, reporting | read/draft_only | No |

## Credential Handling
- Secrets must never be committed.
- Environment variables belong in n8n, Vercel, Supabase, or connector secret stores.
- API keys must be rotated if exposed.

## Required Verification Fields
Each connector must eventually have:
- owner
- auth status
- test endpoint/action
- last verified time
- failure mode
- rollback path

## Gate
A connector is READY only after a live read test and, for write-capable systems, a safe draft-only write test.
