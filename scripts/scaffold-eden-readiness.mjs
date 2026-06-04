import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const files = {
  'docs/runtime/00_RUNTIME_ORCHESTRATION_OVERVIEW.md': '# Runtime Orchestration Overview\n\nStatus: SCAFFOLD_ONLY.\n\nDefines Vercel as the trigger/orchestration layer and Supabase as operational memory. No deploy, schema apply, posting, scheduling, Shopify mutation, billing change, or Drive mutation is authorized by this file.\n',
  'docs/runtime/01_PERSISTENT_MEMORY_CONTRACT.md': '# Persistent Memory Contract\n\nSupabase is the future operational memory for avatars, content packets, gates, workflow runs, analytics, connector health, errors, and audit logs. Migration files are scaffold only until explicitly approved.\n',
  'docs/runbooks/EDEN_RUNTIME_ACTIVATION_RUNBOOK.md': '# Eden Runtime Activation Runbook\n\nActivation requires human gates for Vercel deployment, Supabase schema application, Shopify mutations, Metricool posting, Xyla generation, and paid API usage.\n',
  'docs/validation/EDEN_READINESS_VALIDATION.md': '# Eden Readiness Validation\n\nValidation must confirm required files exist, JSON parses, all route stubs are inert, migration is scaffold-only, and no live connector mutation is enabled.\n',
  'config/runtime-orchestration.json': JSON.stringify({ status: 'DRAFT', activation_status: 'SCAFFOLD_ONLY', deploy_enabled: false, schema_apply_enabled: false, posting_enabled: false, human_gate_required: true }, null, 2),
  'config/avatar-registry.schema.json': JSON.stringify({ status: 'DRAFT', required_fields: ['avatar_id', 'display_name', 'approval_status', 'production_status', 'human_gate_required'], forbidden: ['explicit_measurements', 'minor_coded', 'auto_publish_true'] }, null, 2),
  'config/xyla-packet.schema.json': JSON.stringify({ status: 'DRAFT', publishing_enabled_default: false, fields: ['packet_id', 'avatar_id', 'visual_prompt', 'video_prompt', 'caption', 'hashtags', 'approval_status'] }, null, 2),
  'config/metricool-schedule.schema.json': JSON.stringify({ status: 'DRAFT', schedule_enabled: false, human_gate_required: true, fields: ['platform', 'draft_id', 'scheduled_time', 'approval_status'] }, null, 2),
  'config/shopify-commerce.schema.json': JSON.stringify({ status: 'DRAFT', mutation_enabled: false, human_gate_required: true, fields: ['offer_id', 'product_type', 'price_status', 'approval_status'] }, null, 2),
  'config/analytics.schema.json': JSON.stringify({ status: 'DRAFT', fields: ['platform', 'post_id', 'impressions', 'clicks', 'likes', 'comments', 'shares', 'followers_delta', 'revenue_attributed'] }, null, 2),
  'config/approval-gates.json': JSON.stringify({ status: 'DRAFT', gates: ['PUBLIC_PUBLISHING', 'SHOPIFY_MUTATION', 'SUPABASE_SCHEMA_APPLY', 'VERCEL_DEPLOYMENT', 'METRICOOL_SCHEDULING', 'XYLA_GENERATION', 'PAID_ADS', 'DRIVE_CANON_MUTATION'], default_required: true }, null, 2),
  'config/readiness-matrix.json': JSON.stringify({ status: 'DRAFT', layers: ['website', 'avatar_registry', 'xyla', 'metricool', 'shopify', 'supabase_memory', 'vercel_workflows', 'approval_gates', 'analytics', 'reverse_engineering', 'content_engine', 'monetization_engine'] }, null, 2),
  'app/api/eden/health/route.ts': "export async function GET() { return Response.json({ ok: true, status: 'SCAFFOLD_ONLY', mutation: false }); }\n",
  'app/api/eden/workflow-trigger/route.ts': "export async function POST() { return Response.json({ ok: true, status: 'STUB_ONLY', mutation: false, message: 'Workflow trigger stub only.' }); }\n",
  'app/api/eden/gates/route.ts': "export async function GET() { return Response.json({ ok: true, status: 'STUB_ONLY', gates_enabled: false }); }\n",
  'app/admin/eden/gates/page.tsx': "export default function EdenGatesPage() { return <main><h1>Eden Gates</h1><p>Scaffold only. Live approvals disabled until implementation gate.</p></main>; }\n",
  'supabase/migrations/0001_eden_skye_readiness_scaffold.sql': "-- SCAFFOLD ONLY\n-- DO NOT APPLY WITHOUT HUMAN APPROVAL\ncreate table if not exists eden_approval_gates (id uuid primary key default gen_random_uuid(), status text default 'draft', human_gate_required boolean default true, created_at timestamptz default now());\ncreate table if not exists eden_workflow_runs (id uuid primary key default gen_random_uuid(), workflow_key text, status text default 'draft', created_at timestamptz default now());\ncreate table if not exists eden_avatar_assets (id uuid primary key default gen_random_uuid(), avatar_id text, approval_status text default 'HUMAN_REVIEW_REQUIRED', created_at timestamptz default now());\ncreate table if not exists eden_content_queue (id uuid primary key default gen_random_uuid(), content_key text, approval_status text default 'HUMAN_REVIEW_REQUIRED', publishing_enabled boolean default false, created_at timestamptz default now());\n"
};

let created = 0;
let skipped = 0;

for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.resolve(process.cwd(), filePath);
  await mkdir(path.dirname(fullPath), { recursive: true });
  try {
    await writeFile(fullPath, content, { flag: 'wx' });
    created += 1;
    console.log(`CREATED ${filePath}`);
  } catch (error) {
    if (error && error.code === 'EEXIST') {
      skipped += 1;
      console.log(`SKIPPED ${filePath}`);
    } else {
      throw error;
    }
  }
}

console.log(JSON.stringify({ status: 'complete', created, skipped, live_mutation: false }, null, 2));
