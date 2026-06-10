# EDEN SKYE STUDIOS - PRE-BUILD PROVISIONING PLAN

Branch: feature/eden-skye-automation-v1
Build mode: branch/sandbox only
Builder: Vercel Workflow
Governor: Auto Builder

## System Goal
Create a fully automated, approval-gated digital media company workflow for Eden Skye Studios.

## End-to-End Loop
1. Website intake captures model, creator, brand partner, and contact requests.
2. Supabase stores records and workflow queue items.
3. 5-minute Vercel cron heartbeat checks pending work.
4. Vercel Agents validate source truth, safety, rights, and task routing.
5. AI Gateway routes draft tasks to Groq and validation tasks to OpenAI.
6. Auto Social creates draft-first social content.
7. Google Chat sends approval alerts.
8. Approved items advance to scheduling, Shopify draft, or campaign workflow.
9. Metrics feed the improvement loop.
10. Receipts are written for every run.

## Build Order
1. Env and safety helpers
2. Supabase migrations
3. Health route
4. Intake routes
5. Workflow queue helpers
6. AI Gateway router
7. Vercel Agents
8. Cron route disabled/dry-run first
9. Google Chat notifier
10. Auto Social draft helper
11. Shopify draft-only helper
12. Smoke tests
13. Preview deployment

## Required Gates
- Operator approval before production
- Operator approval before publishing
- Operator approval before Shopify live changes
- Operator approval before customer messages
- Operator approval before payments
- Operator approval before DNS changes
