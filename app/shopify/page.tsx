import { Header, models } from "../components";
import { standaloneAssets } from "../visual-source-truth";

const maleCards = [
  { name: "Source Pending", body: "REQUIRED_SOURCE_PENDING. Use exact male roster only after repo or Drive source verification.", href: "/payment" },
  { name: "Draft Male Catalog Slot", body: "Reserved for sourced male model cards and portfolio links.", href: "/payment" },
  { name: "Draft Male Portfolio", body: "Portfolio layout ready for approved imagery.", href: "/payment" },
  { name: "Draft Male Social", body: "Faceless and brand-safe social flow ready.", href: "/payment" }
];

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
          <h1>Beauty.<br/><span>Influence.</span><br/>Impact.</h1>
          <p>
            We represent elite digital models and content creators. We build iconic brands. We create viral content. We drive results.
          </p>
          <div className="hero-actions">
            <a className="hot-btn" href="/payment">
              Open Black Card
            </a>
            <a className="outline-btn" href="/models">
              View Women
            </a>
            <a className="outline-btn" href="/faceless">
              View Faceless
            </a>
          </div>
          <div className="hero-stats">
            <span>
              100+<small>Models</small>
            </span>
            <span>
              24/7<small>Content</small>
            </span>
            <span>
              Global<small>Reach</small>
            </span>
            <span>
              Premium<small>Brands</small>
            </span>
          </div>
          <p className="pink" style={{ marginTop: 18 }}>Live payment Locked</p>
          <p className="sr-only">Shopify Black Card Control Page. Draft/test product spec. Shopify. Models. Faceless. Black Card. Male model catalog. no live Shopify product/payment/theme/discount/inventory mutation</p>
        </div>
        <img className="hero-image" src={standaloneAssets.homeHero.src} alt="Eden Skye Shopify hero source" />
      </section>

      <section className="difference">
        <p>The Eden Skye Studios Difference</p>
        <div>
          <article><strong>Elite Talent</strong><span>Top digital models and creator personas.</span></article>
          <article><strong>Viral Content</strong><span>High-converting campaign content.</span></article>
          <article><strong>Global Reach</strong><span>Worldwide audience and brand readiness.</span></article>
          <article><strong>Premium Brands</strong><span>Campaigns, licensing, and partnerships.</span></article>
          <article><strong>Maximum Profit</strong><span>Draft-only monetization lanes until approved.</span></article>
        </div>
      </section>

      <section className="difference">
        <p>Women</p>
        <div>
          {models.map((model) => (
            <article key={model.slug}>
              <strong>{model.name}</strong>
              <span>{model.location}</span>
              <a href={`/models/${model.slug}/portfolio`}>Open portfolio</a>
            </article>
          ))}
        </div>
      </section>

      <section className="difference">
        <p>Men</p>
        <div>
          {maleCards.map((item) => (
            <article key={item.name}>
              <strong>{item.name}</strong>
              <span>{item.body}</span>
              <a href={item.href}>Open approval studio</a>
            </article>
          ))}
        </div>
      </section>

      <section className="difference">
        <p>Faceless</p>
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

      <section className="difference">
        <p>Products</p>
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
          <a href="/payment">Open Draft Checkout</a>
        </article>
        <article>
          <img src={standaloneAssets.aiChat.src} alt="Generated standalone AI chat source" />
          <div>
            <h3>Products</h3>
            <p>Black Card, closet access, portfolios, and content packs with approval-gated paths.</p>
            <a href="/success">Open Success</a>
          </div>
        </article>
      </section>

      <section className="models-band">
        <h2>Our Models</h2>
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
          <a className="hot-btn" href="/payment">
            Black Card
          </a>
          <a className="outline-btn" href="/success">
            Success
          </a>
          <a className="outline-btn" href="/closet">
            Closet
          </a>
        </div>
        <small>Live Shopify product/payment/theme/discount/inventory mutation remains locked until approval.</small>
        <small>SHOPIFY_LIVE_PENDING_FINAL_APPROVAL</small>
        <small>no live Shopify product/payment/theme/discount/inventory mutation.</small>
        <small>Live Shopify product mutation blocked.</small>
      </section>
    </main>
  );
}
