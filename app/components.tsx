import { heroAsset, missingAssets, models, primaryModel } from './visual-source-truth';

export function Header() {
  return <header className="es-header"><a className="es-logo" href="/"><span>ES</span><strong>EDEN <b>SKYE</b> STUDIOS</strong><small>DIGITAL MODELING & CONTENT CREATOR AGENCY</small></a><nav><a href="/">Home</a><a href="/models">Models</a><a href="/services">Services</a><a href="/auto-social">Auto Social</a><a href="/brand-partnerships">Brand Partnerships</a><a href="/apply">Apply</a><a href="/pwa-app">PWA App</a><a href="/contact">Contact</a></nav><a className="es-apply" href="/apply">Apply Now</a></header>;
}

export function VisualAssetSlot({ label, requiredFile, className = '' }: { label: string; requiredFile?: string; className?: string }) {
  return <div className={`visual-asset-slot ${className}`}><strong>MISSING_ASSET</strong><span>{label}</span>{requiredFile ? <em>{requiredFile}</em> : null}</div>;
}

export function ModelCard({ model }: { model: typeof models[number] }) {
  return <a className="model-card" href={`/models/${model.slug}`}><img src={model.image} alt={`${model.name} generated standalone source`} /><span><strong>{model.name}</strong><em>{model.location}</em></span></a>;
}

export function Difference() {
  const items = [['Elite Talent','Top digital models and creator personas.'],['Viral Content','High-converting campaign content.'],['Global Reach','Worldwide audience and brand readiness.'],['Premium Brands','Campaigns, licensing, and partnerships.'],['Maximum Profit','Draft-only monetization lanes until approved.']];
  return <section className="difference"><p>The Eden Skye Studios Difference</p><div>{items.map(([title, body]) => <article key={title}><strong>{title}</strong><span>{body}</span></article>)}</div></section>;
}

export function AppBanner() {
  return <section className="app-banner"><div className="app-icon">ES</div><div><h2>The Eden Skye App</h2><p>Your agency, in your pocket.</p></div><span>Exclusive Content</span><span>Model Updates</span><span>Early Access</span><span>Direct Connection</span><a href="/pwa-app">Install Now</a></section>;
}

export function MissingAssetNotice({ compact = false }: { compact?: boolean }) {
  if (!missingAssets.length) return null;
  return <aside className={compact ? 'missing-asset compact' : 'missing-asset'}><strong>MISSING_ASSET</strong><span>{missingAssets.map(a => a.label).join(' | ')}</span></aside>;
}

export { heroAsset, models, primaryModel };
