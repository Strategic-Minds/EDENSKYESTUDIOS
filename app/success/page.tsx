import Link from "next/link";
import { Header } from "../components";

const statusCards = [
  ["Membership", "Black Card access", "Your account is ready for the member experience once payment verification is complete."],
  ["Eden's Closet", "Private wardrobe studio", "Choose your model, style a look, preview environments, and enter the 360 viewer."],
  ["AI Access", "Chat, voice, and video", "AI text, voice, and video surfaces are protected behind verified member access."],
  ["Next step", "Open your dashboard", "Continue into the PWA member hub and launch Eden's Closet from there."]
];

export default function SuccessPage() {
  return (
    <main className="eden-site eden-closet-pwa">
      <Header />
      <section className="page-head center success-member-head">
        <p className="pink">Black Card Handoff</p>
        <h1>Welcome to Eden Skye</h1>
        <p>
          Your payment handoff is ready. Continue into the member dashboard to open Eden's Closet, explore private model experiences, and prepare your AI chat or video session.
        </p>
        <div className="hero-actions" style={{ justifyContent: "center" }}>
          <Link className="hot-btn" href="/dashboard">
            Open Dashboard
          </Link>
          <Link className="outline-btn" href="/closet">
            Enter Eden's Closet
          </Link>
        </div>
      </section>
      <section className="pricing-grid">
        {statusCards.map(([label, value, body]) => (
          <article className="price-card" key={label}>
            <span>{label}</span>
            <h2 style={{ fontSize: 28 }}>{value}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>
      <section className="black-card-cta">
        <p className="pink">Member Experience</p>
        <h2>Eden's Closet is the protected PWA layer for Black Card members.</h2>
        <div className="hero-actions" style={{ justifyContent: "center" }}>
          <Link className="hot-btn" href="/closet/alexis-voss">
            Style Alexis
          </Link>
          <Link className="outline-btn" href="/closet/alexis-voss/chat">
            AI Chat Preview
          </Link>
          <Link className="outline-btn" href="/payment">
            Payment Details
          </Link>
        </div>
      </section>
    </main>
  );
}
