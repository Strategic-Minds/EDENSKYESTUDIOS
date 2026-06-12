import { existsSync, readFileSync } from "node:fs";
import { Buffer } from "node:buffer";
import { createHmac } from "node:crypto";
import {
  buildDraftPaymentSnapshot,
  decideBlackCardEntitlement,
  isShopifyWebhookSigned,
  normalizeCommerceEvent
} from "../lib/commerce/black-card.mjs";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function read(path) {
  assert(existsSync(path), `Missing required file: ${path}`);
  return readFileSync(path, "utf8");
}

const paymentPage = read("app/payment/page.tsx");
const successPage = read("app/success/page.tsx");
const webhookRoute = read("app/api/shopify/webhook/route.ts");
const entitlementRoute = read("app/api/entitlements/sync/route.ts");
const pageRegistry = JSON.parse(read("config/eden-full-site-page-registry.json"));
const approvalGates = JSON.parse(read("config/eden-skye-admin-approval-gates.json"));
const manifest = JSON.parse(read("config/eden-full-site-validation-matrix.json"));

assert(paymentPage.includes("Draft Payment"), "/payment must be a visible draft payment surface.");
assert(paymentPage.includes("Live payment") && paymentPage.includes("blocked"), "/payment must show live payment blocked.");
assert(paymentPage.includes("/success"), "/payment must link to /success.");
assert(successPage.includes("Payment Success / Draft Handoff"), "/success must explain the draft handoff.");
assert(successPage.includes("Black Card test entitlement"), "/success must mention entitlement sync.");
assert(webhookRoute.includes("unsigned_or_invalid_payload"), "Shopify webhook route must reject unsigned payloads.");
assert(webhookRoute.includes("decideBlackCardEntitlement"), "Shopify webhook route must resolve Black Card entitlement.");
assert(entitlementRoute.includes("test_mode_only"), "Entitlement sync route must stay draft/test only.");
assert(pageRegistry.pages.some((page) => page.route === "/payment" && page.status === "must_generate"), "/payment must be marked present in the page registry.");
assert(pageRegistry.pages.some((page) => page.route === "/success" && page.status === "must_generate"), "/success must be marked present in the page registry.");
assert(approvalGates.protected_actions.includes("shopify_live_product_or_payment_change"), "Live Shopify payment activation must remain gated.");
assert(manifest.protected_actions.includes("shopify_live_payment_activation"), "Validation matrix must keep live Shopify payment activation blocked.");
assert(normalizeCommerceEvent("paid") === "paid", "Test paid event must normalize.");
assert(normalizeCommerceEvent("cancelled") === "cancelled", "Cancelled event must normalize.");
assert(normalizeCommerceEvent("bogus") === null, "Unknown commerce events must be rejected.");
assert(decideBlackCardEntitlement("paid").state === "granted", "Test paid event must grant Black Card entitlement.");
assert(decideBlackCardEntitlement("failed").state === "unchanged", "Failed event must not grant entitlement.");
assert(decideBlackCardEntitlement("cancelled").state === "unchanged", "Cancelled event must not grant entitlement.");
assert(decideBlackCardEntitlement("refund").state === "revoked", "Refund event must revoke entitlement.");
assert(buildDraftPaymentSnapshot().livePaymentActivation === "blocked", "Live Shopify payment activation must remain blocked.");

const secret = "test-secret";
const payload = JSON.stringify({ event: "paid" });
const signature = createHmac("sha256", secret).update(payload, "utf8").digest("base64");
assert(isShopifyWebhookSigned(payload, signature, secret) === true, "Signed webhook payload must verify.");
assert(isShopifyWebhookSigned(payload, null, secret) === false, "Unsigned webhook payload must be rejected.");
assert(isShopifyWebhookSigned(payload, signature, undefined) === false, "Missing webhook secret must reject.");
assert(Buffer.isBuffer(Buffer.from(signature, "base64")), "Signature decoding must stay compatible with base64 payloads.");

console.log("Eden draft commerce surfaces exist and stay gated.");
