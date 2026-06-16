# Eden Skye Studios

Eden Skye Studios is the source repo for the Eden Skye Vercel app surfaces: Edens Closet, login/member experience, admin/control plane, AI chat, content workflow, and bridge APIs.

The public Shopify page is the black/champagne website mockup shown in Drive: `EDENSKYEWEBSITEV2.png`. Shopify should own that public commerce page. Vercel should own Edens Closet and the private app/control experience.

Auto Builder is used as the factory and bridge guide, but the sandbox repo is not the source of truth for Eden Skye Studios.

## Drive Canon And Cross-System Stack

Managed Eden OS Drive canon:
https://drive.google.com/drive/folders/1oCEjD6kUm9FiYDh1w-dNE9PPiggj65MQ

Parent enterprise command folder:
https://drive.google.com/drive/folders/13uLhv0NRhmdCdJCCLrroLzyRRttoXtpr

Cross-system canon mirrors live under `docs/canon/` in this repo and in `Strategic-Minds/AUTO_BUILDER`:

- `docs/canon/MASTER_CANON_INDEX.md`
- `docs/canon/BUSINESS_OPERATING_PLAN.md`
- `docs/canon/BUSINESS_GROWTH_STRATEGY.md`
- `docs/canon/FINANCIAL_SYSTEM_PLAN.md`
- `docs/canon/AUTOMATION_AUTONOMY_ROADMAP.md`
- `docs/canon/DISCOVERY_VALIDATION_PLAN.md`
- `docs/canon/OPERATIONS_24_7_RUNBOOK.md`
- `docs/canon/CROSS_SYSTEM_DOCUMENTATION_SYNC_POLICY.md`

## Start Here

Read these files before making changes:

1. `START_HERE.md` - first-run operating sequence for every agent.
2. `AGENTS.md` - repo-level execution rules and approval locks.
3. `docs/canon/MASTER_CANON_INDEX.md` - Drive/repo source-truth map and canon ownership.
4. `docs/canon/CROSS_SYSTEM_DOCUMENTATION_SYNC_POLICY.md` - rules for keeping Drive and repos aligned.
5. `docs/PLAN_MODE_BUILD_MODE.md` - mandatory to-do list format for every new task, workflow, system, or idea.
6. `docs/EDEN_SHOPIFY_CLOSET_SPLIT_ARCHITECTURE.md` - corrected split: Shopify page plus Vercel Closet.
7. `docs/AUTO_BUILDER_SITE_COMPLETION_PACKET.md` - Auto Builder packet for the corrected architecture.
8. `docs/SHOPIFY_GIT_LINKING_RUNBOOK.md` - Shopify GitHub theme path and Vercel app routing.
9. `docs/SITE_FINISH_NOW_CHECKLIST.md` - Shopify page, Vercel app, routing, preview, and approval checklist.
10. `docs/EDEN_SKYE_STUDIOS_CAPABILITIES.md` - current website, bridge, and connected-system capabilities.
11. `docs/SYSTEM_OPERATING_CONTRACT.md` - governance, receipts, and documentation-update requirements.
12. `docs/eden-auto-builder-capability-bridge.md` - bridge registry and Auto Builder alignment.
13. `docs/OPERATING_CHANGELOG.md` - running record of system changes.

## Mandatory Operating Rule

Every Eden Skye Studios work session must begin with previous-file analysis before implementation. Future agents should inspect the existing repo docs, relevant source files, current capability records, and cross-system canon docs before proposing or changing anything material.

Every new task, system, workflow, content idea, automation, bridge, route, data model, or operating process must create or update a to-do list with two sections:

- Plan Mode: objective, context, dependencies, risks, approval gates, and acceptance criteria.
- Build Mode: implementation steps, validation receipts, documentation updates, and next actions.

Every material build must update the relevant docs before the work is called complete.

## Correct Launch Architecture

Shopify owns the public commerce website:

- Drive mockup: `EDENSKYEWEBSITEV2.png`
- Store: `eden-skye-studios.myshopify.com`
- Surfaces: home page, products, collections, memberships, downloads, licenses, services, checkout
- Required path: create a Shopify theme-compatible branch/repo before using Shopify GitHub theme integration

Vercel owns Edens Closet and app/control surfaces:

- Vercel project id: `prj_mtmJQYYqRodNnH2UrDqwaK2MHgoA`
- Surfaces: `/closet`, `/login`, `/admin`, `/admin/eden`, AI chat, video-chat readiness, model changing-room, Xyla/content packets, bridge APIs
- Production deploy stays locked until approval

Do not connect the current Next.js branch directly as a Shopify theme. Shopify GitHub theme integration requires Shopify theme structure.

## Governance Locks

This repository stays governed by default:

- no production deploy without explicit approval
- no Shopify mutation without explicit approval
- no Shopify theme publish without explicit approval
- no public publishing without explicit approval
- no payment, subscription, pricing, or discount change without explicit approval
- no live HeyGen/avatar/video-chat session without explicit approval
- no Supabase production migration or service-role write without explicit approval
- no Drive parent, sharing, delete, or destructive file move without explicit approval
- no destructive GitHub write, merge, force-push, delete, or production-triggering workflow without explicit approval

Approved preview, draft, read-only, and queue-first work is allowed when it preserves these locks.

## Current Vercel App Scope

The Vercel app is structured as:

- `/login` member login portal preview for model selection and Edens Closet entry
- `/closet` Edens Closet model changing-room and admin control surface
- `/admin/eden` route alias into Edens Closet for the older mockup handoff path
- `/admin` approval/media operations console
- `/api/eden/chat` governed Eden chat runtime
- `/api/closet/session` draft-only Closet session builder
- `/api/xyla/draft` draft-only Xyla video packet builder
- `/api/readiness` readiness and lock status
- `/api/cron/eden-media-preview` Vercel cron readiness trigger
- `/api/bridge/registry` local capability registry
- `/api/bridge/stack-readiness` stack readiness surface
- `/api/bridge/drive-move` queue-first Drive move bridge
- `/api/bridge/github-move` queue-first GitHub move bridge
- `/api/bridge/vercel-preview` preview-only Vercel bridge packet

## Shopify Page Scope

The Shopify public page should implement the Drive mockup:

- Creator Experience hero
- Chat / Video Chat / Downloads / Licenses / Membership feature rail
- Creator card row
- Popular Downloads
- Top Products
- Premium Services
- Trust/footer strip
- Product, license, download, membership, and checkout paths
- Approved links into Vercel for private Edens Closet access

## Auto Builder Cloud Bridge

Auto Builder provides the broader cloud bridge layer for Eden runtime operations:

- `GET /api/bridge/eden/runtime` - universal runtime readiness
- `POST /api/bridge/eden/runtime` - governed read, queue, write, and execute router
- `GET /api/bridge/github/workflows` - GitHub workflow bridge readiness and discovery
- `POST /api/bridge/github/workflows` - governed workflow listing, dispatch, run, job, and log operations
- `POST /api/bridge/vercel/redeploy` - governed Vercel redeploy bridge
- `POST /api/bridge/vercel/eden-preview` - preview-only Eden Skye Studios Vercel deployment bridge

Production deploys remain locked unless the user gives the exact required approval phrase through the governed bridge.

## Strategic Flow

1. Shopify presents the public fictional AI luxury creator brand and Black Card commerce path.
2. Shopify owns product, collection, membership, download, license, service, and checkout surfaces.
3. Vercel owns Edens Closet, login, model changing-room, AI chat, and video-chat readiness.
4. Shopify routes approved private/member actions into Vercel `/login` or `/closet`.
5. Xyla draft API packages hook, spoken line, visual prompt, caption, CTA, and channel variants.
6. GPT image creation can be used for lower-cost still/image drafting.
7. HeyGen is reserved for approved avatar, voice, and presenter-led video production.
8. Facebook, Instagram, X, TikTok, Pinterest, and Snapchat remain draft channels until publishing approval exists.

## Environment Contract

Core repo runtime variables:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` for approved server-side writes only
- `EDEN_RUNTIME_BRIDGE_TOKEN` for governed runtime bridge writes/executes
- `GITHUB_WORKFLOW_TOKEN` or `GITHUB_TOKEN` for GitHub workflow operations
- `VERCEL_TOKEN`
- `EDEN_SKYE_VERCEL_PROJECT_ID=prj_mtmJQYYqRodNnH2UrDqwaK2MHgoA`
- `VERCEL_TEAM_ID` when the Vercel project is team-scoped
- `SHOPIFY_ADMIN_TOKEN` and `SHOPIFY_SHOP` only after Shopify mutation approval
- `HEYGEN_API_KEY` only for approved avatar/video generation work

## Bootstrap Scope

The current foundation includes:

- Next.js App Router Vercel app
- Edens Closet model and content control room
- login and payment preview pages
- admin/media operations console
- health and readiness APIs
- Supabase server client helpers
- launch workflow contract
- draft-only social bridge endpoint
- Vercel cron readiness route
- environment variable contract
- Supabase migration for core operating tables
- Auto Builder-aligned bridge documentation
- Plan Mode and Build Mode operating contract
- corrected Shopify/Vercel split architecture
- Shopify Git linking runbook
- site finish-now checklist
- cross-system autonomous-growth canon stack
