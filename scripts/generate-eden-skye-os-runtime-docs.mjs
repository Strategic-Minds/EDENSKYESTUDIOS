import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const targetDir = 'docs/eden_skye_os';

const docs = {
  '03_CONTENT_ENGINE.md': `# EDEN SKYE OS Content Engine

## Status
SCAFFOLD_ONLY / ADDITIVE SOURCE ARTIFACT.

## Purpose
Creates governed hooks, scripts, captions, hashtags, CTAs, prompts, content packets, and platform variants from approved discovery and reverse-engineering packets.

## Inputs
- Ranked opportunities
- Brand canon
- Avatar/faceless account registry
- Prompt templates
- Offer library
- Platform constraints

## Outputs
- Script packets
- Caption packets
- Hashtag sets
- Image/video/voice prompts
- Approval summaries
- Repurpose instructions

## Gates
Content approval, claim verification, brand safety, platform safety, and monetization alignment.
`,
  '04_MEDIA_ENGINE.md': `# EDEN SKYE OS Media Engine

## Status
SCAFFOLD_ONLY / ADDITIVE SOURCE ARTIFACT.

## Purpose
Routes approved content packets into image, video, voice, sound, movie, Canva, Adobe, HeyGen, Runway, Xyla, and Higgsfield handoff jobs.

## Outputs
- Media job packets
- Asset metadata
- Review gates
- Usage rights records

## Default Mode
Generation disabled until approved. Draft-only asset creation. No paid batch generation without explicit gate.
`,
  '05_SCHEDULING_ENGINE.md': `# EDEN SKYE OS Scheduling Engine

## Purpose
Turns approved content/media packets into Metricool draft schedules and platform variants.

## Default Mode
Draft-only. No autopublish. Final publish/schedule requires human approval.

## Required Fields
platform, account, caption, hashtags, media_url, proposed_time, timezone, approval_gate_id, dry_run.
`,
  '06_ANALYTICS_ENGINE.md': `# EDEN SKYE OS Analytics Engine

## Purpose
Ingests performance from Metricool, Shopify, Stripe, Klaviyo, platform APIs, and website analytics.

## Metrics
views, reach, watch time, completion, likes, comments, shares, saves, clicks, follows, leads, orders, revenue, conversion rate.

## Output
Analytics snapshots, winner signals, loser signals, repost recommendations.
`,
  '07_LEARNING_ENGINE.md': `# EDEN SKYE OS Learning Engine

## Purpose
Turns analytics into persistent learning memory for future content, avatar, offer, and scheduling decisions.

## Outputs
winning hooks, losing patterns, best platforms, best avatars, best offers, next tests, repurpose routes.
`,
  '08_MONETIZATION_ENGINE.md': `# EDEN SKYE OS Monetization Engine

## Purpose
Maps attention to income through Shopify, Stripe, affiliate routes, lead capture, licensing, sponsorship, subscriptions, and service offers.

## Gates
Shopify activation, Stripe payment links, pricing, discounts, subscriptions, sponsorship outreach, and customer-impacting writes require approval.
`,
  '09_GITHUB_ACTIONS_RUNTIME.md': `# EDEN SKYE OS GitHub Actions Runtime

## Purpose
Provides repository execution for generators, validation, readiness audits, prompt checks, and workflow package generation.

## Required Workflows
- generate-eden-skye-os-runtime-docs
- readiness-audit
- prompt-validation
- workflow-validation
- connector-manifest-check

## Rule
Actions may create additive artifacts only unless explicitly approved.
`,
  '10_VERCEL_RUNTIME.md': `# EDEN SKYE OS Vercel Runtime

## Purpose
Defines Vercel routes, crons, triggers, readiness endpoints, admin gate surfaces, and environment validation.

## Required Routes
/api/eden/readiness, /api/eden/triggers/*, /api/eden/cron/*, /api/eden/admin/gates, /api/eden/health.

## Gate
No production deploy without approval.
`,
  '11_SUPABASE_MEMORY.md': `# EDEN SKYE OS Supabase Memory

## Purpose
Defines persistent memory, queues, approvals, analytics, audit logs, prompt versions, connector health, workflow runs, and system settings.

## Tables
workflow_runs, audit_log, approvals, connector_health, prompt_templates, research_signals, content_ideas, scripts, media_jobs, media_assets, publishing_queue, analytics_snapshots, monetization_routes, learning_memory, system_settings.

## Gate
Migrations are scaffold-only until approved.
`,
  '12_N8N_IMPORT_PACKET.md': `# EDEN SKYE OS n8n Import Packet

## Purpose
Defines workflows to import/build in n8n.

## Workflows
Master orchestrator, discovery, reverse engineering, scoring, script factory, media routing, QA gate, approval router, Metricool draft scheduler, Shopify/Stripe offer router, analytics collector, A/B analyzer, winner repurpose, daily brain report, kill switch.

## Defaults
dry_run=true, draft_only=true, approval_required=true.
`,
  '13_TELEMETRY_STANDARD.md': `# EDEN SKYE OS Telemetry Standard

## Purpose
Defines observability events for all workflows.

## Events
workflow_started, workflow_completed, workflow_failed, gate_created, gate_approved, gate_rejected, asset_created, draft_scheduled, analytics_ingested, winner_selected, kill_switch_triggered.

## Required Fields
workflow_key, run_id, entity_id, status, severity, timestamp, dry_run, approval_gate_id.
`,
  '14_READINESS_AUDITS.md': `# EDEN SKYE OS Readiness Audits

## Purpose
Measures readiness by committed artifacts and verified runtime tests.

## Layers
GitHub, Drive, OpenAI, n8n, Vercel, Supabase, Metricool, Shopify, Stripe, Media, Analytics, Governance, Telemetry, Monetization.

## Scoring
0 absent, 25 documented, 50 scaffolded, 75 dry-run tested, 100 governed live verified.
`,
  '15_ACTIVATION_GATES.md': `# EDEN SKYE OS Activation Gates

## Purpose
Defines gates before live autonomy.

## Required Gates
content approval, media generation approval, Metricool schedule approval, final publish approval, Shopify activation approval, Stripe activation approval, Vercel deploy approval, Supabase schema approval, billing approval, autonomy upgrade approval.

## Rule
If uncertain, require approval.
`,
  '16_EDEN_SKYE_OS_READINESS_MATRIX.md': `# EDEN SKYE OS Readiness Matrix

## Current Artifact-Based Baseline
- Completion Library: documented
- Discovery Engine: documented
- Reverse Engineering Engine: documented
- Content Engine: generator-pending
- Media Engine: generator-pending
- Scheduling Engine: generator-pending
- Analytics Engine: generator-pending
- Learning Engine: generator-pending
- Monetization Engine: generator-pending
- GitHub Runtime: scaffolded
- Vercel Runtime: documented
- Supabase Memory: documented
- n8n Runtime: documented
- Telemetry: generator-pending
- Readiness Audits: generator-pending
- Activation Gates: generator-pending

## Rule
Scores may only increase with committed artifacts or verified dry-run/live tests.
`
};

const expected = Object.keys(docs).map((file) => `${targetDir}/${file}`);

docs['EDEN_SKYE_OS_RUNTIME_DOCS_VALIDATION.md'] = `# EDEN SKYE OS Runtime Docs Validation

## Expected Files
${expected.map((file) => `- ${file}`).join('\n')}

## Generator Rules
- Non-overwrite writes only.
- Existing files are skipped.
- No deploys.
- No schema applies.
- No publishing or scheduling.
- No Shopify/Stripe mutations.
- No billing changes.
`;

let created = 0;
let skipped = 0;

for (const [fileName, content] of Object.entries(docs)) {
  const targetPath = path.resolve(process.cwd(), targetDir, fileName);
  await mkdir(path.dirname(targetPath), { recursive: true });
  try {
    await writeFile(targetPath, content, { flag: 'wx' });
    created += 1;
    console.log(`CREATED ${targetDir}/${fileName}`);
  } catch (error) {
    if (error?.code === 'EEXIST') {
      skipped += 1;
      console.log(`SKIPPED ${targetDir}/${fileName}`);
    } else {
      throw error;
    }
  }
}

console.log(JSON.stringify({ status: 'complete', created, skipped, live_mutation: false }, null, 2));
