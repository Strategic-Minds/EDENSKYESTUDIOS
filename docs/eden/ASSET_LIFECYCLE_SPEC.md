# Eden Skye Studios Asset Lifecycle Spec

Schema version: 1.0.0  
Packet ID: ESS-ASSET-LIFECYCLE-SPEC-001  
Mode: branch_sandbox_only

## Purpose

Define how Eden Skye assets move through source truth, registry, validation, sandbox build, approval, activation, pause, quarantine, retirement, audit, and recovery.

## Dependencies

- docs/eden/visual-source-truth.json
- docs/eden/IMAGE_TO_MODEL_SYSTEM_MAP.json
- docs/eden/IMAGE_REGISTRY_SPEC.json
- docs/eden/MODEL_PERSONA_REGISTRY_SPEC.json
- docs/eden/CONTENT_CREATOR_SYSTEM_SPEC.json
- docs/eden/AVATAR_REGISTRY_SPEC.json

## Lifecycle States

1. source_truth_received
2. pending_drive_upload
3. drive_verified
4. registry_pending
5. registry_validated
6. sandbox_ready
7. approval_required
8. approved_for_sandbox
9. active_after_approval
10. paused
11. quarantined
12. retired

## Promotion Rules

- Asset cannot leave pending_drive_upload until Drive file ID is verified.
- Asset cannot become registry_validated until required metadata exists or is marked pending_verification.
- Model profile cannot become active_after_approval without a verified primary image.
- Creator cannot become active_after_approval without a valid persona or faceless theme.
- Avatar cannot become active_after_approval without image registry references.
- Public website usage requires safe public image URL or approved CDN mirror.

## Retirement Rules

- Retired assets stay in the registry.
- Retired assets must keep receipts.
- Retired assets must not be deleted unless a separate destructive-action approval exists.
- Retired profiles must not publish, schedule, or appear in public pages.

## Audit Trail

Every state change must write a receipt with:

- receipt_id
- asset_id
- previous_state
- next_state
- actor
- reason
- timestamp
- source_truth_reference
- validation_result

## Auto-Heal Procedures

- Missing Drive file sets asset to pending_drive_upload.
- Broken public URL sets asset to paused.
- Missing image on active profile sets profile to inactive.
- Failed validation sets asset to approval_required or quarantined.
- Duplicate asset is flagged and linked to the original source.
- Missing metadata is filled only with pending_verification.

## Validation Checkpoints

- before_registry_write
- before_sandbox_build
- before_public_activation
- before_social_schedule
- before_shopify_publish
- before_avatar_generation
- before_metricool_schedule

## Approval Gates

The following stay false unless Jeremy explicitly approves the action:

- production_deploy
- social_publish
- customer_messages
- dns_changes
- shopify_live_publish
- secret_exposure
- payment_changes
- destructive_actions

## Receipt Requirements

Receipts are required for:

- asset_added
- asset_uploaded
- asset_validated
- asset_promoted
- asset_paused
- asset_quarantined
- asset_retired
- auto_heal_performed
- schema_hardened

## Autonomous Recovery Behavior

The system may repair records, mark missing values pending_verification, pause incomplete assets, quarantine invalid assets, rebuild sandbox outputs, and write receipts. It may not publish, deploy production, message customers, change DNS, expose secrets, or delete assets without approval.
