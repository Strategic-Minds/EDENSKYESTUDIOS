# EDEN SKYE ADMIN Validation Plan

## Fewest-Step Validation Sequence

1. Manifest validation: required admin manifests exist and protected actions default to blocked.
2. UI contract validation: admin routes render black command-center UI with white text and hot pink/neon accents.
3. API validation: readiness, bridge registry, approval gates, evidence, and command queue routes respond in draft-safe mode.
4. Safety validation: protected commands return blocked status without approval.
5. Build validation: `npm test` then `npm run build`.
6. Browser validation: capture screenshots for `/admin`, `/admin/eden`, `/admin/gates`, `/admin/workflows`, `/admin/receipts`, `/admin/images`, `/admin/models`, and `/admin/quarantine`.
7. Evidence review: compare screenshots to the uploaded black admin UI reference and Eden Skye brand contract.
8. Draft PR update: keep PR draft unless all validation and visual review passes.

## Pass Criteria

- Required docs and manifests exist.
- Protected actions are disabled by default.
- No beige/generic SaaS admin UI drift.
- Admin pages show operational modules, bridge states, queues, gates, and evidence surfaces.
- Tests and build pass.
- Browser evidence exists and is reviewed.

## Fail Criteria

- Any protected action is enabled by default.
- Missing bridge manifest or missing approval-gate manifest.
- Admin routes render placeholder pages or marketing copy instead of command-center operations.
- Screenshot evidence is missing or unreviewed.
- Test/build failure remains unresolved.