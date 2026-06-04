import styles from "./mockup.module.css";

const collections = [
  "The Eden Edit",
  "Beauty & Ritual",
  "Studio Tools",
  "Digital Brand Kits",
  "Luxury Lifestyle",
  "Limited Finds"
];

const offers = [
  ["Products", "Curated ritual, desk, beauty, lighting, wellness, and giftable finds."],
  ["Services", "Studio strategy, AI creator setup, content operations, and launch support."],
  ["Downloads", "Prompt packs, brand kits, content calendars, scripts, and operating sheets."],
  ["Apps", "AI chat surfaces, gated client tools, media review flows, and workflow dashboards."],
  ["Licenses", "Governed fictional AI model media kits, campaigns, and commercial-use assets."]
];

const gates = [
  ["Deploy", "Approval required", "Production stays locked"],
  ["Shopify", "Draft mode", "No product mutation"],
  ["Supabase", "Readiness verified", "No schema mutation"],
  ["Social", "Draft queue only", "No public posting"],
  ["Payments", "Locked", "No pricing changes"]
];

const workflow = [
  "Intake",
  "Plan",
  "Sandbox",
  "Validate",
  "Approve",
  "Promote",
  "Measure"
];

export default function WebsiteMockup() {
  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <a className={styles.brand} href="/">
          <span>ES</span>
          <strong>Eden Skye Studios</strong>
        </a>
        <nav className={styles.nav} aria-label="Mockup navigation">
          <a href="#storefront">Storefront</a>
          <a href="#closet">Edens Closet</a>
          <a href="#gates">Live gates</a>
          <a href="/admin/eden">Open control plane</a>
        </nav>
      </header>

      <section className={styles.hero} aria-labelledby="mockup-title">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Locked Drive brand pack applied</p>
          <h1 id="mockup-title">Eden Skye Studios</h1>
          <p>
            A cinematic AI luxury studio and curated commerce world for products, services, downloads, apps,
            licensing, and governed digital model operations.
          </p>
          <div className={styles.actions}>
            <a href="#storefront">Review storefront</a>
            <a href="#closet">Review Edens Closet</a>
          </div>
        </div>
        <figure className={styles.brandBoard}>
          <img src="/brand/eden-brand-board.svg" alt="Eden Skye Studios locked brand board rendered from Drive direction" />
          <figcaption>Brand pack source: clean ES mark, Belleza direction, Montserrat support, neutral luxury palette.</figcaption>
        </figure>
      </section>

      <section className={styles.storefront} id="storefront">
        <div className={styles.sectionLabel}>
          <p className={styles.kicker}>Storefront architecture</p>
          <h2>Premium Shopify-ready homepage, not a generic catalog.</h2>
        </div>
        <div className={styles.commerceRunway}>
          <div className={styles.editorialImage} aria-label="Neutral luxury website image treatment">
            <span>website-01-homepage-hero-neutral-luxury.png</span>
          </div>
          <div className={styles.collectionList}>
            <p>The Eden Edit leads the shop, supported by ritual, tools, digital kits, lifestyle, and limited-find collections.</p>
            {collections.map((collection) => (
              <a key={collection} href="/admin/eden">
                {collection}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.offerSection}>
        <div className={styles.sectionLabel}>
          <p className={styles.kicker}>Revenue paths</p>
          <h2>Every sellable lane has a draft, asset, gate, and owner.</h2>
        </div>
        <div className={styles.offerGrid}>
          {offers.map(([title, copy]) => (
            <article key={title} className={styles.offerPanel}>
              <span>{title}</span>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.controlPlane} id="closet">
        <aside className={styles.chatRail}>
          <div className={styles.chatTitle}>
            <span>AI Gateway</span>
            <strong>Edens Closet</strong>
          </div>
          <div className={styles.messageActive}>Build a product page from the Drive brand pack.</div>
          <div>Draft social assets for The Eden Edit.</div>
          <div>Check live gates before promotion.</div>
          <form className={styles.chatInput}>
            <input aria-label="Chat prompt mockup" value="Ask Eden to route the next workflow..." readOnly />
            <button type="button">Send</button>
          </form>
        </aside>
        <div className={styles.workspace}>
          <div className={styles.workspaceTop}>
            <div>
              <p className={styles.kicker}>Center workspace</p>
              <h2>Images, videos, files, folders, edits, workflows.</h2>
            </div>
            <span>Live refresh ready</span>
          </div>
          <div className={styles.assetWall}>
            <div>Images</div>
            <div>Videos</div>
            <div>Files</div>
            <div>Folders</div>
            <div>Edits</div>
            <div>Receipts</div>
          </div>
          <div className={styles.workflowLine}>
            {workflow.map((step) => (
              <span key={step}>{step}</span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.gates} id="gates">
        <div className={styles.sectionLabel}>
          <p className={styles.kicker}>Approval firewall</p>
          <h2>Real-time gates stay visible before anything goes live.</h2>
        </div>
        <div className={styles.gateTable}>
          {gates.map(([name, state, detail]) => (
            <div className={styles.gateRow} key={name}>
              <strong>{name}</strong>
              <span>{state}</span>
              <small>{detail}</small>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
