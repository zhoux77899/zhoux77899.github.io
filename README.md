# zhoux77899 Portfolio

zhoux77899's personal site: open-source projects, tools, research background, and travel impressions. A centered precision exploration case connects the page sections, six projects share a looping gallery, and Hairline scenes represent New Zealand, Japan, and China. English content is grounded in public GitHub repositories and user-confirmed personal records. The site supports light, dark, and system themes and deploys to GitHub Pages.

## Local development

Use **Bun 1.4.3**. Project commands run without a Node installation.

```bash
bun install --frozen-lockfile
bun run dev
```

The development server defaults to `http://localhost:5173`. Follow the [Bun installation guide](https://bun.com/docs/installation) to install the specified version when setting up a new environment.

This workspace also has a portable Windows executable at `.tools/bun/bun-windows-x64-baseline/bun.exe`. If it is present, add its directory to the current PowerShell process's PATH:

```powershell
$portfolioBunDirectory = (Resolve-Path '.tools/bun/bun-windows-x64-baseline').Path
$env:PATH = $portfolioBunDirectory + ';' + $env:PATH
bun --version
```

`.tools/` holds local runtimes, caches, and temporary files and is excluded from Git. Install the same Bun version when using another workspace.

## Commands

| Command | Purpose |
| --- | --- |
| `bun run dev` | Start the Vite development server |
| `bun run typecheck` | Check application code, tests, and build configuration with TypeScript 7 |
| `bun run lint` | Run ESLint with warnings treated as failures |
| `bun run test` | Run Bun Test in watch mode |
| `bun run test:run` | Run the tests once |
| `bun run test:coverage` | Run tests and produce console and LCOV coverage reports |
| `bun run build` | Build the static site into `dist/` |
| `bun run anatomy:build` | Generate and audit the case geometry and both theme previews |
| `bun run anatomy:audit` | Run the physical-part audit across resting and moving poses |
| `bun run preview` | Preview the production build on port 4173 by default |
| `bun run check` | Run type checking, lint, coverage tests, and the production build |

Vite handles transpilation and bundling. Type checking is a separate step, so run the full `check` before publishing.

## Technology stack

| Category | Version or implementation |
| --- | --- |
| React / React DOM | 19.3.0 |
| TypeScript type checking | 7.0.2 |
| Vite / React plugin | 8.3.4 / 6.1.2 |
| Tailwind CSS | 4.3.3 |
| UI | Local BoardUI Free source and React Aria Components |
| Icons | Hugeicons React 1.1.10 and Free Icons 4.3.5 |
| Animation | Motion 14.1.0 |
| Testing | Bun Test, Happy DOM, and Testing Library |
| Package manager and JavaScript tooling runtime | Bun 1.4.3 |

### TypeScript compatibility packages

`@typescript/native` is an npm alias for the stable `typescript@7.0.2` package. The `typecheck` script explicitly invokes its native compiler launcher. `typescript` is an alias for `@typescript/typescript6@6.0.2` and supplies the compiler API needed by typescript-eslint; it does not run the project's type checks. This follows [Microsoft's coexistence strategy](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/).

`@types/node` supplies type declarations required by dependencies, without adding a Node runtime. Project scripts invoke each CLI through Bun so that a Node shebang cannot silently change the runtime.

The development configuration excludes `.tools/`, coverage output, and local documentation from file watching. React Aria uses component subpaths, and Hugeicons uses individual icon subpaths. Vite explicitly prebundles React and its CommonJS compatibility shims while loading other modules as ESM. When adding a CommonJS dependency, update `optimizeDeps.include` and verify that the development page loads.

## Project structure and content

- `src/lib/data.ts`: Personal details, skills, projects, travel, and experience.
- `src/lib/navigation.ts`: Section anchors and navigation labels.
- `src/components/sections/`: The six page sections. Contact links to GitHub, X, and ORCID.
- `src/components/base/`: Local BoardUI component source.
- `src/providers/` and `src/hooks/`: Shared themes, exploration state, and motion preferences.
- `src/styles/globals.css`: Fonts, brand colors, responsive behavior, and reduced motion. `src/styles/boardui/` contains the base design tokens.
- `src/assets/fonts/`: Self-hosted Geist and Geist Mono variable WOFF2 fonts. Geist covers body text, headings, and controls; Geist Mono covers code and monospaced styles.
- `src/utils/icons.tsx`: Stable Hugeicons component adapters and RTL mirroring metadata.
- `src/utils/brand-icons.tsx` and `public/brand-icons/`: Monochrome vendor marks shared by social links, Contact, and the technology stack. Sources, hashes, and licenses accompany the assets.
- `public/hairline/`: The unmodified Hairline kernel, project and country figures, and light/dark rest previews. Earlier figure definitions remain available for compatibility.
- `scripts/anatomy/`: Original case geometry and the MIT Anatomy kit. Development and production builds regenerate its static assets and run the geometry audit.
- `public/anatomy/`: Generated case paths, both theme previews, and the Anatomy license.

Theme preferences are stored in `localStorage.theme` as `light`, `dark`, or `system`. The startup script applies `.dark`, `data-theme`, and `color-scheme` before React renders. Theme selection remains available when browser storage is disabled.

## Maintaining BoardUI source

The base components come from the [BoardUI Free registry](https://www.boardui.com/components). The Carousel and underline Tabs adapt official source to the site's shared exploration state and brand tokens. Copyright and licensing details are in [Third-party notices](THIRD_PARTY_NOTICES.md). `boardui.json` directs upstream stylesheet installation to `src/styles/boardui/`.

To update components, obtain the official source in a separate directory, review the differences, and merge them into the project. Preserve the Hugeicons adapters, direction helper, avatar image fallback, and brand token mappings rather than overwriting local changes. Run the CLI through Bun if you use it:

```bash
bunx --bun boardui@0.5.8 add button link-button icon-button chip avatar segmented-control
```

The CLI may write helper rule files or add an upstream icon package. Review generated changes after an update. Production icon dependencies should contain only the two Hugeicons packages.

## Testing and deployment

Bun preloads Happy DOM before loading Testing Library matchers, browser API mocks, and test cleanup. Tests cover themes, shared exploration state, project deep links and history, carousel autoplay and pause conditions, keyboard controls and interrupted transitions, country selection, both navigation menus, technology tabs, touch-tap cancellation, illustration loading and cleanup, and motion preferences. The production build also audits the case's physical geometry and depth order. The latest local revision passed 68 tests and 410 assertions; its implementation and verification record is in [docs/surface-home.md](docs/surface-home.md).

GitHub Actions is configured to run frozen-lockfile installation and `bun run check` on Ubuntu and Windows. Pull requests run checks only. On a push to `main`, the Ubuntu job uploads the build artifact; deployment starts after both platform checks pass. Set the repository's Pages publishing source to **GitHub Actions**.

The site is a static single-page application served from the repository's root URL path, with hash anchors for sections. GitHub manages the internal runtimes of official Actions; all project commands use Bun.

## License

See [LICENSE](LICENSE) for the project license. Copied BoardUI code uses the MIT license, with the complete text in [the BoardUI license](licenses/BoardUI-LICENSE.txt). Geist and Geist Mono use SIL OFL 1.1; their original [license](public/fonts/LICENSE.txt) and [OFL notice](public/fonts/OFL.txt) are included in the deployed site.

## Hairline illustrations

Figure source lives in `public/hairline/figures/`; the kernel is copied unchanged from the user-invoked hairline-create skill. Each figure uses the original `mount` / `set` / `destroy` contract and can also be assembled into its official standalone bench for validation. The site loads module scripts lazily through a shared registry and mounts only the drawing stage, without sliders, readouts, or labels. CSS maps the engine's exposed monochrome palette variables to the current surface and theme.

Static SVG rest previews provide loading and error fallback. Build and look artifacts stay under the ignored `.tools/hairline/` directory. The Hairline license is included in both `licenses/` and the public `/hairline/LICENSE.txt` asset. Public project facts and personal-record boundaries are documented in `docs/content-sources.md`.

Touch input is adapted outside the original kernel. A confirmed single tap calls the figure's optional `activate(point)` method; dragging scrolls the project gallery or page, and cancelled or multi-finger gestures do not activate a part. `activate(null)` restores its resting pose.

## Exploration case

The Anatomy case contains 113 recorded physical solids. Its six objects link to Projects, Stack, Background, Open source, Travel, and Contact. Pointer and keyboard focus preview a module; clicking or pressing Enter on its hotspot selects the destination. The Hero presents identity, the full case, biography, actions, and social links on one centered axis. Its tighter projection frame preserves the physical drawing and hotspot alignment while making room for the full cover in the tested viewports. Shorter or zoomed windows retain normal vertical flow. Once the case leaves view, Explore opens the same interactive drawing in a dismissible popover. An idle tour resumes after eight seconds without input and never changes the URL or page selection. The animation stops offscreen and in hidden tabs, and reduced motion settles directly to the chosen pose.

`bun run anatomy:build` generates both SVG previews and the JSON scene from `scripts/anatomy/build.mjs`, then checks resting geometry, 581 depth states, and 159 replayed frames from the browser's shared motion model. Run it after changing case geometry or its palette while the development server is already running. The original Anatomy line verifier is available under `scripts/anatomy/verify`; its optional browser-based checks require Node and Chrome, while ordinary project checks use Bun.

## Project gallery

The BoardUI carousel keeps one project centered with neighboring cards visible on both sides. Six canonical cards retain the `#project-*` anchors; four inert static copies allow seamless first/last transitions without duplicate anchors or extra Hairline runtimes. It advances every six seconds while visible and idle. Hover, focus, gestures, hidden/offscreen state, reduced motion, and the pause control suspend automatic rotation. Keyboard commands, indicators, and native swipes remain available; manual interaction restarts the interval. Automatic selection and native scrolling do not add browser history; explicit deep links and Back reveal and center the target card. Project links use Source, Releases, and Website labels.

The contribution section separately lists Source and all fifteen merged vLLM Ascend PRs verified on 2026-10-15. The technology tabs group AI infrastructure and agents together, followed by scientific computing, embedded systems, web/data, and development tools. Country scenes keep stationary geometry monochrome and use the site accent for the SUV, train, and opening shutters, including their static fallbacks.
