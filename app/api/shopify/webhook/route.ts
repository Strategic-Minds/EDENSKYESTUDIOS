import { decideBlackCardEntitlement, normalizeCommerceEvent, isShopifyWebhookSigned } from "../../../../lib/commerce/black-card.mjs";
import { persistBlackCardEntitlement } from "../../../../lib/commerce/supabase-entitlements.mjs";

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
    return Response.json({ ok: false, reason: "unsigned_or_invalid_payload" }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }

  const event = normalizeCommerceEvent(json?.event ?? json?.financial_status ?? json?.status);
  if (!event) {
    return Response.json({ ok: false, reason: "unsupported_shopify_event" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  const decision = decideBlackCardEntitlement(event);
  const persistence = await persistBlackCardEntitlement({ event, payload: json || {}, decision });

  return Response.json(
    {
      ok: true,
      signed: true,
      productionMode: true,
      ...decision,
      persistence
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function GET() {
  return Response.json(
    {
      ok: true,
      route: "/api/shopify/webhook",
      productionMode: true,
      accepts: ["paid", "failed", "cancelled", "refund"],
      grants: "paid -> black_card_member",
      revokes: "refund -> revoked entitlement",
      requires: ["SHOPIFY_WEBHOOK_SECRET", "SUPABASE_SERVICE_ROLE_KEY"]
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
