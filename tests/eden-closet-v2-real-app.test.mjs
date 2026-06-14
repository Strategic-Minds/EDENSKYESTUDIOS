import assert from "node:assert/strict";
import fs from "node:fs";

const requiredFiles = [
  "app/closet-v2/page.tsx",
  "app/closet-v2/ClosetV2RealApp.tsx",
  "app/closet-v2/closet-v2-real.css",
  "app/closet-v2/models/page.tsx",
  "app/closet-v2/models/[slug]/page.tsx",
  "app/closet-v2/closet/page.tsx",
  "app/closet-v2/environments/page.tsx",
  "app/closet-v2/viewer/page.tsx",
  "app/closet-v2/chat/page.tsx",
  "app/closet-v2/video/page.tsx",
  "app/closet-v2/dashboard/page.tsx",
  "config/eden-closet-generator-page-assets.json"
];

for (const file of requiredFiles) {
  assert.ok(fs.existsSync(file), `${file} must exist for the real Eden's Closet PWA`);
}

const appSource = fs.readFileSync("app/closet-v2/ClosetV2RealApp.tsx", "utf8");
const homeSource = fs.readFileSync("app/closet-v2/page.tsx", "utf8");
const cssSource = fs.readFileSync("app/closet-v2/closet-v2-real.css", "utf8");
const pageAssetManifest = JSON.parse(fs.readFileSync("config/eden-closet-generator-page-assets.json", "utf8"));

assert.equal(pageAssetManifest.pages.length, 9, "generator page asset manifest must cover nine PWA pages");

for (const route of [
  "/closet-v2/models",
  "/closet-v2/models/alexis-voss",
  "/closet-v2/closet",
  "/closet-v2/environments",
  "/closet-v2/viewer",
  "/closet-v2/chat",
  "/closet-v2/video",
  "/closet-v2/dashboard",
  "/payment"
]) {
  assert.ok(appSource.includes(route), `real PWA app must link to ${route}`);
}

for (const capability of [
  "AI text + voice",
  "AI video room",
  "Virtual wardrobe",
  "Environment selector",
  "Full-body selector",
  "Black Card"
]) {
  assert.ok(appSource.includes(capability), `PWA must include ${capability}`);
}

assert.ok(homeSource.includes("ClosetV2RealApp"), "home route must render the real app component");
assert.ok(cssSource.includes("#ff2f98"), "Eden's Closet real UI must preserve hot pink accent styling");
assert.ok(cssSource.includes("100svh"), "Eden's Closet real UI must be PWA/mobile viewport aware");
assert.ok(!appSource.includes("eden-closet-ai-designed-"), "real PWA must not embed page mockup screenshots as UI");
assert.ok(!appSource.toLowerCase().includes("approval studio"), "public PWA must not expose admin approval wording");
assert.ok(!appSource.toLowerCase().includes("manifest-driven"), "public PWA must not expose internal manifest wording");

console.log("Eden's Closet V2 real app routes, assets, and public wording are installed.");
