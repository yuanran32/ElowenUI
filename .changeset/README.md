# Changesets

Use Changesets to record package-facing changes before merging to the default branch (`master` in this repository).

1. Run `pnpm changeset`.
2. Pick the affected package and bump type.
3. Commit the generated markdown file in `.changeset/`.

The release workflow will open a version PR when pending changesets exist, and
publish to npm when the version PR is merged with a valid `NPM_TOKEN` secret.
