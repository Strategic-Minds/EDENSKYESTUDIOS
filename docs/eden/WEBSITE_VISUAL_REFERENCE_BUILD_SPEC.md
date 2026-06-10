# Eden Skye Studios Website Visual Reference Build Spec

Schema version: 1.0.0
Packet ID: ESS-WEBSITE-VISUAL-REFERENCE-BUILD-SPEC-001
Mode: branch_sandbox_only

## Purpose

Define how Vercel Workflow uses uploaded visual references, model registry records, creator records, avatar records, and Drive assets to generate Eden Skye website sections without manual redesign or invented facts.

## Dependencies

- docs/eden/visual-source-truth.json
- docs/eden/VERCEL_WORKFLOW_VISUAL_BUILD_PACKET.json
- docs/eden/IMAGE_TO_MODEL_SYSTEM_MAP.json
- docs/eden/IMAGE_REGISTRY_SPEC.json
- docs/eden/MODEL_PERSONA_REGISTRY_SPEC.json
- docs/eden/CONTENT_CREATOR_SYSTEM_SPEC.json
- docs/eden/AVATAR_REGISTRY_SPEC.json
- docs/eden/ASSET_LIFECYCLE_SPEC.md
- docs/eden/AUTONOMOUS_HARDENING_SPEC.md
- docs/eden/MODEL_SOURCE_TRUTH_EXTRACTION_SPEC.md

## Visual Source Truth

The uploaded homepage reference controls the public visual target. The uploaded roster and theme boards control model, creator, faceless, avatar, and content-system structure.

## Page Generation Targets

- Home
- Models
- Men
- Women
- International
- 50-80 Models
- Faceless Accounts
- Auto Social
- Brand Partners
- Eden Closet
- PWA App
- Xyla Feed
- Apply
- Contact
- Black Card Gate

## Component Mapping

- Hero uses homepage visual source truth.
- Model previews use image registry and model persona records.
- International page uses international model lane records.
- 50-80 page uses mature model lane records.
- Faceless page uses exactly 20 faceless theme records.
- Auto Social page uses creator system records and faceless theme records.
- Avatar sections use avatar registry records with image registry references.
- Brand Partner sections use verified creator and content-pack records only.

## Page Build Rules

- Vercel Workflow may generate sandbox pages from registry records.
- Pages must not publish to production without explicit approval.
- Public pages must not use private local paths.
- Public pages must not expose secrets or raw internal receipts.
- Unverified model facts must render as pending verification or stay hidden.
- Active public profiles require verified image registry references.

## Validation Rules

- Required visual source assets must exist in the registry.
- Active model cards require primary image asset IDs.
- Faceless Accounts page requires exactly 20 theme records.
- International Models page requires exactly 20 verified or draft records from source truth.
- Mature Models page requires exactly 20 verified or draft records from source truth.
- Other lanes must use Drive inventory counts and must not be capped at 10.
- All generated sections must trace back to source truth.

## Auto-Heal Behavior

- Missing image pauses the affected page card.
- Missing model persona hides public profile and keeps draft record.
- Missing creator channel pauses social module.
- Broken image URL triggers registry repair and receipt.
- Count mismatch blocks page generation for that lane.

## Receipt Requirements

Receipts are required for:

- website_section_generated
- website_page_generated
- visual_reference_consumed
- page_validation_failed
- page_auto_heal_performed
- sandbox_build_ready

## Vercel Workflow Instructions

Read this spec before generating website outputs. Generate sandbox outputs only. Do not deploy production, publish social content, message customers, change DNS, publish Shopify live theme changes, or expose secrets.
