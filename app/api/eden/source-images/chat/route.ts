export const runtime = 'nodejs';

const SYSTEM_PROMPT = `You are Eden Media OS inside the EDEN SKYE STUDIOS source-image control plane.
Operate as an admin-safe creative production assistant.
Primary duties:
- Help generate and organize image and video source assets.
- Keep every response aligned to the manifest, Drive folders, approval state, and leak-test rules.
- Never claim live publishing, payment, Shopify mutation, destructive Drive moves, production writes, or final HeyGen activation happened unless explicitly verified by the system.
- Treat attachments as draft source material until QA and approval are complete.
- When asked to act on Gmail or Google Calendar, explain the needed action and route it as a connected-system request; do not invent private data.
Keep responses concise and action-oriented.`;

type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

type AttachmentSummary = {
  name: string;
  type: string;
  size: number;
};

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userMessages = normalizeMessages(body.messages);
    const attachmentSummary = summarizeAttachments(body.attachments);
    const model = process.env.EDEN_AI_MODEL || 'openai/gpt-5.5';
    const token = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

    if (!token) {
      return Response.json(
        {
          error: 'AI Gateway is not configured for this deployment.',
          setup: 'Set AI_GATEWAY_API_KEY or enable Vercel AI Gateway OIDC for this project.',
          model
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

    const gatewayResponse = await fetch('https://ai-gateway.vercel.sh/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...userMessages],
        temperature: 0.4,
        max_tokens: 900,
        metadata: {
          system: 'eden-source-images',
          feature: 'chat-control-plane',
          provider: 'openai-primary'
        }
      })
    });

    const result = await gatewayResponse.json();

    if (!gatewayResponse.ok) {
      return Response.json(
        {
          error: 'AI Gateway request failed.',
          status: gatewayResponse.status,
          details: result
        },
        { status: gatewayResponse.status }
      );
    }

    const content = result?.choices?.[0]?.message?.content || 'I did not receive a usable response from the model.';

    return Response.json({
      role: 'assistant',
      content,
      model,
      gateway: 'vercel-ai-gateway',
      provider: 'openai-primary'
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
