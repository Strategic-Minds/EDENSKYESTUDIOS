# Eden Skye Autonomous Bridge Workflow Outline

Status: sandbox only
Production impact: none

## Purpose

This document describes the intended governance workflow for the Eden Skye Autonomous Bridge sandbox. It is documentation-only and does not define, enable, schedule, or execute any automation.

## Non-Executable Boundary

This outline must not be treated as a live workflow file. It does not contain:

- executable workflow code
- Vercel deployment configuration
- active cron definitions
- Supabase migrations
- production secret values
- live social scheduling instructions
- customer messaging automation
- payment activation logic

## Governance Workflow

### 1. Plan

Define the requested outcome, source truth, target branch, allowed tools, excluded actions, known risks, and approval gates.

Required output:

- user outcome
- branch target
- source truth list
- exclusions
- blockers
- discovery TODO

### 2. Discovery

Inspect repo files, Drive source truth, deployment metadata, and existing documentation before proposing changes.

Required output:

- VERIFIED
- INFERRED
- COULD NOT VERIFY
- BLOCKERS
- WORKAROUNDS
- NEXT ACTIONS

### 3. Approval Gate

Stop before implementation unless the operator explicitly approves the next phase.

Approval must record:

- approved branch
- approved files
- excluded systems
- rollback plan requirement
- validation requirement

### 4. Sandbox Build

Create or update branch-only, non-production artifacts. Default to documentation, templates, checklists, and draft-only configuration notes.

Allowed by default:

- documentation packets
- validation plans
- bridge receipts
- environment inventories without values
- rollback plans
- workflow descriptions

Denied by default:

- production deployment
- live cron activation
- production secret changes
- Supabase migrations
- social publishing or scheduling
- customer messaging
- payment activation

### 5. Validation Loop

Validate each batch after commit.

Required checks:

- branch is non-production
- files are within approved scope
- no secrets are present
- no executable workflow was added unless separately approved
- no production system was modified
- no migration was applied
- no live scheduling was activated

### 6. Receipt

Every batch must produce a bridge receipt.

Receipt fields:

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

### 7. Rollback Checkpoint

Before any future release planning, confirm rollback coverage exists for each changed file.

Rollback must identify:

- branch
- commit SHA
- affected files
- rollback action
- approval status
- expected safe outcome

### 8. Release Gate

Release is not part of this sandbox outline. Any future release request must be treated as a separate approval event.

Release requires explicit approval for:

- deployment
- production alias changes
- production environment variables
- Supabase migrations
- customer communication
- payment activation
- live social scheduling

## Reporting Requirements

Every bridge response must end with:

- VERIFIED
- INFERRED
- COULD NOT VERIFY
- BLOCKERS
- WORKAROUNDS
- NEXT ACTIONS

## Current Sandbox Posture

The Eden Skye Autonomous Bridge remains branch-only, documentation-only, and non-production until the operator approves a separate next phase.
