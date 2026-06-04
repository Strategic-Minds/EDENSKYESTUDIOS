# Eden Skye Studios Stack Lock

## Locked Stack

### Source And Control

- GitHub repo: `Strategic-Minds/EDENSKYESTUDIOS`
- Orchestration repo: `Strategic-Minds/AUTO_BUILDER`
- Drive root: Eden Skye Studios Drive folder

### Frontend

- Next.js App Router
- React
- Vercel hosting and preview/production promotion
- Primary surfaces:
  - public website
  - landing/offer pages
  - content hub
  - readiness/admin/agent console
  - approval queue UI

### Backend

- Next.js API routes
- Supabase client helpers
- Supabase database for state, telemetry, queues, approvals, receipts, media assets, leads, and social posts
- Vercel cron triggers for readiness, draft generation, analytics review, and sync checks

### Media And AI

- GPT: reasoning, drafting, classification, prompts, scripts, receipts
- Higgins: controlled automation/operator layer named by Jeremy
- HeyGen: avatar/video execution after approval
- Runway: cinematic image/video generation where appropriate
- Descript: editing and packaging
- Canva/Adobe Express: visual design and social assets
- Photoshop: image cleanup/refinement

### Commerce And Growth

- Shopify: primary website/storefront and offer system by default
- Stripe: payment/revenue visibility when needed
- Metricool/SocialHub: social planning, scheduling, analytics, and drafts
- Klaviyo: lifecycle/email campaign layer when connected
- Semrush: SEO and market intelligence

### Planning And Operations

- Notion: optional operating dashboard and documentation layer
- Google Drive: files, docs, assets, indexes, artifact storage
- Gmail/Slack/Calendar: communication and planning context when relevant

## Environment Contract

Required environment groups:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `GOOGLE_DRIVE_EDEN_STUDIOS_FOLDER_ID`
- `GOOGLE_DRIVE_AUTO_SOCIAL_FOLDER_ID`
- `GOOGLE_DRIVE_AVATAR_NETWORK_FOLDER_ID`
- `HEYGEN_API_KEY`
- `SHOPIFY_ADMIN_ACCESS_TOKEN`
- `METRICOOL_API_KEY` or connected Metricool app context
- `AUTO_SOCIAL_MODE=sandbox`
- `REQUIRE_APPROVAL_FOR_PUBLIC_ACTIONS=true`

Do not add or rotate live secrets without approval.

## Repo Shape Target

Recommended durable structure:

```text
app/
  page.tsx
  admin/
  api/
    health/
    readiness/
    approvals/
    media-jobs/
    social-drafts/
    cron/
components/
lib/
  supabase/
  governance/
  telemetry/
  media/
ops/
  studio-bootstrap/
  finalization/
  receipts/
supabase/
  migrations/
  seed/
public/
  brand/
```

## Promotion Rule

Build in sandbox or preview first. Production promotion requires approval and a validation receipt.
