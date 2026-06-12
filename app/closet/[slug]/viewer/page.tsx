import { Header } from "../../../components";
import { environmentAssets, models, primaryModel, standaloneAssets } from "../../../visual-source-truth";

export function generateStaticParams() {
  return models.map((model) => ({ slug: model.slug }));
}

const controls = [
  ["Photo", "Capture stills"],
  ["Video", "Preview motion"],
  ["360 View", "Spin the look"],
  ["Pose", "Switch pose presets"],
  ["Background", "Change environment"],
  ["Clothing", "Swap wardrobe"]
];

export default function Viewer({ params }: { params: { slug: string } }) {
  const model = models.find((item) => item.slug === params.slug) || primaryModel;

  return (
    <main className="eden-site">
      <Header />
      <section className="environment-page">
        <aside>
          {environmentAssets.map((env) => (
            <button key={env.key} type="button">
              {env.label}
            </button>
          ))}
        </aside>
        <section className="environment-stage">
          <img className="environment-bg" src={environmentAssets[0].src} alt="Generated standalone modern bedroom environment" />
          <img className="environment-model" src={model.image || standaloneAssets.closetFullBody.src} alt={`${model.name} generated standalone closet model`} />
        </section>
        <aside>
          {controls.map(([label, detail]) => (
            <button key={label} type="button" title={detail}>
              {label}
            </button>
          ))}
        </aside>
      </section>
      <section className="favorites-row">
        {environmentAssets.map((env) => (
          <img key={env.key} src={env.src} alt={`Generated standalone ${env.label} environment`} />
        ))}
      </section>
    </main>
  );
}
