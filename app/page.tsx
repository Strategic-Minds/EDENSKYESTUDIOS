const heroImage = 'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/4992ef73-f8a0-4b4f-a10d-54a962066394/Create_four_distinct_premium_editorial_model_card_portraits_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZThkNjRhZDE4MjlkY2MyZCIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc0NTE2OX0.o9ejT9pqsy64NI9NYK44xuF5SiY6lxRL9Zf0hBrexIY';

const creators = [
  ['Eden Skye', heroImage],
  ['Solara Vane', 'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/9c0b40df-6a61-435c-867c-662e8085b1c1/Create_four_distinct_premium_editorial_model_card_portraits_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZDkzOWMzMDA3Mzg2YmRhMCIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc5MzM0NH0.vswFmLbPjjly8W4OQPKly8Yn2Eq1G87nyHZHXRgBcHI'],
  ['Liora Vale', 'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/4605f045-10c8-4cdc-a570-d4b2861aa1a6/Create_four_distinct_premium_editorial_model_card_portraits_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiY2UxMGRiNzI5Njc2MTM2ZiIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc5MjA1MH0.29e8ggnDwzl3FmDGCfP6jObsu25Q1J1HIJdUFO66KVQ'],
  ['Nova Rain', 'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/bdfb6bbc-0e73-4454-b6b9-ea5c2e4ffff4/Create_four_distinct_premium_editorial_model_card_portraits_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiNzRjZmFmY2RiMjE5YzYzMiIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc0NzIxM30.OVmf7x29m3YZCKG7v-x9nmZpt2zQKa0mxTN_4b_mIMg'],
  ['Celeste Noir', 'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/c61940cd-3041-4b69-b08e-6d8ad254c7de/Create_four_distinct_premium_editorial_model_card_portraits_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiMGQ3Y2NmNzZiY2IxNjYwZSIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc5MjE4Mn0.OoxXOB0jiOdOz7ke54RywoocSwkHW70f35Ipn6EGxSU'],
  ['Maya Velvet', heroImage]
] as const;

const rail = [
  ['Chat', 'Talk to your favorite creators in real time.', 'Chat now', '/login'],
  ['Video Chat', 'Face-to-face conversations after member access.', 'Start video chat', '/login'],
  ['Downloads', 'High-quality images and videos.', 'Browse content', '#downloads'],
  ['Licenses', 'Commercial licenses for your projects.', 'View licenses', '#licenses'],
  ['Membership', 'Join for unlimited access, exclusive content and VIP perks.', 'Join now', '/payment']
] as const;

const features = [
  ['Chat', 'Real-time messaging'],
  ['Video Chat', 'Live face-to-face'],
  ['Downloads', 'Images & Videos'],
  ['Licenses', 'Commercial use'],
  ['Products', 'Digital & Physical'],
  ['Services', 'Custom solutions'],
  ['Secure', 'Private & safe'],
  ['Support', '24/7 Assistance']
] as const;

const downloads = [
  ['Beach Day Set', '$24.99'],
  ['Luxury Living', '$24.99'],
  ['Night Out', '$24.99'],
  ['Pool Side 4K', '$24.99']
] as const;

const products = [
  ['Creator Starter Pack', '$29.00'],
  ['Content Creator Toolkit', '$49.00'],
  ['Video Content Pack', '$97.00'],
  ['Behind The Scenes Pack', '$79.00']
] as const;

const services = [
  ['Custom Creator Build', 'Starting at $499'],
  ['Content Creation Service', 'Starting at $999'],
  ['Brand Collaborations & Sponsorships', 'Custom Pricing']
] as const;

export default function HomePage() {
  return (
    <main className="shopifyV1">
      <header className="siteHeader">
        <a className="brandMark" href="/" aria-label="Eden Skye Studios home">
          <span className="brandIcon">ES</span>
          <span><b>EDEN SKYE</b><small>STUDIOS</small></span>
        </a>
        <nav className="topNav" aria-label="Shopify website navigation">
          {['Home', 'Creators', 'Downloads', 'Chat', 'Video Chat', 'Licenses', 'Products', 'Services'].map((item) => (
            <a key={item} href={item === 'Home' ? '/' : `#${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</a>
          ))}
        </nav>
        <div className="headerActions">
          <a className="searchBtn" href="#downloads" aria-label="Search">⌕</a>
          <a className="signInBtn" href="/login">Sign In</a>
          <a className="joinBtn" href="/payment">Join Now</a>
        </div>
      </header>

      <section className="heroShell">
        <div className="heroImageLayer" />
        <div className="heroCopy">
          <h1><span>Creator Experience.</span><strong>Real. Beautiful.<br />Unforgettable.</strong></h1>
          <p>Connect, chat, video chat, download content, unlock exclusive images & videos, and enjoy premium experiences with your favorite creators.</p>
          <div className="heroButtons">
            <a className="goldButton" href="#creators">Explore Creators</a>
            <a className="darkButton" href="/payment">Join Now</a>
          </div>
        </div>
        <aside className="actionRail" aria-label="Creator actions">
          {rail.map(([title, copy, cta, href], index) => (
            <a className="railCard" href={href} key={title}>
              <span className="railIcon">{index + 1}</span>
              <span className="railText"><b>{title}</b><small>{copy}</small><em>{cta} ›</em></span>
              <img src={creators[index % creators.length][1]} alt={`${title} preview`} />
            </a>
          ))}
        </aside>
      </section>

      <section className="featureStrip" aria-label="Storefront features">
        {features.map(([title, copy]) => (
          <a href={`#${title.toLowerCase().replaceAll(' ', '-')}`} key={title}><b>{title}</b><small>{copy}</small></a>
        ))}
      </section>

      <section className="panel creatorsPanel" id="creators">
        <div className="sectionHead"><h2>Meet Our Creators</h2><a href="/login">View All</a></div>
        <div className="creatorGrid">
          {creators.map(([name, image]) => (
            <article className="creatorCard" key={name}>
              <img src={image} alt={`${name} portrait`} />
              <div><b>{name}</b><small><span /> Online</small></div>
            </article>
          ))}
        </div>
      </section>

      <div className="commerceGrid">
        <section className="panel" id="downloads">
          <div className="sectionHead"><h2>Popular Downloads</h2><a href="/payment">View All</a></div>
          <div className="downloadGrid">
            {downloads.map(([title, price], index) => (
              <article className="downloadCard" key={title}>
                <img src={creators[index][1]} alt={`${title} preview`} />
                <b>{title}</b><span>{price}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="panel" id="products">
          <div className="sectionHead"><h2>Top Products</h2><a href="/payment">View All</a></div>
          <div className="productGrid">
            {products.map(([title, price], index) => (
              <article className="productCard" key={title}>
                <img src={creators[(index + 1) % creators.length][1]} alt={`${title} product`} />
                <b>{title}</b><span>{price}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="panel servicesPanel" id="services">
          <div className="sectionHead"><h2>Premium Services</h2><a href="/login">View All</a></div>
          <div className="serviceGrid">
            {services.map(([title, price], index) => (
              <article className="serviceCard" key={title}>
                <img src={creators[(index + 2) % creators.length][1]} alt={`${title} service`} />
                <b>{title}</b><span>{price}</span>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="trustStrip" id="licenses">
        {[
          ['100% Secure', 'Your data is protected'],
          ['Private & Encrypted', 'Bank-level security'],
          ['Safe Payments', 'Trusted payment processing'],
          ['24/7 Support', "We're here anytime"],
          ['Cancel Anytime', 'No contracts. Ever.']
        ].map(([title, copy]) => <div key={title}><b>{title}</b><small>{copy}</small></div>)}
      </section>
    </main>
  );
}
