# F01 Eden Skye Avatar Readiness Pass

Date: 2026-06-04
Operator: Eden Skye
Working folder: `/workspace` cloud container
Local inspection folder: `/workspace/eden-avatar-readiness`
Repo: `Strategic-Minds/EDENSKYESTUDIOS`
Drive source folder: https://drive.google.com/drive/folders/1q3JsMoHs_EKxn2NyMfX7-uSAE6QcBuJl

## Objective

Rank the three discovered F01 Eden Skye source images for HeyGen/photo-avatar use and define the missing stock-image set needed for fully automated controlled image and video generation.

## Images Inspected

All three images were downloaded from Drive and inspected locally. Each is a 1536 x 1024 PNG.

### Image A

- Title: `ChatGPT Image Jun 4, 2026, 12_02_18 AM.png`
- Drive file ID: `1bGqd754UezoKLNhfcGsUrTCgrmbUqa_5`
- Local inspection file: `/workspace/eden-avatar-readiness/f01-primary-jun4-000218.png`
- Type: prompt/contact-sheet hybrid with embedded text and multiple pose cells

### Image B

- Title: `ChatGPT Image Jun 3, 2026, 11_27_37 PM.png`
- Drive file ID: `1g02LVzAEg5gLBdcpbyM_T8PwTGrdmAWj`
- Local inspection file: `/workspace/eden-avatar-readiness/f01-support-jun3-232737.png`
- Type: full-body turnaround collage in black bikini with labeled angle cells

### Image C

- Title: `ChatGPT Image Jun 3, 2026, 11_17_55 PM.png`
- Drive file ID: `14rhoKGJWc-dgn66XCbfNEjKfAbEtPPZg`
- Local inspection file: `/workspace/eden-avatar-readiness/f01-support-jun3-231755.png`
- Type: head/upper-body and full-body turnaround collage in gray lounge outfit

## Ranking For HeyGen / Photo Avatar Use

### 1. Image C - Best Current Candidate

Use as the primary current reference for HeyGen/photo-avatar preparation.

Why:

- Strongest face clarity in the top-left portrait cell.
- Most natural, commercially usable wardrobe for an avatar system.
- Better facial continuity and head-angle coverage than the other two images.
- Softer, less explicit presentation than the bikini sets.
- Includes face-forward, side/profile, three-quarter, back hair view, and full-body references.

Limitations:

- It is still a collage, not a single clean source portrait.
- HeyGen photo-avatar creation usually performs best from one clean, high-resolution portrait without panel borders.
- Needs a cropped/exported single portrait from the top-left or a newly generated clean head-and-shoulders image before actual avatar creation/training.

Verdict:

Best current source for identity, face, and HeyGen prep. Do not submit the full collage directly if a cleaner single portrait can be created first.

### 2. Image B - Best Body Turnaround Reference

Use as the main body continuity and motion/pose reference.

Why:

- Strongest full-body angle set.
- Clear front, side, back, 45-degree, and arms-up variations.
- Useful for automated image generation, full-body continuity, model-sheet reference, and pose expansion.

Limitations:

- Bikini styling is more sensitive and should be treated as tasteful editorial reference only.
- Labels and collage layout make it unsuitable as a direct HeyGen source image.
- Face is smaller and less useful for photo-avatar source than Image C.

Verdict:

Excellent body reference, not the first HeyGen source.

### 3. Image A - Best Production Brief / Prompt Spec

Use as a planning prompt/spec sheet, not as an avatar source.

Why:

- Contains useful production requirements, pose types, expression targets, lip-sync considerations, and image-set expectations.
- Helpful for telling GPT/Higgins what stock images are missing.

Limitations:

- Embedded instructional text makes it inappropriate as a direct avatar or image-generation source.
- Heavy collage layout with many tiny faces and bodies.
- The text panel can contaminate downstream vision/prompt systems.

Verdict:

Keep as a production planning artifact. Do not use as direct HeyGen/photo-avatar source.

## HeyGen Readiness

Current readiness: `not_ready_for_direct_training`, `ready_for_preparation_packet`.

Reason:

The three available files are useful, but all are collages/contact sheets. For a reliable HeyGen photo-avatar workflow, Eden needs a clean single-image source, ideally:

- head-and-shoulders portrait
- face-forward
- neutral expression or soft smile
- eyes open and sharp
- no text, labels, panels, borders, watermarks, or collage layout
- natural skin texture
- no extreme cleavage or sensitive styling
- simple premium background
- consistent brunette hair and facial identity

Recommended immediate action before HeyGen creation:

Create or crop a clean `F01_EDEN_SKYE_HEYGEN_PRIMARY_PORTRAIT` from Image C or generate a new clean portrait using Image C as the visual reference. Then run one more face-continuity check before submitting to HeyGen.

## Missing Stock-Image Set For Fully Automated Image/Video Generation

To make Eden Skye fully controllable for autonomous image/video generation, the current three image sheets are not enough. The system needs the following asset pack.

### A. HeyGen / Talking Avatar Source Pack

Minimum required:

1. Clean face-forward head-and-shoulders portrait, neutral expression.
2. Clean face-forward head-and-shoulders portrait, soft smile.
3. Clean three-quarter left portrait.
4. Clean three-quarter right portrait.
5. Clean left profile portrait.
6. Clean right profile portrait.
7. Clean upper-body portrait with natural hand position.
8. Clean waist-up seated portrait.

Preferred wardrobe:

- champagne silk camisole or elegant neutral top
- black blazer over soft top
- warm beige/cream lounge top
- no busy patterns
- no visible brand logos

### B. Expression And Lip-Sync Pack

Needed for automated video direction and visual continuity:

1. Neutral listening expression.
2. Soft smile.
3. Warm laugh/smile.
4. Thoughtful gaze.
5. Slightly surprised/open-mouth speaking frame.
6. Mid-sentence mouth shape.
7. Calm direct eye contact.
8. Looking down softly.
9. Looking camera-left.
10. Looking camera-right.

### C. Full-Body Continuity Pack

Needed for image generation, thumbnails, visual campaigns, and future motion/video tools:

1. Front full-body neutral stance.
2. Left 45-degree full body.
3. Right 45-degree full body.
4. Left profile.
5. Right profile.
6. Back view for hair/wardrobe continuity.
7. Walking pose.
8. Seated pose.
9. Leaning pose.
10. Hands-at-sides neutral reference.

### D. Wardrobe Canon Pack

Needed so automation can choose a look by campaign type:

1. Executive black blazer look.
2. Champagne evening dress look.
3. Soft lounge/wellness look.
4. Black tasteful editorial glamour look.
5. White or cream resort look.
6. Fitness/wellness set.
7. Night-out cinematic look.
8. Simple neutral top for avatar/talking-head safety.

### E. Environment Pack

Needed for controlled image/video generation contexts:

1. Minimal warm studio wall.
2. Luxury bedroom/editorial interior.
3. Rooftop golden hour.
4. Hotel lounge/penthouse.
5. Vanity/beauty close-up setting.
6. Cafe/lifestyle setting.
7. Wellness morning/window-light setting.
8. Neutral green-screen or clean background source.

### F. Tool-Specific Manifests Needed

For full automation, create these files after the asset pack exists:

- `assets/avatars/f01-eden-skye/manifest.json`
- `assets/avatars/f01-eden-skye/heygen-source-pack.json`
- `assets/avatars/f01-eden-skye/image-generation-reference-pack.json`
- `assets/avatars/f01-eden-skye/video-shot-list.json`
- `assets/avatars/f01-eden-skye/approved-prompts.md`
- `assets/avatars/f01-eden-skye/rejected-drift-notes.md`
- `assets/avatars/f01-eden-skye/receipts/README.md`

## Recommended Automation Decision

Do not send any of the three full collage sheets directly to HeyGen for final avatar creation.

Use Image C as the identity source and Image B as the body reference. Create a clean portrait source from Image C or generate a new clean portrait. Then request approval for HeyGen avatar creation/training with:

- selected source image
- avatar name: `F01 Eden Skye`
- intended use: controlled private avatar testing
- approval receipt
- consent/training status

## Current Status

- GPT readiness: ready for controlled prompt/script/job packet generation.
- Higgins readiness: ready to consume manifests and route sandbox jobs.
- HeyGen readiness: source identity ready, direct training not ready until clean portrait is created and approved.
- Fully automated image/video readiness: partial. Needs the missing stock-image set above.

## Next Safe Action

Create `F01_EDEN_SKYE_HEYGEN_PRIMARY_PORTRAIT` as a clean single portrait based on Image C, then add it to Drive and update `avatar-stock-index.json` with the new file ID after upload.
