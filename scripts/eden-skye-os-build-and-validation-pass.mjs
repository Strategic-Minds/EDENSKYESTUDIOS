import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const files = {
  'docs/eden_skye_os/READINESS_AUDIT_RUNNER.md': `# EDEN SKYE OS Readiness Audit Runner

## Purpose
Audits EDEN SKYE OS readiness across GitHub, Drive, OpenAI, n8n, Vercel, Supabase, Metricool, Shopify, Stripe, media, telemetry, governance, and monetization layers.

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
1. Run repository generators via GitHub Actions.
2. Review generated docs.
3. Apply Supabase migration only after approval.
4. Deploy Vercel routes only after approval.
5. Import n8n workflows and configure credentials.
6. Validate OpenAI, Metricool, Shopify, Stripe, Drive, media connectors.
7. Run readiness audit.
8. Approve limited dry-run pilot.

## Not Allowed By This Packet
No deployment, schema apply, live posting, scheduling, Shopify/Stripe mutation, billing change, or source-truth overwrite.
`,
  'supabase/migrations/0001_eden_skye_os_runtime_scaffold.sql': `-- EDEN SKYE OS runtime scaffold migration
-- DO NOT APPLY WITHOUT EXPLICIT APPROVAL.

create table if not exists eden_workflow_queue (
  id uuid primary key default gen_random_uuid(),
  workflow_key text not null,
  payload_json jsonb not null default '{}'::jsonb,
  status text not null default 'pending',
  priority integer not null default 100,
  dry_run boolean not null default true,
  approval_gate_id uuid,
  idempotency_key text,
  claimed_by text,
  claimed_at timestamptz,
  completed_at timestamptz,
  error_json jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists eden_workflow_runs (
  id uuid primary key default gen_random_uuid(),
  workflow_key text not null,
  queue_id uuid,
  status text not null,
  started_at timestamptz default now(),
  finished_at timestamptz,
  result_json jsonb,
  error_json jsonb
);

create table if not exists eden_approval_gates (
  id uuid primary key default gen_random_uuid(),
  gate_type text not null,
  object_type text not null,
  object_id text not null,
  status text not null default 'pending',
  reviewer text,
  decision_notes text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create table if not exists eden_audit_log (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  actor text,
  entity_type text,
  entity_id text,
  payload_json jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists eden_connector_health (
  id uuid primary key default gen_random_uuid(),
  connector_key text not null,
  status text not null default 'unknown',
  last_checked_at timestamptz,
  details_json jsonb default '{}'::jsonb
);

create table if not exists eden_metric_snapshots (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  object_id text,
  metrics_json jsonb not null default '{}'::jsonb,
  captured_at timestamptz not null default now()
);
`,
  'app/api/eden/health/route.ts': `export async function GET() {
  return Response.json({ ok: true, service: 'eden-skye-os', mode: 'scaffold' });
}
`,
  'app/api/eden/readiness/route.ts': `export async function GET() {
  return Response.json({ ok: true, readiness: 'scaffolded', live: false });
}
`,
  'app/api/eden/cron/bridge-runner/route.ts': `export async function GET() {
  return Response.json({ ok: true, cron: 'bridge-runner', dry_run: true, live_mutation: false });
}
`,
  'app/api/eden/cron/readiness-audit/route.ts': `export async function GET() {
  return Response.json({ ok: true, cron: 'readiness-audit', dry_run: true, live_mutation: false });
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
  'docs/eden_skye_os/n8n/EDEN_SKYE_OS_IMPORT_PACKET.md': `# EDEN SKYE OS n8n Import Packet

## Workflows
Master Orchestrator, Supabase Queue Consumer, Approval Router, Kill Switch, Readiness Audit, Content Pipeline, Media Pipeline, Metricool Draft Pipeline, Shopify/Stripe Draft Pipeline, Analytics Collector, Learning Loop.

## Defaults
dry_run=true, draft_only=true, require_human_approval=true.
`
};

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
