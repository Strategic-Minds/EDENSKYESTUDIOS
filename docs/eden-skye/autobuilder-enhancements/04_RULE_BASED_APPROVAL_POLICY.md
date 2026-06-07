# Eden Rule-Based Approval Policy

## Goal

Reduce manual review volume while keeping all high-risk actions gated.

## Auto-Approval Eligible

A draft can move to approved-draft status when all are true:

- Brand safety score passes
- Image/video quality score passes
- No explicit unsafe content detected
- Media URL is present
- Platform format is valid
- Caption is non-spammy
- Content category is approved
- Scheduled time matches Metricool best-time data or approved fallback windows

## Human Review Required

- Policy risk
- Low quality score
- Missing visual proof
- New model/persona launch
- High-volume posting rule changes
- Shopify/payment/discount changes
- Production deploy
- Public posting until separately approved

## Default State

Create, store, score, queue, and draft are allowed. Public posting is locked.