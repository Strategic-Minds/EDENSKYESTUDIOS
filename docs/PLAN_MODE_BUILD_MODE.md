# Plan Mode And Build Mode

Eden Skye Studios uses a two-part to-do system for every task that creates or changes a capability, workflow, system, content idea, bridge, automation, website surface, data model, or approval process.

## Non-Negotiable Rule

Before the first material comment or implementation step, analyze previous files.

Previous files include existing docs, source files, bridge files, route files, migrations, design references, Drive control-plane records, and connected-system receipts that affect the requested work.

If the agent cannot inspect a required file, the blocker must be listed in Plan Mode.

## Required Checklist Format

Use this structure for every new task.

```markdown
## Plan Mode

- [ ] Objective is clear.
- [ ] Existing files analyzed.
- [ ] Systems involved are identified.
- [ ] Dependencies are listed.
- [ ] Approval gates are listed.
- [ ] Risks and blockers are listed.
- [ ] Acceptance criteria are defined.

## Build Mode

- [ ] Implementation steps are listed.
- [ ] Changes are scoped and reversible where possible.
- [ ] Validation receipt is planned.
- [ ] Docs to update are listed.
- [ ] Approval queue/control-plane update is listed if needed.
- [ ] Final status and next actions are recorded.
```

## Plan Mode

Plan Mode answers what should happen and what must be protected.

Required fields:

- Objective: the business or system outcome.
- Existing files analyzed: exact files, docs, Drive sheets, or routes inspected.
- Systems involved: GitHub, Vercel, Supabase, Drive, Shopify, HeyGen, Xyla, Metricool, SocialHub, or other connected systems.
- Dependencies: credentials, project ids, repo ids, schema, files, designs, approval state, or connector limits.
- Approval gates: anything that requires explicit user approval.
- Risks or blockers: missing credentials, blocked network, unavailable connector, destructive action, brand risk, compliance risk, or unknown source of truth.
- Acceptance criteria: how Eden knows the task is complete.

## Build Mode

Build Mode answers what changed, how it was checked, and what remains.

Required fields:

- Implementation steps: exact docs, routes, files, or systems to change.
- Validation receipts: preview URL, route response, connector readback, GitHub commit, Drive link, screenshot, health check, or documented blocker.
- Documentation updates: every material change must update the relevant docs.
- Approval queue updates: anything waiting for Jeremy approval must be visible in the Drive control plane or another approved tracker.
- Final status: complete, partial, blocked, queued, or waiting for approval.
- Next actions: the smallest useful next steps.

## Approval Gates

The following cannot move from plan to live action without explicit approval:

- production deploy
- Shopify mutation
- public publishing
- payment, pricing, subscription, or discount change
- live HeyGen/avatar/video-chat session
- Supabase production migration or service-role write
- Drive parent, sharing, delete, or destructive move
- destructive GitHub write, merge, force-push, delete, or production-triggering workflow

## Documentation Update Rule

Update documentation whenever a new or changed item affects future work.

Examples:

- New bridge route: update capabilities and bridge docs.
- New cron: update README, capability docs, and changelog.
- New approval queue: update operating contract and Drive control plane.
- New product or offer workflow: update README or commerce docs.
- New media workflow: update capabilities and content/media docs.
- New environment variable: update README and capability docs.

## Completion Standard

A task is not complete until:

1. Previous files were inspected or the inspection gap was documented.
2. Plan Mode and Build Mode exist or were updated.
3. The requested work is implemented or honestly marked blocked.
4. Validation evidence exists.
5. Relevant docs are updated.
6. Approval-gated items remain queued until approved.
