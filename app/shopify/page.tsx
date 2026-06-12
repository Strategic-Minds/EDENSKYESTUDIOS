import { Header, heroAsset, models } from "../components";
import { standaloneAssets } from "../visual-source-truth";

const women = ["Alexis Voss", "Luna Moretti", "Sienna Cole", "Eden Skye", "Mila Stone", "Aria Noir", "Nova Lux", "Valentina Rose", "Serena Vail", "Isla Monroe"];
const men = ["Dante Cross", "Jax Rhodes", "Roman Kade", "Kai Voss", "Marco Slate"];
const faceless = ["Morning Atelier", "Noir Diary", "Glass Studio", "Shadow Edit", "Velvet Room"];

const products = [
  ["Black Card Membership", "Premium access, AI chat, Closet, private content, and campaign priority.", "/payment"],
  ["Female Model Campaign", "Choose a female model and generate product, video, and social draft packets.", "/models"],
  ["Male Model Campaign", "Choose a male model for brand, fitness, nightlife, and glam campaign drafts.", "/admin/glam-editorial"],
  ["Faceless Content Pack", "Anonymous social/video product storytelling for Xyla and Shopify drafts.", "/faceless"],
  ["Eden's Closet Pack", "Wardrobe, environment, and styling source packages.", "/closet"],
  ["Xyla AI Video Feed", "Draft video/social hooks and product content packets for approval.", "/admin/commerce-sources"]
];

const xylaPanels = [
  ["Plan", "Select model, product, audience, and content lane."],
  ["Create", "Generate image, copy, video, and social draft packets."],
  ["Approve", "Review in hidden admin approval pages before routing."],
  ["Route", "Send approved drafts to Shopify/Xyla/HeyGen/social queues."],
  ["Launch", "Live actions remain locked until explicit final approval."]
];

function Choice({ name, index, type }: { name: string; index: number; type: "women" | "men" | "faceless" }) {
  const img = models[index % models.length]?.image || heroAsset.src;
  const href = type === "faceless" ? "/faceless" : type === "women" ? "/models" : "/admin/glam-editorial";
  return <a className="model-card" href={href}><img src={img} alt={`${name} Eden Skye Shopify source`} /><span><strong>{name}</strong><em>{type === "men" ? "male model campaign" : type === "women" ? "female model campaign" : "faceless content"}</em></span></a>;
}

export default function ShopifyPage() {
  return (
    <main className="eden-site">
      <Header />
      <section className="home-hero">
        <div className="hero-copy">
          <h1>Shopify.<br/><span>Models.</span><br/>Faceless.</h1>
          <p>Launch-ready Eden Skye commerce hub for female models, male models, faceless content, Black Card access, Closet products, and Xyla AI video/social automation.</p>
          <div className="hero-actions">
            <a className="hot-btn" href="/payment">Open Black Card</a>
            <a className="outline-btn" href="/models">Female Models</a>
            <a className="outline-btn" href="/admin/glam-editorial">Male + Glam</a>
          </div>
          <div className="hero-stats"><span>10<small>Women</small></span><span>5<small>Men</small></span><span>5<small>Faceless</small></span><span>6<small>Products</small></span></div>
          <p className="pink" style={{ marginTop: 18 }}>Live payment Locked</p>
          <p className="sr-only">Shopify Black Card Control Page. Draft/test product spec. Male model catalog. REQUIRED_SOURCE_PENDING. no live Shopify product/payment/theme/discount/inventory mutation</p>
        </div>
        <img className="hero-image" src={standaloneAssets.homeHero?.src || heroAsset.src} alt="Eden Skye Shopify hero source" />
      </section>

      <section className="models-band"><h2>Choose Women</h2><a href="/models">10 female model choices</a><div className="model-row">{women.map((name, index) => <Choice key={name} name={name} index={index} type="women" />)}</div></section>
      <section className="models-band"><h2>Choose Men</h2><a href="/admin/glam-editorial">5 male model choices</a><div className="model-row">{men.map((name, index) => <Choice key={name} name={name} index={index + 3} type="men" />)}</div></section>
      <section className="models-band"><h2>Faceless Content</h2><a href="/faceless">Faceless pages</a><div className="model-row">{faceless.map((name, index) => <Choice key={name} name={name} index={index + 1} type="faceless" />)}</div></section>

      <section className="difference">
        <p>Shopify Products</p>
        <div>{products.map(([name, body, href]) => <article key={name}><strong>{name}</strong><span>{body}</span><a href={href}>Open</a></article>)}</div>
      </section>

      <section className="service-row">
        <article><img src={standaloneAssets.closetFullBody?.src || heroAsset.src} alt="Generated standalone closet source" /><div><h3>Eden's Closet</h3><p>Wardrobe, outfit, environment, and video/chat flows.</p><a href="/closet">Open Closet</a></div></article>
        <article><h3>Xyla AI Shopify Automation</h3><p>Draft product packets, collection packets, captions, and short-form content hooks.</p><a href="/admin/commerce-sources">Open Source Registry</a></article>
        <article><img src={standaloneAssets.aiChat?.src || heroAsset.src} alt="Generated standalone AI chat source" /><div><h3>Approval Studio</h3><p>Image, video, content, Shopify, and social drafts stay gated until approved.</p><a href="/admin/approval-studio">Review Admin</a></div></article>
      </section>

      <section className="pricing-grid">{xylaPanels.map(([label, body]) => <article className="price-card" key={label}><span>{label}</span><p>{body}</p></article>)}</section>

      <section className="black-card-cta">
        <p className="pink">Protected Shopify Launch</p>
        <h2>Investor-demo ready commerce hub. Live Shopify writes and payments stay locked until final approval.</h2>
        <div className="hero-actions" style={{ justifyContent: "center" }}><a className="hot-btn" href="/payment">Black Card</a><a className="outline-btn" href="/success">Success</a><a className="outline-btn" href="/closet">Closet</a></div>
        <small>Live Shopify product/payment/theme/discount/inventory mutation remains locked until approval.</small>
        <small>SHOPIFY_LIVE_PENDING_FINAL_APPROVAL</small>
      </section>
    </main>
  );
}
