import { decideBlackCardEntitlement, normalizeCommerceEvent, isShopifyWebhookSigned } from "../../../../lib/commerce/black-card.mjs";

export const dynamic = "force-dynamic";

async function readBody(request: Request) {
  const text = await request.text();
  try {
    return { text, json: JSON.parse(text) as Record<string, unknown> };
  } catch {
    return { text, json: null };
  }
}

export async function POST(request: Request) {
  const { text, json } = await readBody(request);
  const signature = request.headers.get("x-shopify-hmac-sha256");
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;

  if (!isShopifyWebhookSigned(text, signature, secret)) {
    return Response.json({ ok: false, reason: "unsigned_or_invalid_payload", draftOnly: true }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }

  const event = normalizeCommerceEvent(json?.event ?? json?.financial_status ?? json?.status);
  if (!event) {
    return Response.json({ ok: false, reason: "unsupported_test_event", draftOnly: true }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  const decision = decideBlackCardEntitlement(event);
  return Response.json({ ok: true, draftOnly: true, signed: true, ...decision }, { headers: { "Cache-Control": "no-store" } });
}

export async function GET() {
  return Response.json({ ok: true, route: "/api/shopify/webhook", draftOnly: true, accepts: ["paid", "failed", "cancelled", "refund"], livePaymentsBlocked: true }, { headers: { "Cache-Control": "no-store" } });
}
