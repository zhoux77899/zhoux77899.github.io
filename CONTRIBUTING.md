# Contributing

Use [GitHub Issues](https://github.com/zhoux77899/zhoux77899.github.io/issues)
for bugs, proposed changes, and specifications. Link the relevant issue in your
pull request when one exists.

## Development and validation

Follow the setup in [README.md](README.md). See the
[development guide](docs/development.md) for content, tooling, and illustration
maintenance. For product or visual changes, consult [PRODUCT.md](PRODUCT.md) and
[DESIGN.md](DESIGN.md). Check personal facts and project claims against
[content sources](docs/content-sources.md).

Before submitting code or build changes, run:

```bash
bun install --frozen-lockfile
bun run check
```

For interface changes, check the affected behavior in a browser, including
keyboard navigation, both themes, and reduced motion. Documentation changes
should have valid links and commands that match the repository. Record the
checks you completed and explain any checks you did not run.

## Commit messages

Use this format for every new commit:

```text
type(scope): description

details

Signed-off-by: Your Name <you@example.com>
```

Write commit messages in English. Use a concise, imperative description and
explain the relevant implementation or motivation in the body. Use
`git commit -s` to add the trailer from your configured Git identity.

| Type | Use |
| --- | --- |
| `feat` | Add a feature |
| `fix` | Fix a bug |
| `docs` | Change documentation |
| `style` | Change code formatting without affecting behavior |
| `refactor` | Restructure code without adding a feature or fixing a bug |
| `test` | Add or modify tests |
| `chore` | Change auxiliary tooling without affecting source code or tests |
| `perf` | Improve performance |
| `build` | Change the build system or external dependencies |
| `revert` | Revert a commit |
| `ci` | Change CI configuration or scripts |
| `deps` | Add, update, or remove dependencies |

Use a short scope such as `content`, `ui`, `anatomy`, `hairline`, `docs`, `ci`,
or `deps`. Keep unrelated changes in separate commits.

Example:

```text
fix(ui): restore carousel rotation after pointer cancellation

Release the interrupted pointer state so the idle timer can resume.

Signed-off-by: Jane Doe <jane@example.com>
```

## Pull requests

Use a title in the form `[Type] Description`, for example
`[Docs] Clarify illustration maintenance`. Capitalize the commit type for the
title, using values such as `[Feat]`, `[Fix]`, or `[CI]`.

Fill in [.github/PULL_REQUEST_TEMPLATE.md](.github/PULL_REQUEST_TEMPLATE.md).
Explain the resulting behavior and motivation in Summary. In Test, list the
commands and browser checks actually completed, their results, and reasons for
checks not run. Include screenshots when they help a reviewer assess a visual
change.

## Generated and local files

Build output, dependencies, caches, coverage, local editor state, and temporary
reports stay outside commits. This includes `dist/`, `node_modules/`, `.tools/`,
and `coverage/`. Keep Flawless analysis JSON, generated README outlines,
validation reports, and logs in a task-specific system temporary directory.

Some illustration outputs are intentionally versioned. Changes to Anatomy
sources can require regenerated scene JSON, SVG and HTML previews, and the audit
record under `public/anatomy/`. Hairline figure changes can require matching rest
previews under `public/hairline/`. Regenerate them from their tracked sources and
review the differences alongside the source change. See the development guide
for each workflow.

Before committing, review the staged file list and diff for unintended generated
output, local state, and secrets.
