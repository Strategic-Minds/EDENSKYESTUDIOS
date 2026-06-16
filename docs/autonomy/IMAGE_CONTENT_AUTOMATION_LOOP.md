# Image And Content Automation Loop

Status: implementation contract
Last updated: 2026-06-16

## Purpose

This loop lets the system auto-generate the rest of the content, prompts, image plans, discovery packets, and production queues without publishing, mutating Shopify, or triggering paid/live provider actions without approval.

## State Machine

```text
draft_generated -> qa_scored -> pending_admin_review -> approved_for_install_packet -> installed_with_receipt
                                    |
                                    -> quarantined
```

## Autonomous Inputs

The system may read:

- Drive canon documents;
- product-builder docs;
- generator specs;
- business, financial, discovery, and 24/7 operations plans;
- approved source-image folders;
- prompt libraries;
- prior receipts;
- GitHub issues and PRs;
- Vercel/readiness dry-run outputs.

## Autonomous Outputs

The system may generate drafts for:

- image prompt queues;
- product copy;
- captions;
- content calendars;
- video/script outlines;
- discovery briefs;
- QA checklists;
- install packets;
- gap reports;
- GitHub issues and draft PRs.

## Required Metadata For Every Generated Item

- item ID;
- timestamp;
- source inputs;
- intended channel;
- prompt or content brief;
- model/provider planned;
- estimated cost class: free, low, medium, high, paid-burst;
- status;
- QA score;
- approval requirement;
- receipt URL or issue/PR URL.

## QA Minimums

Each item must be scored for:

- brand fit;
- factual risk;
- rights/source risk;
- visual quality or copy quality;
- product/offer alignment;
- public-publishing readiness;
- protected-action risk.

Items with uncertain rights, missing source metadata, hallucinated facts, payment/pricing claims, medical/legal/financial claims, or public-publishing risk must be quarantined.

## Approval Gates

The loop may not autonomously perform:

- public posting;
- Shopify product/page/theme mutation;
- production deploy;
- payment/pricing/subscription/discount/checkout change;
- live HeyGen/avatar/video action;
- paid generation burst;
- Supabase production write;
- destructive Drive/GitHub action.

## Install Packet

Approved content must be packaged as an install packet before live use. The packet must include:

- generated asset or copy;
- source metadata;
- QA result;
- approval receipt;
- destination surface;
- rollback/removal plan;
- final install receipt requirement.

## Receipt Requirements

Every loop run writes a receipt to `01_RECURSIVE_COMPLETION_RECEIPTS` or a GitHub issue/PR when Drive storage is unavailable.

The receipt must include accepted risks observed, especially the owner-accepted Drive writer-link posture.

## First Automation Queues

Start with draft-only queues:

1. Daily image prompt queue for Eden Skye Studios brand/product/editorial assets.
2. Daily content calendar queue for social, site, email, and campaign drafts.
3. Weekly discovery brief queue for market, product, and audience research.
4. Weekly product-builder queue for missing product specs, landing copy, and offer packets.

These queues remain draft-only until approval and provider receipts prove safe execution.
