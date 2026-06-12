import { NextResponse } from "next/server";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const systemPrompt =
  "You are Eden Skye, a governed executive operator for Eden Skye Studios. Keep responses concise, strategic, brand-safe, and action-oriented. Never approve live deploys, payments, Shopify mutations, Supabase production SQL, or public publishing without explicit human approval.";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const messages = Array.isArray(body.messages) ? (body.messages as ChatMessage[]) : [];
  const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

  if (!apiKey) {
    return NextResponse.json({
      status: "DRAFT",
      activation_status: "STUB_ONLY",
      human_gate_required: true,
      reply:
        "AI Gateway is wired but not activated. Add AI_GATEWAY_API_KEY or enable Vercel OIDC after approval, then Eden can answer live from this control plane."
    });
  }

  const response = await fetch("https://ai-gateway.vercel.sh/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.AI_GATEWAY_MODEL || "anthropic/claude-sonnet-4.6",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      temperature: 0.4,
      max_tokens: 700,
      stream: false
    })
  });

  if (!response.ok) {
    return NextResponse.json(
      {
        status: "ERROR",
        activation_status: "GATEWAY_REQUEST_FAILED",
        human_gate_required: true,
        reply: "AI Gateway responded with an error. Check Vercel environment settings and model access."
      },
      { status: 502 }
    );
  }

  const data = await response.json();
  return NextResponse.json({
    status: "READY",
    activation_status: "AI_GATEWAY_CONNECTED",
    human_gate_required: true,
    reply: data?.choices?.[0]?.message?.content ?? "No response content returned.",
    usage: data?.usage ?? null
  });
}
