const offers = [
  {
    title: "Digital Model Licensing",
    copy: "Book governed synthetic talent for luxury campaigns, product shots, explainers, and creator-led media.",
    price: "Application"
  },
  {
    title: "Downloads and Toolkits",
    copy: "Prompt packs, content systems, creator templates, offer sheets, and production guides.",
    price: "From $29"
  },
  {
    title: "Apps and Experiences",
    copy: "AI chat, visual avatar flows, gated client tools, and commerce-connected microsystems.",
    price: "Custom"
  },
  {
    title: "Done-With-You Studio",
    copy: "Strategy, creative direction, media planning, and launch support for premium AI creator brands.",
    price: "Retainer"
  }
];

const products = [
  "AI model media kits",
  "Commercial-use prompt packs",
  "Luxury content calendars",
  "Avatar campaign scripts",
  "Shopify offer systems",
  "Licensing metadata templates"
];

const proof = [
  ["Draft-first", "Every public move sits behind approval gates."],
  ["Commerce-ready", "Products, services, downloads, apps, and licenses are mapped to revenue paths."],
  ["Control-plane led", "Eden's Closet routes work through chat, queues, files, media, and workflow states."],
  ["Synthetic-safe", "Fictional adult identity rules and brand-safety metadata are built into the system."]
];

export default function Home() {
  return (
    <main className="site-shell">
      <nav className="topbar">
        <a className="brand-mark" href="/">
          <span>ES</span>
          Eden Skye Studios
        </a>
        <div className="nav-links">
          <a href="#offers">Offers</a>
          <a href="#products">Downloads</a>
          <a href="#licensing">Licensing</a>
          <a href="/mockup">Mockup</a>
          <a className="nav-action" href="/admin/eden">
            Edens Closet
          </a>
        </div>
      </nav>

      <section className="hero-stage">
        <div className="hero-copy">
          <p className="eyebrow">AI luxury creator studio</p>
          <h1>Eden Skye Studios</h1>
          <p className="hero-line">
            A governed digital modeling agency built to sell products, services, downloads, apps, licenses, and premium synthetic media.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#offers">
              Explore offers
            </a>
            <a className="secondary-action" href="/admin/eden">
              Open control plane
            </a>
            <a className="secondary-action" href="/mockup">
              View brand mockup
            </a>
          </div>
        </div>
        <div className="hero-visual" aria-label="Eden Skye metallic studio visual">
          <div className="chrome-figure">
            <div className="figure-head" />
            <div className="figure-body" />
          </div>
          <div className="hero-metrics">
            <span>STUB_ONLY</span>
            <strong>Human-gated commerce</strong>
          </div>
        </div>
      </section>

      <section className="commerce-band" id="offers">
        <div className="section-heading">
          <p className="eyebrow">Revenue architecture</p>
          <h2>Built to sell without losing governance.</h2>
        </div>
        <div className="offer-grid">
          {offers.map((offer) => (
            <article className="offer-panel" key={offer.title}>
              <div>
                <span>{offer.price}</span>
                <h3>{offer.title}</h3>
              </div>
              <p>{offer.copy}</p>
              <a href="/admin/eden">Draft in Edens Closet</a>
            </article>
          ))}
        </div>
      </section>

      <section className="product-runway" id="products">
        <div>
          <p className="eyebrow">Product catalog</p>
          <h2>Downloads, apps, services, and licensing paths in one commerce system.</h2>
        </div>
        <div className="product-list">
          {products.map((product) => (
            <span key={product}>{product}</span>
          ))}
        </div>
      </section>

      <section className="licensing-section" id="licensing">
        <div className="licensing-copy">
          <p className="eyebrow">Agency-grade control</p>
          <h2>Every asset has a gate, owner, status, and monetization path.</h2>
          <p>
            Eden Skye Studios is structured for premium fictional AI talent: media kits, prompt packs, synthetic identity disclosures,
            approval receipts, platform limits, and commercial-use metadata.
          </p>
        </div>
        <div className="proof-list">
          {proof.map(([title, copy]) => (
            <div className="proof-row" key={title}>
              <strong>{title}</strong>
              <span>{copy}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <p className="eyebrow">Private preproduction</p>
        <h2>Move from idea to gated offer, asset, workflow, and launch review.</h2>
        <a className="primary-action" href="/admin/eden">
          Enter Edens Closet
        </a>
      </section>
    </main>
  );
}
