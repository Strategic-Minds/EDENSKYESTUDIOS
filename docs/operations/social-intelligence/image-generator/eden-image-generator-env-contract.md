# Eden Skye Image Generator Environment Contract

Status: implementation-ready draft generation path
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

Set these before enabling draft generation:

```bash
EDEN_IMAGE_AUTOGENERATION_ENABLED=true
OPENAI_API_KEY=...
```

If using Vercel AI Gateway or another OpenAI-compatible gateway, use:

```bash
AI_GATEWAY_API_KEY=...
AI_GATEWAY_BASE_URL=https://your-gateway.example/v1
```

Optional model and quality controls:

```bash
EDEN_IMAGE_MODEL=gpt-image-1
EDEN_IMAGE_QUALITY=medium
```

Production admin/manual route protection:

```bash
EDEN_IMAGE_GENERATOR_ADMIN_TOKEN=choose-a-long-private-token
CRON_SECRET=choose-a-long-private-cron-secret
```

Optional persistence for generated draft images:

```bash
EDEN_IMAGE_SAVE_MEDIA_ASSETS=true
EDEN_IMAGE_SUPABASE_BUCKET=media-assets
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

When persistence is enabled, generated PNG drafts are uploaded to Supabase Storage under:

```text
generated/eden-skye/website/<prompt-id>-<timestamp>.png
```

A matching `media_assets` row is inserted with:

- `model_code`: `eden_skye`
- `status`: `generated`
- `approval_status`: `pending`
- `usage_scope`: `private_test`
- `source_tool`: `eden-skye-website-image-generator`

## Routes

Manual/admin route:

```text
POST /api/media/eden-image-generator
```

Request body:

```json
{ "mode": "validate" }
```

or:

```json
{ "mode": "generate", "limit": 8 }
```

Production authorization header:

```text
Authorization: Bearer <EDEN_IMAGE_GENERATOR_ADMIN_TOKEN>
```

Cron route:

```text
GET /api/cron/eden-image-generator
```

Cron default is validation-only. To allow cron generation, set:

```bash
EDEN_IMAGE_CRON_MODE=generate
EDEN_IMAGE_CRON_LIMIT=8
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
- Blocker messages when env gates are incomplete.

## Current implementation note

The current generator sends the approved Eden Skye source image IDs as identity metadata in the image prompt package. It does not yet fetch the source image bytes and send them as multipart image-edit references. If stricter face/identity anchoring is required, the next implementation pass should add a reference-image edit mode using the approved Drive images as actual input image files.
