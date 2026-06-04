# Workflow Registry

## Purpose
Tracks every AUTO SOCIAL workflow, owner, trigger, status, inputs, outputs, approval gates, and failure behavior.

## Required Fields
- workflow_id
- workflow_name
- owner
- trigger_type
- schedule
- inputs
- outputs
- agents_used
- approval_required
- risk_level
- status
- version
- last_run_at
- failure_mode
- fallback_mode

## Ownership
AUTO_BUILDER governs. EDENSKYESTUDIOS operates. PAOS validates.

## Approval Requirements
Human approval is required for live publishing, Shopify mutations, paid ads, production promotion, persona changes, pricing changes, and destructive actions.

## Future Supabase Table
`auto_social_workflows`

## Future Dashboard Widget
Workflow Registry, Active Workflows, Workflow Health

## Example Record
| workflow_id | workflow_name | trigger_type | status | approval_required |
|---|---|---|---|---|
| wf_content_idea_discovery | Content Idea Discovery | cron/manual | sandbox | false |
