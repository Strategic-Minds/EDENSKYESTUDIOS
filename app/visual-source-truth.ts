export type VisualAsset = {
  id: string;
  kind: 'standalone_asset' | 'reference_board' | 'missing_asset' | 'disqualified_asset';
  label: string;
  src?: string;
  driveFileId?: string;
  source: string;
  allowedUse: string[];
};

export const visualSourceLock = {
  status: 'LOCKED_BY_JEREMY',
  lockedAt: '2026-06-11T23:20:00Z',
  approvalText: 'thats exactly what i want. lock',
  evidenceWorkflow: 'Eden Visual Preview Bridge #33',
  evidenceCommit: 'bf587acddad8d121efee1f8e944239a44e19f157',
  evidenceArtifact: 'eden-visual-preview-evidence',
  artifactDigest: 'sha256:10c5d17b24ef2aae5495c8d65bddfaf395f56ab0bbb1a5f77807adb1e57a21c2',
  rule: 'Render generated standalone source images only; uploaded collage/page boards remain layout references only and must never render as page/model/closet assets.'
} as const;

const cdn = (file: string, version: string) => `https://cdn.shopify.com/s/files/1/0754/8905/0678/files/${file}?v=${version}`;
const generatedSource = 'Generated standalone source image from approved Eden Skye board reference; hosted as Shopify CDN media only, no product/payment activation';

export const standaloneAssets = {
  homeHero: { id: 'generated-home-hero-alexis-neon-es', kind: 'standalone_asset', label: 'Generated standalone home hero model with ES neon background', src: cdn('eden-standalone-home-hero-alexis-neon-es.png', '1781219008'), source: generatedSource, allowedUse: ['home.hero', 'model.profile'] },
  lunaMoretti: { id: 'generated-luna-moretti-card', kind: 'standalone_asset', label: 'Generated standalone Luna Moretti model image', src: cdn('eden-model-luna-moretti-card.png', '1781219024'), source: generatedSource, allowedUse: ['models.grid', 'gallery'] },
  siennaCole: { id: 'generated-sienna-cole-card', kind: 'standalone_asset', label: 'Generated standalone Sienna Cole model image', src: cdn('eden-model-sienna-cole-card.png', '1781219032'), source: generatedSource, allowedUse: ['models.grid', 'gallery'] },
  alexisVoss: { id: 'generated-alexis-voss-profile', kind: 'standalone_asset', label: 'Generated standalone Alexis Voss profile image', src: cdn('eden-model-alexis-voss-profile.png', '1781219041'), source: generatedSource, allowedUse: ['models.grid', 'model.profile', 'gallery'] },
  nataliaVega: { id: 'generated-natalia-vega-card', kind: 'standalone_asset', label: 'Generated standalone Natalia Vega model image', src: cdn('eden-model-natalia-vega-card.png', '1781219049'), source: generatedSource, allowedUse: ['models.grid', 'gallery'] },
  zoeyParker: { id: 'generated-zoey-parker-card', kind: 'standalone_asset', label: 'Generated standalone Zoey Parker model image', src: cdn('eden-model-zoey-parker-card.png', '1781219065'), source: generatedSource, allowedUse: ['models.grid', 'gallery'] },
  ariaReyes: { id: 'generated-aria-reyes-card', kind: 'standalone_asset', label: 'Generated standalone Aria Reyes model image', src: cdn('eden-model-aria-reyes-card.png', '1781219073'), source: generatedSource, allowedUse: ['models.grid', 'gallery'] },
  closetFullBody: { id: 'generated-closet-full-body-alexis', kind: 'standalone_asset', label: 'Generated standalone full-body closet viewer model', src: cdn('eden-closet-full-body-alexis-black-look.png', '1781219081'), source: generatedSource, allowedUse: ['closet.viewer', 'closet.landing'] },
  aiVideo: { id: 'generated-ai-video-chat-still-alexis', kind: 'standalone_asset', label: 'Generated standalone AI video chat still', src: cdn('eden-ai-video-chat-still-alexis.png', '1781219089'), source: generatedSource, allowedUse: ['ai.video'] },
  aiChat: { id: 'generated-ai-chat-portrait-alexis', kind: 'standalone_asset', label: 'Generated standalone AI chat portrait', src: cdn('eden-ai-chat-portrait-alexis-neon.png', '1781219107'), source: generatedSource, allowedUse: ['ai.chat'] },
  pwaHome: { id: 'generated-pwa-mobile-home', kind: 'standalone_asset', label: 'Generated standalone PWA mobile home mockup', src: cdn('eden-pwa-mobile-home-mockup.png', '1781219193'), source: generatedSource, allowedUse: ['pwa.mobile'] },
  pwaNavigation: { id: 'generated-pwa-mobile-navigation', kind: 'standalone_asset', label: 'Generated standalone PWA mobile navigation mockup', src: cdn('eden-pwa-mobile-navigation-mockup.png', '1781219202'), source: generatedSource, allowedUse: ['pwa.mobile'] }
} satisfies Record<string, VisualAsset>;

export const environmentAssets = [
  { key: 'modern-bedroom', label: 'Modern bedroom', src: cdn('eden-env-modern-bedroom.png', '1781219116') },
  { key: 'walk-in-closet', label: 'Walk-in closet', src: cdn('eden-env-walk-in-closet.png', '1781219124') },
  { key: 'penthouse-living-room', label: 'Penthouse living room', src: cdn('eden-env-penthouse-living-room.png', '1781219132') },
  { key: 'beach-villa', label: 'Beach villa', src: cdn('eden-env-beach-villa.png', '1781219185') },
  { key: 'luxury-hotel-suite', label: 'Luxury hotel', src: cdn('eden-env-luxury-hotel-suite.png', '1781219151') },
  { key: 'rooftop-terrace', label: 'Rooftop terrace', src: cdn('eden-env-rooftop-terrace.png', '1781219161') },
  { key: 'photo-studio', label: 'Photo studio', src: cdn('eden-env-photo-studio.png', '1781219169') }
];

export const approvedStandaloneAssets: VisualAsset[] = Object.values(standaloneAssets);

export const disqualifiedAssets: VisualAsset[] = [
  { id: 'disqualified-drive-1I-1CTZ7', kind: 'disqualified_asset', label: 'Drive thumbnail rendered as collage-board visual in browser evidence', driveFileId: '1I-1CTZ7U6ofbJw5YTd4e6jy29XpvxK5u', source: 'Drive candidate rejected after Eden Visual Preview Bridge #3 screenshots', allowedUse: ['DO_NOT_RENDER'] },
  { id: 'disqualified-drive-1eTCl3D6', kind: 'disqualified_asset', label: 'Drive thumbnail rendered as collage-board visual in browser evidence', driveFileId: '1eTCl3D6f1Z9nTLLlBVGjHmEt8CsDwWHW', source: 'Drive candidate rejected after Eden Visual Preview Bridge #3 screenshots', allowedUse: ['DO_NOT_RENDER'] },
  { id: 'disqualified-drive-1hnY2MM1', kind: 'disqualified_asset', label: 'Drive thumbnail rendered as collage-board visual in browser evidence', driveFileId: '1hnY2MM1ATr8kv9QXK9GkVaozflydCyj6', source: 'Drive candidate rejected after Eden Visual Preview Bridge #3 screenshots', allowedUse: ['DO_NOT_RENDER'] },
  { id: 'disqualified-drive-1u0Js75H', kind: 'disqualified_asset', label: 'Drive thumbnail rendered as collage-board visual in browser evidence', driveFileId: '1u0Js75H1MgZJCTCsjL7epJTg1yY7zUll', source: 'Drive candidate rejected after Eden Visual Preview Bridge #3 screenshots', allowedUse: ['DO_NOT_RENDER'] },
  { id: 'disqualified-drive-18lU0MjL', kind: 'disqualified_asset', label: 'Drive thumbnail rendered as collage-board visual in browser evidence', driveFileId: '18lU0MjL7_3EHnXiF8pwBgWM9gicZ4rfm', source: 'Drive candidate rejected after Eden Visual Preview Bridge #3 screenshots', allowedUse: ['DO_NOT_RENDER'] },
  { id: 'disqualified-drive-19DCVCL9', kind: 'disqualified_asset', label: 'Drive thumbnail rendered as collage-board visual in browser evidence', driveFileId: '19DCVCL96tBEzUDSdDw4I1Lb0y3sEXMu8', source: 'Drive candidate rejected after Eden Visual Preview Bridge #3 screenshots', allowedUse: ['DO_NOT_RENDER'] }
];

export const referenceBoards: VisualAsset[] = [
  { id: 'reference-full-system-board', kind: 'reference_board', label: 'Approved 15-screen full site/PWA board', source: 'Uploaded user_files/01-ChatGPT-Image-Jun-11-2026-01_49_09-AM.png', allowedUse: ['layout_reference_only'] },
  { id: 'reference-home-hero-board', kind: 'reference_board', label: 'Approved homepage hero board', source: 'Uploaded user_files/02-ChatGPT-Image-Jun-11-2026-12_22_57-PM.png', allowedUse: ['layout_reference_only'] },
  { id: 'reference-page-collage-board', kind: 'reference_board', label: 'Approved page collage board', source: 'Uploaded user_files/03-ChatGPT-Image-Jun-10-2026-09_01_29-PM-2-.png', allowedUse: ['layout_reference_only'] }
];

export const missingAssets: VisualAsset[] = [];
export const allVisualAssets = [...approvedStandaloneAssets, ...disqualifiedAssets, ...referenceBoards, ...missingAssets];

export const models = [
  { slug: 'luna-moretti', name: 'Luna Moretti', location: 'Miami, FL', tag: 'The Mystery', image: standaloneAssets.lunaMoretti.src },
  { slug: 'sienna-cole', name: 'Sienna Cole', location: 'Los Angeles, CA', tag: 'The Sunshine', image: standaloneAssets.siennaCole.src },
  { slug: 'alexis-voss', name: 'Alexis Voss', location: 'New York, NY', tag: 'Neon flagship', image: standaloneAssets.alexisVoss.src },
  { slug: 'natalia-vega', name: 'Natalia Vega', location: 'Miami, FL', tag: 'The Temptress', image: standaloneAssets.nataliaVega.src },
  { slug: 'zoey-parker', name: 'Zoey Parker', location: 'Los Angeles, CA', tag: 'The Girl Next Door', image: standaloneAssets.zoeyParker.src },
  { slug: 'aria-reyes', name: 'Aria Reyes', location: 'New York, NY', tag: 'The Driver', image: standaloneAssets.ariaReyes.src }
];

export const galleryAssets = [standaloneAssets.alexisVoss, standaloneAssets.homeHero, standaloneAssets.lunaMoretti, standaloneAssets.siennaCole, standaloneAssets.nataliaVega, standaloneAssets.zoeyParker];
export const primaryModel = models[2];
export const heroAsset = standaloneAssets.homeHero;
