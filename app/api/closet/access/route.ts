import { NextResponse } from "next/server";

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

export async function GET() {
  const supabaseConfigured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const shopifyConfigured = Boolean(process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN);

  return NextResponse.json({
    ok: true,
    system: "Eden's Closet PWA",
    authProvider: "Supabase",
    commerceProvider: "Shopify Black Card",
    requiredEntitlement: "black_card_member",
    state: "gated_preview_until_live_entitlement_verified",
    supabaseConfigured,
    shopifyConfigured,
    liveEntitlementMutation: false,
    protectedActions,
    publicStorefrontPaymentPath: "/pages/payment",
    vercelPaymentPath: "/payment",
    successHandoffPath: "/success",
    closetEntryPath: "/closet",
    notes: [
      "This route reports gate readiness only; it does not grant live access.",
      "Voice chat, AI video chat, favorites, and private galleries require a verified Black Card entitlement.",
      "Shopify remains the storefront/payment layer; Vercel hosts the protected PWA member experience."
    ]
  });
}
