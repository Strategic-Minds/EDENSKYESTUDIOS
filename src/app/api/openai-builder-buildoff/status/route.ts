import { assertBuildoffGuard, buildoffStatus } from '../../../../lib/openai-builder-buildoff/guard';

const REQUIRED_FLAGS = {
  APPROVAL_REQUIRED: true,
  PRODUCTION_MUTATION: false,
  PUBLISHING_ENABLED: false,
  DEPLOYMENT_ENABLED: false,
  SHOPIFY_MUTATION_ENABLED: false,
  HEYGEN_TRAINING_ENABLED: false,
} as const;

export async function GET() {
  const guard = assertBuildoffGuard();

  return Response.json({
    ...buildoffStatus,
    required_flags: REQUIRED_FLAGS,
    guard,
    live_actions_available: false,
    message: 'OpenAI Builder buildoff status is disabled-by-default and branch-sandbox only.',
  });
}
