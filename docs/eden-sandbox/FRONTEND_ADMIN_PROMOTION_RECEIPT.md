# Eden Skye Frontend/Admin Sandbox Promotion Receipt

Date: 2026-06-12 UTC
Branch: `auto-builder/eden-visual-admin-sandbox-20260612`
Target repo: `Strategic-Minds/EDENSKYESTUDIOS`

## Verified Source Truth

- AUTO BUILDER active operating map identifies `Strategic-Minds/EDENSKYESTUDIOS` as the Eden app repo.
- Local sandbox implementation existed at `/workspace/output/eden-skye-sandbox` before this promotion pass.
- Uploaded visual intake resolved 20 PNG uploads into 13 unique visual references and 7 duplicate files.
- The sandbox route keeps paid generation, checkout activation, production deploys, social publishing, and production database mutation blocked.

## Promoted In This Branch

- New branch-safe route: `/eden-sandbox`
- New files:
  - `app/eden-sandbox/page.tsx`
  - `app/eden-sandbox/page.module.css`
  - `scripts/eden-sandbox-browser-qa.mjs`
  - `.github/workflows/eden-sandbox-browser-qa.yml`
- Updated `package.json` with `qa:eden-sandbox` and Playwright dev dependency.
- Added `app/styles.d.ts` for CSS module/global CSS type declarations.

## Hosted Canonical Visual Assets

The 13 canonical uploaded visuals were uploaded as Shopify media files and are now used directly by `/eden-sandbox`.

| Asset | Media ID | CDN URL |
| --- | --- | --- |
| ess-vis-001-public-home-hero-wide | `gid://shopify/MediaImage/31255241392182` | https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-001-public-home-hero-wide.png?v=1781224815 |
| ess-vis-002-public-lookbook-grid | `gid://shopify/MediaImage/31255242342454` | https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-002-public-lookbook-grid.png?v=1781224831 |
| ess-vis-003-avatar-reference-matrix | `gid://shopify/MediaImage/31255243522102` | https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-003-avatar-reference-matrix.png?v=1781224848 |
| ess-vis-004-admin-brand-dashboard | `gid://shopify/MediaImage/31255243980854` | https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-004-admin-brand-dashboard.png?v=1781224856 |
| ess-vis-005-brand-download-page | `gid://shopify/MediaImage/31255252336694` | https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-005-brand-download-page.png?v=1781224866 |
| ess-vis-006-model-card-gallery | `gid://shopify/MediaImage/31255253090358` | https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-006-model-card-gallery.png?v=1781224881 |
| ess-vis-007-public-brand-full-stack | `gid://shopify/MediaImage/31255253614646` | https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-007-public-brand-full-stack.png?v=1781224889 |
| ess-vis-008-vertical-admin-flow | `gid://shopify/MediaImage/31255254040630` | https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-008-vertical-admin-flow.png?v=1781224898 |
| ess-vis-009-avatar-brand-board | `gid://shopify/MediaImage/31255254859830` | https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-009-avatar-brand-board.png?v=1781224915 |
| ess-vis-010-avatar-full-body-reference | `gid://shopify/MediaImage/31255255253046` | https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-010-avatar-full-body-reference.png?v=1781224924 |
| ess-vis-011-admin-ops-overview | `gid://shopify/MediaImage/31255255679030` | https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-011-admin-ops-overview.png?v=1781224933 |
| ess-vis-012-media-library-dashboard | `gid://shopify/MediaImage/31255256465462` | https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-012-media-library-dashboard.png?v=1781224947 |
| ess-vis-013-content-calendar-dashboard | `gid://shopify/MediaImage/31255257022518` | https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-013-content-calendar-dashboard.png?v=1781224960 |

## Browser QA Plan

The GitHub Actions workflow builds the app, starts a local Next server, and runs Playwright checks for:

1. home
2. command center
3. model registry
4. media library
5. approval queue
6. content calendar

The workflow uploads screenshots and `receipt.json` under the artifact name `eden-sandbox-browser-qa`.

## Approval Gates

Do not merge, production deploy, publish social content, activate checkout, run paid generation, mutate Shopify/Xyla products or commerce flows, or apply production database migrations from this branch without explicit approval and rollback notes.

## Next Validation Move

Let `Eden Sandbox Browser QA` rerun against the hosted-asset patch. If it passes, download the new artifact and attach the receipt to the AWOS evidence map before any merge decision.
