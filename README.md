# Eden Skye Studios

Eden Skye Studios is the source repo for the Eden Skye public website, Shopify-style storefront, Edens Closet member experience, approval control plane, and Xyla-ready content packet workflow.

This repo is the operating source of truth for the Eden Skye Studios website. Auto Builder is used as the factory and bridge guide, but the sandbox repo is not the source of truth for Eden Skye Studios.

## Start Here

Read these files before making changes:

1. `START_HERE.md` - first-run operating sequence for every agent.
2. `AGENTS.md` - repo-level execution rules and approval locks.
3. `docs/PLAN_MODE_BUILD_MODE.md` - mandatory to-do list format for every new task, workflow, system, or idea.
4. `docs/EDEN_SKYE_STUDIOS_CAPABILITIES.md` - current website, bridge, and connected-system capabilities.
5. `docs/SYSTEM_OPERATING_CONTRACT.md` - governance, receipts, and documentation-update requirements.
6. `docs/eden-auto-builder-capability-bridge.md` - bridge registry and Auto Builder alignment.
7. `docs/OPERATING_CHANGELOG.md` - running record of system changes.

## Mandatory Operating Rule

Every Eden Skye Studios work session must begin with previous-file analysis before implementation. Future agents should inspect the existing repo docs, relevant source files, and current capability records before proposing or changing anything material.

Every new task, system, workflow, content idea, automation, bridge, route, data model, or operating process must create or update a to-do list with two sections:

- Plan Mode: objective, context, dependencies, risks, approval gates, and acceptance criteria.
- Build Mode: implementation steps, validation receipts, documentation updates, and next actions.

Every material build must update the relevant docs before the work is called complete.

## Governance Locks

This repository stays governed by default:

- no production deploy without explicit approval
- no Shopify mutation without explicit approval
- no public publishing without explicit approval
- no payment, subscription, pricing, or discount change without explicit approval
- no live HeyGen/avatar/video-chat session without explicit approval
- no Supabase production migration or service-role write without explicit approval
- no Drive parent, sharing, delete, or destructive file move without explicit approval
- no destructive GitHub write, merge, force-push, delete, or production-triggering workflow without explicit approval

Approved preview, draft, read-only, and queue-first work is allowed when it preserves these locks.

## Current Website Scope

The live app is structured as:

- `/` public Eden Skye Studios Shopify-style storefront in the black/champagne Drive mockup direction
- `/login` member login portal preview for model selection and Edens Closet entry
- `/payment` Black Card payment page preview for future Shopify/Stripe checkout wiring
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

1. Eden Skye Studios presents the public fictional AI luxury creator brand and Black Card commerce path.
2. The payment page previews the Black Card checkout and remains non-live until Shopify/Stripe wiring is approved.
3. The login portal previews member authentication, model choice, and access into Edens Closet.
4. Edens Closet defines model, personality, wardrobe, pose, user profile, and safe boundaries.
5. The Xyla draft API packages hook, spoken line, visual prompt, caption, CTA, and channel variants.
6. GPT image creation can be used for lower-cost still/image drafting.
7. HeyGen is reserved for approved avatar, voice, and presenter-led video production.
8. Facebook, Instagram, X, TikTok, Pinterest, and Snapchat remain draft channels until publishing approval exists.
9. Shopify can be linked as the commerce destination later; the app does not mutate Shopify without approval.

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

The first application foundation includes:

- Next.js App Router template
- premium Eden Skye Studios storefront landing page
- login and payment preview pages
- Edens Closet model and content control room
- health and readiness APIs
- Supabase server client helpers
- launch workflow contract
- draft-only social bridge endpoint
- Vercel cron readiness route
- environment variable contract
- Supabase migration for core operating tables
- Auto Builder-aligned bridge documentation
- Plan Mode and Build Mode operating contract
