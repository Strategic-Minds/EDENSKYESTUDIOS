import { assertBuildoffGuard } from '../../../../lib/openai-builder-buildoff/guard';

const REQUIRED_FLAGS = {
  APPROVAL_REQUIRED: true,
  PRODUCTION_MUTATION: false,
  PUBLISHING_ENABLED: false,
  DEPLOYMENT_ENABLED: false,
  SHOPIFY_MUTATION_ENABLED: false,
  HEYGEN_TRAINING_ENABLED: false,
} as const;

export async function POST(request: Request) {
  const guard = assertBuildoffGuard();
  const body = await request.json().catch(() => ({}));

  return Response.json({
    ok: true,
    mode: 'branch_sandbox_only',
    validation_requested: body,
    required_flags: REQUIRED_FLAGS,
    guard,
    production_mutation_performed: false,
    publishing_performed: false,
    deployment_performed: false,
    shopify_mutation_performed: false,
    heygen_training_performed: false,
    result: 'accepted_as_dry_run_only',
  });
}
