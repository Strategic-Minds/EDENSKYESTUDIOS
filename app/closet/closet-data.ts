import { environmentAssets, models, standaloneAssets } from "../visual-source-truth";

export const approvedClosetBackground = {
  id: "eden-closet-neon-walkin-approved-bg",
  label: "Approved Eden's Closet neon walk-in wardrobe background",
  src: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-neon-walkin-approved-bg.png?v=1781424263",
  source: "Uploaded user_files/01-ChatGPT-Image-Jun-11-2026-01_03_28-PM-4-.png and hosted on Shopify CDN for Vercel PWA use",
  allowedUse: ["closet.home.background", "closet.viewer.background", "closet.profile.hero"]
} as const;

export const closetUiReference = {
  id: "eden-closet-full-pwa-reference-board",
  label: "Approved Eden's Closet full PWA reference board",
  source: "Uploaded user_files/02-ChatGPT-Image-Jun-11-2026-12_20_42-AM.png",
  allowedUse: ["layout_reference_only"],
  rule: "Do not crop this board into model or UI assets; use it as the target layout reference."
} as const;

export const closetAccess = {
  mode: "black_card_required",
  authProvider: "Supabase",
  commerceProvider: "Shopify Black Card",
  entitlement: "black_card_member",
  currentState: "gated_preview_until_live_entitlement_verified",
  protectedRoutes: ["/closet", "/closet/[slug]", "/closet/[slug]/viewer", "/closet/[slug]/chat", "/closet/[slug]/video", "/dashboard"],
  publicEntryRoutes: ["/payment", "/success", "/shopify"],
  protectedActions: ["live video session", "voice conversation", "private gallery unlock", "saved favorites sync"]
} as const;

export const closetModels = models.map((model, index) => ({
  ...model,
  online: index === 2,
  status: index === 2 ? "Online now" : "Available for Black Card members",
  bio:
    index === 2
      ? "Confident, bold, and cinematic. Alexis anchors the Eden's Closet experience with premium wardrobe looks, private media, AI chat, and video-call styling sessions."
      : "Premium Eden Skye model profile with wardrobe-safe looks, private media previews, and Black Card member access.",
  tags: ["Private gallery", "Wardrobe", "AI chat", "Video call"],
  measurements: { height: "5'7\"", bust: "34C", waist: "24\"", hips: "36\"" }
}));

export const primaryClosetModel = closetModels.find((model) => model.slug === "alexis-voss") || closetModels[0];

export const outfitCategories = ["All outfits", "Lingerie", "Swimwear", "Casual", "Evening", "Athleisure", "Fantasy", "Accessories"];

export const outfitOptions = [
  { name: "Black lingerie set", category: "Lingerie", mood: "Signature", image: standaloneAssets.closetFullBody.src },
  { name: "Red lace set", category: "Lingerie", mood: "Premium", image: standaloneAssets.alexisVoss.src },
  { name: "White bikini", category: "Swimwear", mood: "Resort", image: standaloneAssets.siennaCole.src },
  { name: "Black evening look", category: "Evening", mood: "Noir", image: standaloneAssets.homeHero.src },
  { name: "Sports bra set", category: "Athleisure", mood: "Studio", image: standaloneAssets.lunaMoretti.src }
];

export const closetEnvironments = [
  { key: "walk-in-closet", label: "Walk-in closet", src: approvedClosetBackground.src, tag: "Approved" },
  ...environmentAssets.map((asset) => ({ ...asset, tag: "Scene" }))
];

export const voiceModes = ["Natural", "Flirty", "Playful", "Calm", "Deep"];
export const videoQualities = ["720p", "1080p", "High"];
