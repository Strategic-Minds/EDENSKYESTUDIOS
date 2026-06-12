# Connector Smoke Env Gate

Status date: 2026-06-12
Scope: PR #9 Eden sandbox preview connector readiness gate.

## Purpose

This receipt documents the branch-safe preview redeploy after the Eden preview/runtime env gate was checked for Xyla and Metricool readiness.

## Required Runtime Signals

The `/api/eden-sandbox/connector-smoke` route must report:

- Shopify: `ready_for_read_only_probe`
- Xyla: `configured_non_api_dependency`
- Metricool: `ready_for_read_only_probe`

## Xyla Operating Rule

Xyla is not treated as a GPT/API connector in this preview. GPT cannot directly reach Xyla here, and this system should not claim Xyla API execution.

The preview runtime may satisfy Xyla dependency readiness with any non-empty explicit Xyla alias or any non-empty `XYLA_*` runtime key. The route does not expose secret values, call Xyla, or mutate Shopify.

## Metricool Operating Rule

Metricool is already configured and remains the active read-only social scheduling/analytics connector path.

The preview runtime may satisfy Metricool readiness with `METRICOOL_BRAND_ID`, `METRICOOL_ACCOUNT_ID`, another brand/account/profile alias, or a non-token `METRICOOL_*` runtime key. The route does not expose secret values.

## Governance

This gate is configuration evidence only. It does not call Xyla, Metricool, Shopify, scheduling, product, checkout, publication, or mutation endpoints.
