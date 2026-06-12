# Connector Smoke Env Gate

Status date: 2026-06-12
Scope: PR #9 Eden sandbox preview connector readiness gate.

## Purpose

This receipt exists to trigger and document a branch-safe preview redeploy after the Eden preview/runtime env gate was checked for Xyla and Metricool readiness.

## Required Runtime Signals

The `/api/eden-sandbox/connector-smoke` route must report:

- Shopify: `ready_for_read_only_probe`
- Xyla: `ready_for_read_only_probe`
- Metricool: `ready_for_read_only_probe`

## Accepted Xyla Signals

The preview runtime may satisfy Xyla readiness with any non-empty explicit Xyla alias or any non-empty `XYLA_*` runtime key. The route does not expose secret values.

## Accepted Metricool Signals

The preview runtime may satisfy Metricool readiness with `METRICOOL_BRAND_ID`, `METRICOOL_ACCOUNT_ID`, another brand/account/profile alias, or a non-token `METRICOOL_*` runtime key. The route does not expose secret values.

## Governance

This gate is read-only configuration evidence only. It does not call Xyla, Metricool, Shopify, scheduling, product, checkout, publication, or mutation endpoints.
