import { AppBanner, Difference, Header, ModelCard, heroAsset, models } from './components';

const men = [
  { name: "Source Pending", image: heroAsset.src, note: "Male roster placeholder" },
  { name: "Draft Male One", image: heroAsset.src, note: "Catalog slot" },
  { name: "Draft Male Two", image: heroAsset.src, note: "Catalog slot" },
  { name: "Draft Male Three", image: heroAsset.src, note: "Catalog slot" }
];

const faceless = [
  { name: "Morning Atelier", image: heroAsset.src, note: "Anonymous content" },
  { name: "Noir Diary", image: heroAsset.src, note: "Reels and stories" },
  { name: "Glass Studio", image: heroAsset.src, note: "Product storytelling" },
  { name: "Shadow Edit", image: heroAsset.src, note: "Faceless campaign" }
];

const products = [
  { name: "Black Card Membership", image: heroAsset.src, note: "Draft/test only" },
  { name: "Eden's Closet", image: heroAsset.src, note: "Wardrobe flow" },
  { name: "Portfolio Flow", image: heroAsset.src, note: "Model pages" },
  { name: "Xyla Content Feed", image: heroAsset.src, note: "Autonomous content" }
];

export default function Home() {
  return (
    <main className="eden-site">
      <Header />
      <section className="home-hero">
        <div className="hero-copy">
          <h1>Beauty.<br/><span>Influence.</span><br/>Impact.</h1>
          <p>We represent elite digital models and content creators. We build iconic brands. We create viral content. We drive results.</p>
          <div className="hero-actions"><a className="hot-btn" href="/apply">Apply Now</a><a className="outline-btn" href="/models">View Our Models</a></div>
          <div className="hero-stats"><span>100+<small>Models</small></span><span>24/7<small>Content</small></span><span>Global<small>Reach</small></span><span>Premium<small>Brands</small></span></div>
        </div>
        <img className="hero-image" src={heroAsset.src} alt="Eden Skye hero model" />
      </section>
      <Difference />
      <section className="models-band">
        <h2>Women</h2><a href="/models">View all women</a>
        <div className="model-row">{models.map(model => <ModelCard key={model.slug} model={model} />)}</div>
      </section>
      <section className="models-band">
        <h2>Men</h2><a href="/admin/approval-studio">Approve male roster</a>
        <div className="model-row">{men.map((model) => <a key={model.name} className="model-card" href="/admin/approval-studio"><img src={model.image} alt={model.name} /><span><strong>{model.name}</strong><em>{model.note}</em></span></a>)}</div>
      </section>
      <section className="models-band">
        <h2>Faceless</h2><a href="/faceless">View faceless pages</a>
        <div className="model-row">{faceless.map((item) => <a key={item.name} className="model-card" href="/faceless"><img src={item.image} alt={item.name} /><span><strong>{item.name}</strong><em>{item.note}</em></span></a>)}</div>
      </section>
      <section className="models-band">
        <h2>Products</h2><a href="/shopify">Open Shopify</a>
        <div className="model-row">{products.map((item) => <a key={item.name} className="model-card" href="/shopify"><img src={item.image} alt={item.name} /><span><strong>{item.name}</strong><em>{item.note}</em></span></a>)}</div>
      </section>
      <section className="service-row"><article><img src={models[2].image} alt="Generated creator production standalone source"/><div><h3>Creator Production</h3><p>Photoshoots, video production, editing, retouching, and campaign strategy.</p><a href="/services">Learn More</a></div></article><article><h3>Auto Social</h3><p>Your 24/7 content engine. We create, we post, we grow, you profit.</p><a href="/auto-social">Learn More</a></article><article><img src={models[4].image} alt="Generated brand partnerships standalone source"/><div><h3>Brand Partnerships</h3><p>Strategic collaborations with iconic brands.</p><a href="/brand-partnerships">Learn More</a></div></article></section>
      <AppBanner />
    </main>
  );
}
