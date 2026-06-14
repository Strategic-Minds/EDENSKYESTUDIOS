import manifest from "../../../../config/eden-closet-v2-ultralifelike-pwa.json";

export async function GET(request: Request) {
  const entitlementHeader = request.headers.get("x-eden-entitlement");
  const hasBlackCard = entitlementHeader === manifest.memberEntitlement;

  return Response.json({
    ok: true,
    route: manifest.publicRoute,
    requiredEntitlement: manifest.memberEntitlement,
    access: hasBlackCard ? "member_unlocked" : "preview_locked",
    checkoutReturn: manifest.shopifyAfterPaymentTarget,
    features: {
      closet: hasBlackCard,
      fullBody360Viewer: hasBlackCard,
      aiChat: hasBlackCard,
      voiceChat: hasBlackCard,
      videoChat: hasBlackCard
    },
    providerActivation: {
      liveVoice: false,
      liveVideo: false,
      true3dAvatar: false
    }
  });
}
