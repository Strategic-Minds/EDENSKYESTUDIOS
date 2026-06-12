import { existsSync, readFileSync } from "node:fs";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function read(path) {
  assert(existsSync(path), `Missing required file: ${path}`);
  return readFileSync(path, "utf8");
}

const modelIndex = read("app/models/page.tsx");
const modelProfile = read("app/models/[slug]/page.tsx");
const modelPortfolio = read("app/models/[slug]/portfolio/page.tsx");
const shopifyPage = read("app/shopify/page.tsx");
const header = read("app/components.tsx");
const pageRegistry = read("config/eden-full-site-page-registry.json");
const evidenceRoute = read("app/api/admin/eden/evidence/route.ts");

assert(modelIndex.includes("Model Portfolio Index"), "Models index must present a portfolio entry surface.");
assert(modelProfile.includes("Portfolio Gallery"), "Model profile must include portfolio gallery.");
assert(modelProfile.includes("Campaign Strengths"), "Model profile must include campaign strengths.");
assert(modelProfile.includes("Measurements / Details"), "Model profile must include measurements/details.");
assert(modelProfile.includes("Open Portfolio"), "Model profile must link to dedicated portfolio route.");
assert(modelPortfolio.includes("Portfolio System"), "Dedicated model portfolio route must exist and describe portfolio system.");
assert(modelPortfolio.includes("Gallery Source Set"), "Dedicated model portfolio route must include gallery source set.");
assert(modelPortfolio.includes("Shopify"), "Dedicated model portfolio route must connect to Shopify/Black Card path.");

assert(shopifyPage.includes("Shopify Black Card Control Page"), "Shopify page must be the Black Card control page.");
assert(shopifyPage.includes("Draft/test product spec"), "Shopify page must keep product spec draft/test mode.");
assert(shopifyPage.includes("Live payment") && shopifyPage.includes("Locked"), "Shopify page must show live payment locked.");
assert(shopifyPage.includes("no live Shopify" ) || shopifyPage.includes("no live Shopify product/payment"), "Shopify page must state live Shopify mutation is blocked.");
assert(header.includes("/shopify"), "Header must expose the Shopify/Black Card page.");
assert(pageRegistry.includes("/shopify"), "Full-site page registry must require /shopify.");
assert(pageRegistry.includes("/models/[slug]/portfolio"), "Full-site page registry must require model portfolio route.");
assert(evidenceRoute.includes("/shopify"), "Evidence route must include /shopify screenshot target.");
assert(evidenceRoute.includes("/models/alexis-voss/portfolio"), "Evidence route must include model portfolio screenshot target.");

console.log("Eden model portfolio and Shopify Black Card page surfaces are installed and gated.");
