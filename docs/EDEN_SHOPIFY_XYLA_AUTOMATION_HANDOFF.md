# EDEN SHOPIFY XYLA AUTOMATION HANDOFF

## Purpose
Define the draft-safe Shopify/Xyla automation command surface for Eden Skye Studios.

## Source of Truth
- `/shopify` is the command surface.
- `config/eden-shopify-xyla-automation-manifest.json` is the automation manifest.
- Draft/test-only commerce remains blocked from live mutation until an explicit human approval receipt exists.

## Required Surfaces
- Eden Skye Black Card product panel
- Draft/test checkout status
- Xyla AI Shopify automation panel
- Female model catalog
- Male model catalog
- Draft product generation queue
- Shopify webhook and entitlement sync status
- Protected live-action approval gates
- Admin links to gate/workflow/receipt surfaces

## Male Model Policy
If the exact male roster exists in a repo or Drive manifest, use it.
If it does not exist, mark the roster as `REQUIRED_SOURCE_PENDING` and do not invent names, ages, assets, or URLs.

## Xyla Policy
Xyla may plan:
- draft product packets
- draft collection packets
- model-to-product mapping
- content/social draft packet hooks

Xyla may not:
- publish publicly
- write live Shopify data
- activate live payments
- bypass approval gates

## Protected Actions
- live Shopify product mutation
- live payment activation
- inventory mutation
- discount creation
- theme publishing
- public social posting
- production deploy
- Supabase production mutation
- merge or release

## Validation Targets
- `/shopify` includes Xyla automation language
- `/shopify` includes male model catalog policy
- approval gates remain present and locked
- Black Card payment remains draft/test-only
- unsigned webhook payloads are rejected
