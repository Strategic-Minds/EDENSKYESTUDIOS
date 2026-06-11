# Eden Step 35 Authentication Specification

## Required secret

`EDEN_IMAGE_INSTALL_EXECUTOR_TOKEN` must be configured only in preview/sandbox environments until production release is explicitly approved.

## Request authentication

Custom GPT Actions and agents must call the executor with:

```http
Authorization: Bearer <EDEN_IMAGE_INSTALL_EXECUTOR_TOKEN>
```

The route returns `401` when the token is missing, invalid, or not configured.

## Governance requirements

The executor is not an approval authority. It only enforces approval receipts and image status gates supplied by the canonical manifest/control plane.

Required install gates:

- `public_use: true`
- `drive_use: true`
- `supabase_use: true`
- `approval_receipt_id` present
- every asset status exactly `approved_public`

Blocked statuses:

- `reference_board`
- `temporary_preview`
- `generated_pending_review`
- `rejected`
- `quarantined`
- `missing_asset`

Blocked source kinds:

- `page_board`
- `mockup`
- `temporary_crop`
