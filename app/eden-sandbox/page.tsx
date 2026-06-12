import styles from './page.module.css';

const assets = {
  hero: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-001-public-home-hero-wide.png?v=1781224815',
  lookbook: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-002-public-lookbook-grid.png?v=1781224831',
  avatarMatrix: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-003-avatar-reference-matrix.png?v=1781224848',
  command: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-004-admin-brand-dashboard.png?v=1781224856',
  brandKit: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-005-brand-download-page.png?v=1781224866',
  modelGallery: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-006-model-card-gallery.png?v=1781224881',
  publicStack: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-007-public-brand-full-stack.png?v=1781224889',
  mobileAdmin: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-008-vertical-admin-flow.png?v=1781224898',
  avatarBoard: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-009-avatar-brand-board.png?v=1781224915',
  fullBody: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-010-avatar-full-body-reference.png?v=1781224924',
  ops: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-011-admin-ops-overview.png?v=1781224933',
  media: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-012-media-library-dashboard.png?v=1781224947',
  calendar: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-013-content-calendar-dashboard.png?v=1781224960'
};

const stats = [
  ['Queued drafts', '160'],
  ['Missing media', '160'],
  ['Blocked children', '4'],
  ['Receipts', '25']
];

const tasks = [
  ['Asset manifest', 'Complete'],
  ['Shopify CDN media hosting', 'Complete'],
  ['Preview UI patch', 'In review'],
  ['Connector smoke', 'Blocked']
];

const models = [
  ['Eden Core', 'Reference only', 'Needs rights review'],
  ['Fitness Set', 'Draft profile', 'Private mockup only'],
  ['Luxury Set', 'Draft profile', 'Approval required'],
  ['Creator Set', 'Missing media', 'Queue retry']
];

const assetStates = [
  'reference_only',
  'needs_rights_review',
  'approved_for_private_mockup',
  'approved_for_public_preview',
  'approved_for_live_publish'
];

const calendar = [
  ['08:00', 'Trend scan and hook selection'],
  ['09:00', 'Scripts, captions, and briefs'],
  ['12:00', 'QA and approval queue'],
  ['14:00', 'Schedule approved drafts only'],
  ['21:00', 'Analytics capture']
];

const connectors = [
  ['Shopify media', '13 canonical URLs hosted'],
  ['Metricool', 'Needs token/brand smoke'],
  ['Xyla', 'Install path unverified'],
  ['HeyGen', 'Avatar list smoke queued'],
  ['Higgsfield', 'MCP connection smoke queued'],
  ['Supabase', 'Preview/dev only']
];

const visualProof = [
  ['Public lookbook', assets.lookbook],
  ['Brand system', assets.publicStack],
  ['Avatar matrix', assets.avatarMatrix],
  ['Avatar board', assets.avatarBoard],
  ['Full-body reference', assets.fullBody],
  ['Mobile admin flow', assets.mobileAdmin]
];

export const metadata = {
  title: 'Eden Skye Sandbox | AUTO BUILDER',
  description: 'Branch-safe Eden Skye visual and admin sandbox with approval-gated controls.'
};

export default function EdenSandboxPage() {
  return (
    <main className={styles.shell}>
      <header className={styles.topbar}>
        <a className={styles.brand} href="#home"><span>ES</span>Eden Skye Studios</a>
        <nav>
          <a href="#home">Site</a>
          <a href="#command-center">Command</a>
          <a href="#model-registry">Models</a>
          <a href="#media-library">Media</a>
          <a href="#approval-queue">Approvals</a>
          <a href="#content-calendar">Calendar</a>
        </nav>
        <a className={styles.topAction} href="#approval-queue">Review Gates</a>
      </header>

      <section id="home" className={styles.hero}>
        <div className={styles.heroImage} style={{ backgroundImage: `url(${assets.hero})` }} />
        <div className={styles.heroShade} />
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>Synthetic avatar content studio</p>
          <h1>Eden Skye Studios</h1>
          <p>Build original AI model brands, draft campaign assets, and route every launch through approvals before anything goes live.</p>
          <div className={styles.actions}>
            <a href="#lead-magnet">Get the Free AI Avatar Brand Kit</a>
            <a href="#command-center">Open Control Plane</a>
          </div>
        </div>
      </section>

      <section id="lead-magnet" className={styles.splitSection}>
        <div>
          <p className={styles.eyebrow}>Draft-first revenue path</p>
          <h2>Offer, visuals, calendar, and approvals in one governed loop.</h2>
          <p>The sandbox now renders all 13 canonical uploaded references from Shopify-hosted media URLs while keeping publication gates locked.</p>
        </div>
        <figure className={styles.imagePanel}>
          <img src={assets.brandKit} alt="Eden Skye brand kit download page visual reference" />
          <figcaption>Lead magnet visual: hosted, reference-gated, not live-publish approved.</figcaption>
        </figure>
      </section>

      <section className={styles.visualMosaic} aria-label="Canonical Eden visual references">
        {visualProof.map(([label, src]) => (
          <figure key={label}>
            <img src={src} alt={`${label} visual reference`} />
            <figcaption>{label}</figcaption>
          </figure>
        ))}
      </section>

      <section id="command-center" className={styles.workspace}>
        <aside className={styles.rail}>
          <span>Control Plane</span>
          <a href="#command-center">Today</a>
          <a href="#model-registry">Model Registry</a>
          <a href="#media-library">Media Library</a>
          <a href="#approval-queue">Approval Queue</a>
          <a href="#content-calendar">Content Calendar</a>
          <a href="#analytics">Analytics</a>
          <a href="#connectors">Connectors</a>
        </aside>

        <div className={styles.workMain}>
          <section className={styles.workHeader}>
            <div><p className={styles.eyebrow}>Preview sandbox</p><h2>Today Command Center</h2></div>
            <span className={styles.lockPill}>External writes locked</span>
          </section>

          <section className={styles.statusStrip}>{stats.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</section>

          <section className={styles.operatorGrid}>
            <article className={styles.panelWide}>
              <p className={styles.eyebrow}>Operating snapshot</p>
              <h3>Branch-safe visual/admin scaffold</h3>
              <p>This preview route uses hosted canonical visuals without production deploy, external publishing, checkout activation, paid generation, or database mutation.</p>
              <img src={assets.command} alt="Eden command center visual reference" />
            </article>
            <article className={styles.panel}>
              <p className={styles.eyebrow}>Next safe jobs</p>
              <ul>{tasks.map(([task, state]) => <li key={task}><b>{task}</b><span>{state}</span></li>)}</ul>
            </article>
          </section>

          <section id="model-registry" className={styles.workSection}>
            <div className={styles.sectionRow}><div><p className={styles.eyebrow}>Registry</p><h2>Model Registry</h2></div><span className={styles.lockPill}>Rights review required</span></div>
            <div className={styles.mediaGrid}>
              <img src={assets.modelGallery} alt="Eden model card gallery visual reference" />
              <div className={styles.table}>{models.map((row) => <div key={row[0]}>{row.map((cell) => <span key={cell}>{cell}</span>)}</div>)}</div>
            </div>
          </section>

          <section id="media-library" className={styles.workSection}>
            <div className={styles.sectionRow}><div><p className={styles.eyebrow}>Asset operations</p><h2>Media Library</h2></div><span className={styles.lockPill}>13 unique references</span></div>
            <div className={styles.mediaGrid}>
              <img src={assets.media} alt="Eden media library dashboard visual reference" />
              <div className={styles.assetStates}>{assetStates.map((state) => <span key={state}>{state}</span>)}</div>
            </div>
          </section>

          <section id="approval-queue" className={styles.workSection}>
            <div className={styles.sectionRow}><div><p className={styles.eyebrow}>Governance</p><h2>Approval Queue</h2></div><span className={styles.dangerPill}>Live publish blocked</span></div>
            <div className={styles.approvals}>
              <article><span>Class 2</span><h3>Internal draft batch</h3><p>Create draft posts and attach mock media references.</p><button>Approve Draft</button></article>
              <article><span>Class 3</span><h3>Paid generation</h3><p>Requires cost estimate, provider scope, and owner approval.</p><button disabled>Blocked</button></article>
              <article><span>Class 4</span><h3>External publish</h3><p>Social, Shopify, checkout, and production deploy stay locked.</p><button disabled>Blocked</button></article>
            </div>
          </section>

          <section id="content-calendar" className={styles.workSection}>
            <div className={styles.sectionRow}><div><p className={styles.eyebrow}>Distribution</p><h2>Content Calendar</h2></div><span className={styles.lockPill}>Draft scheduling only</span></div>
            <div className={styles.mediaGrid}>
              <img src={assets.calendar} alt="Eden content calendar dashboard visual reference" />
              <ol className={styles.calendar}>{calendar.map(([time, item]) => <li key={time}><span>{time}</span>{item}</li>)}</ol>
            </div>
          </section>

          <section id="analytics" className={styles.workSection}>
            <div className={styles.sectionRow}><div><p className={styles.eyebrow}>Observe mode</p><h2>Analytics</h2></div><span className={styles.lockPill}>Mock preview data</span></div>
            <section className={styles.statusStrip}><div><span>Draft CTR target</span><strong>2.5%</strong></div><div><span>Lead magnet goal</span><strong>25/wk</strong></div><div><span>Approval SLA</span><strong>24h</strong></div><div><span>Kill threshold</span><strong>3 tests</strong></div></section>
          </section>

          <section id="connectors" className={styles.workSection}>
            <div className={styles.sectionRow}><div><p className={styles.eyebrow}>Connector readiness</p><h2>Status Panel</h2></div><span className={styles.dangerPill}>Production mutation gated</span></div>
            <div className={styles.connectorList}>{connectors.map(([name, status]) => <div key={name}><b>{name}</b><span>{status}</span></div>)}</div>
          </section>
        </div>
      </section>
    </main>
  );
}
