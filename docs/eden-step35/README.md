# Eden Skye Phase 3 Step 35 Image Install Executor

This preview branch adds a dry-run-first executor contract for future Custom GPTs and agents to validate Eden Skye canonical image installation requests.

## What this branch adds

- OpenAPI Action schema: `openapi/eden-image-install-executor.openapi.yaml`
- Auth spec: `docs/eden-step35/AUTHENTICATION_SPEC.md`
- Drive placement plan: `docs/eden-step35/DRIVE_PLACEMENT_PLAN.md`
- Governance module: `lib/eden-image-install-governance.mjs`
- Preview API route: `app/api/eden/images/install-approved/route.js`
- Preview status route: `app/api/eden/images/install-status/[request_id]/route.js`
- Supabase schema draft: `supabase/migrations/0007_image_install_executor_tables.sql`
- Governance tests: `tests/eden-image-install-governance.test.mjs`

## Safety posture

This branch does not deploy production, mutate Shopify, activate payments, publish social content, activate HeyGen, or run live Supabase/Drive writes.

The executor rejects every final install unless all of these are true:

- request has a bearer token
- request has `approval_receipt_id`
- `public_use`, `drive_use`, and `supabase_use` gates are true
- every asset status is exactly `approved_public`
- no asset source kind is `page_board`, `mockup`, or `temporary_crop`

## Validation

Run:

```bash
npm run test:eden-image-install
```
