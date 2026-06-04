# Drive And Git Folder Architecture

## Principle

Drive stores media and working artifacts. Git stores source truth, manifests, code, blueprints, contracts, prompts, indexes, and receipts.

## Drive Target Architecture

Recommended Eden Skye Studios Drive structure:

```text
EDEN SKYE STUDIOS/
  00-INDEX/
    STUDIO_MASTER_INDEX
    MODEL_ROSTER_INDEX
    APPROVAL_QUEUE_INDEX
  01-BRAND-BIBLES/
    MASTER_BRAND_BIBLE
    MODEL_BRAND_BIBLES
    VISUAL_IDENTITY
  02-MODEL-ROSTER/
    F01-EDEN-SKYE/
      00-README
      01-SOURCE-IMAGES/
      02-HEYGEN-READY/
      03-FULL-BODY/
      04-EXPRESSIONS/
      05-WARDROBE/
      06-ENVIRONMENTS/
      07-GENERATED-OUTPUTS/
      08-REJECTED-DRIFT/
      09-RECEIPTS/
    F02-LUNA-VALE/
    F03-NOVA-RAE/
    F04-SCARLETT-FROST/
    F05-ARIA-BLOOM/
    M01-ATLAS-KANE/
    M02-JAXON-STEELE/
    M03-ORION-BLACK/
    M04-RYDER-CROSS/
    M05-MASON-COLE/
  03-CONTENT-FACTORY/
    HOOKS
    SCRIPTS
    CAPTIONS
    CALENDARS
    CAMPAIGNS
  04-PRODUCTS-DOWNLOADS/
    PROMPT-VAULTS
    TEMPLATES
    KITS
    MOCKUPS
  05-SERVICES-LICENSING/
    SERVICES
    LICENSING-PACKETS
    CLIENT-INQUIRIES
  06-MEDIA-PRODUCTION/
    HEYGEN
    RUNWAY
    CANVA
    DESCRIPT
    PHOTOSHOP
  07-SOCIAL-PUBLISHING/
    DRAFTS
    APPROVED
    SCHEDULED
    PUBLISHED
    ANALYTICS
  08-SHOPIFY-COMMERCE/
    PRODUCTS
    COLLECTIONS
    OFFERS
    LANDING-COPY
  09-APPS-TOOLS/
    APP-SPECS
    UI-MOCKUPS
    EXPORTS
  10-RECEIPTS-TELEMETRY/
    TOOL-RECEIPTS
    APPROVALS
    HEALTH-CHECKS
    BLOCKERS
```

## Git Target Architecture

Recommended repo structure:

```text
app/
components/
lib/
ops/
  studio-bootstrap/
  finalization/
  agency-foundation/
  receipts/
assets/
  avatars/
    f01-eden-skye/
      manifest.json
      prompts.md
      rejected-drift.md
supabase/
  migrations/
  seed/
public/
  brand/
```

## Current Git Foundation

Existing source packs:

- `ops/studio-bootstrap/`
- `ops/finalization/`
- `ops/agency-foundation/`

## Folder Completion Rule

A Drive model folder is complete when it has:

- README/index
- source images
- clean HeyGen-ready portrait
- full-body references
- expression references
- wardrobe references
- environment references
- generated outputs
- rejected drift examples
- receipts

A Git model folder is complete when it has:

- manifest
- source image IDs
- prompt bank
- approved/rejected rules
- licensing status
- readiness receipt

## Sync Rule

When a Drive image is added, Git manifest must be updated with:

- model ID
- Drive file ID
- file URL
- asset role
- readiness status
- usage rights/status
- validation receipt
