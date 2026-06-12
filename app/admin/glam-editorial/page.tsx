const accent = "#ff2bd6";
const bg = "#030305";
const panel = "#0a0a10";
const line = "rgba(255,255,255,.16)";
const driveUrl = "https://drive.google.com/drive/folders/1RZVPpvAhrBikTLJ2rwIOVedfwoTqpAsE";

const assets = [
  ["Female black lace evening", "eden-glam-editorial-001_female-black-lace-evening-dress_4x5_v1.png", "female / Shopify / social"],
  ["Female hot pink mini", "eden-glam-editorial-002_female-hot-pink-mini-dress_4x5_v1.png", "female / Shopify / social"],
  ["Female black club fashion", "eden-glam-editorial-003_female-black-club-fashion_4x5_v1.png", "female / Shopify / social"],
  ["Male open-shirt nightlife", "eden-glam-editorial-004_male-open-shirt-nightlife_4x5_v1.png", "male / Shopify / social"],
  ["Male black tank editorial", "eden-glam-editorial-005_male-black-tank-editorial_4x5_v1.png", "male / Shopify / social"],
  ["Female full-body gown", "eden-glam-editorial-006_female-fullbody-black-gown_9x16_v1.png", "female / Closet / social"],
  ["Male full-body open shirt", "eden-glam-editorial-007_male-fullbody-open-shirt_9x16_v1.png", "male / Shopify / social"],
  ["Female social close-up", "eden-glam-editorial-008_female-social-closeup-glam_4x5_v1.png", "female / Shopify / social"]
];

function Pill({ children, red = false }: { children: string; red?: boolean }) {
  return <span style={{ border: `1px solid ${red ? "#ff4f7b" : accent}`, color: red ? "#ff4f7b" : accent, borderRadius: 999, padding: "5px 9px", fontSize: 11, textTransform: "uppercase", whiteSpace: "nowrap" }}>{children}</span>;
}

export default function Page() {
  return (
    <main data-admin-theme="black-command-center" style={{ minHeight: "100vh", background: bg, color: "#fff", padding: 24, fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1500, margin: "0 auto" }}>
        <header style={{ display: "grid", gridTemplateColumns: "minmax(0,1.25fr) minmax(320px,.75fr)", gap: 18, marginBottom: 18 }}>
          <section style={{ border: "1px solid rgba(255,43,214,.48)", background: "linear-gradient(135deg,#050506,#120511 68%,#240219)", boxShadow: "0 0 42px rgba(255,43,214,.18)", padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <Pill>EDEN GLAM EDITORIAL</Pill>
              <Pill red>pending approval</Pill>
            </div>
            <h1 style={{ margin: "24px 0 10px", fontSize: 46, lineHeight: 1 }}>Batch 003 Sexier Editorial Source Review</h1>
            <p style={{ margin: 0, maxWidth: 880, color: "rgba(255,255,255,.74)", lineHeight: 1.55 }}>
              Hidden admin review lane for the revised glam direction: sexier adult female and male editorial images, no business suits, no collage crops, non-explicit, and locked from public/live use until approval.
            </p>
          </section>
          <aside style={{ border: `1px solid ${line}`, background: panel, padding: 20 }}>
            <Pill>generated_pending_admin_review</Pill>
            <div style={{ marginTop: 18, fontSize: 58, lineHeight: 1, fontWeight: 900 }}>8</div>
            <p style={{ margin: "8px 0 18px", color: "rgba(255,255,255,.72)" }}>Drive file IDs are pending upload or validation.</p>
            <a href="/api/admin/eden/glam-editorial" style={{ display: "block", border: `1px solid ${accent}`, color: "#fff", padding: 12, textAlign: "center", textDecoration: "none", background: "rgba(255,43,214,.18)" }}>GPT Glam Registry</a>
          </aside>
        </header>

        <section style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(320px,.7fr)", gap: 18, marginBottom: 18 }}>
          <div style={{ border: `1px solid ${line}`, background: panel, padding: 20 }}>
            <div style={{ color: accent, fontSize: 12, fontWeight: 800, textTransform: "uppercase" }}>Source Truth</div>
            <h2 style={{ margin: "6px 0 12px", fontSize: 26 }}>Package, Manifest, Contract, Contact Sheet</h2>
            <p style={{ color: "rgba(255,255,255,.72)", lineHeight: 1.5 }}>Package: <strong>EDEN_GLAM_EDITORIAL_BATCH_003_IMAGES_2026_06_12.zip</strong></p>
            <p style={{ color: "rgba(255,255,255,.72)", lineHeight: 1.5 }}>Manifest: <strong>EDEN_GLAM_EDITORIAL_BATCH_003_MANIFEST_2026-06-12.csv</strong></p>
            <p style={{ color: "rgba(255,255,255,.72)", lineHeight: 1.5 }}>Contract: <strong>EDEN_GLAM_EDITORIAL_BATCH_003_CONTRACT_2026-06-12.json</strong></p>
            <p style={{ color: "rgba(255,255,255,.72)", lineHeight: 1.5 }}>Contact sheet: <strong>eden-glam-editorial-batch-003-contact-sheet-2026-06-12.jpg</strong></p>
            <a href={driveUrl} style={{ color: accent, wordBreak: "break-all" }}>{driveUrl}</a>
          </div>
          <div style={{ border: "1px solid rgba(255,79,123,.5)", background: "#10070b", padding: 20 }}>
            <Pill red>live gates locked</Pill>
            <h2 style={{ margin: "16px 0 12px", fontSize: 26 }}>Protected Until Approval</h2>
            {['live Shopify product mutation','payment activation','public social publishing','final HeyGen avatar activation','production deploy','merge or release'].map((action) => <div key={action} style={{ color: "#ff9bb4", borderBottom: "1px solid rgba(255,79,123,.22)", padding: "9px 0" }}>{action}</div>)}
          </div>
        </section>

        <section style={{ border: `1px solid rgba(255,43,214,.38)`, background: panel, padding: 20 }}>
          <div style={{ color: accent, fontSize: 12, fontWeight: 800, textTransform: "uppercase" }}>Review Queue</div>
          <h2 style={{ margin: "6px 0 14px", fontSize: 26 }}>Sexier Standalone Source Images</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 12 }}>
            {assets.map(([label, file, lane]) => (
              <article key={file} style={{ background: "#050507", border: "1px solid rgba(255,255,255,.12)", padding: 14 }}>
                <strong style={{ color: "#fff", fontSize: 15 }}>{label}</strong>
                <span style={{ display: "block", color: accent, fontSize: 12, margin: "9px 0", wordBreak: "break-word" }}>{file}</span>
                <small style={{ display: "block", color: "rgba(255,255,255,.64)" }}>{lane} | generated_pending_admin_review | non-explicit | PENDING_DRIVE_UPLOAD</small>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
