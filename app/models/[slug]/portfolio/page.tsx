import { Header as SiteHeader } from '../../../components';
import { galleryAssets, models, primaryModel, standaloneAssets } from '../../../visual-source-truth';

const portfolioModules = [
  ['Hero Set', 'Primary profile image, neon Eden Skye editorial hero, and campaign-ready model card assets.'],
  ['Brand Campaigns', 'Beauty, fashion, luxury travel, nightlife, wellness, and premium creator membership funnels.'],
  ['Eden Closet', 'Full-body closet viewer, outfit selector, environments, favorites, and VIP wardrobe access.'],
  ['AI Experience', 'AI chat portrait, HeyGen/video packet still, and draft-only custom interaction flow.'],
  ['Commerce Path', 'Black Card pricing, Shopify bridge, draft checkout, success/entitlement handoff plan.'],
  ['Evidence', 'Every render asset must match the locked exact image source manifest.']
];

export function generateStaticParams(){return models.map(model=>({slug:model.slug}));}

export default function ModelPortfolio({params}:{params:{slug:string}}){const model=models.find(item=>item.slug===params.slug)||primaryModel;return <main className="eden-site"><SiteHeader/><section className="page-head"><p className="pink">Model Portfolio</p><h1>{model.name}</h1><p>{model.location} / {model.tag}. A full Eden Skye creator portfolio with gallery, AI, closet, commerce, and brand-collaboration surfaces.</p><div className="hero-actions"><a className="hot-btn" href={`/models/${model.slug}`}>Profile</a><a className="outline-btn" href={`/closet/${model.slug}`}>Closet</a><a className="outline-btn" href="/shopify">Black Card</a></div></section><section className="profile-shell" style={{paddingTop:24}}><img className="profile-hero-img" src={model.image} alt={`${model.name} locked standalone portfolio source`}/><div className="profile-copy"><h2>Portfolio System</h2><p>This route is the model's complete portfolio handoff: public gallery, campaign fit, media packets, AI surfaces, closet access, Black Card gating, and source-truth evidence.</p><div className="profile-stats"><span>Gallery<small>Locked assets</small></span><span>Closet<small>VIP access</small></span><span>AI<small>Chat/video</small></span><span>Shopify<small>Draft bridge</small></span></div></div></section><section className="gallery-block"><h2>Portfolio Modules</h2><div>{portfolioModules.map(([title,body])=><article key={title} className="price-card"><span>{title}</span><p>{body}</p></article>)}</div><h2>Gallery Source Set</h2><div>{galleryAssets.map(asset=><img key={asset.id} src={asset.src} alt={asset.label}/>)}</div><h2>Experience Assets</h2><div>{[standaloneAssets.closetFullBody, standaloneAssets.aiVideo, standaloneAssets.aiChat, standaloneAssets.pwaHome, standaloneAssets.pwaNavigation].map(asset=><figure key={asset.id}><img src={asset.src} alt={asset.label}/><figcaption>{asset.allowedUse.join(' / ')}</figcaption></figure>)}</div></section></main>}
