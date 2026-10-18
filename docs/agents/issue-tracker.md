# Issue tracker

Issues and specifications live in GitHub Issues for
`zhoux77899/zhoux77899.github.io`.

Use the `gh` CLI from the repository root. If CLI authentication is
unavailable, use an authenticated GitHub connector for supported operations.

- Read: `gh issue view <number> --json number,title,body,labels,comments`.
- List: `gh issue list --state open`.
- Create: `gh issue create --title "..." --body-file <file>`.
- Comment: `gh issue comment <number> --body-file <file>`.
- Update labels: `gh issue edit <number> --add-label "..."`.
- Close: `gh issue close <number>`.

Use UTF-8 files for multiline bodies. Reference related issues and record
the validation actually completed.

When a skill says to publish to the issue tracker, create a GitHub issue.
When it asks for a relevant ticket, read the corresponding GitHub issue.

## Pull requests as a triage surface

PRs as a request surface: no.
