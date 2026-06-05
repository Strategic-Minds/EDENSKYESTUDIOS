# VERCEL_RUNTIME_CONTRACT

## Purpose
Defines Vercel as runtime, API, webhook, cron, and governance execution layer.

## Runtime Responsibilities
- API routes
- webhook endpoints
- cron endpoints
- workflow orchestration helpers
- approval endpoints
- readiness endpoints

## Required Routes (Scaffold)
/app/api/triggers/*
/app/api/cron/*
/app/api/admin/*
/app/api/readiness/*

## Required Rules
- no secret exposure
- environment variable validation
- audit logging for state changes
- approval enforcement before writes

## Gate
Scaffold creation allowed. Deployments require explicit approval.
