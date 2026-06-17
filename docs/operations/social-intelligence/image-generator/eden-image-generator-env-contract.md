# Eden Skye Image Generator Environment Contract

Status: active draft generation path
Last updated: 2026-06-16

## Runtime purpose

The Eden Skye image generator creates draft branded website images for review inside the admin approval UI. It does not approve images for public website use, social publishing, paid promotion, Metricool posting, or commerce activation.

## Approval state

Approved source images for draft generation:

- `01-eden-labeled-eden-skye.png` / Drive ID `1lmOJBPF0G2wotinP7Q9iDiVqorZI8FQs`
- `01-eden-basic-eden-skye.png` / Drive ID `1ndzEOsotXMhwU_XeSb--4ajZtg0nuZg7`

Default governance:

- Draft generation: allowed when env gates are configured.
- Public use: blocked until operator review approval.
- Publishing: blocked. This generator does not post to social channels.

## Required Vercel environment variables

Direct OpenAI mode:

```bash
EDEN_IMAGE_PROVIDER=openai
EDEN_IMAGE_AUTOGENERATION_ENABLED=true
OPENAI_API_KEY=...
EDEN_IMAGE_MODEL=gpt-image-2
EDEN_IMAGE_QUALITY=medium
```

Vercel AI Gateway mode, if the gateway supports image edits:

```bash
EDEN_IMAGE_PROVIDER=ai_gateway
EDEN_IMAGE_AUTOGENERATION_ENABLED=true
AI_GATEWAY_API_KEY=...
AI_GATEWAY_BASE_URL=https://your-gateway.example/v1
EDEN_IMAGE_MODEL=gpt-image-2
EDEN_IMAGE_QUALITY=medium
```

Reference-image mode is on by default. Normal hero, lifestyle, campaign, and Open Graph generations use one Eden Skye reference image for faster review. Identity-lock prompts use two references by default.

To force a server default reference count:

```bash
EDEN_IMAGE_REFERENCE_COUNT=1
```

To disable reference images by server default:

```bash
EDEN_IMAGE_REFERENCE_MODE=off
```

Production admin/manual route protection:

```bash
EDEN_IMAGE_GENERATOR_ADMIN_TOKEN=choose-a-long-private-token
CRON_SECRET=choose-a-long-private-cron-secret
```

Enterprise generation guardrails:

```bash
EDEN_IMAGE_MAX_BATCH_SIZE=1
EDEN_IMAGE_PROVIDER_TIMEOUT_MS=120000
```

`EDEN_IMAGE_MAX_BATCH_SIZE` defaults to `1`. Even if an operator or cron route requests a larger untargeted batch, generation is capped by this setting unless a protected dashboard request sends a lower or equal runtime control.

`EDEN_IMAGE_PROVIDER_TIMEOUT_MS` defaults to `120000` and is capped at five minutes. This prevents slow provider calls or slow Drive thumbnail fetches from leaving the admin UI waiting forever.

Optional persistence for generated draft images:

```bash
EDEN_IMAGE_SAVE_MEDIA_ASSETS=true
EDEN_IMAGE_SUPABASE_BUCKET=media-assets
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

When persistence is enabled, the app attempts to create the configured Supabase Storage bucket if it is missing and the service role key allows bucket creation. Generated PNG drafts are uploaded under:

```text
generated/eden-skye/website/<prompt-id>-<timestamp>.png
```

A matching `media_assets` row is inserted with:

- `model_code`: `eden_skye`
- `status`: `generated`
- `approval_status`: `pending`
- `usage_scope`: `private_test`
- `source_tool`: `eden-skye-website-image-generator`

For fastest review iterations, use the dashboard Fast Review preset or set:

```bash
EDEN_IMAGE_SAVE_MEDIA_ASSETS=false
EDEN_IMAGE_QUALITY=medium
EDEN_IMAGE_REFERENCE_COUNT=1
EDEN_IMAGE_MAX_BATCH_SIZE=1
```

Then switch storage and high quality back on for final approved assets.

## Dashboard runtime controls

The admin UI can send protected per-run controls to the image API. These are not secret Vercel env mutations. They only affect the current validation or generation request.

Supported dashboard controls:

- `quality`: `low`, `medium`, `high`, or `auto`
- `referenceMode`: `on` or `off`
- `referenceCount`: `1` or `2`
- `maxBatchSize`: `1` through the configured prompt count
- `providerTimeoutMs`: `10000` through `300000`
- `saveMediaAssets`: `true` or `false`

Dashboard presets:

- Fast review: `medium`, references on, one reference image, one image batch, 90 second timeout, storage off.
- High quality: `high`, references on, one reference image, one image batch, 180 second timeout, storage off.
- Storage final: `high`, references on, one reference image, one image batch, 180 second timeout, storage on.

Storage final requires Supabase env vars and service role access. If storage is toggled on without Supabase readiness, the API blocks generation rather than silently losing assets.

## Routes

Manual/admin route:

```text
POST /api/media/eden-image-generator
```

Request body:

```json
{ "mode": "validate" }
```

or targeted generation:

```json
{
  "mode": "generate",
  "promptId": "eden-web-hero-mobile-001",
  "settings": {
    "quality": "medium",
    "referenceMode": "on",
    "referenceCount": 1,
    "maxBatchSize": 1,
    "providerTimeoutMs": 120000,
    "saveMediaAssets": false
  }
}
```

Production authorization header:

```text
Authorization: Bearer <EDEN_IMAGE_GENERATOR_ADMIN_TOKEN>
```

In-app decision route:

```text
POST /api/media/eden-image-generator/decision
```

Cron route:

```text
GET /api/cron/eden-image-generator
```

Cron default is validation-only. If cron generation is enabled, it defaults to one image unless `EDEN_IMAGE_CRON_LIMIT` is set, and the backend still enforces `EDEN_IMAGE_MAX_BATCH_SIZE`:

```bash
EDEN_IMAGE_CRON_MODE=generate
EDEN_IMAGE_CRON_LIMIT=1
```

## Admin UI

The review surface is:

```text
/admin/image-approval
```

It shows:

- Approved Eden Skye source images.
- Reference-only roster contact sheets.
- The website image prompt queue.
- Generated draft images returned by the pipeline.
- Storage path and media asset ID when persistence succeeds.
- Storage warnings when persistence fails.
- In-app approve, revise, and reject decisions.
- Targeted per-prompt generation and regeneration.
- Advanced runtime controls and presets for quality, reference use, batch size, timeout, and storage.

## Current implementation note

The current generator uses the approved Eden Skye source images as actual reference-image inputs for person-based prompts. Normal prompts default to one reference image for speed; identity-lock prompts default to two references for consistency. The membership/still-life visual intentionally uses text-to-image because it should not show Eden Skye directly.

The generation path is now protected by backend batch limits, dashboard runtime controls, provider timeouts, operator-token authorization, review-only usage scope, Supabase persistence controls, durable approval status updates, and receipt logging. Public website use still requires a separate approval step.
