import { Header } from "../components";
import { approvedClosetBackground, closetAccess, closetModels, closetUiReference, outfitOptions, primaryClosetModel } from "./closet-data";

const steps = [
  ["Choose your model", "Select your favorite model and open her private Closet profile."],
  ["Pick an outfit", "Browse approved wardrobe looks, lingerie styling, and premium scene packs."],
  ["Customize & explore", "Change outfits, environments, angle, speed, and viewer mode."],
  ["Chat & connect", "Use AI chat, voice chat, and video chat behind the Black Card gate."]
];

const features = [
  ["AI chat", "Natural conversation, styling guidance, and member support."],
  ["Voice chat", "Gated voice UI prepared for realtime conversation wiring."],
  ["AI video chat", "Gated video-call surface prepared for HeyGen/avatar provider integration."],
  ["Virtual Closet", "Wardrobe, outfits, environments, and favorites in one member flow."],
  ["360 viewer", "Zoom, angle, speed, pose, and background controls."],
  ["Private content", "Photos, media drops, and gallery previews after Black Card unlock."]
];

export default function Closet() {
  return (
    <main className="eden-site eden-closet-pwa">
      <Header />
      <section className="closet-hero-pwa" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.94) 0%, rgba(0,0,0,.74) 38%, rgba(0,0,0,.12) 100%), url(${approvedClosetBackground.src})` }}>
        <div className="closet-hero-copy">
          <p className="pink">Eden's Closet</p>
          <h1>Exclusive Access</h1>
          <p>Step into the private Black Card wardrobe experience: choose your model, style the look, enter the scene, then connect through AI chat, voice, or video.</p>
          <ul>
            <li>AI chat conversations</li>
            <li>AI video chat with gated provider handoff</li>
            <li>Voice chat UI prepared for realtime audio</li>
            <li>Virtual Closet and full-body 360 viewer</li>
            <li>Private member galleries and favorites</li>
          </ul>
          <div className="hero-actions">
            <a className="hot-btn" href={`/closet/${primaryClosetModel.slug}`}>Enter Eden's Closet</a>
            <a className="outline-btn" href="/payment">Join Black Card</a>
          </div>
          <small className="closet-source-note">Access state: {closetAccess.currentState}</small>
        </div>
      </section>

      <section className="how-it-works closet-panel-section">
        <p className="pink">How it works</p>
        <div>{steps.map(([title, body], index) => <span key={title}><strong>{index + 1}. {title}</strong><small>{body}</small></span>)}</div>
      </section>

      <section className="closet-model-selector">
        <div className="section-title-row"><div><p className="pink">Select your model</p><h2>Choose who leads your experience</h2></div><a className="outline-btn" href="/dashboard">Member dashboard</a></div>
        <div className="closet-model-grid">
          {closetModels.map((model) => (
            <a className={model.slug === primaryClosetModel.slug ? "closet-model-tile active" : "closet-model-tile"} key={model.slug} href={`/closet/${model.slug}`}>
              <img src={model.image} alt={`${model.name} approved model source`} />
              <strong>{model.name}</strong>
              <span>{model.location}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="closet-preview-grid">
        <article><span className="pink">Outfits</span><h3>Wardrobe-ready looks</h3><div>{outfitOptions.slice(0, 4).map((item) => <img key={item.name} src={item.image} alt={item.name} />)}</div></article>
        <article><span className="pink">Reference</span><h3>PWA board locked</h3><p>{closetUiReference.label}</p><small>{closetUiReference.rule}</small></article>
        <article><span className="pink">Black Card</span><h3>Member gate</h3><p>Shopify payment unlocks the Vercel PWA after entitlement sync is verified.</p><a className="hot-btn" href="/success">Payment handoff</a></article>
      </section>

      <section className="closet-feature-row">
        {features.map(([title, body]) => <article key={title}><strong>{title}</strong><span>{body}</span></article>)}
      </section>
    </main>
  );
}
