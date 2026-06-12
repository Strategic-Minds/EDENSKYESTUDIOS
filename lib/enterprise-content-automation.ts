import { persistToolReceipt } from "./receipt-persistence";

export const enterpriseAutomationVersion = "2026-06-05.enterprise-content-v1";

export const driveSourceTruth = [
  { title: "LOCKED BRAND SOURCE OF TRUTH - Eden Skye Studios", id: "11WQzdko5rDQKYADBx5xHev2-rdS_6Mvh2cbMIZWb2Ow", status: "verified" },
  { title: "ESS ASSET MANIFEST", id: "1w4TBQGrQN0fRg8u669PzCPN-A1yrYpqNq5L8tFtvpT0", status: "verified" },
  { title: "Eden Skye Studios Content Model Market System", id: "1vS_BwPO0W5hum2496thT1mkbD3uJ20DADGPVHTQ8g4s", status: "verified" },
  { title: "CONTENT DISCOVERY PROMPT", id: "1yN5zVVA4-4x4zx6GD-fIou-BEKO8IgBObmJjqGBmEOA", status: "verified" },
  { title: "Eden Skye Phase 2 Metrics Dashboard", id: "18QHgpUpr3FzgBeu_-uIbznyaKJuuTHFb5CGEFExpkwA", status: "verified" },
  { title: "Eden Skye Studios Expanded Model Roster", id: "1jM8q44pkf9Gzo8KuOl2L6cUYPHnpgvbkp09ivvMjvgc", status: "verified" },
  { title: "Eden Skye Studios - New Model Stock Image Batch 01", id: "1DCTfc1jvZs_7G_Lqjj50jbx06V7CvuU0PYM4cqm6DzI", status: "verified" }
];

export const approvalGates = {
  live_mutations_enabled: false,
  public_publishing_enabled: false,
  shopify_mutations_enabled: false,
  supabase_production_migrations_enabled: false,
  payment_discount_changes_enabled: false,
  n8n_live_activation_enabled: false,
  watermark_required_for_public_images: true,
  model_avatar_approval_required: true,
  media_rights_required: true
};

export const contentModels = ["eden-skye", "solara-vane", "liora-vale", "nova-rain", "celeste-noir"];
export const contentAccounts = ["instagram", "tiktok", "youtube-shorts", "facebook", "pinterest"];
export const contentPillars = [
  "luxury-ai-identity",
  "creator-commerce",
  "behind-the-scenes-studio",
  "ai-avatar-education",
  "faceless-growth-systems",
  "workflow-reveal",
  "brand-trust-and-disclosure",
  "black-card-membership",
  "digital-products-and-licenses",
  "editorial-lifestyle"
];
export const discoverySources = [
  "Drive source truth",
  "Auto Builder repo receipts",
  "Google Search",
  "Google Trends",
  "Reddit public communities",
  "YouTube",
  "TikTok public trend observation",
  "Instagram public trend observation",
  "Pinterest",
  "LinkedIn",
  "Quora",
  "news and creator economy reports",
  "competitor websites",
  "platform policy pages"
];

export const scoringWeights = {
  virality: 0.15,
  engagement: 0.15,
  curiosity: 0.1,
  monetization: 0.15,
  authority_building: 0.1,
  ease_of_creation: 0.1,
  brand_safety: 0.1,
  proof_availability: 0.05,
  repurposing_potential: 0.05,
  funnel_value: 0.05
};

type ScoreMap = Record<keyof typeof scoringWeights, number>;

export function weightedScore(scores: ScoreMap) {
  return Number(Object.entries(scoringWeights).reduce((sum, [key, weight]) => sum + scores[key as keyof ScoreMap] * weight, 0).toFixed(2));
}

export function cronAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export function buildTrendSignals() {
  return [
    ["ai-avatar-reveals", "AI avatar reveal and synthetic identity education"],
    ["faceless-creator-systems", "Faceless content systems and operating dashboards"],
    ["ai-ugc-studios", "AI UGC, spokesperson, and brand video pipelines"],
    ["workflow-transparency", "Behind-the-scenes automation and trust-building"],
    ["creator-commerce-funnels", "Content-to-offer paths, downloads, memberships, and licenses"],
    ["synthetic-media-disclosure", "Platform-safe disclosure and audience trust"],
    ["model-agency-automation", "Multi-model content operations and model registries"],
    ["black-card-membership", "Premium gated membership and studio access"]
  ].map(([topic_id, title], index) => {
    const scores: ScoreMap = {
      virality: 8 - (index % 3),
      engagement: 8,
      curiosity: 9 - (index % 2),
      monetization: 7 + (index % 3),
      authority_building: 8,
      ease_of_creation: 7,
      brand_safety: 9,
      proof_availability: 6,
      repurposing_potential: 9,
      funnel_value: 8
    };
    return {
      topic_id,
      title,
      source_status: "requires_live_research_refresh",
      evidence_required: true,
      search_queries: [`${title} examples`, `${title} questions`, `${title} trends`, `site:reddit.com ${title}`, `site:youtube.com ${title}`],
      scores,
      weighted_score: weightedScore(scores)
    };
  });
}

export function buildContentPlan({ days = 360, postsPerDay = 3, sampleDays = 30 } = {}) {
  const plan = [];
  const start = new Date("2026-06-06T09:00:00.000Z");
  const visibleDays = Math.min(sampleDays, Math.max(1, days));
  for (let day = 0; day < visibleDays; day += 1) {
    for (let slot = 0; slot < postsPerDay; slot += 1) {
      const date = new Date(start);
      date.setUTCDate(start.getUTCDate() + day);
      date.setUTCHours([14, 19, 1][slot] ?? 14, 0, 0, 0);
      const scores: ScoreMap = {
        virality: 8,
        engagement: 8,
        curiosity: 8,
        monetization: slot === 2 ? 8 : 7,
        authority_building: 8,
        ease_of_creation: 7,
        brand_safety: 9,
        proof_availability: 6,
        repurposing_potential: 9,
        funnel_value: 8
      };
      plan.push({
        plan_id: `ess-2026-d${String(day + 1).padStart(3, "0")}-p${slot + 1}`,
        day: day + 1,
        scheduled_at_utc: date.toISOString(),
        account: contentAccounts[(day + slot) % contentAccounts.length],
        model: contentModels[(day + slot) % contentModels.length],
        pillar: contentPillars[(day * postsPerDay + slot) % contentPillars.length],
        post_type: ["short-video", "carousel", "image-story"][slot] ?? "short-video",
        hook: [
          "I built the studio system behind a fictional AI luxury creator.",
          "The difference between random AI content and a real creator operating system.",
          "What has to be gated before an AI model can publish safely."
        ][slot],
        caption_brief: "Premium, transparent, platform-safe Eden Skye Studios post designed to build trust, curiosity, clicks, follows, and offer awareness.",
        cta: ["Follow the build", "Enter the studio list", "Review the Black Card waitlist"][slot],
        hashtags: ["#EdenSkyeStudios", "#AICreator", "#VirtualInfluencer", "#CreatorEconomy", "#AIWorkflow"],
        visual_brief: "Black, ivory, champagne neutral luxury editorial visual; watermark required before public use.",
        media_source_priority: ["Drive approved asset", "existing generated asset", "new generated image prompt"],
        approval_status: "draft_requires_human_approval",
        watermark_status: "required_before_public_use",
        performance_hypothesis: "High curiosity plus transparent AI disclosure should improve saves, follows, and profile clicks.",
        scores,
        weighted_score: weightedScore(scores)
      });
    }
  }
  return {
    total_days: Math.max(1, days),
    posts_per_day: postsPerDay,
    accounts: contentAccounts,
    models: contentModels,
    projected_full_queue_count: Math.max(1, days) * postsPerDay * contentAccounts.length * contentModels.length,
    materialized_sample_count: plan.length,
    materialized_sample_days: visibleDays,
    plan
  };
}

export function buildMediaTasks(limit = 25) {
  return buildContentPlan({ days: 30, postsPerDay: 3, sampleDays: 10 }).plan.slice(0, limit).map((post) => ({
    task_id: `media-${post.plan_id}`,
    post_id: post.plan_id,
    model: post.model,
    required_asset_type: post.post_type === "short-video" ? "video_or_avatar_clip" : "image_or_carousel",
    source_order: ["Drive asset manifest", "stock image batch", "Runway/imagegen prompt", "HeyGen avatar video"],
    prompt: "Create a premium, cinematic, non-explicit Eden Skye Studios visual with black, ivory, and champagne styling, fictional AI disclosure fit, and space for watermark.",
    watermark_required: true,
    rights_status: "requires_source_receipt",
    approval_status: "draft"
  }));
}

export function buildScheduleDrafts(limit = 25) {
  return buildContentPlan({ days: 30, postsPerDay: 3, sampleDays: 10 }).plan.slice(0, limit).map((post) => ({
    draft_id: `schedule-${post.plan_id}`,
    post_id: post.plan_id,
    account: post.account,
    scheduled_at_utc: post.scheduled_at_utc,
    publishing_status: "draft_only_not_public",
    scheduler_target: "Metricool/SocialHub/n8n draft queue",
    approval_required: true
  }));
}

export function buildAnalyticsReview() {
  return {
    metrics: ["impressions", "reach", "likes", "comments", "saves", "shares", "profile_visits", "follows", "link_clicks", "email_signups", "offer_clicks"],
    dimensions: ["account", "model", "pillar", "hook", "hashtag_set", "post_type", "posting_time", "cta", "asset_source"],
    rules: [
      "clone posts with top 20 percent save rate",
      "rewrite hooks under median watch-through",
      "pause hashtag sets with low reach after three tests",
      "move high-click CTAs into more posts",
      "route weak model/avatar continuity to visual QA"
    ],
    follower_growth_target: {
      target: "10000_followers_per_month",
      expectation: "aspirational_not_guaranteed",
      control_loop: "test_measure_clone_or_adjust"
    }
  };
}

export async function enterpriseCronResponse(cronName: string, payload: Record<string, unknown>) {
  const receipt = {
    receipt_id: `${cronName}-${new Date().toISOString().slice(0, 10)}`,
    tool_name: cronName,
    action_type: "enterprise_content_automation",
    status: "SANDBOX_CRON_RECEIPT_READY",
    payload: {
      version: enterpriseAutomationVersion,
      live_mutations_enabled: false,
      public_publishing_enabled: false,
      checked_at: new Date().toISOString(),
      ...payload
    }
  };
  const persistence = await persistToolReceipt(receipt);
  return { receipt, persistence };
}
