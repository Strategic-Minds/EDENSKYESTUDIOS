import { existsSync, readFileSync } from "node:fs";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function read(path) {
  assert(existsSync(path), `Missing required file: ${path}`);
  return readFileSync(path, "utf8");
}

const roster = JSON.parse(read("config/eden-shopify-launch-roster.json"));
const home = read("app/page.tsx");
const shopify = read("app/shopify/page.tsx");
const glam = JSON.parse(read("config/eden-glam-editorial-batch-003.json"));

assert(roster.branch === "eden/shopify-launch-20260612", "Launch roster must target the Shopify launch branch.");
assert(roster.women.length >= 10, "Homepage/Shopify launch must provide at least 10 female models.");
assert(roster.men.length >= 5, "Homepage/Shopify launch must provide at least 5 male models.");
assert(home.includes("10 female models") || home.includes("10+"), "Home page must advertise 10 female choices.");
assert(home.includes("5 male") || home.includes("5<small>Men"), "Home page must advertise 5 male choices.");
assert(shopify.includes("10<small>Women"), "Shopify page must show 10 women.");
assert(shopify.includes("5<small>Men"), "Shopify page must show 5 men.");
assert(shopify.includes("SHOPIFY_LIVE_PENDING_FINAL_APPROVAL"), "Shopify page must keep final live approval gate visible.");
assert(shopify.includes("Live Shopify product/payment/theme/discount/inventory mutation remains locked"), "Shopify live writes must remain locked.");
assert(glam.status === "approved_bulk_draft", "Glam editorial batch must be approved for draft launch use.");
assert(glam.approval_policy.shopify_live_allowed === false, "Glam batch must not allow live Shopify by default.");
assert(roster.protected_actions.includes("payment activation"), "Launch roster must preserve payment activation gate.");

console.log("Eden Shopify launch branch has 10 female models, 5 male models, approved glam draft assets, and live gates locked.");
