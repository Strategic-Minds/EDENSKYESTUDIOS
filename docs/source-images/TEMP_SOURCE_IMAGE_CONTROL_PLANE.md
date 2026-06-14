# Temporary Eden Source Image Control Plane

## Plan Mode

### Objective

Create a temporary branded admin surface for source image storage, manifest matching, approval review, image/video draft creation, and leak testing.

### Existing Sources Analyzed

- Drive root folder `1oCEjD6kUm9FiYDh1w-dNE9PPiggj65MQ`
- `07_IMAGE_VIDEO_FACTORY`
- `08_STOCK_IMAGE_MODEL_ASSETS`
- `STOCK_IMAGE_MASTER_MANIFEST_REPAIRED.csv`
- `TODAY_IMAGE_BATCH_QUEUE_2026-06-12.csv`
- `IMAGE_AGENT_RUN_CONTRACT_2026-06-12.json`
- Repo README, AGENTS, START_HERE, governance docs, and PR #8/#9 summaries
- Uploaded black chat UI package `01-black-chat-ui-2-8-.zip`

### Current Reality

The image pipeline has strong manifest, prompt, naming, QA, regeneration, safety, and approval rules. Actual generated and approved image binaries were not verified in the inspected Drive folders.

### Approval Gates

Open for sandbox testing:

- draft image generation
- binary-to-manifest matching
- QA receipt creation
- quarantine routing
- pending-admin-review routing
- install packet creation
- simulated leak testing
- video draft packet creation

Still blocked without explicit approval:

- public publishing
- live website asset replacement
- Shopify mutation
- production deploy
- payment or checkout mutation
- live HeyGen/avatar activation
- Supabase production service-role write
- destructive Drive parent/share/delete/move changes

## Build Mode

### Added Surface

- `/eden-source-images`

This page follows the black chat/editor UI pattern:

- chat command lane on the left
- editor/admin surface on the right
- manifest queue table
- Drive bulk storage references
- approval controls
- leak-test panel
- video draft lane

### Added Data Route

- `/api/eden/source-images/control-plane`

This route returns the temporary Drive ids, manifest ids, expected output filenames, allowed sandbox actions, blocked live actions, and expected leak-test outcomes.

### Operating Rule

This is a sandbox-open control plane. It intentionally exposes the pipeline for testing, but live mutation remains blocked. The purpose is to detect leaks, not to remove governance from consequential systems.

### Next Required Work

1. Generate or upload the 12 expected image binaries.
2. Attach each binary to its exact manifest output filename.
3. Record QA score, dimensions, MIME type, source Drive file id, and approval status.
4. Run leak tests and record receipts.
5. Promote PR #8 image install executor only after every required image is approved and manifest-matched.
