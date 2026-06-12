# EDEN FULL SITE GENERATOR Source Contract

## Canonical Inputs

1. Visual source truth
   - `docs/EDEN_EXACT_IMAGE_SOURCE_MANIFEST_2026-06-12.json`
   - `app/visual-source-truth.ts`

2. Admin source truth
   - `config/eden-skye-admin-chat-ui-source-map.json`
   - `docs/EDEN_SKYE_ADMIN_BLACK_CHAT_UI_SOURCE_INTAKE.md`
   - `docs/EDEN_SKYE_ADMIN_AUTONOMOUS_BUILDER_PACKET.md`

3. Commerce source truth
   - `docs/EDEN_BLACK_CARD_COMMERCE_GENERATION_CONTRACT.md`
   - `config/eden-full-site-autogeneration-manifest.json`
   - Approval gates in `config/eden-skye-admin-approval-gates.json`

4. Route/page source truth
   - `docs/EDEN_FULL_SITE_PAGE_REGISTRY.md`
   - `docs/EDEN_FULL_SITE_ROUTE_GENERATION_MATRIX.md`

5. Validation source truth
   - `docs/EDEN_FULL_SITE_AUTOGENERATION_VALIDATION_PLAN.md`
   - `config/eden-full-site-validation-matrix.json`

## Source Priority

1. Locked exact standalone image manifest
2. App visual source registry
3. Admin source-map manifest
4. Full-site route/page registry
5. Existing codebase patterns
6. Uploaded page boards as layout reference only

## Forbidden Inputs

- Cropped collage/page-board images as page backgrounds, model cards, hero images, closet models, or environment images.
- Generic placeholder images when a required asset exists in the locked manifest.
- Beige/generic SaaS styling for admin or storefront.
- Live Shopify/payment credentials in committed files.
- Production Supabase mutation as part of generation.

## Generator Output Rule

Generated files must include a receipt stating which source manifest, route registry, and validation matrix were used. The generator must fail if a required page lacks a source asset or approved placeholder policy.