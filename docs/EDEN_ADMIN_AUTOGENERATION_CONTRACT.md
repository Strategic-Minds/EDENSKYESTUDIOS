# EDEN SKYE ADMIN Autogeneration Contract

## Purpose

EDEN SKYE ADMIN must regenerate from the unpacked black chat/admin UI source-map manifest and remain a dense backend command center.

## Required Inputs

- `config/eden-skye-admin-chat-ui-source-map.json`
- `docs/EDEN_SKYE_ADMIN_BLACK_CHAT_UI_SOURCE_INTAKE.md`
- `docs/EDEN_SKYE_ADMIN_AUTONOMOUS_BUILDER_PACKET.md`
- `config/eden-skye-admin-bridge-registry.json`
- `config/eden-skye-admin-approval-gates.json`

## Required Style

- black background
- white font
- hot pink / neon accents
- command-center density
- no beige UI
- no generic SaaS homepage
- first screen is the admin dashboard, not marketing

## Required Admin Modules

- Command Center
- Agent Console
- Autonomous Bridge Command Center
- Builder Docs
- Git / Vercel Ops
- Supabase Ops
- Drive OS
- Media Factory
- Social Automation
- Gmail / Calendar Ops
- Approval Gates
- Evidence Center
- Models
- Images
- Quarantine / Recovery

## Required Admin API Surfaces

- readiness
- bridge registry
- approval gates
- evidence
- command queue
- builder docs

## Source Package Patterns To Preserve

- Three-pane chat/tool/editor workspace
- model selector and autonomy controls
- task queue
- bridge registry
- action surfaces
- smoke order
- approval request/poll/resume/fail model
- zero-inference policy posture

## Protected Action Rule

The generated admin must block live mutation by default. Protected commands must return blocked state until explicit human approval is recorded.

## Validation

Fail generation if:

- Admin source-map manifest is missing
- any required admin route is missing
- black style tokens are missing
- protected action gates are disabled
- source package wiring is not visible on `/admin`
- PR movement or production deploy can happen without approval