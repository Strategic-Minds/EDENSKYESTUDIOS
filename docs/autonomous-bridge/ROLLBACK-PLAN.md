# Eden Skye Autonomous Bridge Rollback Plan

Status: sandbox only
Production impact: none

## Purpose

This rollback plan defines how to safely back out autonomous bridge sandbox work before any production release. It is documentation-only and does not execute deployments, database changes, secret changes, social scheduling, or customer messaging.

## Rollback Scope

Rollback applies to branch-only artifacts created for the Eden Skye Autonomous Bridge sandbox, including:

- documentation packets
- validation plans
- smoke test plans
- environment inventories without values
- workflow outlines
- bridge receipts
- approval gate documents

## Hard Stop Conditions

Stop and require operator review if any proposed change would:

- deploy to production
- publish public content
- modify production secrets
- apply Supabase migrations
- activate live social scheduling
- send customer messages
- process payments
- modify production domains or aliases
- overwrite locked Eden Skye visual source truth

## Safe Rollback Actions

Allowed sandbox rollback actions:

1. Revert a branch-only documentation commit.
2. Close or abandon a draft pull request.
3. Mark a bridge receipt as superseded.
4. Create a new clean sandbox branch from the approved base.
5. Document the failure mode and next safe workaround.

## Unsafe Rollback Actions

Do not perform these without explicit operator approval:

- force push to a shared branch
- delete production branches
- remove production environment variables
- reset Supabase branches or databases
- delete workflow history
- delete evidence receipts
- disable production integrations

## Required Rollback Receipt

Every rollback must record:

- branch name
- commit SHA being reverted or abandoned
- file paths affected
- reason for rollback
- operator approval status
- verified outcome
- unresolved blockers
- next safe action

## Validation After Rollback

Confirm:

- production was not modified
- secrets were not exposed or changed
- Supabase migrations were not applied
- social scheduling was not activated
- no customer messages were sent
- locked visual source truth remains intact
