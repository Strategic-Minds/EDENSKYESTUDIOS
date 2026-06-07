import InstallButton from './install-button';

const campaignImage = 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-skye-studios-homepage-campaign.png?v=1780873477';

const services = [
  'Model Campaigns',
  'Creator Production',
  'Commercial Licensing',
  'AUTO SOCIAL',
  'Product Campaigns',
  'Brand Launches'
];

const proofPoints = [
  'Campaign direction',
  'Creator casting',
  'Editorial production',
  'Commercial licensing'
];

export default function Home() {
  return (
    <main className="site">
      <header className="nav">
        <a className="brand" href="#top" aria-label="Eden Skye Studios home">EDEN <span>SKYE</span> STUDIOS</a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#licensing">Licensing</a>
          <a href="#autosocial">Auto Social</a>
          <a className="navCta" href="#apply">Apply</a>
        </nav>
        <InstallButton />
      </header>

      <section id="top" className="hero">
        <div className="heroCopy">
          <p className="eyebrow">Enterprise Creator Studio</p>
          <h1>Professional campaign content for brands, models, and creators.</h1>
          <p className="subhead">Eden Skye Studios builds polished visual systems for launches, social, commerce, licensing, and long-term audience growth.</p>
          <div className="heroActions">
            <a className="pinkButton" href="#apply">Apply Now</a>
            <InstallButton />
          </div>
        </div>
        <div className="heroImage" role="img" aria-label="Professional Eden Skye Studios campaign visual" />
      </section>

      <section id="work" className="editorialBlock">
        <div>
          <p className="eyebrow">Visual Standard</p>
          <h2>No collage chaos. One premium campaign system.</h2>
          <p>We use clean art direction, restrained layouts, strong hierarchy, and professional image presentation so the brand feels credible on desktop and mobile.</p>
        </div>
        <div className="featureImage" role="img" aria-label="Editorial fashion campaign preview" />
      </section>

      <section className="proofStrip" aria-label="Production capabilities">
        {proofPoints.map((item) => <span key={item}>{item}</span>)}
      </section>

      <section id="services" className="section services">
        <p className="eyebrow">Agency Services</p>
        <h2>Built like a campaign house. Operated like a content machine.</h2>
        <div className="serviceGrid">{services.map((service) => <div key={service}><strong>{service}</strong><p>Premium assets designed for launches, social, commerce, and brand growth.</p></div>)}</div>
      </section>

      <section id="licensing" className="splitSection">
        <div><p className="eyebrow">Licensing</p><h2>License. Publish. <span>Profit.</span></h2><p>Commercial-use visual packages for ad campaigns, social media, ecommerce, print, web, and brand storytelling.</p><a className="pinkButton" href="#apply">Request Licensing</a></div>
        <div className="imageCard" role="img" aria-label="Commercial campaign image" />
      </section>

      <section id="autosocial" className="splitSection flip">
        <div className="systemCard"><p className="eyebrow">AUTO SOCIAL</p><h3>24/7 content engine</h3><p>Create, post, grow, analyze, and improve without turning the brand into a messy content factory.</p></div>
        <div><p className="eyebrow">Operations</p><h2>From shoot to social system.</h2><p>Every asset should serve a campaign objective: attention, trust, conversion, retention, or audience growth.</p><div className="stepGrid">{['Content Creation','Daily Posting','Engagement Growth','Analytics Optimization'].map((x) => <span key={x}>{x}</span>)}</div></div>
      </section>

      <section id="apply" className="finalCta">
        <div className="finalText"><h2>Let’s create the next <span>big thing.</span></h2><p>Models, creators, brands. Together we build icons with discipline, not clutter.</p><a className="pinkButton" href="mailto:strategicmindsadvisory@gmail.com">Apply Now</a></div>
      </section>

      <style>{`
        *{box-sizing:border-box}html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}body{margin:0;background:#050005;color:#fff;font-family:Inter,Arial,sans-serif;overflow-x:hidden}.site{min-height:100vh;background:linear-gradient(180deg,#050005,#090009 45%,#050005);color:#fff;overflow:hidden}.nav{position:fixed;top:0;left:0;right:0;z-index:50;display:flex;align-items:center;justify-content:space-between;gap:18px;padding:calc(14px + env(safe-area-inset-top)) clamp(14px,3vw,28px) 14px;background:rgba(0,0,0,.86);backdrop-filter:blur(22px);border-bottom:1px solid rgba(255,255,255,.12)}.brand{color:#fff;text-decoration:none;font-weight:950;letter-spacing:.08em;white-space:nowrap}.brand span,h1 span,h2 span{color:#ff1493}.nav nav{display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:flex-end}.nav a{color:#fff;text-decoration:none;font-size:12px;font-weight:900;text-transform:uppercase}.navCta,.pinkButton,.installButton{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;background:#ff1493;color:#fff!important;border:1px solid #ff1493;padding:13px 18px;text-decoration:none;font-weight:950;text-transform:uppercase;box-shadow:0 0 34px rgba(255,20,147,.28);min-height:44px}.installButton{cursor:pointer;font-size:12px;white-space:nowrap}.installBadge{display:inline-flex;align-items:center;border:1px solid rgba(255,20,147,.45);border-radius:999px;padding:11px 14px;color:#ffb8df;font-size:12px;font-weight:900;text-transform:uppercase;white-space:nowrap}.hero{min-height:100svh;display:grid;grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr);align-items:stretch;border-bottom:1px solid rgba(255,255,255,.14)}.heroCopy{display:flex;flex-direction:column;justify-content:center;padding:132px clamp(22px,5vw,72px) 72px;background:radial-gradient(circle at 15% 30%,rgba(255,20,147,.2),transparent 34%),#050005}.heroCopy h1{margin:0;max-width:850px;font-size:clamp(48px,6.8vw,94px);line-height:.92;font-weight:1000;letter-spacing:-.065em}.subhead{max-width:680px;margin:22px 0 0;font-size:clamp(17px,1.8vw,23px);line-height:1.35;color:#e8dce4}.heroActions{display:flex;gap:12px;flex-wrap:wrap;margin-top:30px}.eyebrow{margin:0 0 14px;color:#ff1493;text-transform:uppercase;font-size:12px;font-weight:1000;letter-spacing:.16em}.heroImage,.featureImage,.imageCard{background-image:linear-gradient(90deg,rgba(0,0,0,.05),rgba(0,0,0,.18)),url(${campaignImage});background-size:cover;background-repeat:no-repeat;background-position:center top}.heroImage{min-height:100svh;border-left:1px solid rgba(255,255,255,.12)}.editorialBlock,.splitSection{width:min(1240px,calc(100% - 40px));margin:0 auto;padding:clamp(70px,9vw,112px) 0;display:grid;grid-template-columns:minmax(0,.86fr) minmax(0,1.14fr);gap:clamp(28px,5vw,64px);align-items:center;border-bottom:1px solid rgba(255,255,255,.12)}.editorialBlock h2,.section h2,.splitSection h2,.finalText h2{margin:0 0 24px;font-size:clamp(38px,5.5vw,68px);line-height:.96;text-transform:uppercase;letter-spacing:-.055em}.editorialBlock p,.splitSection p,.finalText p{color:#ddd;line-height:1.6;font-size:17px}.featureImage,.imageCard{min-height:620px;border-radius:30px;border:1px solid rgba(255,255,255,.16);box-shadow:0 30px 90px rgba(0,0,0,.45);background-position:center top}.proofStrip{width:min(1240px,calc(100% - 40px));margin:0 auto;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.14)}.proofStrip span{background:#090009;padding:22px;text-transform:uppercase;font-weight:950;font-size:13px;letter-spacing:.08em;text-align:center}.section{width:min(1240px,calc(100% - 40px));margin:0 auto;padding:clamp(70px,9vw,112px) 0}.serviceGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.serviceGrid div,.stepGrid span,.systemCard{border:1px solid rgba(255,255,255,.14);background:linear-gradient(145deg,#0c0a0c,#16000e);border-radius:24px;padding:26px}.serviceGrid strong{font-size:clamp(18px,2vw,22px);text-transform:uppercase}.serviceGrid p{color:#cfc6cc;line-height:1.55}.splitSection{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.imageCard{min-height:520px;background-position:center 18%}.systemCard{min-height:420px;display:flex;flex-direction:column;justify-content:flex-end}.systemCard h3{margin:0 0 16px;font-size:clamp(36px,5vw,62px);line-height:.95;text-transform:uppercase}.stepGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:22px}.finalCta{min-height:560px;display:grid;align-items:center;background:radial-gradient(circle at 80% 20%,rgba(255,20,147,.22),transparent 32%),#050005;border-top:1px solid rgba(255,255,255,.14)}.finalText{width:min(900px,calc(100% - 40px));margin:0 auto;text-align:center}.finalText h2{font-size:clamp(44px,7vw,86px)}@media(max-width:1100px){.serviceGrid{grid-template-columns:repeat(2,minmax(0,1fr))}.proofStrip{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:820px){.nav{align-items:flex-start;gap:10px;display:grid;grid-template-columns:1fr auto}.brand{font-size:13px}.nav nav{grid-column:1/-1;display:flex;overflow-x:auto;justify-content:flex-start;padding-bottom:2px;scrollbar-width:none}.nav nav::-webkit-scrollbar{display:none}.nav nav a{flex:0 0 auto}.nav>.installButton,.nav>.installBadge{grid-column:2;grid-row:1;font-size:10px;padding:10px 12px;min-height:38px}.hero{grid-template-columns:1fr}.heroImage{grid-row:1;min-height:52svh;border-left:0;border-bottom:1px solid rgba(255,255,255,.12)}.heroCopy{grid-row:2;min-height:48svh;padding-top:44px}.editorialBlock,.splitSection{grid-template-columns:1fr;width:min(100% - 28px,720px)}.featureImage,.imageCard{min-height:460px}.serviceGrid,.stepGrid{grid-template-columns:1fr}.flip .systemCard{order:2}.flip>div:last-child{order:1}}@media(max-width:520px){.heroCopy h1{font-size:clamp(42px,13vw,58px)}.subhead{font-size:16px}.pinkButton,.installButton{width:100%;max-width:360px}.heroActions{align-items:stretch}.proofStrip{grid-template-columns:1fr;width:calc(100% - 28px)}.featureImage,.imageCard{min-height:360px;border-radius:22px}.editorialBlock h2,.section h2,.splitSection h2{font-size:36px}.finalText h2{font-size:42px}}
      `}</style>
    </main>
  );
}
