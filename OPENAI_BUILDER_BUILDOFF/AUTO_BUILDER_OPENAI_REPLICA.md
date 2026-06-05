# AUTO BUILDER OpenAI Replica Candidate

## VERIFIED
- This is a branch-contained design candidate only.
- No production deployment, env mutation, Supabase write, Drive edit, Shopify mutation, HeyGen training, publishing, email/SMS, or spend is included.
- The replica is created under the Eden repo fallback path because no dedicated AUTO BUILDER repo was verified in this run.

## INFERRED
- Candidate name: OpenAI Builder Governance OS.
- Purpose: create a more runtime-verifiable AUTO BUILDER by converting prompts, workbooks, and playbooks into registries, state machines, contracts, and validation suites.
- Core thesis: Jeremy's current system appears rich in strategy and artifacts; the OpenAI replica can improve by adding stronger normalized state, runtime contracts, testability, and evidence capture.

## COULD NOT VERIFY
- Whether the proposed replica outperforms Jeremy's live systems operationally; this requires sandbox execution and later live-safe proof.
- Whether all integrations can be connected inside current Eden repo without a dedicated AUTO BUILDER repo.

## BLOCKERS
- Production mutation is forbidden.
- Local checkout/build unavailable.
- Dedicated AUTO BUILDER repo unverified.

## WORKAROUNDS
- Create branch-contained docs and disabled stubs only.
- Treat this as a design/buildoff candidate, not production activation.

## NEXT ACTIONS
1. Validate docs and stubs in a real branch checkout.
2. Add tests once checkout access is available.
3. Request approval only for preview deploy or migration simulation if needed.

## Replica Architecture

### Control Plane
- `/admin/openai-builder-buildoff`: disabled dashboard stub showing branch, flags, scorecard, blockers, and next approval command.
- `/api/openai-builder-buildoff/status`: disabled status route returning guard flags and non-production metadata.

### State Model
- SourceLedger: every Drive/GitHub/web/source file with evidence class.
- BuildRun: one buildoff run with mode, branch, source map, scorecard, and verdict.
- AgentRegistry: declared agents, allowed tools, blocked tools, approval class.
- ApprovalGate: action, risk class, required approver, evidence, rollback.
- ValidationCase: happy path, blocked approval, external failure, rollback, scorecard.
- ArtifactRegistry: docs, schemas, contracts, stubs, generated evidence.

### Runtime Pattern
- LangGraph-style phase graph:
  - DISCOVER
  - REVERSE_ENGINEER
  - BENCHMARK
  - EXTRACT
  - DESIGN
  - BUILD_BRANCH_STUBS
  - VALIDATE
  - SCORE
  - HANDOFF
- Each phase requires input source, output artifact, validation check, and blocked-action scan.

### Guardrail Pattern
Required hard flags for every stub:
- `APPROVAL_REQUIRED=true`
- `PRODUCTION_MUTATION=false`
- `PUBLISHING_ENABLED=false`
- `DEPLOYMENT_ENABLED=false`
- `SHOPIFY_MUTATION_ENABLED=false`
- `HEYGEN_TRAINING_ENABLED=false`

### Better-Than-Original Candidate Improvements
- Canonical registry instead of scattered workbook/doc duplication.
- Every agent maps to allowed/blocked tools.
- API contracts define dry-run behavior before implementation.
- Validation suite is required before preview/deploy.
- Morning handoff is produced as an operating artifact.
- Explicit pass/fail verdict prevents vague planning loops.
