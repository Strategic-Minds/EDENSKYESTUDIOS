# EDEN FULL SITE AUTOGENERATION Doc Index

## Status

Installed on Draft PR #2 branch `eden/readiness-scaffold-20260604`.

This is the canonical doc index for generating the entire Eden Skye Studios website, Eden's Closet, EDEN SKYE ADMIN, PWA surfaces, AI/media pages, and Black Card draft/test commerce flow.

## Primary Generator Entry Points

1. `docs/EDEN_FULL_SITE_GENERATOR_IMPLEMENTATION_PACKET.md`
2. `config/eden-full-site-autogeneration-manifest.json`
3. `config/eden-full-site-page-registry.json`
4. `config/eden-full-site-validation-matrix.json`

## Full-Site Generator Docs

- `docs/EDEN_FULL_SITE_AUTOGENERATION_SYSTEM_BRIEF.md`
- `docs/EDEN_FULL_SITE_GENERATOR_SOURCE_CONTRACT.md`
- `docs/EDEN_FULL_SITE_PAGE_REGISTRY.md`
- `docs/EDEN_FULL_SITE_ROUTE_GENERATION_MATRIX.md`
- `docs/EDEN_FULL_SITE_AUTOGENERATION_VALIDATION_PLAN.md`
- `docs/EDEN_FULL_SITE_AUTOGENERATION_OPERATOR_RUNBOOK.md`
- `docs/EDEN_FULL_SITE_GENERATOR_IMPLEMENTATION_PACKET.md`

## Domain-Specific Generator Contracts

- `docs/EDEN_CLOSET_AUTOGENERATION_CONTRACT.md`
- `docs/EDEN_ADMIN_AUTOGENERATION_CONTRACT.md`
- `docs/EDEN_BLACK_CARD_COMMERCE_GENERATION_CONTRACT.md`

## EDEN SKYE ADMIN Docs

- `docs/EDEN_SKYE_ADMIN_SYSTEM_BRIEF.md`
- `docs/EDEN_SKYE_ADMIN_STACK_CONTRACT.md`
- `docs/EDEN_SKYE_ADMIN_AGENT_TOPOLOGY.md`
- `docs/EDEN_SKYE_ADMIN_BRIDGE_MANIFEST.md`
- `docs/EDEN_SKYE_ADMIN_CONNECTOR_MAP.md`
- `docs/EDEN_SKYE_ADMIN_APPROVAL_GATES.md`
- `docs/EDEN_SKYE_ADMIN_VALIDATION_PLAN.md`
- `docs/EDEN_SKYE_ADMIN_RUNTIME_EVIDENCE_PLAN.md`
- `docs/EDEN_SKYE_ADMIN_INSTALL_PACKET.md`
- `docs/EDEN_SKYE_ADMIN_OPERATOR_PLAYBOOK.md`
- `docs/EDEN_SKYE_ADMIN_BLACK_CHAT_UI_SOURCE_INTAKE.md`
- `docs/EDEN_SKYE_ADMIN_AUTONOMOUS_BUILDER_PACKET.md`

## Visual Source Truth Docs

- `docs/EDEN_EXACT_IMAGE_SOURCE_MANIFEST_2026-06-12.json`
- `docs/EDEN_VISUAL_SOURCE_LOCK_2026-06-11.md`
- `docs/EDEN_DRIVE_DISCOVERY_MANIFEST_2026-06-12.json`
- `docs/EDEN_DRIVE_DISCOVERY_AND_APP_ALIGNMENT_2026-06-12.md`

## Bridge And Automation Docs

- `docs/EDEN_AUTONOMOUS_GPT_BRIDGE_PACKET_2026-06-12.md`
- `docs/max_bootstrap/31_EDEN_BRIDGE_QUEUE_WORKER_PACKET.md`
- `workflows/n8n/eden-skye-always-on-bridge.blueprint.json`

## Machine-Readable Manifests

Full site:

- `config/eden-full-site-autogeneration-manifest.json`
- `config/eden-full-site-page-registry.json`
- `config/eden-full-site-validation-matrix.json`

Admin:

- `config/eden-skye-admin-manifest.json`
- `config/eden-skye-admin-bridge-registry.json`
- `config/eden-skye-admin-agent-registry.json`
- `config/eden-skye-admin-approval-gates.json`
- `config/eden-skye-admin-validation-matrix.json`
- `config/eden-skye-admin-connected-systems.json`
- `config/eden-skye-admin-chat-ui-source-map.json`

Autonomous bridge:

- `config/autonomous-bridge-manifest.json`

## Required Implementation After Doc Install

The docs are installed. The next build must implement:

- `scripts/generate-eden-full-site.mjs`
- package script `generator:full-site`
- `tests/eden-full-site-generator.test.mjs`
- `data/factory/receipts/eden-full-site-generator-latest.json`

## Protected Actions

The generator must not perform these without explicit approval:

- production deploy
- live Shopify payment activation
- Shopify live product/theme/discount/inventory mutation
- Supabase production schema mutation
- public social publishing
- Gmail send to real customers
- Calendar event creation with external attendees
- domain/DNS/billing changes
- secret rotation
- destructive Git operations
- PR ready-for-review movement
- merge or release

## Validation Command Set

After generator implementation:

```powershell
npm run generator:full-site
npm test
npm run build
npm run visual:preview-bridge
```

## Current Rule

PR #2 remains draft. Visuals remain unapproved until generated site screenshots are captured and reviewed.