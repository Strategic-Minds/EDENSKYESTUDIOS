import { AppBanner, Difference, Header, ModelCard, heroAsset, models } from './components';

const launchWomen = [
  { name: "Alexis Voss", image: models[0]?.image || heroAsset.src, note: "Black Card / portfolio", href: "/models/alexis-voss" },
  { name: "Luna Moretti", image: models[1]?.image || heroAsset.src, note: "Luxury lifestyle", href: "/models/luna-moretti" },
  { name: "Sienna Cole", image: models[2]?.image || heroAsset.src, note: "Fashion campaigns", href: "/models/sienna-cole" },
  { name: "Eden Skye", image: heroAsset.src, note: "Brand lead", href: "/models" },
  { name: "Mila Stone", image: heroAsset.src, note: "Glam social", href: "/admin/glam-editorial" },
  { name: "Aria Noir", image: heroAsset.src, note: "Nightlife editorial", href: "/admin/glam-editorial" },
  { name: "Nova Lux", image: heroAsset.src, note: "Hot pink campaign", href: "/admin/glam-editorial" },
  { name: "Valentina Rose", image: heroAsset.src, note: "Closet full-body", href: "/admin/glam-editorial" },
  { name: "Serena Vail", image: heroAsset.src, note: "Beauty close-up", href: "/admin/glam-editorial" },
  { name: "Isla Monroe", image: heroAsset.src, note: "Premium influencer", href: "/models" }
];

const launchMen = [
  { name: "Dante Cross", image: heroAsset.src, note: "Open-shirt nightlife", href: "/admin/glam-editorial" },
  { name: "Jax Rhodes", image: heroAsset.src, note: "Black tank editorial", href: "/admin/glam-editorial" },
  { name: "Roman Kade", image: heroAsset.src, note: "Full-body editorial", href: "/admin/glam-editorial" },
  { name: "Kai Voss", image: heroAsset.src, note: "Male service product", href: "/admin/commerce-sources" },
  { name: "Marco Slate", image: heroAsset.src, note: "Premium campaign", href: "/shopify" }
];

const faceless = [
  { name: "Morning Atelier", image: heroAsset.src, note: "Anonymous content", href: "/faceless/morning-atelier" },
  { name: "Noir Diary", image: heroAsset.src, note: "Reels and stories", href: "/faceless/noir-diary" },
  { name: "Glass Studio", image: heroAsset.src, note: "Product storytelling", href: "/faceless/glass-studio" },
  { name: "Shadow Edit", image: heroAsset.src, note: "Faceless campaign", href: "/faceless" }
];

const products = [
  { name: "Black Card Membership", image: heroAsset.src, note: "Draft/test only", href: "/payment" },
  { name: "Eden's Closet", image: heroAsset.src, note: "Wardrobe flow", href: "/closet" },
  { name: "Portfolio Flow", image: heroAsset.src, note: "Model pages", href: "/models" },
  { name: "Xyla Content Feed", image: heroAsset.src, note: "Autonomous content", href: "/shopify" }
];

function LaunchCard({ item }: { item: { name: string; image: string; note: string; href: string } }) {
  return (
    <a className="model-card" href={item.href}>
      <img src={item.image} alt={`${item.name} Eden Skye launch source`} />
      <span><strong>{item.name}</strong><em>{item.note}</em></span>
    </a>
  );
}

export default function Home() {
  return (
    <main className="eden-site">
      <Header />
      <section className="home-hero">
        <div className="hero-copy">
          <h1>Beauty.<br/><span>Influence.</span><br/>Impact.</h1>
          <p>Shop the Eden Skye model studio: female models, male models, faceless content, Black Card access, Closet experiences, and Xyla-ready content products.</p>
          <div className="hero-actions"><a className="hot-btn" href="/shopify">Open Shopify</a><a className="outline-btn" href="/models">Choose Models</a></div>
          <div className="hero-stats"><span>10+<small>Women</small></span><span>5<small>Men</small></span><span>24/7<small>Content</small></span><span>Black Card<small>Access</small></span></div>
        </div>
        <img className="hero-image" src={heroAsset.src} alt="Eden Skye hero model" />
      </section>
      <Difference />
      <section className="models-band">
        <h2>Women</h2><a href="/models">Choose from 10 female models</a>
        <div className="model-row">{launchWomen.map((item) => <LaunchCard key={item.name} item={item} />)}</div>
      </section>
      <section className="models-band">
        <h2>Men</h2><a href="/shopify">Choose from 5 male models</a>
        <div className="model-row">{launchMen.map((item) => <LaunchCard key={item.name} item={item} />)}</div>
      </section>
      <section className="models-band">
        <h2>Faceless</h2><a href="/faceless">View faceless pages</a>
        <div className="model-row">{faceless.map((item) => <LaunchCard key={item.name} item={item} />)}</div>
      </section>
      <section className="models-band">
        <h2>Products</h2><a href="/shopify">Open Shopify</a>
        <div className="model-row">{products.map((item) => <LaunchCard key={item.name} item={item} />)}</div>
      </section>
      <section className="service-row"><article><img src={models[2]?.image || heroAsset.src} alt="Generated creator production standalone source"/><div><h3>Creator Production</h3><p>Photoshoots, video production, editing, retouching, and campaign strategy.</p><a href="/services">Learn More</a></div></article><article><h3>Auto Social</h3><p>Your 24/7 content engine. We create, we post, we grow, you profit.</p><a href="/auto-social">Learn More</a></article><article><img src={models[4]?.image || heroAsset.src} alt="Generated brand partnerships standalone source"/><div><h3>Brand Partnerships</h3><p>Strategic collaborations with iconic brands.</p><a href="/brand-partnerships">Learn More</a></div></article></section>
      <AppBanner />
    </main>
  );
}
