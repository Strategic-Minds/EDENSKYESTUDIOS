# EDEN FULL SITE Autogeneration Validation Plan

## Required Commands

Run in this order:

1. `npm run generator:reset` for legacy readiness generator only.
2. `npm run generator:full-site` after the full-site generator is implemented.
3. `npm test`.
4. `npm run build`.
5. `npm run bridge:enable` when bridge environment is configured.
6. `npm run visual:preview-bridge` or GitHub Actions Eden Visual Preview Bridge.

## Required Test Coverage

- exact source image manifest cannot be bypassed
- collage/page-board images cannot render as production assets
- required routes exist
- Black Card pricing is present
- live payment activation is blocked by default
- Shopify webhook rejects unsigned payloads
- test-mode entitlement grant works
- dashboard reads entitlement source or draft fixture
- admin source-map manifest exists
- admin UI keeps black/white/hot-pink style
- protected actions return blocked state
- generator receipts are written

## Required Browser Screenshots

Public:

- `/`
- `/models`
- `/models/alexis-voss`
- `/pricing`
- `/checkout`
- `/payment`
- `/success`
- `/dashboard`

Closet:

- `/closet`
- `/closet/alexis-voss`
- `/closet/alexis-voss/viewer`
- `/closet/alexis-voss/chat`
- `/closet/alexis-voss/video`

AI/PWA:

- `/ai-chat`
- `/ai-video`
- `/messages`
- `/pwa-app`

Admin:

- `/admin`
- `/admin/agent-console`
- `/admin/bridge`
- `/admin/builders`
- `/admin/gates`
- `/admin/workflows`
- `/admin/evidence`

## Approval Gates

The following must remain unapproved until evidence passes:

- visual approval
- PR ready-for-review movement
- production deployment
- live Shopify payment activation
- Supabase production mutation
- public social publishing

## Pass Criteria

- all required routes render
- no placeholder/generic page remains
- admin is black command center
- closet uses locked standalone assets
- Black Card flow works in test/draft mode
- protected actions are blocked
- tests/build pass
- Chromium evidence is reviewed