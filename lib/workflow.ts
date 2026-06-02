import { brand, launchPillars } from "./brand";

export const edenLaunchWorkflow = {
  id: "eden-30-day-launch",
  name: "Eden Skye 30 Day Launch Sprint",
  status: "draft-ready",
  objective:
    "Grow the Eden Skye Studios audience through platform-safe content velocity, paid testing, lead capture, and winner cloning.",
  properties: brand.relatedProperties,
  pillars: launchPillars,
  lanes: [
    "drive-intelligence-intake",
    "github-build-packets",
    "supabase-receipts",
    "xyla-content-ingest",
    "metricool-or-native-scheduling",
    "heygen-runway-media-production",
    "shopify-offer-routing",
    "weekly-analytics-review"
  ],
  cadence: {
    daily: [
      "readiness check",
      "content queue refill",
      "one short-form draft per active account",
      "one conversion CTA draft",
      "receipt logging"
    ],
    weekly: [
      "winner review",
      "hook cloning",
      "offer path review",
      "ad test decision",
      "next batch production"
    ]
  },
  approvalRules: [
    "No public publishing without approval.",
    "No Shopify mutation without approval.",
    "No payment or discount change without approval.",
    "No production deploy without approval."
  ]
};
