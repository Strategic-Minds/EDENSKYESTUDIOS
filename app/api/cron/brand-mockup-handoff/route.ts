import { NextResponse } from "next/server";
import { persistToolReceipt } from "../../../../lib/receipt-persistence";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const handoff = {
  packet_id: "brand-mockup-handoff-20260605",
  brand: "Eden Skye Studios",
  implemented_assets: [
    "/brand/mockups/storefront-home-reference.svg",
    "/brand/mockups/brand-lock-reference.svg",
    "/brand/mockups/black-card-commerce-reference.svg",
    "/brand/creators/eden-skye.svg",
    "/brand/creators/solara-vane.svg",
    "/brand/creators/liora-vale.svg",
    "/brand/creators/nova-rain.svg",
    "/brand/creators/celeste-noir.svg"
  ],
  implemented_surfaces: [
    "/",
    "/admin/eden",
    "/manifest.webmanifest",
    "/api/cron/brand-mockup-handoff",
    "/api/cron/bridge-queue-worker"
  ],
  source_of_truth: {
    drive: "Eden Skye brand lock, storefront mockup, Black Card commerce mockup",
    git: "Strategic-Minds/EDENSKYESTUDIOS",
    branch: "eden/readiness-scaffold-20260604"
  },
  cron: {
    sandbox_handoff: "/api/cron/brand-mockup-handoff",
    bridge_worker: "/api/cron/bridge-queue-worker",
    schedule: "*/5 * * * *"
  }
};

function cronAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!cronAuthorized(request)) {
    return NextResponse.json({ status: "LOCKED", reason: "Invalid cron secret" }, { status: 401 });
  }

  const receipt = {
    receipt_id: `${handoff.packet_id}-${new Date().toISOString().slice(0, 10)}`,
    tool_name: "vercel_cron_brand_mockup_handoff",
    action_type: "sandbox_brand_mockup_validation",
    status: "BRAND_MOCKUP_HANDOFF_READY",
    payload: {
      ...handoff,
      checked_at: new Date().toISOString(),
      live_mutations_enabled: false,
      public_publish_allowed: false,
      next_worker: "/api/cron/bridge-queue-worker"
    }
  };

  const persistence = await persistToolReceipt(receipt);

  return NextResponse.json(
    {
      status: "BRAND_MOCKUP_HANDOFF_READY",
      activation_status: "SANDBOX_ONLY",
      cron_name: "brand-mockup-handoff",
      live_mutations_enabled: false,
      public_publish_allowed: false,
      receipt,
      persistence
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
