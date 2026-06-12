# Eden Skye Studios One-Run Build Packet

Status: DRAFT
Activation status: STUB_ONLY
Human gate required: true

## Objective
Use the Auto Builder control-plane pattern to scaffold Eden Skye Studios as a governed digital modeling agency across Vercel route stubs, AI Gateway-ready generation lanes, Supabase migration scaffolds, Shopify draft monetization paths, Metricool draft routing, and human approval gates.

## Verified
- Auto Builder MCP exposes source, sandbox, frontend repos and the workflow lanes: executive-intake, self-reflection, discovery, branding, build-in-sandbox, promote-source, promote-frontend, validate, audit, improve.
- `Strategic-Minds/EDENSKYESTUDIOS` exists with main branch and existing Eden agent contract.
- Existing package.json uses Next.js App Router-compatible dependencies.

## Inferred
- Vercel workflow should stay route-stub only until approval.
- AI Gateway should be represented as a draft generation interface, not a live credentialed client.
- Supabase should be migration scaffold only, with no applied SQL.

## Could Not Verify
- Production Vercel project settings.
- Supabase project ID and RLS state.
- Shopify, Metricool, and AI Gateway live credentials.

## Build Packets
- Website packet: Next.js admin/readiness routes, read-only console stubs, no deploy.
- Shopify packet: product and offer draft schemas only, no mutations.
- Supabase packet: SQL migration scaffold only, no apply_migration.
- Social packet: Metricool draft routing only, no scheduling or posting.
- Media packet: governed avatar and AI-agent image assets, draft-only.
- Cron packet: cron-trigger documents only; cron is a trigger, not a worker.
- Agent packet: existing Eden agent remains primary; no duplicate operating agent.

## Approval Gates
No production deploy, Shopify mutation, Supabase production SQL, public publishing, paid ads, billing, env var, secret, domain, or cron activation without Jeremy approval.

## Local Validation Receipt
A local full scaffold run generated 227 scaffold files plus package script additions, including 147 SVG image assets, 20 female avatars, 120 male avatars, 300 content seeds, route stubs, admin stubs, workflow stubs, validation scripts, and a Supabase migration scaffold. Validators passed locally and forbidden activation/secret scans returned no matches.
