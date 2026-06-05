# Approval Matrix

## VERIFIED
- User rules forbid main mutation, deploys, env changes, production Supabase writes, Drive canon edits, publishing, HeyGen training, Shopify changes, email/SMS, and spend.
- Eden README gates public publishing, Shopify mutations, paid ad activation, and production promotion.
- AUTO BUILDER operating rules gate production deployment, billing mutation, database mutation, environment mutation, infrastructure deletion, capital spend, and live publishing.

## INFERRED
- All unknown or ambiguous actions should fail closed into approval-required status.

## COULD NOT VERIFY
- Existing project-specific approver list.
- Production role-based access controls.

## BLOCKERS
- No live mutation allowed in this buildoff.

## WORKAROUNDS
- Declare approval classes and keep stubs disabled.

## NEXT ACTIONS
1. Bind approvers to real identities in a future approved runtime pass.
2. Convert matrix into database rows after Supabase migration approval.

## Required Stub Flags
Every implementation stub must require:
- `APPROVAL_REQUIRED=true`
- `PRODUCTION_MUTATION=false`
- `PUBLISHING_ENABLED=false`
- `DEPLOYMENT_ENABLED=false`
- `SHOPIFY_MUTATION_ENABLED=false`
- `HEYGEN_TRAINING_ENABLED=false`

## Matrix

| Action | Risk | Default | Required Approval | Evidence Required | Rollback |
|---|---:|---|---|---|---|
| Read GitHub/Drive/web public source | Low | Allowed | None | Source URL/file id | N/A |
| Create branch-contained docs | Low | Allowed | None | Branch/file diff | Delete branch/file |
| Create disabled stubs | Low | Allowed | None | Flags present | Remove stubs |
| Commit to sandbox branch | Medium | Allowed by user | Branch-only scope | Commit SHA | Revert branch commit |
| Open PR | Medium | Approval preferred | Operator | Diff, tests, checklist | Close PR |
| Preview deploy | High | Blocked | Operator | Build/test status | Disable preview/project |
| Merge to main | High | Blocked | Operator | PR approval + passing checks | Revert commit |
| Production deploy | Critical | Blocked | Operator | Release firewall + rollback | Rollback deployment |
| Env var change | Critical | Blocked | Operator | Secret contract | Restore prior env |
| Supabase migration/write | Critical | Blocked | Operator | SQL review + backup | Down migration/restore |
| Drive canon edit | Critical | Blocked | Operator | Change proposal | Revision restore |
| Shopify mutation | Critical | Blocked | Operator | Draft diff + rollback | Revert/draft disable |
| HeyGen training | Critical | Blocked | Operator | Rights/consent/model approval | Delete job if possible |
| Public publishing | Critical | Blocked | Operator | QA + approval + schedule | Pull post/draft |
| Email/SMS send | Critical | Blocked | Operator | Recipient/source/compliance | Stop campaign |
| Spend/billing | Critical | Blocked | Operator | Budget approval | Cancel/credit if possible |
