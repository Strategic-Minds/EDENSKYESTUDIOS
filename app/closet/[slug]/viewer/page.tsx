import Link from "next/link";
import { Header } from "../../../components";
import { standaloneAssets } from "../../../visual-source-truth";
import {
  approvedClosetBackground,
  closetEnvironments,
  closetModels,
  outfitCategories,
  outfitOptions,
  primaryClosetModel
} from "../../closet-data";

export function generateStaticParams() {
  return closetModels.map((model) => ({ slug: model.slug }));
}

const controlGroups = [
  ["Zoom", "74%"],
  ["Angle", "Front"],
  ["Speed", "Slow"],
  ["Mode", "360"],
  ["Lighting", "Neon soft"],
  ["Background", "Walk-in"]
];

export default function Viewer({ params }: { params: { slug: string } }) {
  const model = closetModels.find((item) => item.slug === params.slug) || primaryClosetModel;
  const featuredOutfit = outfitOptions[0];
  const stageImage = model.image || featuredOutfit.image || standaloneAssets.closetFullBody.src;

  return (
    <main className="eden-site eden-closet-pwa closet-360-page">
      <Header />
      <section className="viewer-shell">
        <aside className="closet-control-panel">
          <Link className="back-link" href={`/closet/${model.slug}`}>
            Back to closet
          </Link>
          <p className="eyebrow">Full Experience Viewer</p>
          <h1>{model.name}</h1>
          <p>
            Rotate the model, preview wardrobe states, compare environments, and prepare private media selections for Black Card access.
          </p>
          <div className="control-stack">
            {controlGroups.map(([label, value]) => (
              <label className="range-control" key={label}>
                <span>
                  {label}
                  <strong>{value}</strong>
                </span>
                <input type="range" min="0" max="100" defaultValue={label === "Zoom" ? 74 : 42} />
              </label>
            ))}
          </div>
          <div className="outfit-tabs compact-tabs">
            {outfitCategories.map((category) => (
              <button key={category} type="button">
                {category}
              </button>
            ))}
          </div>
        </aside>

        <section className="viewer-stage-shell" aria-label={`${model.name} 360 closet viewer`}>
          <img className="viewer-bg" src={approvedClosetBackground.src} alt={approvedClosetBackground.alt} />
          <div className="viewer-stage-glow" />
          <img className="viewer-model" src={stageImage} alt={`${model.name} standalone full body viewer asset`} />
          <div className="viewer-bottom-controls">
            {["Rotate", "Pose", "Capture", "Favorite", "Chat", "Video"].map((control) => (
              <Link key={control} href={control === "Chat" ? `/closet/${model.slug}/chat` : control === "Video" ? `/closet/${model.slug}/video` : `/closet/${model.slug}/viewer`}>
                {control}
              </Link>
            ))}
          </div>
        </section>

        <aside className="measurement-panel">
          <p className="eyebrow">Details</p>
          <h2>Measurements</h2>
          <dl>
            {Object.entries(model.measurements).map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <div className="viewer-card-list">
            {outfitOptions.slice(0, 4).map((outfit) => (
              <button key={outfit.name} type="button">
                <img src={outfit.image} alt={`${outfit.name} wardrobe preview`} />
                <span>{outfit.name}</span>
              </button>
            ))}
          </div>
          <div className="gate-panel small-gate">
            <strong>Black Card gate active</strong>
            <span>Private favorites, saved looks, live voice, and AI video are unlocked after verified member access.</span>
            <Link href="/payment">Join Black Card</Link>
          </div>
        </aside>
      </section>

      <section className="environment-strip" aria-label="Closet environment selector">
        {closetEnvironments.map((environment) => (
          <button key={environment.key} type="button">
            <img src={environment.src} alt={`${environment.label} standalone environment`} />
            <span>{environment.label}</span>
          </button>
        ))}
      </section>
    </main>
  );
}
