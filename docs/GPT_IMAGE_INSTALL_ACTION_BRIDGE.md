# GPT Image Install Action Bridge

Status: preview specification installed
Branch: eden/drive-upload-executor-es001-preview
Owner: Strategic Minds / Eden Skye Studios

## Purpose

This document defines the safe bridge that allows a GPT with Actions or another trusted automation client to send an approved image to the Eden Skye Drive upload executor.

The existing executor endpoint is:

POST /api/bridge/drive-image-upload

The bridge accepts a base64 image payload and canonical asset metadata. The route then uploads the image into Google Drive and writes Supabase records.

## Why Base64 Instead Of Open URL Fetch

The system should not expose a generic server-side image URL fetcher. A generic URL fetcher can become an unsafe open relay. The safe GPT tool path is to send the approved file as base64 directly to the executor.

## Canonical ES001 Payload

{
  "assetId": "ES001-01",
  "modelId": "ES001",
  "modelName": "Eden Skye",
  "shotNumber": 1,
  "shotName": "Close-Up Beauty Portrait",
  "filename": "ESS_EDEN_SKYE_ES001_SHOT01_CLOSE_UP_BEAUTY_PORTRAIT_ULTRA_REAL_2026-06-11.png",
  "mimeType": "image/png",
  "approvalStatus": "approved_locked",
  "qaStatus": "approved",
  "usageBoundary": "private_studio_only",
  "publicUseAllowed": false,
  "targetFolderId": "1oCEjD6kUm9FiYDh1w-dNE9PPiggj65MQ",
  "base64Data": "<BASE64_IMAGE_DATA>"
}

## GPT Action OpenAPI Skeleton

openapi: 3.1.0
info:
  title: Eden Skye Image Install Bridge
  version: 0.1.0
servers:
  - url: https://edenskyestudios-bh5o4qhh5-strategic-minds-advisory.vercel.app
paths:
  /api/bridge/drive-image-upload:
    post:
      operationId: installEdenImageToDrive
      summary: Install an approved Eden Skye image into Google Drive and Supabase
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - assetId
                - filename
                - mimeType
                - base64Data
                - approvalStatus
              properties:
                assetId:
                  type: string
                modelId:
                  type: string
                modelName:
                  type: string
                shotNumber:
                  type: integer
                shotName:
                  type: string
                filename:
                  type: string
                mimeType:
                  type: string
                  enum:
                    - image/png
                    - image/jpeg
                    - image/webp
                approvalStatus:
                  type: string
                  enum:
                    - approved_locked
                qaStatus:
                  type: string
                usageBoundary:
                  type: string
                publicUseAllowed:
                  type: boolean
                targetFolderId:
                  type: string
                base64Data:
                  type: string
      responses:
        '200':
          description: Upload result
        '400':
          description: Missing or invalid payload
        '423':
          description: Approval gate blocked
        '500':
          description: Upload or database write failed

## Validation Gates

Before merge to main, verify:

1. GPT Action can call the preview executor.
2. Drive file is created in the target folder.
3. media_assets row exists.
4. ai_execution_logs row exists.
5. eden_tool_receipts row exists.
6. No public sharing was enabled.
7. publicUseAllowed remains false.

## Current Canonical Folder

EDEN_SKYE_STUDIOS_OS
Folder ID: 1oCEjD6kUm9FiYDh1w-dNE9PPiggj65MQ

## Current Merge Status

Preview only. Do not merge until ES001-01 upload validation succeeds.
