"use client";

import { useMemo, useState } from "react";

const assets = {
  hero: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-approved-neon-closet-hero.png?v=1781428271",
  loungeOne: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-approved-model-lounge-01.png?v=1781428263",
  loungeTwo: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-approved-model-lounge-02.png?v=1781428279",
  fullBody: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-approved-full-body-viewer.png?v=1781428288"
};

const looks = ["Midnight Lounge", "Black Dress", "Private Swim", "Studio Glam", "Heels Edit", "Silk Set"];
const environments = ["Neon Closet", "Vanity Bath", "Rain Shower Set", "Bedroom Suite", "Penthouse Living", "Pool Deck", "Rooftop", "Photo Studio"];
const hairStyles = ["Long Wave", "Sleek Straight", "Soft Curl", "High Ponytail"];
const hairColors = ["Deep Brunette", "Espresso", "Champagne Blonde", "Copper Red", "Jet Black"];
const poses = ["Idle Breath", "Slow Turn", "Over Shoulder", "Wardrobe Preview", "Wave", "Confident Step"];

export function ClosetV2Experience() {
  const [look, setLook] = useState(looks[0]);
  const [environment, setEnvironment] = useState(environments[0]);
  const [hairStyle, setHairStyle] = useState(hairStyles[0]);
  const [hairColor, setHairColor] = useState(hairColors[0]);
  const [pose, setPose] = useState(poses[0]);
  const [silhouette, setSilhouette] = useState("Classic Muse");
  const [mode, setMode] = useState("AI Chat");

  const accessLine = useMemo(() => {
    return "Shopify Black Card purchase returns members here through /success?next=/closet-v2.";
  }, []);

  return (
    <main className="closet-v2-shell">
      <header className="closet-v2-topbar">
        <a className="closet-v2-brand" href="/">
          <span>ES</span>
          <strong>Eden's Closet</strong>
        </a>
        <nav aria-label="Eden Closet V2">
          <a href="#viewer">Viewer</a>
          <a href="#style">Style</a>
          <a href="#environment">Environments</a>
          <a href="#ai">AI Chat</a>
          <a href="/payment">Black Card</a>
        </nav>
      </header>

      <section className="closet-v2-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.94), rgba(0,0,0,.62), rgba(0,0,0,.12)), url(${assets.hero})` }}>
        <div className="closet-v2-copy">
          <p className="closet-v2-kicker">Black Card PWA</p>
          <h1>Eden's Closet, rebuilt as a near-human virtual styling experience.</h1>
          <p>
            Step into a private member app where approved Eden Skye models, wardrobe changes, voice, chat, video, and cinematic environments come together in one premium interface.
          </p>
          <div className="closet-v2-actions">
            <a href="#viewer">Enter Viewer</a>
            <a href="/payment">Join Black Card</a>
          </div>
        </div>
        <aside className="closet-v2-access">
          <strong>Member gate</strong>
          <span>Black Card entitlement: black_card_member</span>
          <small>{accessLine}</small>
        </aside>
      </section>

      <section id="viewer" className="closet-v2-grid">
        <aside className="closet-v2-panel closet-v2-controls" id="style">
          <p className="closet-v2-kicker">Style Console</p>
          <h2>Change the look</h2>
          <ControlGroup title="Wardrobe" values={looks} active={look} onChange={setLook} />
          <ControlGroup title="Hair Type" values={hairStyles} active={hairStyle} onChange={setHairStyle} />
          <ControlGroup title="Hair Color" values={hairColors} active={hairColor} onChange={setHairColor} />
          <ControlGroup title="Silhouette" values={["Classic Muse", "Curvy Glam", "Athletic", "Tall Editorial"]} active={silhouette} onChange={setSilhouette} />
        </aside>

        <section className="closet-v2-stage" aria-label="Full Body model viewer">
          <div className="closet-v2-stage-top">
            <span>Full Body Viewer</span>
            <strong>{look}</strong>
          </div>
          <div className="closet-v2-avatar-card">
            <div className="closet-v2-motion-rings" />
            <img src={assets.fullBody} alt="Approved full body Eden Closet model viewer source" />
            <div className="closet-v2-avatar-shadow" />
          </div>
          <div className="closet-v2-pose-row">
            {poses.map((item) => (
              <button key={item} className={pose === item ? "active" : ""} onClick={() => setPose(item)}>
                {item}
              </button>
            ))}
          </div>
        </section>

        <aside className="closet-v2-panel" id="environment">
          <p className="closet-v2-kicker">Scene</p>
          <h2>{environment}</h2>
          <div className="closet-v2-scene-preview">
            <img src={environment === "Neon Closet" ? assets.hero : assets.loungeOne} alt={`${environment} Eden Closet scene`} />
          </div>
          <ControlGroup title="Environment" values={environments} active={environment} onChange={setEnvironment} />
          <div className="closet-v2-live-spec">
            <span>Name</span><strong>Eden Muse</strong>
            <span>Look</span><strong>{hairColor} / {hairStyle}</strong>
            <span>Pose</span><strong>{pose}</strong>
            <span>Fit</span><strong>{silhouette}</strong>
          </div>
        </aside>
      </section>

      <section id="ai" className="closet-v2-ai">
        <div className="closet-v2-ai-copy">
          <p className="closet-v2-kicker">AI Companions</p>
          <h2>Chat, voice, and video built for member access.</h2>
          <p>
            The interface is ready for gated AI text, voice, and video providers. Live provider activation stays behind the Black Card entitlement and production approval.
          </p>
          <div className="closet-v2-mode-row">
            {["AI Chat", "Voice", "Video"].map((item) => (
              <button key={item} className={mode === item ? "active" : ""} onClick={() => setMode(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="closet-v2-chat-phone">
          <img src={mode === "Video" ? assets.loungeOne : assets.loungeTwo} alt={`${mode} Eden Closet approved source`} />
          <div className="closet-v2-chat-overlay">
            <span>{mode}</span>
            <p>{mode === "AI Chat" ? "Tell me what mood you want tonight, and I will style the room around it." : mode === "Voice" ? "Voice room is prepared for member-gated realtime audio." : "Video room is prepared for a member-gated avatar or HeyGen bridge."}</p>
            <button>{mode === "AI Chat" ? "Start Chat" : mode === "Voice" ? "Start Voice" : "Start Video"}</button>
          </div>
        </div>
      </section>

      <section className="closet-v2-shopify-link">
        <div>
          <p className="closet-v2-kicker">Shopify to PWA</p>
          <h2>Payment stays on Shopify. The private experience opens on Vercel.</h2>
          <p>
            The launch flow should send Black Card customers into Eden's Closet after checkout, then Supabase confirms the member entitlement before AI features unlock.
          </p>
        </div>
        <a href="/payment">Open Payment Flow</a>
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
