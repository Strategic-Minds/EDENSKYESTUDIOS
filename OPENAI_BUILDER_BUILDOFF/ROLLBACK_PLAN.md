# Rollback Plan

## VERIFIED
- Changes are branch-contained under `openai-builder/buildoff-autobuilder-eden-20260605`.
- Main was not intentionally mutated.
- No deployment or external production mutation was performed.
- Files added under `/OPENAI_BUILDER_BUILDOFF/` and disabled stubs under `src/*` are non-production artifacts.

## INFERRED
- Rollback can be handled by deleting the branch or reverting the branch commits.
- Since no live systems were changed, rollback does not require production database, Vercel, Shopify, Drive, HeyGen, email/SMS, or billing recovery.

## COULD NOT VERIFY
- Whether any CI automation starts automatically on branch creation in the repo.
- Whether GitHub branch protection or automations create secondary effects outside this branch.

## BLOCKERS
- Local git checkout unavailable in this run.
- Connector write flow created multiple file commits rather than one local squashed commit.

## WORKAROUNDS
- Use GitHub UI/CLI from a normal environment to revert or delete branch if needed.
- Do not merge or deploy this branch until validation passes.

## NEXT ACTIONS
1. If rollback is needed, delete the branch before PR/merge.
2. If a PR exists later, close it and delete branch.
3. If files need partial rollback, revert branch commits or remove `/OPENAI_BUILDER_BUILDOFF/` and `src/*openai-builder-buildoff*` files.

## Rollback Commands For A Normal Git Environment

```bash
git fetch origin
git switch main
git branch -D openai-builder/buildoff-autobuilder-eden-20260605 2>/dev/null || true
git push origin --delete openai-builder/buildoff-autobuilder-eden-20260605
```

## Partial Cleanup Command

```bash
git fetch origin
git switch openai-builder/buildoff-autobuilder-eden-20260605
git rm -r OPENAI_BUILDER_BUILDOFF src/app/api/openai-builder-buildoff src/app/admin/openai-builder-buildoff src/lib/openai-builder-buildoff
git commit -m "Remove OpenAI builder buildoff sandbox artifacts"
git push origin openai-builder/buildoff-autobuilder-eden-20260605
```

## Production Recovery
No production recovery is expected because this branch did not deploy, apply migrations, edit env vars, alter Drive canon, mutate Shopify, train HeyGen, publish, send messages, or spend money.
