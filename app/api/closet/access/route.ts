import { NextResponse } from "next/server";
import { getBlackCardAccess, getSupabaseRuntimeStatus } from "../../../../lib/commerce/supabase-entitlements.mjs";

export const dynamic = "force-dynamic";

const protectedActions = [
  "ai_text_chat",
  "voice_chat",
  "ai_video_chat",
  "private_gallery",
  "saved_favorites",
  "closet_session_sync",
  "member_media_export"
];

export async function GET(request: Request) {
  const access = await getBlackCardAccess(request.headers.get("authorization"));
  const runtime = getSupabaseRuntimeStatus();
  const shopifyConfigured = Boolean(process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "edenskyestudios.com");

  return NextResponse.json({
    ok: true,
    system: "Eden's Closet PWA",
    authProvider: "Supabase",
    commerceProvider: "Shopify Black Card",
    requiredEntitlement: "black_card_member",
    state: access.state,
    authenticated: access.authenticated,
    entitled: access.entitled,
    supabaseConfigured: runtime.urlConfigured && runtime.publishableKeyConfigured,
    supabaseServiceRoleConfigured: runtime.serviceRoleConfigured,
    shopifyConfigured,
    productionEntitlementCheck: true,
    liveEntitlementMutation: runtime.serviceRoleConfigured,
    protectedActions,
    publicStorefrontPaymentPath: "https://edenskyestudios.com/pages/payment",
    vercelPaymentPath: "/payment",
    successHandoffPath: "/success",
    dashboardPath: "/dashboard",
    closetEntryPath: "/closet",
    user: access.user || null,
    entitlementRecord: access.entitlementRecord || null,
    notes: [
      "Authenticated Supabase users with an active black_card_member row are granted Closet access.",
      "Voice chat, AI video chat, favorites, and private galleries require a verified Black Card entitlement.",
      "Shopify remains the storefront/payment layer; Vercel hosts the protected PWA member experience."
    ]
  }, { headers: { "Cache-Control": "no-store" } });
}
