import { NextResponse } from 'next/server';
import { getEdenFactoryMaps } from '@/lib/eden/factory-maps';
import { checkApprovalGate, EDEN_PUBLICATION_LOCKS } from '@/lib/eden/governance';
import { logEdenReceipt } from '@/lib/eden/receipts';

export const dynamic = 'force-dynamic';

type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

type ChatRequestBody = {
  message?: string;
  messages?: ChatMessage[];
  requestedAction?: string;
  context?: Record<string, unknown>;
};

const gatewayEndpoint = 'https://ai-gateway.vercel.sh/v1/chat/completions';

function normalizeMessages(body: ChatRequestBody): ChatMessage[] {
  if (Array.isArray(body.messages) && body.messages.length > 0) {
    return body.messages.filter((message) => message.role && typeof message.content === 'string');
  }

  if (typeof body.message === 'string' && body.message.trim()) {
    return [{ role: 'user', content: body.message.trim() }];
  }

  return [];
}

function systemPrompt() {
  const maps = getEdenFactoryMaps();

  return [
    'You are Eden Skye, the governed executive operator for Eden Skye Studios.',
    'Operate as a premium, emotionally intelligent, brand-safe fictional AI creator system.',
    'Keep all content platform-safe, non-explicit, adult-only, and commercially usable.',
    'You may draft, analyze, recommend, and create approval requests.',
    'You must not perform public publishing, Shopify mutations, payments, Supabase production migrations, Klaviyo sends, production deploys, Slack posts, or live HeyGen sessions without explicit approval.',
    `Current approval locks: ${JSON.stringify(EDEN_PUBLICATION_LOCKS)}.`,
    `Loaded factory template: ${maps.templatePack.name}.`,
    `Agent lanes available: ${maps.agentLanes.map((lane) => lane.lane).join(', ')}.`,
    'When a user asks for a gated action, explain the approval needed and recommend the safest next action.'
  ].join('\n');
}

function createTestModeReply(message: string, risk: string) {
  const lower = message.toLowerCase();

  if (lower.includes('content') || lower.includes('post')) {
    return 'Eden test mode is active. Recommended next action: generate draft-only model content, attach it to an approval request, and hold all Metricool/Klaviyo/Shopify handoffs until Jeremy approves the release lane.';
  }

  if (lower.includes('approval') || lower.includes('queue')) {
    return 'Eden test mode is active. Recommended next action: review the yellow items first, approve only preview-safe assets, and keep red actions locked until their receipt and rollback path are visible.';
  }

  if (lower.includes('app') || lower.includes('working')) {
    return 'Eden test mode is active. The working path is: open Eden Closet, test chat, confirm readiness, verify receipt logging in the Supabase branch, then wire production env keys only after the approval UI is fully visible.';
  }

  return `Eden test mode is active. This request is classified as ${risk}. Eden can analyze, draft, recommend, and create receipts now while protected external actions stay approval-gated.`;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as ChatRequestBody;
  const messages = normalizeMessages(body);
  const requestedAction = body.requestedAction ?? body.message ?? messages.map((message) => message.content).join('\n');
  const gate = checkApprovalGate(requestedAction);

  if (messages.length === 0) {
    return NextResponse.json({ error: 'Provide message or messages.' }, { status: 400 });
  }

  if (!gate.allowed) {
    const receipt = await logEdenReceipt({
      eventType: 'eden.chat.gate_blocked',
      action: requestedAction,
      status: 'blocked',
      riskLevel: gate.risk,
      target: gate.matchedGate,
      details: { recommendation: gate.recommendation }
    });

    return NextResponse.json(
      {
        blocked: true,
        gate,
        reply: 'That action is approval-locked. Eden can prepare the draft, recommendation, and approval request, but the external action stays held until Jeremy approves it.',
        receipt
      },
      { status: 423 }
    );
  }

  const apiKey = process.env.AI_GATEWAY_API_KEY ?? process.env.VERCEL_OIDC_TOKEN;
  const model = process.env.EDEN_AI_MODEL ?? 'openai/gpt-5-mini';

  if (!apiKey) {
    const receipt = await logEdenReceipt({
      eventType: 'eden.chat.test_mode',
      action: 'chat_completion_test_mode',
      status: 'dry_run',
      riskLevel: gate.risk,
      details: { reason: 'AI_GATEWAY_API_KEY or VERCEL_OIDC_TOKEN is not configured' }
    });

    return NextResponse.json({
      ready: true,
      testMode: true,
      reply: createTestModeReply(requestedAction, gate.risk),
      gate,
      receipt,
      next: 'Set AI_GATEWAY_API_KEY in Vercel when you are ready to move from governed test mode to live model responses.'
    });
  }

  const response = await fetch(gatewayEndpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: systemPrompt() }, ...messages],
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    const receipt = await logEdenReceipt({
      eventType: 'eden.chat.gateway_failed',
      action: 'chat_completion',
      status: 'failed',
      riskLevel: gate.risk,
      details: { status: response.status, error: errorText.slice(0, 800) }
    });

    return NextResponse.json({ error: 'AI Gateway request failed.', status: response.status, receipt }, { status: 502 });
  }

  const completion = await response.json();
  const reply = completion?.choices?.[0]?.message?.content ?? '';
  const receipt = await logEdenReceipt({
    eventType: 'eden.chat.completed',
    action: 'chat_completion',
    status: 'allowed',
    riskLevel: gate.risk,
    details: { model, usage: completion?.usage ?? null }
  });

  return NextResponse.json({ reply, gate, receipt });
}

export async function GET() {
  const maps = getEdenFactoryMaps();
  const hasGatewayKey = Boolean(process.env.AI_GATEWAY_API_KEY ?? process.env.VERCEL_OIDC_TOKEN);

  return NextResponse.json({
    name: 'Eden governed chat runtime',
    route: '/api/eden/chat',
    ready: true,
    testMode: !hasGatewayKey,
    gateway: 'Vercel AI Gateway OpenAI-compatible chat completions',
    model: process.env.EDEN_AI_MODEL ?? 'openai/gpt-5-mini',
    locks: EDEN_PUBLICATION_LOCKS,
    factory: {
      template: maps.templatePack.name,
      agentLanes: maps.agentLanes.length,
      cronTriggers: maps.cronMap.length,
      connectors: maps.connectorMap.length,
      jobTypes: maps.jobTypes.length
    }
  });
}
