export type VisualAsset = {
  id: string;
  kind: 'standalone_asset' | 'reference_board' | 'missing_asset';
  label: string;
  src?: string;
  driveFileId?: string;
  source: string;
  allowedUse: string[];
};

const driveImage = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w1800`;

export const standaloneAssets: VisualAsset[] = [
  { id: 'standalone-hero-neon-es', kind: 'standalone_asset', label: 'Neon ES model hero source image', driveFileId: '1I-1CTZ7U6ofbJw5YTd4e6jy29XpvxK5u', src: driveImage('1I-1CTZ7U6ofbJw5YTd4e6jy29XpvxK5u'), source: 'Drive: EDEN_SKYE_STOCK_IMAGE_SYSTEM_PACK/01_SOURCE_IMAGES_UPLOADED', allowedUse: ['home.hero', 'model.profile', 'closet.landing'] },
  { id: 'standalone-model-blue', kind: 'standalone_asset', label: 'Blue swimwear model source image', driveFileId: '1eTCl3D6f1Z9nTLLlBVGjHmEt8CsDwWHW', src: driveImage('1eTCl3D6f1Z9nTLLlBVGjHmEt8CsDwWHW'), source: 'Drive: EDEN_SKYE_STOCK_IMAGE_SYSTEM_PACK/01_SOURCE_IMAGES_UPLOADED', allowedUse: ['models.grid', 'gallery'] },
  { id: 'standalone-model-garden', kind: 'standalone_asset', label: 'Outdoor luxury model source image', driveFileId: '1hnY2MM1ATr8kv9QXK9GkVaozflydCyj6', src: driveImage('1hnY2MM1ATr8kv9QXK9GkVaozflydCyj6'), source: 'Drive: EDEN_SKYE_STOCK_IMAGE_SYSTEM_PACK/01_SOURCE_IMAGES_UPLOADED', allowedUse: ['models.grid', 'gallery'] },
  { id: 'standalone-model-rooftop', kind: 'standalone_asset', label: 'Rooftop model source image', driveFileId: '1u0Js75H1MgZJCTCsjL7epJTg1yY7zUll', src: driveImage('1u0Js75H1MgZJCTCsjL7epJTg1yY7zUll'), source: 'Drive: EDEN_SKYE_STOCK_IMAGE_SYSTEM_PACK/01_SOURCE_IMAGES_UPLOADED', allowedUse: ['models.grid', 'environment.rooftop'] },
  { id: 'standalone-model-studio', kind: 'standalone_asset', label: 'Studio model source image', driveFileId: '18lU0MjL7_3EHnXiF8pwBgWM9gicZ4rfm', src: driveImage('18lU0MjL7_3EHnXiF8pwBgWM9gicZ4rfm'), source: 'Drive: EDEN_SKYE_STOCK_IMAGE_SYSTEM_PACK/01_SOURCE_IMAGES_UPLOADED', allowedUse: ['models.grid', 'closet.viewer'] },
  { id: 'standalone-model-pink-light', kind: 'standalone_asset', label: 'Pink rim light model source image', driveFileId: '19DCVCL96tBEzUDSdDw4I1Lb0y3sEXMu8', src: driveImage('19DCVCL96tBEzUDSdDw4I1Lb0y3sEXMu8'), source: 'Drive: EDEN_SKYE_STOCK_IMAGE_SYSTEM_PACK/01_SOURCE_IMAGES_UPLOADED', allowedUse: ['models.grid', 'chat'] }
];

export const referenceBoards: VisualAsset[] = [
  { id: 'reference-full-system-board', kind: 'reference_board', label: 'Approved 15-screen full site/PWA board', source: 'Uploaded user_files/01-ChatGPT-Image-Jun-11-2026-01_49_09-AM.png', allowedUse: ['layout_reference_only'] },
  { id: 'reference-home-hero-board', kind: 'reference_board', label: 'Approved homepage hero board', source: 'Uploaded user_files/02-ChatGPT-Image-Jun-11-2026-12_22_57-PM.png', allowedUse: ['layout_reference_only'] },
  { id: 'reference-page-collage-board', kind: 'reference_board', label: 'Approved page collage board', source: 'Uploaded user_files/03-ChatGPT-Image-Jun-10-2026-09_01_29-PM-2-.png', allowedUse: ['layout_reference_only'] }
];

export const missingAssets: VisualAsset[] = [
  { id: 'missing-closet-bedroom-environment', kind: 'missing_asset', label: 'Standalone bedroom environment image', source: 'Required by approved board 09 but not verified as standalone', allowedUse: ['environment.selector'] },
  { id: 'missing-closet-walk-in-environment', kind: 'missing_asset', label: 'Standalone walk-in closet environment image', source: 'Required by approved board 09 but not verified as standalone', allowedUse: ['environment.selector'] },
  { id: 'missing-full-body-viewer-model', kind: 'missing_asset', label: 'Standalone full-body viewer model image', source: 'Required by approved boards 08, 10, 11 but not verified as standalone', allowedUse: ['closet.viewer'] },
  { id: 'missing-heygen-video-call-still', kind: 'missing_asset', label: 'Standalone AI video chat still', source: 'Required by approved board 12 but not verified as standalone', allowedUse: ['ai.video'] },
  { id: 'missing-mobile-pwa-screens', kind: 'missing_asset', label: 'Standalone mobile PWA screen images', source: 'Required by approved boards 14 and 15 but not verified as standalone', allowedUse: ['pwa.mobile'] }
];

export const allVisualAssets = [...standaloneAssets, ...referenceBoards, ...missingAssets];

export const models = [
  { slug: 'sienna-rose', name: 'Sienna Rose', location: 'Miami, FL', image: standaloneAssets[1].src!, tag: 'Beach lifestyle' },
  { slug: 'luna-skye', name: 'Luna Skye', location: 'Los Angeles, CA', image: standaloneAssets[2].src!, tag: 'Luxury creator' },
  { slug: 'alexis-voss', name: 'Alexis Voss', location: 'New York, NY', image: standaloneAssets[0].src!, tag: 'Neon flagship' },
  { slug: 'claire-montel', name: 'Claire Montel', location: 'Miami, FL', image: standaloneAssets[3].src!, tag: 'Outdoor editorial' },
  { slug: 'natalia-bliss', name: 'Natalia Bliss', location: 'Los Angeles, CA', image: standaloneAssets[4].src!, tag: 'Studio beauty' },
  { slug: 'zoe-saint', name: 'Zoe Saint', location: 'New York, NY', image: standaloneAssets[5].src!, tag: 'Nightlife social' }
];

export const primaryModel = models[2];
export const heroAsset = standaloneAssets[0];
