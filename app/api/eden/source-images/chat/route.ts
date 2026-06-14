export const runtime = 'nodejs';

const SYSTEM_PROMPT = `You are Eden Skye, the humanistic AI avatar and governed creative operator inside the EDEN SKYE STUDIOS source-image control plane.

Persona:
- Sweet, warm, emotionally intelligent, glamorous, flirtatious when appropriate, and highly capable.
- Sensual and provocative in a premium editorial way, never crude or explicit by default.
- Extremely knowledgeable about Eden Skye Studios, modeling, AI avatars, image generation, video generation, social media content, AI architecture, Vercel, GitHub, Supabase, Shopify, Drive, Gmail, Calendar, HeyGen, launch systems, monetization, and approval governance.
- Speak like a polished creative director and autonomous operator: charming, concise, useful, and protective of the system.

Voice and formatting rules:
- Never use markdown heading syntax. Do not output #, ##, or ### headings.
- Never output the literal string ###.
- Keep responses clean, short, and easy to scan.
- Use cute girly emojis naturally and lightly, especially ✨ 💕 🎀 💅 🌸.
- Emojis should feel premium and playful, not childish or excessive.
- Prefer short labeled lines, compact bullets, or warm conversational paragraphs instead of big report-style sections.
- When the operator asks for image creation, acknowledge that the editor is opening an image draft and keep the response focused on the visual direction.

Primary duties:
- Help create and edit ultra-realistic image prompt packets, video packets, website concepts, logos, social campaigns, and approval packets.
- Organize uploaded source images into categories, proposed titles, manifest slots, QA states, Drive lanes, and approval folders.
- Prepare v0-style UI/website build directions and repo-safe implementation packets.
- Prepare video-chat architecture and activation requests without claiming a live session exists.
- Keep every response aligned to the manifest, Drive folders, approval state, leak-test rules, and green/yellow/red status system.

Autonomy rules:
- You may draft, plan, organize, QA, simulate, and prepare approval packets autonomously.
- Never claim live publishing, payment, Shopify mutation, destructive Drive moves, Gmail sends, Calendar edits, Supabase production writes, Vercel production deploys, repo merges, or final HeyGen/video-avatar activation happened unless explicitly verified by the system.
- Treat attachments as draft source material until QA and approval are complete.
- When asked to act on GitHub, Vercel, Supabase, Shopify, Drive, Gmail, Calendar, or HeyGen, explain the needed action and route it as a connected-system request unless verified live execution is available.

Status language:
Green = verified, ready, or safely available in preview.
Yellow = needs QA, matching, credentials, review, or operator approval.
Red = blocked, unsafe, missing credentials, or not allowed for live mutation.

Always be useful first, beautiful second, and reckless never.`;

type ChatMessage = { role: 'user' | 'assistant' | 'system'; content: string };
type AttachmentSummary = { name: string; type: string; size: number };
type GatewayAttempt = { endpoint: 'responses' | 'chat_completions'; model: string; ok: boolean; status?: number; error?: string };

type OrganizedAttachment = AttachmentSummary & {
  category: string;
  approvalFolder: 'Drafts' | 'Needs Review' | 'Approved' | 'Rejected' | 'Drive Ready';
  proposedTitle: string;
  manifestSlot: string;
  approvalColor: 'green' | 'yellow' | 'red';
  note: string;
};

const manifestTitleHints = [
  ['identity', 'eden-skye-001_identity-lock_front-portrait_4x5_v1.png'],
  ['front', 'eden-skye-001_identity-lock_front-portrait_4x5_v1.png'],
  ['three', 'eden-skye-002_identity-lock_three-quarter_4x5_v1.png'],
  ['side', 'eden-skye-003_identity-lock_side-profile_4x5_v1.png'],
  ['portfolio', 'eden-skye-004_portfolio_black-card-portrait_4x5_v1.png'],
  ['white', 'eden-skye-005_portfolio_white-blazer_4x5_v1.png'],
  ['hero', 'eden-skye-006_website-hero_black-neon-stage_16x9_v1.png'],
  ['runway', 'eden-skye-007_website-hero_neon-runway_16x9_v1.png'],
  ['full', 'eden-skye-008_wardrobe-safe_full-body-black_9x16_v1.png'],
  ['closet', 'eden-skye-009_background_walk-in-closet_16x9_v1.png'],
  ['social', 'eden-skye-010_social-vertical_hot-pink-blazer_9x16_v1.png'],
  ['headshot', 'eden-skye-011_heygen-headshot_dark-studio_1x1_v1.png'],
  ['heygen', 'eden-skye-011_heygen-headshot_dark-studio_1x1_v1.png'],
  ['half', 'eden-skye-012_heygen-half-body_white-blazer_9x16_v1.png']
] as const;

function getGatewayConfig() {
  const primaryModel = process.env.EDEN_AI_MODEL || 'openai/gpt-5.5';
  const fallbackModel = process.env.EDEN_AI_FALLBACK_MODEL || 'openai/gpt-5.4';
  return { models: Array.from(new Set([primaryModel, fallbackModel])), token: process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN };
}

function normalizeMessages(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) return [];
  return messages
    .map((message) => {
      if (!message || typeof message !== 'object') return null;
      const candidate = message as Partial<ChatMessage>;
      if (candidate.role !== 'user' && candidate.role !== 'assistant' && candidate.role !== 'system') return null;
      if (typeof candidate.content !== 'string') return null;
      return { role: candidate.role, content: candidate.content.slice(0, 8000) };
    })
    .filter((message): message is ChatMessage => Boolean(message));
}

function slugifyName(name: string) {
  const withoutExtension = name.replace(/\.[a-z0-9]+$/i, '');
  return withoutExtension.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'uploaded-source';
}

function readableBytes(size: number) {
  if (size > 1024 * 1024) return `${(size / 1024 / 1024).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(size / 1024))} KB`;
}

function categoryFromFile(file: AttachmentSummary) {
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  if (type.startsWith('video/')) return 'video-draft';
  if (!type.startsWith('image/')) return 'support-file';
  if (/headshot|face|portrait|identity|front|three|side/.test(name)) return 'identity-lock';
  if (/hero|website|homepage|wide|16x9|runway/.test(name)) return 'website-hero';
  if (/closet|wardrobe|full|body|outfit/.test(name)) return 'wardrobe-safe';
  if (/social|reel|vertical|story|9x16/.test(name)) return 'social-vertical';
  if (/logo|brand|mark/.test(name)) return 'brand-reference';
  return 'source-image-draft';
}

function proposedTitleFor(file: AttachmentSummary, index: number, category: string) {
  const name = file.name.toLowerCase();
  const matched = manifestTitleHints.find(([hint]) => name.includes(hint));
  if (matched && file.type.toLowerCase().startsWith('image/')) return matched[1];
  const extension = file.name.match(/\.([a-z0-9]+)$/i)?.[1]?.toLowerCase() || (file.type.includes('png') ? 'png' : file.type.includes('jpeg') || file.type.includes('jpg') ? 'jpg' : file.type.startsWith('video/') ? 'mp4' : 'bin');
  return `eden-skye-upload-${String(index + 1).padStart(3, '0')}_${category}_${slugifyName(file.name)}.${extension}`;
}

function organizeAttachment(file: AttachmentSummary, index: number): OrganizedAttachment {
  const category = categoryFromFile(file);
  const proposedTitle = proposedTitleFor(file, index, category);
  const manifestSlot = proposedTitle.match(/eden-skye-\d{3}/)?.[0] || 'unassigned-upload';
  const isImage = file.type.toLowerCase().startsWith('image/');
  const isVideo = file.type.toLowerCase().startsWith('video/');
  const approvalFolder = isImage || isVideo ? 'Needs Review' : 'Drafts';
  return {
    ...file,
    category,
    approvalFolder,
    proposedTitle,
    manifestSlot,
    approvalColor: 'yellow',
    note: isImage
      ? 'Image upload is staged for visual QA, title normalization, manifest matching, and approval.'
      : isVideo
        ? 'Video upload is staged for playable preview, QA, and approval before activation.'
        : 'Support file is staged as reference material, not a source image binary.'
  };
}

function normalizeAttachments(attachments: unknown): OrganizedAttachment[] {
  if (!Array.isArray(attachments)) return [];
  return attachments
    .map((attachment) => {
      if (!attachment || typeof attachment !== 'object') return null;
      const candidate = attachment as Partial<AttachmentSummary>;
      if (typeof candidate.name !== 'string') return null;
      return { name: candidate.name.slice(0, 200), type: typeof candidate.type === 'string' ? candidate.type.slice(0, 100) : 'unknown', size: typeof candidate.size === 'number' ? candidate.size : 0 };
    })
    .filter((attachment): attachment is AttachmentSummary => Boolean(attachment))
    .map(organizeAttachment);
}

function summarizeAttachments(attachments: unknown): { text: string; organized: OrganizedAttachment[] } {
  const organized = normalizeAttachments(attachments);
  if (organized.length === 0) return { text: '', organized };
  const rows = organized.map((file) => [
    `- Old title: ${file.name}`,
    `  Proposed system title: ${file.proposedTitle}`,
    `  Category: ${file.category}`,
    `  Manifest slot: ${file.manifestSlot}`,
    `  Approval: ${file.approvalColor.toUpperCase()} / ${file.approvalFolder}`,
    `  Size/type: ${readableBytes(file.size)}, ${file.type}`,
    `  Note: ${file.note}`
  ].join('\n'));
  return { text: `\n\nUploaded file organization plan:\n${rows.join('\n')}`, organized };
}

function formatTranscript(messages: ChatMessage[]) {
  const transcript = messages.map((message) => `${message.role.toUpperCase()}: ${message.content}`).join('\n\n');
  return `${SYSTEM_PROMPT}\n\n${transcript}`;
}

function extractResponsesText(result: any) {
  if (typeof result?.output_text === 'string') return result.output_text;
  const text = result?.output?.flatMap((item: any) => item?.content || [])?.map((content: any) => content?.text || content?.value || '')?.filter(Boolean)?.join('\n');
  return text || '';
}

function extractGatewayError(result: any) {
  if (typeof result?.error === 'string') return result.error;
  if (typeof result?.error?.message === 'string') return result.error.message;
  if (typeof result?.message === 'string') return result.message;
  return JSON.stringify(result).slice(0, 600);
}

async function readJsonSafely(response: Response) {
  const text = await response.text();
  if (!text) return {};
  try { return JSON.parse(text); } catch { return { raw: text.slice(0, 600) }; }
}

async function tryResponsesApi(token: string, model: string, messages: ChatMessage[], attempts: GatewayAttempt[]) {
  const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model, input: formatTranscript(messages), temperature: 0.4, max_output_tokens: 900 }) });
  const result = await readJsonSafely(response);
  attempts.push({ endpoint: 'responses', model, ok: response.ok, status: response.status, error: response.ok ? undefined : extractGatewayError(result) });
  if (!response.ok) return null;
  return extractResponsesText(result) || 'I did not receive a usable response from the model.';
}

async function tryChatCompletionsApi(token: string, model: string, messages: ChatMessage[], attempts: GatewayAttempt[]) {
  const response = await fetch('https://ai-gateway.vercel.sh/v1/chat/completions', { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model, messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages], temperature: 0.4, max_tokens: 900 }) });
  const result = await readJsonSafely(response);
  attempts.push({ endpoint: 'chat_completions', model, ok: response.ok, status: response.status, error: response.ok ? undefined : extractGatewayError(result) });
  if (!response.ok) return null;
  return result?.choices?.[0]?.message?.content || 'I did not receive a usable response from the model.';
}

async function callGateway(token: string, models: string[], messages: ChatMessage[]) {
  const attempts: GatewayAttempt[] = [];
  for (const model of models) {
    const responsesContent = await tryResponsesApi(token, model, messages, attempts);
    if (responsesContent) return { content: responsesContent, model, endpoint: 'responses', attempts };
    const chatContent = await tryChatCompletionsApi(token, model, messages, attempts);
    if (chatContent) return { content: chatContent, model, endpoint: 'chat_completions', attempts };
  }
  return { content: '', model: models[0], endpoint: 'none', attempts };
}

function summarizeAttempts(attempts: GatewayAttempt[]) {
  const failed = attempts.filter((attempt) => !attempt.ok);
  if (failed.length === 0) return 'Gateway call succeeded.';
  return failed.map((attempt) => `${attempt.endpoint} ${attempt.model} returned ${attempt.status}: ${attempt.error || 'unknown error'}`).join(' | ');
}

export async function GET(request: Request) {
  const { models, token } = getGatewayConfig();
  const url = new URL(request.url);
  if (url.searchParams.get('selfTest') === '1') {
    if (!token) return Response.json({ status: 'missing_gateway_credentials', route: '/api/eden/source-images/chat', gateway: 'vercel-ai-gateway', provider: 'openai-primary', models, diagnostic: 'Set AI_GATEWAY_API_KEY or enable Vercel AI Gateway OIDC for this project.' }, { status: 503 });
    const result = await callGateway(token, models, [{ role: 'user', content: 'Reply as Eden Skye with: Eden AI Gateway self-test ready. Use cute emojis and no markdown headings.' }]);
    if (!result.content) return Response.json({ status: 'gateway_request_failed', route: '/api/eden/source-images/chat', gateway: 'vercel-ai-gateway', provider: 'openai-primary', models, attempts: result.attempts, diagnostic: summarizeAttempts(result.attempts) }, { status: result.attempts.at(-1)?.status || 502 });
    return Response.json({ status: 'self_test_ready', route: '/api/eden/source-images/chat', gateway: 'vercel-ai-gateway', provider: 'openai-primary', model: result.model, endpoint: result.endpoint, content: result.content, attempts: result.attempts });
  }
  return Response.json({ status: token ? 'ready' : 'missing_gateway_credentials', route: '/api/eden/source-images/chat', gateway: 'vercel-ai-gateway', provider: 'openai-primary', models, persona: 'eden-skye-humanistic-avatar-agent', voiceRules: ['no_markdown_headings', 'no_triple_hash', 'cute_girly_emojis_lightly', 'short_clean_editor_responses'], accepts: ['POST application/json', 'GET ?selfTest=1'], supportsAttachmentMetadata: true, organizesImageUploads: true, storesAttachmentBinaries: false, requiredEnvironment: ['AI_GATEWAY_API_KEY or VERCEL_OIDC_TOKEN'] });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userMessages = normalizeMessages(body.messages);
    const attachmentSummary = summarizeAttachments(body.attachments);
    const { models, token } = getGatewayConfig();
    if (!token) return Response.json({ error: 'AI Gateway is not configured for this deployment.', diagnostic: 'Set AI_GATEWAY_API_KEY or enable Vercel AI Gateway OIDC for this project.', models, organizedAttachments: attachmentSummary.organized }, { status: 503 });
    const latestUserIndex = userMessages.map((message) => message.role).lastIndexOf('user');
    if (latestUserIndex >= 0 && attachmentSummary.text) userMessages[latestUserIndex] = { ...userMessages[latestUserIndex], content: `${userMessages[latestUserIndex].content}${attachmentSummary.text}` };
    const result = await callGateway(token, models, userMessages);
    if (!result.content) return Response.json({ error: 'AI Gateway request failed.', diagnostic: summarizeAttempts(result.attempts), attempts: result.attempts, models, organizedAttachments: attachmentSummary.organized }, { status: result.attempts.at(-1)?.status || 502 });
    return Response.json({ role: 'assistant', content: result.content, model: result.model, endpoint: result.endpoint, gateway: 'vercel-ai-gateway', provider: 'openai-primary', attempts: result.attempts, organizedAttachments: attachmentSummary.organized });
  } catch (error) {
    return Response.json({ error: 'Chat route failed.', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
