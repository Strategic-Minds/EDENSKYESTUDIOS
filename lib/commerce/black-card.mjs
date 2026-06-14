import { createHmac, timingSafeEqual } from "node:crypto";

export function normalizeCommerceEvent(value) {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase();
  if (normalized === "paid" || normalized === "failed" || normalized === "cancelled" || normalized === "refund") {
    return normalized;
  }
  return null;
}

export function decideBlackCardEntitlement(event) {
  if (event === "paid") {
    return { event, state: "granted", entitlement: "Black Card", productionMode: true };
  }

  if (event === "refund") {
    return { event, state: "revoked", entitlement: "Black Card", productionMode: true };
  }

  return { event, state: "unchanged", entitlement: "Black Card", productionMode: true };
}

export function isShopifyWebhookSigned(payload, signature, secret) {
  if (!signature || !secret) return false;
  const expected = createHmac("sha256", secret).update(payload, "utf8").digest();
  let provided;
  try {
    provided = Buffer.from(signature, "base64");
  } catch {
    return false;
  }
  return expected.length === provided.length && timingSafeEqual(expected, provided);
}

export function buildDraftPaymentSnapshot() {
  return buildBlackCardPaymentSnapshot();
}

export function buildBlackCardPaymentSnapshot() {
  return {
    product: "Eden Skye Black Card",
    amount: "$199.00",
    environment: "production Shopify payment handoff",
    livePaymentActivation: "connected through Shopify",
    checkout: "https://edenskyestudios.com/pages/payment",
    success: "/success",
    dashboard: "/dashboard",
    closet: "/closet"
  };
}
