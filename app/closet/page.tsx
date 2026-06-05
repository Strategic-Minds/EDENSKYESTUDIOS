const models = [
  { name: 'Amara Vale', country: 'Brazil', tone: 'velvet confidence', outfit: 'black satin set', status: 'Approved', risk: 'good' },
  { name: 'Mina Sol', country: 'Morocco', tone: 'warm midnight', outfit: 'silver robe preview', status: 'Review', risk: 'warn' },
  { name: 'Lena Frost', country: 'Germany', tone: 'cool editorial', outfit: 'white lace layer', status: 'Draft', risk: 'warn' },
  { name: 'Sora Kim', country: 'Korea', tone: 'soft precision', outfit: 'hot pink studio set', status: 'Approved', risk: 'good' },
  { name: 'Nia Monroe', country: 'United States', tone: 'deep luxury', outfit: 'purple lounge look', status: 'Action', risk: 'bad' },
  { name: 'Isla Noire', country: 'France', tone: 'private club', outfit: 'black card editorial', status: 'Review', risk: 'warn' }
];

const approvals = [
  ['Wardrobe Preview', 'Mina Sol silver robe look', 'Revise background, then approve for vault.', 'warn'],
  ['Social Drafts', 'Brazil / Instagram reel batch', 'Approve draft handoff to Metricool only.', 'good'],
  ['Voice Intro', 'Eden Black Card welcome', 'Safe to use in app preview.', 'good'],
  ['Live Avatar', 'Private HeyGen session request', 'Hold until channel and entitlement gates are wired.', 'bad']
];

const workflow = [
  ['Supabase', 'Schema packet ready. Migration still approval-gated.', 'warn'],
  ['Vercel', 'Preview branch prepared for Eden Closet route.', 'good'],
  ['n8n', 'Workflow map ready. Activation requires approval.', 'warn'],
  ['Slack', '#eden-skye-studios not visible to connector yet.', 'bad']
];

export default function ClosetPreviewPage() {
  return (
    <main className="closet-shell">
      <header className="closet-hero">
        <nav className="closet-nav" aria-label="Eden Closet navigation">
          <a href="/">Studio Home</a>
          <a href="#models">Models</a>
          <a href="#approvals">Approvals</a>
          <a href="#workflow">Workflow</a>
        </nav>
        <section className="closet-hero-grid">
          <div>
            <p className="closet-kicker">Eden Skye Studios</p>
            <h1>Eden&apos;s Closet Black Card Control Plane</h1>
            <p className="closet-copy">
              A mobile-first preview of the model vault, wardrobe requests, Eden voice/chat controls, approval theater, and Auto Builder workflow gates.
            </p>
            <div className="closet-actions">
              <a className="closet-button primary" href="#approvals">Review Approvals</a>
              <a className="closet-button" href="#workflow">System Status</a>
            </div>
          </div>
          <aside className="closet-status-card" aria-label="Readiness summary">
            <span className="status-pill good">Preview Ready</span>
            <h2>Sandbox Loop</h2>
            <p>Pick model - change look - preview media - Eden recommends action - approve - create drafts - log receipt.</p>
            <div className="status-row"><span>Publishing</span><strong className="danger-text">Locked</strong></div>
            <div className="status-row"><span>Shopify</span><strong className="warn-text">Draft only</strong></div>
            <div className="status-row"><span>HeyGen</span><strong className="warn-text">Approval gate</strong></div>
          </aside>
        </section>
      </header>

      <section className="closet-section" id="models">
        <div className="section-heading">
          <p className="closet-kicker">Model Vault</p>
          <h2>Every model stays visible, with her profile and next action.</h2>
        </div>
        <div className="model-grid">
          {models.map((model, index) => (
            <article className="model-card" key={model.name}>
              <div className={`model-portrait portrait-${index + 1}`} aria-hidden="true">
                <span>{model.name.split(' ').map((part) => part[0]).join('')}</span>
              </div>
              <div className="model-info">
                <div className="model-topline">
                  <h3>{model.name}</h3>
                  <span className={`status-pill ${model.risk}`}>{model.status}</span>
                </div>
                <p>{model.country} / {model.tone}</p>
                <p className="outfit">Current: {model.outfit}</p>
                <div className="mini-actions">
                  <button type="button">Voice</button>
                  <button type="button">Change Look</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="closet-section approval-stage" id="approvals">
        <div className="section-heading">
          <p className="closet-kicker">Approval Theater</p>
          <h2>Human approval controls every image, video, sound, caption, product, schedule, and live release.</h2>
        </div>
        <div className="approval-list">
          {approvals.map(([type, title, recommendation, risk]) => (
            <article className="approval-card" key={title}>
              <div>
                <span className={`status-pill ${risk}`}>{type}</span>
                <h3>{title}</h3>
                <p>{recommendation}</p>
              </div>
              <div className="approval-media">Preview</div>
              <div className="approval-buttons">
                <button type="button" className="approve">Approve</button>
                <button type="button">Revise</button>
                <button type="button" className="reject">Reject</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="closet-section" id="workflow">
        <div className="section-heading">
          <p className="closet-kicker">Automation Engine</p>
          <h2>Auto Builder, Vercel, Supabase, n8n, Metricool, Klaviyo, Shopify, and HeyGen stay governed by receipts.</h2>
        </div>
        <div className="workflow-grid">
          {workflow.map(([system, note, risk]) => (
            <article className="workflow-card" key={system}>
              <span className={`status-dot ${risk}`} />
              <h3>{system}</h3>
              <p>{note}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
