export const BUILDOFF_GUARD = {
  APPROVAL_REQUIRED: true,
  PRODUCTION_MUTATION: false,
  PUBLISHING_ENABLED: false,
  DEPLOYMENT_ENABLED: false,
  SHOPIFY_MUTATION_ENABLED: false,
  HEYGEN_TRAINING_ENABLED: false,
} as const;

export type BuildoffGuard = typeof BUILDOFF_GUARD;

export function assertBuildoffGuard() {
  if (
    BUILDOFF_GUARD.APPROVAL_REQUIRED !== true ||
    BUILDOFF_GUARD.PRODUCTION_MUTATION !== false ||
    BUILDOFF_GUARD.PUBLISHING_ENABLED !== false ||
    BUILDOFF_GUARD.DEPLOYMENT_ENABLED !== false ||
    BUILDOFF_GUARD.SHOPIFY_MUTATION_ENABLED !== false ||
    BUILDOFF_GUARD.HEYGEN_TRAINING_ENABLED !== false
  ) {
    throw new Error('OpenAI Builder buildoff guard is unsafe. Refusing execution.');
  }

  return BUILDOFF_GUARD;
}

export const buildoffStatus = {
  ok: true,
  mode: 'branch_sandbox_only',
  branch: 'openai-builder/buildoff-autobuilder-eden-20260605',
  verdict: 'candidate_pending_runtime_validation',
  guard: BUILDOFF_GUARD,
};
