# AI Avatar Media Agency Bootstrap

This repo is now structured as the operating shell for a fictional AI avatar media agency designed to sell through Shopify.

## Agency Objective

Build a governed, automation-ready media agency that can launch and operate 10 fictional adult AI avatar brands across content, commerce, lead capture, and service offers.

The agency sells through Shopify using four offer lanes:

- Avatar licenses
- Digital downloads
- Services
- Products and bundles

## Governance Boundary

All automation should remain approval-gated for public or commercial mutation.

No automation should perform these actions without explicit approval:

- Public publishing
- Shopify product, collection, price, discount, or inventory mutation
- Payment or checkout changes
- Production deploy promotion
- External ad spend changes

## Core Avatars

| Avatar | Role | Primary Commerce Lane |
| --- | --- | --- |
| Eden Skye | Founder avatar and premium host | Licenses, downloads, services, products |
| Solara Vane | Sales psychology avatar | Downloads, services, licenses |
| Liora Vale | Wellness and transformation avatar | Downloads, services, products |
| Nova Rain | AI fear-to-hope narrator | Downloads, services, licenses |
| Seraphina Quartz | Epoxy design muse | Downloads, services, products |
| Maya Velvet | Lifestyle commerce avatar | Products, downloads, licenses |
| Aria Stone | DIY authority avatar | Downloads, services, products |
| Celeste Noir | Luxury nightlife campaign avatar | Licenses, downloads |
| Isla Glass | Product demo and catalog avatar | Products, services, downloads |
| Ren Voss | Operations and systems avatar | Services, downloads, licenses |

## Supabase Tables

The agency schema adds:

- `avatar_profiles`
- `avatar_offers`
- `media_campaigns`
- `media_jobs`
- `agency_automation_receipts`

These extend the earlier operating tables:

- `leads`
- `content_queue`
- `agent_runs`
- `tool_receipts`
- `approval_requests`
- `social_posts`
- `media_assets`
- `shopify_sync_events`

## Vercel API Surfaces

The project exposes read/status surfaces for agency operations:

- `/api/agency/avatars`
- `/api/agency/offers`
- `/api/agency/automation`
- `/api/readiness`
- `/api/health`
- `/api/cron/readiness`
- `/api/social/drafts`
- `/api/workflows/eden-launch`

## Default Automation Loop

1. Readiness check
2. Trend and offer intake
3. Avatar-specific content concepting
4. Script and asset production
5. Social draft queue
6. Approval request
7. Scheduled publishing through connected scheduler
8. Shopify offer alignment
9. Analytics review
10. Clone winners and refill queue

## First Launch Milestone

Before production promotion, confirm:

- Vercel preview passes
- Supabase env vars are present
- `/api/agency/avatars` returns 10 avatar records
- `/api/agency/offers` returns planned offer records
- Drive command center is populated
- Shopify offer products and collections are approved before creation
- Public publishing remains approval-gated
