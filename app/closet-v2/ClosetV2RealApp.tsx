"use client";

import "./closet-v2-real.css";
import { useMemo, useState } from "react";

type View = "home" | "models" | "profile" | "closet" | "environments" | "viewer" | "chat" | "video" | "dashboard";
type Model = { name: string; slug: string; image: string; title: string };

const assets = {
  lounge: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-approved-model-lounge-01.png?v=1781428263",
  eden: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-approved-model-lounge-02.png?v=1781428279",
  closet: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-approved-neon-closet-hero.png?v=1781428271",
  body: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-approved-full-body-viewer.png?v=1781428288",
  front: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-angle-front.png?v=1781431146",
  left: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-angle-left-45.png?v=1781431138",
  right: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-angle-right-45.png?v=1781431175"
};

const models: Model[] = [
  { name: "Eden Skye", slug: "eden-skye", image: assets.eden, title: "Signature closet muse" },
  { name: "Alexis Voss", slug: "alexis-voss", image: assets.lounge, title: "Noir lounge model" },
  { name: "Luna Moretti", slug: "luna-moretti", image: assets.body, title: "Full-body wardrobe model" },
  { name: "Sienna Cole", slug: "sienna-cole", image: assets.front, title: "360 preview model" }
];

const bottomNav = [
  ["Home", "/closet-v2"],
  ["Models", "/closet-v2/models"],
  ["Closet", "/closet-v2/closet"],
  ["Unlock", "/payment"]
];

const outfits = ["Black set", "Pink dress", "Silk robe", "Heels"];
const rooms = ["Closet", "Bedroom", "Bathroom", "Pool"];

export function ClosetV2RealApp({ view = "home", slug }: { view?: View; slug?: string }) {
  const [outfit, setOutfit] = useState(outfits[0]);
  const [room, setRoom] = useState(rooms[0]);
  const model = useMemo(() => models.find((item) => item.slug === slug) ?? models[0], [slug]);

  const normalizedView = view === "viewer" || view === "closet" || view === "environments" ? "closet" : view;

  return (
    <main className="ecm-app">
      <section className="ecm-phone" aria-label="Eden's Closet mobile app">
        <header className="ecm-top">
          <a href="/closet-v2" className="ecm-logo">ES</a>
          <span>Eden&apos;s Closet</span>
          <a href="/payment" className="ecm-pill">Black Card</a>
        </header>

        {normalizedView === "home" && <Home />}
        {normalizedView === "models" && <ChooseModel />}
        {normalizedView === "profile" && <ModelProfile model={model} />}
        {normalizedView === "closet" && <FullBodyCloset model={model} outfit={outfit} setOutfit={setOutfit} room={room} setRoom={setRoom} />}
        {(normalizedView === "chat" || normalizedView === "video" || normalizedView === "dashboard") && <FullBodyCloset model={model} outfit={outfit} setOutfit={setOutfit} room={room} setRoom={setRoom} />}

        <nav className="ecm-bottom" aria-label="Primary mobile flow">
          {bottomNav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
        </nav>
      </section>
    </main>
  );
}

function Home() {
  return (
    <div className="ecm-screen ecm-home">
      <img className="ecm-bg" src={assets.closet} alt="Neon Eden's Closet" />
      <div className="ecm-shade" />
      <div className="ecm-home-copy">
        <small>Private member app</small>
        <h1>Eden&apos;s Closet</h1>
        <p>Choose your model, open her closet, and view the full-body experience in a private room.</p>
        <a href="/closet-v2/models">Start</a>
      </div>
      <div className="ecm-flow-cards">
        <span>1 Home</span>
        <span>2 Model</span>
        <span>3 Full Body</span>
        <span>4 Unlock</span>
      </div>
    </div>
  );
}

function ChooseModel() {
  return (
    <div className="ecm-screen ecm-models">
      <div className="ecm-heading">
        <small>Step 2</small>
        <h1>Choose your model</h1>
        <p>Tap a model to open her private closet preview.</p>
      </div>
      <div className="ecm-model-list">
        {models.map((model) => (
          <a className="ecm-model-card" href={`/closet-v2/models/${model.slug}`} key={model.slug}>
            <img src={model.image} alt={model.name} />
            <b>{model.name}</b>
            <span>{model.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function ModelProfile({ model }: { model: Model }) {
  return (
    <div className="ecm-screen ecm-profile">
      <div className="ecm-heading">
        <small>Step 3</small>
        <h1>{model.name}</h1>
        <p>Open a clean full-body view in her closet, bedroom, or private room.</p>
      </div>
      <div className="ecm-portrait-card">
        <img src={model.image} alt={`${model.name} portrait`} />
        <div>
          <span>AI chat</span>
          <span>Voice</span>
          <span>Video</span>
        </div>
      </div>
      <a className="ecm-primary" href="/closet-v2/closet">Open full body closet</a>
    </div>
  );
}

function FullBodyCloset({ model, outfit, setOutfit, room, setRoom }: { model: Model; outfit: string; setOutfit: (value: string) => void; room: string; setRoom: (value: string) => void }) {
  return (
    <div className="ecm-screen ecm-closet">
      <div className="ecm-view-stage">
        <img className="ecm-room" src={assets.closet} alt={`${room} environment`} />
        <img className="ecm-body" src={assets.body} alt={`${model.name} full body in closet`} />
        <div className="ecm-view-label">
          <b>{model.name}</b>
          <span>{room} · {outfit}</span>
        </div>
      </div>

      <div className="ecm-controls">
        <div>
          <small>Outfit</small>
          <div className="ecm-chips">{outfits.map((item) => <button className={item === outfit ? "active" : ""} key={item} onClick={() => setOutfit(item)}>{item}</button>)}</div>
        </div>
        <div>
          <small>Room</small>
          <div className="ecm-chips">{rooms.map((item) => <button className={item === room ? "active" : ""} key={item} onClick={() => setRoom(item)}>{item}</button>)}</div>
        </div>
        <a className="ecm-primary" href="/payment">Unlock private access</a>
      </div>
    </div>
  );
}
