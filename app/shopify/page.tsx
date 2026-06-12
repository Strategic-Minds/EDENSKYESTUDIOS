import { Header } from "../components";
import { standaloneAssets } from "../visual-source-truth";

const productPanels = [
  ["Product", "Eden Skye Black Card", "Draft/test product spec. Live Shopify product mutation blocked."],
  ["Price", "$199/month", "Displayed membership price until approved commerce manifest replaces it."],
  ["Checkout", "Draft Shopify bridge", "No live payment activation. Test-mode route required next."],
  ["Entitlement", "Black Card access", "Dashboard/Closet access must sync from test entitlement before live activation."],
  ["Gate", "Human approval required", "Payment, product, theme, inventory, discount, and live billing changes are protected."]
];

const xylaPanels = [
  ["Draft product packets", "Xyla-ready packets can draft product pages, hooks, and offer blocks without live Shopify writes."],
  ["Draft collection packets", "Collections are planned, not published. No public collection sync is allowed by default."],
  ["Model-to-product mapping", "Model cards map to offer drafts and content bundles for later approval."],
  ["Content/social hooks", "Draft caption, CTA, and content feed hooks are prepared for Xyla planning only."],
  ["Publishing state", "Publishing disabled. Live posting, scheduling, and billing remain blocked."]
];

const catalogSections = [
  ["Female model catalog", "Primary homepage brand surface. Use approved female roster and locked image assets already present in repo."],
  ["Male model catalog", "REQUIRED_SOURCE_PENDING. Use exact male roster only when a repo or Drive source manifest verifies it; do not invent names or assets."],
  ["Draft product generation queue", "Queue product packets, collection packets, and model mappings for human approval before Shopify write actions."],
  ["Webhook + entitlement sync", "Test-mode Shopify webhook and entitlement sync routes stay draft-safe and reject unsigned or live-only actions."],
  ["Protected live actions", "Live Shopify product/payment mutation, inventory mutation, discount creation, theme publishing, and public social posting remain locked."]
];

const activationChecklist = [
  "Create Shopify Black Card product in test/draft mode",
  "Configure test variant/product ID environment names only",
  "Add signed webhook test route and reject unsigned payloads",
  "Grant Black Card entitlement only after paid test event",
  "Revoke/downgrade entitlement on refund or cancel event",
  "Run npm test and npm run build",
  "Capture Vercel/Chromium evidence before live approval"
];

const adminLinks = ["/admin/gates", "/admin/workflows", "/admin/receipts"];

export default function ShopifyPage() {
  return (
    <main className="eden-site">
      <Header />
      <section className="checkout-shell">
        <aside>
          <p className="pink">Shopify / Draft Safe</p>
          <h2>Eden Skye Black Card</h2>
          <img
            src={standaloneAssets.homeHero.src}
            alt="Eden Skye Black Card standalone hero source"
            style={{ height: 260, width: "100%", border: "1px solid rgba(255,255,255,.18)", borderRadius: 8, margin: "16px 0" }}
          />
          <div className="order-line">
            <span>Black Card Membership</span>
            <strong>$199.00/mo</strong>
          </div>
          <div className="order-line">
            <span>Closet + AI + VIP</span>
            <strong>Included</strong>
          </div>
          <div className="order-line total">
            <span>Live payment</span>
            <strong>Locked</strong>
          </div>
          <a className="hot-btn" href="/payment" style={{ width: "100%", marginTop: 16 }}>
            Open Draft Payment
          </a>
        </aside>
        <section>
          <h1 style={{ fontSize: 56, lineHeight: 1, margin: "0 0 14px", textTransform: "uppercase" }}>Shopify Black Card Control Page</h1>
          <p>
            This page is the draft-safe Shopify/Xyla automation command surface for Eden Skye. It is the Draft/test product spec and plans product packets, collection packets, content feeds, and entitlement routing without activating live Shopify writes or public publishing.
          </p>
          <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
            {productPanels.map(([label, value, body]) => (
              <article className="price-card" key={label}>
                <span>{label}</span>
                <h2 style={{ fontSize: 30 }}>{value}</h2>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <h2 style={{ marginTop: 24 }}>Xyla AI Shopify Automation</h2>
          <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
            {xylaPanels.map(([label, body]) => (
              <article className="price-card" key={label}>
                <span>{label}</span>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <h2 style={{ marginTop: 24 }}>Catalog Planning</h2>
          <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
            {catalogSections.map(([label, body]) => (
              <article className="price-card" key={label}>
                <span>{label}</span>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <h2 style={{ marginTop: 24 }}>Test-Mode Activation Checklist</h2>
          <ul>{activationChecklist.map((item) => <li key={item}>{item}</li>)}</ul>
          <div className="hero-actions">
            <a className="hot-btn" href="/pricing">
              Pricing
            </a>
            <a className="outline-btn" href="/dashboard">
              Dashboard
            </a>
            {adminLinks.map((href) => (
              <a key={href} className="outline-btn" href={href}>
                {href}
              </a>
            ))}
          </div>
          <small>Protected action rule: no live Shopify product/payment/theme/discount/inventory mutation without explicit human approval receipt. Live payment Locked until approved.</small>
        </section>
      </section>
    </main>
  );
}
