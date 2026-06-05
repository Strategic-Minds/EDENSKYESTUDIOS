import EdenChatPanel from './EdenChatPanel';

const models = [
  {
    name: 'Amara Vale',
    country: 'Brazil',
    tone: 'velvet confidence',
    outfit: 'black satin editorial set',
    status: 'Approved',
    risk: 'good',
    image: 'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/d1db2076-48f5-4b44-bfbf-07f5eb65db06/Create_four_distinct_premium_editorial_portrait_images_for_a.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZDdhYmQ3NDNhNjU2MmY3NCIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDcyMTYwM30.K6YRRxamHrrbHPzT2eYn7j_xdBel7hmexuHXg7xG5O0'
  },
  {
    name: 'Mina Sol',
    country: 'Morocco',
    tone: 'warm midnight',
    outfit: 'silver robe preview',
    status: 'Review',
    risk: 'warn',
    image: 'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/753cdf1e-49a8-4898-a043-a2d0615f5185/Create_four_distinct_premium_editorial_portrait_images_for_a.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiYzg4OTZjMGZmZGY1Njc1NSIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDczNzI5NX0.M754yuQCbw8HAe658XXFX25ea0Dsrrta8M-Bg4BTErE'
  },
  {
    name: 'Lena Frost',
    country: 'Germany',
    tone: 'cool editorial',
    outfit: 'white lace-inspired bodysuit',
    status: 'Draft',
    risk: 'warn',
    image: 'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/2a124f1b-5988-4e0a-8ccf-5e8099ec431d/Create_four_distinct_premium_editorial_portrait_images_for_a.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiNTM1ODYzMjdiZTIxNjVjYyIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc5NDI3OX0.EW2FXWF-yh5o5GLCnKO5ejCGwgvuExdYb4iMLP1MJc4'
  },
  {
    name: 'Sora Kim',
    country: 'Korea',
    tone: 'soft precision',
    outfit: 'hot pink studio set',
    status: 'Approved',
    risk: 'good',
    image: 'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/9d9967ff-a117-4bf2-ac2c-a7f6824c3c86/Create_four_distinct_premium_editorial_portrait_images_for_a.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZWZiMTkwYzRlYzc1MDUzMiIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc4MDM1Nn0.ziJK0nJIWxjkC7RHp0yNEMcylm9uTwIIl0xvvsi6Wps'
  },
  {
    name: 'Nia Monroe',
    country: 'United States',
    tone: 'deep luxury',
    outfit: 'purple lounge look',
    status: 'Action',
    risk: 'bad',
    image: 'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/8bb0e1c5-58bd-47bb-9221-1ece8dcbcb78/Create_two_distinct_premium_editorial_portrait_images_for_a_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZGI1NDk0MjRmMzQ3MWZkZCIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc2NzY1Mn0.xk0ajthfZyPcbUnJqy-7CSPseKe4sIiViJHmRP9SAr0'
  },
  {
    name: 'Isla Noire',
    country: 'France',
    tone: 'private club',
    outfit: 'black card editorial',
    status: 'Review',
    risk: 'warn',
    image: 'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/3850d6a9-d049-49a9-ae39-ea843cb43ade/Create_two_distinct_premium_editorial_portrait_images_for_a_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZTZjYTU5NmQ0ZDQ5NzMxMCIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc5NTI0NX0.vIPv5wjmMyWtEkVwBCkhO8vIV1sFmuvhU_xKCalv-ag'
  }
];

const approvals = [
  ['Wardrobe Preview', 'Mina Sol silver robe look', 'Revise background, then approve for vault.', 'warn'],
  ['Social Drafts', 'Brazil / Instagram reel batch', 'Approve draft handoff to Metricool only.', 'good'],
  ['Voice Intro', 'Eden Black Card welcome', 'Safe to use in app preview.', 'good'],
  ['Live Avatar', 'Private HeyGen session request', 'Hold until channel and entitlement gates are wired.', 'bad']
];

const workflow = [
  ['Supabase', 'Test branch schema active. Production migration still approval-gated.', 'good'],
  ['Vercel', 'Main deployment is green and Eden chat test route is live.', 'good'],
  ['n8n', 'Workflow map ready. Activation requires approval.', 'warn'],
  ['Slack', '#eden-skye-studios visible. Posting remains approval-gated.', 'good']
];

const styles = `
  .closet { min-height: 100vh; background: #000; color: #f8f8f8; padding: 18px; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
  .hero, .section, .chatPanel { max-width: 1220px; margin: 0 auto 18px; }
  .nav { display: flex; justify-content: flex-end; gap: 10px; flex-wrap: wrap; margin-bottom: 18px; }
  .nav a, .button, .mini button, .approvalButtons button, .quickPrompts button, .chatForm button { border: 1px solid #454545; color: #fff; background: #080808; text-decoration: none; border-radius: 8px; padding: 10px 12px; font-size: 13px; font-weight: 800; transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease; }
  .nav a:hover, .button:hover, .card:hover, .approval:hover, .workflow:hover, .quickPrompts button:hover, .chatPanel:hover { border-color: #054cff; box-shadow: 0 0 0 1px #054cff; }
  .heroGrid { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(280px, .65fr); gap: 18px; align-items: stretch; }
  .kicker { color: #ff2e9a; font-size: 12px; font-weight: 900; text-transform: uppercase; margin: 0 0 10px; }
  h1 { color: #fff; font-size: clamp(38px, 7vw, 82px); line-height: .92; max-width: 860px; margin: 0 0 16px; letter-spacing: 0; }
  h2 { color: #fff; font-size: clamp(26px, 4vw, 44px); line-height: 1; margin: 0 0 12px; }
  h3 { color: #fff; margin: 0 0 8px; font-size: 16px; }
  p { color: #bdbdbd; line-height: 1.55; margin: 0; }
  label { color: #c8c8c8; font-size: 12px; font-weight: 900; text-transform: uppercase; }
  textarea { width: 100%; resize: vertical; min-height: 110px; border-radius: 8px; border: 1px solid #3d3d3d; background: #050505; color: #fff; padding: 12px; font: inherit; line-height: 1.45; }
  textarea:focus { outline: none; border-color: #054cff; box-shadow: 0 0 0 1px #054cff; }
  .copy { color: #cfcfcf; font-size: 18px; line-height: 1.6; max-width: 720px; }
  .actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 20px; }
  .primary, .approvalButtons .approve { background: #ff2e9a !important; border-color: #ff2e9a !important; color: #090909 !important; }
  .statusCard, .card, .approval, .workflow, .chatPanel, .chatResult { background: linear-gradient(145deg, #050505, #111); border: 1px solid #333; border-radius: 8px; }
  .statusCard { padding: 20px; display: flex; flex-direction: column; gap: 14px; }
  .statusRow { display: flex; justify-content: space-between; border-top: 1px solid #252525; padding-top: 10px; gap: 12px; }
  .pill { display: inline-flex; width: fit-content; align-items: center; border-radius: 999px; padding: 5px 9px; font-size: 11px; font-weight: 900; text-transform: uppercase; }
  .good { background: #14c784; color: #02130c; }
  .warn { background: #ffd166; color: #191000; }
  .bad { background: #d9163a; color: #fff; }
  .warnText { color: #ffd166; } .dangerText { color: #ff4c6a; }
  .section { padding: 22px 0; }
  .heading { max-width: 820px; margin-bottom: 16px; }
  .modelGrid, .workflowGrid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
  .card { overflow: hidden; transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease; }
  .card:hover { transform: translateY(-2px); }
  .portrait { min-height: 310px; aspect-ratio: 3 / 4; display: block; background: #080808; position: relative; overflow: hidden; border-bottom: 1px solid #282828; }
  .portrait img { width: 100%; height: 100%; display: block; object-fit: cover; object-position: center top; filter: saturate(1.04) contrast(1.03); }
  .portrait span { position: absolute; top: 14px; right: 14px; color: #000; background: #c8c8c8; border-radius: 999px; padding: 6px 8px; font-weight: 950; font-size: 12px; z-index: 1; }
  .info { padding: 14px; }
  .topline, .chatHeader { display: flex; justify-content: space-between; gap: 10px; align-items: flex-start; }
  .outfit { color: #f2f2f2; margin-top: 8px; }
  .mini, .approvalButtons, .quickPrompts { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
  .approvalList { display: grid; gap: 12px; }
  .approval { display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(180px, .5fr) auto; gap: 14px; align-items: center; padding: 14px; }
  .media { min-height: 100px; border-radius: 8px; border: 1px solid #3d3d3d; background: linear-gradient(135deg, #111, #222 45%, #ff2e9a 160%); color: #c8c8c8; display: grid; place-items: center; font-weight: 900; }
  .reject { color: #ff6b80 !important; }
  .workflow { padding: 16px; }
  .dot { display: inline-block; width: 12px; height: 12px; border-radius: 999px; margin-bottom: 16px; }
  .chatPanel { padding: 18px; transition: border-color 180ms ease, box-shadow 180ms ease; }
  .chatForm { display: grid; gap: 10px; margin-top: 14px; }
  .chatResult { margin-top: 14px; padding: 14px; }
  .resultNote { color: #c8c8c8; margin-top: 8px; font-size: 13px; }
  @media (max-width: 900px) { .heroGrid, .approval { grid-template-columns: 1fr; } .modelGrid, .workflowGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .chatHeader { flex-direction: column; } }
  @media (max-width: 620px) { .modelGrid, .workflowGrid { grid-template-columns: 1fr; } .closet { padding: 12px; } h1 { font-size: 42px; } .portrait { min-height: 360px; } }
`;

export default function ClosetPreviewPage() {
  return (
    <main className="closet">
      <style>{styles}</style>
      <header className="hero">
        <nav className="nav" aria-label="Eden Closet navigation">
          <a href="/">Studio Home</a>
          <a href="#models">Models</a>
          <a href="#chat">Eden Chat</a>
          <a href="#approvals">Approvals</a>
          <a href="#workflow">Workflow</a>
        </nav>
        <section className="heroGrid">
          <div>
            <p className="kicker">Eden Skye Studios</p>
            <h1>Eden&apos;s Closet Black Card Control Plane</h1>
            <p className="copy">A mobile-first preview of the model vault, wardrobe requests, Eden voice/chat controls, approval theater, and Auto Builder workflow gates.</p>
            <div className="actions">
              <a className="button primary" href="#chat">Test Eden Chat</a>
              <a className="button" href="#approvals">Review Approvals</a>
              <a className="button" href="/api/readiness">Readiness API</a>
            </div>
          </div>
          <aside className="statusCard" aria-label="Readiness summary">
            <span className="pill good">App Live</span>
            <h2>Sandbox Loop</h2>
            <p>Pick model - change look - preview media - Eden recommends action - approve - create drafts - log receipt.</p>
            <div className="statusRow"><span>Publishing</span><strong className="dangerText">Locked</strong></div>
            <div className="statusRow"><span>Chat</span><strong className="warnText">Test mode</strong></div>
            <div className="statusRow"><span>Supabase</span><strong className="warnText">Branch only</strong></div>
          </aside>
        </section>
      </header>

      <div id="chat">
        <EdenChatPanel />
      </div>

      <section className="section" id="models">
        <div className="heading"><p className="kicker">Model Vault</p><h2>Every model stays visible, with her profile and next action.</h2></div>
        <div className="modelGrid">
          {models.map(({ name, country, tone, outfit, status, risk, image }) => (
            <article className="card" key={name}>
              <div className="portrait">
                <span>{name.split(' ').map((part) => part[0]).join('')}</span>
                <img src={image} alt={`${name}, fictional adult AI model profile portrait`} loading="lazy" />
              </div>
              <div className="info">
                <div className="topline"><h3>{name}</h3><span className={`pill ${risk}`}>{status}</span></div>
                <p>{country} / {tone}</p><p className="outfit">Current: {outfit}</p>
                <div className="mini"><button type="button">Voice</button><button type="button">Change Look</button></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="approvals">
        <div className="heading"><p className="kicker">Approval Theater</p><h2>Human approval controls every image, video, sound, caption, product, schedule, and live release.</h2></div>
        <div className="approvalList">
          {approvals.map(([type, title, recommendation, risk]) => (
            <article className="approval" key={title}>
              <div><span className={`pill ${risk}`}>{type}</span><h3>{title}</h3><p>{recommendation}</p></div>
              <div className="media">Preview</div>
              <div className="approvalButtons"><button type="button" className="approve">Approve</button><button type="button">Revise</button><button type="button" className="reject">Reject</button></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="workflow">
        <div className="heading"><p className="kicker">Automation Engine</p><h2>Auto Builder, Vercel, Supabase, n8n, Metricool, Klaviyo, Shopify, and HeyGen stay governed by receipts.</h2></div>
        <div className="workflowGrid">
          {workflow.map(([system, note, risk]) => (
            <article className="workflow" key={system}><span className={`dot ${risk}`} /><h3>{system}</h3><p>{note}</p></article>
          ))}
        </div>
      </section>
    </main>
  );
}
