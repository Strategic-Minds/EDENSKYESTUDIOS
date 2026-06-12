# Eden Skye Autonomous Bridge Script Audit

Status: sandbox only
Branch: eden-autonomous-bridge-v2
Production impact: none

## Purpose

This document records the read-only inspection of package.json referenced scripts for the Eden Skye Autonomous Bridge. It is documentation-only and does not add executable bridge code, run scripts, deploy, publish, modify secrets, apply Supabase migrations, or activate live social scheduling.

## Audit Boundary

Inspected package.json referenced script targets only. Scripts were read where available. No script was executed.

## Missing Package-Referenced Bridge Scripts

The following package.json script targets were referenced but not found on this branch during read-only inspection:

| package.json script | Expected file | Category | Status |
| --- | --- | --- | --- |
| bridge:auto-builder-gpt | scripts/run-auto-builder-gpt-bridge.mjs | Unknown bridge | Missing |
| bridge:codex | scripts/run-codex-autonomous-bridge.mjs | Unknown bridge | Missing |
| bridge:gpt-runtime | scripts/run-gpt-runtime-bridge.mjs | Unknown bridge | Missing |
| bridge:enable | scripts/enable-gpt-runtime-bridge.mjs | Activation risk | Missing |
| bridge:relay:auto-builder | scripts/relay-auto-builder-packet.mjs | Relay / connector risk | Missing |
| prepare:preview | scripts/prepare-cloud-preview-promotion.mjs | Preview-gated | Missing |
| prepare:production | scripts/prepare-production-deployment.mjs | Production-gated | Missing |
| deploy:production:vercel | scripts/execute-vercel-production-deployment.mjs | Production deployment | Missing |

## Safe Validation Scripts

These scripts appear to perform read-only validation based on the inspected source:

| package.json script | File | Classification | Notes |
| --- | --- | --- | --- |
| validate:eden | scripts/validate-eden-scaffold.mjs | Safe validation | Checks required file paths and prints PASS or FAIL. |
| validate:eden:avatars | scripts/validate-avatar-registry.mjs | Safe validation | Reads avatar registry JSON and validates draft/human-gate status. |
| validate:eden:content | scripts/validate-content-library.mjs | Safe validation | Reads content seed JSON and validates draft/human approval gate. |
| validate:eden:config | scripts/validate-config-json.mjs | Safe validation | Parses JSON files in config. |

## Generator / Reset Risks

### scaffold:eden

Expected file: scripts/scaffold-eden-readiness.mjs

Classification: generator / branch writer

Risk notes:

- Creates many draft files across docs, config, workflows, app/api, app/admin, assets, scripts, and Supabase migration scaffold paths.
- Intended posture is draft-only and human-gated.
- Not safe to run casually because it writes branch files.
- Requires explicit operator approval before execution.

### generator:reset

Expected file: scripts/reset-eden-generator.mjs

Classification: destructive branch reset / generator reset

Risk notes:

- Removes generated targets before rebuilding with scaffold:eden.
- Contains forbidden-target checks for locked visual source truth and other protected areas.
- Writes a reset receipt.
- Not safe to run without explicit approval because it deletes and rebuilds branch files.

## Preview-Gated Visual Capture

### visual:preview-bridge

Expected file: scripts/capture-eden-visual-preview.mjs

Classification: preview-gated evidence capture

Risk notes:

- Uses Playwright to visit preview routes.
- Writes screenshots and a visual evidence manifest.
- Checks forbidden reference-board markers, missing placeholders, and generated asset usage.
- Does not deploy by itself, but it navigates a preview URL and writes evidence artifacts.
- Requires preview URL confirmation and operator approval before execution.

## Production-Gated Missing Scripts

The following production-related scripts are referenced but missing. They must remain blocked until the actual files exist and are inspected:

- scripts/prepare-production-deployment.mjs
- scripts/execute-vercel-production-deployment.mjs

Required gate before adding or running production scripts:

- operator production approval
- rollback plan
- smoke test plan
- explicit production scope
- environment inventory review with no secret values exposed
- deployment target verification

## Relay / Connector Missing Scripts

The following relay/runtime scripts are referenced but missing. Their behavior cannot be verified:

- scripts/run-auto-builder-gpt-bridge.mjs
- scripts/run-codex-autonomous-bridge.mjs
- scripts/run-gpt-runtime-bridge.mjs
- scripts/enable-gpt-runtime-bridge.mjs
- scripts/relay-auto-builder-packet.mjs

Required gate before adding executable relay code:

- discovery approval
- source truth list
- connector permissions inventory
- dry-run default
- no live mutation default
- receipt logging requirement
- rollback plan
- validation checklist

## Required Approval Gates Before Executable Bridge Code

Executable bridge code must not be added until a new approval phase explicitly defines:

1. Allowed branch
2. Allowed file paths
3. Allowed connectors
4. Denied production actions
5. Dry-run defaults
6. Receipt/log target
7. Rollback plan
8. Smoke test plan
9. Validation command list
10. Human approval checkpoint before any deployment, secret mutation, Supabase migration, customer messaging, payment activation, or live social scheduling

## Current Conclusion

The Eden Skye Autonomous Bridge is not fully installed as executable bridge code on this branch. Current bridge status is:

- governance packet: present
- validation scripts: partially present and read-only style
- generator/reset scripts: present but write/delete branch files
- preview capture script: present but preview-gated
- relay/runtime bridge scripts: missing
- production deployment scripts: missing

This branch should remain documentation-only until the operator approves a separate executable implementation phase.
