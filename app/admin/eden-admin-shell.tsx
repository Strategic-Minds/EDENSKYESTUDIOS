import type { ReactNode } from "react";

const accent = "#ff2bd6";
const black = "#030305";
const panel = "#0a0a10";
const softPanel = "#11111a";

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
  ["Agent Console", "GPT bridge, Codex bridge, AUTO BUILDER, v0 flow, task queue"],
  ["Git / Vercel Ops", "Draft PR, preview, visual bridge, test/build evidence"],
  ["Supabase Ops", "Registry, SQL checks, queues, receipts, migration gate"],
  ["Drive OS", "Source truth, exact image manifest, missing assets, quarantine"],
  ["Media Factory", "Image prompts, video prompts, HeyGen packets, approval state"],
  ["Social Automation", "Plans, drafts, Metricool bridge, analytics, posting gate"],
  ["Gmail / Calendar", "Inbox action queue, draft replies, scheduling briefs"],
  ["Approval Gates", "Protected actions, approve/reject decisions, audit trail"],
  ["Evidence Center", "Screenshots, API responses, SQL, build logs, readiness report"]
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
  ["admin-bootstrap", "Builder docs + manifests installed", "complete"],
  ["bridge-policy", "Protected commands blocked unless approved", "active"],
  ["visual-evidence", "Run Eden Visual Preview Bridge and review screenshots", "waiting"],
  ["source-truth", "Keep exact standalone image manifest canonical", "locked"],
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

export function EdenSkyeAdminShell({ section = "Command Center" }: { section?: string }) {
  return (
    <main data-admin-theme="black-command-center" style={{ minHeight: "100vh", background: black, color: "#fff", fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif", padding: 24 }}>
      <div style={{ maxWidth: 1500, margin: "0 auto" }}>
        <header style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr", gap: 18, alignItems: "stretch", marginBottom: 18 }}>
          <section style={{ background: "linear-gradient(135deg, #050506 0%, #0d0710 58%, #1a0213 100%)", border: "1px solid rgba(255,43,214,.45)", boxShadow: "0 0 42px rgba(255,43,214,.16)", padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <Pill>EDEN SKYE ADMIN</Pill>
              <Pill tone="red">live mutation locked</Pill>
            </div>
            <h1 style={{ margin: "26px 0 8px", fontSize: 46, lineHeight: 1, color: "#fff", letterSpacing: 0 }}>Autonomous Operations Command Center</h1>
            <p style={{ maxWidth: 820, color: "rgba(255,255,255,.76)", fontSize: 15, lineHeight: 1.6, margin: 0 }}>
              Backend command center for Eden Skye OS and AUTO BUILDER: plan, build, validate, approve, deploy preview, operate, generate media, draft social, analyze, optimize, and scale.
            </p>
          </section>
          <aside style={{ background: panel, border: "1px solid rgba(255,255,255,.16)", padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <span style={{ color: "rgba(255,255,255,.64)", fontSize: 12, textTransform: "uppercase", letterSpacing: 0 }}>Readiness</span>
              <Pill tone="white">draft control plane</Pill>
            </div>
            <div style={{ fontSize: 64, lineHeight: 1, fontWeight: 800, color: "#fff" }}>72%</div>
            <div style={{ height: 8, background: "#1d1d28", margin: "18px 0", overflow: "hidden" }}>
              <div style={{ height: "100%", width: "72%", background: `linear-gradient(90deg, ${accent}, #ffffff)` }} />
            </div>
            <p style={{ margin: 0, color: "rgba(255,255,255,.7)", fontSize: 13, lineHeight: 1.5 }}>
              Admin control plane is installed. Visual evidence and live bridge credential checks remain approval-gated before PR movement.
            </p>
          </aside>
        </header>

        <nav style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
          {["/admin", "/admin/eden", "/admin/gates", "/admin/workflows", "/admin/receipts", "/admin/images", "/admin/models", "/admin/quarantine"].map((href) => (
            <a key={href} href={href} style={{ color: "#fff", textDecoration: "none", background: softPanel, border: "1px solid rgba(255,255,255,.14)", padding: "10px 12px", fontSize: 12 }}>
              {href}
            </a>
          ))}
        </nav>

        <section style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 18, marginBottom: 18 }}>
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

        <section style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 12, marginBottom: 18 }}>
          {modules.map(([name, desc]) => (
            <article key={name} style={{ background: softPanel, border: "1px solid rgba(255,255,255,.14)", padding: 14, minHeight: 122 }}>
              <div style={{ color: accent, fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0 }}>{name}</div>
              <p style={{ color: "rgba(255,255,255,.72)", fontSize: 12, lineHeight: 1.45, margin: "10px 0 0" }}>{desc}</p>
            </article>
          ))}
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
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
      </div>
    </main>
  );
}
