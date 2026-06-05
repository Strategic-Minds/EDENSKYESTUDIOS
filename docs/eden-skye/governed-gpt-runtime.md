# Eden Governed GPT Runtime

This branch removes the core Eden GPT blockers by wiring a governed runtime only. It does not publish, deploy to production, mutate Shopify, change payments, send Klaviyo campaigns, apply Supabase production migrations, or start live HeyGen sessions.

## What Is Wired

- Factory maps are loaded from `config/eden/factory/*`.
- `/api/eden/chat` uses Vercel AI Gateway's OpenAI-compatible chat completions endpoint when `AI_GATEWAY_API_KEY` or `VERCEL_OIDC_TOKEN` is configured.
- Approval locks are enforced by `lib/eden/governance.ts`.
- Runtime receipts are logged through `lib/eden/receipts.ts`.
- If Supabase is not configured with a server-side service role, receipt logging falls back to dry-run console output.
- Slack channel access is confirmed for `#eden-skye-studios` with channel ID `C0B99RT8W1E`.
- `/api/readiness` now reports factory-map, chat-route, Slack, AI Gateway, Supabase, and approval-lock status.

## Approval-Locked Actions

The runtime must stop and create an approval request before any of these actions:

- public publishing
- Metricool live scheduling or publishing
- Shopify mutation
- payment, price, discount, or subscription change
- Supabase production migration
- Klaviyo send
- live HeyGen or live avatar session
- Vercel production deploy
- Slack post or external message

Drafts, previews, analysis, recommendations, dry-run receipts, and approval-request preparation are allowed.

## Required Environment

Set these in Vercel preview before validating the live route:

- `AI_GATEWAY_API_KEY`
- `EDEN_AI_MODEL` such as `openai/gpt-5-mini`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` for server-only receipt/admin writes
- `SLACK_EDEN_CHANNEL_ID=C0B99RT8W1E`

Do not set or activate production webhook, publishing, commerce, payment, Klaviyo, or live HeyGen keys until the matching approval flow is built and approved.

## Supabase Dry Run

The migration file `supabase/migrations/20260605000000_eden_governed_runtime_dry_run.sql` defines:

- `eden_model_profiles`
- `eden_wardrobe_states`
- `eden_social_drafts`
- `eden_chat_sessions`
- `eden_agent_runs`
- `tool_receipts`

All tables enable RLS and add no anon/authenticated policies. This file is staged in the GitHub branch only. Applying it to a Supabase development branch requires the Supabase branch cost confirmation flow. Applying it to production requires explicit approval.

## Chat Route Contract

`POST /api/eden/chat`

Request:

```json
{
  "message": "Analyze today's Eden workflow and recommend the next safe action.",
  "requestedAction": "recommend next safe action"
}
```

Allowed response includes:

```json
{
  "reply": "...",
  "gate": { "allowed": true, "risk": "green" },
  "receipt": { "source": "supabase" }
}
```

Gated requests return `423 Locked` and a receipt:

```json
{
  "blocked": true,
  "reply": "That action is approval-locked...",
  "gate": { "allowed": false, "requiresApproval": true, "risk": "red" }
}
```

## Validation Plan

1. Merge only after review.
2. Let Vercel create a preview deployment for this branch.
3. Set preview env values.
4. Visit `/api/readiness` and confirm `governed_runtime.factory_maps_loaded=true`.
5. Call `GET /api/eden/chat` and confirm the route reports readiness.
6. Call `POST /api/eden/chat` with a safe draft request and confirm a dry-run or Supabase receipt.
7. Call `POST /api/eden/chat` with `requestedAction=shopify mutation` and confirm the route returns `423 Locked`.
8. Only after that, request approval for Supabase branch creation and migration testing.
