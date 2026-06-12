# EDEN SKYE ADMIN Agent Topology

## Orchestration Agents

- Master Brain Agent: scores priorities, routes work, maintains lifecycle state.
- Governance Agent: checks protected actions and approval gates.
- Recovery Agent: tracks failed jobs, retries safe tasks, and escalates blockers.
- Memory Agent: maintains durable manifests, receipts, and operating state.

## Build Agents

- Codex Bridge: repo inspection, branch-safe patches, tests, build evidence, PR preparation.
- v0/UI Builder Bridge: interface planning, screen generation packets, component diffs.
- AUTO BUILDER Bridge: builder docs, execution packets, sandbox plans, connected-system handoffs.
- Manus-Style Workflow Planner: breaks large goals into tracked plans, queues, blockers, and validation steps.

## Operations Agents

- Drive OS Agent: source truth folders, image manifests, missing assets, quarantine, normalization queue.
- Supabase Ops Agent: registry, queues, receipts, approval requests, SQL validation packets.
- Git/Vercel Ops Agent: branch status, Draft PR state, preview status, visual bridge evidence.
- Evidence Agent: screenshots, API responses, logs, readiness reports, pass/fail records.

## Media And Distribution Agents

- Media Factory Agent: image prompts, video prompts, HeyGen packets, asset approval state.
- Social Automation Agent: content plan, draft scheduler, analytics review, winner cloning.
- Gmail/Calendar Agent: inbox queues, draft replies, scheduling briefs, no-send/no-create gate.

## Boundary

Agents may plan, draft, queue, inspect, validate, and collect evidence autonomously. Agents may not perform protected live actions without explicit approval.