# Eden Skye Drive Discovery and App Alignment - 2026-06-12

## Status

The app remains locked to `docs/EDEN_EXACT_IMAGE_SOURCE_MANIFEST_2026-06-12.json` as the canonical image source truth for every rebuild.

Drive discovery confirms that the Eden Skye OS structure exists and broadly matches the app surface: source truth, brand pack, model rosters, visual site/PWA, Eden's Closet, image/video factory, stock assets, Shopify feed, Supabase OS, Vercel workflows, GitHub docs, validation reports, release gates, quarantine, and temp folders.

The Drive asset layer is not fully normalized yet. The primary OS folder contains 19 fresh PNGs with generic ChatGPT filenames from June 11, 2026, which likely correspond to the locked standalone generated image set. However, exact Drive filename and hash alignment to the app manifest was not verified through the connector. Until that is normalized, the app must continue to use the locked app manifest and Shopify CDN URLs as the render authority.

## Verified Drive Roots

- `EDEN_SKYE_STUDIOS_OS` - `1oCEjD6kUm9FiYDh1w-dNE9PPiggj65MQ` - primary OS folder.
- `EDEN SKYE STUDIOS` - `1x0SN_li6rBartMQas1X6Sd0QKhF_VITI` - wrapper folder containing the master folder.
- ` MASTER_EDEN_SKYE_STUDIOS` - `1tSnoul0pVmNR2zBa4GL3gXSS9XVoyGvU` - master packet/reference folder.
- `EDEN_SKYE_MVP_SYSTEM_DOWNLOAD (Unzipped Files)` - `1QAinHMcOph6XoqALYmJoCvO7Qf4RTXHC` - legacy MVP download folder.
- `EDEN SKYE MVP SYSTEM` - `1BFrEOn3kkQoVSXpWYyWf5uLJYmY6Dg5C` - legacy MVP container.
- `EDEN SKYE STUDIOS V0` - `1_oW9mJgdm2OD-RWi3URRX4oVkTkOzsQK` - V0 reference folder.

## Verified OS Folder Tree

The primary OS folder includes:

- `00_START_HERE`
- `01_SOURCE_TRUTH_MEMORY`
- `02_BRAND_PACK`
- `03_MODEL_BIBLES_ROSTERS`
- `04_BUSINESS_FINANCE_STRATEGY`
- `05_VISUAL_SITE_PWA`
- `06_EDENS_CLOSET_BLACK_CARD`
- `07_IMAGE_VIDEO_FACTORY`
- `08_STOCK_IMAGE_MODEL_ASSETS`
- `09_SHOPIFY_FEED_SYSTEM`
- `10_XYLA_METRICOOL_AUTOSOCIAL`
- `11_SUPABASE_OS`
- `12_VERCEL_WORKFLOW_CRONS`
- `13_AGENT_MANIFESTS`
- `14_ADMIN_APPROVAL_CONTROL_PLANE`
- `15_GOOGLE_WORKSPACE_SCHEDULES`
- `16_GITHUB_AUTOBUILDER_DOCS`
- `17_TAXONOMIES_INDEXES`
- `18_TEMPLATES`
- `19_RECEIPTS_ROLLBACK_HARDENING`
- `20_INSTALL_BUILD_ORDER`
- `21_EXECUTABLE_GITHUB_PACKAGE`
- `22_ARCHIVE_DUPLICATES_DO_NOT_USE`
- `23_VALIDATION_REPORTS`
- `24_RELEASE_GATES_LOCKED`
- `25_QUARENTINE`
- `26_TEMP FOLDER`

## Verified Source Documents

- `EDEN_SKYE_OS_SOURCE_TRUTH_LOCK.md` confirms visual boards and user-approved chat decisions as source truth, while live secrets, production Shopify configuration, production Supabase tables, and production Vercel routes remain unverified.
- `EDEN_SKYE_OS_FOLDER_TREE.md` matches the discovered OS folder tree.
- `STOCK_IMAGE_MASTER_MANIFEST.csv` contains planned `eden-skye-001` through `eden-skye-080` stock slots, but does not yet contain the exact 19 locked app filenames or hashes.
- `MODEL_IMAGE_REQUIREMENTS.csv` defines identity lock, portfolio portrait, lifestyle, website hero, social, HeyGen, wardrobe-safe, and background-context image classes.
- `Image_File_Naming_Rules.md` requires naming governance, adult-only safety, identity consistency, HeyGen readiness, Supabase asset state, admin approval, quarantine, and regeneration.

## Verified App/Closet/AI Docs

The Visual Site/PWA folder includes specs for homepage, models, model profile, pricing, checkout bridge, dashboard, PWA app, route tree, design tokens, page inventory, and copy bank.

The Eden's Closet folder includes product, Black Card gate, wardrobe lab/customizer, favorites, saved looks, AI chat, video chat, and member/admin experience maps.

The Image/Video Factory folder includes generation, prompt, taxonomy, metadata, QA, safety, regeneration, HeyGen, full-model, storage, and MVP/scale image maps.

## Image Alignment Finding

App source truth is already locked to 19 exact standalone generated PNG files in `docs/EDEN_EXACT_IMAGE_SOURCE_MANIFEST_2026-06-12.json`. Those files include canonical filenames, SHA-256 hashes, Shopify CDN URLs, and allowed-use scopes.

Drive discovery found 19 fresh PNG files in the primary OS root with generic titles such as:

- `ChatGPT Image Jun 11, 2026, 07_48_57 PM (1).png`
- `ChatGPT Image Jun 11, 2026, 07_48_57 PM (2).png`
- `ChatGPT Image Jun 11, 2026, 07_48_58 PM (3).png`
- `ChatGPT Image Jun 11, 2026, 07_49_04 PM (18).png`
- `ChatGPT Image Jun 11, 2026, 07_49_04 PM (19).png`

Exact Drive searches for canonical app filenames did not return matches. Therefore, Drive currently appears to contain the source PNG set by count and timing, but not by canonical filename.

## Required Drive Normalization

Create or rename a canonical Drive image folder so it contains the exact 19 filenames from `docs/EDEN_EXACT_IMAGE_SOURCE_MANIFEST_2026-06-12.json`:

- `eden-standalone-home-hero-alexis-neon-es.png`
- `eden-model-luna-moretti-card.png`
- `eden-model-sienna-cole-card.png`
- `eden-model-alexis-voss-profile.png`
- `eden-model-natalia-vega-card.png`
- `eden-model-zoey-parker-card.png`
- `eden-model-aria-reyes-card.png`
- `eden-closet-full-body-alexis-black-look.png`
- `eden-env-modern-bedroom.png`
- `eden-env-walk-in-closet.png`
- `eden-env-penthouse-living-room.png`
- `eden-env-beach-villa.png`
- `eden-env-luxury-hotel-suite.png`
- `eden-env-rooftop-terrace.png`
- `eden-env-photo-studio.png`
- `eden-ai-video-chat-still-alexis.png`
- `eden-ai-chat-portrait-alexis-neon.png`
- `eden-pwa-mobile-home-mockup.png`
- `eden-pwa-mobile-navigation-mockup.png`

After that, attach Drive file IDs and checksum evidence to `docs/EDEN_DRIVE_DISCOVERY_MANIFEST_2026-06-12.json`.

## App Upgrade Applied

The draft branch now includes `docs/EDEN_DRIVE_DISCOVERY_MANIFEST_2026-06-12.json` as the Drive OS alignment layer. The app continues to use the exact image manifest as render truth. This prevents the system from silently reverting to collage boards, Drive thumbnails, or generic placeholder assets during rebuilds.

## Governance Rule

No page background, model card, closet model, hero image, mobile PWA visual, AI video still, AI chat portrait, or environment tile may use an uploaded collage/page board or a generic Drive thumbnail as a production asset.

Reference boards are allowed only for layout comparison. Standalone images in the exact app image manifest are the render source truth.
