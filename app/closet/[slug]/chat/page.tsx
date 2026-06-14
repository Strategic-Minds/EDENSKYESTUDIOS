import Link from "next/link";
import { Header } from "../../../components";
import { standaloneAssets } from "../../../visual-source-truth";
import { approvedClosetBackground, closetAccess, closetModels, primaryClosetModel, voiceModes } from "../../closet-data";

export function generateStaticParams() {
  return closetModels.map((model) => ({ slug: model.slug }));
}

const messages = [
  ["model", "Welcome back. Tell me what kind of look, mood, or private gallery moment you want to explore first."],
  ["member", "Start with the noir lounge outfit and a slow 360 preview."],
  ["model", "I can queue that look, save it to favorites, and prepare a voice preview once Black Card access is verified."],
  ["system", "Voice chat and private media actions are locked until Supabase auth and Black Card entitlement are confirmed."]
];

export default function Chat({ params }: { params: { slug: string } }) {
  const model = closetModels.find((item) => item.slug === params.slug) || primaryClosetModel;

  return (
    <main className="eden-site eden-closet-pwa closet-chat-page">
      <Header />
      <section className="chat-shell">
        <aside className="chat-sidebar">
          <Link className="back-link" href={`/closet/${model.slug}`}>
            Back to {model.name}
          </Link>
          <p className="eyebrow">AI Text + Voice Chat</p>
          <h1>{model.name}</h1>
          <p>{model.bio}</p>
          <img src={model.image || standaloneAssets.aiChat.src} alt={`${model.name} AI chat portrait`} />
          <div className="locked-chip">{closetAccess.entitlement} required</div>
        </aside>

        <section className="chat-window" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.92), rgba(0,0,0,.76)), url(${approvedClosetBackground.src})` }}>
          <div className="chat-header-row">
            <div>
              <p className="eyebrow">Private Closet Conversation</p>
              <h2>Style, gallery, and media concierge</h2>
            </div>
            <Link href={`/closet/${model.slug}/video`}>Open video chat</Link>
          </div>
          <div className="chat-thread">
            {messages.map(([role, text]) => (
              <div className={`chat-message ${role}`} key={text}>
                <span>{role === "model" ? model.name : role === "member" ? "Member" : "Gate"}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <form className="chat-composer">
            <input aria-label="Draft closet message" placeholder="Ask for an outfit, pose, scene, or gallery preview..." />
            <button type="button">Draft</button>
          </form>
        </section>

        <aside className="voice-panel">
          <p className="eyebrow">Voice Modes</p>
          <h2>Voice Preview</h2>
          <div className="video-mode-list">
            {voiceModes.map((mode) => (
              <button key={mode} type="button">
                {mode}
              </button>
            ))}
          </div>
          <div className="call-control-row">
            <button type="button">Mic Preview</button>
            <button type="button">Voice Call</button>
          </div>
          <div className="gate-panel small-gate">
            <strong>Gated by Supabase + Black Card</strong>
            <span>Live voice is draft-safe here until the entitlement service confirms a paid member session.</span>
            <Link href="/payment">Unlock Black Card</Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
