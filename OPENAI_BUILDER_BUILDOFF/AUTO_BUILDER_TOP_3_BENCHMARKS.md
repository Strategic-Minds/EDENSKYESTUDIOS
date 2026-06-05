# AUTO BUILDER Top 3 Benchmarks

## VERIFIED
1. LangGraph
- Source: https://langgraphjs.guide/persistence/ and LangGraph reference pages.
- Relevant verified pattern: graph/state workflow execution, checkpointing after node execution, durable state, replay, crash recovery, and human-in-the-loop approval workflows.
- Fit for AUTO BUILDER: high. AUTO BUILDER is phase/gate/state heavy and needs checkpointed runs, not just chat.

2. OpenAI Agents SDK
- Sources: https://platform.openai.com/docs/guides/agents-sdk/ and https://openai.github.io/openai-agents-python/ref/agent/.
- Relevant verified pattern: agents configured with instructions, tools, guardrails, handoffs, streaming, and tracing of model generations, tool calls, handoffs, guardrails, and custom events.
- Fit for AUTO BUILDER: high. AUTO BUILDER needs explicit tools, handoffs, guardrails, traceability, and specialist routing.

3. Vercel AI SDK / Vercel Agents
- Sources: https://vercel.com/ai-sdk and https://vercel.com/docs/agents.
- Relevant verified pattern: TypeScript-first AI app layer, tools, streaming, multi-provider support, resumable/multi-step agent patterns, and natural fit with Next.js/Vercel routes.
- Fit for AUTO BUILDER: high for operator UI, API routes, streaming chat, and preview-first build surfaces; medium as the sole orchestration engine.

## INFERRED
- Best AUTO BUILDER benchmark blend is not one product. It should combine LangGraph-style durable state, OpenAI Agents SDK-style tools/guardrails/tracing, and Vercel AI SDK-style operator UI/API deployment.
- LangGraph should inform core workflow execution; OpenAI Agents SDK should inform agent contracts and guardrails; Vercel AI SDK should inform the UI/API runtime and preview experience.
- A superior AUTO BUILDER replica should avoid freeform agent sprawl by making every action an auditable state transition with owner, source, approval class, rollback, and evidence fields.

## COULD NOT VERIFY
- Whether Jeremy's current systems already implement LangGraph, OpenAI Agents SDK, or Vercel AI SDK in production.
- Live benchmark pricing, account limits, and current enterprise feature availability beyond official docs/pages surfaced in this run.
- Whether all benchmark claims map cleanly to the existing Eden repo without refactor.

## BLOCKERS
- No production deploy or runtime integration was allowed.
- No dedicated AUTO BUILDER runtime repo was verified.
- Browser-based benchmark capture was limited to web search and public snippets, not screenshots or UI walkthroughs.

## WORKAROUNDS
- Encode benchmark patterns into docs, registries, API contracts, and validation plans only.
- Require later sandbox proof before adopting any framework dependency.
- Keep the replica framework-agnostic in this pass while naming the target patterns.

## NEXT ACTIONS
1. Translate benchmark patterns into a replica architecture: state graph, agent registry, approval matrix, trace log, source ledger, validation suite.
2. Use benchmarks to score original vs replica without claiming live superiority.
3. Validate future implementation with three simulations: happy path, approval-blocked path, and external API failure path.
