# Eden Skye Frontend/Admin Sandbox Promotion Receipt

Date: 2026-06-12 UTC
Branch: `auto-builder/eden-visual-admin-sandbox-20260612`
Target repo: `Strategic-Minds/EDENSKYESTUDIOS`

## Verified Source Truth

- AUTO BUILDER active operating map identifies `Strategic-Minds/EDENSKYESTUDIOS` as the Eden app repo.
- Local sandbox implementation existed at `/workspace/output/eden-skye-sandbox` before this promotion pass.
- Uploaded visual intake resolved 20 PNG uploads into 13 unique visual references and 7 duplicate files.
- The sandbox route keeps external writes, paid generation, checkout activation, production deploys, social publishing, and production database mutation blocked.

## Promoted In This Branch

- New branch-safe route: `/eden-sandbox`
- New files:
  - `app/eden-sandbox/page.tsx`
  - `app/eden-sandbox/page.module.css`
  - `scripts/eden-sandbox-browser-qa.mjs`
  - `.github/workflows/eden-sandbox-browser-qa.yml`
- Updated `package.json` with `qa:eden-sandbox` and Playwright dev dependency.

## Browser QA Plan

The GitHub Actions workflow builds the app, starts a local Next server, and runs Playwright checks for:

1. home
2. command center
3. model registry
4. media library
5. approval queue
6. content calendar

The workflow uploads screenshots and `receipt.json` under the artifact name `eden-sandbox-browser-qa`.

## Known Limits

- The large uploaded PNG reference pack was not committed in this pass. The route uses the existing Shopify-hosted Eden campaign image plus manifest-derived UI structure.
- Local container browser QA could not run because Playwright Chromium was unavailable and browser install was blocked by registry `403 Forbidden`.
- This PR must remain preview/draft until GitHub Actions screenshot evidence is captured and reviewed.

## Approval Gates

Do not merge, production deploy, publish social content, activate checkout, run paid generation, mutate Shopify/Xyla, or apply production database migrations from this branch without explicit approval and rollback notes.

## Next Validation Move

Open a draft PR and let `Eden Sandbox Browser QA` run. If it passes, download the artifact and attach the receipt to the AWOS evidence map before any merge decision.
