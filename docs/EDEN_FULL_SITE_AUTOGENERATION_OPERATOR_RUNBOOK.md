# EDEN FULL SITE Autogeneration Operator Runbook

## Local Sync

Run from the repo folder:

```powershell
cd C:\XPS\EDENSKYESTUDIOS
git fetch origin
git checkout eden/readiness-scaffold-20260604
git pull origin eden/readiness-scaffold-20260604
```

If Windows blocks `.eden/bridge-requests`, stop repo-related Node/Next/VS Code processes, stash local changes, then retry. Do not use destructive git reset without explicit approval.

## Generation Sequence

Current legacy generator:

```powershell
npm run generator:reset
```

Future full-site generator after implementation:

```powershell
npm run generator:full-site
```

Then validate:

```powershell
npm test
npm run build
npm run bridge:enable
```

## Evidence Sequence

Run Eden Visual Preview Bridge from GitHub Actions or local script:

```powershell
npm run visual:preview-bridge
```

Download and review `eden-visual-preview-evidence`.

## What To Inspect

- Homepage hero and model image source
- Models grid
- Alexis profile
- Pricing with Black Card highlighted
- Checkout/payment/success draft-safe flow
- Dashboard entitlement state
- Closet home/outfit/viewer/environment routes
- AI chat/video pages
- PWA pages
- EDEN SKYE ADMIN routes
- Approval gates

## Stop Conditions

Stop and do not move PR forward if:

- tests fail
- build fails
- screenshots are missing
- any page renders a collage crop
- any page looks generic or beige
- Black Card payment is live without approval
- dashboard hardcodes membership in production mode
- protected actions are enabled by default

## PR Rule

PR #2 remains draft until full-site generation, tests, build, and screenshot review pass.