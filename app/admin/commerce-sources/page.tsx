const accent = "#ff2bd6";
const bg = "#030305";
const panel = "#0a0a10";
const line = "rgba(255,255,255,.16)";
const driveUrl = "https://drive.google.com/drive/folders/1RZVPpvAhrBikTLJ2rwIOVedfwoTqpAsE";

const assets = [
  ["Female Models", "eden-commerce-001_female-models-collection-hero_16x9_v1.png", "approved_shopify_draft"],
  ["Male Models", "eden-commerce-002_male-models-collection-hero_16x9_v1.png", "approved_shopify_draft"],
  ["Faceless Content", "eden-commerce-003_faceless-content-collection-hero_16x9_v1.png", "approved_shopify_draft"],
  ["Black Card", "eden-commerce-004_black-card-product-hero_4x5_v1.png", "approved_shopify_draft"],
  ["Xyla AI", "eden-commerce-005_xyla-ai-automation-product-hero_4x5_v1.png", "approved_shopify_draft"],
  ["AI Video", "eden-commerce-006_ai-video-creation-product-hero_4x5_v1.png", "approved_heygen_packet"],
  ["Social System", "eden-commerce-007_social-posting-system-product-hero_4x5_v1.png", "approved_social_draft"],
  ["Campaign Packet", "eden-commerce-008_model-campaign-packet-product-hero_4x5_v1.png", "approved_shopify_draft"],
  ["Closet Content", "eden-commerce-009_closet-content-pack-product-hero_4x5_v1.png", "approved_shopify_draft"],
  ["Faceless Vertical", "eden-commerce-010_faceless-video-background_neon-studio_9x16_v1.png", "approved_social_draft"],
  ["Content Console", "eden-commerce-011_faceless-video-background_content-console_9x16_v1.png", "approved_social_draft"],
  ["Product Card", "eden-commerce-012_faceless-content-product-card_4x5_v1.png", "approved_shopify_draft"]
];

const protectedActions = ["live Shopify product mutation", "payment activation", "public social publishing", "final HeyGen avatar activation", "production deploy", "merge or release"];

function Pill({ children, red = false }: { children: string; red?: boolean }) {
  return <span style={{ border: `1px solid ${red ? "#ff4f7b" : accent}`, color: red ? "#ff4f7b" : accent, borderRadius: 999, padding: "5px 9px", fontSize: 11, textTransform: "uppercase", whiteSpace: "nowrap" }}>{children}</span>;
}

export default function Page() {
  return (
    <AdminAuthGate>
    <main data-admin-theme="black-command-center" style={{ minHeight: "100vh", background: bg, color: "#fff", padding: 24, fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1500, margin: "0 auto" }}>
        <header style={{ display: "grid", gridTemplateColumns: "minmax(0,1.25fr) minmax(320px,.75fr)", gap: 18, marginBottom: 18 }}>
          <section style={{ border: "1px solid rgba(255,43,214,.48)", background: "linear-gradient(135deg,#050506,#120511 68%,#240219)", boxShadow: "0 0 42px rgba(255,43,214,.18)", padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <Pill>EDEN COMMERCE SOURCES</Pill>
              <Pill red>live mutation locked</Pill>
            </div>
            <h1 style={{ margin: "24px 0 10px", fontSize: 46, lineHeight: 1 }}>Approved Bulk Draft Source Batch</h1>
            <p style={{ margin: 0, maxWidth: 880, color: "rgba(255,255,255,.74)", lineHeight: 1.55 }}>
              Jeremy approved this 12-image Shopify/Xyla batch in bulk. The assets are approved for draft Shopify, draft social, and HeyGen packet use only. They remain blocked from live Shopify changes, public posting, final video activation, production deploy, merge, or release.
            </p>
          </section>
          <aside style={{ border: `1px solid ${line}`, background: panel, padding: 20 }}>
            <Pill>approved_bulk_draft</Pill>
            <div style={{ marginTop: 18, fontSize: 58, lineHeight: 1, fontWeight: 900 }}>12</div>
            <p style={{ margin: "8px 0 18px", color: "rgba(255,255,255,.72)" }}>Drive file IDs are still pending upload or validation.</p>
            <a href="/api/admin/eden/commerce-sources" style={{ display: "block", border: `1px solid ${accent}`, color: "#fff", padding: 12, textAlign: "center", textDecoration: "none", background: "rgba(255,43,214,.18)" }}>GPT Commerce Registry</a>
          </aside>
        </header>

        <section style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(320px,.7fr)", gap: 18, marginBottom: 18 }}>
          <div style={{ border: `1px solid ${line}`, background: panel, padding: 20 }}>
            <div style={{ color: accent, fontSize: 12, fontWeight: 800, textTransform: "uppercase" }}>Source Truth</div>
            <h2 style={{ margin: "6px 0 12px", fontSize: 26 }}>Package, Manifest, Contract, Contact Sheet</h2>
            <p style={{ color: "rgba(255,255,255,.72)", lineHeight: 1.5 }}>Package: <strong>EDEN_SHOPIFY_XYLA_COMMERCE_SOURCE_IMAGES_2026_06_12.zip</strong></p>
            <p style={{ color: "rgba(255,255,255,.72)", lineHeight: 1.5 }}>Manifest: <strong>EDEN_SHOPIFY_XYLA_COMMERCE_SOURCE_MANIFEST_2026-06-12.csv</strong></p>
            <p style={{ color: "rgba(255,255,255,.72)", lineHeight: 1.5 }}>Contract: <strong>EDEN_SHOPIFY_XYLA_COMMERCE_SOURCE_CONTRACT_2026-06-12.json</strong></p>
            <p style={{ color: "rgba(255,255,255,.72)", lineHeight: 1.5 }}>Contact sheet: <strong>eden-shopify-xyla-commerce-source-contact-sheet-2026-06-12.jpg</strong></p>
            <a href={driveUrl} style={{ color: accent, wordBreak: "break-all" }}>{driveUrl}</a>
          </div>
          <div style={{ border: "1px solid rgba(255,79,123,.5)", background: "#10070b", padding: 20 }}>
            <Pill red>live gates still locked</Pill>
            <h2 style={{ margin: "16px 0 12px", fontSize: 26 }}>Protected Actions</h2>
            {protectedActions.map((action) => <div key={action} style={{ color: "#ff9bb4", borderBottom: "1px solid rgba(255,79,123,.22)", padding: "9px 0" }}>{action}</div>)}
          </div>
        </section>

        <section style={{ border: `1px solid rgba(255,43,214,.38)`, background: panel, padding: 20 }}>
          <div style={{ color: accent, fontSize: 12, fontWeight: 800, textTransform: "uppercase" }}>Bulk Approved Assets</div>
          <h2 style={{ margin: "6px 0 14px", fontSize: 26 }}>Standalone Commerce Source Images</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 12 }}>
            {assets.map(([label, file, state]) => (
              <article key={file} style={{ background: "#050507", border: "1px solid rgba(255,255,255,.12)", padding: 14 }}>
                <strong style={{ color: "#fff", fontSize: 15 }}>{label}</strong>
                <span style={{ display: "block", color: accent, fontSize: 12, margin: "9px 0", wordBreak: "break-word" }}>{file}</span>
                <small style={{ display: "block", color: "rgba(255,255,255,.64)" }}>{state} | PENDING_DRIVE_UPLOAD | standalone_generated_no_collage_crop</small>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
    </AdminAuthGate>
  );
}
import { AdminAuthGate } from "../admin-auth-gate";
