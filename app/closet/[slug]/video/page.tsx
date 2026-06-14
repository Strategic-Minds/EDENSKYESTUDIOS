import Link from "next/link";
import { Header } from "../../../components";
import { standaloneAssets } from "../../../visual-source-truth";
import {
  approvedClosetBackground,
  closetAccess,
  closetEnvironments,
  closetModels,
  primaryClosetModel,
  videoQualities,
  voiceModes
} from "../../closet-data";

export function generateStaticParams() {
  return closetModels.map((model) => ({ slug: model.slug }));
}

export default function Video({ params }: { params: { slug: string } }) {
  const model = closetModels.find((item) => item.slug === params.slug) || primaryClosetModel;
  const portrait = model.image || standaloneAssets.aiVideo.src;

  return (
    <main className="eden-site eden-closet-pwa closet-video-page">
      <Header />
      <section className="video-chat-shell">
        <aside className="chat-sidebar video-left-panel">
          <Link className="back-link" href={`/closet/${model.slug}`}>
            Back to {model.name}
          </Link>
          <p className="eyebrow">AI Video Chat</p>
          <h1>{model.name}</h1>
          <p>Private video presence, closet walkthroughs, and Black Card concierge sessions are staged here before live access is enabled.</p>
          <div className="video-mode-list">
            {voiceModes.map((mode) => (
              <button key={mode} type="button">
                {mode}
              </button>
            ))}
          </div>
        </aside>

        <section className="video-stage-shell" style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.92)), url(${approvedClosetBackground.src})` }}>
          <div className="video-frame">
            <img src={portrait} alt={`${model.name} gated AI video chat preview`} />
            <div className="video-live-badge">Black Card preview</div>
          </div>
          <div className="video-caption-panel">
            <p>{model.name}: Choose a look, pick a room, and I will prepare the private closet sequence for your member session.</p>
          </div>
          <div className="viewer-bottom-controls video-controls">
            <button type="button">Mute</button>
            <button type="button">Camera</button>
            <Link href={`/closet/${model.slug}/chat`}>Text Chat</Link>
            <button type="button">Record Draft</button>
            <Link href="/payment">Unlock</Link>
          </div>
        </section>

        <aside className="video-settings-panel">
          <p className="eyebrow">Session Controls</p>
          <h2>Video Room</h2>
          <div className="setting-grid">
            {videoQualities.map((quality) => (
              <button key={quality} type="button">
                {quality}
              </button>
            ))}
          </div>
          <div className="viewer-card-list environment-mini-list">
            {closetEnvironments.slice(0, 4).map((environment) => (
              <button key={environment.name} type="button">
                <img src={environment.image} alt={`${environment.name} video background`} />
                <span>{environment.name}</span>
              </button>
            ))}
          </div>
          <div className="gate-panel small-gate">
            <strong>{closetAccess.entitlement} required</strong>
            <span>Live AI video, voice, saved media, and private gallery access remain locked until payment success syncs to the member account.</span>
            <Link href="/payment">Join Black Card</Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
