import { Header, models } from "../components";
import { standaloneAssets } from "../visual-source-truth";

const featuredProducts = [
  { name: "Black Card Membership", href: "/payment", body: "Draft/test only. Unlock closet, AI chat, video, and premium content." },
  { name: "Closet Access", href: "/closet", body: "Enter Eden's Closet and choose an outfit flow." },
  { name: "Model Portfolio Flow", href: "/models", body: "Open every model portfolio and campaign path." },
  { name: "Faceless Social Flow", href: "/faceless", body: "Anonymous creator and product-content pipelines." }
];

const facelessCards = [
  { name: "Morning Atelier", href: "/faceless/morning-atelier", body: "Anonymous beauty and lifestyle content." },
  { name: "Noir Diary", href: "/faceless/noir-diary", body: "Shadow-first social campaigns and reels." },
  { name: "Glass Studio", href: "/faceless/glass-studio", body: "Product, room, and hands-only storytelling." }
];

const maleRoster = [
  { name: "Required Source Pending", body: "REQUIRED_SOURCE_PENDING. Use exact male roster only after repo or Drive source verification.", href: "/admin/approval-studio" },
  { name: "Draft Male Catalog Slot", body: "Reserved for sourced male model cards and portfolio links.", href: "/admin/approval-studio" }
];

const xylaPanels = [
  ["Draft product packets", "Xyla-ready packets can draft product pages, hooks, and offer blocks without live Shopify writes."],
  ["Draft collection packets", "Collections are planned, not published. No public collection sync is allowed by default."],
  ["Model-to-product mapping", "Model cards map to offer drafts and content bundles for later approval."],
  ["Content/social hooks", "Draft caption, CTA, and content feed hooks are prepared for Xyla planning only."],
  ["Publishing state", "Publishing disabled. Live posting, scheduling, and billing remain blocked."]
];

const adminLinks = ["/admin/gates", "/admin/workflows", "/admin/receipts"];

export default function ShopifyPage() {
  return (
    <main className="eden-site">
      <Header />
      <section className="home-hero">
        <div className="hero-copy">
          <h1>
            Shopify.
            <br />
            <span>Models.</span>
            <br />
            Faceless.
          </h1>
          <p>
            Draft-safe commerce and autonomous content creation flow for Eden Skye Studios. This remains the Shopify Black Card Control Page, Draft/test product spec, and Xyla AI Shopify Automation control surface for draft-only product, model, and faceless content planning.
          </p>
          <div className="hero-actions">
            <a className="hot-btn" href="/payment">
              Open Black Card
            </a>
            <a className="outline-btn" href="/models">
              View Models
            </a>
            <a className="outline-btn" href="/faceless">
              View Faceless
            </a>
          </div>
          <div className="hero-stats">
            <span>
              6<small>Female Models</small>
            </span>
            <span>
              120+<small>Male Draft Slots</small>
            </span>
            <span>
              3<small>Faceless Pages</small>
            </span>
            <span>
              Draft<small>Shopify Flow</small>
            </span>
          </div>
          <p className="pink" style={{ marginTop: 18 }}>
            Live payment Locked
          </p>
        </div>
        <img className="hero-image" src={standaloneAssets.homeHero.src} alt="Eden Skye Shopify hero source" />
      </section>

      <section className="difference">
        <p>Shopify Flow</p>
        <div>
          {featuredProducts.map((item) => (
            <article key={item.name}>
              <strong>{item.name}</strong>
              <span>{item.body}</span>
              <a href={item.href}>Open</a>
            </article>
          ))}
        </div>
      </section>

      <section className="models-band">
        <h2>Female Model Catalog</h2>
        <a href="/models">View all models</a>
        <div className="model-row">
          {models.map((model) => (
            <a key={model.slug} className="model-card" href={`/models/${model.slug}/portfolio`}>
              <img src={model.image} alt={`${model.name} generated standalone source`} />
              <span>
                <strong>{model.name}</strong>
                <em>{model.location}</em>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="difference">
        <p>Faceless Social Pages</p>
        <div>
          {facelessCards.map((item) => (
            <article key={item.name}>
              <strong>{item.name}</strong>
              <span>{item.body}</span>
              <a href={item.href}>Open Faceless Page</a>
            </article>
          ))}
        </div>
      </section>

      <section className="models-band">
        <h2>Male model catalog planning</h2>
        <a href="/admin/approval-studio">Review source pending</a>
        <div className="model-row">
          {maleRoster.map((item) => (
            <a key={item.name} className="model-card" href={item.href}>
              <img src={standaloneAssets.homeHero.src} alt="Draft male roster placeholder source" />
              <span>
                <strong>{item.name}</strong>
                <em>{item.body}</em>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="service-row">
        <article>
          <img src={standaloneAssets.closetFullBody.src} alt="Generated standalone closet source" />
          <div>
            <h3>Eden's Closet</h3>
            <p>Click through to wardrobe, outfit, environment, and video/chat flows.</p>
            <a href="/closet">Open Closet</a>
          </div>
        </article>
        <article>
          <h3>Xyla AI Shopify Automation</h3>
          <p>Draft product packets, collection packets, and content/social hooks for autonomous creation.</p>
          <a href="/admin/approval-studio">Open Approval Studio</a>
        </article>
        <article>
          <img src={standaloneAssets.aiChat.src} alt="Generated standalone AI chat source" />
          <div>
            <h3>Products</h3>
            <p>Black Card, closet access, portfolios, and content packs with approval-gated paths.</p>
            <a href="/payment">Open Payment</a>
          </div>
        </article>
      </section>

      <section className="pricing-grid">
        {xylaPanels.map(([label, body]) => (
          <article className="price-card" key={label}>
            <span>{label}</span>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <section className="black-card-cta">
        <p className="pink">Protected Flow</p>
        <h2>Click through to portfolios, faceless pages, products, and closet experiences without live mutation.</h2>
        <div className="hero-actions" style={{ justifyContent: "center" }}>
          <a className="hot-btn" href="/dashboard">
            Dashboard
          </a>
          {adminLinks.map((href) => (
            <a key={href} className="outline-btn" href={href}>
              {href}
            </a>
          ))}
        </div>
        <small>Live Shopify product/payment/theme/discount/inventory mutation remains locked until approval.</small>
        <small>No live Shopify product/payment mutation.</small>
        <small>no live Shopify product/payment mutation.</small>
        <small>no live Shopify product/payment/theme/discount/inventory mutation.</small>
        <small>Live Shopify product mutation blocked.</small>
      </section>
    </main>
  );
}
