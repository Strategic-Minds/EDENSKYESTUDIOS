const accent = "#ff2bd6";
const bg = "#030305";
const panel = "#0a0a10";
const line = "rgba(255,255,255,.16)";

const driveFolder = "https://drive.google.com/drive/folders/1RZVPpvAhrBikTLJ2rwIOVedfwoTqpAsE";

const sources = [
  ["eden-skye-001", "eden-skye-canonical-source-v004.png", "Approved internal", "Site, Shopify draft, Closet, HeyGen packet"],
  ["eden-model-002", "eden-model-002-canonical-source-v001.png", "Approved internal", "Model profile, Shopify draft, Social draft"],
  ["eden-model-003", "eden-model-003-canonical-source-v001.png", "Approved internal", "Male model profile, Shopify draft, Social draft"],
  ["eden-model-004", "eden-model-004-canonical-source-v001.png", "Approved internal", "Male model profile, Shopify draft, Social draft"],
  ["eden-model-005", "eden-model-005-canonical-source-v001.png", "Approved internal", "Model profile, Shopify draft, Social draft"],
  ["eden-model-006", "eden-model-006-canonical-source-v001.png", "Approved internal", "Male model profile, Shopify draft, Social draft"]
];

const stockSources = [
  ["eden-skye-001", "eden-skye-001_identity-lock_front-portrait_4x5_v1.png", "Identity lock"],
  ["eden-skye-002", "eden-skye-002_identity-lock_three-quarter_4x5_v1.png", "Identity lock"],
  ["eden-skye-003", "eden-skye-003_identity-lock_side-profile_4x5_v1.png", "Identity lock"],
  ["eden-skye-004", "eden-skye-004_portfolio_black-card-portrait_4x5_v1.png", "Models page / Black Card"],
  ["eden-skye-005", "eden-skye-005_portfolio_white-blazer_4x5_v1.png", "Models page"],
  ["eden-skye-006", "eden-skye-006_website-hero_black-neon-stage_16x9_v1.png", "Home hero"],
  ["eden-skye-007", "eden-skye-007_website-hero_neon-runway_16x9_v1.png", "Models hero"],
  ["eden-skye-008", "eden-skye-008_wardrobe-safe_full-body-black_9x16_v1.png", "Closet viewer"],
  ["eden-skye-009", "eden-skye-009_background_walk-in-closet_16x9_v1.png", "Closet environment"],
  ["eden-skye-010", "eden-skye-010_social-vertical_hot-pink-blazer_9x16_v1.png", "Social draft"],
  ["eden-skye-011", "eden-skye-011_heygen-headshot_dark-studio_1x1_v1.png", "HeyGen headshot"],
  ["eden-skye-012", "eden-skye-012_heygen-half-body_white-blazer_9x16_v1.png", "HeyGen half body"]
];

const queues = [
  ["Source Images", "Canonical model, hero, closet, Shopify, and HeyGen image sources", "generated_pending_review -> approved_internal -> approved_site/shopify_draft/heygen_packet"],
  ["Video Packets", "HeyGen scripts, avatar packets, shot lists, review renders", "draft_packet -> pending_review -> approved_heygen_packet"],
  ["Site Content", "Homepage, model pages, Closet, Shopify, AI chat, dashboard content", "draft -> preview_evidence -> approved_preview"],
  ["Social / Shopify", "Captions, product copy, collection drafts, Xyla packets", "draft_only -> pending_review -> approved_draft_only"]
];

const gptRules = [
  "Read /api/admin/eden/approval-studio before generating or routing assets.",
  "Use Drive folder 1RZVPpvAhrBikTLJ2rwIOVedfwoTqpAsE as the readable intake source.",
  "Never use a collage crop as a source image; collages are reference boards only.",
  "Default every new asset to generated_pending_review.",
  "Human approval receipt is required before public site, Shopify live, HeyGen final, or social public use."
];

const protectedActions = [
  "Public website production",
  "Live Shopify product or payment mutation",
  "Public social publishing",
  "Final HeyGen avatar activation",
  "Production deploy, merge, or release"
];

function Tag({ children, red = false }: { children: string; red?: boolean }) {
  return <span style={{ border: `1px solid ${red ? "#ff4f7b" : accent}`, color: red ? "#ff4f7b" : accent, borderRadius: 999, padding: "5px 9px", fontSize: 11, textTransform: "uppercase", whiteSpace: "nowrap" }}>{children}</span>;
}

function AssetGrid({ items, state }: { items: string[][]; state: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 12 }}>
      {items.map(([id, file, use]) => (
        <article key={`${id}-${file}`} style={{ background: "#050507", border: "1px solid rgba(255,255,255,.12)", padding: 14 }}>
          <strong style={{ display: "block", color: "#fff", fontSize: 14 }}>{id}</strong>
          <span style={{ display: "block", color: accent, fontSize: 12, margin: "8px 0", wordBreak: "break-word" }}>{file}</span>
          <small style={{ display: "block", color: "rgba(255,255,255,.64)", lineHeight: 1.45 }}>{state} | {use}</small>
        </article>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <main data-admin-theme="black-command-center" style={{ minHeight: "100vh", background: bg, color: "#fff", padding: 24, fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1500, margin: "0 auto" }}>
        <header style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) 360px", gap: 18, marginBottom: 18 }}>
          <section style={{ border: `1px solid rgba(255,43,214,.48)`, background: "linear-gradient(135deg,#050506,#120511 68%,#240219)", boxShadow: "0 0 42px rgba(255,43,214,.18)", padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <Tag>EDEN MEDIA APPROVAL STUDIO</Tag>
              <Tag red>live mutation locked</Tag>
            </div>
            <h1 style={{ margin: "24px 0 10px", fontSize: 48, lineHeight: 1, letterSpacing: 0 }}>Image, Video, And Content Approval Control Plane</h1>
            <p style={{ margin: 0, maxWidth: 860, color: "rgba(255,255,255,.74)", lineHeight: 1.55 }}>
              GPT-readable approval page for Eden Skye media operations. It connects the readable Drive intake folder, canonical model sources, generated stock-source batch, video/content queues, protected action gates, and evidence routing in one draft-safe command surface.
            </p>
          </section>
          <aside style={{ border: `1px solid ${line}`, background: panel, padding: 20 }}>
            <Tag>approval state</Tag>
            <div style={{ marginTop: 18, fontSize: 44, lineHeight: 1, fontWeight: 900 }}>18</div>
            <p style={{ margin: "8px 0 18px", color: "rgba(255,255,255,.72)" }}>6 approved model sources + 12 stock sources pending admin review.</p>
            <a href="/api/admin/eden/approval-studio" style={{ display: "block", border: `1px solid ${accent}`, color: "#fff", padding: 12, textAlign: "center", textDecoration: "none", background: "rgba(255,43,214,.18)" }}>GPT Registry API</a>
          </aside>
        </header>

        <section style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(320px,.75fr)", gap: 18, marginBottom: 18 }}>
          <div style={{ border: `1px solid ${line}`, background: panel, padding: 20 }}>
            <div style={{ color: accent, fontSize: 12, fontWeight: 800, textTransform: "uppercase" }}>Drive Intake</div>
            <h2 style={{ margin: "6px 0 12px", fontSize: 26 }}>Readable Source Folder</h2>
            <p style={{ color: "rgba(255,255,255,.72)", lineHeight: 1.5 }}>Use this folder for uploaded temporary source images, approved boards, generated candidates, and review evidence. Generated stock-source files are registered here as pending Drive upload/validation until file IDs are returned.</p>
            <a href={driveFolder} style={{ color: accent, wordBreak: "break-all" }}>{driveFolder}</a>
          </div>
          <div style={{ border: `1px solid ${line}`, background: panel, padding: 20 }}>
            <div style={{ color: accent, fontSize: 12, fontWeight: 800, textTransform: "uppercase" }}>Current Manifests</div>
            <p style={{ color: "rgba(255,255,255,.78)", lineHeight: 1.55 }}>Canonical model source manifest: <strong>EDEN_CANONICAL_MODEL_SOURCE_MANIFEST_REVISED_V004.csv</strong></p>
            <p style={{ color: "rgba(255,255,255,.78)", lineHeight: 1.55 }}>Stock source manifest: <strong>EDEN_STOCK_CANONICAL_SOURCE_MANIFEST_2026-06-12.csv</strong></p>
            <p style={{ color: "rgba(255,255,255,.78)", lineHeight: 1.55 }}>Stock source package: <strong>EDEN_STOCK_CANONICAL_SOURCE_IMAGES_2026_06_12.zip</strong></p>
          </div>
        </section>

        <section style={{ border: `1px solid ${line}`, background: panel, padding: 20, marginBottom: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
            <div>
              <div style={{ color: accent, fontSize: 12, fontWeight: 800, textTransform: "uppercase" }}>Approved Source Images</div>
              <h2 style={{ margin: "6px 0 0", fontSize: 26 }}>Canonical Model Sources</h2>
            </div>
            <Tag>approved internal</Tag>
          </div>
          <AssetGrid items={sources} state="Approved internal" />
        </section>

        <section style={{ border: `1px solid rgba(255,43,214,.38)`, background: panel, padding: 20, marginBottom: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
            <div>
              <div style={{ color: accent, fontSize: 12, fontWeight: 800, textTransform: "uppercase" }}>Generated Stock Sources</div>
              <h2 style={{ margin: "6px 0 0", fontSize: 26 }}>12 Eden Skye Assets Pending Admin Review</h2>
            </div>
            <Tag>pending drive upload</Tag>
          </div>
          <p style={{ color: "rgba(255,255,255,.68)", marginTop: 0 }}>These files are generated standalone source images for the autonomous system. They are not collage crops. Drive folder linkage is registered; individual Drive file IDs remain pending until upload validation returns metadata.</p>
          <AssetGrid items={stockSources} state="Generated pending admin review" />
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14, marginBottom: 18 }}>
          {queues.map(([name, detail, flow]) => (
            <article key={name} style={{ border: `1px solid ${line}`, background: panel, padding: 18 }}>
              <h3 style={{ margin: 0, color: "#fff", fontSize: 20 }}>{name}</h3>
              <p style={{ color: "rgba(255,255,255,.7)", lineHeight: 1.48 }}>{detail}</p>
              <small style={{ color: accent }}>{flow}</small>
            </article>
          ))}
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(320px,.8fr)", gap: 18 }}>
          <div style={{ border: `1px solid ${line}`, background: panel, padding: 20 }}>
            <div style={{ color: accent, fontSize: 12, fontWeight: 800, textTransform: "uppercase" }}>GPT Bridge Rules</div>
            <h2 style={{ margin: "6px 0 14px", fontSize: 26 }}>How Agents Must Use This Page</h2>
            <div style={{ display: "grid", gap: 10 }}>
              {gptRules.map((rule) => <div key={rule} style={{ borderBottom: "1px solid rgba(255,255,255,.1)", paddingBottom: 10, color: "rgba(255,255,255,.76)" }}>{rule}</div>)}
            </div>
          </div>
          <div style={{ border: `1px solid rgba(255,79,123,.5)`, background: "#10070b", padding: 20 }}>
            <Tag red>human approval required</Tag>
            <h2 style={{ margin: "16px 0 14px", fontSize: 26 }}>Protected Outputs</h2>
            <div style={{ display: "grid", gap: 10 }}>
              {protectedActions.map((item) => <div key={item} style={{ color: "#ff9bb4", borderBottom: "1px solid rgba(255,79,123,.22)", paddingBottom: 10 }}>{item}</div>)}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
