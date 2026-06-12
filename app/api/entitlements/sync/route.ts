import { decideBlackCardEntitlement, normalizeCommerceEvent } from "../../../../lib/commerce/black-card.mjs";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const event = normalizeCommerceEvent(body?.event ?? body?.payment_status ?? body?.status);

  if (!event) {
    return Response.json({ ok: false, draftOnly: true, reason: "missing_or_invalid_event" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  const decision = decideBlackCardEntitlement(event);
  return Response.json(
    {
      ok: true,
      draftOnly: true,
      source: "test_mode_entitlement_sync",
      event,
      entitlement: decision.entitlement,
      state: decision.state
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function GET() {
  return Response.json({ ok: true, route: "/api/entitlements/sync", draftOnly: true, source: "test_mode_only", liveActivationBlocked: true }, { headers: { "Cache-Control": "no-store" } });
}
