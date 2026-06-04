# F01 Eden Skye HeyGen Primary Portrait Approval Packet

Date: 2026-06-04
Operator: Eden Skye
Repo: `Strategic-Minds/EDENSKYESTUDIOS`
System guide: Auto Builder control-plane workflow
Avatar: `F01 Eden Skye`
Status: `approval_required_before_heygen_creation`

## Objective

Approve the clean F01 Eden Skye primary portrait candidate for use as the first HeyGen photo-avatar source, then authorize the next controlled steps in the Eden Skye Studios avatar system lock.

This packet does not create or train a HeyGen avatar. It prepares the approval record needed before external avatar creation, private test generation, or canonical identity lock.

## Generated Portrait Candidate

- File name: `f01_eden_skye_heygen_primary_portrait.png`
- Workspace path: `/workspace/output/f01_eden_skye_heygen_primary_portrait.png`
- Format: PNG, RGB, non-interlaced
- Dimensions: 1122 x 1402
- SHA-256: `57fbe694ddf546a1c356d7acac043f75678ba8c5edbda43d544d6e79700fc44c`
- Generation date: 2026-06-04
- Current Drive status: `pending_upload`
- Current Git status: `indexed_as_candidate_metadata`; binary file not committed in this text-only pass
- Intended target Drive folder: `F01 Eden Skye` folder, `1q3JsMoHs_EKxn2NyMfX7-uSAE6QcBuJl`

## Source References Used

- `ChatGPT Image Jun 3, 2026, 11_17_55 PM.png`
  - Drive file ID: `14rhoKGJWc-dgn66XCbfNEjKfAbEtPPZg`
  - Local reference: `/workspace/eden-avatar-readiness/f01-support-jun3-231755.png`
  - Role: strongest current face and upper-body identity reference
- `ChatGPT Image Jun 3, 2026, 11_27_37 PM.png`
  - Drive file ID: `1g02LVzAEg5gLBdcpbyM_T8PwTGrdmAWj`
  - Local reference: `/workspace/eden-avatar-readiness/f01-support-jun3-232737.png`
  - Role: body, hair, and visual-continuity reference

## Readiness Assessment

Current decision: `candidate_ready_for_human_review`.

Strengths:

- Single subject, not a collage.
- Face-forward portrait suitable for HeyGen review.
- No embedded prompt text, labels, panels, or visible watermark.
- Clear eyes, clean facial structure, brunette continuity, polished editorial tone.
- Safer for photo-avatar sourcing than the existing full-body/contact-sheet files.

Limitations:

- The image is generated from references and should be treated as a candidate until human approval.
- The Drive upload is not complete because the current Drive connector does not expose raw image upload into a folder.
- Final HeyGen avatar creation should wait until the portrait is uploaded/indexed in the F01 Drive folder and explicitly approved.
- Styling should be reviewed for platform-safe presentation before HeyGen use.

## Approval Gate

Approve only if all of the following are acceptable:

1. The portrait is accepted as the current F01 HeyGen primary portrait candidate.
2. The portrait may be uploaded into the F01 Eden Skye Drive folder when image upload capability is available or by manual upload.
3. The portrait may become the primary source image for a private HeyGen photo-avatar creation attempt.
4. The avatar may be named `F01 Eden Skye` in HeyGen.
5. The avatar may be used only for private controlled tests until a separate public-use approval is granted.

## Proposed HeyGen Creation Settings

- Avatar name: `F01 Eden Skye`
- Avatar type: photo avatar / talking avatar source candidate
- Use case: private controlled test videos, brand voice checks, lip-sync validation, content-factory pipeline testing
- Brand boundary: fictional adult AI creator, platform-safe luxury editorial presentation
- Voice direction: warm, smooth, feminine, intimate, composed, premium, and non-explicit
- First test script length: 15 to 25 seconds
- First test output status: private only, not public publishing

## First Private Test Script

"Welcome to Eden Skye Studios. I am Eden, your calm center inside the creative system. We are building a brand that can move beautifully, speak clearly, and stay fully under control."

## Required Receipts After Approval

After approval and avatar creation, create or update:

- `ops/studio-bootstrap/avatar-stock-index.json`
- `ops/studio-bootstrap/heygen-approval-packets/f01-eden-skye-primary-portrait-approval.md`
- `ops/studio-bootstrap/receipts/f01-heygen-avatar-creation-receipt.md`
- `ops/studio-bootstrap/gpt-higgins-heygen-handoff.md`
- Auto Builder sync receipt in `Strategic-Minds/AUTO_BUILDER/auto-social/`

## Decision Record

- Portrait created: yes
- Portrait indexed in Git metadata: yes
- Portrait uploaded to Drive: pending connector/manual upload
- HeyGen avatar created: no
- Public publishing approved: no
- Shopify mutation approved: no
- Production deploy approved: no

## Explicit User Approval Needed

Reply with one of the following decisions:

- `APPROVE F01 PORTRAIT ONLY`
- `APPROVE F01 PORTRAIT + DRIVE UPLOAD WHEN AVAILABLE`
- `APPROVE F01 PORTRAIT + HEYGEN PRIVATE AVATAR CREATION`
- `REVISE F01 PORTRAIT`

No HeyGen creation should occur until the approval includes HeyGen private avatar creation.
