# Eden Skye Studios Auto Builder Capability Bridge

This document records the Auto Builder-inspired bridge layer installed in `Strategic-Minds/EDENSKYESTUDIOS`.

## Operating Rule

Eden Skye Studios uses Auto Builder as the guide pattern, but Eden Skye Studios is the source repo for the website and storefront. The sandbox repo is not the production source of truth.

All risky external mutations stay approval-gated:

- no production deploy without approval
- no Shopify mutation without approval
- no public publishing without approval
- no payment or discount changes without approval
- no Supabase production migration or service-role write without approval
- no Drive parent/sharing/delete change without approval
- no destructive GitHub write, merge, force, delete, or deploy-triggering change without approval

## Bridge Routes

- `/api/bridge/registry` returns the bridge registry and queue list.
- `/api/bridge/stack-readiness` returns capability status across GitHub, Drive, Vercel, Supabase, Shopify, and Xyla.
- `/api/bridge/drive-move` queues Drive image/file/folder move packets. It does not perform live Drive parent changes because direct Drive metadata move tooling is not currently exposed.
- `/api/bridge/github-move` queues GitHub file/folder move plans and blocks destructive operations until reviewed.
- `/api/bridge/vercel-preview` queues preview deploy/smoke-check packets and blocks production deploys.

## Capability Registry

The canonical registry lives in `lib/eden/capabilities.ts`.

Current status:

- GitHub: partial. Connected repo reads/writes are available through the connector. Runtime automation still needs `GITHUB_TOKEN`.
- Google Drive: partial. Native file creation/read/update works; direct folder move execution needs Drive metadata parent tooling.
- Vercel: blocked. Repo-side preview bridge exists; live Vercel automation needs `VERCEL_TOKEN`, `VERCEL_PROJECT_ID`, and possibly `VERCEL_TEAM_ID`.
- Supabase: partial. Project is visible and healthy; production writes remain locked.
- Shopify: partial. Store info is visible; mutations remain locked.
- Xyla: blocked. Draft route exists; connector/API key is still needed.

## Drive Control Plane

The Google Sheet control plane has a `Capabilities v1` tab that mirrors the registry for human review:

https://docs.google.com/spreadsheets/d/1D-2NTRPkvHfItlQ2LoDrrUNUrDZg9Iy1DvZ8GrxlrYg/edit

## Next Enablement Steps

1. Add required Vercel environment credentials to the approved preview runtime.
2. Expose or connect a Drive metadata move tool for addParents/removeParents-style folder movement.
3. Confirm the Supabase receipt tables and service role only after approval.
4. Connect Xyla or provide the correct API key/workspace integration.
5. Review preview routes before any production deployment.
