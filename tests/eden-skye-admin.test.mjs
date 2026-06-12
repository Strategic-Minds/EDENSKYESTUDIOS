import { existsSync, readFileSync } from "node:fs";

const requiredDocs = [
  "docs/EDEN_SKYE_ADMIN_SYSTEM_BRIEF.md",
  "docs/EDEN_SKYE_ADMIN_STACK_CONTRACT.md",
  "docs/EDEN_SKYE_ADMIN_AGENT_TOPOLOGY.md",
  "docs/EDEN_SKYE_ADMIN_BRIDGE_MANIFEST.md",
  "docs/EDEN_SKYE_ADMIN_CONNECTOR_MAP.md",
  "docs/EDEN_SKYE_ADMIN_APPROVAL_GATES.md",
  "docs/EDEN_SKYE_ADMIN_VALIDATION_PLAN.md",
  "docs/EDEN_SKYE_ADMIN_RUNTIME_EVIDENCE_PLAN.md",
  "docs/EDEN_SKYE_ADMIN_INSTALL_PACKET.md",
  "docs/EDEN_SKYE_ADMIN_OPERATOR_PLAYBOOK.md"
];

const requiredManifests = [
  "config/eden-skye-admin-manifest.json",
  "config/eden-skye-admin-bridge-registry.json",
  "config/eden-skye-admin-agent-registry.json",
  "config/eden-skye-admin-approval-gates.json",
  "config/eden-skye-admin-validation-matrix.json",
  "config/eden-skye-admin-connected-systems.json"
];

const requiredAdminRoutes = [
  "app/admin/page.tsx",
  "app/admin/eden/page.tsx",
  "app/admin/gates/page.tsx",
  "app/admin/workflows/page.tsx",
  "app/admin/receipts/page.tsx",
  "app/admin/images/page.tsx",
  "app/admin/models/page.tsx",
  "app/admin/quarantine/page.tsx"
];

const requiredApiRoutes = [
  "app/api/admin/eden/readiness/route.ts",
  "app/api/admin/eden/bridge-registry/route.ts",
  "app/api/admin/eden/approval-gates/route.ts",
  "app/api/admin/eden/evidence/route.ts",
  "app/api/admin/eden/command-queue/route.ts"
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function read(path) {
  assert(existsSync(path), `Missing required file: ${path}`);
  return readFileSync(path, "utf8");
}

for (const path of [...requiredDocs, ...requiredManifests, ...requiredAdminRoutes, ...requiredApiRoutes]) {
  assert(existsSync(path), `Missing required Eden Skye Admin artifact: ${path}`);
}

const manifest = JSON.parse(read("config/eden-skye-admin-manifest.json"));
const approvalGates = JSON.parse(read("config/eden-skye-admin-approval-gates.json"));
const bridgeRegistry = JSON.parse(read("config/eden-skye-admin-bridge-registry.json"));

const manifestText = JSON.stringify(manifest).toLowerCase();
const approvalText = JSON.stringify(approvalGates).toLowerCase();
const bridgeText = JSON.stringify(bridgeRegistry).toLowerCase();

assert(manifestText.includes("eden skye admin"), "Admin manifest must identify EDEN SKYE ADMIN.");
assert(manifestText.includes("live_mutations") && manifestText.includes("false"), "Live mutations must be disabled in the admin manifest.");
assert(approvalText.includes("human") && approvalText.includes("approval"), "Approval gates must require human approval.");
assert(approvalText.includes("production") && approvalText.includes("deploy"), "Production deploy must be approval-gated.");
assert(bridgeText.includes("github") && bridgeText.includes("vercel") && bridgeText.includes("supabase"), "Bridge registry must include core GitHub/Vercel/Supabase bridges.");

const shell = read("app/admin/eden-admin-shell.tsx");
assert(shell.includes("EDEN SKYE ADMIN"), "Admin shell must show the system name.");
assert(shell.includes("#030305") || shell.includes("#000"), "Admin shell must use a black background token.");
assert(shell.includes("#fff") || shell.includes("#ffffff"), "Admin shell must use white font tokens.");
assert(shell.includes("#ff2bd6"), "Admin shell must use hot pink Eden Skye accent token.");
assert(!/beige|tan|cream|sand/i.test(shell), "Admin shell must not drift into beige/generic styling language.");
assert(!/marketing homepage/i.test(shell), "Admin shell must not render as a marketing homepage.");

const commandQueue = read("app/api/admin/eden/command-queue/route.ts");
assert(commandQueue.includes("blocked_pending_human_approval"), "Protected commands must be blocked pending human approval.");
assert(commandQueue.includes("status: 423"), "Protected command route must return a locked status.");
assert(commandQueue.includes("live_mutations_enabled: false"), "Command queue must keep live mutations disabled.");

console.log("Eden Skye Admin manifests, UI style, and protected-action gates are installed and locked.");
