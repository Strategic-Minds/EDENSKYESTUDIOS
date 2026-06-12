# Eden Skye Autonomous Bridge Operator Approval Gates

Status: sandbox only
Production impact: none

## Purpose

Define explicit approval checkpoints that prevent autonomous bridge activities from crossing into production operations without operator authorization.

## Approval Model

Default state:

- draft
- sandbox
- branch-only
- non-production

Any action outside these boundaries requires operator approval.

## Gate 1: Discovery Approval

Required before:

- creating implementation plans
- creating workflow designs
- creating integration packets

Confirm:

- source truth identified
- assumptions documented
- blockers documented

## Gate 2: Build Approval

Required before:

- adding executable workflow files
- adding automation definitions
- adding cron configurations
- adding integration configuration templates

Confirm:

- rollback plan exists
- validation checklist exists
- smoke test plan exists

## Gate 3: Validation Approval

Required before:

- branch promotion
- release preparation
- deployment planning

Confirm:

- smoke tests complete
- blockers documented
- receipts generated

## Gate 4: Production Approval

Explicit operator approval required before:

- deployment
- production alias changes
- production secret changes
- Supabase migrations
- customer messaging
- payment activation
- live social scheduling

## Automatic Deny Conditions

The bridge must deny actions involving:

- unknown source truth
- missing approval records
- missing rollback plans
- missing validation reports
- unverifiable claims

## Required Approval Receipt

Record:

- approval gate
- date
- branch
- commit SHA
- operator decision
- approved scope
- excluded scope
- next action
