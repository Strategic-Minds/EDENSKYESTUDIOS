"use client";

import { useMemo, useState } from "react";

type View = "home" | "models" | "profile" | "closet" | "environments" | "viewer" | "chat" | "video" | "dashboard";
type Props = { view?: View; slug?: string };

const img = {
  loungeOne: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-approved-model-lounge-01.png?v=1781428263",
  loungeTwo: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-approved-model-lounge-02.png?v=1781428279",
  neonCloset: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-approved-neon-closet-hero.png?v=1781428271",
  fullBody: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-approved-full-body-viewer.png?v=1781428288"
};

const frames = [
  ["Front", "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-angle-front.png?v=1781431146"],
  ["Left 45", "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-angle-left-45.png?v=1781431138"],
  ["Left", "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-angle-left-side.png?v=1781431168"],
  ["Back", "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-angle-back.png?v=1781431152"],
  ["Right", "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-angle-right-side.png?v=1781431160"],
  ["Right 45", "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-angle-right-45.png?v=1781431175"],
  ["Front Pose", "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-angle-front-arms-up.png?v=1781431194"],
  ["Back Pose", "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-closet-v2-angle-back-arms-up.png?v=1781431211"]
] as const;

const models = [
  { name: "Alexis Voss", slug: "alexis-voss", image: img.loungeOne, mood: "Noir lounge, velvet light, private editorial access", tags: ["Private gallery", "Voice", "Video"] },
  { name: "Eden Skye", slug: "eden-skye", image: img.loungeTwo, mood: "Signature Black Card muse with cinematic closet access", tags: ["Closet", "Chat", "360"] },
  { name: "Luna Moretti", slug: "luna-moretti", image: img.fullBody, mood: "Luxury wardrobe testing, runway poses, night studio looks", tags: ["Wardrobe", "Looks", "Favorites"] },
  { name: "Sienna Cole", slug: "sienna-cole", image: frames[0][1], mood: "Full-body selector, 360 angles, member-only styling", tags: ["Angles", "Fit", "Style"] }
];

const outfits = ["Noir lounge set", "Hot pink mini dress", "Black evening look", "Luxury robe", "Poolside look", "After-dark heels"];
const environments = ["Penthouse", "Luxury Bathroom", "Walk-in Closet", "Pool Villa", "Bedroom Suite", "Photo Studio"];
const nav = [["Home", "/closet-v2"], ["Models", "/closet-v2/models"], ["Closet", "/closet-v2/closet"], ["Viewer", "/closet-v2/viewer"], ["Chat", "/closet-v2/chat"], ["Video", "/closet-v2/video"], ["Dashboard", "/closet-v2/dashboard"]];

export function ClosetV2RealApp({ view = "home", slug }: Props) {
  const [frame, setFrame] = useState(0);
  const [outfit, setOutfit] = useState(outfits[0]);
  const [environment, setEnvironment] = useState(environments[0]);
  const model = useMemo(() => models.find((item) => item.slug === slug) ?? models[0], [slug]);

  return (
    <main className="ec2-app">
      <div className="ec2-ambient" />
      <header className="ec2-topbar">
        <a className="ec2-brand" href="/closet-v2"><span>ES</span><strong>Eden&apos;s Closet</strong></a>
        <nav className="ec2-nav" aria-label="Eden's Closet navigation">{nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
        <a className="ec2-member" href="/payment">Black Card</a>
      </header>
      {view === "home" && <Home />}
      {view === "models" && <Models />}
      {view === "profile" && <Profile model={model} />}
      {view === "closet" && <Closet outfit={outfit} setOutfit={setOutfit} />}
      {view === "environments" && <Environments environment={environment} setEnvironment={setEnvironment} />}
      {view === "viewer" && <Viewer frame={frame} setFrame={setFrame} outfit={outfit} environment={environment} />}
      {view === "chat" && <Chat model={model} />}
      {view === "video" && <Video model={model} />}
      {view === "dashboard" && <Dashboard />}
    </main>
  );
}

function Home() {
  return <><section className="ec2-hero"><div className="ec2-hero-copy"><p className="ec2-kicker">Black Card member PWA</p><h1>Eden&apos;s Closet</h1><p>A private AI model, wardrobe, voice, and video experience built for ultra-lifelike styling sessions after Black Card access.</p><div className="ec2-actions"><a href="/closet-v2/models">Choose a Model</a><a href="/closet-v2/viewer">Open 360 Viewer</a></div></div><div className="ec2-hero-visual"><img src={img.neonCloset} alt="Neon Eden's Closet wardrobe entrance" /><div className="ec2-floating-panel"><strong>Live session modes</strong><span>Text chat</span><span>Voice room</span><span>AI video preview</span></div></div></section><section className="ec2-lane">{[["Model selection", "/closet-v2/models"], ["Virtual wardrobe", "/closet-v2/closet"], ["Environment studio", "/closet-v2/environments"], ["AI video room", "/closet-v2/video"]].map(([label, href]) => <a className="ec2-lane-item" href={href} key={href}><span>{label}</span><b>Open</b></a>)}</section></>;
}

function Models() {
  return <section className="ec2-page"><PageHead kicker="Select your experience" title="Choose a model" body="Each model opens into a profile, wardrobe selector, AI chat, and private video room." /><div className="ec2-model-grid">{models.map((model) => <a className="ec2-model-tile" href={`/closet-v2/models/${model.slug}`} key={model.slug}><img src={model.image} alt={`${model.name} Eden's Closet profile`} /><div><h2>{model.name}</h2><p>{model.mood}</p><span>Open profile</span></div></a>)}</div></section>;
}

function Profile({ model }: { model: typeof models[number] }) {
  return <section className="ec2-profile"><div className="ec2-profile-media"><img src={model.image} alt={`${model.name} profile`} /></div><div className="ec2-profile-copy"><p className="ec2-kicker">Model profile</p><h1>{model.name}</h1><p>{model.mood}. Build a private session around wardrobe, environment, chat, and video.</p><div className="ec2-tags">{model.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="ec2-profile-actions"><a href="/closet-v2/closet">Style wardrobe</a><a href="/closet-v2/video">Start video room</a><a href="/payment">Unlock with Black Card</a></div></div><div className="ec2-strip">{frames.slice(0, 6).map(([label, src]) => <img key={label} src={src} alt={`${model.name} ${label} angle`} />)}</div></section>;
}

function Closet({ outfit, setOutfit }: { outfit: string; setOutfit: (value: string) => void }) {
  return <section className="ec2-workspace"><aside className="ec2-side"><p className="ec2-kicker">Virtual wardrobe</p><h1>Style the session</h1>{outfits.map((item) => <button className={item === outfit ? "is-selected" : ""} key={item} type="button" onClick={() => setOutfit(item)}>{item}</button>)}</aside><div className="ec2-stage"><img src={img.fullBody} alt="Full-body wardrobe-safe Eden's Closet model preview" /><div className="ec2-stage-caption"><strong>{outfit}</strong><span>Saved to session draft</span></div></div><aside className="ec2-inspector"><h2>Controls</h2><label>Hair tone <span>Brunette gloss</span></label><label>Fit style <span>Editorial</span></label><label>Gesture <span>Soft pose</span></label><a href="/closet-v2/viewer">Open 360 view</a></aside></section>;
}

function Environments({ environment, setEnvironment }: { environment: string; setEnvironment: (value: string) => void }) {
  return <section className="ec2-page"><PageHead kicker="Environment selector" title="Choose the room" body="Build the tone of the session before opening chat, voice, or video." /><div className="ec2-env-grid">{environments.map((item) => <button className={item === environment ? "is-selected" : ""} key={item} type="button" onClick={() => setEnvironment(item)}><span>{item}</span><small>Private member scene with black, glass, neon, and soft cinematic light.</small></button>)}</div><a className="ec2-wide-cta" href="/closet-v2/viewer">Continue to viewer</a></section>;
}

function Viewer({ frame, setFrame, outfit, environment }: { frame: number; setFrame: (value: number) => void; outfit: string; environment: string }) {
  return <section className="ec2-viewer"><div className="ec2-viewer-main"><img src={frames[frame][1]} alt={`360 model angle ${frames[frame][0]}`} /><div className="ec2-viewer-hud"><span>{frames[frame][0]}</span><span>{outfit}</span><span>{environment}</span></div></div><div className="ec2-frame-rail">{frames.map(([label, src], index) => <button className={index === frame ? "is-selected" : ""} key={label} type="button" onClick={() => setFrame(index)}><img src={src} alt={label} /><span>{label}</span></button>)}</div></section>;
}

function Chat({ model }: { model: typeof models[number] }) {
  return <section className="ec2-chat"><div className="ec2-chat-visual"><img src={model.image} alt={`${model.name} AI chat portrait`} /><span>Voice preview locked to Black Card session</span></div><div className="ec2-chat-panel"><p className="ec2-kicker">AI text + voice</p><h1>Chat with {model.name}</h1><div className="ec2-message is-model">Choose the look, room, and tone. I&apos;ll hold the session mood.</div><div className="ec2-message is-user">Open with a penthouse wardrobe preview.</div><div className="ec2-chat-input"><span>Type a private session prompt</span><a href="/closet-v2/video">Move to video</a></div></div></section>;
}

function Video({ model }: { model: typeof models[number] }) {
  return <section className="ec2-video"><div className="ec2-video-feed"><img src={model.image} alt={`${model.name} AI video room`} /><div className="ec2-video-status"><span>AI video room</span><strong>Member preview</strong></div></div><aside className="ec2-video-controls"><p className="ec2-kicker">Voice + video</p><h1>{model.name}</h1><button type="button">Start voice</button><button type="button">Open camera preview</button><button type="button">Change gesture</button><a href="/payment">Unlock live session</a></aside></section>;
}

function Dashboard() {
  return <section className="ec2-dashboard"><PageHead kicker="Member dashboard" title="Your Black Card studio" body="Continue sessions, saved looks, favorite rooms, and model chats from one PWA surface." /><div className="ec2-dashboard-grid">{[["Saved looks", "8 wardrobe drafts", "/closet-v2/closet"], ["Private chats", "2 active model rooms", "/closet-v2/chat"], ["Video sessions", "1 ready preview", "/closet-v2/video"], ["Payment access", "Black Card required", "/payment"]].map(([title, detail, href]) => <a href={href} key={title}><strong>{title}</strong><span>{detail}</span></a>)}</div></section>;
}

function PageHead({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return <div className="ec2-page-head"><p className="ec2-kicker">{kicker}</p><h1>{title}</h1><p>{body}</p></div>;
}
