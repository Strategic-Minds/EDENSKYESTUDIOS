# Eden Skye Blockers and Bridges Matrix

| Blocker | Bridge To Implement |
|---|---|
| GPT cannot push local files directly | GitHub contents/tree bridge plus Auto Builder push packet |
| Vercel cannot run long workers | 5-minute cron trigger with queue/receipt workers |
| Public posting requires approval | Metricool draft-only bridge and approval lock |
| Final media not generated yet | Higgsfield/HeyGen queue execution bridge with retries |
| Drive metadata can drift | Drive upload and metadata receipt bridge |
| Missing visual links | media_assets table plus required visual_url validation |
| Quality may vary | image/video scoring bridge before draft approval |
| Trend data can stale | daily discovery bridge using Semrush, Metricool, platform research, and social search |
| Shopify mutation risk | Shopify approval gate and dry-run packet bridge |
| Production deploy risk | preview-only Vercel workflow and production lock |
| Credential gaps | stack readiness bridge with env checks and redacted receipts |
| Provider failure | fallback provider retry policy and dead-letter queue |
| Analytics feedback missing | Metricool analytics import bridge and winner-clone engine |
| Too many approvals | rule-based approval policy with exception queue |
| International scale | locale/content adaptation bridge with platform-safe review |
| Faceless content need | faceless prompt/template lane and reusable asset packs |