# Eden Skye Studios Model Source Truth Extraction Spec

Schema version: 1.0.0
Packet ID: ESS-MODEL-SOURCE-TRUTH-EXTRACTION-SPEC-001
Mode: branch_sandbox_only

## Purpose

Define how uploaded visual references and canonical Drive assets become model records, persona records, creator records, avatar records, website sections, and Drive asset records.

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

## Extraction Rule

Uploaded visual references are authoritative for visual structure, roster layout, categories, and required counts. They are not permission to invent names, ages, countries, handles, personal stories, revenue claims, or customer promises.

## Required Outputs

- Faceless account themes: exactly 20 when extracted from ess_faceless_20_themes.
- International models: exactly 20 when extracted from international visual references.
- Mature models age 50 plus: exactly 20 when extracted from ess_mature_model_roster.
- Other male and female lanes: count must come from Drive inventory. Do not cap at 10.

## Extraction Pipeline

1. Read visual-source-truth.json.
2. Read IMAGE_TO_MODEL_SYSTEM_MAP.json.
3. Inventory canonical Drive folder IDs.
4. Create image_registry records for every verified image.
5. Create model_lanes from canonical folder mapping.
6. Create draft model_personas with pending_verification for missing fields.
7. Create creator identities only from verified persona or faceless theme records.
8. Create avatar records only when image registry references exist.
9. Create website sections from verified lanes and records.
10. Write receipts for every generated registry record.

## Field Extraction Policy

Allowed from image or Drive source truth:

- lane
- category
- visual group
- visible roster count
- image filename
- Drive file ID
- folder ID
- visual theme
- page mapping

Pending verification unless explicitly verified:

- legal name
- display name
- age
- country
- city
- social handle
- biography
- licensing claim
- pricing claim
- performance claim

## Record Status Rules

- profile_status starts as draft.
- verification_status starts as pending_verification unless verified from registry.
- public activation requires image, persona, source truth, and receipt.
- missing image forces inactive.
- missing receipt blocks activation.

## Auto-Heal Behavior

- Missing metadata becomes pending_verification.
- Missing image sets record inactive.
- Broken Drive reference sets record review_required.
- Duplicate asset gets duplicate flag and source link.
- Count mismatch blocks workflow output.

## Receipts Required

- extraction_started
- drive_inventory_completed
- image_record_created
- model_persona_created
- creator_record_created
- avatar_record_created
- website_section_created
- validation_failed
- auto_heal_performed

## Approval Gates

Blocked by default:

- production deploy
- social publish
- customer messages
- DNS changes
- Shopify live publish
- secret exposure
- destructive actions

## Vercel Workflow Consumption

Vercel Workflow must use this file to generate sandbox outputs only. It may create drafts, manifests, validation results, and receipts. It may not publish or deploy production without explicit approval.
