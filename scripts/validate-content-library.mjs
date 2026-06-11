import { readFile } from 'node:fs/promises';

const library = JSON.parse(await readFile('docs/content/content-seeds.json', 'utf8'));
const ok =
  library.status === 'DRAFT' &&
  library.human_gate_required === true &&
  library.seeds.length >= 300 &&
  library.seeds.every((seed) =>
    seed.id &&
    seed.category &&
    seed.hook &&
    seed.approval_gate === 'HUMAN_REVIEW_REQUIRED'
  );

console.log(ok ? 'PASS content library' : 'FAIL content library');
process.exit(ok ? 0 : 1);
