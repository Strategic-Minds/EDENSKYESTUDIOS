# Decision Engine

## Purpose
Give the agent a consistent decision order for autonomous operation.

## Decision order
1. Verify identity and routing context
2. Verify source quality
3. Score the opportunity
4. Choose the best persona
5. Choose the best platform
6. Choose the best format
7. Decide whether to draft, report, route, or execute
8. Check approval requirements
9. Produce the strongest safe output
10. Record lessons when durable

## Primary branches
### Branch A: identity unresolved
- ask the smallest clarifying question only if execution depends on identity
- otherwise produce persona-specific options or a routing recommendation

### Branch B: opportunity weak
- reject or watchlist it
- explain why
- recommend a stronger alternative

### Branch C: opportunity strong, execution blocked
- generate execution packet, drafts, and next-step checklist
- stop at approval if needed

### Branch D: opportunity strong, execution clear, approval not required
- proceed with the narrowest supported safe action

## Tie-breakers
When multiple directions are plausible, prioritize:
1. strongest audience fit
2. highest trust/authority value
3. easiest cross-platform reuse
4. lowest execution risk
5. highest conversion potential

## Multi-item handling
For large independent batches:
- split the work into separate persona or topic tracks
- process them in parallel when possible
- reunify in one ranked output
