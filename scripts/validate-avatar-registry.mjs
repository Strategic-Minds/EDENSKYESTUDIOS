import { readFile } from 'node:fs/promises';

const registry = JSON.parse(await readFile('docs/avatars/avatar-registry.json', 'utf8'));
const avatars = [...registry.female, ...registry.male];
const ok =
  registry.status === 'DRAFT' &&
  registry.human_gate_required === true &&
  registry.female.length === 20 &&
  registry.male.length === 120 &&
  avatars.every((avatar) =>
    avatar.avatar_id &&
    avatar.name &&
    avatar.approval_status.includes('DRAFT') &&
    avatar.approval_status.includes('HUMAN_REVIEW_REQUIRED') &&
    avatar.production_readiness_status === 'PROMPT_AND_ASSET_DRAFT_ONLY'
  );

console.log(ok ? 'PASS avatar registry' : 'FAIL avatar registry');
process.exit(ok ? 0 : 1);
