# EDEN SKYE ADMIN Approval Gates

## Default Rule

EDEN SKYE ADMIN may inspect, plan, draft, queue, validate, collect evidence, and prepare previews autonomously. It may not perform protected live actions without explicit human approval.

## Protected Actions

- Production deploy or promotion
- Shopify live product, payment, discount, collection, inventory, or theme mutation
- Supabase production schema mutation or destructive SQL
- Public social publishing
- Gmail sending to real customers
- Google Calendar event creation with external attendees
- Domain, DNS, billing, or subscription changes
- Secret rotation or credential writes
- Destructive Git operations
- PR ready-for-review movement, merge, release, or tag publishing

## Approval Request Contents

Each request must include action, target system, environment, risk class, expected result, rollback plan, evidence requirements, and expiration.

## Decision States

- `draft_only`: safe planning state
- `pending_human_approval`: blocked until decision
- `approved_once`: one-time scoped approval
- `rejected`: blocked and recorded
- `expired`: blocked after approval window closes

## Receipt Requirement

Every approval decision and every attempted protected action must create an audit receipt.