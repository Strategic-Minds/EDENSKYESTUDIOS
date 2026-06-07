import InstallButton from './install-button';

const campaignImage = 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-skye-studios-homepage-campaign.png?v=1780873477';

const panels = [
  { title: 'Beauty. Influence. Impact.', body: 'Campaign visuals for brands that need attention.', className: 'panelTopRight' },
  { title: 'Content that connects.', body: 'High-quality creator content built for engagement.', className: 'panelMidLeft' },
  { title: 'License. Publish. Profit.', body: 'Commercial-use assets for ads, social, ecommerce, and brand campaigns.', className: 'panelMidCenter' },
  { title: 'AUTO SOCIAL', body: 'Your discovery-to-posting content engine.', className: 'panelMidRight' },
  { title: 'Full-service creator production', body: 'Photoshoots, video production, brand collabs, UGC, editing, retouching, and campaign strategy.', className: 'panelBottomLeft' },
  { title: 'Products that sell.', body: 'Beauty, fashion, lifestyle, and campaign-ready product content.', className: 'panelBottomCenter' },
  { title: 'Create the next big thing.', body: 'Apply to work with Eden Skye Studios.', className: 'panelBottomRight' }
];

const services = ['Model Campaigns', 'Creator Production', 'Commercial Licensing', 'AUTO SOCIAL', 'Product Campaigns', 'Brand Launches'];

export default function Home() {
  return (
    <main className="site">
      <header className="nav">
        <a className="brand" href="#top" aria-label="Eden Skye Studios home">EDEN <span>SKYE</span> STUDIOS</a>
        <nav aria-label="Primary navigation">
          <a href="#models">Models</a>
          <a href="#services">Services</a>
          <a href="#licensing">Licensing</a>
          <a href="#autosocial">Auto Social</a>
          <a className="navCta" href="#apply">Apply</a>
        </nav>
        <InstallButton />
      </header>

      <section id="top" className="heroTheme">
        <div className="heroCopy">
          <p className="eyebrow">Digital Modeling Agency</p>
          <h1>EDEN <span>SKYE</span> STUDIOS</h1>
          <p className="subhead">Digital Modeling Agency & Content Creator Agency</p>
          <p className="micro">Models. Creators. Campaigns. Content.</p>
          <div className="heroActions">
            <a className="pinkButton" href="#apply">Apply Now</a>
            <InstallButton />
          </div>
        </div>
        <div className="themeCrop heroModel" role="img" aria-label="Eden Skye Studios campaign model" />
        <div className="heroGlow" />
      </section>

      <section id="models" className="productionGrid" aria-label="Campaign production panels">
        <article className="panel wideTop"><div className="themeCrop panelTopRight"/><div className="panelOverlay"/><div className="panelText bottomCenter"><h2>Beauty. <span>Influence.</span> Impact.</h2></div></article>
        {panels.slice(1).map((panel) => (
          <article className="panel" key={panel.title}>
            <div className={`themeCrop ${panel.className}`} />
            <div className="panelOverlay" />
            <div className="panelText"><h2>{panel.title}</h2><p>{panel.body}</p></div>
          </article>
        ))}
      </section>

      <section id="services" className="section services">
        <p className="eyebrow">Agency Services</p>
        <h2>Built like a campaign house. Operated like a content machine.</h2>
        <div className="serviceGrid">{services.map((service) => <div key={service}><strong>{service}</strong><p>Premium, image-heavy assets designed for launches, social, commerce, and brand growth.</p></div>)}</div>
      </section>

      <section id="licensing" className="splitSection">
        <div><p className="eyebrow">Licensing</p><h2>License. Publish. <span>Profit.</span></h2><p>Commercial-use visual packages for ad campaigns, social media, ecommerce, print, web, and brand storytelling.</p><a className="pinkButton" href="#apply">Request Licensing</a></div>
        <div className="themeCard"><div className="themeCrop panelMidCenter" /></div>
      </section>

      <section id="autosocial" className="splitSection flip">
        <div className="themeCard"><div className="themeCrop panelMidRight" /></div>
        <div><p className="eyebrow">AUTO SOCIAL</p><h2>Your 24/7 content engine.</h2><p>We create, post, grow, analyze, and improve content systems for brands that need constant attention without chaos.</p><div className="stepGrid">{['Content Creation','Daily Posting','Engagement Growth','Analytics Optimization'].map((x) => <span key={x}>{x}</span>)}</div></div>
      </section>

      <section id="apply" className="finalCta">
        <div className="themeCrop panelBottomRight" />
        <div className="finalOverlay" />
        <div className="finalText"><h2>Let’s create the next <span>big thing.</span></h2><p>Models, creators, brands. Together we build icons.</p><a className="pinkButton" href="mailto:strategicmindsadvisory@gmail.com">Apply Now</a></div>
      </section>

      <style>{`
        *{box-sizing:border-box}html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}body{margin:0;background:#000;color:#fff;font-family:Inter,Arial,sans-serif;overflow-x:hidden}.site{min-height:100vh;background:#000;color:#fff;overflow:hidden}.nav{position:fixed;top:0;left:0;right:0;z-index:50;display:flex;align-items:center;justify-content:space-between;gap:18px;padding:calc(14px + env(safe-area-inset-top)) clamp(14px,3vw,28px) 14px;background:rgba(0,0,0,.84);backdrop-filter:blur(22px);border-bottom:1px solid rgba(255,255,255,.16)}.brand{color:#fff;text-decoration:none;font-weight:950;letter-spacing:.08em;white-space:nowrap}.brand span,h1 span,h2 span{color:#ff1493}.nav nav{display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:flex-end}.nav a{color:#fff;text-decoration:none;font-size:12px;font-weight:900;text-transform:uppercase}.navCta,.pinkButton,.installButton{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;background:#ff1493;color:#fff!important;border:1px solid #ff1493;padding:13px 18px;text-decoration:none;font-weight:950;text-transform:uppercase;box-shadow:0 0 34px rgba(255,20,147,.42);min-height:44px}.installButton{cursor:pointer;font-size:12px;white-space:nowrap}.installBadge{display:inline-flex;align-items:center;border:1px solid rgba(255,20,147,.45);border-radius:999px;padding:11px 14px;color:#ffb8df;font-size:12px;font-weight:900;text-transform:uppercase;white-space:nowrap}.heroTheme{position:relative;min-height:100svh;display:grid;grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr);align-items:stretch;overflow:hidden;border-bottom:1px solid rgba(255,255,255,.28)}.heroCopy{position:relative;z-index:3;display:flex;flex-direction:column;justify-content:center;padding:120px clamp(20px,4vw,56px) 70px;background:linear-gradient(90deg,#000 0%,rgba(0,0,0,.94) 62%,rgba(0,0,0,.08) 100%)}.heroCopy h1{margin:0;font-size:clamp(48px,8vw,92px);line-height:.9;font-weight:1000;letter-spacing:-.06em}.subhead{margin:18px 0 0;font-size:clamp(16px,2vw,22px);text-transform:uppercase;font-weight:900}.micro{margin:28px 0 24px;color:#ddd;font-size:14px;text-transform:uppercase;letter-spacing:.08em}.heroActions{display:flex;gap:12px;flex-wrap:wrap}.heroGlow{position:absolute;inset:auto 0 0 auto;width:55vw;height:80vh;background:radial-gradient(circle,rgba(255,20,147,.35),transparent 58%);filter:blur(20px);pointer-events:none}.themeCrop{width:100%;height:100%;background-image:url(${campaignImage});background-repeat:no-repeat;background-size:cover;background-position:center;background-color:#050005}.heroModel{min-height:100svh;background-position:center top}.productionGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-auto-rows:minmax(360px,42vw);border-top:1px solid rgba(255,255,255,.32);border-left:1px solid rgba(255,255,255,.32)}.panel{position:relative;overflow:hidden;border-right:1px solid rgba(255,255,255,.32);border-bottom:1px solid rgba(255,255,255,.32);background:#050005}.wideTop{grid-column:span 3;min-height:430px}.panelOverlay,.finalOverlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.78),rgba(0,0,0,.18) 58%,rgba(0,0,0,.58))}.panelText{position:absolute;z-index:3;left:clamp(18px,3vw,32px);right:clamp(18px,3vw,32px);bottom:clamp(18px,3vw,32px);max-width:390px}.panelText.bottomCenter{left:50%;right:auto;transform:translateX(-50%);text-align:center;max-width:min(900px,calc(100% - 36px));width:100%}.panelText h2{margin:0 0 12px;font-size:clamp(30px,4vw,48px);line-height:.96;text-transform:uppercase;font-weight:1000}.panelText p{margin:0;color:#eee;font-size:15px;line-height:1.45;text-transform:uppercase}.panelTopRight{background-position:65% 12%}.panelMidLeft{background-position:18% 45%}.panelMidCenter{background-position:center}.panelMidRight{background-position:82% 45%}.panelBottomLeft{background-position:18% 82%}.panelBottomCenter{background-position:center 82%}.panelBottomRight{background-position:82% 82%}.section{width:min(1240px,calc(100% - 40px));margin:0 auto;padding:clamp(64px,8vw,96px) 0}.eyebrow{margin:0 0 12px;color:#ff1493;text-transform:uppercase;font-size:12px;font-weight:1000;letter-spacing:.16em}.section h2,.splitSection h2,.finalText h2{margin:0 0 26px;font-size:clamp(38px,6vw,64px);line-height:.95;text-transform:uppercase;letter-spacing:-.05em}.serviceGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.serviceGrid div,.stepGrid span{border:1px solid rgba(255,20,147,.4);background:linear-gradient(145deg,#080008,#16000e);border-radius:20px;padding:24px}.serviceGrid strong{font-size:clamp(18px,2vw,22px);text-transform:uppercase}.serviceGrid p,.splitSection p,.finalText p{color:#ddd;line-height:1.55}.splitSection{width:min(1240px,calc(100% - 40px));margin:0 auto;padding:clamp(64px,8vw,96px) 0;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:36px;align-items:center;border-top:1px solid rgba(255,255,255,.18)}.themeCard{height:min(540px,72vw);min-height:360px;overflow:hidden;border:1px solid rgba(255,20,147,.45);border-radius:24px;box-shadow:0 30px 90px rgba(255,20,147,.16)}.stepGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:22px}.finalCta{position:relative;min-height:min(660px,90svh);overflow:hidden;border-top:1px solid rgba(255,255,255,.25)}.finalCta .themeCrop{position:absolute;inset:0}.finalText{position:relative;z-index:4;max-width:680px;padding:clamp(88px,12vw,130px) clamp(20px,4vw,56px)}.finalText h2{font-size:clamp(42px,7vw,76px)}@media(max-width:1100px){.nav nav{gap:8px}.nav a{font-size:11px}.productionGrid{grid-template-columns:repeat(2,minmax(0,1fr))}.wideTop{grid-column:span 2}.serviceGrid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:820px){.nav{align-items:flex-start;gap:10px;display:grid;grid-template-columns:1fr auto}.brand{font-size:13px}.nav nav{grid-column:1/-1;display:flex;overflow-x:auto;justify-content:flex-start;padding-bottom:2px;scrollbar-width:none}.nav nav::-webkit-scrollbar{display:none}.nav nav a{flex:0 0 auto}.nav>.installButton,.nav>.installBadge{grid-column:2;grid-row:1;font-size:10px;padding:10px 12px;min-height:38px}.heroTheme,.splitSection{grid-template-columns:1fr}.heroCopy{min-height:58svh;padding-top:150px;background:linear-gradient(180deg,#000 0%,rgba(0,0,0,.94) 70%,rgba(0,0,0,.2) 100%)}.heroModel{min-height:48svh;grid-row:1;background-position:center top;opacity:.92}.heroCopy{grid-row:2}.productionGrid{grid-template-columns:1fr;grid-auto-rows:minmax(380px,78svh)}.wideTop{grid-column:span 1}.serviceGrid,.stepGrid{grid-template-columns:1fr}.themeCard{height:420px}.flip .themeCard{order:2}.flip>div:last-child{order:1}.section,.splitSection{width:min(100% - 28px,720px)}.panelText.bottomCenter{text-align:left;left:18px;transform:none;max-width:calc(100% - 36px)}}@media(max-width:520px){.heroCopy h1{font-size:clamp(44px,16vw,62px)}.subhead{font-size:15px}.micro{font-size:12px}.pinkButton,.installButton{width:100%;max-width:360px}.heroActions{align-items:stretch}.productionGrid{grid-auto-rows:minmax(340px,72svh)}.panelText h2{font-size:32px}.panelText p{font-size:13px}.section h2,.splitSection h2{font-size:38px}.finalText h2{font-size:42px}.themeCard{min-height:320px;height:360px}.finalCta{min-height:560px}}
      `}</style>
    </main>
  );
}
