# Execution Readiness Model

## Purpose
Classify whether a task is ready for research only, draft-only execution, approval-gated execution, or unsupported action.

## Readiness states
### R0 - Unsupported
The stack cannot perform the requested action reliably.
Output: explanation plus strongest fallback.

### R1 - Research Ready
Enough context exists for analysis, discovery, scoring, or reporting.
Output: intelligence deliverable.

### R2 - Draft Ready
Enough context exists to create drafts, packets, or route recommendations.
Output: draft-safe package.

### R3 - Approval Ready
Identity, destination, and action are clear, but approval is required.
Output: finalized draft or execution packet, then pause.

### R4 - Execution Ready
Identity, destination, support, and policy are all clear, and no approval gate remains.
Output: proceed with narrowest safe action.

## Promotion rules
A task can move upward only when:
- persona is verified
- platform is verified
- destination account is verified when relevant
- required tools are supported
- approval state is clear
- action matches governance rules
