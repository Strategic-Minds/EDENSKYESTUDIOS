"use client";

import "./closet-v2-real.css";
import { useMemo } from "react";

type View = "home" | "models" | "profile" | "closet" | "environments" | "viewer" | "chat" | "video" | "dashboard";
type Model = { name: string; slug: string; image: string; title: string; stats: string };

const assets = {
  eden: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-approved-model-lounge-02.png?v=1781428279",
  alexis: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-approved-model-lounge-01.png?v=1781428263",
  closet: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-approved-neon-closet-hero.png?v=1781428271",
  fullBody: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-approved-full-body-viewer.png?v=1781428288",
  front: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-angle-front.png?v=1781431146",
  left: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-angle-left-45.png?v=1781431138",
  right: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-angle-right-45.png?v=1781431175"
};

const models: Model[] = [
  { name: "Alexis", slug: "eden-skye", image: assets.eden, title: "Featured Model", stats: "128 photos" },
  { name: "Kayla", slug: "alexis-voss", image: assets.alexis, title: "Noir Muse", stats: "92 photos" },
  { name: "Luna", slug: "luna-moretti", image: assets.fullBody, title: "Closet Select", stats: "74 photos" },
  { name: "Zoey", slug: "zoey-noir", image: assets.front, title: "Private Gallery", stats: "63 photos" },
  { name: "Sienna", slug: "sienna-cole", image: assets.left, title: "VIP Gallery", stats: "88 photos" },
  { name: "Reya", slug: "reya-vale", image: assets.right, title: "Full Body View", stats: "57 photos" }
];

const tabs = [
  { label: "Models", href: "/closet-v2/models", icon: "person" },
  { label: "Favorites", href: "/closet-v2/closet", icon: "heart" },
  { label: "Messages", href: "/closet-v2/chat", icon: "chat" },
  { label: "Profile", href: "/payment", icon: "user" }
];

export function ClosetV2RealApp({ view = "home", slug }: { view?: View; slug?: string }) {
  const model = useMemo(() => models.find((item) => item.slug === slug) ?? models[0], [slug]);
  const screen = view === "viewer" || view === "environments" || view === "dashboard" ? "closet" : view;

  return (
    <main className="eden-app-stage">
      <section className="eden-device" aria-label="Eden Skye mobile app preview">
        {screen === "home" && <Home />}
        {screen === "models" && <Models />}
        {screen === "profile" && <Profile model={model} />}
        {(screen === "closet" || screen === "chat" || screen === "video") && <Closet model={model} />}
        <BottomTabs active={screen === "home" ? "Models" : undefined} />
      </section>
    </main>
  );
}

function BrandLogo() {
  return (
    <a className="brand-logo" href="/closet-v2" aria-label="Eden Skye Studios home">
      <span>EDEN SKYE</span>
      <em>Studios</em>
    </a>
  );
}

function LineIcon({ type }: { type: string }) {
  return <i aria-hidden="true" className={`line-icon ${type}`} />;
}

function TopBar({ bag = false }: { bag?: boolean }) {
  return (
    <header className="top-bar">
      <a className="menu-lines" href="/closet-v2/models" aria-label="Open models menu"><span /><span /><span /></a>
      <BrandLogo />
      <a className="top-icon" href="/payment" aria-label={bag ? "Unlock Black Card" : "Notifications"}>
        <LineIcon type={bag ? "bag" : "bell"} />
      </a>
    </header>
  );
}

function Home() {
  return (
    <div className="eden-screen home">
      <img className="home-image" src={assets.eden} alt="Eden Skye model in neon studio light" />
      <div className="screen-vignette" />
      <div className="home-brand"><BrandLogo /></div>
      <section className="home-panel" aria-label="Eden Skye entry">
        <p>EXPERIENCE</p>
        <h1>EDEN SKYE</h1>
        <span>BOLD. ELEVATED. UNAPOLOGETIC.</span>
        <div className="pager"><b /><b /><b /><b /></div>
        <a className="primary-action" href="/closet-v2/models">LOGIN</a>
        <a className="secondary-action" href="/payment">CREATE ACCOUNT</a>
        <div className="quick-grid">
          <a href="/closet-v2/video"><LineIcon type="play" /><span>Exclusive<br />Videos</span></a>
          <a href="/closet-v2/models"><LineIcon type="image" /><span>Photo<br />Sets</span></a>
          <a href="/payment"><LineIcon type="crown" /><span>VIP<br />Access</span></a>
          <a href="/closet-v2/closet"><LineIcon type="calendar" /><span>Events</span></a>
        </div>
        <a className="vip-strip" href="/payment">
          <LineIcon type="diamond" />
          <span>GO VIP<small>UNLOCK EVERYTHING</small></span>
          <strong>›</strong>
        </a>
      </section>
    </div>
  );
}

function Models() {
  return (
    <div className="eden-screen models-screen">
      <TopBar />
      <div className="models-title">
        <h1>MODELS</h1>
        <button type="button">FILTER</button>
      </div>
      <div className="models-grid">
        {models.map((model, index) => (
          <a className={`model-card ${index === 0 ? "active" : ""}`} href={`/closet-v2/models/${model.slug}`} key={model.slug}>
            <img src={model.image} alt={`${model.name} model preview`} />
            <span>{model.name}</span>
            <LineIcon type="heart" />
          </a>
        ))}
      </div>
    </div>
  );
}

function Profile({ model }: { model: Model }) {
  return (
    <div className="eden-screen profile-screen">
      <TopBar />
      <section className="profile-hero">
        <div className="neon-ring" />
        <img src={model.image} alt={`${model.name} profile portrait`} />
      </section>
      <section className="profile-copy">
        <h1>{model.name}</h1>
        <b>{model.title}</b>
        <p>Confident. Bold. Always unforgettable.</p>
        <dl>
          <div><dt><LineIcon type="image" /></dt><dd>128<br /><span>Photos</span></dd></div>
          <div><dt><LineIcon type="play" /></dt><dd>24<br /><span>Videos</span></dd></div>
          <div><dt><LineIcon type="heart" /></dt><dd>1.2K<br /><span>Likes</span></dd></div>
        </dl>
        <div className="profile-buttons">
          <a href="/closet-v2/chat">MESSAGE</a>
          <a href="/closet-v2/closet">VIEW GALLERY</a>
        </div>
      </section>
    </div>
  );
}

function Closet({ model }: { model: Model }) {
  return (
    <div className="eden-screen closet-screen">
      <TopBar bag />
      <h1 className="closet-heading">EDEN'S CLOSET</h1>
      <section className="closet-stage">
        <img className="closet-room" src={assets.closet} alt="Black luxury walk-in closet with pink neon" />
        <img className="closet-model" src={assets.fullBody} alt={`${model.name} full body closet preview`} />
        <div className="closet-caption">
          <b>{model.name}</b>
          <span>Full-body closet preview</span>
        </div>
      </section>
      <div className="closet-menu">
        <a href="/payment"><LineIcon type="lingerie" /><span>LINGERIE</span><strong>›</strong></a>
        <a href="/payment"><LineIcon type="dress" /><span>OUTFITS</span><strong>›</strong></a>
        <a href="/payment"><LineIcon type="shoe" /><span>SHOES</span><strong>›</strong></a>
        <a href="/payment"><LineIcon type="diamond" /><span>ACCESSORIES</span><strong>›</strong></a>
        <a href="/payment"><LineIcon type="heart" /><span>FAVORITES</span><strong>›</strong></a>
      </div>
    </div>
  );
}

function BottomTabs({ active }: { active?: string }) {
  return (
    <nav className="bottom-tabs" aria-label="Eden's Closet tabs">
      {tabs.map((tab) => (
        <a href={tab.href} className={active === tab.label ? "active" : ""} key={tab.label}>
          <LineIcon type={tab.icon} />
          <span>{tab.label}</span>
        </a>
      ))}
    </nav>
  );
}
