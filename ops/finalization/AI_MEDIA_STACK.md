# Eden Skye Studios AI Media Stack

## Objective

Create a controlled, repeatable AI media system for Eden Skye images, avatar videos, social clips, and campaign assets.

## Source Asset Rule

No avatar generation should start from vague identity memory. Every job must reference:

- `avatar_id`
- source image IDs
- target output type
- brand lock
- safety rules
- receipt destination

## Current F01 State

F01 Eden Skye has three indexed Drive source images.

Best current path:

1. Use the gray lounge outfit collage as identity reference.
2. Create or crop a clean single head-and-shoulders portrait.
3. Validate face continuity.
4. Request approval for HeyGen avatar creation/training.
5. Only then create/train/use HeyGen avatar.

See:

- `ops/studio-bootstrap/avatar-stock-index.json`
- `ops/studio-bootstrap/f01-avatar-readiness-pass.md`

## GPT Role

GPT creates:

- prompts
- scripts
- shot lists
- captions
- approval packets
- validation criteria
- receipts

GPT does not bypass approvals.

## Higgins Role

Higgins routes and operates controlled jobs.

Higgins may:

- read manifests
- create sandbox job packets
- choose indexed source assets
- queue drafts
- log receipts
- flag blockers

Higgins may not:

- publish publicly
- train avatars
- deploy production
- mutate schema
- change commerce
- delete assets

without approval.

## HeyGen Role

HeyGen creates avatar/talking videos after approval.

Required packet:

- avatar name
- avatar ID
- source image or trained look ID
- script
- voice direction
- aspect ratio
- caption policy
- approval receipt

## Image Generation Role

Image generation creates private/sandbox visuals unless explicitly approved for public campaign use.

Default Eden prompt frame:

```text
Fictional adult brunette luxury AI creator Eden Skye, premium cinematic editorial portrait, warm expressive eyes, refined features, dark flowing hair, polished makeup, elegant feminine styling, soft golden-hour or warm studio light, high-end lifestyle setting, emotionally warm and composed, tasteful non-explicit glamour, realistic anatomy, natural skin texture, no text, no watermark.
```

Avoid:

```text
explicit nudity, pornographic framing, age ambiguity, distorted anatomy, extra fingers, uncanny face, cheap influencer look, harsh lighting, text, logo, watermark, identity drift
```

## Video Production Role

Video assets should be built from:

- hook
- scene intent
- avatar/source image
- spoken script
- visual setting
- caption/CTA
- repurpose plan

Default short-form structure:

1. 0-2 seconds: visual hook
2. 2-8 seconds: emotional or identity statement
3. 8-18 seconds: story/value beat
4. 18-25 seconds: soft CTA or reflection

## Missing Media Pack

For full automation, build:

- HeyGen primary portrait
- neutral/smile/speaking expression set
- left/right/profile head angles
- full-body continuity set
- wardrobe canon set
- environment set
- rejected drift examples
- approved prompt bank

## Validation Scoring

Every generated image/video should be scored:

- face continuity: 1-5
- brand fit: 1-5
- safety/platform fit: pass/fail
- technical quality: 1-5
- use readiness: draft/needs edit/approved candidate/rejected

Public use requires approval even when scoring passes.
