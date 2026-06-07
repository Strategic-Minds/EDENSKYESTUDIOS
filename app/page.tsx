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
        <a className="brand" href="#top">EDEN <span>SKYE</span> STUDIOS</a>
        <nav>
          <a href="#models">Models</a>
          <a href="#services">Services</a>
          <a href="#licensing">Licensing</a>
          <a href="#autosocial">Auto Social</a>
          <a className="navCta" href="#apply">Apply</a>
        </nav>
      </header>

      <section id="top" className="heroTheme">
        <div className="heroCopy">
          <h1>EDEN <span>SKYE</span> STUDIOS</h1>
          <p className="subhead">Digital Modeling Agency & Content Creator Agency</p>
          <p className="micro">Models. Creators. Campaigns. Content.</p>
          <a className="pinkButton" href="#apply">Apply Now</a>
        </div>
        <div className="themeCrop heroModel" aria-label="Eden Skye Studios campaign model" />
        <div className="heroGlow" />
      </section>

      <section id="models" className="productionGrid">
        <article className="panel wideTop"><div className="themeCrop panelTopRight"/><div className="panelText bottomCenter"><h2>Beauty. <span>Influence.</span> Impact.</h2></div></article>
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
        *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#000;color:#fff;font-family:Inter,Arial,sans-serif}.site{min-height:100vh;background:#000;color:#fff}.nav{position:fixed;top:0;left:0;right:0;z-index:50;display:flex;align-items:center;justify-content:space-between;gap:24px;padding:18px 28px;background:rgba(0,0,0,.82);backdrop-filter:blur(22px);border-bottom:1px solid rgba(255,255,255,.16)}.brand{color:#fff;text-decoration:none;font-weight:950;letter-spacing:.08em}.brand span,h1 span,h2 span{color:#ff1493}.nav nav{display:flex;align-items:center;gap:18px}.nav a{color:#fff;text-decoration:none;font-size:13px;font-weight:900;text-transform:uppercase}.navCta,.pinkButton{display:inline-flex;align-items:center;justify-content:center;border-radius:6px;background:#ff1493;color:#fff!important;border:1px solid #ff1493;padding:13px 19px;text-decoration:none;font-weight:950;text-transform:uppercase;box-shadow:0 0 34px rgba(255,20,147,.42)}.heroTheme{position:relative;min-height:100vh;display:grid;grid-template-columns:1fr 1.2fr;align-items:stretch;overflow:hidden;border-bottom:1px solid rgba(255,255,255,.28)}.heroCopy{position:relative;z-index:3;display:flex;flex-direction:column;justify-content:center;padding:110px 24px 70px 32px;background:linear-gradient(90deg,#000 0%,rgba(0,0,0,.94) 62%,rgba(0,0,0,.08) 100%)}.heroCopy h1{margin:0;font-size:72px;line-height:.92;font-weight:1000;letter-spacing:-.06em}.subhead{margin:18px 0 0;font-size:20px;text-transform:uppercase;font-weight:900}.micro{margin:28px 0 24px;color:#ddd;font-size:14px;text-transform:uppercase;letter-spacing:.08em}.heroGlow{position:absolute;inset:auto 0 0 auto;width:55vw;height:80vh;background:radial-gradient(circle,rgba(255,20,147,.35),transparent 58%);filter:blur(20px);pointer-events:none}.themeCrop{width:100%;height:100%;background-image:url(${campaignImage});background-repeat:no-repeat;background-size:1402px 1024px;background-color:#050005}.heroModel{background-position:-330px 0;min-height:100vh}.productionGrid{display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:minmax(360px,42vw);border-top:1px solid rgba(255,255,255,.32);border-left:1px solid rgba(255,255,255,.32)}.panel{position:relative;overflow:hidden;border-right:1px solid rgba(255,255,255,.32);border-bottom:1px solid rgba(255,255,255,.32);background:#050005}.wideTop{grid-column:span 3;min-height:430px}.panelOverlay,.finalOverlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.75),rgba(0,0,0,.12) 58%,rgba(0,0,0,.55))}.panelText{position:absolute;z-index:3;left:28px;bottom:28px;max-width:360px}.panelText.bottomCenter{left:50%;transform:translateX(-50%);text-align:center;max-width:900px}.panelText h2{margin:0 0 12px;font-size:38px;line-height:.96;text-transform:uppercase;font-weight:1000}.panelText p{margin:0;color:#eee;font-size:15px;line-height:1.45;text-transform:uppercase}.panelTopRight{background-position:-700px 0}.panelMidLeft{background-position:0 -410px}.panelMidCenter{background-position:-467px -410px}.panelMidRight{background-position:-934px -410px}.panelBottomLeft{background-position:0 -690px}.panelBottomCenter{background-position:-467px -690px}.panelBottomRight{background-position:-934px -690px}.section{width:min(1240px,calc(100% - 40px));margin:0 auto;padding:96px 0}.eyebrow{margin:0 0 12px;color:#ff1493;text-transform:uppercase;font-size:12px;font-weight:1000;letter-spacing:.16em}.section h2,.splitSection h2,.finalText h2{margin:0 0 26px;font-size:58px;line-height:.95;text-transform:uppercase;letter-spacing:-.05em}.serviceGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.serviceGrid div,.stepGrid span{border:1px solid rgba(255,20,147,.4);background:linear-gradient(145deg,#080008,#16000e);border-radius:20px;padding:24px}.serviceGrid strong{font-size:22px;text-transform:uppercase}.serviceGrid p,.splitSection p,.finalText p{color:#ddd;line-height:1.55}.splitSection{width:min(1240px,calc(100% - 40px));margin:0 auto;padding:96px 0;display:grid;grid-template-columns:1fr 1fr;gap:36px;align-items:center;border-top:1px solid rgba(255,255,255,.18)}.themeCard{height:540px;overflow:hidden;border:1px solid rgba(255,20,147,.45);border-radius:24px;box-shadow:0 30px 90px rgba(255,20,147,.16)}.stepGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:22px}.finalCta{position:relative;min-height:660px;overflow:hidden;border-top:1px solid rgba(255,255,255,.25)}.finalCta .themeCrop{position:absolute;inset:0;background-size:1402px 1024px}.finalText{position:relative;z-index:4;max-width:640px;padding:120px 32px}.finalText h2{font-size:64px}@media(max-width:900px){.nav nav{display:none}.heroTheme,.splitSection{grid-template-columns:1fr}.heroCopy h1{font-size:54px}.productionGrid{grid-template-columns:1fr;grid-auto-rows:430px}.wideTop{grid-column:span 1}.serviceGrid{grid-template-columns:1fr}.themeCrop{background-size:980px 716px}.heroModel{min-height:520px;background-position:-220px 0}.panelTopRight{background-position:-490px 0}.panelMidLeft{background-position:0 -287px}.panelMidCenter{background-position:-326px -287px}.panelMidRight{background-position:-653px -287px}.panelBottomLeft{background-position:0 -482px}.panelBottomCenter{background-position:-326px -482px}.panelBottomRight{background-position:-653px -482px}}
      `}</style>
    </main>
  );
}
