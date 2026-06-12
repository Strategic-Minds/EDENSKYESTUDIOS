# Eden Skye Autonomous Bridge Environment Inventory

Status: sandbox only
Production impact: none

## Purpose

This file records environment variable names and integration categories required for future review. It must never contain secret values, tokens, passwords, private keys, service role keys, webhook signing secrets, or production credentials.

## Rules

- Store variable names only.
- Do not store values.
- Do not paste screenshots of secret dashboards.
- Do not modify production secrets from this bridge packet.
- Do not rotate, delete, or create secrets unless separately approved by the operator.

## Candidate Environment Variable Names

### Site / Runtime

- NEXT_PUBLIC_SITE_URL
- NEXT_PUBLIC_APP_ENV
- NEXT_PUBLIC_BRAND_NAME

### Supabase

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
- SUPABASE_SERVICE_ROLE_KEY
- SUPABASE_PROJECT_REF

### Vercel / AI Gateway

- AI_GATEWAY_API_KEY
- VERCEL_PROJECT_ID
- VERCEL_TEAM_ID
- VERCEL_ENVIRONMENT

### Google / Drive / Chat

- GOOGLE_CLIENT_EMAIL
- GOOGLE_PRIVATE_KEY
- GOOGLE_DRIVE_SOURCE_FOLDER_ID
- GOOGLE_CHAT_WEBHOOK_URL

### Social / Scheduling

- METRICOOL_API_KEY
- SOCIAL_DRAFT_MODE
- SOCIAL_LIVE_SCHEDULING_ENABLED

### Bridge Controls

- AUTONOMOUS_BRIDGE_MODE
- AUTONOMOUS_BRIDGE_DRY_RUN
- AUTONOMOUS_BRIDGE_APPROVAL_REQUIRED
- AUTONOMOUS_BRIDGE_RECEIPT_FOLDER

## Required Defaults for Sandbox

- AUTONOMOUS_BRIDGE_MODE=sandbox
- AUTONOMOUS_BRIDGE_DRY_RUN=true
- AUTONOMOUS_BRIDGE_APPROVAL_REQUIRED=true
- SOCIAL_DRAFT_MODE=true
- SOCIAL_LIVE_SCHEDULING_ENABLED=false

## Validation Checklist

- [ ] No secret values are present in this file.
- [ ] No production secret changes were made.
- [ ] All variables are names only.
- [ ] Production deployment is not required to review this inventory.
- [ ] Any missing variable is marked could not verify in bridge receipts.
