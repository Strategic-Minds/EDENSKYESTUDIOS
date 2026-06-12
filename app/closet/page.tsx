import { Header } from "../components";
import { models, standaloneAssets } from "../visual-source-truth";

const steps = [
  ["Choose Your Model", "Select a model profile and enter the full-body wardrobe flow."],
  ["Select Outfit & Environment", "Swap looks, scenes, and wardrobe combinations in the draft viewer."],
  ["Explore & Interact", "Use photo, video, and 360 controls to inspect the look from every angle."],
  ["Video Chat & Connect", "Open the AI chat and video chat paths behind the Black Card gate."]
];

export default function Closet() {
  return (
    <main className="eden-site">
      <Header />
      <section className="closet-home">
        <div>
          <h1>Eden's Closet</h1>
          <p className="pink">Exclusive Access</p>
          <p>Your backstage pass to premium content, exclusive outfits, and dynamic experiences.</p>
          <ul>
            <li>Virtual try-on</li>
            <li>Exclusive outfits</li>
            <li>Full body views</li>
            <li>Video chat</li>
            <li>Premium content</li>
          </ul>
          <a className="hot-btn" href="/closet/alexis-voss">
            Enter Eden's Closet
          </a>
        </div>
        <img src={standaloneAssets.closetFullBody.src} alt="Generated standalone Eden's Closet hero model" />
      </section>
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div>
          {steps.map(([title, body], index) => (
            <span key={title}>
              {index + 1} {title}
              <small>{body}</small>
            </span>
          ))}
        </div>
      </section>
      <section className="models-grid">
        {models.map((model) => (
          <article key={model.slug} className="price-card">
            <span>{model.tag}</span>
            <h2>{model.name}</h2>
            <p>{model.location}</p>
            <a className="outline-btn" href={`/closet/${model.slug}`}>
              Open Closet
            </a>
          </article>
        ))}
      </section>
    </main>
  );
}
