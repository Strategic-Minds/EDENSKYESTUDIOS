import EdenChatPanel from './EdenChatPanel';

const generatedImages = [
  'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/4992ef73-f8a0-4b4f-a10d-54a962066394/Create_four_distinct_premium_editorial_model_card_portraits_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZThkNjRhZDE4MjlkY2MyZCIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc0NTE2OX0.o9ejT9pqsy64NI9NYK44xuF5SiY6lxRL9Zf0hBrexIY',
  'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/9c0b40df-6a61-435c-867c-662e8085b1c1/Create_four_distinct_premium_editorial_model_card_portraits_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZDkzOWMzMDA3Mzg2YmRhMCIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc5MzM0NH0.vswFmLbPjjly8W4OQPKly8Yn2Eq1G87nyHZHXRgBcHI',
  'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/4605f045-10c8-4cdc-a570-d4b2861aa1a6/Create_four_distinct_premium_editorial_model_card_portraits_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiY2UxMGRiNzI5Njc2MTM2ZiIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc5MjA1MH0.29e8ggnDwzl3FmDGCfP6jObsu25Q1J1HIJdUFO66KVQ',
  'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/bdfb6bbc-0e73-4454-b6b9-ea5c2e4ffff4/Create_four_distinct_premium_editorial_model_card_portraits_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiNzRjZmFmY2RiMjE5YzYzMiIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc0NzIxM30.OVmf7x29m3YZCKG7v-x9nmZpt2zQKa0mxTN_4b_mIMg',
  'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/c61940cd-3041-4b69-b08e-6d8ad254c7de/Create_four_distinct_premium_editorial_model_card_portraits_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiMGQ3Y2NmNzZiY2IxNjYwZSIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc5MjE4Mn0.OoxXOB0jiOdOz7ke54RywoocSwkHW70f35Ipn6EGxSU',
  'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/25149955-7c3b-4059-8679-4a1436a6d4e9/Create_four_distinct_premium_editorial_model_card_portraits_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiNjIwMzIwNTI3MmQ3MzIzNiIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc5NzY1MH0.MyW5QiJAGgtmtTGOWFydxnmAvEuyIb_djmtsYIvOxfo',
  'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/0061e91a-5a15-4788-9fe2-4410b63b9dd5/Create_four_distinct_premium_editorial_model_card_portraits_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiMmJiMmY3NzZlYTg1OGUxZSIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc0OTA0Nn0.uoImt5T-SkupHXLwk0SOmkV0XDXCqJ8C1VeUDAvr5KM',
  'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/941eaefe-21ae-40c2-a37a-b5b03c7ea433/Create_four_distinct_premium_editorial_model_card_portraits_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiMTJhODRhYjIwYjMwNmRiMiIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc4MjI1OH0.KOcdl57tA9GA3af5_VxCCiR7-PGSGuo7VhcyfBqijZM'
];

const models = [
  ['Amara Vale', 'Brazil', 'velvet confidence', 'black lace and satin lingerie', 'Live', 'good', generatedImages[0]],
  ['Mina Sol', 'Morocco', 'warm midnight', 'silver and black couture lingerie', 'Live', 'good', generatedImages[1]],
  ['Lena Frost', 'Germany', 'cool editorial', 'white sculpted lingerie bodysuit', 'Live', 'good', generatedImages[2]],
  ['Sora Kim', 'Korea', 'soft precision', 'hot pink fashion lingerie', 'Live', 'good', generatedImages[3]],
  ['Nia Monroe', 'United States', 'deep luxury', 'purple luxury lingerie set', 'Live', 'good', generatedImages[4]],
  ['Isla Noire', 'France', 'private club', 'black couture lingerie, sheer layered full coverage', 'Live', 'good', generatedImages[5]],
  ['Vesper Hart', 'United States', 'tattooed blonde', 'white and silver lingerie set', 'Live', 'good', generatedImages[6]],
  ['Raven Vale', 'United Kingdom', 'tattooed brunette', 'black and hot pink lingerie set', 'Live', 'good', generatedImages[7]],
  ['Pixie Rose', 'Canada', 'pink highlights', 'hot pink and black lingerie, tattoo detail', 'Queued', 'warn', null],
  ['Clara West', 'Sweden', 'glasses editorial', 'black satin lingerie', 'Queued', 'warn', null],
  ['Aiko Mori', 'Japan', 'glasses luxury', 'white and silver lingerie', 'Queued', 'warn', null],
  ['Priya Rai', 'India', 'deep purple couture', 'purple lingerie, tiny red bindi', 'Queued', 'warn', null],
  ['Sofia Luz', 'Spain', 'red carpet heat', 'red and black lace lingerie', 'Queued', 'warn', null],
  ['Valentina Costa', 'Italy', 'glossy elegance', 'black satin lingerie', 'Queued', 'warn', null],
  ['Yara Nadir', 'UAE', 'silver night', 'silver couture lingerie', 'Queued', 'warn', null],
  ['Zola King', 'South Africa', 'emerald confidence', 'emerald and black lingerie', 'Queued', 'warn', null],
  ['Anika Storm', 'Netherlands', 'icy silver', 'silver sculpted bodysuit', 'Queued', 'warn', null],
  ['Mei Lin', 'China', 'pearl precision', 'pearl white lingerie', 'Queued', 'warn', null],
  ['Katya Volkov', 'Ukraine', 'midnight edge', 'black mesh-layered full coverage', 'Queued', 'warn', null],
  ['Luna Vega', 'Mexico', 'hot pink fire', 'hot pink lingerie', 'Queued', 'warn', null],
  ['Freya North', 'Norway', 'arctic glamour', 'white satin lingerie', 'Queued', 'warn', null],
  ['Selene Park', 'Australia', 'private studio', 'black and silver lingerie', 'Queued', 'warn', null],
  ['Camila Santos', 'Colombia', 'violet glow', 'purple satin lingerie', 'Queued', 'warn', null],
  ['Hana Idris', 'Egypt', 'silver cinema', 'silver and black lingerie', 'Queued', 'warn', null],
  ['Eden Nova', 'Global', 'black card signature', 'black card lingerie edition', 'Queued', 'warn', null]
];

const approvals = [
  ['Image Library', '8 no-robe lingerie portraits live', 'Approve permanent hosting to prevent asset expiry.', 'good'],
  ['Generation Queue', '17 remaining model portraits', 'Run after Runway capacity is restored or route through another approved media tool.', 'warn'],
  ['Wardrobe Rule', 'No robes in Closet library', 'Keep all looks lingerie-forward, covered, editorial, and adult 25+.', 'good'],
  ['Live Avatar', 'Private HeyGen session request', 'Hold until image library and entitlement gates are wired.', 'bad']
];

const workflow = [
  ['Supabase', 'Test branch schema active. Production migration still approval-gated.', 'good'],
  ['Vercel', 'Main deployment receives the lingerie library update.', 'good'],
  ['Runway', '8 images generated. Workspace limit reached for remaining 17.', 'warn'],
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
  h1 { color: #fff; font-size: clamp(38px, 7vw, 82px); line-height: .92; max-width: 900px; margin: 0 0 16px; letter-spacing: 0; }
  h2 { color: #fff; font-size: clamp(26px, 4vw, 44px); line-height: 1; margin: 0 0 12px; }
  h3 { color: #fff; margin: 0 0 8px; font-size: 16px; }
  p { color: #bdbdbd; line-height: 1.55; margin: 0; }
  label { color: #c8c8c8; font-size: 12px; font-weight: 900; text-transform: uppercase; }
  textarea { width: 100%; resize: vertical; min-height: 110px; border-radius: 8px; border: 1px solid #3d3d3d; background: #050505; color: #fff; padding: 12px; font: inherit; line-height: 1.45; }
  textarea:focus { outline: none; border-color: #054cff; box-shadow: 0 0 0 1px #054cff; }
  .copy { color: #cfcfcf; font-size: 18px; line-height: 1.6; max-width: 760px; }
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
  .heading { max-width: 860px; margin-bottom: 16px; }
  .modelGrid, .workflowGrid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
  .card { overflow: hidden; transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease; }
  .card:hover { transform: translateY(-2px); }
  .portrait { min-height: 300px; aspect-ratio: 3 / 4; display: grid; place-items: center; background: #080808; position: relative; overflow: hidden; border-bottom: 1px solid #282828; }
  .portrait img { width: 100%; height: 100%; display: block; object-fit: cover; object-position: center top; filter: saturate(1.04) contrast(1.03); }
  .portrait span { position: absolute; top: 14px; right: 14px; color: #000; background: #c8c8c8; border-radius: 999px; padding: 6px 8px; font-weight: 950; font-size: 12px; z-index: 1; }
  .queuedPortrait { color: #ff2e9a; text-align: center; padding: 22px; background: radial-gradient(circle at 50% 20%, rgba(255,46,154,.28), transparent 30%), linear-gradient(145deg, #050505, #141414); }
  .queuedPortrait strong { display: block; color: #fff; font-size: 30px; margin-bottom: 8px; }
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
  @media (max-width: 1100px) { .modelGrid, .workflowGrid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
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
          <a href="#models">Lingerie Library</a>
          <a href="#chat">Eden Chat</a>
          <a href="#approvals">Approvals</a>
          <a href="#workflow">Workflow</a>
        </nav>
        <section className="heroGrid">
          <div>
            <p className="kicker">Eden Skye Studios</p>
            <h1>Eden&apos;s Closet Lingerie Library</h1>
            <p className="copy">A black-card wardrobe wall of fictional adult AI supermodel profiles in tasteful, no-robe, high-fashion lingerie styling. The first eight are live; the rest are queued for generation.</p>
            <div className="actions">
              <a className="button primary" href="#models">View Library</a>
              <a className="button" href="#chat">Test Eden Chat</a>
              <a className="button" href="/api/readiness">Readiness API</a>
            </div>
          </div>
          <aside className="statusCard" aria-label="Readiness summary">
            <span className="pill good">8 Live Images</span>
            <h2>Black Card Wardrobe</h2>
            <p>No robes. Lingerie-forward, fully covered, editorial, adult 25+, platform-safe.</p>
            <div className="statusRow"><span>Library</span><strong className="warnText">25 profiles</strong></div>
            <div className="statusRow"><span>Generated</span><strong className="warnText">8 / 25</strong></div>
            <div className="statusRow"><span>Publishing</span><strong className="dangerText">Locked</strong></div>
          </aside>
        </section>
      </header>

      <div id="chat">
        <EdenChatPanel />
      </div>

      <section className="section" id="models">
        <div className="heading"><p className="kicker">Model Vault</p><h2>Full 25-model lingerie library, with live images and queued generation slots.</h2></div>
        <div className="modelGrid">
          {models.map(([name, country, tone, outfit, status, risk, image]) => (
            <article className="card" key={name}>
              <div className="portrait">
                <span>{String(name).split(' ').map((part) => part[0]).join('')}</span>
                {image ? (
                  <img src={String(image)} alt={`${name}, fictional adult AI model in platform-safe high-fashion lingerie`} loading="lazy" />
                ) : (
                  <div className="queuedPortrait"><strong>Queued</strong><p>Generation slot waiting for media capacity</p></div>
                )}
              </div>
              <div className="info">
                <div className="topline"><h3>{name}</h3><span className={`pill ${risk}`}>{status}</span></div>
                <p>{country} / {tone}</p><p className="outfit">Look: {outfit}</p>
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
