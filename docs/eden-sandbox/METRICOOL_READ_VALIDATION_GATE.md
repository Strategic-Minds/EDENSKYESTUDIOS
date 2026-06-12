# Metricool Read Validation Gate

Status date: 2026-06-12
Scope: PR #9 Eden sandbox Metricool-only read validation.

## Purpose

This receipt documents the Metricool-only safe read validation gate while keeping Xyla manual/UI-mediated.

## Metricool Operating Rule

Metricool is the active connector path for social scheduling and analytics governance. This gate adds a dedicated validation route at:

`/api/eden-sandbox/metricool-read-validation`

## Safety Controls

The route:

- allows Metricool only;
- uses `GET` only;
- uses the `X-Mc-Auth` header when an approved live read endpoint is configured;
- requires runtime token, blog/brand ID, and user ID before any live read attempt;
- requires `METRICOOL_READ_PROBE_ENABLED=true` before any live read attempt;
- requires an exact configured `METRICOOL_READ_VALIDATION_URL` / `METRICOOL_READ_ENDPOINT_URL` / `METRICOOL_SAFE_READ_URL` before any live read attempt;
- restricts live reads to `app.metricool.com/api`;
- never returns response bodies or secret values;
- never schedules, publishes, updates, deletes, or mutates Metricool data.

## Xyla Operating Rule

Xyla remains `configured_non_api_dependency`. GPT/API access to Xyla is not claimed or attempted.

## Source Note

Metricool help states API calls use the `X-Mc-Auth` header and require `blogId` and `userId` parameters.
