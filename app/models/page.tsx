import { Header, ModelCard, models } from '../components';

const portfolioStats = [
  ['6', 'Portfolio models'],
  ['19', 'Locked image assets'],
  ['0', 'Collage crops'],
  ['Draft', 'Brand booking state']
];

export default function ModelsPage(){return <main className="eden-site"><Header/><section className="page-head"><p className="pink">Model Portfolio Index</p><h1>Our Models</h1><p>Elite digital creator portfolios built from locked standalone Eden Skye source images only. No collage crops, no placeholder model cards.</p><div className="hero-stats">{portfolioStats.map(([value,label])=><span key={label}>{value}<small>{label}</small></span>)}</div></section><section className="models-grid">{models.map(model=><ModelCard key={model.slug} model={model}/>)}</section><section className="ready-panel"><h2>Portfolio-ready creators for premium campaigns</h2><p>Open each model profile for gallery, campaign strengths, measurements, AI video/chat paths, and Black Card access routes.</p><a className="hot-btn" href="/models/alexis-voss/portfolio">View Alexis Portfolio</a></section></main>}
