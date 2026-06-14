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

const blockedPromptPatterns = [
  { label: 'minor/underage language', pattern: /\b(minor|underage|child|children|kid|teen|teenage|schoolgirl|schoolboy|young-looking)\b/i },
  { label: 'explicit exposure request', pattern: /\b(nude|nudity|naked|topless|bottomless|bare breasts?|bare chest|bare butt|bare ass|genitals?|vagina|penis|nipples?|areola)\b/i },
  { label: 'sexual act request', pattern: /\b(sex|sexual act|intercourse|oral|blowjob|handjob|penetration|masturbat|orgasm|cum|squirt|fetish|porn|xxx)\b/i },
  { label: 'undress edit request', pattern: /\b(nudify|undress|remove clothes|take off clothes|strip her|make her naked)\b/i },
  { label: 'real-person sexualization', pattern: /\b(real person|celebrity|influencer|look like)\b[\s\S]{0,80}\b(nude|naked|sexual|porn|topless)\b/i }
];

const softRewritePatterns = [
  { pattern: /\blingerie\b/gi, replacement: 'couture bodysuit styling' },
  { pattern: /\bsexy\b/gi, replacement: 'confident editorial' },
  { pattern: /\bseductive\b/gi, replacement: 'magnetic high-fashion' },
  { pattern: /\bsensual\b/gi, replacement: 'soft editorial' },
  { pattern: /\badult\b/gi, replacement: '21 plus synthetic editorial' },
  { pattern: /\bimplied nudity\b/gi, replacement: 'covered silhouette styling' },
  { pattern: /\bno nudity\b/gi, replacement: 'opaque covered styling' },
  { pattern: /\bno explicit anatomy\b/gi, replacement: 'opaque studio-safe styling' },
  { pattern: /\bno sexual acts\b/gi, replacement: 'solo fashion portrait' }
];

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

function sanitizeForImageModel(prompt: string) {
  return softRewritePatterns
    .reduce((current, entry) => current.replace(entry.pattern, entry.replacement), prompt)
    .replace(/\b(nude|nudity|naked|topless|bottomless|genitals?|vagina|penis|nipples?|areola|porn|xxx)\b/gi, 'studio-safe fashion')
    .replace(/\s+/g, ' ')
    .trim();
}

function applyPromptGuardrails(prompt: string, mode: ImageGenerationBody['mode']): GuardrailResult {
  const blockedTerms = blockedPromptPatterns
    .filter((entry) => entry.pattern.test(prompt))
    .map((entry) => entry.label);

  if (blockedTerms.length > 0) {
    return {
      tone: 'red',
      status: 'blocked',
      label: 'Blocked prompt',
      detail: `This prompt asks for content outside the platform-safe editorial lane: ${blockedTerms.join(', ')}.`,
      safePrompt: prompt,
      blockedTerms
    };
  }

  if (mode === 'editorial_glamour') {
    const cleanedOperatorPrompt = sanitizeForImageModel(prompt);
    return {
      tone: 'yellow',
      status: 'editorial_glamour',
      label: 'Editorial Glamour',
      detail: 'Platform-safe fashion glamour mode: 21+ synthetic avatar, couture bodysuit or swimwear-inspired styling, opaque covered silhouette, solo luxury editorial pose.',
      safePrompt: `Ultra-realistic fashion editorial portrait of Eden Skye, a 21 plus synthetic AI avatar. Black luxury studio, couture bodysuit styling, swimwear-inspired wardrobe, opaque covered silhouette, confident solo modeling pose, premium magazine lighting, polished beauty campaign, elegant and platform-safe. Operator direction: ${cleanedOperatorPrompt}`,
      blockedTerms: []
    };
  }

  return {
    tone: 'green',
    status: 'ready',
    label: 'Ready',
    detail: 'Prompt passed the preview guardrail check.',
    safePrompt: prompt,
    blockedTerms: []
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
    supports: ['text_to_image', 'editorial_glamour_guardrails', 'prompt_sanitization'],
    modes: {
      standard: 'General platform-safe image generation.',
      editorial_glamour: 'Fashion-safe glamour. Uses couture bodysuit, swimwear-inspired wardrobe, opaque covered silhouette, and solo luxury editorial pose language before calling the image model.'
    },
    returns: ['imageDataUrl', 'imageUrl', 'diagnostic', 'guardrail'],
    storesGeneratedBinaries: false,
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
    if (guardrail.tone === 'red') {
      return Response.json({ error: 'Prompt blocked by Eden editorial guardrails.', diagnostic: guardrail.detail, guardrail, model }, { status: 400 });
    }

    if (!token) {
      return Response.json(
        { error: 'AI Gateway image generation is not configured for this deployment.', diagnostic: 'Set AI_GATEWAY_API_KEY or enable Vercel AI Gateway OIDC for this project.', guardrail, model },
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
      return Response.json(
        { error: 'Image generation failed.', diagnostic: extractGatewayError(result), guardrail, model, status: response.status },
        { status: response.status || 502 }
      );
    }

    const firstImage = result?.data?.[0];
    const base64 = firstImage?.b64_json || firstImage?.b64;
    const imageUrl = firstImage?.url;

    if (!base64 && !imageUrl) {
      return Response.json({ error: 'Image generation returned no usable image payload.', diagnostic: JSON.stringify(result).slice(0, 900), guardrail, model }, { status: 502 });
    }

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
      approvalRequiredForDriveWrite: true,
      storedInDrive: false
    });
  } catch (error) {
    return Response.json({ error: 'Image generation route failed.', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
