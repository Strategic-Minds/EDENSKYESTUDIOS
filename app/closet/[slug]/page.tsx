import { Header } from "../../components";
import { approvedClosetBackground, closetAccess, closetModels, outfitCategories, outfitOptions, primaryClosetModel } from "../closet-data";
import { galleryAssets } from "../../visual-source-truth";

const quickActions = [
  ["AI Chat", "Start a conversation", "chat"],
  ["AI Video Chat", "Video call with AI", "video"],
  ["Enter Closet", "Customize and explore", "viewer"],
  ["View Gallery", "Photos and videos", "portfolio"],
  ["Add to Favorites", "Save this model", "favorites"]
];

export function generateStaticParams() {
  return closetModels.map((model) => ({ slug: model.slug }));
}

export default function ClosetModel({ params }: { params: { slug: string } }) {
  const model = closetModels.find((item) => item.slug === params.slug) || primaryClosetModel;

  return (
    <main className="eden-site eden-closet-pwa">
      <Header />
      <section className="closet-profile-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.94), rgba(0,0,0,.52), rgba(0,0,0,.88)), url(${approvedClosetBackground.src})` }}>
        <div className="closet-profile-copy">
          <a className="back-link" href="/closet">Back to models</a>
          <h1>{model.name}</h1>
          <p className="pink">{model.location}</p>
          <p>{model.bio}</p>
          <div className="profile-stats closet-profile-stats">
            <span>5.2M<small>Followers</small></span>
            <span>98%<small>Engagement</small></span>
            <span>200+<small>Frames</small></span>
          </div>
          <small className="online-dot">{model.status}</small>
        </div>
        <img className="closet-profile-model" src={model.image} alt={`${model.name} Eden Closet profile`} />
        <aside className="quick-actions-panel">
          <p className="pink">Quick actions</p>
          {quickActions.map(([title, body, key]) => {
            const href = key === "chat" ? `/closet/${model.slug}/chat` : key === "video" ? `/closet/${model.slug}/video` : key === "viewer" ? `/closet/${model.slug}/viewer` : key === "portfolio" ? `/models/${model.slug}/portfolio` : "/dashboard";
            return <a key={title} href={href}><strong>{title}</strong><span>{body}</span></a>;
          })}
        </aside>
      </section>

      <section className="closet-viewer outfit-selector-panel">
        <aside>
          <h2>Virtual Closet</h2>
          {outfitOptions.map((item) => <a className="outfit-row" key={item.name} href={`/closet/${model.slug}/viewer`}><img src={item.image} alt={item.name} /><span><strong>{item.name}</strong><small>{item.category}</small></span></a>)}
        </aside>
        <section className="outfit-stage">
          <div className="outfit-tabs">{outfitCategories.map((tab) => <button key={tab} type="button">{tab}</button>)}</div>
          <img src={model.slug === "alexis-voss" ? outfitOptions[0].image : model.image} alt={`${model.name} full-body outfit preview`} />
          <div className="viewer-controls"><a href={`/closet/${model.slug}/viewer`}>360 View</a><a href={`/closet/${model.slug}/video`}>Video Chat</a><a href={`/closet/${model.slug}/chat`}>AI + Voice Chat</a></div>
        </section>
        <aside>
          <h2>Member Gate</h2>
          <p>{closetAccess.currentState}</p>
          <a className="hot-btn" href="/payment">Join Black Card</a>
          <a className="outline-btn" href="/success">Payment handoff</a>
        </aside>
      </section>

      <section className="gallery-block">
        <h2>Featured Looks</h2>
        <div>{galleryAssets.slice(0, 6).map((asset) => <img key={asset.id} src={asset.src} alt={asset.label} />)}</div>
      </section>
    </main>
  );
}
