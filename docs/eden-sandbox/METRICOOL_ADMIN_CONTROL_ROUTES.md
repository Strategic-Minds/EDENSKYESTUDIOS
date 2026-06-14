# Metricool Admin Control Routes

## Status

Added to draft branch `auto-builder/eden-visual-admin-sandbox-20260612` for the Eden Skye admin/content-machine workflow.

## Routes

- `GET /api/admin/metricool/status`
- `POST /api/admin/metricool/read-probe`
- `POST /api/admin/metricool/preview-schedule`
- `POST /api/admin/metricool/schedule-approved`

## Governance

- `status` never calls Metricool and never exposes secret values.
- `read-probe` delegates to the existing GET-only safe read validation helper.
- `preview-schedule` builds a payload preview only and never calls Metricool.
- `schedule-approved` remains locked unless all of the following are true:
  - Metricool API key, brand/blog ID, and user ID are present.
  - `METRICOOL_SCHEDULE_URL` is configured to an allowed `app.metricool.com/api` endpoint.
  - `METRICOOL_SCHEDULE_WRITE_ENABLED=true`.
  - Request body includes the configured one-test approval phrase, defaulting to `APPROVE METRICOOL SINGLE TEST`.
- Bulk posting remains locked.
- Response bodies from Metricool are not captured.
- Secrets are never returned.

## Admin Display Target

The admin can show:

```txt
Metricool: Connected
Read Probe: Passed after the safe read-probe returns read_only_probe_passed
Scheduling: Locked until first approved test
Bulk Posting: Locked
```

## Next Validation

1. Confirm `METRICOOL_USER_ID` is visible in the Vercel preview runtime.
2. Configure an exact safe read endpoint as `METRICOOL_READ_VALIDATION_URL`.
3. Set `METRICOOL_READ_PROBE_ENABLED=true` for the preview read probe.
4. Call `POST /api/admin/metricool/read-probe`.
5. Only after read success, configure a one-post schedule endpoint and run a single approved test.
