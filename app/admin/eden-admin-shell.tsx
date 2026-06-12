import type { ReactNode } from "react";
import * as vt from "../visual-source-truth";
import { AdminAuthGate } from "./admin-auth-gate";

const accent = "#ff2bd6";
const black = "#030305";
const panel = "#0a0a10";
const softPanel = "#11111a";

const navRoutes = [
  "/admin",
  "/admin/eden",
  "/admin/agent-console",
  "/admin/bridge",
  "/admin/builders",
  "/admin/git-vercel",
  "/admin/supabase",
  "/admin/drive",
  "/admin/gmail-calendar",
  "/admin/media",
  "/admin/approval-studio",
  "/admin/social",
  "/admin/gates",
  "/admin/workflows",
  "/admin/receipts",
  "/admin/evidence",
  "/admin/images",
  "/admin/models",
  "/admin/quarantine"
];

const bridges = [
  ["GitHub", "connected draft ops", "Branches, PRs, Actions, issues, code receipts"],
  ["Vercel", "preview gated", "Preview deploys, visual evidence, build logs"],
  ["Supabase", "registry safe", "Queues, receipts, approval requests, SQL checks"],
  ["Drive OS", "source truth", "Asset manifests, missing files, quarantine"],
  ["Gmail", "draft only", "Inbox queue and draft replies; no live send"],
  ["Calendar", "briefing only", "Availability and briefs; no external event create"],
  ["Shopify", "draft only", "Bridge packets; no payment or live product mutation"],
  ["HeyGen", "packet ready", "Avatar/video generation packets pending review"],
  ["Social", "no public post", "Draft scheduler, analytics review, winner cloning"],
  ["Browser", "evidence bridge", "Chromium screenshots and route regression proof"]
];

const modules = [
  ["Command Center", "Readiness, blockers, next best action, bridge health"],
  ["Agent Console", "Chat workspace, autonomy control, model selector, task queue"],
  ["Bridge Command", "Preflight, policy check, command queue, receipt routing"],
  ["Builder Docs", "Source intake, install packet, validation plan, operator playbook"],
  ["Git / Vercel Ops", "Draft PR, preview, visual bridge, test/build evidence"],
  ["Supabase Ops", "Registry, SQL checks, queues, receipts, migration gate"],
  ["Drive OS", "Source truth, exact image manifest, missing assets, quarantine"],
  ["Media Factory", "Image prompts, video prompts, HeyGen packets, approval state"],
  ["Approval Studio", "Images, videos, site content, Shopify/social packets, source-truth review"],
  ["Social Automation", "Plans, drafts, Metricool bridge, analytics, posting gate"],
  ["Gmail / Calendar", "Inbox action queue, draft replies, scheduling briefs"],
  ["Approval Gates", "Protected actions, approve/reject decisions, audit trail"],
  ["Evidence Center", "Screenshots, API responses, SQL, build logs, readiness report"]
];

const contentQueues = [
  ["Call Content", "Approve model call sheets, hero layouts, and campaign direction before generation."],
  ["Images", "Review locked source images, generated options, and route-specific visual evidence."],
  ["Videos", "Review AI video packets, HeyGen-ready briefs, and draft motion approvals."],
  ["Approvals", "Grant or reject media, gates, receipts, and release requests from one control plane."]
];

const mediaAssets = [vt.heroAsset, vt.galleryAssets[0], vt.galleryAssets[1], vt.galleryAssets[2]];

const sourcePatterns = [
  ["workspace-shell.tsx", "Three-pane command workspace: chat, tool rail, editor, mobile tabs"],
  ["chat-panel.tsx", "Autonomous composer, model routing, attachments, browse, task queue"],
  ["bridge-command-center.tsx", "Registry, action surfaces, smoke order, mutation policy"],
  ["autonomous-bridge-registry.ts", "GPT, GitHub, Vercel, Supabase, generator, social, browser QA bridges"],
  ["approvals/gate.ts", "Pause workflow, create approval request, poll status, resume or fail"],
  ["api/bridge/*", "Preflight, policy check, approval request, command, zero inference routes"]
];

const builderDocs = [
  "SYSTEM_BRIEF",
  "STACK_CONTRACT",
  "AGENT_TOPOLOGY",
  "BRIDGE_MANIFEST",
  "CONNECTOR_MAP",
  "APPROVAL_GATES",
  "VALIDATION_PLAN",
  "RUNTIME_EVIDENCE_PLAN",
  "INSTALL_PACKET",
  "OPERATOR_PLAYBOOK",
  "BLACK_CHAT_UI_SOURCE_INTAKE",
  "AUTONOMOUS_BUILDER_PACKET"
];

const protectedActions = [
  "production deploy",
  "live Shopify mutation",
  "Supabase production schema mutation",
  "public social publishing",
  "real customer Gmail send",
  "external Calendar event create",
  "domain, DNS, billing, or secret changes",
  "destructive Git, merge, release, or PR movement"
];

const queue = [
  ["admin-bootstrap", "Builder docs, source intake, manifests, routes, APIs installed", "complete"],
  ["source-package", "Black chat UI unpacked and mapped to Eden modules", "wired"],
  ["bridge-policy", "Protected commands blocked unless approved", "active"],
  ["visual-evidence", "Run Eden Visual Preview Bridge and review screenshots", "waiting"],
  ["source-truth", "Keep exact source-image manifest canonical", "locked"],
  ["production", "No live mutation until explicit approval", "blocked"]
];

function Pill({ children, tone = "pink" }: { children: ReactNode; tone?: "pink" | "white" | "red" }) {
  const color = tone === "red" ? "#ff4f7b" : tone === "white" ? "#ffffff" : accent;
  return (
    <span style={{ border: `1px solid ${color}`, color, borderRadius: 999, padding: "5px 9px", fontSize: 11, textTransform: "uppercase", letterSpacing: 0, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

function SectionTitle({ kicker, title, action }: { kicker: string; title: string; action?: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "end", marginBottom: 14 }}>
      <div>
        <div style={{ color: accent, fontSize: 11, textTransform: "uppercase", letterSpacing: 0, fontWeight: 700 }}>{kicker}</div>
        <h2 style={{ margin: "4px 0 0", fontSize: 22, lineHeight: 1.1, color: "#fff" }}>{title}</h2>
      </div>
      {action ? <Pill>{action}</Pill> : null}
    </div>
  );
}

export async function EdenSkyeAdminShell({ section = "Command Center" }: { section?: string }) {
  return (
    <AdminAuthGate>
    <main data-admin-theme="black-command-center" style={{ minHeight: "100vh", background: black, color: "#fff", fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif", padding: 24 }}>
      <div style={{ maxWidth: 1540, margin: "0 auto" }}>
        <header style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(320px, .8fr)", gap: 18, alignItems: "stretch", marginBottom: 18 }}>
          <section style={{ background: "linear-gradient(135deg, #050506 0%, #0d0710 58%, #1a0213 100%)", border: "1px solid rgba(255,43,214,.45)", boxShadow: "0 0 42px rgba(255,43,214,.16)", padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <Pill>EDEN SKYE ADMIN</Pill>
              <Pill tone="red">live mutation locked</Pill>
            </div>
            <h1 style={{ margin: "26px 0 8px", fontSize: 46, lineHeight: 1, color: "#fff", letterSpacing: 0 }}>Autonomous Operations Command Center</h1>
            <p style={{ maxWidth: 860, color: "rgba(255,255,255,.76)", fontSize: 15, lineHeight: 1.6, margin: 0 }}>
              Black chat/admin UI source package is unpacked and wired into Eden Skye OS as a governed backend control plane: plan, build, validate, approve, deploy preview, operate, generate media, draft social, analyze, optimize, and scale.
            </p>
          </section>
          <aside style={{ background: panel, border: "1px solid rgba(255,255,255,.16)", padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <span style={{ color: "rgba(255,255,255,.64)", fontSize: 12, textTransform: "uppercase", letterSpacing: 0 }}>Readiness</span>
              <Pill tone="white">draft control plane</Pill>
            </div>
            <div style={{ fontSize: 64, lineHeight: 1, fontWeight: 800, color: "#fff" }}>74%</div>
            <div style={{ height: 8, background: "#1d1d28", margin: "18px 0", overflow: "hidden" }}>
              <div style={{ height: "100%", width: "74%", background: `linear-gradient(90deg, ${accent}, #ffffff)` }} />
            </div>
            <p style={{ margin: 0, color: "rgba(255,255,255,.7)", fontSize: 13, lineHeight: 1.5 }}>
              Source package, builder docs, manifests, admin routes, APIs, and guardrail tests are wired. Build and Chromium evidence remain pending.
            </p>
          </aside>
        </header>

        <nav style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
          {navRoutes.map((href) => (
            <a key={href} href={href} style={{ color: "#fff", textDecoration: "none", background: softPanel, border: "1px solid rgba(255,255,255,.14)", padding: "10px 12px", fontSize: 12 }}>
              {href}
            </a>
          ))}
        </nav>

        <section style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) minmax(320px, .9fr)", gap: 18, marginBottom: 18 }}>
          <div style={{ background: panel, border: "1px solid rgba(255,255,255,.16)", padding: 20 }}>
            <SectionTitle kicker={section} title="Next Best Autonomous Action" action="safe autonomy" />
            <div style={{ background: "#050507", border: "1px solid rgba(255,43,214,.34)", padding: 18 }}>
              <div style={{ color: "#fff", fontSize: 18, fontWeight: 700 }}>Run Eden Visual Preview Bridge, download evidence, review screenshots, keep PR draft.</div>
              <p style={{ color: "rgba(255,255,255,.7)", margin: "10px 0 0", lineHeight: 1.5 }}>
                The agent can prepare, queue, validate, and collect evidence autonomously. Approval is required before production deploy, public posting, commerce mutation, database mutation, PR movement, merge, or release.
              </p>
            </div>
          </div>
          <div style={{ background: panel, border: "1px solid rgba(255,255,255,.16)", padding: 20 }}>
            <SectionTitle kicker="Gate State" title="Protected Actions" action="blocked" />
            <div style={{ display: "grid", gap: 8 }}>
              {protectedActions.map((item) => (
                <div key={item} style={{ display: "flex", justifyContent: "space-between", gap: 12, borderBottom: "1px solid rgba(255,255,255,.1)", paddingBottom: 8 }}>
                  <span style={{ color: "rgba(255,255,255,.82)", fontSize: 13 }}>{item}</span>
                  <span style={{ color: "#ff4f7b", fontSize: 12, fontWeight: 700 }}>HUMAN GATE</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 18 }}>
          {modules.map(([name, desc]) => (
            <article key={name} style={{ background: softPanel, border: "1px solid rgba(255,255,255,.14)", padding: 14, minHeight: 122 }}>
              <div style={{ color: accent, fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0 }}>{name}</div>
              <p style={{ color: "rgba(255,255,255,.72)", fontSize: 12, lineHeight: 1.45, margin: "10px 0 0" }}>{desc}</p>
            </article>
          ))}
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(320px, 1fr)", gap: 18, marginBottom: 18 }}>
          <div style={{ background: panel, border: "1px solid rgba(255,255,255,.16)", padding: 20 }}>
            <SectionTitle kicker="Unpacked Source Package" title="Black Chat UI Patterns Wired" action="source mapped" />
            <div style={{ display: "grid", gap: 9 }}>
              {sourcePatterns.map(([file, detail]) => (
                <div key={file} style={{ display: "grid", gridTemplateColumns: "210px 1fr", gap: 12, borderBottom: "1px solid rgba(255,255,255,.1)", paddingBottom: 8 }}>
                  <span style={{ color: accent, fontSize: 12, fontWeight: 700 }}>{file}</span>
                  <span style={{ color: "rgba(255,255,255,.68)", fontSize: 12, lineHeight: 1.45 }}>{detail}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: panel, border: "1px solid rgba(255,255,255,.16)", padding: 20 }}>
            <SectionTitle kicker="Builder Docs" title="Install And Validation Pack" action="12 docs" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {builderDocs.map((doc) => (
                <span key={doc} style={{ color: "#fff", background: "#050507", border: "1px solid rgba(255,43,214,.28)", padding: "7px 9px", fontSize: 11 }}>
                  {doc}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(320px, 1fr)", gap: 18 }}>
          <div style={{ background: panel, border: "1px solid rgba(255,255,255,.16)", padding: 20 }}>
            <SectionTitle kicker="Bridge Registry" title="Connected Systems" action="manifest backed" />
            <div style={{ display: "grid", gap: 8 }}>
              {bridges.map(([name, status, detail]) => (
                <div key={name} style={{ display: "grid", gridTemplateColumns: "140px 130px 1fr", gap: 12, alignItems: "center", padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
                  <strong style={{ color: "#fff", fontSize: 13 }}>{name}</strong>
                  <span style={{ color: accent, fontSize: 12 }}>{status}</span>
                  <span style={{ color: "rgba(255,255,255,.62)", fontSize: 12 }}>{detail}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
              <a className="hot-btn" href="/admin/approval-studio">Open Approval Studio</a>
              <a className="outline-btn" href="/admin/images">Images</a>
              <a className="outline-btn" href="/admin/media">Media</a>
            </div>
          </div>
          <div style={{ background: panel, border: "1px solid rgba(255,255,255,.16)", padding: 20 }}>
            <SectionTitle kicker="Execution Queue" title="Receipts And Recovery" action="audit ready" />
            <div style={{ display: "grid", gap: 10 }}>
              {queue.map(([id, detail, state]) => (
                <div key={id} style={{ background: "#050507", border: "1px solid rgba(255,255,255,.12)", padding: 13 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <strong style={{ color: "#fff", fontSize: 13 }}>{id}</strong>
                    <span style={{ color: state === "blocked" ? "#ff4f7b" : accent, fontSize: 12, fontWeight: 700 }}>{state}</span>
                  </div>
                  <p style={{ margin: "7px 0 0", color: "rgba(255,255,255,.68)", fontSize: 12, lineHeight: 1.45 }}>{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) minmax(320px, .9fr)", gap: 18, marginTop: 18 }}>
          <div style={{ background: panel, border: "1px solid rgba(255,255,255,.16)", padding: 20 }}>
            <SectionTitle kicker="Content Control Plane" title="Call Content, Images, And Videos" action="human approval" />
            <div style={{ display: "grid", gap: 10 }}>
              {contentQueues.map(([label, detail]) => (
                <div key={label} style={{ background: "#050507", border: "1px solid rgba(255,255,255,.12)", padding: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                    <strong style={{ color: "#fff", fontSize: 13 }}>{label}</strong>
                    <Pill tone="white">review</Pill>
                  </div>
                  <p style={{ margin: "8px 0 0", color: "rgba(255,255,255,.68)", fontSize: 12, lineHeight: 1.45 }}>{detail}</p>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
              <a className="hot-btn" href="/admin/images">Review Images</a>
              <a className="outline-btn" href="/admin/media">Review Videos</a>
              <a className="outline-btn" href="/admin/evidence">View Evidence</a>
            </div>
          </div>
          <div style={{ background: panel, border: "1px solid rgba(255,255,255,.16)", padding: 20 }}>
            <SectionTitle kicker="Content Library" title="Approved Visuals" action="locked assets" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 }}>
              {mediaAssets.map((asset) => (
                <figure key={asset.id} style={{ margin: 0, background: "#050507", border: "1px solid rgba(255,255,255,.12)", padding: 8 }}>
                  <img src={asset.src} alt={asset.label} style={{ width: "100%", height: 168, objectFit: "cover", border: "1px solid rgba(255,255,255,.12)" }} />
                  <figcaption style={{ marginTop: 8, fontSize: 11, color: "rgba(255,255,255,.7)", lineHeight: 1.4 }}>{asset.label}</figcaption>
                </figure>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
              <Pill tone="pink">approve image</Pill>
              <Pill tone="pink">approve video</Pill>
              <Pill tone="red">reject release</Pill>
            </div>
          </div>
        </section>
      </div>
    </main>
    </AdminAuthGate>
  );
}
