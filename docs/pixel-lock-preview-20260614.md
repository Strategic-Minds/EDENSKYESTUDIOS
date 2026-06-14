# Eden Skye Pixel-Lock Preview Branch

This branch was created from `main` for the Eden Skye pixel-lock preview work.

## Current Blocker

The agent workspace can create this GitHub branch through the connector, but cannot push the PNG/static preview assets because:

- local `git clone` / `git push` to GitHub is blocked by the container network (`CONNECT tunnel failed 403`)
- `gh` is not installed
- no local GitHub token is exposed
- the connector text-file path can write UTF-8 files, but the exact pixel preview requires binary PNG assets or very large base64 payloads

## Prepared Local Preview

The working preview package exists in the agent workspace as:

```txt
/workspace/output/eden-skye-vercel-linked-static-preview-payload.zip
```

The exact board image is byte-for-byte identical to the uploaded target image:

```txt
user_files/75-ChatGPT-Image-Jun-14-2026-07_45_13-AM.png
```

## Pixel Lock Values

```css
--board-offset-x: 0px;
--board-offset-y: 0px;
```

Expected 1920x1200 placement:

```txt
x = 192
y = 88
width = 1536
height = 1024
```

## Next Action

Use a normal local clone or GitHub Codespaces with push access, extract the prepared payload, copy the static files into the repo, commit to this branch, and let Vercel create the preview deployment.

Do not regenerate or replace the target image. If alignment is off after deployment, change only `--board-offset-x` and `--board-offset-y`.
