import { existsSync, readFileSync } from "node:fs";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function read(path) {
  assert(existsSync(path), `Missing required file: ${path}`);
  return readFileSync(path, "utf8");
}

const page = read("app/admin/commerce-sources/page.tsx");
const api = read("app/api/admin/eden/commerce-sources/route.ts");
const config = JSON.parse(read("config/eden-shopify-xyla-commerce-source-batch-001.json"));

const requiredFiles = [
  "eden-commerce-001_female-models-collection-hero_16x9_v1.png",
  "eden-commerce-002_male-models-collection-hero_16x9_v1.png",
  "eden-commerce-003_faceless-content-collection-hero_16x9_v1.png",
  "eden-commerce-004_black-card-product-hero_4x5_v1.png",
  "eden-commerce-005_xyla-ai-automation-product-hero_4x5_v1.png",
  "eden-commerce-006_ai-video-creation-product-hero_4x5_v1.png",
  "eden-commerce-007_social-posting-system-product-hero_4x5_v1.png",
  "eden-commerce-008_model-campaign-packet-product-hero_4x5_v1.png",
  "eden-commerce-009_closet-content-pack-product-hero_4x5_v1.png",
  "eden-commerce-010_faceless-video-background_neon-studio_9x16_v1.png",
  "eden-commerce-011_faceless-video-background_content-console_9x16_v1.png",
  "eden-commerce-012_faceless-content-product-card_4x5_v1.png"
];

assert(page.includes("EDEN COMMERCE SOURCES"), "Commerce source admin page must identify the review lane.");
assert(page.includes("black-command-center"), "Commerce source admin page must use the black command-center theme.");
assert(page.includes("approved_bulk_draft"), "Commerce source admin page must show bulk draft approval.");
assert(page.includes("live mutation locked"), "Commerce source admin page must keep live mutation locked.");
assert(page.includes("standalone_generated_no_collage_crop"), "Commerce source admin page must forbid collage crops.");
assert(api.includes("EDEN SHOPIFY XYLA COMMERCE SOURCES"), "Commerce source API must expose the registry identity.");
assert(api.includes("approved_bulk_draft"), "Commerce source API must expose bulk approval state.");
assert(api.includes("PENDING_DRIVE_UPLOAD"), "Commerce source API must mark Drive IDs pending until verified.");
assert(api.includes("shopify_live_allowed: false"), "Commerce source API must block live Shopify by default.");
assert(api.includes("xyla_public_posting_allowed: false"), "Commerce source API must block public Xyla/social posting by default.");
assert(config.count === 12, "Commerce source config must register exactly 12 assets.");
assert(config.current_state === "approved_bulk_draft", "Commerce batch must be marked approved for draft use.");
assert(config.approval_policy.shopify_live_allowed === false, "Config must block live Shopify by default.");
assert(config.approval_policy.xyla_public_posting_allowed === false, "Config must block public Xyla posting by default.");
assert(config.approval_policy.human_gate_required_for_live_actions === true, "Config must require human approval for live actions.");
assert(config.files.some((file) => file.status === "approved_heygen_packet"), "At least one asset must be approved for HeyGen packet use.");
assert(config.files.some((file) => file.status === "approved_social_draft"), "At least one asset must be approved for social draft use.");
assert(config.files.some((file) => file.status === "approved_shopify_draft"), "At least one asset must be approved for Shopify draft use.");

for (const filename of requiredFiles) {
  assert(page.includes(filename), `Commerce source page missing ${filename}`);
  assert(api.includes(filename), `Commerce source API missing ${filename}`);
  assert(config.files.some((file) => file.filename === filename), `Commerce source config missing ${filename}`);
}

console.log("Eden commerce source batch is bulk-approved for draft use and live actions remain gated.");
