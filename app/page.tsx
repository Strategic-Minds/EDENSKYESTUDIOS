import InstallButton from './install-button';

const campaignImage = 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-skye-studios-homepage-campaign.png?v=1780873477';

const services = [
  { title: 'Model Campaigns', body: 'Premium campaign direction for creator-led visual launches.' },
  { title: 'Creator Production', body: 'Shot lists, production boards, editing, retouching, and delivery.' },
  { title: 'Commercial Licensing', body: 'Approval-gated image packages for ads, social, commerce, and web.' },
  { title: 'AUTO SOCIAL', body: 'A controlled content engine for drafting, scoring, scheduling, and improving posts.' },
  { title: 'Product Campaigns', body: 'Beauty and lifestyle content built for trust, attention, and conversion.' },
  { title: 'Brand Launches', body: 'Campaign systems with creative, assets, approvals, and performance loops.' }
];

const slots = [
  'Hero campaign',
  'Model roster',
  'Founder portrait',
  'Creator production',
  'Licensing',
  'Auto Social',
  'Product campaign',
  'Apply CTA'
];

export default function Home() {
  return (
    <main className="site">
      <header className="nav">
        <a className="brand" href="#top" aria-label="Eden Skye Studios home">EDEN <span>SKYE</span> STUDIOS</a>
        <nav aria-label="Primary navigation">
          <a href="#studio">Studio</a>
          <a href="#services">Services</a>
          <a href="#system">System</a>
          <a href="#pwa">App</a>
          <a className="navCta" href="#apply">Apply</a>
        </nav>
        <InstallButton />
      </header>

      <section id="top" className="hero">
        <div className="heroCopy">
          <p className="eyebrow">Digital Modeling Agency & Content Creator Agency</p>
          <h1>EDEN <span>SKYE</span> STUDIOS</h1>
          <p className="subhead">Models. Creators. Campaigns. Content. Built with a premium black-and-pink visual system, not repetitive collage clutter.</p>
          <div className="heroActions">
            <a className="pinkButton" href="#apply">Apply Now</a>
            <InstallButton />
          </div>
        </div>
        <div className="heroVisual" role="img" aria-label="Eden Skye Studios premium campaign visual" />
      </section>

      <section id="studio" className="studioSection">
        <div className="studioCopy">
          <p className="eyebrow">Enterprise Visual Standard</p>
          <h2>Luxury creator content with controlled image slots.</h2>
          <p>The theme stays black, pink, premium, and bold. The structure is now cleaner: each website section gets a purpose, not the same image chopped into a dozen repeating blocks.</p>
        </div>
        <div className="visualSystem">
          {slots.map((slot) => <span key={slot}>{slot}</span>)}
        </div>
      </section>

      <section id="services" className="servicesSection">
        <p className="eyebrow">Agency Services</p>
        <h2>Built like a campaign house. Operated like a content machine.</h2>
        <div className="serviceGrid">
          {services.map((service) => <article key={service.title}><strong>{service.title}</strong><p>{service.body}</p></article>)}
        </div>
      </section>

      <section id="system" className="splitSection">
        <div className="imageCard" role="img" aria-label="Eden Skye campaign direction board" />
        <div>
          <p className="eyebrow">Auto Social</p>
          <h2>Your 24/7 content engine.</h2>
          <p>Content creation, approval, scheduling, analytics, and winner replication stay governed. Public posting remains locked until approved.</p>
          <div className="stepGrid">{['Create','Approve','Schedule','Measure'].map((item) => <span key={item}>{item}</span>)}</div>
        </div>
      </section>

      <section id="pwa" className="appSection">
        <div>
          <p className="eyebrow">Mobile App Ready</p>
          <h2>Installable PWA shell.</h2>
          <p>The app install button is in place for supported browsers. The site is being configured as an installable mobile web app with manifest support and mobile-safe layout behavior.</p>
        </div>
        <div className="phoneCard"><span>ES</span><small>Eden Skye Studios</small><InstallButton /></div>
      </section>

      <section id="apply" className="finalCta">
        <div className="finalText"><p className="eyebrow">Apply / Collaborate</p><h2>Create the next <span>big thing.</span></h2><p>Models, creators, brands. Together we build icons with discipline, taste, and a real content operating system.</p><a className="pinkButton" href="mailto:strategicmindsadvisory@gmail.com">Apply Now</a></div>
      </section>

      <style>{`
        *{box-sizing:border-box}html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}body{margin:0;background:#030003;color:#fff;font-family:Inter,Arial,sans-serif;overflow-x:hidden}.site{min-height:100vh;background:linear-gradient(180deg,#030003,#0b0008 48%,#030003);overflow:hidden;color:#fff}.nav{position:fixed;top:0;left:0;right:0;z-index:50;display:flex;align-items:center;justify-content:space-between;gap:18px;padding:calc(14px + env(safe-area-inset-top)) clamp(14px,3vw,28px) 14px;background:rgba(0,0,0,.88);backdrop-filter:blur(22px);border-bottom:1px solid rgba(255,255,255,.12)}.brand{color:#fff;text-decoration:none;font-weight:1000;letter-spacing:.08em;white-space:nowrap}.brand span,h1 span,h2 span{color:#ff1493}.nav nav{display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:flex-end}.nav a{color:#fff;text-decoration:none;font-size:12px;font-weight:900;text-transform:uppercase}.navCta,.pinkButton,.installButton{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;background:#ff1493;color:#fff!important;border:1px solid #ff1493;padding:13px 18px;text-decoration:none;font-weight:950;text-transform:uppercase;box-shadow:0 0 34px rgba(255,20,147,.3);min-height:44px}.installButton{cursor:pointer;font-size:12px;white-space:nowrap}.installBadge{display:inline-flex;align-items:center;border:1px solid rgba(255,20,147,.45);border-radius:999px;padding:11px 14px;color:#ffb8df;font-size:12px;font-weight:900;text-transform:uppercase;white-space:nowrap}.hero{min-height:100svh;display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);align-items:stretch;border-bottom:1px solid rgba(255,255,255,.16)}.heroCopy{display:flex;flex-direction:column;justify-content:center;padding:132px clamp(22px,5vw,72px) 72px;background:radial-gradient(circle at 15% 30%,rgba(255,20,147,.26),transparent 34%),#030003}.heroCopy h1{margin:0;max-width:760px;font-size:clamp(58px,8.5vw,120px);line-height:.86;font-weight:1000;letter-spacing:-.07em}.subhead{max-width:680px;margin:24px 0 0;font-size:clamp(17px,1.8vw,23px);line-height:1.38;color:#eee}.heroActions{display:flex;gap:12px;flex-wrap:wrap;margin-top:30px}.eyebrow{margin:0 0 14px;color:#ff1493;text-transform:uppercase;font-size:12px;font-weight:1000;letter-spacing:.16em}.heroVisual,.imageCard{background-image:linear-gradient(90deg,rgba(0,0,0,.05),rgba(0,0,0,.15)),url(${campaignImage});background-size:cover;background-repeat:no-repeat;background-position:center top}.heroVisual{min-height:100svh;border-left:1px solid rgba(255,255,255,.12)}.studioSection,.splitSection,.appSection{width:min(1240px,calc(100% - 40px));margin:0 auto;padding:clamp(72px,9vw,116px) 0;display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(28px,5vw,64px);align-items:center;border-bottom:1px solid rgba(255,255,255,.13)}.studioCopy h2,.servicesSection h2,.splitSection h2,.appSection h2,.finalText h2{margin:0 0 24px;font-size:clamp(38px,5.5vw,72px);line-height:.95;text-transform:uppercase;letter-spacing:-.055em}.studioCopy p,.splitSection p,.appSection p,.finalText p{color:#ddd;line-height:1.6;font-size:17px}.visualSystem{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.visualSystem span,.serviceGrid article,.stepGrid span,.phoneCard{border:1px solid rgba(255,255,255,.14);background:linear-gradient(145deg,#0c0a0c,#17000f);border-radius:24px;padding:24px;text-transform:uppercase;font-weight:950;letter-spacing:.05em}.servicesSection{width:min(1240px,calc(100% - 40px));margin:0 auto;padding:clamp(72px,9vw,116px) 0;border-bottom:1px solid rgba(255,255,255,.13)}.serviceGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.serviceGrid strong{font-size:clamp(18px,2vw,22px);text-transform:uppercase}.serviceGrid p{color:#cfc6cc;line-height:1.55;text-transform:none;letter-spacing:0}.imageCard{min-height:560px;border-radius:30px;border:1px solid rgba(255,255,255,.16);box-shadow:0 30px 90px rgba(0,0,0,.48);background-position:center 18%}.stepGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:22px}.phoneCard{min-height:420px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:18px;background:radial-gradient(circle at 50% 20%,rgba(255,20,147,.3),transparent 32%),linear-gradient(145deg,#070007,#17000f)}.phoneCard span{font-size:96px;font-weight:1000;letter-spacing:-.08em}.phoneCard small{text-transform:uppercase;letter-spacing:.16em;color:#ffb8df;font-weight:900}.finalCta{min-height:560px;display:grid;align-items:center;background:radial-gradient(circle at 80% 20%,rgba(255,20,147,.24),transparent 32%),#030003;border-top:1px solid rgba(255,255,255,.14)}.finalText{width:min(900px,calc(100% - 40px));margin:0 auto;text-align:center}.finalText h2{font-size:clamp(44px,7vw,88px)}@media(max-width:1100px){.serviceGrid{grid-template-columns:repeat(2,minmax(0,1fr))}.visualSystem{grid-template-columns:1fr}}@media(max-width:820px){.nav{align-items:flex-start;gap:10px;display:grid;grid-template-columns:1fr auto}.brand{font-size:13px}.nav nav{grid-column:1/-1;display:flex;overflow-x:auto;justify-content:flex-start;padding-bottom:2px;scrollbar-width:none}.nav nav::-webkit-scrollbar{display:none}.nav nav a{flex:0 0 auto}.nav>.installButton,.nav>.installBadge{grid-column:2;grid-row:1;font-size:10px;padding:10px 12px;min-height:38px}.hero{grid-template-columns:1fr}.heroVisual{grid-row:1;min-height:52svh;border-left:0;border-bottom:1px solid rgba(255,255,255,.12)}.heroCopy{grid-row:2;min-height:48svh;padding-top:44px}.studioSection,.splitSection,.appSection{grid-template-columns:1fr;width:min(100% - 28px,720px)}.imageCard{min-height:420px}.serviceGrid,.stepGrid{grid-template-columns:1fr}}@media(max-width:520px){.heroCopy h1{font-size:clamp(54px,16vw,72px)}.subhead{font-size:16px}.pinkButton,.installButton{width:100%;max-width:360px}.heroActions{align-items:stretch}.imageCard{min-height:340px;border-radius:22px}.studioCopy h2,.servicesSection h2,.splitSection h2,.appSection h2{font-size:36px}.finalText h2{font-size:42px}.serviceGrid article,.visualSystem span{padding:20px}}
      `}</style>
    </main>
  );
}
