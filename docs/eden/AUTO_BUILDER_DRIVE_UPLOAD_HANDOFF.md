# Eden Skye Studios Auto Builder Drive Upload Handoff

Schema version: 1.0.0
Packet ID: ESS-AUTO-BUILDER-DRIVE-UPLOAD-HANDOFF-001
Mode: branch_sandbox_only

## Purpose

Provide the governed handoff between Eden source truth packets and Auto Builder Drive execution once Drive upload tooling becomes available.

## Dependencies

- visual-source-truth.json
- VERCEL_WORKFLOW_VISUAL_BUILD_PACKET.json
- IMAGE_TO_MODEL_SYSTEM_MAP.json
- IMAGE_REGISTRY_SPEC.json
- MODEL_PERSONA_REGISTRY_SPEC.json
- CONTENT_CREATOR_SYSTEM_SPEC.json
- AVATAR_REGISTRY_SPEC.json
- ASSET_LIFECYCLE_SPEC.md
- AUTONOMOUS_HARDENING_SPEC.md
- MODEL_SOURCE_TRUTH_EXTRACTION_SPEC.md
- WEBSITE_VISUAL_REFERENCE_BUILD_SPEC.md

## Upload Governance

Uploads remain blocked until:

- approved_write mode exists
- approvalId is supplied
- receiptRequired is true
- Drive execution route is available
- Drive folder target is verified

## Canonical Targets

Root:

- EDEN SKYE STUDIOS
- Folder ID: 1uCsLaebFWtiMQ3T6A8i_NvgzWB6Kmxgk

Model System:

- Folder ID: 1nVGU4p4mCosBzcqMYoXYwafHGGMej62P

Verified parent folders:

- Faceless Accounts: 1oJ_7ijaJ9QrJVkW7BErz5ctOPl4jX7IE
- International Models 18-35: 1YY9y5Ycm2zDDV_MdptdBGsVuY_3bao7_
- Mature Models 50-80: 1QyjlUQ_Iq4rABahigFKpP3c-CFoiii3f

## Upload Workflow

1. Inventory Drive.
2. Verify folder IDs.
3. Create image registry record.
4. Generate upload receipt.
5. Execute approved-write upload.
6. Verify returned file ID.
7. Update image registry.
8. Update manifests.
9. Write completion receipt.

## Validation Rules

- Upload must return Drive file ID.
- Upload must return parent folder ID.
- Upload must return receipt ID.
- Registry update must succeed.
- Manifest update must succeed.
- Missing results block activation.

## Auto-Heal Behavior

- Missing file ID pauses registry activation.
- Missing folder ID blocks upload.
- Missing receipt blocks promotion.
- Broken Drive link triggers repair workflow.

## Approval Gates

Blocked by default:

- production deploy
- social publish
- customer messages
- DNS changes
- Shopify live publish
- destructive actions
- secret exposure

## Vercel Workflow Instructions

Consume Drive uploads only after Auto Builder exposes approved Drive execution tools. Generate receipts and registry updates. Remain in sandbox mode until explicit approval exists.
