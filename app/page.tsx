const creators = [
  ["Eden Skye", "Founder icon", "/brand/creators/eden-skye.svg"],
  ["Solara Vane", "Luxury creator", "/brand/creators/solara-vane.svg"],
  ["Liora Vale", "Editorial muse", "/brand/creators/liora-vale.svg"],
  ["Nova Rain", "Nightlife creator", "/brand/creators/nova-rain.svg"],
  ["Celeste Noir", "Commercial model", "/brand/creators/celeste-noir.svg"]
];

const actions = [
  ["Chat", "Real-time AI creator conversation", "Start chat"],
  ["Video Chat", "Avatar-ready face-to-face workflow", "Open video lane"],
  ["Downloads", "Images, videos, templates, and files", "Browse content"],
  ["Shop", "Luxury products and gated offers", "View shop"],
  ["Licenses", "Commercial-use rights and asset terms", "Review licenses"],
  ["Membership", "Black Card VIP access and perks", "Join waitlist"]
];

const products = [
  ["Black Card Membership", "VIP access", "Waitlist"],
  ["Digital Drops", "Approved downloads", "Coming soon"],
  ["Creator Licenses", "Commercial use", "Review"],
  ["Luxury Lifestyle", "Brand products", "Draft"],
  ["Studio Services", "Application", "Private"],
  ["Creator Apps", "Tools and agents", "Sandbox"]
];

const handoff = [
  ["Sandbox cron", "*/5 * * * *", "Bridge queue worker"],
  ["Auto Builder", "Queued", "Router handoff packet"],
  ["Git", "Branch gated", "No overwrite of other agents"],
  ["Vercel", "Workflow dispatch", "Preview then production"],
  ["Drive", "Source of truth", "Brand lock and mockups"],
  ["Supabase", "Receipts", "Queue and validation storage"]
];

export default function Home() {
  return (
    <main className="site-shell">
      <nav className="topbar storefront-nav">
        <a className="brand-mark luxury-lockup" href="/">
          <span>ES</span>
          <strong>Eden Skye</strong>
          <small>Studios</small>
        </a>
        <div className="nav-links">
          <a href="#creators">Creators</a>
          <a href="#shop">Shop</a>
          <a href="#membership">Membership</a>
          <a href="#licenses">Licenses</a>
          <a href="/admin/eden">Edens Closet</a>
          <a className="nav-action" href="#membership">
            Join now
          </a>
        </div>
      </nav>

      <section className="storefront-hero">
        <img
          className="hero-background"
          src="/brand/mockups/storefront-home-reference.svg"
          alt="Eden Skye Studios storefront mockup with luxury creator and Black Card commerce"
        />
        <div className="hero-scrim" />
        <div className="storefront-hero-copy">
          <p className="eyebrow">Luxury AI creator commerce</p>
          <h1>Luxury. Connection. Freedom.</h1>
          <p>
            Connect with premium fictional creators, gated content, memberships, downloads, product paths, licenses,
            and governed AI media inside one brand-safe storefront.
          </p>
          <div className="hero-actions">
            <a className="primary-action champagne" href="#creators">
              Explore creators
            </a>
            <a className="secondary-action" href="/admin/eden">
              Open Edens Closet
            </a>
          </div>
        </div>
      </section>

      <section className="quick-lanes" aria-label="Storefront lanes">
        {actions.map(([title, copy]) => (
          <a href={title === "Membership" ? "#membership" : "#shop"} key={title}>
            <strong>{title}</strong>
            <span>{copy}</span>
          </a>
        ))}
      </section>

      <section className="creator-strip" id="creators">
        <div className="section-row">
          <div>
            <p className="eyebrow">Meet our creators</p>
            <h2>Premium fictional AI talent, ready for governed media lanes.</h2>
          </div>
          <a href="/admin/eden">Review registry</a>
        </div>
        <div className="creator-grid">
          {creators.map(([name, role, image]) => (
            <article className="creator-card" key={name}>
              <img src={image} alt={`${name} Eden Skye Studios creator reference`} />
              <div>
                <strong>{name}</strong>
                <span>{role}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="black-card-band" id="membership">
        <img
          src="/brand/mockups/black-card-commerce-reference.svg"
          alt="Eden Skye Studios Black Card commerce and brand-lock reference"
        />
        <div>
          <p className="eyebrow">The Black Card</p>
          <h2>VIP membership is the primary commerce anchor.</h2>
          <p>
            The live store must reconcile to Drive and Git source content before Shopify publishing. This page keeps the
            Black Card visible while routing every offer through receipts, gates, and approval review.
          </p>
          <ul>
            <li>Unlimited creator messaging path</li>
            <li>Priority video chat and private content access</li>
            <li>Approved downloads and commercial-use licensing review</li>
            <li>Watermarked public media and receipt-backed production</li>
          </ul>
          <a className="primary-action champagne" href="/admin/eden">
            Route through Edens Closet
          </a>
        </div>
      </section>

      <section className="shop-system" id="shop">
        <div className="section-row">
          <div>
            <p className="eyebrow">Shop architecture</p>
            <h2>Products, services, downloads, apps, and licenses without unsafe mutation.</h2>
          </div>
          <span>Drive/Git source-of-truth required</span>
        </div>
        <div className="product-rail">
          {products.map(([title, type, state]) => (
            <article key={title}>
              <span>{type}</span>
              <strong>{title}</strong>
              <small>{state}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="brand-lock-section" id="licenses">
        <div>
          <p className="eyebrow">Brand lock</p>
          <h2>Black marble, champagne metal, Belleza serif, Montserrat utility, and approved Eden identity assets.</h2>
          <p>
            The uploaded mockups are now mirrored into the Vercel app as the implementation reference pack. Public
            assets must keep the Eden Skye Studios watermark and remain platform-safe, fictional, adult-coded, and
            non-explicit.
          </p>
        </div>
        <img
          src="/brand/mockups/brand-lock-reference.svg"
          alt="Eden Skye visual identity board with logos, palette, typography, icons, banners, and watermark"
        />
      </section>

      <section className="handoff-console">
        <div>
          <p className="eyebrow">Vercel workflow handoff</p>
          <h2>Sandbox-first. Five-minute cron. Receipts before promotion.</h2>
        </div>
        <div className="handoff-grid">
          {handoff.map(([lane, state, note]) => (
            <div key={lane}>
              <span>{lane}</span>
              <strong>{state}</strong>
              <small>{note}</small>
            </div>
          ))}
        </div>
      </section>

      <footer className="studio-footer">
        <a className="brand-mark luxury-lockup" href="/">
          <span>ES</span>
          <strong>Eden Skye</strong>
          <small>Studios</small>
        </a>
        <p>Luxury creator commerce, governed media production, and Black Card membership infrastructure.</p>
        <div>
          <a href="/admin/eden">Control plane</a>
          <a href="#membership">Membership</a>
          <a href="#licenses">Licenses</a>
        </div>
      </footer>
    </main>
  );
}
