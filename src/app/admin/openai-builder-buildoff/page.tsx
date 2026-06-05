import { assertBuildoffGuard } from '../../../lib/openai-builder-buildoff/guard';

const REQUIRED_FLAGS = {
  APPROVAL_REQUIRED: true,
  PRODUCTION_MUTATION: false,
  PUBLISHING_ENABLED: false,
  DEPLOYMENT_ENABLED: false,
  SHOPIFY_MUTATION_ENABLED: false,
  HEYGEN_TRAINING_ENABLED: false,
} as const;

export default function OpenAIBuilderBuildoffAdminPage() {
  const guard = assertBuildoffGuard();

  return (
    <main style={{ padding: '32px', fontFamily: 'system-ui, sans-serif', lineHeight: 1.5 }}>
      <h1>OpenAI Builder Buildoff</h1>
      <p>Branch sandbox only. This admin stub is disabled by default and performs no live actions.</p>
      <section>
        <h2>Required Flags</h2>
        <pre>{JSON.stringify(REQUIRED_FLAGS, null, 2)}</pre>
      </section>
      <section>
        <h2>Active Guard</h2>
        <pre>{JSON.stringify(guard, null, 2)}</pre>
      </section>
      <section>
        <h2>Verdict</h2>
        <p>PASS as branch-sandbox candidate. FAIL as production-ready system until checkout, build, preview, and runtime validation pass.</p>
      </section>
    </main>
  );
}
