# Metricool And Platform Analytics Connection Plan

Status: implementation-ready plan
Date: 2026-06-16

## Objective

Connect social performance data into a repeatable reporting loop without allowing analytics access to imply publish permission.

## Required Sources

Primary:

- Metricool workspace
- native TikTok analytics
- native Instagram analytics
- native Facebook analytics
- native YouTube analytics
- native X analytics where available
- native LinkedIn analytics
- Pinterest analytics
- platform exports or manual CSV import where APIs are unavailable

Secondary:

- Shopify conversion data
- Vercel analytics
- UTM-tagged landing pages
- manual campaign receipts

## KPI Map

Track:

- follower growth velocity
- views
- reach
- impressions
- watch time
- retention
- shares
- saves
- comments
- profile visits
- link clicks
- repeat viewers
- conversions
- revenue or lead events when verified

## Connection States

- `not_connected`
- `placeholder_mapped`
- `read_only_connected`
- `import_ready`
- `reporting_ready`
- `blocked`

## Enterprise Readiness Criteria

Analytics are enterprise-ready when:

- each active account has one primary analytics source
- each active account has one fallback import path
- each KPI has a source and update cadence
- reports separate vanity metrics from trust, authority, and conversion signals
- every reported number has a timestamp and source label

## Safety Rule

Analytics access does not grant posting, replying, messaging, paid promotion, or live account mutation permission.
