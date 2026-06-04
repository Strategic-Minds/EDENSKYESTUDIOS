# GPT, Higgins, and HeyGen Handoff

## Objective

Give GPT, Higgins, and HeyGen the minimum controlled system needed to create Eden Skye Studios images and videos from approved avatar stock assets.

## Required Read Order

1. `ops/studio-bootstrap/manifest.json`
2. `ops/studio-bootstrap/avatar-stock-index.json`
3. `ops/studio-bootstrap/automation-approval-matrix.json`
4. `ops/studio-bootstrap/drive-index.md`
5. `ops/studio-bootstrap/sync-receipt.md`

## GPT Role

GPT should:

- Read the manifest and avatar stock index before creating media prompts.
- Select the avatar by `avatar_id`, not by loose names.
- Use Drive file IDs as source-image references.
- Preserve Eden Skye's fictional adult AI identity boundary.
- Create prompts, scripts, captions, and shot lists only inside the safety and brand rules.
- Write receipts for any proposed image, video, or publishing action.
- Route risky actions to approval.

GPT should not:

- Claim Eden Skye is a real human.
- Invent source images that are not in the index.
- Publish, schedule, train avatars, deploy, mutate Supabase, or alter commerce without approval.

## Higgins Role

Higgins should act as a controlled automation/operator layer.

Before any action, Higgins should load:

- `manifest.json`
- `avatar-stock-index.json`
- `automation-approval-matrix.json`

Higgins may autonomously:

- classify avatar/media tasks
- choose a source image from the index
- draft generation prompts
- draft video scripts
- queue sandbox jobs
- create receipts
- flag missing assets

Higgins must request approval before:

- public publishing
- public scheduling
- HeyGen avatar creation/training
- production Vercel deploy
- Supabase schema mutation
- Shopify mutation
- Stripe/payment change
- asset deletion

## HeyGen Role

HeyGen should be treated as an execution layer, not the source of truth.

Before creating or using an avatar, HeyGen needs:

- approved avatar name and `avatar_id`
- source image or asset URL from `avatar-stock-index.json`
- consent/training status where applicable
- intended video format
- script and voice direction
- approval receipt if creating/training a new avatar

Current HeyGen state:

- Eden Skye source images are indexed and ready as source candidates.
- Private HeyGen avatar inventory was not verified because the connector call was declined.
- No HeyGen avatar creation or training was performed in this bootstrap pass.

## Eden Skye Media Direction

Use this default visual direction for Eden Skye:

- fictional adult brunette luxury creator and AI icon
- premium editorial realism
- warm eyes, refined makeup, polished brunette hair
- cinematic natural light, golden hour, soft interior/window light
- luxury fashion, blazer, evening dress, tasteful glamour, resort/editorial styling
- emotionally warm, confident, composed, feminine, high-trust
- sensual only in a refined, non-explicit, platform-safe way

Avoid:

- nudity or explicit sexual framing
- exploitative body framing
- childlike or age-ambiguous styling
- distorted anatomy or face drift
- generic stock-photo tone
- deceptive claims that Eden is a real person

## Standard Image Job Packet

Every image job should include:

- `job_id`
- `avatar_id`
- `avatar_name`
- `source_image_ids`
- `output_use_case`
- `platform`
- `prompt`
- `negative_prompt_or_avoidance_rules`
- `approval_required`
- `receipt_destination`

## Standard Video Job Packet

Every HeyGen/video job should include:

- `job_id`
- `avatar_id`
- `avatar_or_look_id` if available
- `source_image_id` if avatar/Look is not yet trained
- `script`
- `voice_direction`
- `aspect_ratio`
- `output_format`
- `caption_policy`
- `approval_receipt`
- `status`

## First Safe Next Action

Create a sandbox-only avatar readiness job for `F01 Eden Skye` using the three indexed source images. The job should compare face continuity, image quality, suitability for HeyGen photo avatar creation, and recommended primary source image. Do not train or create a HeyGen avatar until approved.
