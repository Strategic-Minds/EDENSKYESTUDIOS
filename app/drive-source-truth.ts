export const driveSourceTruth = {
  status: 'DRIVE_DISCOVERED_ALIGNMENT_REQUIRES_FILENAME_NORMALIZATION',
  discoveredAt: '2026-06-12T00:30:00Z',
  discoveryManifest: 'docs/EDEN_DRIVE_DISCOVERY_MANIFEST_2026-06-12.json',
  discoveryNotes: 'docs/EDEN_DRIVE_DISCOVERY_AND_APP_ALIGNMENT_2026-06-12.md',
  canonicalImageManifest: 'docs/EDEN_EXACT_IMAGE_SOURCE_MANIFEST_2026-06-12.json',
  primaryDriveFolder: {
    title: 'EDEN_SKYE_STUDIOS_OS',
    id: '1oCEjD6kUm9FiYDh1w-dNE9PPiggj65MQ'
  },
  renderAuthority: 'The app renders only the locked exact generated standalone image manifest; Drive discovery is an operating-system alignment layer and cannot silently replace render assets.',
  requiredDriveNormalization: 'Rename or copy the 19 verified source PNGs into a canonical Drive folder using the exact filenames from the app image manifest, then add Drive file IDs and checksum evidence.',
  safeguards: [
    'No collage-board image may render as a page background, hero, model card, closet model, environment tile, AI chat portrait, video still, or PWA asset.',
    'No generic Drive thumbnail may render as a production asset.',
    'Reference boards remain layout references only.',
    'Missing standalone Drive filenames are an alignment issue, not permission to crop boards or invent placeholders.'
  ]
} as const;

export type DriveSourceTruth = typeof driveSourceTruth;
