import { existsSync, readFileSync } from "node:fs";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function read(path) {
  assert(existsSync(path), `Missing required file: ${path}`);
  return readFileSync(path, "utf8");
}

const config = JSON.parse(read("config/eden-source-expansion-batch-002.json"));
const api = read("app/api/admin/eden/source-expansion/route.ts");
const page = read("app/admin/source-expansion/page.tsx");

const required = [
  "eden-source-expansion-001_female-model-service-product_4x5_v1.png",
  "eden-source-expansion-002_male-model-service-product_4x5_v1.png",
  "eden-source-expansion-003_faceless-content-studio-product_4x5_v1.png",
  "eden-source-expansion-004_faceless-vertical-neon-suite_9x16_v1.png",
  "eden-source-expansion-005_heygen-presenter-halfbody-female_9x16_v1.png",
  "eden-source-expansion-006_heygen-presenter-halfbody-male_9x16_v1.png",
  "eden-source-expansion-007_closet-luxury-wardrobe-product_4x5_v1.png",
  "eden-source-expansion-008_closet-environment-neon-walkin_16x9_v1.png",
  "eden-source-expansion-009_investor-demo-home-hero_16x9_v1.png",
  "eden-source-expansion-010_launch-social-vertical-blackcard_9x16_v1.png"
];

assert(config.batch_id === "ES-SOURCE-EXPANSION-2026-06-12-002", "Source expansion batch id must remain locked.");
assert(config.generated_source_count === 10, "Source expansion batch must register 10 assets.");
assert(config.status === "generated_pending_admin_review", "New source expansion batch must start pending admin review.");
assert(config.approval_policy.public_use_allowed === false, "Public use must be blocked by default.");
assert(config.approval_policy.shopify_live_allowed === false, "Live Shopify must be blocked by default.");
assert(config.approval_policy.xyla_public_posting_allowed === false, "Public Xyla/social posting must be blocked by default.");
assert(config.approval_policy.heygen_final_allowed === false, "Final HeyGen activation must be blocked by default.");
assert(page.includes("black-command-center"), "Source expansion admin page must use black admin styling.");
assert(page.includes("generated_pending_admin_review"), "Source expansion page must show pending approval state.");
assert(api.includes("EDEN SOURCE EXPANSION BATCH 002"), "Source expansion API must expose registry identity.");
assert(api.includes("PENDING_DRIVE_UPLOAD"), "Source expansion API must keep Drive IDs pending until verified.");
assert(api.includes("standalone_generated_no_collage_crop"), "Source expansion API must forbid collage crops.");

for (const filename of required) {
  assert(page.includes(filename), `Source expansion page missing ${filename}`);
  assert(api.includes(filename), `Source expansion API missing ${filename}`);
  assert(config.files.some((file) => file.filename === filename), `Source expansion config missing ${filename}`);
}

console.log("Eden source expansion batch 002 is registered, pending approval, and live actions remain gated.");
