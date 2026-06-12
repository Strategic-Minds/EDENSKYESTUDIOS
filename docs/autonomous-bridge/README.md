# Eden Skye Autonomous Bridge Sandbox

Status: sandbox only
Branch: eden-autonomous-bridge-v2
Production impact: none

## Purpose

This packet defines the safe, non-production control surface for the Eden Skye Autonomous Bridge. It is designed to coordinate validation, evidence capture, and operator review before any production release.

## Hard Gates

The bridge must not:

- deploy to production
- publish public content
- modify production secrets
- apply Supabase migrations
- activate live social scheduling
- send customer messages
- process payments
- overwrite locked visual source truth

## Allowed Sandbox Actions

The bridge may prepare draft-only artifacts for review:

- validation checklists
- branch-only implementation notes
- smoke test plans
- rollback plans
- environment variable inventories without values
- non-secret workflow outlines
- bridge receipts

## Required Review Sections

Each bridge run must end with:

- VERIFIED
- INFERRED
- COULD NOT VERIFY
- BLOCKERS
- WORKAROUNDS
- NEXT ACTIONS

## Source Truth

Use the locked Eden Skye source files in this repository as source truth. Do not invent product claims, prices, warranties, legal claims, customer promises, or live launch status.
