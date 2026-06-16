# Eden Image Generator Deployment Trigger

Created: 2026-06-16 18:21 EDT

Purpose: trigger a fresh Vercel production deployment from the latest `main` branch so the Eden Skye image approval UI and generator routes are available in the deployed app.

Expected routes after deployment:

- `/admin/image-approval`
- `/api/media/eden-image-generator`
- `/api/cron/eden-image-generator`

No public publishing, Shopify mutation, DNS mutation, paid execution, or public asset approval is included in this trigger.
