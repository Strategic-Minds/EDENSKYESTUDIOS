# Agent Registry

## VERIFIED
- Current AUTO BUILDER instructions define a governed multi-agent topology but do not prove every agent exists live.
- Eden PAOS source truth describes governance, command center, content pipeline, publishing runbook, analytics runbook, failure recovery, continuity ledger, prompt registry, workflow registry, agent registry, approval matrix, source of truth, content calendar, and topic database.

## INFERRED
- The replica should define agents as contracts first, then bind them to runtime tools only after validation.

## COULD NOT VERIFY
- Live implementation status of each agent.
- Existing production credentials or schedules.

## BLOCKERS
- No production tools may be activated.
- No live platform mutations allowed.

## WORKAROUNDS
- Registry is declarative and disabled-by-default.
- All risky actions map to approval gates.

## NEXT ACTIONS
1. Convert this registry into JSON schema once the runtime repo is confirmed.
2. Validate every agent against allowed/blocked tool rules.

## Registry

| Agent | Domain | Responsibilities | Allowed Autonomous Actions | Approval Required | Blocked |
|---|---|---|---|---|---|
| Master Brain Agent | AUTO BUILDER | Orchestrate run, score, route, decide next safe action | Read sources, create docs, queue safe tasks | Deploy, merge, env, spend, DB write | Production mutation |
| Source Truth Agent | Both | Map Drive/GitHub/web/source truth | Read/search/summarize | Drive canon edits | Deletion/overwrite |
| Reverse Engineering Agent | Both | Inspect current systems and benchmarks | Pattern extraction | Protected asset reuse | Copying IP/assets |
| Benchmark Agent | Both | Compare world-class systems | Public research, evidence table | Paid account action | Private scraping |
| Governance Agent | Both | Enforce approval matrix and flags | Block unsafe paths | Risk override | Silent bypass |
| Build Packet Agent | AUTO BUILDER | Create docs/contracts/stubs | Branch docs, disabled stubs | Any live route activation | Production mutation |
| Validation Agent | Both | Run test plan and verdict | Static checks, logical simulations | Preview deploy/browser run if gated | Faking proof |
| Recovery Agent | Both | Rollback and blocker plan | Draft rollback steps | Branch deletion/main revert | Destructive commands |
| Memory Agent | AUTO BUILDER | Preserve durable operating state | Write approved memory summaries | Sensitive/private memory | Invented memory |
| Eden Brand Agent | Eden | Enforce brand lock and logo rules | Validate docs/copy | Brand canon edits | Logo redesign |
| Eden Model Registry Agent | Eden | Maintain roster/source-pack status | Draft registry entries | Public model claims/use | False-human claims |
| Eden Content Agent | Eden | Draft content queue and scripts | Draft only | Schedule/publish | Live publishing |
| Eden Media Agent | Eden | Draft media jobs/prompts | Draft prompts/jobs | Image/video generation at scale if cost/tool gate | HeyGen training |
| Eden Commerce Agent | Eden | Draft Black Card/products/license lanes | Docs/contracts only | Shopify/Stripe mutation | Live commerce changes |
| Eden Analytics Agent | Eden | Define metrics and review loops | Draft analysis templates | Pull paid/private data | Fabricated metrics |
