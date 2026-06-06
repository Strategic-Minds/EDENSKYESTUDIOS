const approvedMockup = 'https://drive.google.com/uc?export=view&id=1xaDrBNIaXSwmtdothIZvZSczDjqX6qTR';

const navLinks = [
  ['Home', '/'],
  ['Creators', '#creators'],
  ['Downloads', '#downloads'],
  ['Chat', '/login'],
  ['Video Chat', '/login'],
  ['Licenses', '#licenses'],
  ['Products', '#products'],
  ['Services', '#services']
] as const;

const creatorNames = ['Eden Skye', 'Solara Vane', 'Liora Vale', 'Nova Rain', 'Celeste Noir', 'Maya Velvet'] as const;

const downloads = ['Beach Day Set', 'Luxury Living', 'Night Out', 'Pool Side 4K'] as const;

const products = [
  ['Creator Starter Pack', '$29.00'],
  ['Content Creator Toolkit', '$49.00'],
  ['Video Content Pack', '$97.00'],
  ['Behind The Scenes Pack', '$79.00']
] as const;

const services = ['Custom Creator Build', 'Content Creation Service', 'Brand Collaborations & Sponsorships'] as const;

export default function HomePage() {
  return (
    <main className="approvedSite" aria-label="Eden Skye Studios approved Shopify V1 website mockup">
      <section className="mockupFrame" aria-label="Approved Eden Skye storefront preview">
        <img className="approvedMockup" src={approvedMockup} alt="Approved Eden Skye Studios Shopify V1 website mockup" />

        <a className="hotspot brandHotspot" href="/" aria-label="Eden Skye Studios home" />
        {navLinks.map(([label, href], index) => (
          <a key={label} className={`hotspot navHotspot navHotspot${index + 1}`} href={href} aria-label={label} />
        ))}
        <a className="hotspot searchHotspot" href="#downloads" aria-label="Search downloads" />
        <a className="hotspot signInHotspot" href="/login" aria-label="Sign in" />
        <a className="hotspot joinHotspot" href="/payment" aria-label="Join now" />
        <a className="hotspot exploreHotspot" href="#creators" aria-label="Explore creators" />
        <a className="hotspot heroJoinHotspot" href="/payment" aria-label="Join now" />

        {['chat', 'video-chat', 'downloads', 'licenses', 'membership'].map((id, index) => (
          <a key={id} className={`hotspot railHotspot railHotspot${index + 1}`} href={index < 2 ? '/login' : index === 4 ? '/payment' : `#${id}`} aria-label={id.replace('-', ' ')} />
        ))}

        {creatorNames.map((name, index) => (
          <a key={name} className={`hotspot creatorHotspot creatorHotspot${index + 1}`} href="/login" aria-label={`${name} creator profile`} />
        ))}

        {downloads.map((name, index) => (
          <a key={name} className={`hotspot downloadHotspot downloadHotspot${index + 1}`} href="/payment" aria-label={`${name} download`} />
        ))}

        {products.map(([name], index) => (
          <a key={name} className={`hotspot productHotspot productHotspot${index + 1}`} href="/payment" aria-label={`${name} product`} />
        ))}

        {services.map((name, index) => (
          <a key={name} className={`hotspot serviceHotspot serviceHotspot${index + 1}`} href="/login" aria-label={`${name} service`} />
        ))}
      </section>

      <section className="mobileStorefront" aria-label="Mobile Eden Skye storefront">
        <header>
          <span>ES</span>
          <div><b>EDEN SKYE</b><small>STUDIOS</small></div>
        </header>
        <img src={approvedMockup} alt="Approved Eden Skye Studios website design" />
        <h1>Creator Experience. <strong>Real. Beautiful. Unforgettable.</strong></h1>
        <p>Connect, chat, video chat, download content, unlock exclusive images and videos, and enjoy premium experiences with your favorite creators.</p>
        <div className="mobileActions">
          <a href="#creators">Explore Creators</a>
          <a href="/payment">Join Now</a>
        </div>
        <nav>
          {navLinks.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </nav>
        <div className="mobileSections" id="creators">
          <h2>Meet Our Creators</h2>
          {creatorNames.map((name) => <a href="/login" key={name}>{name}<small>Online</small></a>)}
        </div>
        <div className="mobileSections" id="downloads">
          <h2>Popular Downloads</h2>
          {downloads.map((name) => <a href="/payment" key={name}>{name}<small>$24.99</small></a>)}
        </div>
        <div className="mobileSections" id="products">
          <h2>Top Products</h2>
          {products.map(([name, price]) => <a href="/payment" key={name}>{name}<small>{price}</small></a>)}
        </div>
      </section>
    </main>
  );
}
