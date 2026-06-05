# EdenSkyeStudios

Next.js control surface for the Eden Skye Studios brand, Shopify-style storefront, launch workflow, Supabase-backed operating tables, Vercel automation routes, Edens Closet, and Xyla-ready content packets.

This repository is designed to stay governed:

- public publishing requires approval
- Shopify mutations require approval
- payment and discount changes require approval
- live HeyGen/avatar sessions require approval
- production promotion requires approval

## Current Website Scope

The live app is structured as:

- `/` public Eden Skye Studios Shopify-style storefront in the black/champagne Drive mockup direction
- `/login` member login portal preview for model selection and Edens Closet entry
- `/payment` Black Card payment page preview for future Shopify/Stripe checkout wiring
- `/closet` Edens Closet model changing-room and admin control surface
- `/admin/eden` route alias into Edens Closet for the older mockup handoff path
- `/admin` approval/media operations console
- `/api/eden/chat` governed Eden chat runtime
- `/api/closet/session` draft-only Closet session builder
- `/api/xyla/draft` draft-only Xyla video packet builder
- `/api/readiness` readiness and lock status
- `/api/cron/eden-media-preview` Vercel cron readiness trigger

## Strategic Flow

1. Eden Skye Studios presents the public fictional AI luxury creator brand and Black Card commerce path.
2. The payment page previews the Black Card checkout and remains non-live until Shopify/Stripe wiring is approved.
3. The login portal previews member authentication, model choice, and access into Edens Closet.
4. Edens Closet defines model, personality, wardrobe, pose, user profile, and safe boundaries.
5. The Xyla draft API packages hook, spoken line, visual prompt, caption, CTA, and channel variants.
6. GPT image creation can be used for lower-cost still/image drafting.
7. HeyGen is reserved for approved avatar, voice, and presenter-led video production.
8. Facebook, Instagram, X, TikTok, Pinterest, and Snapchat remain draft channels until publishing approval exists.
9. Shopify can be linked as the commerce destination later; the app does not mutate Shopify without approval.

## Bootstrap Scope

The first application foundation includes:

- Next.js App Router template
- premium Eden Skye Studios storefront landing page
- login and payment preview pages
- Edens Closet model and content control room
- health and readiness APIs
- Supabase server client helpers
- launch workflow contract
- draft-only social bridge endpoint
- Vercel cron readiness route
- environment variable contract
- Supabase migration for core operating tables
