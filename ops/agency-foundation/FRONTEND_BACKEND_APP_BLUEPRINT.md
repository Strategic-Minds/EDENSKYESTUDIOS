# Frontend, Backend, And App Blueprint

## Objective

Create a usable control surface for Eden Skye Studios as an AI modeling agency and content business.

## Public Frontend

Pages:

1. Home
2. About Eden Skye Studios
3. AI Model Roster
4. Services
5. Digital Products / Downloads
6. Licensing
7. Apps / Tools
8. Content Studio
9. Contact / Inquiry
10. Lead Capture

## Public Page Purpose

### Home

Premium introduction, brand promise, model roster preview, offer path.

### AI Model Roster

Displays fictional adult AI models, niches, licensing status, and campaign uses.

### Services

Explains done-for-you content, avatar setup, content factory setup, Shopify launch support.

### Digital Products

Prompt vaults, templates, content calendars, starter kits, downloads.

### Licensing

Inquiry-based licensing for model imagery, video assets, and persona usage.

### Apps / Tools

Future tools: prompt generator, avatar readiness checker, brand bible generator, content planner.

## Admin Console

Panels:

1. System readiness
2. Model roster readiness
3. F01 Eden source image status
4. Missing image packs
5. Media job queue
6. Content queue
7. Approval queue
8. Product/service roadmap
9. Licensing inquiries
10. Tool receipts
11. Analytics/winner review
12. Next recommended action

## Backend APIs

Recommended APIs:

- `/api/health`
- `/api/readiness`
- `/api/models`
- `/api/models/[id]`
- `/api/avatar-assets`
- `/api/media-jobs`
- `/api/content-queue`
- `/api/approvals`
- `/api/tool-receipts`
- `/api/licensing-inquiries`
- `/api/products/downloads`
- `/api/cron/readiness`
- `/api/cron/content-draft`
- `/api/cron/analytics-review`

## App Roadmap

### Internal App v1

- model roster dashboard
- source image tracker
- approval queue
- media job packets
- receipt log

### Customer App v1

- lead capture
- prompt sampler
- avatar readiness checklist
- licensing inquiry form

### Paid App v1

- AI model brand bible generator
- prompt vault access
- content calendar generator
- avatar production packet builder

## Data Requirements

- model roster
- source images
- media assets
- content queue
- approvals
- receipts
- leads
- licensing inquiries
- products/downloads
- analytics

## UX Principles

Public frontend:

- premium, cinematic, clean, high-trust
- model imagery front and center
- clear fictional AI boundary
- soft-sell commerce path

Admin frontend:

- dense and scannable
- status-first
- approval-first
- no hidden risky action buttons
- receipt links visible

## Build Priority

1. Admin readiness + model roster dashboard
2. Avatar image pack tracker
3. Approval queue
4. Public model roster page
5. Product/download pages
6. Licensing inquiry page
7. Content queue and analytics panels
