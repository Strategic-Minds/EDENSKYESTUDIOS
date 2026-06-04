import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const femaleAvatars = Array.from({ length: 120 }, (_, index) => ({
  avatar_id: `ESSF-${String(index + 1).padStart(3, '0')}`,
  display_name: `Eden Female Model ${String(index + 1).padStart(3, '0')}`,
  gender_presentation: 'female',
  status: 'DRAFT_INACTIVE',
  approval_status: 'HUMAN_REVIEW_REQUIRED',
  production_status: 'NOT_PUBLIC',
  persona_archetype: 'premium digital model talent',
  visual_direction: 'luxury editorial, cinematic, modern, platform-safe',
  voice_direction: 'confident, warm, intelligent, brand-safe',
  content_pillars: ['luxury lifestyle', 'AI avatar agency', 'fashion', 'storytelling', 'commerce'],
  monetization_paths: ['licensing', 'digital downloads', 'brand campaigns', 'AI chat', 'visual chat'],
  human_gate_required: true
}));

const maleAvatars = Array.from({ length: 120 }, (_, index) => ({
  avatar_id: `ESSM-${String(index + 1).padStart(3, '0')}`,
  display_name: `Eden Male Model ${String(index + 1).padStart(3, '0')}`,
  gender_presentation: 'male',
  status: 'DRAFT_INACTIVE',
  approval_status: 'HUMAN_REVIEW_REQUIRED',
  production_status: 'NOT_PUBLIC',
  persona_archetype: 'premium digital model talent',
  visual_direction: 'luxury editorial, cinematic, modern, platform-safe',
  voice_direction: 'confident, warm, intelligent, brand-safe',
  content_pillars: ['luxury lifestyle', 'AI avatar agency', 'supercars', 'wealth building', 'commerce'],
  monetization_paths: ['licensing', 'digital downloads', 'brand campaigns', 'AI chat', 'visual chat'],
  human_gate_required: true
}));

const ideaCategories = ['luxury', 'supercars', 'fashion', 'AI avatar agency', 'wealth building', 'emotional storytelling', 'humor', 'education', 'Shopify offers', 'visual chat', 'AI chat', 'movies'];
const preproductionIdeas = Array.from({ length: 360 }, (_, index) => ({
  idea_id: `ESS-IDEA-${String(index + 1).padStart(3, '0')}`,
  category: ideaCategories[index % ideaCategories.length],
  hook: `Draft high-engagement Eden Skye Studios content concept ${index + 1}`,
  output_types: ['image', 'short_video', 'long_video', 'voiceover', 'sound_design', 'movie_scene', 'caption', 'hashtag_set'],
  status: 'DRAFT',
  generation_enabled: false,
  publishing_enabled: false,
  human_gate_required: true
}));

const runtimeRoute = (label) => `export async function GET() {\n  return Response.json({ ok: true, route: '${label}', status: 'STUB_ONLY', mutation: false, activation_required: true });\n}\n`;
const triggerRoute = (label) => `export async function POST() {\n  return Response.json({ ok: true, trigger: '${label}', status: 'STUB_ONLY', mutation: false, human_gate_required: true });\n}\n`;
const pageStub = (title) => `export default function Page() {\n  return <main><h1>${title}</h1><p>Scaffold only. Live actions disabled until human approval gates are implemented.</p></main>;\n}\n`;

const mediaDisabled = {
  status: 'DRAFT',
  generation_enabled: false,
  publishing_enabled: false,
  scheduling_enabled: false,
  shopify_enabled: false,
  billing_enabled: false,
  human_gate_required: true
};

const files = {
  'docs/runtime/00_RUNTIME_ORCHESTRATION_OVERVIEW.md': '# Runtime Orchestration Overview\n\nStatus: SCAFFOLD_ONLY. Vercel is the trigger/orchestration target and Supabase is operational memory. No deploy, schema apply, posting, scheduling, Shopify mutation, billing change, or Drive mutation is authorized.\n',
  'docs/runtime/01_PERSISTENT_MEMORY_CONTRACT.md': '# Persistent Memory Contract\n\nSupabase is future memory for avatars, content packets, gates, workflow runs, analytics, connector health, errors, learning, and audit logs. Migration files are scaffold only until explicitly approved.\n',
  'docs/runtime/02_OPERATIONAL_MEMORY_LAYER.md': '# Operational Memory Layer\n\nTables required: eden_avatars, eden_avatar_profiles, eden_avatar_assets, eden_content_ideas, eden_content_packets, eden_content_queue, eden_platform_posts, eden_metric_snapshots, eden_learning_memory, eden_connector_health, eden_agent_runs, eden_errors, eden_audit_log, eden_approval_gates, eden_gate_decisions.\n',
  'docs/runtime/03_VERCEL_WORKFLOW_STUBS.md': '# Vercel Workflow Stubs\n\nAll workflows remain STUB_ONLY until deployment and activation gates are approved. Dispatcher cron checks work queues but does not post, schedule, mutate Shopify, or apply schema.\n',
  'docs/runtime/04_CONNECTOR_HEALTH_SCHEMA.md': '# Connector Health Schema\n\nTracks connector name, status, last check, allowed reads, allowed writes, blocked actions, fallback path, and human gate requirement.\n',
  'docs/runtime/05_LEARNING_MEMORY_SCHEMA.md': '# Learning Memory Schema\n\nTracks content hypothesis, platform, avatar, result summary, winner/loser status, improvement note, and next experiment.\n',
  'docs/runbooks/EDEN_RUNTIME_ACTIVATION_RUNBOOK.md': '# Eden Runtime Activation Runbook\n\nActivation requires human gates for Vercel deployment, Supabase schema application, Shopify mutations, Metricool posting, Xyla generation, paid API usage, and Drive canon changes.\n',
  'docs/validation/EDEN_READINESS_VALIDATION.md': '# Eden Readiness Validation\n\nValidation must confirm required files exist, JSON parses, route stubs are inert, migration is scaffold-only, and no live connector mutation is enabled.\n',
  'docs/validation/EDEN_READINESS_SCORING_ENGINE.md': '# Eden Readiness Scoring Engine\n\nScores layers: Website, Avatar Registry, Xyla, Metricool, Shopify, Supabase Memory, Vercel Workflows, Approval Gates, Analytics, Reverse Engineering, Content Engine, Monetization, Media Generation, Voice Generation, Sound Design, Movie Pipeline. Verified files only.\n',
  'docs/avatars/00_AVATAR_REGISTRY_OVERVIEW.md': '# Avatar Registry Overview\n\nRegisters 120 female and 120 male AI digital model assets as draft inactive, human-review-required, platform-safe commercial talent. No public activation, image generation, video generation, licensing, or posting without gates.\n',
  'docs/content/00_CONTENT_ENGINE_OVERVIEW.md': '# Content Engine Overview\n\nContent engine creates draft ideas, hooks, prompts, scripts, captions, hashtags, CTA, platform fit, monetization path, approval gate, and analytics hypothesis.\n',
  'docs/content/01_CONTENT_SEED_LIBRARY.md': '# Content Seed Library\n\nSeed categories: luxury lifestyle, supercars, AI avatar agency, fashion, wealth building, emotional storytelling, humor, education, Shopify products, digital downloads, visual chat, AI chat, licensing, and community.\n',
  'docs/content/02_360_PREPRODUCTION_IDEAS.md': '# 360 Preproduction Ideas\n\nThe generator creates 360 draft preproduction records for images, scripts, voices, characters, videos, content, sounds, and movie scenes. All remain draft-only until human gates approve generation and use.\n',
  'docs/approval_gates/00_GATE_MODEL.md': '# Gate Model\n\nAll external or risky actions require gates: public publishing, Metricool scheduling, Shopify mutation, Supabase schema apply, Vercel deployment, Xyla generation, voice generation, sound generation, movie generation, paid ads, billing, Drive canon mutation, governance mutation, avatar activation, licensing.\n',
  'docs/analytics/00_ANALYTICS_SCHEMA.md': '# Analytics Schema\n\nTrack platform, avatar, content packet, impressions, clicks, likes, comments, shares, saves, follows, revenue attribution, hook type, CTA type, and next optimization.\n',
  'docs/media/MEDIA_GENERATION_PIPELINE.md': '# Media Generation Pipeline\n\nDraft media jobs route from idea -> avatar -> prompt -> image/video/voice/sound/movie packet -> rights check -> human gate -> generation adapter -> asset review -> approved use. Generation is disabled by default.\n',
  'docs/media/IMAGE_GENERATION_STANDARD.md': '# Image Generation Standard\n\nImages must preserve approved avatar identity, brand world, platform safety, usage rights, and no identity drift. All image generation jobs require human gates.\n',
  'docs/media/VIDEO_GENERATION_STANDARD.md': '# Video Generation Standard\n\nVideos require script, shot list, avatar identity reference, motion direction, caption plan, platform target, and approval gate. No public posting is authorized.\n',
  'docs/media/XYLA_MEDIA_HANDOFF.md': '# Xyla Media Handoff\n\nXyla receives draft job packets only after approval. Packets include avatar ID, prompt, script, shot list, platform target, CTA, hashtags, and review status.\n',
  'docs/media/ASSET_STORAGE_AND_RIGHTS_STANDARD.md': '# Asset Storage and Rights Standard\n\nAll generated assets need source, prompt, creator tool, usage rights, review status, approved use cases, and retention notes.\n',
  'docs/media/VOICE_AND_SOUND_GENERATION_PIPELINE.md': '# Voice and Sound Generation Pipeline\n\nVoice, soundtrack, sound design, ambience, and audio branding jobs remain draft-only. Voice cloning or synthetic voice production requires explicit human gate and rights review.\n',
  'docs/media/MOVIE_AND_LONG_FORM_PIPELINE.md': '# Movie and Long Form Pipeline\n\nMovie scenes and long-form content require concept, character bible, script, shot list, voice/sound plan, brand safety review, rights review, and approval gate before generation.\n',
  'config/runtime-orchestration.json': JSON.stringify({ status: 'DRAFT', activation_status: 'SCAFFOLD_ONLY', deploy_enabled: false, schema_apply_enabled: false, posting_enabled: false, human_gate_required: true }, null, 2),
  'config/avatar-registry.schema.json': JSON.stringify({ status: 'DRAFT', counts: { female: 120, male: 120, total: 240 }, required_fields: ['avatar_id', 'display_name', 'approval_status', 'production_status', 'human_gate_required'], forbidden: ['explicit_measurements', 'minor_coded', 'auto_publish_true'] }, null, 2),
  'config/avatar-registry.generated.json': JSON.stringify({ status: 'DRAFT', activation_status: 'NOT_PUBLIC', human_gate_required: true, female_avatars: femaleAvatars, male_avatars: maleAvatars }, null, 2),
  'config/content-engine.schema.json': JSON.stringify({ status: 'DRAFT', fields: ['idea_id', 'category', 'hook', 'avatar_fit', 'format', 'platform', 'caption_angle', 'hashtag_family', 'cta', 'monetization_path', 'approval_gate'] }, null, 2),
  'config/content-preproduction-ideas.json': JSON.stringify({ status: 'DRAFT', count: 360, generation_enabled: false, human_gate_required: true, ideas: preproductionIdeas }, null, 2),
  'config/xyla-packet.schema.json': JSON.stringify({ status: 'DRAFT', publishing_enabled_default: false, fields: ['packet_id', 'avatar_id', 'visual_prompt', 'video_prompt', 'caption', 'hashtags', 'approval_status'] }, null, 2),
  'config/metricool-schedule.schema.json': JSON.stringify({ status: 'DRAFT', schedule_enabled: false, human_gate_required: true, fields: ['platform', 'draft_id', 'scheduled_time', 'approval_status'] }, null, 2),
  'config/shopify-commerce.schema.json': JSON.stringify({ status: 'DRAFT', mutation_enabled: false, human_gate_required: true, fields: ['offer_id', 'product_type', 'price_status', 'approval_status'] }, null, 2),
  'config/analytics.schema.json': JSON.stringify({ status: 'DRAFT', fields: ['platform', 'post_id', 'impressions', 'clicks', 'likes', 'comments', 'shares', 'followers_delta', 'revenue_attributed'] }, null, 2),
  'config/connector-health.schema.json': JSON.stringify({ status: 'DRAFT', fields: ['connector', 'status', 'last_checked_at', 'read_allowed', 'write_allowed', 'blocked_actions', 'fallback_path', 'human_gate_required'] }, null, 2),
  'config/learning-memory.schema.json': JSON.stringify({ status: 'DRAFT', fields: ['memory_id', 'hypothesis', 'platform', 'avatar_id', 'result', 'lesson', 'next_experiment'] }, null, 2),
  'config/media-generation.schema.json': JSON.stringify({ ...mediaDisabled, fields: ['job_id', 'avatar_id', 'asset_type', 'prompt', 'negative_prompt', 'tool_target', 'approval_status'] }, null, 2),
  'config/xyla-video-job.schema.json': JSON.stringify({ ...mediaDisabled, tool_target: 'xyla', fields: ['job_id', 'avatar_id', 'script', 'shot_list', 'voice_direction', 'duration_seconds', 'platform_targets'] }, null, 2),
  'config/avatar-image-prompt.schema.json': JSON.stringify({ ...mediaDisabled, fields: ['avatar_id', 'identity_reference', 'scene', 'wardrobe', 'lighting', 'camera', 'platform_safety', 'negative_prompt'] }, null, 2),
  'config/avatar-video-prompt.schema.json': JSON.stringify({ ...mediaDisabled, fields: ['avatar_id', 'script', 'shot_list', 'movement_direction', 'voice_direction', 'sound_direction', 'caption_plan'] }, null, 2),
  'config/voice-generation.schema.json': JSON.stringify({ ...mediaDisabled, voice_clone_enabled: false, fields: ['voice_job_id', 'avatar_id', 'voice_style', 'script', 'rights_status', 'approval_status'] }, null, 2),
  'config/sound-generation.schema.json': JSON.stringify({ ...mediaDisabled, fields: ['sound_job_id', 'mood', 'tempo', 'ambience', 'platform_target', 'rights_status', 'approval_status'] }, null, 2),
  'config/movie-production.schema.json': JSON.stringify({ ...mediaDisabled, fields: ['movie_job_id', 'concept', 'characters', 'script', 'shot_list', 'voice_plan', 'sound_plan', 'approval_status'] }, null, 2),
  'config/approval-gates.json': JSON.stringify({ status: 'DRAFT', gates: ['PUBLIC_PUBLISHING', 'SHOPIFY_MUTATION', 'SUPABASE_SCHEMA_APPLY', 'VERCEL_DEPLOYMENT', 'METRICOOL_SCHEDULING', 'XYLA_GENERATION', 'VOICE_GENERATION', 'SOUND_GENERATION', 'MOVIE_GENERATION', 'PAID_ADS', 'DRIVE_CANON_MUTATION', 'AVATAR_ACTIVATION', 'LICENSING'], default_required: true }, null, 2),
  'config/readiness-matrix.json': JSON.stringify({ status: 'DRAFT', layers: ['website', 'avatar_registry', 'xyla', 'metricool', 'shopify', 'supabase_memory', 'vercel_workflows', 'approval_gates', 'analytics', 'reverse_engineering', 'content_engine', 'monetization_engine', 'media_generation', 'voice_generation', 'sound_generation', 'movie_pipeline'] }, null, 2),
  'workflows/eden/dispatcher.workflow.ts': "export const dispatcherWorkflow = { status: 'STUB_ONLY', mutation: false, description: 'Checks queues and gates without live posting.' };\n",
  'workflows/eden/content-engine.workflow.ts': "export const contentEngineWorkflow = { status: 'STUB_ONLY', mutation: false, description: 'Generates draft content packets only.' };\n",
  'workflows/eden/avatar-production.workflow.ts': "export const avatarProductionWorkflow = { status: 'STUB_ONLY', mutation: false, description: 'Prepares avatar production requests; generation requires gate.' };\n",
  'workflows/eden/analytics-learning.workflow.ts': "export const analyticsLearningWorkflow = { status: 'STUB_ONLY', mutation: false, description: 'Analyzes metrics and drafts learning memory.' };\n",
  'workflows/eden/gate-manager.workflow.ts': "export const gateManagerWorkflow = { status: 'STUB_ONLY', mutation: false, description: 'Creates and tracks human approval gates.' };\n",
  'workflows/eden/image-generation.workflow.ts': "export const imageGenerationWorkflow = { status: 'STUB_ONLY', generation_enabled: false, mutation: false, human_gate_required: true };\n",
  'workflows/eden/video-generation.workflow.ts': "export const videoGenerationWorkflow = { status: 'STUB_ONLY', generation_enabled: false, mutation: false, human_gate_required: true };\n",
  'workflows/eden/media-review.workflow.ts': "export const mediaReviewWorkflow = { status: 'STUB_ONLY', mutation: false, human_gate_required: true };\n",
  'workflows/eden/voice-generation.workflow.ts': "export const voiceGenerationWorkflow = { status: 'STUB_ONLY', generation_enabled: false, mutation: false, human_gate_required: true };\n",
  'workflows/eden/sound-generation.workflow.ts': "export const soundGenerationWorkflow = { status: 'STUB_ONLY', generation_enabled: false, mutation: false, human_gate_required: true };\n",
  'workflows/eden/movie-production.workflow.ts': "export const movieProductionWorkflow = { status: 'STUB_ONLY', generation_enabled: false, mutation: false, human_gate_required: true };\n",
  'app/api/eden/health/route.ts': runtimeRoute('health'),
  'app/api/eden/workflow-trigger/route.ts': triggerRoute('workflow-trigger'),
  'app/api/eden/gates/route.ts': runtimeRoute('gates'),
  'app/api/eden/avatar-registry/route.ts': runtimeRoute('avatar-registry'),
  'app/api/eden/content-queue/route.ts': runtimeRoute('content-queue'),
  'app/api/eden/analytics/route.ts': runtimeRoute('analytics'),
  'app/api/eden/connector-health/route.ts': runtimeRoute('connector-health'),
  'app/api/eden/media-jobs/route.ts': runtimeRoute('media-jobs'),
  'app/api/eden/voice-jobs/route.ts': runtimeRoute('voice-jobs'),
  'app/api/eden/sound-jobs/route.ts': runtimeRoute('sound-jobs'),
  'app/api/eden/movie-jobs/route.ts': runtimeRoute('movie-jobs'),
  'app/api/cron/eden-dispatcher/route.ts': runtimeRoute('eden-dispatcher-cron'),
  'app/api/cron/eden-readiness/route.ts': runtimeRoute('eden-readiness-cron'),
  'app/api/cron/eden-media-queue/route.ts': runtimeRoute('eden-media-queue-cron'),
  'app/api/triggers/eden-content-request/route.ts': triggerRoute('eden-content-request'),
  'app/api/triggers/eden-avatar-request/route.ts': triggerRoute('eden-avatar-request'),
  'app/api/triggers/eden-gate-approved/route.ts': triggerRoute('eden-gate-approved'),
  'app/api/triggers/eden-gate-rejected/route.ts': triggerRoute('eden-gate-rejected'),
  'app/api/triggers/eden-image-request/route.ts': triggerRoute('eden-image-request'),
  'app/api/triggers/eden-video-request/route.ts': triggerRoute('eden-video-request'),
  'app/api/triggers/eden-voice-request/route.ts': triggerRoute('eden-voice-request'),
  'app/api/triggers/eden-sound-request/route.ts': triggerRoute('eden-sound-request'),
  'app/api/triggers/eden-movie-request/route.ts': triggerRoute('eden-movie-request'),
  'app/admin/eden/page.tsx': pageStub('Eden Admin'),
  'app/admin/eden/gates/page.tsx': pageStub('Eden Gates'),
  'app/admin/eden/avatars/page.tsx': pageStub('Eden Avatars'),
  'app/admin/eden/content/page.tsx': pageStub('Eden Content'),
  'app/admin/eden/analytics/page.tsx': pageStub('Eden Analytics'),
  'app/admin/eden/media/page.tsx': pageStub('Eden Media'),
  'app/admin/eden/voice/page.tsx': pageStub('Eden Voice'),
  'app/admin/eden/movies/page.tsx': pageStub('Eden Movies'),
  'supabase/migrations/0001_eden_skye_readiness_scaffold.sql': "-- SCAFFOLD ONLY\n-- DO NOT APPLY WITHOUT HUMAN APPROVAL\ncreate table if not exists eden_approval_gates (id uuid primary key default gen_random_uuid(), status text default 'draft', human_gate_required boolean default true, created_at timestamptz default now());\ncreate table if not exists eden_workflow_runs (id uuid primary key default gen_random_uuid(), workflow_key text, status text default 'draft', created_at timestamptz default now());\ncreate table if not exists eden_avatar_assets (id uuid primary key default gen_random_uuid(), avatar_id text, approval_status text default 'HUMAN_REVIEW_REQUIRED', created_at timestamptz default now());\ncreate table if not exists eden_content_queue (id uuid primary key default gen_random_uuid(), content_key text, approval_status text default 'HUMAN_REVIEW_REQUIRED', publishing_enabled boolean default false, created_at timestamptz default now());\n",
  'supabase/migrations/0002_eden_operational_memory_expansion.sql': "-- SCAFFOLD ONLY\n-- DO NOT APPLY WITHOUT HUMAN APPROVAL\ncreate table if not exists eden_avatars (id uuid primary key default gen_random_uuid(), avatar_id text unique, display_name text, gender_presentation text, approval_status text default 'HUMAN_REVIEW_REQUIRED', active boolean default false, created_at timestamptz default now());\ncreate table if not exists eden_avatar_profiles (id uuid primary key default gen_random_uuid(), avatar_id text, profile jsonb default '{}'::jsonb, created_at timestamptz default now());\ncreate table if not exists eden_content_ideas (id uuid primary key default gen_random_uuid(), category text, hook text, status text default 'draft', created_at timestamptz default now());\ncreate table if not exists eden_content_packets (id uuid primary key default gen_random_uuid(), avatar_id text, packet jsonb default '{}'::jsonb, approval_status text default 'HUMAN_REVIEW_REQUIRED', created_at timestamptz default now());\ncreate table if not exists eden_platform_posts (id uuid primary key default gen_random_uuid(), platform text, packet_id uuid, publishing_enabled boolean default false, created_at timestamptz default now());\ncreate table if not exists eden_metric_snapshots (id uuid primary key default gen_random_uuid(), platform text, metrics jsonb default '{}'::jsonb, captured_at timestamptz default now());\ncreate table if not exists eden_learning_memory (id uuid primary key default gen_random_uuid(), lesson text, next_experiment text, created_at timestamptz default now());\ncreate table if not exists eden_connector_health (id uuid primary key default gen_random_uuid(), connector text, status text default 'unknown', checked_at timestamptz default now());\ncreate table if not exists eden_agent_runs (id uuid primary key default gen_random_uuid(), agent_key text, status text default 'draft', created_at timestamptz default now());\ncreate table if not exists eden_errors (id uuid primary key default gen_random_uuid(), source text, error text, created_at timestamptz default now());\ncreate table if not exists eden_audit_log (id uuid primary key default gen_random_uuid(), event_key text, details jsonb default '{}'::jsonb, created_at timestamptz default now());\n",
  'supabase/migrations/0003_eden_media_voice_sound_jobs.sql': "-- SCAFFOLD ONLY\n-- DO NOT APPLY WITHOUT HUMAN APPROVAL\ncreate table if not exists eden_media_jobs (id uuid primary key default gen_random_uuid(), avatar_id text, asset_type text, prompt text, generation_enabled boolean default false, approval_status text default 'HUMAN_REVIEW_REQUIRED', created_at timestamptz default now());\ncreate table if not exists eden_media_assets (id uuid primary key default gen_random_uuid(), job_id uuid, asset_url text, rights_status text default 'pending_review', created_at timestamptz default now());\ncreate table if not exists eden_media_prompts (id uuid primary key default gen_random_uuid(), avatar_id text, prompt_type text, prompt text, created_at timestamptz default now());\ncreate table if not exists eden_avatar_prompt_packs (id uuid primary key default gen_random_uuid(), avatar_id text, prompt_pack jsonb default '{}'::jsonb, created_at timestamptz default now());\ncreate table if not exists eden_asset_reviews (id uuid primary key default gen_random_uuid(), asset_id uuid, review_status text default 'pending', created_at timestamptz default now());\ncreate table if not exists eden_asset_usage_rights (id uuid primary key default gen_random_uuid(), asset_id uuid, usage_rights jsonb default '{}'::jsonb, created_at timestamptz default now());\ncreate table if not exists eden_xyla_jobs (id uuid primary key default gen_random_uuid(), media_job_id uuid, xyla_payload jsonb default '{}'::jsonb, status text default 'draft', created_at timestamptz default now());\ncreate table if not exists eden_heygen_jobs (id uuid primary key default gen_random_uuid(), media_job_id uuid, heygen_payload jsonb default '{}'::jsonb, status text default 'draft', created_at timestamptz default now());\ncreate table if not exists eden_openai_media_jobs (id uuid primary key default gen_random_uuid(), media_job_id uuid, openai_payload jsonb default '{}'::jsonb, status text default 'draft', created_at timestamptz default now());\ncreate table if not exists eden_voice_jobs (id uuid primary key default gen_random_uuid(), avatar_id text, script text, voice_style text, generation_enabled boolean default false, approval_status text default 'HUMAN_REVIEW_REQUIRED', created_at timestamptz default now());\ncreate table if not exists eden_sound_jobs (id uuid primary key default gen_random_uuid(), mood text, sound_direction text, generation_enabled boolean default false, approval_status text default 'HUMAN_REVIEW_REQUIRED', created_at timestamptz default now());\ncreate table if not exists eden_movie_jobs (id uuid primary key default gen_random_uuid(), concept text, script text, shot_list jsonb default '[]'::jsonb, generation_enabled boolean default false, approval_status text default 'HUMAN_REVIEW_REQUIRED', created_at timestamptz default now());\n",
  'scripts/validate-eden-readiness.mjs': "import { access, readFile } from 'node:fs/promises';\nconst required = ['config/avatar-registry.generated.json','config/content-preproduction-ideas.json','config/readiness-matrix.json','supabase/migrations/0003_eden_media_voice_sound_jobs.sql','workflows/eden/dispatcher.workflow.ts','workflows/eden/voice-generation.workflow.ts','workflows/eden/movie-production.workflow.ts','app/api/cron/eden-dispatcher/route.ts'];\nlet missing = [];\nfor (const file of required) { try { await access(file); } catch { missing.push(file); } }\nconst avatarRegistry = JSON.parse(await readFile('config/avatar-registry.generated.json','utf8'));\nconst ideas = JSON.parse(await readFile('config/content-preproduction-ideas.json','utf8'));\nconst countsOk = avatarRegistry.female_avatars.length === 120 && avatarRegistry.male_avatars.length === 120 && ideas.ideas.length === 360;\nconsole.log(JSON.stringify({ ok: missing.length === 0 && countsOk, missing, countsOk, live_mutation: false }, null, 2));\nif (missing.length || !countsOk) process.exit(1);\n"
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
