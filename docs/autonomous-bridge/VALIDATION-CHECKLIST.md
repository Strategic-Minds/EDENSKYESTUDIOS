# Eden Skye Autonomous Bridge Validation Checklist

Status: sandbox only
Production impact: none

## Validation Scope

This checklist validates documentation, branch safety, source-truth alignment, and release gates before any autonomous bridge work can move beyond sandbox review.

## Branch Validation

- [ ] Work is isolated to a non-production branch.
- [ ] Branch name is recorded in the bridge receipt.
- [ ] Base branch or base commit is recorded.
- [ ] No force push is required.
- [ ] No production deployment is requested.

## Source Truth Validation

- [ ] Locked Eden Skye visual source truth is preserved.
- [ ] No disqualified assets are rendered or promoted.
- [ ] Missing claims are marked as could not verify.
- [ ] No product claims, prices, warranties, legal claims, or customer promises are invented.
- [ ] Existing branding and approved language are reused where possible.

## Safety Gates

- [ ] No production secrets are created, edited, exposed, or requested.
- [ ] No Supabase migrations are applied.
- [ ] No live social scheduling is activated.
- [ ] No customer messages are sent.
- [ ] No payment systems are activated.
- [ ] No production aliases or domains are modified.

## Code Review Gates

- [ ] Files are documentation-only unless separately approved.
- [ ] Any workflow file is disabled or sandbox-only by default.
- [ ] Any cron reference is documented only and does not run.
- [ ] Any environment variable list contains names only, never values.
- [ ] Any integration packet includes rollback and operator approval gates.

## Required Final Report

Every bridge validation must return:

- commit SHA
- files committed
- validation status
- remaining files
- VERIFIED
- INFERRED
- COULD NOT VERIFY
- BLOCKERS
- WORKAROUNDS
- NEXT ACTIONS
