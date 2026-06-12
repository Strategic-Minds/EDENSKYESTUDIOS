# EDEN SKYE ADMIN Install Packet

## Install Target

Repository: `Strategic-Minds/EDENSKYESTUDIOS`
Branch: `eden/readiness-scaffold-20260604`
PR: Draft PR #2
System name: `EDEN SKYE ADMIN`

## Install Steps

1. Add builder docs under `docs/`.
2. Add machine-readable manifests under `config/`.
3. Install black admin command-center UI under `app/admin`.
4. Add admin API routes under `app/api/admin/eden`.
5. Add tests for manifests, styling contract, and protected-action gates.
6. Run `npm test`.
7. Run `npm run build`.
8. Run bridge enablement script when credentials and local repo are available: `npm run bridge:enable`.
9. Run browser evidence capture with Chromium/Playwright or the Eden Visual Preview Bridge.
10. Keep PR draft until evidence review passes.

## Local Operator Path

On Jeremy's Windows machine, run from the actual repo folder:

```powershell
cd C:\XPS\EDENSKYESTUDIOS
npm test
npm run build
npm run bridge:enable
```

Do not run npm commands from `C:\XPS` unless that folder contains `package.json`.

## Approval Boundary

This install packet does not authorize production deploys or live external mutations.