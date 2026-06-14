"use client";

import "./closet-v2-real.css";
import { useMemo } from "react";

type View = "home" | "models" | "profile" | "closet" | "environments" | "viewer" | "chat" | "video" | "dashboard";
type Model = { name: string; slug: string; image: string; title: string };

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
  { name: "Eden", slug: "eden-skye", image: assets.eden, title: "Featured model" },
  { name: "Alexis", slug: "alexis-voss", image: assets.alexis, title: "Noir muse" },
  { name: "Luna", slug: "luna-moretti", image: assets.fullBody, title: "Full-body preview" },
  { name: "Sienna", slug: "sienna-cole", image: assets.front, title: "360 model" },
  { name: "Kayla", slug: "kayla-noir", image: assets.left, title: "Private gallery" },
  { name: "Reya", slug: "reya-vale", image: assets.right, title: "Closet select" }
];

const tabs = [["H", "Home", "/closet-v2"], ["E", "Explore", "/closet-v2/models"], ["HEART", "Favorites", "/closet-v2/closet"], ["P", "Profile", "/payment"]];

export function ClosetV2RealApp({ view = "home", slug }: { view?: View; slug?: string }) {
  const model = useMemo(() => models.find((item) => item.slug === slug) ?? models[0], [slug]);
  const mobileView = view === "viewer" || view === "environments" || view === "closet" || view === "chat" || view === "video" || view === "dashboard" ? "closet" : view;

  return (
    <main className="pwa-stage">
      <section className="pwa-phone">
        {mobileView === "home" && <Home />}
        {mobileView === "models" && <Models />}
        {mobileView === "profile" && <Profile model={model} />}
        {mobileView === "closet" && <Closet />}
        <BottomTabs />
      </section>
    </main>
  );
}

function AppChrome({ children, bag = false }: { children: React.ReactNode; bag?: boolean }) {
  return <><header className="pwa-header"><span className="hamburger">MENU</span><a className="pwa-logo" href="/closet-v2"><b>EDEN SKYE</b><i>Studios</i></a><a className="pwa-icon" href="/payment">{bag ? "BAG" : "ALERT"}</a></header>{children}</>;
}

function Home() {
  return <div className="pwa-screen home-screen"><img className="home-hero" src={assets.eden} alt="Eden Skye hero" /><div className="home-gradient" /><div className="home-copy"><p>EXPERIENCE</p><h1>EDEN SKYE</h1><span>BOLD. ELEVATED. UNAPOLOGETIC.</span><div className="dots"><i /><i /><i /><i /></div><a className="hot-button" href="/closet-v2/models">LOGIN</a><a className="outline-button" href="/payment">CREATE ACCOUNT</a><div className="feature-grid"><a href="/closet-v2/video"><b>PLAY</b><span>Exclusive<br />Videos</span></a><a href="/closet-v2/models"><b>PHOTO</b><span>Photo<br />Sets</span></a><a href="/payment"><b>VIP</b><span>VIP<br />Access</span></a><a href="/closet-v2/closet"><b>EVENT</b><span>Events</span></a></div><a className="vip-card" href="/payment"><b>VIP</b><span>GO VIP<small>UNLOCK EVERYTHING</small></span><em>&gt;</em></a></div></div>;
}

function Models() {
  return <div className="pwa-screen list-screen"><AppChrome><div className="screen-title"><h1>MODELS</h1><a href="/closet-v2/models">FILTER</a></div><div className="model-grid">{models.map((model) => <a href={`/closet-v2/models/${model.slug}`} className="model-tile" key={model.slug}><img src={model.image} alt={model.name} /><b>{model.name}</b><span>HEART</span></a>)}</div></AppChrome></div>;
}

function Profile({ model }: { model: Model }) {
  return <div className="pwa-screen profile-screen"><AppChrome><div className="profile-orbit"><img src={model.image} alt={model.name} /></div><div className="profile-copy"><h1>{model.name}</h1><b>{model.title}</b><p>Confident. Bold. Always unforgettable.</p><ul><li><span>PHOTO</span>128 Photos</li><li><span>PLAY</span>24 Videos</li><li><span>HEART</span>1.2K Likes</li></ul><div className="profile-actions"><a href="/closet-v2/closet">MESSAGE</a><a href="/closet-v2/closet">VIEW GALLERY</a></div></div></AppChrome></div>;
}

function Closet() {
  return <div className="pwa-screen closet-screen"><AppChrome bag><h1 className="closet-title">EDEN&apos;S CLOSET</h1><div className="closet-fullbody"><img src={assets.fullBody} alt="Eden full body standing in her closet" /><span>Eden - Full Body Preview</span></div><div className="closet-list">{[["LING", "LINGERIE"], ["FIT", "OUTFITS"], ["SHOE", "SHOES"], ["VIP", "ACCESSORIES"], ["HEART", "FAVORITES"]].map(([icon, label]) => <a href="/payment" key={label}><b>{icon}</b><span>{label}</span><em>&gt;</em></a>)}</div></AppChrome></div>;
}

function BottomTabs() {
  return <nav className="pwa-tabs">{tabs.map(([icon, label, href]) => <a href={href} key={label}><b>{icon}</b><span>{label}</span></a>)}</nav>;
}
