import { existsSync, readFileSync } from "node:fs";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function read(path) {
  assert(existsSync(path), `Missing required file: ${path}`);
  return readFileSync(path, "utf8");
}

const shopifyPage = read("app/shopify/page.tsx");
const manifest = JSON.parse(read("config/eden-shopify-xyla-automation-manifest.json"));
const approvalGates = JSON.parse(read("config/eden-skye-admin-approval-gates.json"));
const pageRegistry = JSON.parse(read("config/eden-full-site-page-registry.json"));
const doc = read("docs/EDEN_SHOPIFY_XYLA_AUTOMATION_HANDOFF.md");
const webhookRoute = read("app/api/shopify/webhook/route.ts");
const paymentPage = read("app/payment/page.tsx");

assert(shopifyPage.includes("Xyla AI Shopify Automation"), "/shopify must include Xyla automation language.");
assert(shopifyPage.includes("Male model catalog"), "/shopify must include male model catalog language.");
assert(shopifyPage.includes("REQUIRED_SOURCE_PENDING"), "/shopify must mark missing male roster as REQUIRED_SOURCE_PENDING.");
assert(shopifyPage.includes("no live Shopify product/payment/theme/discount/inventory mutation"), "/shopify must keep live mutation blocked.");
assert(manifest.route === "/shopify", "Xyla automation manifest must target /shopify.");
assert(manifest.live_shopify_write_enabled === false, "Live Shopify mutation must be disabled by default.");
assert(manifest.live_payment_activation_enabled === false, "Live payment activation must be disabled by default.");
assert(manifest.male_model_roster.status === "REQUIRED_SOURCE_PENDING", "Male model roster must remain source-pending unless verified.");
assert(approvalGates.protected_actions.includes("shopify_live_product_or_payment_change"), "Approval gates must be present.");
assert(pageRegistry.pages.some((page) => page.route === "/shopify" && page.required === true), "/shopify must stay required in the page registry.");
assert(doc.includes("Xyla may not"), "Xyla handoff doc must explain publishing and live-write prohibitions.");
assert(webhookRoute.includes("unsigned_or_invalid_payload"), "Unsigned Shopify webhook payloads must still be rejected.");
assert(paymentPage.includes("Draft Payment"), "Black Card payment must stay draft/test only.");

console.log("Eden Shopify/Xyla commerce surface is locked and draft-safe.");
