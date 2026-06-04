# AI Tool Stack And Handoffs

## Objective

Define how GPT, Higgins, HeyGen, Runway, Canva, Descript, Shopify, Metricool, Supabase, Vercel, Drive, GitHub, and Auto Builder work together without losing governance.

## GPT

Role:

- reasoning
- source-truth reading
- prompt/script/caption generation
- approval packet creation
- job routing recommendations
- receipt writing

Input:

- model ID
- source image IDs
- brand bible
- requested output
- approval state

Output:

- job packet
- prompt/script/caption
- validation notes
- receipt

## Higgins

Role:

- controlled operator/automation layer
- route jobs
- choose allowed actions
- create queues and receipts
- stop at gates

Input:

- manifests
- approval matrix
- task request
- source images

Output:

- queued jobs
- draft artifacts
- receipts
- approval requests

## HeyGen

Role:

- avatar creation/training after approval
- talking avatar video generation

Requires:

- clean source image or trained look ID
- model ID
- script
- voice direction
- approval receipt

Never do without approval:

- create avatar
- train digital twin
- generate client/public video

## Runway / Image Generation

Role:

- cinematic visuals
- campaign stills
- product videos
- motion tests

Requires:

- model ID
- source/reference image IDs
- prompt
- negative constraints
- output use case

## Canva / Adobe Express

Role:

- social graphics
- decks
- product mockups
- launch assets
- campaign layouts

Requires:

- brand kit direction
- model imagery
- platform format
- CTA/copy

## Photoshop

Role:

- image cleanup
- background removal
- subject selection
- visual refinement

Requires:

- source image
- edit instruction
- output use

## Descript

Role:

- video editing
- repurposing
- caption packaging
- publish-ready refinement

Requires:

- video/audio assets
- composition plan
- output channel

## Metricool / SocialHub

Role:

- content planning
- scheduling after approval
- analytics

Requires:

- approved post packet
- channel
- publish time
- asset/caption

## Shopify / Stripe

Role:

- product/service/download storefront
- payment/revenue visibility

Requires approval for mutations.

## Supabase

Role:

- queues
- telemetry
- approvals
- receipts
- media/model tables
- content status

Requires approval for schema mutation.

## Vercel / Next.js

Role:

- public site
- admin console
- APIs
- cron triggers
- readiness checks

Requires approval for production deploy/env changes.

## Drive / GitHub

Drive stores binary assets and docs.
GitHub stores code, manifests, contracts, receipts, and implementation artifacts.

## Standard Handoff Packet

```json
{
  "job_id": "string",
  "model_id": "F01",
  "model_name": "Eden Skye",
  "task_type": "image|video|social|commerce|app|license",
  "source_files": [],
  "target_tool": "heygen|runway|canva|descript|shopify|metricool|supabase|vercel",
  "run_mode": "draft|sandbox|approval_required|approved",
  "prompt_or_script": "string",
  "approval_required": true,
  "approval_status": "pending",
  "receipt_destination": "supabase_or_git_or_drive",
  "validation_requirements": []
}
```
