# Start Here: Eden Skye Studios

This file is the first stop for any human operator, Eden runtime agent, Auto Builder pass, or Codex session working on Eden Skye Studios.

## Source Of Truth

- Website/source repo: `Strategic-Minds/EDENSKYESTUDIOS`
- Factory/control-plane guide: `Strategic-Minds/AUTO_BUILDER`
- Vercel Eden project id: `prj_mtmJQYYqRodNnH2UrDqwaK2MHgoA`
- Production deploy status: locked until explicit approval
- Shopify mutation status: locked until explicit approval
- Publishing status: draft-only until explicit approval

The sandbox repo is not the Eden Skye Studios source of truth.

## Required First Action

Before commenting on a new build, workflow, system, idea, or technical task, analyze previous files first.

Minimum previous-file analysis:

1. Read `README.md`.
2. Read `AGENTS.md`.
3. Read `docs/PLAN_MODE_BUILD_MODE.md`.
4. Read the most relevant capability doc for the requested task.
5. Inspect the relevant source files, routes, bridge files, or Drive control-plane records before changing anything.
6. Check for existing approval gates and user instructions that affect the task.

If a connector blocks full inspection, record the gap in Plan Mode and continue with the safest available grounded evidence.

## Mandatory To-Do List

Every new task must create or update a to-do list with two headings:

### Plan Mode

- Objective
- Existing files analyzed
- Systems involved
- Dependencies
- Approval gates
- Risks or blockers
- Acceptance criteria

### Build Mode

- Implementation steps
- Validation receipts
- Documentation updates
- Approval queue updates, when relevant
- Final status
- Next actions

For Codex sessions, use the visible plan tracker when available. For repo-native work, add or update the relevant Markdown checklist or operating note.

## Work Order

1. Analyze previous files.
2. Create or update the Plan Mode and Build Mode checklist.
3. Build only the safest scoped change needed for the request.
4. Validate with the available route, doc, preview, receipt, or connector readback.
5. Update docs for any new capability, workflow, route, queue, automation, prompt, product rule, or approval gate.
6. Record blockers instead of pretending a missing connector is available.
7. Stop before production deploys, Shopify changes, payment changes, public publishing, destructive GitHub actions, or live avatar/video operations unless explicit approval is present.

## Current Priority Stack

1. Finish the Eden Skye Studios website preview and keep it aligned with the approved Drive mockup direction.
2. Keep Edens Closet as the member changing-room and behind-the-scenes model experience.
3. Keep Xyla content packet output draft-only until publishing approval exists.
4. Use GPT image generation for cost-efficient still image drafting.
5. Use HeyGen for approved avatar/video production.
6. Use Auto Builder cloud bridges for governed GitHub, Vercel, Supabase, Drive, Shopify, and HeyGen operations.
7. Keep the Drive approval control plane updated with anything waiting for approval.

## Approval Phrases

Use exact approval phrases only when the user explicitly provides them for the relevant action.

- Production deploy: `APPROVE PRODUCTION DEPLOY`
- Eden runtime write: `APPROVE EDEN RUNTIME WRITE`
- Eden runtime execute: `APPROVE EDEN RUNTIME EXECUTE`
- GitHub workflow run with risky mode: `APPROVE GITHUB WORKFLOW RUN`

Approval phrases do not override safety, legality, platform policy, or missing credentials.
