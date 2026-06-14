import Link from "next/link";
import { Header } from "../components";
import { standaloneAssets } from "../visual-source-truth";
import { approvedClosetBackground, primaryClosetModel } from "../closet/closet-data";

const pwaFeatures = [
  ["Member Dashboard", "/dashboard", "Black Card status, quick access, saved models, and private activity."],
  ["Eden's Closet", "/closet", "The protected wardrobe studio with model selection and outfit previews."],
  ["AI Chat + Voice", `/closet/${primaryClosetModel.slug}/chat`, "Text and voice-ready private model conversations behind entitlement."],
  ["AI Video", `/closet/${primaryClosetModel.slug}/video`, "Video chat room for gated HeyGen-style member sessions."],
  ["360 Viewer", `/closet/${primaryClosetModel.slug}/viewer`, "Full-body outfit, angle, speed, environment, and favorites controls."],
  ["Payment Handoff", "/payment", "Shopify remains the storefront and payment layer for Black Card access."]
];

export default function Page() {
  return (
    <main className="eden-site eden-closet-pwa pwa-app-page">
      <Header />
      <section className="pwa-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.92), rgba(0,0,0,.52)), url(${approvedClosetBackground.src})` }}>
        <div>
          <p className="eyebrow">Eden Skye PWA</p>
          <h1>Black Card in your pocket.</h1>
          <p>
            Install the Eden Skye member app for private model discovery, Eden's Closet, AI chat, voice, video, saved looks, and payment-gated member access.
          </p>
          <div className="hero-actions">
            <Link className="hot-btn" href="/dashboard">
              Open Dashboard
            </Link>
            <Link className="outline-btn" href="/closet">
              Preview Closet
            </Link>
          </div>
        </div>
        <div className="pwa-phone-stack">
          <img src={standaloneAssets.pwaHome.src} alt="Generated standalone Eden Skye PWA home screen" />
          <img src={standaloneAssets.pwaNavigation.src} alt="Generated standalone Eden Skye PWA navigation screen" />
        </div>
      </section>

      <section className="pwa-feature-grid">
        {pwaFeatures.map(([label, href, body]) => (
          <Link href={href} key={label}>
            <span>{label}</span>
            <p>{body}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
