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
  ['Preview UI patch', 'Expanded'],
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

const launchLanes = [
  ['Audience capture', 'Brand kit lead magnet', 'Private preview copy ready'],
  ['Entry offer', 'AI avatar starter kit', 'Draft offer, no checkout'],
  ['Setup service', 'Done-with-you launch setup', 'Scope pending approval'],
  ['Retainer path', 'Monthly content operations', 'Requires signal first']
];

const contentQueue = [
  ['Hook batch', '24 short-form hooks', 'Draft'],
  ['Caption batch', '12 caption variants', 'Needs QA'],
  ['Lookbook drop', '6 carousel concepts', 'Media review'],
  ['Email sequence', '5 lead magnet emails', 'Draft']
];

const engagementDrafts = [
  ['Inbound comment', 'Thanks for asking. The starter kit is private preview only right now.', 'Needs owner review'],
  ['Collab inquiry', 'Send the brand kit and request usage context before quoting.', 'Draft'],
  ['Media request', 'Route to rights review before sharing any source reference.', 'Blocked'],
  ['Support question', 'Clarify synthetic model disclosure and approval gates.', 'Draft']
];

const experiments = [
  ['Hero CTA', 'Brand kit vs control plane', 'Awaiting traffic'],
  ['Offer ladder', 'Starter kit vs setup call', 'Draft only'],
  ['Visual angle', 'Lookbook grid vs brand stack', 'Ready for preview'],
  ['Channel test', 'Metricool vs Xyla path', 'Connector smoke required']
];

const agentOps = [
  ['Content Agent', 'Drafts queued', 'Class 2'],
  ['Media QA Agent', 'Rights review pending', 'Class 2'],
  ['Distribution Agent', 'External writes locked', 'Class 4 blocked'],
  ['Revenue Agent', 'Offer math draft', 'Class 2'],
  ['Recovery Agent', 'No failed browser QA', 'Observe'],
  ['Memory Agent', 'Receipts updated', 'Observe']
];

const revenueSteps = [
  ['Lead magnet', 'Free AI Avatar Brand Kit', 'Capture demand before spend'],
  ['Entry product', 'Starter templates and prompt pack', 'No checkout until approved'],
  ['Service', 'Avatar brand setup sprint', 'Manual close after signal'],
  ['Retainer', 'Monthly content and approval ops', 'Scale only after evidence']
];

const canonicalAssets = [
  ['ess-vis-001', 'Public home hero', 'public_site_reference', assets.hero, 'private_design_reference_until_approved', true, false],
  ['ess-vis-002', 'Lookbook grid', 'public_site_reference', assets.lookbook, 'private_design_reference_until_approved', false, false],
  ['ess-vis-003', 'Avatar matrix', 'avatar_reference_matrix', assets.avatarMatrix, 'private_generation_reference_until_approved', false, false],
  ['ess-vis-004', 'Admin brand dashboard', 'admin_control_plane_reference', assets.command, 'private_design_reference_until_approved', false, false],
  ['ess-vis-005', 'Brand download page', 'lead_magnet_reference', assets.brandKit, 'private_design_reference_until_approved', false, false],
  ['ess-vis-006', 'Model card gallery', 'model_registry_reference', assets.modelGallery, 'private_registry_reference_until_approved', false, false],
  ['ess-vis-007', 'Brand full stack', 'public_site_reference', assets.publicStack, 'private_design_reference_until_approved', false, false],
  ['ess-vis-008', 'Vertical admin flow', 'mobile_or_longform_admin_reference', assets.mobileAdmin, 'private_design_reference_until_approved', false, true],
  ['ess-vis-009', 'Avatar brand board', 'avatar_reference_matrix', assets.avatarBoard, 'private_generation_reference_until_approved', false, false],
  ['ess-vis-010', 'Full-body reference', 'avatar_reference_matrix', assets.fullBody, 'private_generation_reference_until_approved', false, false],
  ['ess-vis-011', 'Admin ops overview', 'admin_control_plane_reference', assets.ops, 'private_design_reference_until_approved', false, false],
  ['ess-vis-012', 'Media library', 'admin_control_plane_reference', assets.media, 'private_design_reference_until_approved', false, false],
  ['ess-vis-013', 'Content calendar', 'admin_control_plane_reference', assets.calendar, 'private_design_reference_until_approved', false, false]
] as const;

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
          <a href="#launch-board">Launch</a>
          <a href="#command-center">Command</a>
          <a href="#media-library">Media</a>
          <a href="#asset-vault">Assets</a>
          <a href="#engagement-desk">Engage</a>
          <a href="#agent-ops">Ops</a>
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
          <p>The preview now models the public funnel, admin queues, engagement drafts, experiments, agent ops, and canonical visual vault without unlocking publication.</p>
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

      <section id="launch-board" className={styles.splitSection}>
        <figure className={styles.imagePanel}>
          <img src={assets.publicStack} alt="Eden Skye public brand system visual reference" />
          <figcaption>Public preview stack for offer, proof, and audience capture.</figcaption>
        </figure>
        <div>
          <p className={styles.eyebrow}>Launch Board</p>
          <h2>Preview the revenue path before any checkout or publishing unlock.</h2>
          <p>Each step stays as a draft surface until evidence, rights review, and owner approval move it forward.</p>
          <div className={styles.connectorList}>{launchLanes.map(([name, focus, status]) => <div key={name}><b>{name}</b><span>{focus}</span><span>{status}</span></div>)}</div>
        </div>
      </section>

      <section id="command-center" className={styles.workspace}>
        <aside className={styles.rail}>
          <span>Control Plane</span>
          <a href="#command-center">Today</a>
          <a href="#launch-board">Launch Board</a>
          <a href="#model-registry">Model Registry</a>
          <a href="#media-library">Media Library</a>
          <a href="#asset-vault">Asset Vault</a>
          <a href="#approval-queue">Approval Queue</a>
          <a href="#content-calendar">Content Calendar</a>
          <a href="#engagement-desk">Engagement Desk</a>
          <a href="#experiment-lab">Experiment Lab</a>
          <a href="#agent-ops">Agent Ops</a>
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

          <section id="asset-vault" className={styles.workSection}>
            <div className={styles.sectionRow}><div><p className={styles.eyebrow}>Canonical visual references</p><h2>Asset Vault</h2></div><span className={styles.lockPill}>13 assets visible</span></div>
            <div className={styles.assetVaultGrid} aria-label="All canonical Eden visual references">
              {canonicalAssets.map(([id, label, role, src, usage, feature, tall]) => (
                <figure className={`${styles.assetCard} ${feature ? styles.featureAsset : ''} ${tall ? styles.tallAsset : ''}`} key={id}>
                  <img src={src} alt={`${label} visual reference`} />
                  <figcaption>
                    <b>{id}</b>
                    <span>{label}</span>
                    <small>{role}</small>
                    <em>{usage}</em>
                  </figcaption>
                </figure>
              ))}
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

          <section id="content-studio" className={styles.workSection}>
            <div className={styles.sectionRow}><div><p className={styles.eyebrow}>Content operations</p><h2>Content Studio</h2></div><span className={styles.lockPill}>Draft assets only</span></div>
            <div className={styles.table}>{contentQueue.map((row) => <div key={row[0]}>{row.map((cell) => <span key={cell}>{cell}</span>)}</div>)}</div>
          </section>

          <section id="engagement-desk" className={styles.workSection}>
            <div className={styles.sectionRow}><div><p className={styles.eyebrow}>Inbox governance</p><h2>Engagement Desk</h2></div><span className={styles.dangerPill}>Outbound locked</span></div>
            <div className={styles.table}>{engagementDrafts.map((row) => <div key={row[0]}>{row.map((cell) => <span key={cell}>{cell}</span>)}</div>)}</div>
          </section>

          <section id="experiment-lab" className={styles.workSection}>
            <div className={styles.sectionRow}><div><p className={styles.eyebrow}>Optimization</p><h2>Experiment Lab</h2></div><span className={styles.lockPill}>Preview hypotheses</span></div>
            <div className={styles.approvals}>{experiments.map(([name, hypothesis, state]) => <article key={name}><span>Test</span><h3>{name}</h3><p>{hypothesis}</p><button disabled>{state}</button></article>)}</div>
          </section>

          <section id="agent-ops" className={styles.workSection}>
            <div className={styles.sectionRow}><div><p className={styles.eyebrow}>Orchestration</p><h2>Agent Ops</h2></div><span className={styles.lockPill}>Receipt-backed preview</span></div>
            <div className={styles.connectorList}>{agentOps.map(([agent, state, gate]) => <div key={agent}><b>{agent}</b><span>{state}</span><span>{gate}</span></div>)}</div>
          </section>

          <section id="revenue-funnel" className={styles.workSection}>
            <div className={styles.sectionRow}><div><p className={styles.eyebrow}>Monetization path</p><h2>Revenue Funnel</h2></div><span className={styles.dangerPill}>Checkout locked</span></div>
            <ol className={styles.calendar}>{revenueSteps.map(([step, offer, rule]) => <li key={step}><span>{step}</span>{offer} - {rule}</li>)}</ol>
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
