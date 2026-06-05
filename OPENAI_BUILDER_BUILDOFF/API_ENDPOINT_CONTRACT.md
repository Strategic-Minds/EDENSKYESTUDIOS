# API Endpoint Contract

## VERIFIED
- This contract is branch-contained and disabled-by-default.
- User allowed safe implementation stubs only under `src/app/api/openai-builder-buildoff/*`, `src/lib/openai-builder-buildoff/*`, and `src/app/admin/openai-builder-buildoff/*`.

## INFERRED
- Existing repo has Next.js App Router scripts under `app/api/eden/*`; stubs under `src/app/*` should be treated as candidate routes until checkout/build validation confirms source-root convention.

## COULD NOT VERIFY
- Whether current repo uses `src/` convention or root `app/` convention in production.
- Whether Next.js latest config accepts both route roots in this repo.

## BLOCKERS
- Local build unavailable due clone block.
- No deploy allowed.

## WORKAROUNDS
- Keep route stubs informational only.
- Return disabled status and require all hard flags.

## NEXT ACTIONS
1. In a real checkout, confirm whether routes should live under `app/` or `src/app/`.
2. Add Jest/Playwright tests after checkout.
3. Deploy preview only after approval.

## Endpoints

### `GET /api/openai-builder-buildoff/status`
Returns branch buildoff status only.

Response shape:
```json
{
  "ok": true,
  "mode": "branch_sandbox_only",
  "approval_required": true,
  "production_mutation": false,
  "publishing_enabled": false,
  "deployment_enabled": false,
  "shopify_mutation_enabled": false,
  "heygen_training_enabled": false,
  "branch": "openai-builder/buildoff-autobuilder-eden-20260605",
  "verdict": "candidate_pending_runtime_validation"
}
```

### `POST /api/openai-builder-buildoff/validate`
Future disabled route for local validation requests. Must refuse when any required hard flag is missing or unsafe.

Request shape:
```json
{
  "run_key": "openai-builder-buildoff-20260605",
  "case_key": "SIM-APPROVAL-BLOCKED"
}
```

### `GET /admin/openai-builder-buildoff`
Disabled dashboard page showing source truth, scores, blockers, flags, and next approval command.

## Hard Refusal Conditions
- `PRODUCTION_MUTATION !== false`
- `PUBLISHING_ENABLED !== false`
- `DEPLOYMENT_ENABLED !== false`
- `SHOPIFY_MUTATION_ENABLED !== false`
- `HEYGEN_TRAINING_ENABLED !== false`
- `APPROVAL_REQUIRED !== true`

## Non-Goals
- No deploy.
- No database write.
- No Drive edit.
- No Shopify action.
- No HeyGen action.
- No public publishing.
- No email/SMS.
- No spend.
