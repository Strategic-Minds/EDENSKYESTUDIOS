# EDENSKYESTUDIOS Auto Image Generator

Date: 2026-06-16
Status: approval-gated draft generation infrastructure

This folder is the GitHub mirror for the Drive canon auto-image generator package. It defines how image requests are safely converted into draft generation packets using the existing Drive source portraits and Eden Skye Studios brand tokens.

## Verified Drive Sources

- Source portrait manifest: `eden-labeled-source-portraits-13-manifest-2026-06-14.json`
- Brand tokens: `eden-skye-brand-tokens.json`
- Image style guide: `Image_Style_Guide.md`
- Prompt style guide: `Prompt_Style_Guide.md`
- Stock manifest: `STOCK_IMAGE_MASTER_MANIFEST.csv`
- Model requirements: `MODEL_IMAGE_REQUIREMENTS.csv`

## Implemented Files

- `auto-image-generator-config.json`: brand, safety, asset type, and gate configuration.
- `source-image-registry.json`: source portrait IDs and approval status summary.
- `image-output-qa-gate.json`: output review gate and allowed autonomous final states.
- `tools/social-intelligence/auto-image-generator.mjs`: dry-run packet generator.

## Operating Boundary

Allowed autonomously:

- Build draft prompt packets.
- Validate source portrait status.
- Validate required fields.
- Attach QA requirements and receipts.
- Route asset requests to persona, platform, and format.

Requires explicit approval:

- Public use of generated images.
- Paid generation at scale.
- Publishing, posting, replying, messaging, or ad activation.
- HeyGen/avatar/video activation.
- Using any asset with unresolved rights, age, identity, or likeness status.

## Current Source Portrait Status

- 12 labeled source portraits are approved for draft generation.
- Eden Skye is pending operator final approval and remains blocked for generation/public use in this package.
- All generated outputs remain `draft_ready_pending_review` until explicitly approved.

## Run Pattern

```bash
node tools/social-intelligence/auto-image-generator.mjs \
  --config docs/operations/social-intelligence/image-generator/auto-image-generator-config.json \
  --registry docs/operations/social-intelligence/image-generator/source-image-registry.json \
  --queue docs/operations/social-intelligence/image-generator/image-generation-queue-schema.csv \
  --out image-generation-packets.json
```

The script produces draft packets only. It does not call image models, publish, post, message, or mutate production systems.
