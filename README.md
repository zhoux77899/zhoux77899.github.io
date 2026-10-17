# zhoux77899 Portfolio

Personal website for zhoux77899, with open-source projects, research publications, background, and travel impressions. An interactive exploration case connects the sections, six projects share a looping gallery, and Hairline drawings depict New Zealand, Japan, and China.

[Visit the website](https://zhoux77899.github.io/)

The site uses React, TypeScript, Vite, and Tailwind CSS. It supports keyboard navigation, light/dark/system themes, and reduced motion. Content comes from public sources and user-confirmed personal records.

## Development

Install [Bun 1.4.3](https://bun.com/docs/installation), then run:

```bash
bun install --frozen-lockfile
bun run dev
```

The development server defaults to `http://localhost:5173`. Project commands use Bun and do not require a separate Node installation.

To build and preview the production site:

```bash
bun run build
bun run preview
```

The build goes into `dist/`; the preview server defaults to port 4173.

## Commands

| Command | Purpose |
| --- | --- |
| `bun run dev` | Start the Vite development server |
| `bun run typecheck` | Check application code, tests, and build configuration with TypeScript 7 |
| `bun run lint` | Run ESLint with warnings treated as failures |
| `bun run test` | Run Bun Test in watch mode |
| `bun run test:run` | Run the tests once |
| `bun run test:coverage` | Run tests and produce console and LCOV coverage reports |
| `bun run build` | Generate the Anatomy assets, audit their geometry, and build the static site |
| `bun run anatomy:build` | Generate and audit the case geometry and both theme previews |
| `bun run anatomy:audit` | Run the physical-part audit across resting and moving poses |
| `bun run preview` | Preview the production build |
| `bun run check` | Run type checking, lint, coverage tests, and the production build |

Vite handles transpilation and bundling separately from type checking. Run `bun run check` before opening a pull request.

## Content and structure

The seven sections are About, Projects, Stack, Background, Publications, Elsewhere, and Contact. Upstream contributions appear within Projects. Contact links to GitHub, X, and ORCID.

The project gallery advances every six seconds while visible and idle. Hover, keyboard focus, gestures, hidden or offscreen content, and reduced motion suspend rotation. Indicators, keyboard controls, and native swipes remain available. Explicit project links and browser Back restore the selected card.

| Path | Contents |
| --- | --- |
| [`src/content/`](src/content/) | Website copy, content records, accessible labels, and SEO metadata |
| [`src/components/sections/`](src/components/sections/) | The seven page sections |
| [`src/components/base/`](src/components/base/) | Adapted BoardUI components |
| [`src/providers/`](src/providers/) and [`src/hooks/`](src/hooks/) | Themes, exploration state, and motion preferences |
| [`src/styles/`](src/styles/) | Fonts, brand tokens, responsive layout, and reduced-motion styles |
| [`public/hairline/`](public/hairline/) | Hairline kernel, figure source, and static previews |
| [`scripts/anatomy/`](scripts/anatomy/) | Exploration-case geometry, generation scripts, and audit tools |
| [`public/anatomy/`](public/anatomy/) | Generated case assets and theme previews |

Edit website text in [`src/content/en.ts`](src/content/en.ts). The same content supplies static HTML metadata and illustration labels. Keep factual changes tied to the evidence in [`docs/content-sources.md`](docs/content-sources.md).

## Deployment

The [GitHub Actions workflow](.github/workflows/deploy.yml) installs dependencies from the frozen lockfile and runs `bun run check` on Ubuntu and Windows. Pull requests run checks only. A push to `main` uploads the Ubuntu build and deploys it after both platform checks pass.

Set the repository's Pages publishing source to **GitHub Actions**. The site is a static single-page application served from the root URL, with hash anchors for sections.

## Documentation and contributing

- [Development guide](docs/development.md): tooling, content, component updates, illustration lifecycle, and validation.
- [Contributing](CONTRIBUTING.md): contribution workflow, commit messages, pull requests, and checks.
- [Product requirements](PRODUCT.md) and [design system](DESIGN.md): intended behavior and visual rules.
- [Content sources](docs/content-sources.md): public evidence, verification dates, and personal-record boundaries.
- [Implementation record](docs/surface-home.md): the original surface implementation and validation record.
- [Agent instructions](AGENTS.md): repository guidance for coding agents.

## License

See [LICENSE](LICENSE) for the project license and [Third-party notices](THIRD_PARTY_NOTICES.md) for component and asset attribution.

Copied BoardUI code uses the MIT license, with its full text in the [BoardUI license](licenses/BoardUI-LICENSE.txt). Geist and Geist Mono use SIL OFL 1.1; their [license](public/fonts/LICENSE.txt) and [OFL notice](public/fonts/OFL.txt) are included in the deployed site. Hairline and Anatomy license texts accompany their [Hairline](public/hairline/LICENSE.txt) and [Anatomy](public/anatomy/LICENSE.txt) assets.
