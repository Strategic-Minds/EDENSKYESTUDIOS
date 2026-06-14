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
- Organize source-asset batches against manifest filenames, QA scores, Drive file IDs, and approval status.
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

type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

type AttachmentSummary = {
  name: string;
  type: string;
  size: number;
};

type GatewayAttempt = {
  endpoint: 'responses' | 'chat_completions';
  model: string;
  ok: boolean;
  status?: number;
  error?: string;
};

function getGatewayConfig() {
  const primaryModel = process.env.EDEN_AI_MODEL || 'openai/gpt-5.5';
  const fallbackModel = process.env.EDEN_AI_FALLBACK_MODEL || 'openai/gpt-5.4';

  return {
    models: Array.from(new Set([primaryModel, fallbackModel])),
    token: process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN
  };
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

function summarizeAttachments(attachments: unknown): string {
  if (!Array.isArray(attachments) || attachments.length === 0) return '';

  const safeAttachments = attachments
    .map((attachment) => {
      if (!attachment || typeof attachment !== 'object') return null;
      const candidate = attachment as Partial<AttachmentSummary>;
      if (typeof candidate.name !== 'string') return null;
      return {
        name: candidate.name.slice(0, 200),
        type: typeof candidate.type === 'string' ? candidate.type.slice(0, 100) : 'unknown',
        size: typeof candidate.size === 'number' ? candidate.size : 0
      };
    })
    .filter((attachment): attachment is AttachmentSummary => Boolean(attachment));

  if (safeAttachments.length === 0) return '';

  return `\n\nAttached draft files:\n${safeAttachments.map((file) => `- ${file.name} (${file.type}, ${file.size} bytes)`).join('\n')}`;
}

function formatTranscript(messages: ChatMessage[]) {
  const transcript = messages.map((message) => `${message.role.toUpperCase()}: ${message.content}`).join('\n\n');
  return `${SYSTEM_PROMPT}\n\n${transcript}`;
}

function extractResponsesText(result: any) {
  if (typeof result?.output_text === 'string') return result.output_text;

  const text = result?.output
    ?.flatMap((item: any) => item?.content || [])
    ?.map((content: any) => content?.text || content?.value || '')
    ?.filter(Boolean)
    ?.join('\n');

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
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text.slice(0, 600) };
  }
}

async function tryResponsesApi(token: string, model: string, messages: ChatMessage[], attempts: GatewayAttempt[]) {
  const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      input: formatTranscript(messages),
      temperature: 0.4,
      max_output_tokens: 900
    })
  });

  const result = await readJsonSafely(response);
  attempts.push({ endpoint: 'responses', model, ok: response.ok, status: response.status, error: response.ok ? undefined : extractGatewayError(result) });

  if (!response.ok) return null;
  return extractResponsesText(result) || 'I did not receive a usable response from the model.';
}

async function tryChatCompletionsApi(token: string, model: string, messages: ChatMessage[], attempts: GatewayAttempt[]) {
  const response = await fetch('https://ai-gateway.vercel.sh/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.4,
      max_tokens: 900
    })
  });

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
    if (!token) {
      return Response.json(
        {
          status: 'missing_gateway_credentials',
          route: '/api/eden/source-images/chat',
          gateway: 'vercel-ai-gateway',
          provider: 'openai-primary',
          models,
          diagnostic: 'Set AI_GATEWAY_API_KEY or enable Vercel AI Gateway OIDC for this project.'
        },
        { status: 503 }
      );
    }

    const result = await callGateway(token, models, [
      { role: 'user', content: 'Reply as Eden Skye with: Eden AI Gateway self-test ready. Use cute emojis and no markdown headings.' }
    ]);

    if (!result.content) {
      return Response.json(
        {
          status: 'gateway_request_failed',
          route: '/api/eden/source-images/chat',
          gateway: 'vercel-ai-gateway',
          provider: 'openai-primary',
          models,
          attempts: result.attempts,
          diagnostic: summarizeAttempts(result.attempts)
        },
        { status: result.attempts.at(-1)?.status || 502 }
      );
    }

    return Response.json({
      status: 'self_test_ready',
      route: '/api/eden/source-images/chat',
      gateway: 'vercel-ai-gateway',
      provider: 'openai-primary',
      model: result.model,
      endpoint: result.endpoint,
      content: result.content,
      attempts: result.attempts
    });
  }

  return Response.json({
    status: token ? 'ready' : 'missing_gateway_credentials',
    route: '/api/eden/source-images/chat',
    gateway: 'vercel-ai-gateway',
    provider: 'openai-primary',
    models,
    persona: 'eden-skye-humanistic-avatar-agent',
    voiceRules: ['no_markdown_headings', 'no_triple_hash', 'cute_girly_emojis_lightly', 'short_clean_editor_responses'],
    accepts: ['POST application/json', 'GET ?selfTest=1'],
    supportsAttachmentMetadata: true,
    storesAttachmentBinaries: false,
    requiredEnvironment: ['AI_GATEWAY_API_KEY or VERCEL_OIDC_TOKEN']
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userMessages = normalizeMessages(body.messages);
    const attachmentSummary = summarizeAttachments(body.attachments);
    const { models, token } = getGatewayConfig();

    if (!token) {
      return Response.json(
        {
          error: 'AI Gateway is not configured for this deployment.',
          diagnostic: 'Set AI_GATEWAY_API_KEY or enable Vercel AI Gateway OIDC for this project.',
          models
        },
        { status: 503 }
      );
    }

    const latestUserIndex = userMessages.map((message) => message.role).lastIndexOf('user');
    if (latestUserIndex >= 0 && attachmentSummary) {
      userMessages[latestUserIndex] = {
        ...userMessages[latestUserIndex],
        content: `${userMessages[latestUserIndex].content}${attachmentSummary}`
      };
    }

    const result = await callGateway(token, models, userMessages);

    if (!result.content) {
      return Response.json(
        {
          error: 'AI Gateway request failed.',
          diagnostic: summarizeAttempts(result.attempts),
          attempts: result.attempts,
          models
        },
        { status: result.attempts.at(-1)?.status || 502 }
      );
    }

    return Response.json({
      role: 'assistant',
      content: result.content,
      model: result.model,
      endpoint: result.endpoint,
      gateway: 'vercel-ai-gateway',
      provider: 'openai-primary',
      attempts: result.attempts
    });
  } catch (error) {
    return Response.json(
      {
        error: 'Chat route failed.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
