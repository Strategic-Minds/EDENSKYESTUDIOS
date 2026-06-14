import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");

const manifest = JSON.parse(read("config/eden-closet-pwa-manifest.json"));
const data = read("app/closet/closet-data.ts");
const closetHome = read("app/closet/page.tsx");
const profile = read("app/closet/[slug]/page.tsx");
const viewer = read("app/closet/[slug]/viewer/page.tsx");
const chat = read("app/closet/[slug]/chat/page.tsx");
const video = read("app/closet/[slug]/video/page.tsx");
const accessApi = read("app/api/closet/access/route.ts");

assert.equal(manifest.system, "Eden's Closet PWA");
assert.equal(manifest.commerceHandoff.livePaymentActivation, false);
assert.equal(manifest.authAndEntitlement.entitlementProvider, "Shopify Black Card");
assert.equal(manifest.sourceTruth.pwaReferenceBoard.usage, "layout_reference_only");
assert.match(manifest.sourceTruth.pwaReferenceBoard.rule, /Do not crop/);

assert.match(data, /eden-closet-neon-walkin-approved-bg\.png/);
assert.match(data, /black_card_required/);
assert.match(data, /layout_reference_only/);
assert.doesNotMatch(data, /crop/i);

for (const [name, source] of Object.entries({ closetHome, profile, viewer, chat, video })) {
  assert.match(source, /approvedClosetBackground|closetAccess|primaryClosetModel/, `${name} must use the Closet source truth`);
  assert.match(source, /payment|Black Card|entitlement|gated/i, `${name} must preserve member gating`);
}

assert.match(viewer, /Full Experience Viewer/);
assert.match(chat, /AI Text \+ Voice Chat/);
assert.match(video, /AI Video Chat/);
assert.match(accessApi, /liveEntitlementMutation: false/);
assert.match(accessApi, /Supabase/);
assert.match(accessApi, /Shopify Black Card/);

console.log("Eden Closet PWA source truth, protected gates, and member routes are installed.");
