# EDEN SKYE ADMIN Autonomous Builder Packet

## 1. Current Status

EDEN SKYE ADMIN is installed on the Draft PR branch as a black backend command center. It has docs, manifests, admin UI routes, admin APIs, and guardrail tests. Runtime validation and Chromium screenshot evidence remain pending.

## 2. Source Truth

- User request for EDEN SKYE ADMIN.
- Uploaded `01-black-chat-ui-2-7-.zip` source package.
- Existing Eden Skye repo architecture and PR #2 branch.
- Existing autonomous bridge manifests and Eden exact image source manifest.
- Existing protected action rules.

## 3. System Boundary

EDEN SKYE ADMIN is an orchestration and control plane. It can inspect, plan, draft, queue, validate, collect evidence, write receipts, and prepare preview deployments.

It cannot automatically perform production deploys, live commerce mutations, production database mutations, public social publishing, real customer email sends, external calendar event creation, DNS/billing changes, secret rotation, destructive Git operations, merge, release, or PR movement.

## 4. Frontend Plan

- `/admin`: command center dashboard.
- `/admin/eden`: Eden Skye OS control surface.
- `/admin/agent-console`: chat/agent/workspace pattern from source package.
- `/admin/bridge`: autonomous bridge command center pattern from source package.
- `/admin/builders`: builder docs, install packet, validation packet, source intake.
- `/admin/gates`: approval gates and protected action status.
- `/admin/workflows`: Manus-style plan/build/validate/approve/operate loop.
- `/admin/receipts`: evidence and audit receipts.
- `/admin/images`: Drive OS and media factory source truth.
- `/admin/models`: model registry and asset approval state.
- `/admin/quarantine`: rollback, quarantine, missing asset, and failed job recovery.

## 5. Backend Plan

- `/api/admin/eden/readiness`: readiness score and blockers.
- `/api/admin/eden/bridge-registry`: bridge registry state.
- `/api/admin/eden/approval-gates`: protected action registry.
- `/api/admin/eden/evidence`: evidence requirements and screenshot targets.
- `/api/admin/eden/command-queue`: safe draft command queue with protected-action blocking.
- `/api/admin/eden/builder-docs`: builder-doc and source-intake inventory.

## 6. Repo And File Map

Docs:

- `docs/EDEN_SKYE_ADMIN_*`
- `docs/EDEN_SKYE_ADMIN_BLACK_CHAT_UI_SOURCE_INTAKE.md`
- `docs/EDEN_SKYE_ADMIN_AUTONOMOUS_BUILDER_PACKET.md`

Config:

- `config/eden-skye-admin-*`
- `config/eden-skye-admin-chat-ui-source-map.json`

App:

- `app/admin/eden-admin-shell.tsx`
- `app/admin/*/page.tsx`
- `app/api/admin/eden/*/route.ts`

Tests:

- `tests/eden-skye-admin.test.mjs`

## 7. Tool And Integration Plan

- GitHub: branch-safe code/docs update and Draft PR tracking.
- Vercel: preview build and browser-accessible validation.
- Supabase: registry, queue, receipts, approval requests, SQL validation.
- Drive: source truth and asset manifest alignment.
- Gmail/Calendar: draft/brief mode only.
- Shopify/HeyGen/social: draft packet and approval-gated action only.
- Browser/Playwright: screenshot evidence and route checks.

## 8. Validation Plan

1. Run `npm test`.
2. Run `npm run build`.
3. Run `npm run bridge:enable` when bridge environment is configured.
4. Run Eden Visual Preview Bridge.
5. Download and review `eden-visual-preview-evidence`.
6. Keep visuals unapproved until screenshots pass.

## 9. Required Docs And Playbooks

All required EDEN SKYE ADMIN docs are installed, plus this source intake and autonomous build packet.

## 10. Blockers Or Missing Pieces

- Local workspace cannot clone/build due network 403.
- GitHub Actions workflow dispatch is not exposed in this session.
- Chromium screenshot evidence has not been captured for the new admin routes.

## 11. Next Best Prompt

Run Eden Visual Preview Bridge on branch `eden/readiness-scaffold-20260604`, download `eden-visual-preview-evidence`, and review `/admin`, `/admin/agent-console`, `/admin/bridge`, `/admin/builders`, `/admin/gates`, `/admin/workflows`, `/admin/receipts`, `/admin/images`, `/admin/models`, and `/admin/quarantine` before moving PR #2 out of draft.