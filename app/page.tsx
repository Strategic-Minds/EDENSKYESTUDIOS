const heroImage = 'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/4992ef73-f8a0-4b4f-a10d-54a962066394/Create_four_distinct_premium_editorial_model_card_portraits_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZThkNjRhZDE4MjlkY2MyZCIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc0NTE2OX0.o9ejT9pqsy64NI9NYK44xuF5SiY6lxRL9Zf0hBrexIY';

const creatorImages = [
  ['Eden Skye', 'Founder icon', 'Black Card host', heroImage],
  ['Solara Vane', 'Luxury creator', 'warm cinematic confidence', 'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/9c0b40df-6a61-435c-867c-662e8085b1c1/Create_four_distinct_premium_editorial_model_card_portraits_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZDkzOWMzMDA3Mzg2YmRhMCIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc5MzM0NH0.vswFmLbPjjly8W4OQPKly8Yn2Eq1G87nyHZHXRgBcHI'],
  ['Liora Vale', 'Editorial muse', 'soft precision and polish', 'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/4605f045-10c8-4cdc-a570-d4b2861aa1a6/Create_four_distinct_premium_editorial_model_card_portraits_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiY2UxMGRiNzI5Njc2MTM2ZiIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc5MjA1MH0.29e8ggnDwzl3FmDGCfP6jObsu25Q1J1HIJdUFO66KVQ'],
  ['Nova Rain', 'Nightlife creator', 'glossy after-dark energy', 'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/bdfb6bbc-0e73-4454-b6b9-ea5c2e4ffff4/Create_four_distinct_premium_editorial_model_card_portraits_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiNzRjZmFmY2RiMjE5YzYzMiIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc0NzIxM30.OVmf7x29m3YZCKG7v-x9nmZpt2zQKa0mxTN_4b_mIMg'],
  ['Celeste Noir', 'Commercial model', 'product-ready elegance', 'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/c61940cd-3041-4b69-b08e-6d8ad254c7de/Create_four_distinct_premium_editorial_model_card_portraits_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiMGQ3Y2NmNzZiY2IxNjYwZSIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc5MjE4Mn0.OoxXOB0jiOdOz7ke54RywoocSwkHW70f35Ipn6EGxSU']
] as const;

const lanes = [
  ['Chat', 'Real-time AI creator conversation after login'],
  ['Video Chat', 'Avatar-ready face-to-face workflow after approval'],
  ['Downloads', 'Images, videos, templates, and private content drops'],
  ['Shop', 'Luxury products, Black Card access, and gated offers'],
  ['Licenses', 'Commercial-use rights and asset terms'],
  ['Membership', 'VIP access into Edens Closet']
] as const;

const products = [
  ['Black Card Membership', 'VIP access', 'Payment preview'],
  ['Private Creator Room', 'Edens Closet login', 'Members only'],
  ['Digital Drops', 'Approved downloads', 'Coming soon'],
  ['Creator Licenses', 'Commercial use', 'Review gate'],
  ['Luxury Lifestyle', 'Shopify products', 'Draft'],
  ['Studio Services', 'Private applications', 'Approval only']
] as const;

const styles = `
  .mockupSite { min-height: 100vh; overflow: hidden; background: #050505; color: #f7f3ee; }
  .mockupTopbar { position: fixed; inset: 0 0 auto 0; z-index: 20; display: flex; align-items: center; justify-content: space-between; gap: 18px; padding: 16px 28px; border-bottom: 1px solid rgba(255,255,255,.1); background: rgba(5,5,5,.76); backdrop-filter: blur(22px); }
  .mockupBrand { display: inline-flex; align-items: center; gap: 12px; color: #fff; text-decoration: none; font-weight: 900; }
  .mockupBrand span { display: grid; width: 38px; height: 38px; place-items: center; border-radius: 50%; background: linear-gradient(135deg,#fff,#b9a56d 38%,#f4e5a6 58%,#6e6036); color: #050505; font-size: 13px; }
  .mockupBrand small { display: block; color: #c8bd95; font-size: 11px; font-weight: 800; }
  .mockupNav { display: flex; align-items: center; justify-content: flex-end; gap: 16px; flex-wrap: wrap; }
  .mockupNav a, .mockupButton, .mockupButtonGhost { min-height: 42px; display: inline-flex; align-items: center; justify-content: center; border-radius: 8px; padding: 10px 14px; text-decoration: none; font-size: 13px; font-weight: 900; transition: transform 160ms ease, border-color 160ms ease, background 160ms ease; }
  .mockupNav a { color: #d8d2bf; }
  .mockupNav .navPay, .mockupButton { border: 1px solid #d8b66a; background: #d8b66a; color: #050505; }
  .mockupButtonGhost { border: 1px solid rgba(255,255,255,.18); background: rgba(255,255,255,.06); color: #fff; }
  .mockupNav a:hover, .mockupButton:hover, .mockupButtonGhost:hover { transform: translateY(-1px); border-color: #fff; }
  .mockupHero { min-height: 100svh; display: grid; grid-template-columns: minmax(0,.92fr) minmax(340px,1fr); align-items: center; gap: 42px; padding: 116px 28px 48px; background: radial-gradient(circle at 72% 12%, rgba(216,182,106,.18), transparent 28%), linear-gradient(180deg,#050505,#090909 58%,#050505); }
  .mockupHeroCopy { max-width: 690px; animation: mockupRise 680ms ease both; }
  .mockupEyebrow { margin: 0 0 14px; color: #d8b66a; font-size: 12px; font-weight: 950; letter-spacing: 0; text-transform: uppercase; }
  .mockupHero h1 { margin: 0 0 18px; font-size: 82px; line-height: .9; letter-spacing: 0; }
  .mockupHero p { color: #d8d2bf; font-size: 20px; line-height: 1.52; max-width: 640px; }
  .mockupActions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 28px; }
  .mockupVisual { position: relative; min-height: 660px; display: grid; align-items: end; justify-items: center; overflow: hidden; border-left: 1px solid rgba(255,255,255,.12); }
  .mockupVisual::before { content: ''; position: absolute; inset: 8% 10%; border-radius: 50%; background: radial-gradient(circle, rgba(216,182,106,.24), transparent 58%); filter: blur(18px); }
  .mockupVisual img { position: relative; width: min(500px, 86%); max-height: 760px; object-fit: cover; object-position: center top; aspect-ratio: 3 / 4; border: 1px solid rgba(216,182,106,.42); border-radius: 8px; box-shadow: 0 34px 90px rgba(0,0,0,.54); }
  .blackCard { position: absolute; right: 22px; bottom: 42px; width: min(320px, 72%); padding: 18px; border: 1px solid rgba(216,182,106,.46); border-radius: 8px; background: linear-gradient(135deg, rgba(8,8,8,.94), rgba(35,31,22,.9)); box-shadow: 0 24px 70px rgba(0,0,0,.5); }
  .blackCard strong { display: block; margin-bottom: 12px; color: #fff; font-size: 22px; }
  .blackCard span { color: #d8b66a; font-weight: 900; }
  .quickLanes, .creatorStrip, .blackCardBand, .shopSystem, .licenseBand, .portalBand, .finalMockupCta { width: min(1220px, calc(100% - 40px)); margin: 0 auto; padding: 78px 0; }
  .quickLanes { display: grid; grid-template-columns: repeat(6,minmax(0,1fr)); gap: 1px; padding-top: 0; border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.12); border-radius: 8px; overflow: hidden; }
  .quickLanes a { min-height: 156px; display: flex; flex-direction: column; justify-content: flex-end; gap: 10px; padding: 16px; background: #0d0d0d; color: #fff; text-decoration: none; }
  .quickLanes span, .sectionIntro p, .creatorCard span, .productCard span, .productCard small, .licenseBand p, .portalCard p, .finalMockupCta p { color: #b9b4ad; }
  .sectionRow { display: flex; justify-content: space-between; gap: 24px; align-items: flex-end; margin-bottom: 22px; }
  .sectionIntro { max-width: 760px; }
  .sectionIntro h2, .blackCardBand h2, .licenseBand h2, .portalBand h2, .finalMockupCta h2 { margin: 0 0 14px; color: #fff; font-size: 42px; line-height: 1; letter-spacing: 0; }
  .creatorGrid { display: grid; grid-template-columns: repeat(5,minmax(0,1fr)); gap: 10px; }
  .creatorCard { min-height: 440px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; border: 1px solid rgba(255,255,255,.12); border-radius: 8px; background: #0d0d0d; }
  .creatorCard img { width: 100%; aspect-ratio: 3 / 4; object-fit: cover; object-position: center top; border-bottom: 1px solid rgba(255,255,255,.12); }
  .creatorCard div { padding: 14px; }
  .creatorCard strong { display: block; margin-bottom: 4px; color: #fff; }
  .blackCardBand { display: grid; grid-template-columns: minmax(0,.8fr) minmax(320px,1fr); gap: 42px; align-items: center; border-top: 1px solid rgba(255,255,255,.12); border-bottom: 1px solid rgba(255,255,255,.12); }
  .cardMock { min-height: 360px; display: grid; align-content: space-between; padding: 28px; border: 1px solid rgba(216,182,106,.5); border-radius: 8px; background: linear-gradient(135deg,#080808,#191407 58%,#060606); box-shadow: 0 30px 80px rgba(0,0,0,.44); }
  .cardMock span { color: #d8b66a; font-weight: 900; }
  .cardMock strong { color: #fff; font-size: 34px; }
  .blackCardBand ul { margin: 20px 0 0; padding-left: 18px; color: #d8d2bf; line-height: 1.7; }
  .productRail { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 10px; }
  .productCard, .portalCard { min-height: 170px; padding: 18px; border: 1px solid rgba(255,255,255,.12); border-radius: 8px; background: linear-gradient(145deg,#0b0b0b,#151515); }
  .productCard strong { display: block; margin: 20px 0 8px; color: #fff; font-size: 20px; }
  .licenseBand { display: grid; grid-template-columns: minmax(0,1fr) minmax(300px,.72fr); gap: 42px; align-items: center; border-top: 1px solid rgba(255,255,255,.12); }
  .proofRows { border-top: 1px solid rgba(255,255,255,.12); }
  .proofRows div { display: grid; grid-template-columns: 160px 1fr; gap: 18px; padding: 18px 0; border-bottom: 1px solid rgba(255,255,255,.12); }
  .proofRows strong { color: #d8b66a; }
  .portalGrid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 12px; }
  .portalCard a { margin-top: 18px; }
  .finalMockupCta { min-height: 380px; display: grid; align-content: center; }
  @keyframes mockupRise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @media (max-width: 1020px) { .mockupHero, .blackCardBand, .licenseBand { grid-template-columns: 1fr; } .quickLanes, .creatorGrid { grid-template-columns: repeat(2,minmax(0,1fr)); } .productRail { grid-template-columns: repeat(2,minmax(0,1fr)); } .mockupVisual { border-left: 0; min-height: 560px; } }
  @media (max-width: 680px) { .mockupTopbar { position: absolute; align-items: flex-start; padding: 14px; } .mockupNav { gap: 8px; } .mockupNav a:not(.navPay):not(.navLogin) { display: none; } .mockupHero { padding: 104px 16px 36px; } .mockupHero h1 { font-size: 44px; } .mockupHero p { font-size: 17px; } .quickLanes, .creatorStrip, .blackCardBand, .shopSystem, .licenseBand, .portalBand, .finalMockupCta { width: min(100% - 28px,1220px); padding: 54px 0; } .quickLanes, .creatorGrid, .productRail, .portalGrid { grid-template-columns: 1fr; } .proofRows div { grid-template-columns: 1fr; } }
`;

export default function HomePage() {
  return (
    <main className="mockupSite">
      <style>{styles}</style>
      <header className="mockupTopbar" aria-label="Primary navigation">
        <a className="mockupBrand" href="/">
          <span>ES</span>
          <div><strong>Eden Skye</strong><small>Studios</small></div>
        </a>
        <nav className="mockupNav">
          <a href="#creators">Creators</a>
          <a href="#shop">Shop</a>
          <a href="#membership">Black Card</a>
          <a href="#licenses">Licenses</a>
          <a className="navLogin" href="/login">Login</a>
          <a className="navPay" href="/payment">Join / Pay</a>
        </nav>
      </header>

      <section className="mockupHero">
        <div className="mockupHeroCopy">
          <p className="mockupEyebrow">Luxury AI creator commerce</p>
          <h1>Luxury. Connection. Freedom.</h1>
          <p>
            Connect with premium fictional creators, gated content, memberships, downloads, product paths, licenses, and governed AI media inside one Shopify-ready storefront.
          </p>
          <div className="mockupActions">
            <a className="mockupButton" href="/payment">Enter Black Card</a>
            <a className="mockupButtonGhost" href="/login">Member login</a>
            <a className="mockupButtonGhost" href="/closet">Preview Edens Closet</a>
          </div>
        </div>
        <div className="mockupVisual" aria-label="Eden Skye storefront visual">
          <img src={heroImage} alt="Eden Skye luxury AI creator storefront preview" />
          <div className="blackCard">
            <span>BLACK CARD</span>
            <strong>Private access to Edens Closet</strong>
            <p>Choose a model, unlock her room, then enter the behind-the-scenes version after login.</p>
          </div>
        </div>
      </section>

      <section className="quickLanes" aria-label="Storefront lanes">
        {lanes.map(([title, copy]) => (
          <a href={title === 'Membership' ? '/payment' : title === 'Chat' ? '/login' : '#shop'} key={title}>
            <strong>{title}</strong>
            <span>{copy}</span>
          </a>
        ))}
      </section>

      <section className="creatorStrip" id="creators">
        <div className="sectionRow">
          <div className="sectionIntro">
            <p className="mockupEyebrow">Meet our creators</p>
            <h2>Premium fictional AI talent, ready for private rooms and governed media lanes.</h2>
            <p>Each model can carry a unique personality, wardrobe lane, content style, and member-facing room.</p>
          </div>
          <a className="mockupButtonGhost" href="/login">Choose a model</a>
        </div>
        <div className="creatorGrid">
          {creatorImages.map(([name, role, mood, image]) => (
            <article className="creatorCard" key={name}>
              <img src={image} alt={`${name} Eden Skye Studios creator reference`} loading="lazy" />
              <div><strong>{name}</strong><span>{role} / {mood}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="blackCardBand" id="membership">
        <div className="cardMock">
          <span>EDEN SKYE STUDIOS</span>
          <strong>Black Card Membership</strong>
          <p>Private creator access. Model rooms. Downloads. Gated video. Behind-the-scenes Edens Closet.</p>
          <a className="mockupButton" href="/payment">Open payment page</a>
        </div>
        <div>
          <p className="mockupEyebrow">The Black Card</p>
          <h2>VIP membership is the commerce anchor.</h2>
          <p>
            The Shopify site should sell access first, then route members into Edens Closet where they choose a model and unlock her behind-the-scenes room.
          </p>
          <ul>
            <li>Login portal for members</li>
            <li>Payment page for Black Card access</li>
            <li>Model selection before entering Closet</li>
            <li>Behind-the-scenes room per chosen model</li>
            <li>Chat, voice, and video lanes held behind gated access</li>
          </ul>
        </div>
      </section>

      <section className="shopSystem" id="shop">
        <div className="sectionIntro">
          <p className="mockupEyebrow">Shop architecture</p>
          <h2>Products, services, downloads, apps, and licenses without unsafe mutation.</h2>
          <p>Shopify can become the live commerce layer later. This pass prepares the storefront and payment journey only.</p>
        </div>
        <div className="productRail">
          {products.map(([title, type, state]) => (
            <article className="productCard" key={title}>
              <span>{type}</span>
              <strong>{title}</strong>
              <small>{state}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="portalBand">
        <div className="sectionIntro">
          <p className="mockupEyebrow">Member path</p>
          <h2>Pay, login, choose a model, then enter Edens Closet.</h2>
        </div>
        <div className="portalGrid">
          <article className="portalCard">
            <h3>Login portal</h3>
            <p>Member identity, chosen model, saved preferences, and access status live here in v2.</p>
            <a className="mockupButtonGhost" href="/login">Review login</a>
          </article>
          <article className="portalCard">
            <h3>Payment page</h3>
            <p>Black Card checkout preview is ready for Shopify or Stripe wiring after approval.</p>
            <a className="mockupButton" href="/payment">Review payment</a>
          </article>
        </div>
      </section>

      <section className="licenseBand" id="licenses">
        <div>
          <p className="mockupEyebrow">Brand lock</p>
          <h2>Black background, champagne metal, white text, premium creator commerce.</h2>
          <p>The Drive mockup direction is restored as the site direction. Public assets stay fictional, adult, platform-safe, and non-explicit.</p>
        </div>
        <div className="proofRows">
          <div><strong>Production</strong><span>Locked until preview is approved</span></div>
          <div><strong>Shopify</strong><span>No mutation until you connect and approve</span></div>
          <div><strong>Payments</strong><span>Designed only; no live processor wired</span></div>
          <div><strong>Closet</strong><span>Member destination after login/payment</span></div>
        </div>
      </section>

      <section className="finalMockupCta">
        <p className="mockupEyebrow">Review first</p>
        <h2>See the storefront, login, and payment pages before Eden touches more backend.</h2>
        <div className="mockupActions">
          <a className="mockupButton" href="/payment">Payment page</a>
          <a className="mockupButtonGhost" href="/login">Login portal</a>
          <a className="mockupButtonGhost" href="/closet">Edens Closet</a>
        </div>
      </section>
    </main>
  );
}
