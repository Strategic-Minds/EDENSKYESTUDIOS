const requiredServerEnv = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "CRON_SECRET"] as const;

const optionalAutomationEnv = [
  "GOOGLE_DRIVE_FOLDER_ID",
  "GITHUB_OWNER",
  "GITHUB_REPO",
  "VERCEL_PROJECT_ID",
  "VERCEL_TEAM_ID",
  "SHOPIFY_STORE_DOMAIN",
  "SHOPIFY_ADMIN_ACCESS_TOKEN",
  "XYLA_API_URL",
  "XYLA_API_TOKEN",
  "METRICOOL_API_URL",
  "METRICOOL_API_TOKEN",
  "HEYGEN_API_KEY",
  "RUNWAY_API_KEY"
] as const;

export function getRuntimeReadiness() {
  const required = requiredServerEnv.map((key) => ({ key, present: Boolean(process.env[key]) }));
  const optional = optionalAutomationEnv.map((key) => ({ key, present: Boolean(process.env[key]) }));

  return {
    ok: required.every((item) => item.present),
    required,
    optional,
    missingRequired: required.filter((item) => !item.present).map((item) => item.key),
    missingOptional: optional.filter((item) => !item.present).map((item) => item.key)
  };
}
