import Link from "next/link";
import { Header } from "../components";
import { models, standaloneAssets } from "../visual-source-truth";
import { approvedClosetBackground, closetAccess, primaryClosetModel } from "../closet/closet-data";

const actions = [
  ["Enter Eden's Closet", "/closet", "Style private looks and open the member wardrobe studio."],
  ["AI Text + Voice", `/closet/${primaryClosetModel.slug}/chat`, "Prepare a private style conversation and voice preview."],
  ["AI Video Chat", `/closet/${primaryClosetModel.slug}/video`, "Open the gated video room for Black Card sessions."],
  ["360 Viewer", `/closet/${primaryClosetModel.slug}/viewer`, "Rotate, favorite, and compare looks in the full-body viewer."]
];

const activity = [
  "Payment success handoff routes into this PWA dashboard.",
  "Private voice and video remain locked until Black Card entitlement is verified.",
  "Favorites, saved looks, and media exports are prepared for Supabase member sync."
];

export default function Dashboard() {
  return (
    <main className="eden-site eden-closet-pwa dashboard-pwa-page">
      <Header />
      <section className="dashboard-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.94), rgba(0,0,0,.62)), url(${approvedClosetBackground.src})` }}>
        <div>
          <p className="eyebrow">Black Card Member Hub</p>
          <h1>Your Eden Skye Dashboard</h1>
          <p>
            Access Eden's Closet, model galleries, AI chat, voice previews, and gated video experiences from one private PWA home.
          </p>
          <div className="hero-actions">
            <Link className="hot-btn" href="/closet">
              Open Closet
            </Link>
            <Link className="outline-btn" href="/payment">
              Membership Status
            </Link>
          </div>
        </div>
        <img src={standaloneAssets.pwaHome.src} alt="Eden Skye PWA app preview" />
      </section>

      <section className="dashboard-grid-pwa">
        <aside className="membership-card">
          <p className="eyebrow">Entitlement</p>
          <h2>Black Card</h2>
          <span>{closetAccess.currentState}</span>
          <p>{closetAccess.entitlement} is required for private AI voice, video, saved looks, and member galleries.</p>
        </aside>
        <section className="dashboard-action-grid">
          {actions.map(([label, href, body]) => (
            <Link href={href} key={label}>
              <strong>{label}</strong>
              <span>{body}</span>
            </Link>
          ))}
        </section>
      </section>

      <section className="closet-panel-section dashboard-panels">
        <div className="section-title-row">
          <div>
            <p className="eyebrow">Saved Models</p>
            <h2>Continue With a Model</h2>
          </div>
          <Link href="/models">Explore all models</Link>
        </div>
        <div className="closet-model-grid compact-models">
          {models.slice(0, 6).map((model) => (
            <Link className="closet-model-tile" href={`/closet/${model.slug}`} key={model.slug}>
              <img src={model.image} alt={`${model.name} member dashboard`} />
              <span>{model.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="activity-panel pwa-activity-panel">
        <p className="eyebrow">Activity + Gate Notes</p>
        <h2>Ready for Member Flow</h2>
        {activity.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </section>
    </main>
  );
}
