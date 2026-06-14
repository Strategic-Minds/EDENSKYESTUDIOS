import { decideBlackCardEntitlement, normalizeCommerceEvent } from "../../../../lib/commerce/black-card.mjs";
import { getBlackCardAccess, persistBlackCardEntitlement } from "../../../../lib/commerce/supabase-entitlements.mjs";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const event = normalizeCommerceEvent(body?.event ?? body?.payment_status ?? body?.status);

  if (!event) {
    return Response.json({ ok: false, reason: "missing_or_invalid_event" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  const decision = decideBlackCardEntitlement(event);
  const persistence = await persistBlackCardEntitlement({ event, payload: body, decision });

  return Response.json(
    {
      ok: true,
      productionMode: true,
      source: "black_card_entitlement_sync",
      event,
      entitlement: decision.entitlement,
      state: decision.state,
      persistence
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function GET(request: Request) {
  const access = await getBlackCardAccess(request.headers.get("authorization"));
  return Response.json(
    {
      ok: true,
      route: "/api/entitlements/sync",
      productionMode: true,
      source: "supabase_black_card_entitlements",
      access
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
