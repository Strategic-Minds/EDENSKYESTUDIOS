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

## Clean Portrait Candidate Created

Status: `generated_pending_drive_upload_and_human_approval`

A clean single-subject F01 portrait candidate has been generated from the Image C and Image B references.

- File name: `f01_eden_skye_heygen_primary_portrait.png`
- Workspace path: `/workspace/output/f01_eden_skye_heygen_primary_portrait.png`
- Format: PNG, RGB, non-interlaced
- Dimensions: 1122 x 1402
- SHA-256: `57fbe694ddf546a1c356d7acac043f75678ba8c5edbda43d544d6e79700fc44c`
- Approval packet: `ops/studio-bootstrap/heygen-approval-packets/f01-eden-skye-primary-portrait-approval.md`
- Generation receipt: `ops/studio-bootstrap/receipts/f01-heygen-primary-portrait-generation-receipt.md`

This resolves the earlier need for a clean portrait candidate, but it does not complete Drive upload or HeyGen creation. The current Drive connector did not expose a raw image upload-to-folder action in this run, so the image is indexed as pending upload.

## HeyGen Readiness

Current readiness: `clean_portrait_candidate_ready_for_human_review`, `not_ready_for_unapproved_training`.

Reason:

The three original available files are useful, but all are collages/contact sheets. A cleaner single-image source has now been generated for approval review. For a reliable HeyGen photo-avatar workflow, the approved source should remain:

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

Approve or revise `f01_eden_skye_heygen_primary_portrait.png`, upload it into the F01 Eden Skye Drive folder when image upload capability is available, then authorize a private HeyGen avatar creation test.

## Missing Stock-Image Set For Fully Automated Image/Video Generation

To make Eden Skye fully controllable for autonomous image/video generation, the current image sheets and one clean portrait candidate are not enough. The system needs the following asset pack.

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

Use Image C as the identity source and Image B as the body reference. Use the newly generated clean portrait candidate as the HeyGen primary portrait candidate after human approval. Then request approval for HeyGen avatar creation/training with:

- selected source image
- avatar name: `F01 Eden Skye`
- intended use: controlled private avatar testing
- approval receipt
- consent/training status

## Current Status

- GPT readiness: ready for controlled prompt/script/job packet generation.
- Higgins readiness: ready to consume manifests and route sandbox jobs.
- HeyGen readiness: clean source candidate generated; waiting on Drive upload and explicit approval.
- Fully automated image/video readiness: partial. Needs the missing stock-image set above.

## Next Safe Action

Approve or revise the clean F01 portrait candidate. After approval, upload it into the F01 Drive folder and authorize private HeyGen avatar creation only if the user explicitly approves that step.
