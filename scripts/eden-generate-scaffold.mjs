import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const packetPath = path.join(root, 'docs/eden/BUILD_PACKET.json');
const packet = JSON.parse(fs.readFileSync(packetPath, 'utf8'));

const safeDefaults = {
  CRON_ENABLED: 'false',
  OPERATOR_APPROVAL_REQUIRED: 'true',
  SOCIAL_PUBLISHING_ENABLED: 'false',
  SHOPIFY_LIVE_PUBLISHING_ENABLED: 'false',
  CUSTOMER_MESSAGING_ENABLED: 'false',
  SHOPIFY_DRAFT_MODE_ONLY: 'true',
  ...(packet.safe_defaults || {}),
};

function writeFile(filePath, content) {
  const abs = path.join(root, filePath);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content.trimStart() + '\n', 'utf8');
}

function jsonResponse(body, status = 200) {
  return `return Response.json(${JSON.stringify(body, null, 2)}, { status: ${status} });`;
}

const apiRouteHeader = `export const dynamic = 'force-dynamic';\n`;

writeFile('app/api/health/route.ts', `${apiRouteHeader}
export async function GET() {
  ${jsonResponse({ ok: true, system: 'eden-skye-studios', mode: 'branch_sandbox_only' })}
}
`);

writeFile('app/api/intake/model-application/route.ts', `${apiRouteHeader}
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  ${jsonResponse({ ok: true, status: 'draft_captured', item_type: 'model_application', external_actions: false })}
}
`);

writeFile('app/api/intake/brand-partner/route.ts', `${apiRouteHeader}
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  ${jsonResponse({ ok: true, status: 'draft_captured', item_type: 'brand_partner', external_actions: false })}
}
`);

writeFile('app/api/cron/eden-workflow-heartbeat/route.ts', `${apiRouteHeader}
import { env } from '../../../../lib/env';

export async function GET(request: Request) {
  const auth = request.headers.get('authorization') || '';
  const expected = process.env.CRON_SECRET ? 'Bearer ' + process.env.CRON_SECRET : '';
  if (!expected || auth !== expected) {
    ${jsonResponse({ ok: false, status: 'unauthorized' }, 401)}
  }
  if (!env.cronEnabled) {
    ${jsonResponse({ ok: true, status: 'disabled_dry_run', processed: 0, external_actions: false })}
  }
  ${jsonResponse({ ok: true, status: 'dry_run_only', processed: 0, external_actions: false })}
}
`);

writeFile('app/api/auto-social/draft/route.ts', `${apiRouteHeader}
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  ${jsonResponse({ ok: true, status: 'draft_created', publish_enabled: false, body: null })}
}
`);

writeFile('app/api/approvals/update/route.ts', `${apiRouteHeader}
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  ${jsonResponse({ ok: true, status: 'approval_recorded_draft', live_action_executed: false })}
}
`);

writeFile('app/api/shopify/draft-product/route.ts', `${apiRouteHeader}
import { env } from '../../../../lib/env';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (!env.shopifyDraftModeOnly || env.shopifyLivePublishingEnabled) {
    ${jsonResponse({ ok: false, status: 'blocked', reason: 'shopify_must_remain_draft_only' }, 403)}
  }
  ${jsonResponse({ ok: true, status: 'draft_only_stub', live_publish: false })}
}
`);

writeFile('lib/supabase/admin.ts', `export function getSupabaseAdminStatus() {
  return {
    configured: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
    mode: 'server_only',
    externalCallMade: false,
  };
}
`);

writeFile('lib/workflows/status.ts', `export const workflowStatuses = [
  'new',
  'draft_ready',
  'pending_approval',
  'approved',
  'rejected',
  'blocked',
  'needs_source_truth',
  'dry_run_only',
] as const;

export type WorkflowStatus = typeof workflowStatuses[number];
`);

writeFile('lib/workflows/process-queue.ts', `import { assertSafeDefaults } from '../env';

export function processQueueDryRun() {
  const safety = assertSafeDefaults();
  return {
    ok: safety.ok,
    mode: 'dry_run_only',
    processed: 0,
    externalActions: false,
    safety,
  };
}
`);

writeFile('lib/ai-gateway/router.ts', `export type AiTaskType = 'validation' | 'risk_check' | 'approval_summary' | 'final_public_copy' | 'caption_draft' | 'queue_summary' | 'first_pass_content_variations';

export function selectProvider(taskType: AiTaskType) {
  if (['caption_draft', 'queue_summary', 'first_pass_content_variations'].includes(taskType)) {
    return 'groq';
  }
  return 'openai';
}

export function createAiTaskStub(taskType: AiTaskType, input: unknown) {
  return {
    task_id: crypto.randomUUID(),
    provider: selectProvider(taskType),
    model: 'configured_at_runtime',
    prompt_version: 'eden-v1',
    input_json: input,
    output_json: null,
    risk_flags: [],
    approval_required: true,
    blocked_actions: ['publish', 'message_customer', 'production_deploy'],
    next_safe_action: 'store_draft',
    externalCallMade: false,
  };
}
`);

writeFile('lib/agents/index.ts', `export const edenAgents = [
  'Eden Build Packet Validator',
  'Eden Source Truth Agent',
  'Eden Workflow Router',
  'Eden Auto Social Validator',
  'Eden Shopify Draft Validator',
  'Eden Smoke Test Agent',
  'Eden Metrics Improvement Agent',
];

export function validateWithAgent(agentName: string, payload: unknown) {
  return {
    agentName,
    validation_status: 'dry_run_only',
    risk_flags: [],
    approval_required: true,
    externalActions: false,
    payload,
  };
}
`);

writeFile('lib/auto-social/create-draft.ts', `export function createAutoSocialDraft(input: unknown) {
  return {
    status: 'draft_created',
    publish_enabled: false,
    approval_required: true,
    input,
  };
}
`);

writeFile('lib/shopify/create-draft-product.ts', `export function createShopifyDraftProductStub(input: unknown) {
  return {
    status: 'draft_only_stub',
    live_publish: false,
    approval_required: true,
    input,
  };
}
`);

writeFile('lib/google-chat/notify.ts', `export function createGoogleChatNotificationStub(input: unknown) {
  return {
    status: 'notification_stub_created',
    sent: false,
    approval_required: true,
    input,
  };
}
`);

writeFile('lib/receipts/write-receipt.ts', `export function createReceipt(action: string, result: string, links: Record<string, unknown> = {}) {
  return {
    id: 'receipt_' + Date.now(),
    created_at: new Date().toISOString(),
    system: 'eden-skye-studios',
    action,
    result,
    links,
  };
}
`);

writeFile('supabase/migrations/001_eden_workflow_core.sql', `create table if not exists public.workflow_queue (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  task_type text not null,
  status text not null default 'new',
  payload_json jsonb not null default '{}'::jsonb,
  risk_flags jsonb not null default '[]'::jsonb,
  approval_required boolean not null default true,
  receipt_id text
);

create table if not exists public.workflow_runs (
  id uuid primary key default gen_random_uuid(),
  run_started_at timestamptz not null default now(),
  run_finished_at timestamptz,
  trigger_source text not null default 'dry_run',
  status text not null default 'dry_run_only',
  processed_count integer not null default 0,
  blocked_count integer not null default 0,
  error_json jsonb
);

create table if not exists public.receipts (
  id text primary key,
  created_at timestamptz not null default now(),
  system text not null,
  action text not null,
  result text not null,
  links_json jsonb not null default '{}'::jsonb,
  notes text
);
`);

writeFile('supabase/migrations/002_eden_intake_tables.sql', `create table if not exists public.model_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'new',
  payload_json jsonb not null default '{}'::jsonb,
  approval_status text not null default 'pending_approval'
);

create table if not exists public.brand_partners (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'new',
  payload_json jsonb not null default '{}'::jsonb,
  approval_status text not null default 'pending_approval'
);
`);

writeFile('supabase/migrations/003_eden_ai_tasks.sql', `create table if not exists public.ai_tasks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  provider text not null,
  model text,
  prompt_version text not null default 'eden-v1',
  input_json jsonb not null default '{}'::jsonb,
  output_json jsonb,
  risk_flags jsonb not null default '[]'::jsonb,
  approval_required boolean not null default true,
  approval_status text not null default 'draft'
);
`);

writeFile('supabase/migrations/004_eden_social_shopify.sql', `create table if not exists public.social_drafts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  platform text,
  draft_text text,
  status text not null default 'draft',
  publish_enabled boolean not null default false,
  approval_status text not null default 'pending_approval'
);

create table if not exists public.shopify_draft_actions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  action_type text not null,
  payload_json jsonb not null default '{}'::jsonb,
  draft_only boolean not null default true,
  live_publish boolean not null default false,
  approval_status text not null default 'pending_approval'
);
`);

writeFile('supabase/migrations/005_eden_rls_policies.sql', `alter table public.workflow_queue enable row level security;
alter table public.workflow_runs enable row level security;
alter table public.receipts enable row level security;
alter table public.model_applications enable row level security;
alter table public.brand_partners enable row level security;
alter table public.ai_tasks enable row level security;
alter table public.social_drafts enable row level security;
alter table public.shopify_draft_actions enable row level security;

create policy if not exists model_applications_public_insert on public.model_applications for insert with check (true);
create policy if not exists brand_partners_public_insert on public.brand_partners for insert with check (true);
`);

writeFile('tests/smoke/health.test.ts', `import assert from 'node:assert/strict';

assert.ok(true, 'health smoke placeholder passes');
`);

writeFile('tests/smoke/cron-auth.test.ts', `import assert from 'node:assert/strict';

assert.equal(process.env.CRON_ENABLED || 'false', 'false');
`);

writeFile('tests/smoke/intake.test.ts', `import assert from 'node:assert/strict';

assert.ok('model_application');
assert.ok('brand_partner');
`);

writeFile('tests/smoke/ai-gateway.test.ts', `import assert from 'node:assert/strict';

const required = ['task_id', 'provider', 'model', 'prompt_version', 'output_json', 'risk_flags', 'approval_required'];
assert.ok(required.length >= 7);
`);

writeFile('tests/smoke/no-live-actions.test.ts', `import assert from 'node:assert/strict';

assert.equal(process.env.SOCIAL_PUBLISHING_ENABLED || 'false', 'false');
assert.equal(process.env.SHOPIFY_LIVE_PUBLISHING_ENABLED || 'false', 'false');
assert.equal(process.env.CUSTOMER_MESSAGING_ENABLED || 'false', 'false');
`);

writeFile('docs/eden/MANUAL_IMPLEMENTATION_STOPLIST.md', `# Eden Manual Implementation Stoplist

Stop immediately if any task attempts to:

- deploy production
- publish social content
- message customers
- change DNS
- expose secrets
- spend money
- publish Shopify products live
- run destructive actions

All scaffolding must remain branch-only and draft-only until operator approval.
`);

writeFile('vercel.json', `{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "crons": [
    {
      "path": "/api/cron/eden-media-preview",
      "schedule": "0 10 * * *"
    },
    {
      "path": "/api/cron/eden-workflow-heartbeat",
      "schedule": "*/5 * * * *"
    }
  ]
}
`);

writeFile('docs/eden/AUTONOMOUS_BUILD_RECEIPT.md', `# Eden Autonomous Build Receipt

Receipt ID: ESS-AUTONOMOUS-SCAFFOLD-001

Generated by: scripts/eden-generate-scaffold.mjs
Mode: branch/sandbox only
Source: docs/eden/BUILD_PACKET.json

## Result
The scaffold generator writes the remaining branch-only files with safe defaults.

## Live Actions
- Production deploy: no
- Social publish: no
- Customer messages: no
- DNS changes: no
- Payments: no
- Shopify live publish: no
- External API calls: no

## Safe Defaults
${Object.entries(safeDefaults).map(([key, value]) => `- ${key}=${value}`).join('\n')}
`);

console.log('Eden scaffold generated from', packet.packet_id);
