# Eden Skye Studios Frontend / Backend Contract

## Frontend Objective

The frontend should be the usable Eden Skye Studios control surface, not only a landing page.

Primary surfaces:

1. Public Eden Skye website/home
2. About Eden
3. Offers/products path
4. Lead capture
5. Content hub
6. Admin/agent console
7. Approval queue
8. Media asset dashboard
9. Social draft queue
10. Readiness/health dashboard

## Frontend UX Rules

- Public pages should feel premium, cinematic, feminine, and restrained.
- Admin pages should be dense, clear, operational, and scannable.
- Do not expose internal tool secrets or raw system prompts publicly.
- Public site must preserve fictional-AI disclosure boundary.
- Approval UI must make risk/action/target system obvious.

## Backend Objective

The backend should support controlled automation, not unsupervised public mutation.

Backend responsibilities:

- health/readiness
- source manifest reads
- media job queue
- content draft queue
- approval request management
- tool receipt logging
- telemetry aggregation
- social draft management
- Shopify sync checks
- Supabase persistence
- cron-triggered routing

## API Route Targets

Recommended route set:

```text
/api/health
/api/readiness
/api/manifests/studio
/api/manifests/avatar-stock
/api/approvals
/api/approvals/[id]
/api/media/jobs
/api/media/jobs/[id]
/api/social/drafts
/api/social/drafts/[id]
/api/telemetry/receipts
/api/cron/readiness
/api/cron/content-draft
/api/cron/analytics-review
/api/cron/shopify-sync-check
```

## Route Rules

- Readiness routes can run automatically.
- Draft/queue routes can run sandbox-first.
- Public publishing routes must require approval tokens/state.
- Schema and env operations should not be exposed as normal frontend actions.
- API responses should include receipt IDs when possible.

## Admin Console Minimum Panels

1. System readiness
2. Pending approvals
3. Avatar readiness
4. Media jobs
5. Social drafts
6. Content queue
7. Tool receipts
8. Recent blocked actions
9. Next recommended action

## Backend Security Rules

- Service-role Supabase keys only server-side.
- No secrets in client components.
- Approval-required actions must validate approval state server-side.
- Public endpoints should not expose internal file IDs unless intended.
- Telemetry should avoid storing raw secrets or sensitive personal data.

## Frontend Build Priority

Phase 1:

- readiness dashboard
- avatar readiness panel
- approval queue
- media job packet viewer

Phase 2:

- social draft queue
- content calendar
- asset library
- campaign builder

Phase 3:

- Shopify offer dashboard
- analytics/winner cloning
- automated repurpose console
