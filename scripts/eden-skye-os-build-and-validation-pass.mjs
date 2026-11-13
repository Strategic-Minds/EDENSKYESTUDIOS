import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const files = {
  'docs/eden_skye_os/READINESS_AUDIT_RUNNER.md': `# EDEN SKYE OS Readiness Audit Runner

## Purpose
Audits EDEN SKYE OS readiness across GitHub, Drive, OpenAI, canonical X1 Operating Systems execution, Etherverse receipts, Vercel, existing authorized Supabase, Metricool, Shopify, Stripe, media, telemetry, governance, and monetization layers.

## Scoring
0 absent, 25 documented, 50 scaffolded, 75 dry-run tested, 100 governed-live verified.

## Required Output
- readiness score by layer
- missing blockers
- unsafe activation blockers
- next action
- human approval gates
`,
  'docs/eden_skye_os/KILL_SWITCH_CONTRACT.md': `# EDEN SKYE OS Kill Switch Contract

## Purpose
Pauses EDEN SKYE OS safely across queue processing, media generation, publishing, commerce writes, and outbound actions.

## Commands
STOP EDEN, RESUME EDEN, PAUSE PUBLISHING, PAUSE MEDIA, PAUSE SHOPIFY, PAUSE STRIPE, STATUS EDEN.

## Rule
Kill switch never deletes data. It blocks unsafe downstream execution and writes audit logs.
`,
  'docs/eden_skye_os/APPROVAL_ROUTER_CONTRACT.md': `# EDEN SKYE OS Approval Router Contract

## Purpose
Routes human approval decisions before public, paid, irreversible, or brand-risk actions.

## Required Gates
content, media, Metricool schedule, final publish, Shopify activation, Stripe activation, Vercel deploy, Supabase schema, billing, autonomy upgrade.

## Default
If uncertain, require approval.
`,
  'docs/eden_skye_os/DRIVE_CANON_ALIGNMENT_PACKET.md': `# EDEN SKYE OS Drive Canon Alignment Packet

## Required Folders
01_BRAND_CANON, 02_AVATAR_REGISTRY, 03_CONTENT_PACKETS, 04_MEDIA_ASSETS, 05_APPROVALS, 06_ANALYTICS, 07_RUNBOOKS, 08_EXPORTS.

## Rule
No deletion or moving of Drive canon without explicit approval.
`,
  'docs/eden_skye_os/SHOPIFY_WEBSITE_COMPLETION_PACKET.md': `# EDEN SKYE OS Shopify Website Completion Packet

## Required Website Pieces
Homepage, AI avatar content starter kit, digital products, licensing inquiry, lead capture, policy placeholders, analytics tags, checkout route, brand-safe copy.

## Gate
Product activation, pricing, discounts, checkout changes, and payment changes require approval.
`,
  'docs/eden_skye_os/METRICOOL_DRAFT_ROUTING_PACKET.md': `# EDEN SKYE OS Metricool Draft Routing Packet

## Purpose
Routes approved content/media into Metricool as drafts only.

## Required Fields
platforms, media_url, caption, hashtags, first_comment, proposed_time, timezone, approval_gate_id, final_publish_approved=false.

## Gate
No live scheduling or publishing without final publish approval.
`,
  'docs/eden_skye_os/FINAL_BLOCKER_REPORT.md': `# EDEN SKYE OS Final Blocker Report

## Remaining Activation Steps
1. Review locally generated documents without enabling runtime actions.
2. Read existing canonical X1 task, leases and receipts.
3. Reuse existing Etherverse identity, memories, messages and receipts.
4. Do not apply another queue migration or import competing n8n controllers.
5. Validate current authorized OpenAI, Metricool, Shopify, Stripe, Drive and media scopes.
6. Review preview-only Vercel surfaces without production deployment.
7. Run independent readiness and Guardian validation.
8. Approve a bounded dry-run pilot only after independent review.

## Not Allowed By This Packet
No deployment, schema apply, new queue, cron or orchestration service, live posting, scheduling, Shopify/Stripe mutation, billing change or source-truth overwrite.
`,
  'app/api/eden/health/route.ts': `export async function GET() {
  return Response.json({ ok: true, service: 'eden-skye-os', mode: 'scaffold' });
}
`,
  'app/api/eden/readiness/route.ts': `export async function GET() {
  return Response.json({ ok: true, readiness: 'scaffolded', live: false });
}
`,
  'app/api/eden/triggers/content/route.ts': `export async function POST() {
  return Response.json({ ok: true, trigger: 'content', dry_run: true, queued: false });
}
`,
  'app/api/eden/triggers/media/route.ts': `export async function POST() {
  return Response.json({ ok: true, trigger: 'media', dry_run: true, queued: false });
}
`,
  'app/api/eden/triggers/approval/route.ts': `export async function POST() {
  return Response.json({ ok: true, trigger: 'approval', dry_run: true, queued: false });
}
`,

};

// Refuse alternate queues, cron routes, or orchestration scaffolds if added later.
for (const file of Object.keys(files)) {
  if (file.startsWith('supabase/migrations/') || file.includes('/cron/') || file.includes('/n8n/')) {
    throw new Error(`Non-canonical runtime scaffold refused: ${file}`);
  }
}

let created = [];
let skipped = [];

for (const [file, content] of Object.entries(files)) {
  const target = path.resolve(process.cwd(), file);
  await mkdir(path.dirname(target), { recursive: true });
  try {
    await writeFile(target, content, { flag: 'wx' });
    created.push(file);
  } catch (error) {
    if (error?.code === 'EEXIST') skipped.push(file);
    else throw error;
  }
}

const report = `# EDEN SKYE OS Build And Validation Pass Result\n\n## Created\n${created.map(f => `- ${f}`).join('\n')}\n\n## Skipped\n${skipped.map(f => `- ${f}`).join('\n')}\n\n## Live Mutation\nfalse\n`;

const reportPath = path.resolve(process.cwd(), 'docs/eden_skye_os/BUILD_AND_VALIDATION_PASS_RESULT.md');
await writeFile(reportPath, report, { flag: 'wx' }).catch((error) => {
  if (error?.code !== 'EEXIST') throw error;
});

console.log(JSON.stringify({ status: 'complete', created, skipped, live_mutation: false }, null, 2));
