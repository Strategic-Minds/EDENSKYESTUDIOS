import { Header } from '../components';
import { standaloneAssets } from '../visual-source-truth';

const bridgeStatus = [
  ['Product', 'Eden Skye Black Card', 'Draft/test product spec. Live Shopify product mutation blocked.'],
  ['Price', '$199/month', 'Displayed membership price until approved commerce manifest replaces it.'],
  ['Checkout', 'Draft Shopify bridge', 'No live payment activation. Test-mode route required next.'],
  ['Entitlement', 'Black Card access', 'Dashboard/Closet access must sync from test entitlement before live activation.'],
  ['Gate', 'Human approval required', 'Payment, product, theme, inventory, discount, and live billing changes are protected.']
];

const activationChecklist = [
  'Create Shopify Black Card product in test/draft mode',
  'Configure test variant/product ID environment names only',
  'Add signed webhook test route and reject unsigned payloads',
  'Grant Black Card entitlement only after paid test event',
  'Revoke/downgrade entitlement on refund or cancel event',
  'Run npm test and npm run build',
  'Capture Vercel/Chromium evidence before live approval'
];

export default function ShopifyPage(){return <main className="eden-site"><Header/><section className="checkout-shell"><aside><p className="pink">Shopify Bridge / Draft Safe</p><h2>Eden Skye Black Card</h2><img src={standaloneAssets.homeHero.src} alt="Eden Skye Black Card standalone hero source" style={{height:260,width:'100%',border:'1px solid rgba(255,255,255,.18)',borderRadius:8,margin:'16px 0'}}/><div className="order-line"><span>Black Card Membership</span><strong>$199.00/mo</strong></div><div className="order-line"><span>Closet + AI + VIP</span><strong>Included</strong></div><div className="order-line total"><span>Live payment</span><strong>Locked</strong></div><a className="hot-btn" href="/checkout" style={{width:'100%',marginTop:16}}>Open Draft Checkout</a></aside><section><h1 style={{fontSize:56,lineHeight:1,margin:'0 0 14px',textTransform:'uppercase'}}>Shopify Black Card Control Page</h1><p>This page is the visible Shopify commerce bridge for Eden Skye. It prepares Black Card product, checkout, webhook, and entitlement work in draft/test mode only. It does not activate live payment processing.</p><div style={{display:'grid',gap:12,marginTop:18}}>{bridgeStatus.map(([label,value,body])=><article className="price-card" key={label}><span>{label}</span><h2 style={{fontSize:30}}>{value}</h2><p>{body}</p></article>)}</div><h2>Test-Mode Activation Checklist</h2><ul>{activationChecklist.map(item=><li key={item}>{item}</li>)}</ul><div className="hero-actions"><a className="hot-btn" href="/pricing">Pricing</a><a className="outline-btn" href="/dashboard">Dashboard</a><a className="outline-btn" href="/admin/gates">Approval Gates</a></div><small>Protected action rule: no live Shopify product/payment/theme/discount/inventory mutation without explicit human approval receipt.</small></section></section></main>}
