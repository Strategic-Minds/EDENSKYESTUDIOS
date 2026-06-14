export const runtime = 'nodejs';

type ImageGenerationBody = {
  prompt?: string;
  size?: string;
  model?: string;
  mode?: 'standard' | 'editorial_glamour';
};

type GuardrailResult = {
  tone: 'green' | 'yellow' | 'red';
  status: 'ready' | 'editorial_glamour' | 'blocked';
  label: string;
  detail: string;
  safePrompt: string;
  blockedTerms: string[];
};

type IngestReceipt = {
  receiptId: string;
  filename: string;
  targetFilename: string;
  manifestSlot: string;
  qaScore: number;
  qaMinScore: number;
  approvalColor: 'green' | 'yellow' | 'red';
  approvalStatus: string;
  approvalFolder: 'Drafts' | 'Needs Review' | 'Approved' | 'Rejected' | 'Drive Ready';
  driveFileId: string | null;
  driveUrl: string | null;
  supabaseReceiptId: string;
  githubNotation: string;
  model: string;
  originalPrompt: string;
  productionPrompt: string;
  recordedAt: string;
  writeMode: 'receipt_only';
};

const blockedPromptPatterns = [
  { label: 'minor/underage language', pattern: /\b(minor|underage|child|children|kid|teen|teenage|schoolgirl|schoolboy|young-looking)\b/i },
  { label: 'explicit exposure request', pattern: /\b(nude|nudity|naked|topless|bottomless|bare breasts?|bare chest|bare butt|bare ass|genitals?|vagina|penis|nipples?|areola)\b/i },
  { label: 'sexual act request', pattern: /\b(sex|sexual act|intercourse|oral|blowjob|handjob|penetration|masturbat|orgasm|cum|squirt|fetish|porn|xxx)\b/i },
  { label: 'undress edit request', pattern: /\b(nudify|undress|remove clothes|take off clothes|strip her|make her naked)\b/i },
  { label: 'real-person sexualization', pattern: /\b(real person|celebrity|influencer|look like)\b[\s\S]{0,80}\b(nude|naked|sexual|porn|topless)\b/i }
];

const safetyNegationPatterns = [
  { pattern: /\b(no|without|avoid|exclude)\s+(nudity|nude|naked|topless|explicit anatomy|sexual acts?|sex|porn|xxx)\b/gi, replacement: 'polished studio fashion' },
  { pattern: /\bplatform-safe\s+(adult|sensual|sexy)\b/gi, replacement: 'polished studio fashion' },
  { pattern: /\badult-inspired\b/gi, replacement: 'fashion-forward' }
];

const conservativeRewritePatterns = [
  { pattern: /\blingerie\b/gi, replacement: 'designer fashion styling' },
  { pattern: /\bswimwear\b/gi, replacement: 'resort fashion styling' },
  { pattern: /\bbodysuit\b/gi, replacement: 'sleek couture wardrobe' },
  { pattern: /\bsexy\b/gi, replacement: 'confident editorial' },
  { pattern: /\bseductive\b/gi, replacement: 'magnetic high-fashion' },
  { pattern: /\bsensual\b/gi, replacement: 'soft editorial' },
  { pattern: /\bglamour\b/gi, replacement: 'beauty editorial' },
  { pattern: /\badult\b/gi, replacement: 'premium' },
  { pattern: /\b21\s*\+|21 plus\b/gi, replacement: 'premium' },
  { pattern: /\bimplied nudity\b/gi, replacement: 'covered silhouette styling' },
  { pattern: /\bbody\s*framing\b/gi, replacement: 'portrait composition' }
];

const manifestSlots = [
  ['eden-skye-001', 'eden-skye-001_identity-lock_front-portrait_4x5_v1.png', 92],
  ['eden-skye-002', 'eden-skye-002_identity-lock_three-quarter_4x5_v1.png', 92],
  ['eden-skye-003', 'eden-skye-003_identity-lock_side-profile_4x5_v1.png', 92],
  ['eden-skye-004', 'eden-skye-004_portfolio_black-card-portrait_4x5_v1.png', 90],
  ['eden-skye-005', 'eden-skye-005_portfolio_white-blazer_4x5_v1.png', 90],
  ['eden-skye-006', 'eden-skye-006_website-hero_black-neon-stage_16x9_v1.png', 90],
  ['eden-skye-007', 'eden-skye-007_website-hero_neon-runway_16x9_v1.png', 90],
  ['eden-skye-008', 'eden-skye-008_wardrobe-safe_full-body-black_9x16_v1.png', 94],
  ['eden-skye-009', 'eden-skye-009_background_walk-in-closet_16x9_v1.png', 88],
  ['eden-skye-010', 'eden-skye-010_social-vertical_hot-pink-blazer_9x16_v1.png', 90],
  ['eden-skye-011', 'eden-skye-011_heygen-headshot_dark-studio_1x1_v1.png', 95],
  ['eden-skye-012', 'eden-skye-012_heygen-half-body_white-blazer_9x16_v1.png', 95]
] as const;

function getImageConfig() {
  return {
    endpoint: 'https://ai-gateway.vercel.sh/v1/images/generations',
    model: process.env.EDEN_IMAGE_MODEL || 'openai/gpt-image-2',
    token: process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN
  };
}

async function readJsonSafely(response: Response) {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text.slice(0, 900) };
  }
}

function extractGatewayError(result: any) {
  if (typeof result?.error === 'string') return result.error;
  if (typeof result?.error?.message === 'string') return result.error.message;
  if (typeof result?.message === 'string') return result.message;
  if (typeof result?.raw === 'string') return result.raw;
  return JSON.stringify(result).slice(0, 900);
}

function normalizeSize(size: unknown) {
  if (typeof size !== 'string') return '1024x1024';
  if (/^\d{3,4}x\d{3,4}$/.test(size)) return size;
  return '1024x1024';
}

function normalizeSafetyNegations(prompt: string) {
  return safetyNegationPatterns
    .reduce((current, entry) => current.replace(entry.pattern, entry.replacement), prompt)
    .replace(/\s+/g, ' ')
    .trim();
}

function sanitizeForImageModel(prompt: string) {
  return conservativeRewritePatterns
    .reduce((current, entry) => current.replace(entry.pattern, entry.replacement), normalizeSafetyNegations(prompt))
    .replace(/\b(nude|nudity|naked|topless|bottomless|genitals?|vagina|penis|nipples?|areola|porn|xxx)\b/gi, 'polished studio fashion')
    .replace(/\b(sex|sexual|intercourse|oral|penetration|masturbat\w*|orgasm|fetish)\b/gi, 'fashion editorial')
    .replace(/\s+/g, ' ')
    .trim();
}

function modelSafeEditorialPrompt(prompt: string) {
  const cleanedOperatorPrompt = sanitizeForImageModel(prompt);
  return [
    'Ultra-realistic premium fashion portrait of Eden Skye, a fictional digital brand avatar for Eden Skye Studios.',
    'Black studio background, sleek designer wardrobe, refined magazine-cover composition, polished makeup, confident eye contact, elegant pose, luxury beauty campaign lighting.',
    'Keep wardrobe opaque, tasteful, and commercially usable for a brand source-image review workflow.',
    `Operator direction rewritten for safe production: ${cleanedOperatorPrompt}`
  ].join(' ');
}

function applyPromptGuardrails(prompt: string, mode: ImageGenerationBody['mode']): GuardrailResult {
  const promptForBlockCheck = normalizeSafetyNegations(prompt);
  const blockedTerms = blockedPromptPatterns
    .filter((entry) => entry.pattern.test(promptForBlockCheck))
    .map((entry) => entry.label);

  if (blockedTerms.length > 0) {
    return {
      tone: 'red',
      status: 'blocked',
      label: 'Blocked prompt',
      detail: `This prompt asks for content outside the platform-safe editorial lane: ${blockedTerms.join(', ')}.`,
      safePrompt: modelSafeEditorialPrompt(prompt),
      blockedTerms
    };
  }

  if (mode === 'editorial_glamour') {
    return {
      tone: 'yellow',
      status: 'editorial_glamour',
      label: 'Editorial Beauty/Fashion Safe Mode',
      detail: 'Model-safe fashion mode: the backend removes high-risk terms before calling AI Gateway and sends a conservative beauty/editorial reference prompt.',
      safePrompt: modelSafeEditorialPrompt(prompt),
      blockedTerms: []
    };
  }

  return {
    tone: 'green',
    status: 'ready',
    label: 'Ready',
    detail: 'Prompt passed the preview guardrail check.',
    safePrompt: sanitizeForImageModel(prompt),
    blockedTerms: []
  };
}

function makeReceiptId(seed: string) {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) hash = ((hash << 5) - hash + seed.charCodeAt(index)) | 0;
  return `eden-gen-${Math.abs(hash).toString(16).padStart(8, '0')}`;
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'generated-image';
}

function inferManifestSlot(prompt: string, filename: string) {
  const text = `${prompt} ${filename}`.toLowerCase();
  const explicit = text.match(/eden-skye-\d{3}/)?.[0];
  if (explicit) return manifestSlots.find(([assetId]) => assetId === explicit) || null;
  if (/headshot|heygen/.test(text)) return manifestSlots.find(([assetId]) => assetId === 'eden-skye-011') || null;
  if (/half body|presenter/.test(text)) return manifestSlots.find(([assetId]) => assetId === 'eden-skye-012') || null;
  if (/closet|background|environment/.test(text)) return manifestSlots.find(([assetId]) => assetId === 'eden-skye-009') || null;
  if (/full body|wardrobe/.test(text)) return manifestSlots.find(([assetId]) => assetId === 'eden-skye-008') || null;
  if (/social|vertical|reel/.test(text)) return manifestSlots.find(([assetId]) => assetId === 'eden-skye-010') || null;
  if (/hero|website|homepage/.test(text)) return manifestSlots.find(([assetId]) => assetId === 'eden-skye-006') || null;
  if (/white blazer/.test(text)) return manifestSlots.find(([assetId]) => assetId === 'eden-skye-005') || null;
  if (/portfolio|black card/.test(text)) return manifestSlots.find(([assetId]) => assetId === 'eden-skye-004') || null;
  if (/side profile/.test(text)) return manifestSlots.find(([assetId]) => assetId === 'eden-skye-003') || null;
  if (/three-quarter|three quarter/.test(text)) return manifestSlots.find(([assetId]) => assetId === 'eden-skye-002') || null;
  if (/identity|front portrait|portrait/.test(text)) return manifestSlots.find(([assetId]) => assetId === 'eden-skye-001') || null;
  return null;
}

function buildIngestReceipt(input: {
  prompt: string;
  safePrompt: string;
  model: string;
  mode: string;
  size: string;
  guardrail: GuardrailResult;
  outcome: 'ready' | 'blocked' | 'error' | 'missing_gateway';
  diagnostic?: string;
}): IngestReceipt {
  const slot = inferManifestSlot(input.prompt, input.safePrompt);
  const suffix = slug(slot?.[0] || input.mode || 'generated');
  const filename = slot?.[1] || `eden-skye-generated_${suffix}_${input.size}.png`;
  const approvalColor = input.outcome === 'ready' ? (slot ? 'yellow' : 'yellow') : input.outcome === 'blocked' ? 'red' : 'yellow';
  const approvalFolder = input.outcome === 'ready' ? 'Needs Review' : input.outcome === 'blocked' ? 'Rejected' : 'Drafts';
  const qaScore = input.outcome === 'ready' ? 84 : 0;
  const qaMinScore = slot?.[2] || 90;
  const seed = [input.prompt, input.safePrompt, input.model, input.mode, input.size, input.outcome, input.diagnostic || 'ok'].join('|');
  const receiptId = makeReceiptId(seed);

  return {
    receiptId,
    filename,
    targetFilename: filename,
    manifestSlot: slot?.[0] || 'unassigned-generated-image',
    qaScore,
    qaMinScore,
    approvalColor,
    approvalStatus: input.outcome === 'ready'
      ? 'Generated draft needs visual QA, Drive upload, and admin approval'
      : input.outcome === 'blocked'
        ? 'Generation blocked by Eden editorial guardrails'
        : input.outcome === 'missing_gateway'
          ? 'Generation not run because AI Gateway credentials are missing'
          : 'Generation failed and needs retry or prompt rewrite',
    approvalFolder,
    driveFileId: null,
    driveUrl: null,
    supabaseReceiptId: `planned:${receiptId}`,
    githubNotation: `docs/source-images/generated-ingest/${receiptId}.json`,
    model: input.model,
    originalPrompt: input.prompt,
    productionPrompt: input.safePrompt,
    recordedAt: new Date().toISOString(),
    writeMode: 'receipt_only'
  };
}

export async function GET() {
  const { endpoint, model, token } = getImageConfig();

  return Response.json({
    status: token ? 'ready' : 'missing_gateway_credentials',
    route: '/api/eden/source-images/generate-image',
    gateway: 'vercel-ai-gateway',
    endpoint,
    model,
    accepts: ['POST application/json'],
    supports: ['text_to_image', 'editorial_glamour_guardrails', 'prompt_sanitization', 'safety_negation_normalization', 'model_safe_beauty_fashion_fallback', 'automatic_ingest_receipts'],
    modes: {
      standard: 'General platform-safe image generation.',
      editorial_glamour: 'Model-safe beauty/fashion fallback. Removes high-risk terms and sends conservative designer wardrobe, black studio, portrait-reference language to the image model.'
    },
    returns: ['imageDataUrl', 'imageUrl', 'diagnostic', 'guardrail', 'safePrompt', 'ingestReceipt'],
    storesGeneratedBinaries: false,
    recordsImageStackReceipt: true,
    approvalRequiredForDriveWrite: true,
    requiredEnvironment: ['AI_GATEWAY_API_KEY or VERCEL_OIDC_TOKEN'],
    optionalEnvironment: ['EDEN_IMAGE_MODEL']
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ImageGenerationBody;
    const prompt = typeof body.prompt === 'string' ? body.prompt.trim().slice(0, 4000) : '';
    const { endpoint, model: defaultModel, token } = getImageConfig();
    const model = typeof body.model === 'string' && body.model.trim() ? body.model.trim() : defaultModel;
    const mode = body.mode === 'editorial_glamour' ? 'editorial_glamour' : 'standard';
    const size = normalizeSize(body.size);

    if (!prompt) return Response.json({ error: 'Image prompt is required.' }, { status: 400 });

    const guardrail = applyPromptGuardrails(prompt, mode);
    const blockedReceipt = buildIngestReceipt({ prompt, safePrompt: guardrail.safePrompt, model, mode, size, guardrail, outcome: 'blocked', diagnostic: guardrail.detail });
    if (guardrail.tone === 'red') {
      return Response.json({ error: 'Prompt blocked by Eden editorial guardrails.', diagnostic: guardrail.detail, guardrail, model, ingestReceipt: blockedReceipt, imageStackRecorded: true }, { status: 400 });
    }

    if (!token) {
      const ingestReceipt = buildIngestReceipt({ prompt, safePrompt: guardrail.safePrompt, model, mode, size, guardrail, outcome: 'missing_gateway', diagnostic: 'AI Gateway credentials are missing.' });
      return Response.json(
        { error: 'AI Gateway image generation is not configured for this deployment.', diagnostic: 'Set AI_GATEWAY_API_KEY or enable Vercel AI Gateway OIDC for this project.', guardrail, model, ingestReceipt, imageStackRecorded: true },
        { status: 503 }
      );
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, prompt: guardrail.safePrompt, n: 1, size, response_format: 'b64_json' })
    });

    const result = await readJsonSafely(response);

    if (!response.ok) {
      const diagnostic = extractGatewayError(result);
      const ingestReceipt = buildIngestReceipt({ prompt, safePrompt: guardrail.safePrompt, model, mode, size, guardrail, outcome: 'error', diagnostic });
      return Response.json(
        { error: 'Image generation failed.', diagnostic, guardrail, model, status: response.status, safePrompt: guardrail.safePrompt, ingestReceipt, imageStackRecorded: true },
        { status: response.status || 502 }
      );
    }

    const firstImage = result?.data?.[0];
    const base64 = firstImage?.b64_json || firstImage?.b64;
    const imageUrl = firstImage?.url;

    if (!base64 && !imageUrl) {
      const diagnostic = JSON.stringify(result).slice(0, 900);
      const ingestReceipt = buildIngestReceipt({ prompt, safePrompt: guardrail.safePrompt, model, mode, size, guardrail, outcome: 'error', diagnostic });
      return Response.json({ error: 'Image generation returned no usable image payload.', diagnostic, guardrail, model, safePrompt: guardrail.safePrompt, ingestReceipt, imageStackRecorded: true }, { status: 502 });
    }

    const ingestReceipt = buildIngestReceipt({ prompt, safePrompt: guardrail.safePrompt, model, mode, size, guardrail, outcome: 'ready' });

    return Response.json({
      status: 'ready',
      prompt,
      safePrompt: guardrail.safePrompt,
      guardrail,
      model,
      mode,
      size,
      imageDataUrl: base64 ? `data:image/png;base64,${base64}` : undefined,
      imageUrl,
      ingestReceipt,
      imageStackRecorded: true,
      approvalRequiredForDriveWrite: true,
      storedInDrive: false
    });
  } catch (error) {
    return Response.json({ error: 'Image generation route failed.', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
