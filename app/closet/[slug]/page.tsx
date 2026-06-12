import { Header } from "../../components";
import { galleryAssets, models, primaryModel, standaloneAssets } from "../../visual-source-truth";

const outfitTabs = ["All Outfits", "Lingerie", "Swimwear", "Casual", "Evening", "Athleisure", "Fantasy", "Accessories"];

const controlTabs = [
  ["View", "Photo / Video / 360"],
  ["Pose", "Editorial / Relaxed / Dynamic"],
  ["Background", "Bedroom / Closet / Penthouse / Studio"],
  ["Clothing", "Change look packs and accessories"]
];

export function generateStaticParams() {
  return models.map((model) => ({ slug: model.slug }));
}

export default function ClosetModel({ params }: { params: { slug: string } }) {
  const model = models.find((item) => item.slug === params.slug) || primaryModel;

  return (
    <main className="eden-site">
      <Header />
      <section className="closet-home">
        <div>
          <p className="pink">{model.tag}</p>
          <h1>{model.name}</h1>
          <p>{model.location}</p>
          <p>Draft wardrobe access for full-body looks, model interaction, and premium content review.</p>
          <a className="hot-btn" href={`/closet/${model.slug}/viewer`}>
            Open Viewer
          </a>
        </div>
        <img src={model.image} alt={`${model.name} closet hero`} />
      </section>
      <section className="closet-viewer">
        <aside>
          <h2>Select Outfit</h2>
          {outfitTabs.map((tab) => (
            <button key={tab} type="button">
              {tab}
            </button>
          ))}
        </aside>
        <section>
          <img src={standaloneAssets.closetFullBody.src} alt="Generated standalone full-body closet model" />
          <div className="viewer-controls">
            <a href={`/closet/${model.slug}/viewer`}>360 View</a>
            <a href={`/closet/${model.slug}/video`}>Video Chat</a>
            <a href={`/closet/${model.slug}/chat`}>AI Chat</a>
          </div>
        </section>
        <aside>
          <h2>Controls</h2>
          {controlTabs.map(([label, detail]) => (
            <button key={label} type="button" title={detail}>
              {label}
            </button>
          ))}
          <button type="button">Save Look</button>
        </aside>
      </section>
      <section className="gallery-block">
        <h2>Featured Looks</h2>
        <div>{galleryAssets.map((asset) => <img key={asset.id} src={asset.src} alt={asset.label} />)}</div>
      </section>
    </main>
  );
}
