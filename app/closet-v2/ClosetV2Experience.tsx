"use client";

import { useMemo, useState } from "react";

const assets = {
  hero: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-approved-neon-closet-hero.png?v=1781428271",
  loungeOne: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-approved-model-lounge-01.png?v=1781428263",
  loungeTwo: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-approved-model-lounge-02.png?v=1781428279",
  fullBody: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-approved-full-body-viewer.png?v=1781428288",
  pageBoard: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-approved-pwa-page-board.png?v=1781431118"
};

const angleFrames = [
  { label: "Front", url: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-angle-front.png?v=1781431146" },
  { label: "Left 45", url: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-angle-left-45.png?v=1781431138" },
  { label: "Left Side", url: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-angle-left-side.png?v=1781431168" },
  { label: "Back", url: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-angle-back.png?v=1781431152" },
  { label: "Right Side", url: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-angle-right-side.png?v=1781431160" },
  { label: "Right 45", url: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-angle-right-45.png?v=1781431175" },
  { label: "Front Arms Up", url: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-angle-front-arms-up.png?v=1781431194" },
  { label: "Left 45 Arms Up", url: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-angle-left-45-arms-up.png?v=1781431202" },
  { label: "Back Arms Up", url: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-angle-back-arms-up.png?v=1781431211" },
  { label: "Right 45 Arms Up", url: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-angle-right-45-arms-up.png?v=1781431220" },
  { label: "Look Down", url: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-angle-look-down.png?v=1781431227" },
  { label: "Look Up", url: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-angle-look-up.png?v=1781431234" }
];

const models = [
  { name: "Alexis Voss", city: "New York", image: assets.loungeOne, mood: "bold, magnetic, editorial" },
  { name: "Luna Skye", city: "Los Angeles", image: assets.loungeTwo, mood: "soft glam, luxury lounge" },
  { name: "Sienna Rose", city: "Miami", image: angleFrames[0].url, mood: "beach glow, confidence" },
  { name: "Camila Santos", city: "Los Angeles", image: angleFrames[1].url, mood: "private styling, runway energy" }
];

const outfits = ["Black Lounge Set", "Red Lace Set", "White Bikini", "Black Bikini", "Silk Robe", "Sports Bra Set", "Evening Dress", "Heels Edit"];
const environments = ["Neon Closet", "Modern Bedroom", "Walk-in Closet", "Penthouse Living", "Luxury Hotel", "Pool House", "Rooftop Terrace", "Photo Studio"];
const hairStyles = ["Long Wave", "Sleek Straight", "Soft Curl", "High Ponytail"];
const hairColors = ["Deep Brunette", "Espresso", "Champagne Blonde", "Copper Red", "Jet Black"];
const proportionPresets = ["Natural", "Curvy Glam", "Athletic", "Tall Editorial"];
const aiModes = ["AI Chat", "Voice Chat", "Video Chat"];

export function ClosetV2Experience() {
  const [model, setModel] = useState(models[0]);
  const [outfit, setOutfit] = useState(outfits[0]);
  const [environment, setEnvironment] = useState(environments[0]);
  const [hairStyle, setHairStyle] = useState(hairStyles[0]);
  const [hairColor, setHairColor] = useState(hairColors[0]);
  const [proportion, setProportion] = useState(proportionPresets[0]);
  const [frameIndex, setFrameIndex] = useState(0);
  const [mode, setMode] = useState(aiModes[0]);

  const activeFrame = angleFrames[frameIndex];
  const memberLine = useMemo(() => "Black Card members enter after checkout and unlock Closet, chat, voice, video, and saved looks.", []);

  return (
    <main className="closet-v2-shell">
      <header className="closet-v2-topbar">
        <a className="closet-v2-brand" href="/">
          <span>ES</span>
          <strong>Eden's Closet</strong>
        </a>
        <nav aria-label="Eden Closet navigation">
          <a href="#models">Models</a>
          <a href="#closet">Closet</a>
          <a href="#viewer">360 Viewer</a>
          <a href="#ai">AI Chat</a>
          <a href="/payment">Black Card</a>
        </nav>
      </header>

      <section className="closet-v2-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.95), rgba(0,0,0,.55), rgba(0,0,0,.05)), url(${assets.hero})` }}>
        <div className="closet-v2-copy">
          <p className="closet-v2-kicker">Exclusive Access</p>
          <h1>Eden's Closet</h1>
          <p>
            Choose a model, style the look, enter private rooms, and move into AI chat, voice, or video from one Black Card member app.
          </p>
          <div className="closet-v2-actions">
            <a href="#models">Select Model</a>
            <a href="/payment">Join Black Card</a>
          </div>
        </div>
        <aside className="closet-v2-member-card">
          <strong>Private member app</strong>
          <span>{memberLine}</span>
          <div><b>AI Chat</b><b>Voice</b><b>Video</b><b>360</b></div>
        </aside>
      </section>

      <section id="models" className="closet-v2-models">
        <div className="closet-v2-section-head">
          <p className="closet-v2-kicker">Select Your Model</p>
          <h2>Pick the energy, then enter the experience.</h2>
        </div>
        <div className="closet-v2-model-grid">
          {models.map((item) => (
            <button key={item.name} className={model.name === item.name ? "active" : ""} onClick={() => setModel(item)}>
              <img src={item.image} alt={`${item.name} Eden Closet model`} />
              <span><strong>{item.name}</strong><small>{item.city}</small><em>{item.mood}</em></span>
            </button>
          ))}
        </div>
      </section>

      <section className="closet-v2-profile">
        <div className="closet-v2-profile-copy">
          <a href="#models">Back to models</a>
          <h2>{model.name}</h2>
          <p>{model.city}</p>
          <span>{model.mood}</span>
          <div className="closet-v2-stats"><b>5.2M<small>Followers</small></b><b>98%<small>Match</small></b><b>200+<small>Looks</small></b></div>
          <div className="closet-v2-profile-actions"><a href="#ai">Start AI Chat</a><a href="#closet">Enter Closet</a></div>
        </div>
        <img src={model.image} alt={`${model.name} profile`} />
      </section>

      <section id="closet" className="closet-v2-closet">
        <aside className="closet-v2-rail">
          <p className="closet-v2-kicker">Virtual Closet</p>
          {outfits.map((item, index) => (
            <button key={item} className={outfit === item ? "active" : ""} onClick={() => setOutfit(item)}>
              <img src={angleFrames[index % angleFrames.length].url} alt={`${item} preview`} />
              <span>{item}</span>
            </button>
          ))}
        </aside>
        <section className="closet-v2-room">
          <img src={activeFrame.url} alt={`${activeFrame.label} model angle`} />
          <div className="closet-v2-room-dock"><button>360 View</button><button>Save Look</button><button>Favorite</button></div>
        </section>
        <aside className="closet-v2-style-panel">
          <p className="closet-v2-kicker">Customize</p>
          <ControlGroup title="Outfit" values={outfits.slice(0, 6)} active={outfit} onChange={setOutfit} />
          <ControlGroup title="Hair Type" values={hairStyles} active={hairStyle} onChange={setHairStyle} />
          <ControlGroup title="Hair Color" values={hairColors} active={hairColor} onChange={setHairColor} />
          <ControlGroup title="Body Fit" values={proportionPresets} active={proportion} onChange={setProportion} />
        </aside>
      </section>

      <section id="environment" className="closet-v2-environments">
        <div className="closet-v2-section-head">
          <p className="closet-v2-kicker">Environments</p>
          <h2>Change the room, lighting, and mood.</h2>
        </div>
        <div className="closet-v2-env-grid">
          {environments.map((item, index) => (
            <button key={item} className={environment === item ? "active" : ""} onClick={() => setEnvironment(item)}>
              <img src={index % 2 === 0 ? assets.hero : assets.loungeOne} alt={`${item} environment`} />
              <span>{item}</span>
            </button>
          ))}
        </div>
      </section>

      <section id="viewer" className="closet-v2-viewer">
        <aside className="closet-v2-panel">
          <p className="closet-v2-kicker">Full Body 360 Viewer</p>
          <h2>{activeFrame.label}</h2>
          <input aria-label="Angle" type="range" min="0" max={angleFrames.length - 1} value={frameIndex} onChange={(event) => setFrameIndex(Number(event.target.value))} />
          <ControlGroup title="Angle" values={angleFrames.map((item) => item.label)} active={activeFrame.label} onChange={(label) => setFrameIndex(angleFrames.findIndex((item) => item.label === label))} />
        </aside>
        <section className="closet-v2-stage" aria-label="Full Body 360 model viewer">
          <div className="closet-v2-stage-top"><span>{environment}</span><strong>{outfit}</strong></div>
          <div className="closet-v2-avatar-card">
            <div className="closet-v2-motion-rings" />
            <img src={activeFrame.url} alt={`Eden Closet ${activeFrame.label} 360 frame`} />
            <div className="closet-v2-avatar-shadow" />
          </div>
        </section>
        <aside className="closet-v2-measurements">
          <p className="closet-v2-kicker">Details</p>
          <span>Name<strong>{model.name}</strong></span>
          <span>Hair<strong>{hairColor}</strong></span>
          <span>Style<strong>{hairStyle}</strong></span>
          <span>Fit<strong>{proportion}</strong></span>
          <span>Scene<strong>{environment}</strong></span>
        </aside>
      </section>

      <section id="ai" className="closet-v2-ai-suite">
        <div className="closet-v2-chat-card">
          <p className="closet-v2-kicker">AI Chat With {model.name.split(" ")[0]}</p>
          <div className="closet-v2-thread"><p>Hey love, what kind of look should we build tonight?</p><p className="user">Something bold for the private gallery.</p><p>Then we go black lounge, neon closet, slow turn.</p></div>
          <div className="closet-v2-input">Type your message...</div>
        </div>
        <div className="closet-v2-video-card">
          <img src={mode === "Video Chat" ? assets.loungeOne : model.image} alt={`${mode} preview`} />
          <div className="closet-v2-mode-row">{aiModes.map((item) => <button key={item} className={mode === item ? "active" : ""} onClick={() => setMode(item)}>{item}</button>)}</div>
        </div>
        <div className="closet-v2-dashboard-card">
          <p className="closet-v2-kicker">Dashboard</p>
          <h2>Black Card Active</h2>
          <span>Recent activity</span>
          <ul><li>{model.name} profile opened</li><li>{outfit} saved to favorites</li><li>{environment} selected</li></ul>
          <a href="/payment">Manage Membership</a>
        </div>
      </section>

      <section className="closet-v2-shopify-link">
        <div>
          <p className="closet-v2-kicker">Member Access</p>
          <h2>Checkout opens the door. Eden's Closet holds the experience.</h2>
          <p>Connect Shopify Black Card checkout to this PWA and route members back here after successful payment.</p>
        </div>
        <a href="/payment">Open Payment</a>
      </section>
    </main>
  );
}

function ControlGroup({ title, values, active, onChange }: { title: string; values: string[]; active: string; onChange: (value: string) => void }) {
  return (
    <div className="closet-v2-control-group">
      <span>{title}</span>
      <div>
        {values.map((value) => (
          <button key={value} className={active === value ? "active" : ""} onClick={() => onChange(value)}>
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}
