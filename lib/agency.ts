export type AvatarStatus = "concept" | "production" | "launch-ready" | "live";
export type OfferType = "license" | "download" | "service" | "product";

export type AgencyAvatar = {
  slug: string;
  displayName: string;
  agencyRole: string;
  brandLane: string;
  status: AvatarStatus;
  primaryChannels: string[];
  shopifyCollectionHandle: string;
  visualDirection: string;
  voiceDirection: string;
  offerTypes: OfferType[];
};

export const agencyAvatars: AgencyAvatar[] = [
  {
    slug: "eden-skye",
    displayName: "Eden Skye",
    agencyRole: "Founder avatar and premium host",
    brandLane: "luxury AI creator, emotional intelligence, high-trust selling",
    status: "launch-ready",
    primaryChannels: ["Instagram", "TikTok", "Facebook", "Shopify"],
    shopifyCollectionHandle: "eden-skye",
    visualDirection: "cinematic feminine luxury, refined sensual editorial, polished and platform-safe",
    voiceDirection: "warm, composed, intimate, strategic, soft authority",
    offerTypes: ["license", "download", "service", "product"]
  },
  {
    slug: "solara-vane",
    displayName: "Solara Vane",
    agencyRole: "Sales psychology avatar",
    brandLane: "confidence, conversion, founder motivation, launch persuasion",
    status: "production",
    primaryChannels: ["TikTok", "Instagram", "Facebook"],
    shopifyCollectionHandle: "solara-vane",
    visualDirection: "golden editorial lighting, confident luxury business styling, aspirational studio mood",
    voiceDirection: "smooth, direct, motivating, premium sales mentor",
    offerTypes: ["download", "service", "license"]
  },
  {
    slug: "liora-vale",
    displayName: "Liora Vale",
    agencyRole: "Wellness and transformation avatar",
    brandLane: "soft reset, healing, personal reinvention, calm self-belief",
    status: "production",
    primaryChannels: ["Instagram", "TikTok", "Pinterest"],
    shopifyCollectionHandle: "liora-vale",
    visualDirection: "soft luminous interiors, wellness editorial, silk textures, calm luxury",
    voiceDirection: "nurturing, slow, emotionally safe, quietly persuasive",
    offerTypes: ["download", "service", "product"]
  },
  {
    slug: "nova-rain",
    displayName: "Nova Rain",
    agencyRole: "AI fear-to-hope narrator",
    brandLane: "AI disruption, survival, adaptation, future skills",
    status: "production",
    primaryChannels: ["TikTok", "Facebook", "YouTube Shorts"],
    shopifyCollectionHandle: "nova-rain",
    visualDirection: "future noir, clean tech editorial, cool lighting, sharp contrast",
    voiceDirection: "clear, urgent, hopeful, intelligent, controlled intensity",
    offerTypes: ["download", "service", "license"]
  },
  {
    slug: "sera",
    displayName: "Sera",
    agencyRole: "Epoxy design muse",
    brandLane: "epoxy transformation, maker confidence, premium surfaces",
    status: "production",
    primaryChannels: ["Instagram", "TikTok", "Facebook", "Shopify"],
    shopifyCollectionHandle: "sera",
    visualDirection: "high-gloss resin, studio craft luxury, jewel tones, macro product beauty",
    voiceDirection: "elegant, encouraging, tactile, maker-focused",
    offerTypes: ["download", "service", "product"]
  },
  {
    slug: "maya-velvet",
    displayName: "Maya Velvet",
    agencyRole: "Lifestyle commerce avatar",
    brandLane: "aspirational routines, product desire, soft daily upgrades",
    status: "concept",
    primaryChannels: ["Instagram", "TikTok", "Facebook"],
    shopifyCollectionHandle: "maya-velvet",
    visualDirection: "velvet lounge, warm luxury, refined glamour, intimate lifestyle frames",
    voiceDirection: "friendly, magnetic, relaxed, softly seductive but safe",
    offerTypes: ["product", "download", "license"]
  },
  {
    slug: "aria-stone",
    displayName: "Aria Stone",
    agencyRole: "DIY authority avatar",
    brandLane: "hands-on tutorials, tools, practical epoxy education",
    status: "concept",
    primaryChannels: ["TikTok", "Facebook", "YouTube Shorts"],
    shopifyCollectionHandle: "aria-stone",
    visualDirection: "clean workshop, premium tools, practical closeups, bright confident framing",
    voiceDirection: "concise, useful, calm expert, beginner-friendly",
    offerTypes: ["download", "service", "product"]
  },
  {
    slug: "celeste-noir",
    displayName: "Celeste Noir",
    agencyRole: "Luxury nightlife campaign avatar",
    brandLane: "high-status storytelling, desire, premium brand magnetism",
    status: "concept",
    primaryChannels: ["Instagram", "TikTok"],
    shopifyCollectionHandle: "celeste-noir",
    visualDirection: "nightlife editorial, black satin, city lights, cinematic restraint",
    voiceDirection: "low, elegant, mysterious, composed, premium",
    offerTypes: ["license", "download"]
  },
  {
    slug: "isla-glass",
    displayName: "Isla Glass",
    agencyRole: "Product demo and catalog avatar",
    brandLane: "clear product explanation, demos, bundles, Shopify conversion",
    status: "concept",
    primaryChannels: ["Facebook", "Instagram", "Shopify"],
    shopifyCollectionHandle: "isla-glass",
    visualDirection: "bright product studio, glassy surfaces, clean commerce visuals, premium catalog",
    voiceDirection: "clear, warm, practical, trust-building",
    offerTypes: ["product", "service", "download"]
  },
  {
    slug: "ren-voss",
    displayName: "Ren Voss",
    agencyRole: "Operations and agency systems avatar",
    brandLane: "automation, systems, creator workflow, behind-the-scenes authority",
    status: "concept",
    primaryChannels: ["Facebook", "TikTok", "LinkedIn"],
    shopifyCollectionHandle: "ren-voss",
    visualDirection: "modern command center, clean dashboards, premium operator aesthetic",
    voiceDirection: "precise, composed, strategic, systems-minded",
    offerTypes: ["service", "download", "license"]
  }
];

export const agencyWorkstreams = [
  "avatar-production",
  "shopify-offers",
  "media-pipeline",
  "social-distribution",
  "lead-capture",
  "analytics-review",
  "approval-governance"
] as const;

export const agencyOfferMap = [
  {
    type: "license",
    label: "Avatar License",
    description: "Licensed use of a fictional AI avatar identity package, scripts, voice direction, and media guidelines."
  },
  {
    type: "download",
    label: "Digital Download",
    description: "Templates, scripts, prompts, checklists, launch kits, epoxy guides, and brand workbooks."
  },
  {
    type: "service",
    label: "Done-With-You Service",
    description: "Setup, content packaging, media production, Shopify offer buildout, and automation configuration."
  },
  {
    type: "product",
    label: "Physical or Bundle Product",
    description: "Epoxy kits, creator kits, branded bundles, tools, and productized commerce offers."
  }
] as const;
