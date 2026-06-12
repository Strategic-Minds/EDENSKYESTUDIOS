import { existsSync, readFileSync } from "node:fs";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function read(path) {
  assert(existsSync(path), `Missing required file: ${path}`);
  return readFileSync(path, "utf8");
}

const shopifyPage = read("app/shopify/page.tsx");
const pageRegistry = JSON.parse(read("config/eden-full-site-page-registry.json"));

assert(shopifyPage.includes("Shopify."), "/shopify must follow the home-page heading flow.");
assert(shopifyPage.includes("Models."), "/shopify must include model flow in the hero.");
assert(shopifyPage.includes("Faceless."), "/shopify must include faceless flow in the hero.");
assert(shopifyPage.includes("/models"), "/shopify must link to model pages.");
assert(shopifyPage.includes("/faceless"), "/shopify must link to faceless pages.");
assert(shopifyPage.includes("/closet"), "/shopify must link to closet flows.");
assert(shopifyPage.includes("/payment"), "/shopify must link to payment.");
assert(shopifyPage.includes("Black Card"), "/shopify must include product flow.");
assert(pageRegistry.pages.some((page) => page.route === "/shopify"), "/shopify must remain in the route registry.");

console.log("Eden Shopify flow matches the home-page commerce hub structure.");
