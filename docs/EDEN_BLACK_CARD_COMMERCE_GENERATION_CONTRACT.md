# EDEN BLACK CARD Commerce Generation Contract

## Purpose

Generate a complete Black Card membership commerce path while keeping live Shopify/payment activation approval-gated.

## Required Public Flow

- `/pricing`: four plans with Black Card highlighted.
- `/checkout`: draft-safe Shopify bridge checkout layout.
- `/payment`: test-mode payment status and approval-gated live activation warning.
- `/success`: test-mode success confirmation and entitlement handoff.
- `/dashboard`: Black Card membership state from entitlement source or draft fixture.

## Required Black Card Product Spec

- Product name: Eden Skye Black Card
- Display price: $199/month unless replaced by approved commerce manifest.
- Access: Eden's Closet, AI Video Chat, AI Chat, VIP content, custom content request path, priority support, early access.

## Required Test-Mode Backend Flow

Generate draft/test-safe routes and fixtures for:

- checkout session request
- payment status read
- webhook signature validation fixture
- entitlement sync fixture
- dashboard entitlement read
- failed/cancelled payment handling
- refund/cancel entitlement downgrade path

## Live Shopify Rule

The generator must not create live Shopify products, activate payments, publish theme changes, mutate inventory, create discounts, or enable real billing unless a human approval receipt exists.

## Required Environment Variables

Use names only in committed code/docs. Do not commit secret values.

- `SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- `SHOPIFY_ADMIN_ACCESS_TOKEN`
- `SHOPIFY_WEBHOOK_SECRET`
- `SHOPIFY_BLACK_CARD_PRODUCT_ID`
- `SHOPIFY_BLACK_CARD_VARIANT_ID`
- `BLACK_CARD_TEST_MODE`

## Required Tests

- Black Card plan exists on `/pricing`.
- `/checkout` does not activate live payment by default.
- protected payment commands are blocked by admin command queue.
- webhook route rejects unsigned payloads.
- test paid event grants Black Card entitlement.
- failed/cancelled event does not grant entitlement.
- dashboard membership cannot be only hardcoded in production mode.

## Live Activation Checklist

Before live activation:

1. Test checkout passes.
2. Webhook signature verification passes.
3. Entitlement sync passes.
4. Refund/cancel flow passes.
5. `npm test` passes.
6. `npm run build` passes.
7. Browser evidence captured.
8. Human approval receipt exists for live Shopify payment activation.