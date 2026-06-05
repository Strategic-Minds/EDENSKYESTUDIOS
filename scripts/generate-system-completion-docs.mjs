import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const targetDir = 'docs/system_completion';

const docs = {
  'MASTER_DATA_FLOW.md': '# MASTER_DATA_FLOW\n\n## Purpose\nDefines Eden Skye Studios data movement from discovery through revenue and learning.\n\n## Flow\nResearch signals -> scored ideas -> scripts -> media jobs -> approvals -> Metricool drafts -> publishing gates -> analytics -> learning memory -> repurpose queue -> monetization routes.\n\n## Required Controls\nEvery state change must include source, timestamp, workflow key, approval status, dry_run flag, and audit log reference.\n',
  'MASTER_CONNECTOR_MAP.md': '# MASTER_CONNECTOR_MAP\n\n## Purpose\nMaps each connected app to its role and gate.\n\n## Map\nOpenAI/GPT: brain. n8n: orchestration. Supabase: memory. Vercel: runtime. GitHub: source. Drive: canon. Metricool: social drafts and analytics. Shopify/Stripe: monetization. Canva/Adobe/HeyGen/Runway/Xyla/Higgsfield: media production. Slack/Gmail/Notion/Calendar: approvals and alerts.\n',
  'MASTER_PROMPT_LIBRARY.md': '# MASTER_PROMPT_LIBRARY\n\n## Roles\nTrend Analyst, Reverse Engineer, Audience Researcher, Idea Strategist, Script Writer, Caption Writer, Image Prompt Writer, Video Prompt Writer, Voice Prompt Writer, QA Reviewer, Monetization Strategist, Performance Scientist, Executive Reporter.\n\n## Storage\nPrompt templates should live in Supabase prompt_templates with role, version, status, and approval fields.\n',
  'MASTER_TELEMETRY_STANDARD.md': '# MASTER_TELEMETRY_STANDARD\n\n## Purpose\nDefines required telemetry for workflows.\n\n## Events\nworkflow_started, workflow_completed, workflow_failed, gate_created, gate_approved, gate_rejected, asset_created, post_drafted, analytics_ingested, winner_selected, kill_switch_triggered.\n\n## Required Fields\nrun_id, workflow_key, event_type, entity_type, entity_id, status, severity, timestamp, dry_run, human_gate_required.\n',
  'MASTER_OBSERVABILITY_STANDARD.md': '# MASTER_OBSERVABILITY_STANDARD\n\n## Purpose\nDefines logs, dashboards, alerts, and incident review.\n\n## Requirements\nDaily health report, connector status, failed workflow list, retry queue, approval backlog, spend estimate, revenue snapshot, and kill-switch state.\n',
  'MASTER_MEDIA_STANDARD.md': '# MASTER_MEDIA_STANDARD\n\n## Purpose\nDefines image, video, voice, sound, and movie asset standards.\n\n## Required Metadata\navatar_id, prompt, tool, source asset, output URL, rights status, review status, usage scope, approval gate, version, storage location.\n\n## Rule\nNo paid generation or public use without approval.\n',
  'MASTER_AVATAR_STANDARD.md': '# MASTER_AVATAR_STANDARD\n\n## Purpose\nDefines AI avatar and faceless content creator governance.\n\n## Required Fields\navatar_id, display_name, adult/youth-safe category, content lanes, prohibited lanes, visual identity, voice style, prompt pack, approval status, activation status.\n\n## Rule\nMinors or youth-safe personas must never be sexualized.\n',
  'MASTER_SHOPIFY_STANDARD.md': '# MASTER_SHOPIFY_STANDARD\n\n## Purpose\nDefines Shopify website and product completion needs.\n\n## Required\nHomepage, offer pages, product drafts, digital download structure, licensing inquiry, email capture, analytics tags, brand-safe copy, refund/support policy placeholders, product image standards.\n\n## Gate\nProduct activation, pricing, discounts, checkout changes, and live store changes require approval.\n',
  'MASTER_METRICOOL_STANDARD.md': '# MASTER_METRICOOL_STANDARD\n\n## Purpose\nDefines social scheduling and analytics routing.\n\n## Required\nDraft-only scheduling, platform variants, media attachment, caption, hashtags, proposed time, approval status, final publish gate, analytics import, best-time feedback.\n',
  'MASTER_N8N_STANDARD.md': '# MASTER_N8N_STANDARD\n\n## Purpose\nDefines n8n as the 24/7 workflow harness.\n\n## Required\n17 modular workflows, master orchestrator, dry_run flags, credential placeholders, retry rules, dead-letter route, approval router, kill switch, audit writes, test seed data.\n',
  'MASTER_SUPABASE_STANDARD.md': '# MASTER_SUPABASE_STANDARD\n\n## Purpose\nDefines Supabase as persistent memory.\n\n## Required Tables\nworkflow_runs, audit_log, approvals, research_signals, content_ideas, scripts, media_jobs, media_assets, publishing_queue, analytics_snapshots, ab_tests, monetization_routes, prompt_templates, connector_health, system_settings.\n\n## Gate\nMigrations must not be applied without approval.\n',
  'MASTER_VERCEL_STANDARD.md': '# MASTER_VERCEL_STANDARD\n\n## Purpose\nDefines Vercel workflow, cron, and trigger completion requirements.\n\n## Required\nhealth routes, trigger routes, cron routes, readiness routes, admin gate routes, environment validation, secure webhook signatures, audit logging, dry-run enforcement.\n\n## Gate\nDeployments require approval.\n',
  'MASTER_RECOVERY_PLAN.md': '# MASTER_RECOVERY_PLAN\n\n## Purpose\nDefines recovery and rollback.\n\n## Controls\nKill switch, resume switch, per-connector pause, retry queue, dead-letter queue, incident report, rollback checklist, credential rotation checklist, failed publish prevention.\n',
  'MASTER_GO_LIVE_PLAN.md': '# MASTER_GO_LIVE_PLAN\n\n## Purpose\nDefines final go-live sequence.\n\n## Sequence\n1. Validate GitHub docs. 2. Validate n8n dry run. 3. Validate Supabase tables. 4. Validate Vercel routes. 5. Validate OpenAI call. 6. Validate Metricool draft. 7. Validate Shopify draft. 8. Validate analytics. 9. Review gates. 10. Approve limited pilot.\n',
  'MASTER_BUSINESS_PLAN_265_DAY.md': '# MASTER_BUSINESS_PLAN_265_DAY\n\n## Purpose\nDefines the 265-day Eden Skye Studios growth plan.\n\n## Phases\nDays 1-7: first $100 pilot. Days 8-30: repeatable content-to-sale loop. Days 31-60: first 5 account pods. Days 61-100: 20 faceless lanes. Days 101-160: avatar creator scale. Days 161-220: monetization expansion. Days 221-265: acquisition-readiness packaging.\n\n## Rule\nFinancial targets are goals, not guarantees. Track reality daily.\n'
};

const expected = Object.keys(docs).map((file) => `${targetDir}/${file}`);
const validationSummary = `# SYSTEM_COMPLETION_DOCS_VALIDATION\n\n## Expected Files\n${expected.map((file) => `- ${file}`).join('\n')}\n\n## Generator Rules\n- Non-overwrite writes only.\n- Existing files are skipped.\n- No deploys.\n- No schema applies.\n- No Shopify/Stripe mutations.\n- No publishing or scheduling.\n`;

docs['SYSTEM_COMPLETION_DOCS_VALIDATION.md'] = validationSummary;

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
