export type VisualAsset = {
  id: string;
  kind: 'standalone_asset' | 'reference_board' | 'missing_asset' | 'disqualified_asset';
  label: string;
  src?: string;
  driveFileId?: string;
  source: string;
  allowedUse: string[];
};

export const approvedStandaloneAssets: VisualAsset[] = [];

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

export const missingAssets: VisualAsset[] = [
  { id: 'missing-home-hero-model-neon-es', kind: 'missing_asset', label: 'Standalone home hero model image with ES neon background', source: 'Required by approved homepage board; current Drive candidates rejected as collage-board renderings', allowedUse: ['home.hero'] },
  { id: 'missing-model-grid-card-images', kind: 'missing_asset', label: 'Repo-hosted standalone model card images from approved separated-card source pack', source: 'Uploaded ZIP exists locally but not yet available as repo/public assets through the current connector path', allowedUse: ['models.grid'] },
  { id: 'missing-profile-gallery-images', kind: 'missing_asset', label: 'Standalone Alexis Voss profile hero, gallery, and video stills', source: 'Required by approved profile board; current Drive candidates rejected as collage-board renderings', allowedUse: ['model.profile', 'gallery'] },
  { id: 'missing-closet-bedroom-environment', kind: 'missing_asset', label: 'Standalone bedroom environment image', source: 'Required by approved board 09 but not verified as standalone', allowedUse: ['environment.selector'] },
  { id: 'missing-closet-walk-in-environment', kind: 'missing_asset', label: 'Standalone walk-in closet environment image', source: 'Required by approved board 09 but not verified as standalone', allowedUse: ['environment.selector'] },
  { id: 'missing-full-body-viewer-model', kind: 'missing_asset', label: 'Standalone full-body viewer model image', source: 'Required by approved boards 08, 10, 11 but not verified as standalone', allowedUse: ['closet.viewer'] },
  { id: 'missing-heygen-video-call-still', kind: 'missing_asset', label: 'Standalone AI video chat still', source: 'Required by approved board 12 but not verified as standalone', allowedUse: ['ai.video'] },
  { id: 'missing-mobile-pwa-screens', kind: 'missing_asset', label: 'Standalone mobile PWA screen images', source: 'Required by approved boards 14 and 15 but not verified as standalone', allowedUse: ['pwa.mobile'] }
];

export const allVisualAssets = [...approvedStandaloneAssets, ...disqualifiedAssets, ...referenceBoards, ...missingAssets];

export const models = [
  { slug: 'luna-moretti', name: 'Luna Moretti', location: 'Miami, FL', tag: 'The Mystery', requiredAsset: '01-luna-moretti__full-card__v001.png' },
  { slug: 'sienna-cole', name: 'Sienna Cole', location: 'Los Angeles, CA', tag: 'The Sunshine', requiredAsset: '02-sienna-cole__full-card__v001.png' },
  { slug: 'alexis-voss', name: 'Alexis Voss', location: 'New York, NY', tag: 'Neon flagship', requiredAsset: 'standalone-alexis-voss-profile-hero.png' },
  { slug: 'natalia-vega', name: 'Natalia Vega', location: 'Miami, FL', tag: 'The Temptress', requiredAsset: '03-natalia-vega__full-card__v001.png' },
  { slug: 'zoey-parker', name: 'Zoey Parker', location: 'Los Angeles, CA', tag: 'The Girl Next Door', requiredAsset: '04-zoey-parker__full-card__v001.png' },
  { slug: 'aria-reyes', name: 'Aria Reyes', location: 'New York, NY', tag: 'The Driver', requiredAsset: '05-aria-reyes__full-card__v001.png' }
];

export const primaryModel = models[2];
export const heroAsset = missingAssets[0];
