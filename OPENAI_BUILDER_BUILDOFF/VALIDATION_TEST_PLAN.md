# Validation Test Plan

## VERIFIED
- No live deployment, production Supabase write, Drive edit, Shopify mutation, HeyGen training, publishing, email/SMS, or spend is allowed.
- Local clone/build was blocked by network tunnel restrictions.
- Branch files were created through connected GitHub write actions.

## INFERRED
- Current validation can be static and logical only; runtime validation must happen after checkout access or preview approval.

## COULD NOT VERIFY
- TypeScript compile.
- Next.js route discovery.
- Browser rendering.
- Vercel build status.
- Supabase integration behavior.

## BLOCKERS
- No local repo checkout.
- No deploy approval.
- No production mutation approval.

## WORKAROUNDS
- Run connector-level validation: branch exists, required files created, hard flags present in stubs.
- Run logical simulations from docs.
- Defer build/test to morning validation handoff.

## NEXT ACTIONS
1. Fetch branch in a normal environment.
2. Run `npm install`, `npm run typecheck`, `npm run build`.
3. Verify admin/API stubs compile or relocate from `src/app` to `app` if repo convention requires.
4. Run static grep for forbidden live actions.
5. Only after explicit approval, run preview deploy.

## Test Cases

| ID | Scenario | Input | Expected Result | Current Status |
|---|---|---|---|---|
| SIM-001 | Happy path docs buildoff | Branch source truth + benchmarks | All required docs exist | PASS-STATIC |
| SIM-002 | Missing approval | Attempt deploy/publish/train/shopify | Blocked by matrix/stubs | PASS-LOGICAL |
| SIM-003 | Unsafe flag flipped | Any hard flag unsafe | API/admin refuses | PENDING-CHECKOUT |
| SIM-004 | External API unavailable | GitHub/Drive/Vercel unavailable | Recovery task, no mutation | PASS-LOGICAL |
| SIM-005 | Eden public asset request | Use model/media publicly | Block until QA+approval | PASS-LOGICAL |
| SIM-006 | AUTO BUILDER production mutation | Env/DB/deploy/spend request | Block until explicit approval | PASS-LOGICAL |
| SIM-007 | Build compile | `npm run build` | No TS/Next errors | BLOCKED-NO-CHECKOUT |
| SIM-008 | Browser smoke | Open admin/status routes | No overlap/console errors | BLOCKED-NO-DEPLOY |

## Static Checks To Run Later
```bash
rg -n "PRODUCTION_MUTATION|PUBLISHING_ENABLED|DEPLOYMENT_ENABLED|SHOPIFY_MUTATION_ENABLED|HEYGEN_TRAINING_ENABLED|APPROVAL_REQUIRED" src/app src/lib OPENAI_BUILDER_BUILDOFF
rg -n "fetch\(|createClient|shopify|heygen|sendEmail|sendSms|stripe|deploy" src/app/api/openai-builder-buildoff src/lib/openai-builder-buildoff src/app/admin/openai-builder-buildoff
npm run typecheck
npm run build
```
