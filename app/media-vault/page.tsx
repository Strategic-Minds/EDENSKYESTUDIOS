const vaultRows = [
  ['Google Drive Vault', 'Archive + review source of truth', 'ESS Asset Manifest, model roster, scripts, thumbnails, approval receipts', 'good'],
  ['HeyGen Draft Studio', 'Avatar video creation layer', 'Private Eden avatar draft created; live sessions remain approval-gated', 'warn'],
  ['Public App Display', 'Stable render layer', 'Use approved CDN or Supabase-hosted URLs for images and videos shown in-app', 'warn'],
  ['Publishing Gate', 'Human approval lock', 'No public publishing, Shopify mutation, Klaviyo send, or live release without Jeremy approval', 'bad']
];

const heygenDrafts = [
  ['Eden\'s Closet Black Card Intro - Draft 01', 'f2abdcd817aa4356946153405b549225', 'processing', 'Private intro draft explaining approval flow and Black Card wardrobe wall']
];

const appSteps = [
  'Save every generated image, video, script, voice file, and thumbnail into the Drive vault or asset manifest.',
  'Create a Supabase media_assets record with Drive URL, public display URL, source tool, approval status, and Black Card visibility.',
  'Send avatar scripts to HeyGen as private draft videos only.',
  'Poll HeyGen until the video is complete, then show the video, thumbnail, subtitle, and script in Approval Theater.',
  'Move approved assets into Shopify CDN, Metricool drafts, Klaviyo drafts, or public app surfaces only after approval.'
];

const styles = `
  .vault { min-height: 100vh; background: #000; color: #fff; padding: 18px; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
  .wrap { max-width: 1180px; margin: 0 auto; }
  .nav { display: flex; justify-content: flex-end; gap: 10px; flex-wrap: wrap; margin-bottom: 22px; }
  .nav a, .button { color: #fff; background: #080808; border: 1px solid #3a3a3a; border-radius: 8px; padding: 10px 12px; text-decoration: none; font-weight: 900; font-size: 13px; transition: border-color 180ms ease, box-shadow 180ms ease; }
  .nav a:hover, .button:hover, .card:hover, .draft:hover, .step:hover { border-color: #054cff; box-shadow: 0 0 0 1px #054cff; }
  .hero { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(280px, .75fr); gap: 18px; align-items: stretch; margin-bottom: 28px; }
  .kicker { color: #ff2e9a; text-transform: uppercase; font-size: 12px; font-weight: 950; margin: 0 0 10px; }
  h1 { font-size: clamp(38px, 7vw, 80px); line-height: .92; margin: 0 0 16px; letter-spacing: 0; }
  h2 { font-size: clamp(26px, 4vw, 42px); line-height: 1; margin: 0 0 12px; letter-spacing: 0; }
  h3 { margin: 0 0 8px; font-size: 17px; }
  p { color: #c8c8c8; line-height: 1.55; margin: 0; }
  .copy { font-size: 18px; max-width: 760px; }
  .actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 20px; }
  .primary { background: #ff2e9a; color: #090909; border-color: #ff2e9a; }
  .panel, .card, .draft, .step { background: linear-gradient(145deg, #050505, #111); border: 1px solid #333; border-radius: 8px; }
  .panel { padding: 20px; display: grid; gap: 12px; }
  .row { display: flex; justify-content: space-between; gap: 12px; border-top: 1px solid #252525; padding-top: 10px; }
  .pill { display: inline-flex; width: fit-content; border-radius: 999px; padding: 5px 9px; font-size: 11px; font-weight: 950; text-transform: uppercase; }
  .good { background: #14c784; color: #02130c; }
  .warn { background: #ffd166; color: #191000; }
  .bad { background: #d9163a; color: #fff; }
  .section { margin: 28px 0; }
  .grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
  .card, .draft, .step { padding: 16px; transition: border-color 180ms ease, box-shadow 180ms ease; }
  .draftGrid { display: grid; gap: 12px; }
  .draft { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(180px, .8fr) auto; align-items: center; gap: 14px; }
  .preview { min-height: 110px; border: 1px solid #3a3a3a; border-radius: 8px; display: grid; place-items: center; color: #c8c8c8; background: linear-gradient(135deg, #0a0a0a, #181818 55%, rgba(255,46,154,.45)); font-weight: 950; }
  .steps { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 12px; counter-reset: steps; }
  .step { position: relative; padding-top: 44px; }
  .step:before { counter-increment: steps; content: counter(steps); position: absolute; top: 14px; left: 14px; width: 22px; height: 22px; border-radius: 999px; background: #c8c8c8; color: #000; display: grid; place-items: center; font-size: 12px; font-weight: 950; }
  @media (max-width: 1000px) { .grid, .steps { grid-template-columns: repeat(2, minmax(0, 1fr)); } .hero, .draft { grid-template-columns: 1fr; } }
  @media (max-width: 620px) { .grid, .steps { grid-template-columns: 1fr; } .vault { padding: 12px; } h1 { font-size: 42px; } }
`;

export default function MediaVaultPage() {
  return (
    <main className="vault">
      <style>{styles}</style>
      <div className="wrap">
        <nav className="nav" aria-label="Media vault navigation">
          <a href="/">Studio Home</a>
          <a href="/closet">Eden&apos;s Closet</a>
          <a href="#heygen">HeyGen Drafts</a>
          <a href="#workflow">Workflow</a>
        </nav>

        <section className="hero">
          <div>
            <p className="kicker">Eden Skye Studios</p>
            <h1>Drive Vault + HeyGen Draft Studio</h1>
            <p className="copy">Drive becomes the permanent production vault. HeyGen becomes the private avatar video studio. The public app only displays approved media from stable render URLs, with every release locked behind human approval.</p>
            <div className="actions">
              <a className="button primary" href="/closet">Open Closet</a>
              <a className="button" href="https://docs.google.com/spreadsheets/d/1w4TBQGrQN0fRg8u669PzCPN-A1yrYpqNq5L8tFtvpT0">Open Asset Manifest</a>
            </div>
          </div>
          <aside className="panel">
            <span className="pill warn">Draft Mode</span>
            <h2>Governed Media Control</h2>
            <p>Images, videos, captions, voices, schedules, and live releases stay locked until approved.</p>
            <div className="row"><span>Drive</span><strong>Vault ready</strong></div>
            <div className="row"><span>HeyGen</span><strong>Draft started</strong></div>
            <div className="row"><span>Publishing</span><strong>Locked</strong></div>
          </aside>
        </section>

        <section className="section">
          <p className="kicker">System Roles</p>
          <h2>What each layer does</h2>
          <div className="grid">
            {vaultRows.map(([title, role, detail, state]) => (
              <article className="card" key={title}>
                <span className={`pill ${state}`}>{role}</span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="heygen">
          <p className="kicker">HeyGen Drafts</p>
          <h2>Private avatar content waiting for approval</h2>
          <div className="draftGrid">
            {heygenDrafts.map(([title, id, status, note]) => (
              <article className="draft" key={id}>
                <div>
                  <span className="pill warn">{status}</span>
                  <h3>{title}</h3>
                  <p>{note}</p>
                  <p>Video id: {id}</p>
                </div>
                <div className="preview">Video Preview Pending</div>
                <div className="actions"><button className="button" type="button">Approve</button><button className="button" type="button">Revise</button></div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="workflow">
          <p className="kicker">Workflow</p>
          <h2>How assets move from creation to release</h2>
          <div className="steps">
            {appSteps.map((step) => <article className="step" key={step}><p>{step}</p></article>)}
          </div>
        </section>
      </div>
    </main>
  );
}
