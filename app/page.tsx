const imageLibrary = {
  hero: '/eden-assets/eden-hero.svg',
  female: '/eden-assets/eden-female-roster.svg',
  international: '/eden-assets/eden-international-roster.svg',
  mature: '/eden-assets/eden-mature-roster.svg',
  male: '/eden-assets/eden-male-roster.svg',
  faceless: '/eden-assets/eden-faceless-themes.svg'
};

const modelLanes = [
  ['Female Model Roster', 'Uploaded Eden library roster mapped for the primary model lane.', imageLibrary.female],
  ['International Models', 'Uploaded Eden library roster mapped for the global model lane.', imageLibrary.international],
  ['Mature Model Roster', 'Uploaded Eden library roster mapped for the mature model lane.', imageLibrary.mature],
  ['Male Model Roster', 'Uploaded Eden library roster mapped for the male model lane.', imageLibrary.male]
];

const difference = [
  ['Elite Talent', 'Registry-backed model and creator profiles.'],
  ['Viral Content', 'Draft-first content engine with approval gates.'],
  ['Global Reach', 'International lanes mapped through source truth.'],
  ['Premium Brands', 'Brand-safe campaign and Shopify feed layer.'],
  ['Maximum Profit', 'Automation designed for measurable outputs.']
];

const systemCards = [
  ['Creator Production', 'Photoshoots, video production, editing, content systems, and campaign strategy.', 'RT-010', imageLibrary.female],
  ['Auto Social', 'Drive-fed faceless themes, model lanes, multi-network drafts, Supabase receipts, and approval-controlled scheduling.', 'RT-013', imageLibrary.faceless],
  ['Brand Partnerships', 'Creator, product, Shopify, and campaign records feeding the autonomous system.', 'RT-011', imageLibrary.international]
];

const runtimeGrid = [
  ['Drive Intake', 'Eden root, model-system folder, and AUTO BUILDER command folder are mapped as source truth.'],
  ['Supabase Registry', 'Model personas, creator channels, content queues, receipts, and health checks are schema-ready.'],
  ['Git Build Queue', 'Website, runtime, docs, and branch-safe automation files build from the feature branch.'],
  ['Vercel Workflow', 'The 5-minute cron calls Eden runtime endpoints and reports readiness receipts.'],
  ['Auto Social Models', 'Faceless, international, mature, male, and female content lanes feed draft generation.'],
  ['Shopify Bridge', 'Admin-token bridge prepares product, collection, image, page, and metaobject payloads.']
];

const pipelineSteps = [
  'Drive inventory',
  'Supabase sync',
  'Persona drafting',
  'Content queue',
  'Shopify queue',
  'Git build queue',
  'Vercel workflow',
  'Approval scheduling'
];

export default function Home() {
  return (
    <main className="edenSite">
      <header className="topbar">
        <a className="logo" href="#top">EDEN <span>SKYE</span> STUDIOS<small>Digital Modeling & Content Creator Agency</small></a>
        <nav className="navlinks">
          {['Home','About','Models','Services','Auto Social','Brand Partners','Apply','PWA App','Contact'].map((item) => <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</a>)}
        </nav>
        <a className="applyBtn" href="#apply">Apply Now</a>
      </header>

      <section id="top" className="hero">
        <div className="heroTextBlock">
          <p className="welcome">Welcome to Eden Skye Studios</p>
          <h1>Beauty.<span>Influence.</span>Impact.</h1>
          <p>We represent digital models and content creators. We build iconic brands, create viral content, and feed governed automation systems.</p>
          <div className="heroActions"><a href="#apply">Apply Now</a><a href="#models">View Model Lanes</a></div>
          <div className="stats"><b>Source<small>Library</small></b><b>24/7<small>Content</small></b><b>Global<small>Reach</small></b><b>Approval<small>Gated</small></b></div>
        </div>
        <figure className="heroImage"><img src={imageLibrary.hero} alt="Eden Skye Studios homepage visual from uploaded image library" /></figure>
      </section>

      <section id="about" className="difference"><p>The Eden Skye Studios Difference</p>{difference.map(([title, body]) => <article key={title}><strong>{title}</strong><span>{body}</span></article>)}</section>

      <section id="models" className="models">
        <div className="sectionTitle"><h2>Model Lanes</h2><a href="#apply">Apply to roster</a></div>
        <div className="modelRail">{modelLanes.map(([name, body, image]) => <article className="modelCard" key={name}><div className="imageFrame"><img src={image} alt={`${name} visual from Eden uploaded library`} /></div><div><strong>{name}</strong><span>{body}</span></div></article>)}</div>
      </section>

      <section id="services" className="systemGrid">{systemCards.map(([title, body, tag, image]) => <article key={title} className="systemCard"><div className="serviceImage"><img src={image} alt={`${title} visual from Eden image library`} /></div><div><h3>{title}</h3><p>{body}</p><small>{tag}</small><a href="#control-plane">Learn More</a></div></article>)}</section>

      <section id="pwa-app" className="appBand"><div className="phoneMock"><span>ES</span><small>Eden Skye PWA</small></div><div><h2>The Eden Skye App</h2><p>Your agency, automation queue, approvals, receipts, creators, and Shopify feeds in one installable PWA shell.</p><ul><li>Exclusive content</li><li>Model updates</li><li>Approval center</li><li>Direct control</li></ul></div><a className="installBtn" href="/manifest.json">Install Now</a></section>

      <section id="control-plane" className="automationPanel"><p className="welcome">Autonomous System Control Plane</p><h2>Website feeds the system.</h2><p className="panelLead">This site now uses exact Eden uploaded-library visuals for the homepage hero, female roster, international roster, mature roster, male roster, and faceless social theme lanes. Supabase can become the long-term image registry when live storage mutation is approved, but the website no longer depends on the broken Shopify crop fallback.</p><div className="runtimeGrid">{runtimeGrid.map(([item, body]) => <article key={item}><strong>{item}</strong><span>{body}</span></article>)}</div><div className="pipelineStrip">{pipelineSteps.map((step, index) => <span key={step}>{index + 1}. {step}</span>)}</div><div className="controlActions"><a href="/api/eden/auto-social">Test Auto Social Pipeline</a><a href="/api/eden/status">Runtime Status</a><a href="/api/eden/shopify-bridge">Shopify Bridge</a></div></section>

      <section id="apply" className="final"><h2>Apply Now</h2><p>All applications enter the governed source-truth queue before activation. No public profile goes live without approval.</p><a href="mailto:strategicmindsadvisory@gmail.com">Start Application</a></section>

      <style>{`
        *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#000;color:#fff;font-family:Inter,Arial,sans-serif}.edenSite{background:#000;color:#fff;min-height:100vh}.topbar{position:fixed;top:0;left:0;right:0;z-index:50;height:64px;display:flex;align-items:center;gap:24px;padding:8px 28px;background:rgba(0,0,0,.9);border-bottom:1px solid rgba(255,255,255,.25);backdrop-filter:blur(18px)}.logo{font-size:28px;font-weight:1000;letter-spacing:.04em;color:#fff;text-decoration:none;line-height:.9}.logo span,.hero h1 span,.sectionTitle a,.welcome,.systemCard h3,.difference strong,.models span{color:#ff1493}.logo small{display:block;font-size:11px;font-weight:500;color:#ddd;letter-spacing:.08em;text-transform:uppercase}.navlinks{margin-left:auto;display:flex;gap:22px;align-items:center}.navlinks a{font-size:12px;font-weight:900;color:#fff;text-decoration:none;text-transform:uppercase}.applyBtn,.heroActions a:first-child,.installBtn,.final a,.controlActions a:first-child{background:#ff1493;color:#fff;text-decoration:none;text-transform:uppercase;font-weight:1000;border-radius:5px;padding:13px 24px;border:1px solid #ff1493;box-shadow:0 0 34px rgba(255,20,147,.4)}.hero{min-height:560px;height:70vh;display:grid;grid-template-columns:43% 57%;position:relative;overflow:hidden;border-bottom:1px solid rgba(255,255,255,.3);padding-top:64px}.heroTextBlock{position:relative;z-index:3;padding:55px 0 0 12vw;background:linear-gradient(90deg,#000 0%,rgba(0,0,0,.95) 70%,rgba(0,0,0,0));max-width:620px}.welcome{text-transform:uppercase;font-size:12px;font-weight:1000;letter-spacing:.14em}.hero h1{font-size:58px;line-height:.95;text-transform:uppercase;margin:12px 0 10px;font-weight:1000}.hero h1 span{display:block}.hero p{font-size:17px;line-height:1.45;color:#f1f1f1}.heroImage{margin:0;min-width:0;background:#090006}.heroImage img,.imageFrame img,.serviceImage img{width:100%;height:100%;display:block;object-fit:cover}.heroActions{display:flex;gap:18px;margin:24px 0}.heroActions a:last-child{color:#fff;border:1px solid #fff;border-radius:5px;padding:13px 24px;text-decoration:none;text-transform:uppercase;font-weight:1000}.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;margin-top:20px;text-align:center}.stats b{font-size:18px}.stats small{display:block;font-size:12px;text-transform:uppercase;color:#fff}.difference{padding:20px 8vw 10px;border-bottom:1px solid rgba(255,255,255,.18);display:grid;grid-template-columns:1.2fr repeat(5,1fr);gap:14px;align-items:center}.difference p{text-transform:uppercase;letter-spacing:.32em;text-align:center;font-weight:900}.difference article,.runtimeGrid article{border:1px solid rgba(255,20,147,.45);background:#080008;border-radius:8px;padding:18px}.difference article span,.runtimeGrid span{display:block;color:#ddd;font-size:13px;margin-top:6px;line-height:1.4}.models,.automationPanel,.final{padding:28px 7vw}.sectionTitle{text-align:center;text-transform:uppercase}.sectionTitle h2{font-size:24px;letter-spacing:.28em;margin:0}.sectionTitle a{font-size:12px;text-decoration:none;font-weight:1000}.modelRail{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:18px}.modelCard{border:1px solid rgba(255,255,255,.38);border-radius:8px;overflow:hidden;background:#070007}.modelCard>div:last-child{padding:12px;background:rgba(0,0,0,.72);text-align:center;text-transform:uppercase;min-height:94px}.modelCard strong{display:block}.modelCard span{display:block;margin-top:8px;font-size:12px;line-height:1.35;text-transform:none;color:#ddd}.imageFrame{aspect-ratio:3/4;background:#0b0008}.systemGrid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;padding:20px 3vw;border-top:1px solid rgba(255,255,255,.2)}.systemCard{display:grid;grid-template-columns:1.1fr 1fr;min-height:210px;border:1px solid rgba(255,255,255,.45);border-radius:8px;overflow:hidden;background:#070007}.systemCard div:last-child{padding:32px}.systemCard h3{font-size:26px;text-transform:uppercase;margin:0 0 12px}.systemCard p{color:#eee}.systemCard small{display:block;color:#999}.systemCard a{display:inline-block;margin-top:16px;border:1px solid #ff1493;color:#ff1493;padding:10px 22px;text-transform:uppercase;text-decoration:none;border-radius:4px}.serviceImage{min-height:210px;background:#0b0008}.appBand{display:grid;grid-template-columns:170px 1fr 170px;gap:36px;align-items:center;padding:26px 12vw;background:#100009;border-top:1px solid rgba(255,255,255,.25);border-bottom:1px solid rgba(255,255,255,.25)}.phoneMock{height:220px;border:2px solid rgba(255,255,255,.5);border-radius:28px;background:#050005;display:grid;place-items:center;text-align:center}.phoneMock span{font-size:50px;color:#ff1493;font-weight:1000}.phoneMock small{display:block}.appBand h2,.automationPanel h2,.final h2{font-size:34px;text-transform:uppercase;letter-spacing:.08em;margin:0 0 10px}.appBand ul{display:flex;gap:24px;list-style:none;padding:0;margin:10px 0;color:#eee}.runtimeGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.automationPanel{background:#040404}.panelLead{max-width:940px;color:#eee;line-height:1.5}.pipelineStrip{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:18px 0}.pipelineStrip span{border:1px solid rgba(255,255,255,.2);border-radius:8px;padding:11px 12px;color:#eee;background:#080808;font-size:13px;text-transform:uppercase;font-weight:800}.controlActions{display:flex;gap:12px;flex-wrap:wrap}.controlActions a{color:#fff;border:1px solid rgba(255,255,255,.65);border-radius:5px;padding:13px 20px;text-decoration:none;text-transform:uppercase;font-weight:1000}.final{text-align:center;padding-bottom:70px}.final p{color:#ddd}@media(max-width:1000px){.navlinks{display:none}.hero{grid-template-columns:1fr;height:auto}.heroTextBlock{padding:80px 24px 30px}.heroImage{min-height:420px}.difference,.modelRail,.systemGrid,.appBand,.runtimeGrid,.pipelineStrip{grid-template-columns:1fr}.stats{grid-template-columns:repeat(2,1fr)}}
      `}</style>
    </main>
  );
}
