# Eden Skye Studios Autonomy And Gates

## Autonomy Levels

### Level 0 - Read Only

Allowed:

- inspect files
- inspect Drive folders
- summarize context
- identify blockers

### Level 1 - Draft Only

Allowed:

- draft copy
- draft prompts
- draft scripts
- draft plans
- create sandbox packets
- create non-public receipts

### Level 2 - Sandbox Execution

Allowed:

- create private test media
- create local or repo draft artifacts
- queue draft content
- prepare code/migration packets
- run validation checks

### Level 3 - Controlled Mutation

Requires explicit approval.

Examples:

- apply Supabase migration
- change Vercel env
- create/update Shopify product
- create HeyGen avatar
- schedule social post

### Level 4 - Public/Production Action

Requires explicit approval and validation receipt.

Examples:

- production deploy
- public publishing
- live commerce mutation
- paid ad activation
- customer email send

## Default Autonomy

Default to Level 1 or Level 2. Never assume Level 3 or Level 4 without Jeremy's current-session approval.

## Gate Types

### Brand Gate

Checks:

- Eden identity preserved
- fictional AI boundary preserved
- visual tone matches brand lock
- no cheap/spammy/explicit drift

### Safety Gate

Checks:

- no explicit sexual content
- no age ambiguity
- no exploitative framing
- no deception
- no prohibited content

### Media Gate

Checks:

- face continuity
- anatomy quality
- source image provenance
- tool suitability
- output quality
- no text/watermark contamination unless intentional

### Technical Gate

Checks:

- build passes
- typecheck/lint as available
- API routes scoped
- env vars defined
- no secret leakage

### Data Gate

Checks:

- schema changes are approved
- RLS/security considerations documented
- migrations are reversible where possible
- no live data deletion without approval

### Commerce Gate

Checks:

- offer copy approved
- product status safe
- price/discount approved
- checkout path understood

### Public Release Gate

Checks:

- human approval
- asset/source receipt
- platform fit
- compliance review
- rollback path

## Approval Request Format

Every approval request must include:

- action requested
- target system
- why it matters
- exact mutation or public action
- risk level
- rollback plan
- validation already completed
- expected output

## Stop Conditions

Stop and ask for approval when the action touches:

- public audience
- production deployment
- database schema/data mutation
- Vercel environment
- Shopify/storefront
- Stripe/payments
- customer email
- account permissions
- source-of-truth/governance
- deletion or irreversible changes
