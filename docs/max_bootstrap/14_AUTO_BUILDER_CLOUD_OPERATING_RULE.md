# Auto Builder Cloud Operating Rule

Status: draft-only sandbox rule  
Owner: Eden Skye / Auto Builder control plane  
Target repo: Strategic-Minds/EDENSKYESTUDIOS

## Rule

Eden Skye Studios builds must run through the Auto Builder factory workflow and Vercel cloud validation path. Local files are scratch only and are never the source of truth for Jeremy's build.

## Required Build Path

1. Auto Builder control plane defines the build packet.
2. Sandbox lane receives additive app, route, asset, agent, cron, and validation changes.
3. GitHub PR captures the source change.
4. Vercel preview validates the website and API routes.
5. Cloud validation workflow checks scaffold, gates, and activation markers.
6. Promotion requires explicit human approval.

## Active Surfaces

- Storefront: `/`
- Brand-pack mockup: `/mockup`
- Admin control plane: `/admin/eden`
- AI Gateway chat: `/api/eden/chat`
- Gate state: `/api/eden/gates`
- Factory readiness: `/api/factory/readiness`
- Build packet: `/api/factory/build-packet`
- Readiness cron: `/api/cron/factory-readiness`
- Passive improvement cron: `/api/cron/reverse-engineering-passive`

## Cloud Stack

- Auto Builder repo: `Strategic-Minds/AUTO_BUILDER`
- Sandbox repo: `Strategic-Minds/SANDBOX`
- Frontend repo: `Strategic-Minds/FRONTEND`
- Target repo: `Strategic-Minds/EDENSKYESTUDIOS`
- Runtime: Vercel preview/sandbox first
- AI: Vercel AI Gateway route, guarded until env approval
- Agents: intake, planning, sandbox, validation, promotion, improvement, Eden Skye
- Crons: trigger receipts only; no unsupervised worker mutation

## Locked Gates

- No production deploy without approval.
- No Shopify mutation without approval.
- No Supabase schema mutation without approval.
- No payment, discount, billing, or domain change without approval.
- No public social publishing without approval.
- No AI Gateway secret activation without approval.

## Validation Requirement

A build is not considered complete until the Vercel preview check is green and the PR records the active cloud surfaces. Local build attempts do not replace Vercel validation.
