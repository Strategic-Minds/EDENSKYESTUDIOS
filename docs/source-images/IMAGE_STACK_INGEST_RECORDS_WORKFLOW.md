# Eden Image Stack Ingest Records Workflow

## Status

Preview-safe implementation for routing GPT, Eden editor, generated image, and uploaded image metadata into the Image Stack approval ledger.

## Live Surfaces

- UI: `/eden-source-images/image-stack`
- Editor: `/eden-source-images`
- Image generation API: `/api/eden/source-images/generate-image`
- Ingest API: `/api/eden/source-images/ingest-generated`
- Control plane: `/api/eden/source-images/control-plane`
- Drive approval map: `/api/eden/source-images/drive-approval-map`

## Verified Admin Drive Package

- Root folder: `1oCEjD6kUm9FiYDh1w-dNE9PPiggj65MQ`
- Admin control-plane folder: `1EMnjZKTBT4wlO0ZgR5F6tXDKV1dvK76x`
- ZIP package file: `104GT_RN95yIEeUybLXLd7Q2wFsk6lYjC`
- Unzipped package folder: `1vDvg27JrMUghw_-kwlP4yCvdHRU2MH98`
- Placement manifest CSV: `1ExzMzWaW1IqrGDk5n1_i0FI789-7N3JB`
- Workflow receipt: `1fA-DjGEAeO3pRVVtk_zCZZcFeVipgtot`
- Supabase notation: `1nlWjKaTmQZMMHcg3m_zM2k-LIUjc7bkP`
- README: `1AB3NpXbi3J634Z_p3bVRg-n_d3NBaNXu`

## Record Contract

Every generated or uploaded image should resolve to an ingest receipt with:

- original filename
- proposed Eden system filename
- manifest slot
- QA score and minimum QA score
- approval color: green, yellow, or red
- approval folder: Drafts, Needs Review, Approved, Rejected, or Drive Ready
- Drive file ID and URL when available
- Supabase receipt ID
- GitHub notation path
- original prompt and Eden production prompt when available
- model/provider when available

## Current Implementation

The Image Stack page now:

- loads Drive-backed TEMP images from the existing approval map
- accepts local image uploads through drag/drop or file picker
- automatically prepares an ingest receipt for local uploads
- records approval-folder moves as ingest receipt updates
- records QA score updates through the ingest API
- stores the latest receipts in browser localStorage under `eden-image-stack-ingest-records-v1`
- keeps binary upload and external writes blocked from preview

The image generation API now:

- automatically builds an `ingestReceipt` for every image generation response
- records prompt, safe production prompt, model, QA placeholder, approval color, approval folder, manifest slot, Supabase receipt placeholder, and GitHub notation path
- returns receipt metadata for successful generations, blocked prompts, missing gateway credentials, and failed generations
- does not upload generated binaries to Drive from preview

The ingest API now:

- returns a deterministic receipt ID
- normalizes filename, manifest slot, approval color, QA score, Drive ID, Supabase receipt, and GitHub notation
- returns Drive/Supabase/GitHub notation objects
- does not perform live Drive, Supabase, or GitHub writes from preview

## Governance

This is receipt-only and preview-safe.

Blocked until verified approval and connector execution exist:

- Drive binary upload or destructive Drive movement
- Supabase production insert/update/migration
- GitHub commit generated from public preview
- Shopify asset/product/theme mutation
- HeyGen final avatar activation
- PR #8 image install promotion
- public publishing

## Next Build Step

Promote this from receipt-only to durable persistence by adding an approved Supabase migration for `eden_source_image_assets` and `eden_source_image_ingest_receipts`, then wire the ingest API and generation API to insert records with service-role credentials only after approval and rollback notes are present.
