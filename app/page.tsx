const creatorImages = ['eden', 'solara', 'liora', 'nova', 'celeste', 'maya'] as const;

const navItems = [
  ['Home', '/'],
  ['Creators', '#creators'],
  ['Downloads', '#downloads'],
  ['Chat', '/login'],
  ['Video Chat', '/login'],
  ['Licenses', '#licenses'],
  ['Products', '#products'],
  ['Services', '#services']
] as const;

const railItems = [
  ['Chat', 'Talk to your favorite creators in real time.', 'Chat Now', '/login', 'chat'],
  ['Video Chat', 'Face-to-face conversations.', 'Start Video Chat', '/login', 'video'],
  ['Downloads', 'High-quality images and videos.', 'Browse Content', '#downloads', 'downloads'],
  ['Licenses', 'Commercial licenses for your projects.', 'View Licenses', '#licenses', 'licenses'],
  ['Membership', 'Join for unlimited access, exclusive content and VIP perks.', 'Join Now', '/payment', 'membership']
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

const creators = [
  ['Eden Skye', 'eden'],
  ['Solara Vane', 'solara'],
  ['Liora Vale', 'liora'],
  ['Nova Rain', 'nova'],
  ['Celeste Noir', 'celeste'],
  ['Maya Velvet', 'maya']
] as const;

const downloads = [
  ['Beach Day Set', '$24.99', 'beach'],
  ['Luxury Living', '$24.99', 'luxury'],
  ['Night Out', '$24.99', 'night'],
  ['Pool Side 4K', '$24.99', 'pool']
] as const;

const products = [
  ['Creator Starter Pack', '$29.00', 'starter'],
  ['Content Creator Toolkit', '$49.00', 'toolkit'],
  ['Video Content Pack', '$97.00', 'video-pack'],
  ['Behind The Scenes Pack', '$79.00', 'bts']
] as const;

const services = [
  ['Custom Creator Build', 'Starting at $499', 'custom'],
  ['Content Creation Service', 'Starting at $999', 'content'],
  ['Brand Collaborations & Sponsorships', 'Custom Pricing', 'brand']
] as const;

const trust = [
  ['100% Secure', 'Your data is protected'],
  ['Private & Encrypted', 'Bank-level security'],
  ['Safe Payments', 'Trusted payment processing'],
  ['24/7 Support', "We're here anytime"],
  ['Cancel Anytime', 'No contracts. Ever.']
] as const;

function Sprite({ name, label }: { name: string; label: string }) {
  return <span className={`sprite sprite-${name}`} aria-label={label} role="img" />;
}

export default function HomePage() {
  return (
    <main className="storefront">
      <header className="siteHeader">
        <a className="brand" href="/" aria-label="Eden Skye Studios home">
          <span className="brandMonogram">ES</span>
          <span className="brandText"><b>EDEN SKYE</b><small>STUDIOS</small></span>
        </a>
        <nav className="mainNav" aria-label="Storefront navigation">
          {navItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </nav>
        <div className="headerActions">
          <a className="searchAction" href="#downloads" aria-label="Search downloads">Search</a>
          <a className="outlineBtn" href="/login">Sign In</a>
          <a className="goldBtn" href="/payment">Join Now</a>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="heroArt" aria-hidden="true"><Sprite name="hero" label="Eden Skye hero portrait" /></div>
        <div className="heroCopy">
          <h1><span>Creator Experience.</span><strong>Real. Beautiful.<br />Unforgettable.</strong></h1>
          <p>Connect, chat, video chat, download content, unlock exclusive images and videos, and enjoy premium experiences with your favorite creators.</p>
          <div className="heroCtas">
            <a className="goldBtn large" href="#creators">Explore Creators</a>
            <a className="outlineBtn large" href="/payment">Join Now</a>
          </div>
        </div>
        <aside className="actionRail" aria-label="Eden Skye membership actions">
          {railItems.map(([title, copy, cta, href, image], index) => (
            <a className="railCard" href={href} key={title}>
              <span className="circleIcon">{index + 1}</span>
              <span className="railCopy"><b>{title}</b><small>{copy}</small><em>{cta}</em></span>
              <Sprite name={image} label={`${title} preview`} />
            </a>
          ))}
        </aside>
      </section>

      <section className="featureStrip" aria-label="Primary features">
        {features.map(([title, copy]) => <a href={`#${title.toLowerCase().replaceAll(' ', '-')}`} key={title}><b>{title}</b><small>{copy}</small></a>)}
      </section>

      <section className="panel creatorsPanel" id="creators">
        <div className="sectionHead"><h2>Meet Our Creators</h2><a href="/login">View All</a></div>
        <div className="creatorGrid">
          {creators.map(([name, image]) => (
            <a className="creatorCard" href="/login" key={name}>
              <Sprite name={image} label={`${name} portrait`} />
              <span><b>{name}</b><small><i />Online</small></span>
            </a>
          ))}
        </div>
      </section>

      <div className="commerceGrid">
        <section className="panel" id="downloads">
          <div className="sectionHead"><h2>Popular Downloads</h2><a href="/payment">View All</a></div>
          <div className="downloadGrid">
            {downloads.map(([title, price, image]) => (
              <a className="commerceCard" href="/payment" key={title}>
                <Sprite name={image} label={`${title} download`} />
                <b>{title}</b><span>{price}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="panel" id="products">
          <div className="sectionHead"><h2>Top Products</h2><a href="/payment">View All</a></div>
          <div className="productGrid">
            {products.map(([title, price, image]) => (
              <a className="commerceCard productCard" href="/payment" key={title}>
                <Sprite name={image} label={`${title} product`} />
                <b>{title}</b><span>{price}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="panel servicesPanel" id="services">
          <div className="sectionHead"><h2>Premium Services</h2><a href="/login">View All</a></div>
          <div className="serviceGrid">
            {services.map(([title, price, image]) => (
              <a className="serviceCard" href="/login" key={title}>
                <Sprite name={image} label={`${title} service`} />
                <b>{title}</b><span>{price}</span>
              </a>
            ))}
          </div>
        </section>
      </div>

      <section className="trustStrip" id="licenses" aria-label="Storefront trust signals">
        {trust.map(([title, copy]) => <div key={title}><b>{title}</b><small>{copy}</small></div>)}
      </section>
    </main>
  );
}
