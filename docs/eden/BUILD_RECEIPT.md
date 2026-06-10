# EDEN SKYE STUDIOS - BRANCH/SANDBOX BUILD RECEIPT

PHASE: BRANCH/SANDBOX BUILD EXECUTION
STATUS: BRANCH CREATED - SAFE SCAFFOLDING ONLY

## Receipt
Receipt ID: ESS-BRANCH-BUILD-001
Branch: feature/eden-skye-automation-v1
Base commit: e126c1901c9b43147f2b1e22d5cffcfed234b6cd
Base commit message: Remove Shopify redirect from Vercel

## Scope
This branch is approved for sandbox/branch implementation only.

## Locked Actions
- No production deployment
- No social publishing
- No customer messaging
- No payment actions
- No DNS/domain changes
- No destructive actions
- No secret exposure
- No live Shopify publishing

## Safe Defaults Required
- CRON_ENABLED=false
- SHOPIFY_DRAFT_MODE_ONLY=true
- SOCIAL_PUBLISHING_ENABLED=false
- SHOPIFY_LIVE_PUBLISHING_ENABLED=false
- CUSTOMER_MESSAGING_ENABLED=false
- OPERATOR_APPROVAL_REQUIRED=true

## Next Required Work
1. Add env validation helper.
2. Add Supabase migrations as branch files only.
3. Add AI Gateway router with OpenAI/Groq routing contracts.
4. Add Vercel Agent validators as branch code.
5. Add 5-minute cron route in dry-run mode.
6. Add smoke tests.
7. Create preview deployment only after branch checks.

## Production Status
Production untouched.
