# Custom GPT Action Configuration

## Action name

`Eden Skye Image Install Executor`

## Schema

Use `openapi/eden-image-install-executor.openapi.yaml` after replacing the server URL with the approved preview executor URL.

## Authentication

Authentication type: API key / bearer token.

Header:

```http
Authorization: Bearer <EDEN_IMAGE_INSTALL_EXECUTOR_TOKEN>
```

## GPT instruction guardrail

The GPT must never call install mode for assets unless the canonical manifest status is `approved_public` and an approval receipt is present.

The GPT may call `dry_run` to validate planned actions. The GPT must report blocked assets instead of attempting to bypass status gates.

## Forbidden actions

- Do not upload, move, delete, or overwrite Drive files unless a placement approval is active.
- Do not write Supabase production data unless a separate production migration/install approval is active.
- Do not mark generated images as `approved_public`.
- Do not use page boards, mockups, or temporary crops as final public assets.
