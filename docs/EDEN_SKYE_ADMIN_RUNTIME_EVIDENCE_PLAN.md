# EDEN SKYE ADMIN Runtime Evidence Plan

## Evidence Artifacts

- Admin route screenshots
- API JSON responses
- Bridge registry output
- Approval gate output
- Command queue blocked-action response
- `npm test` log
- `npm run build` log
- Vercel preview URL and build state
- GitHub Draft PR link and head SHA
- Supabase SQL validation output where available
- Drive source-truth manifest checks
- Media asset approval state

## Required Screenshot Set

- `/admin`
- `/admin/eden`
- `/admin/gates`
- `/admin/workflows`
- `/admin/receipts`
- `/admin/images`
- `/admin/models`
- `/admin/quarantine`

## API Evidence Calls

- `GET /api/admin/eden/readiness`
- `GET /api/admin/eden/bridge-registry`
- `GET /api/admin/eden/approval-gates`
- `GET /api/admin/eden/evidence`
- `GET /api/admin/eden/command-queue`
- `POST /api/admin/eden/command-queue` with a protected production deploy command; expected result is blocked.

## Evidence Review Decision

Visuals remain unapproved until screenshots are captured from a real Chromium-capable runtime and reviewed against the black admin UI reference and Eden Skye brand contract.