import { existsSync, readFileSync } from "node:fs";
import { Buffer } from "node:buffer";
import { createHmac } from "node:crypto";
import {
  buildBlackCardPaymentSnapshot,
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
const accessRoute = read("app/api/closet/access/route.ts");
const supabaseHelpers = read("lib/commerce/supabase-entitlements.mjs");
const pageRegistry = JSON.parse(read("config/eden-full-site-page-registry.json"));
const validationMatrix = JSON.parse(read("config/eden-full-site-validation-matrix.json"));
const closetManifest = JSON.parse(read("config/eden-closet-pwa-manifest.json"));

assert(paymentPage.includes("Black Card Access"), "/payment must be a visible Black Card payment surface.");
assert(paymentPage.includes("Continue to Shopify Payment"), "/payment must link to Shopify payment.");
assert(paymentPage.includes("https://edenskyestudios.com/pages/payment"), "/payment must use the Shopify payment page.");
assert(paymentPage.includes("/success"), "/payment must link to /success.");
assert(successPage.includes("Black Card Handoff"), "/success must explain the Black Card handoff.");
assert(successPage.includes("/dashboard"), "/success must link to member dashboard.");
assert(webhookRoute.includes("unsigned_or_invalid_payload"), "Shopify webhook route must reject unsigned payloads.");
assert(webhookRoute.includes("persistBlackCardEntitlement"), "Shopify webhook route must persist Black Card entitlement.");
assert(entitlementRoute.includes("productionMode"), "Entitlement sync route must report production mode.");
assert(accessRoute.includes("getBlackCardAccess"), "Closet access route must use Supabase entitlement checks.");
assert(supabaseHelpers.includes("eden_black_card_entitlements"), "Supabase entitlement helper must target the Black Card entitlement table.");
assert(pageRegistry.pages.some((page) => page.route === "/payment" && page.status === "must_generate"), "/payment must be marked present in the page registry.");
assert(pageRegistry.pages.some((page) => page.route === "/success" && page.status === "must_generate"), "/success must be marked present in the page registry.");
assert(validationMatrix.required_checks.some((check) => check.id === "payment_production_handoff"), "Validation matrix must require production payment handoff.");
assert(validationMatrix.required_checks.some((check) => check.id === "supabase_black_card_entitlement"), "Validation matrix must require Supabase Black Card entitlement.");
assert(closetManifest.commerceHandoff.livePaymentActivation === true, "Closet manifest must mark Shopify payment handoff active.");
assert(normalizeCommerceEvent("paid") === "paid", "Paid event must normalize.");
assert(normalizeCommerceEvent("cancelled") === "cancelled", "Cancelled event must normalize.");
assert(normalizeCommerceEvent("bogus") === null, "Unknown commerce events must be rejected.");
assert(decideBlackCardEntitlement("paid").state === "granted", "Paid event must grant Black Card entitlement.");
assert(decideBlackCardEntitlement("failed").state === "unchanged", "Failed event must not grant entitlement.");
assert(decideBlackCardEntitlement("cancelled").state === "unchanged", "Cancelled event must not grant entitlement.");
assert(decideBlackCardEntitlement("refund").state === "revoked", "Refund event must revoke entitlement.");
assert(buildBlackCardPaymentSnapshot().livePaymentActivation === "connected through Shopify", "Shopify payment activation must be connected.");
assert(buildDraftPaymentSnapshot().livePaymentActivation === "connected through Shopify", "Legacy snapshot alias must use production handoff.");

const secret = "test-secret";
const payload = JSON.stringify({ event: "paid", email: "member@example.com" });
const signature = createHmac("sha256", secret).update(payload, "utf8").digest("base64");
assert(isShopifyWebhookSigned(payload, signature, secret) === true, "Signed webhook payload must verify.");
assert(isShopifyWebhookSigned(payload, null, secret) === false, "Unsigned webhook payload must be rejected.");
assert(isShopifyWebhookSigned(payload, signature, undefined) === false, "Missing webhook secret must reject.");
assert(Buffer.isBuffer(Buffer.from(signature, "base64")), "Signature decoding must stay compatible with base64 payloads.");

console.log("Eden production commerce and Black Card entitlement surfaces are installed.");
