# Eden Content Builder OS Bridge

## Purpose
Eden Skye Studios is the content-production sibling of AUTO_BUILDER. AUTO_BUILDER builds governed systems. Eden Content Builder OS builds governed content systems.

## Core Mapping
| AUTO_BUILDER | Eden Content Builder OS |
|---|---|
| executive-intake | content objective intake |
| self-reflection | brand/safety/content fit check |
| discovery | trend, keyword, competitor, audience discovery |
| branding | avatar/faceless brand alignment |
| build-in-sandbox | draft content packet / media job creation |
| promote-source | approved prompt/config/source commit |
| promote-frontend | approved website/social/shopify draft |
| validate | QA, compliance, platform, monetization validation |
| audit | analytics, audit log, approval evidence |
| improve | learning memory, winner repurpose, next experiment |

## Eden Loop
Discover -> Research -> Score -> Match avatar/account -> Generate script/prompt -> Create media draft -> Validate -> Gate -> Draft schedule/post -> Analyze -> Learn -> Repurpose -> Monetize.

## Runtime Layers
- AUTO_BUILDER: governance and bridge rules.
- Eden Skye Agent: operations agent and content brain controller.
- GPT/OpenAI: reasoning, prompts, scripts, QA, analytics interpretation.
- n8n: 24/7 workflow harness.
- Vercel: runtime APIs, crons, and trigger endpoints.
- Supabase: memory, queues, approvals, analytics, and audit logs.
- GitHub: source artifacts.
- Drive: canon and assets.
- Metricool: social drafts and analytics.
- Shopify/Stripe: monetization gates.

## Default Autonomy
Level 1: draft-only. Live posting, paid generation, Shopify/Stripe writes, deployments, and schema changes require explicit Jeremy approval.

## Finalization Trigger
FINALIZE_EDEN_CONTENT_BUILDER_OS_DRY_RUN

This trigger prepares, validates, audits, and reports readiness. It does not go live.
