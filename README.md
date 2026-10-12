# Ruri Portfolio

A personal developer portfolio covering AI infrastructure, projects, skills, travel, and career history, with a GitHub contact link. The site uses English content, supports light, dark, and system themes, and deploys to GitHub Pages.

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

- `src/lib/data.ts`: Personal details, skills, projects, travel, experience, and statistics.
- `src/lib/navigation.ts`: Section anchors and navigation labels.
- `src/components/sections/`: The six page sections. Contact links directly to the existing GitHub account.
- `src/components/base/`: Local BoardUI component source.
- `src/providers/` and `src/hooks/useTheme.ts`: Shared theme state.
- `src/styles/globals.css`: Fonts, brand colors, responsive behavior, and reduced motion. `src/styles/boardui/` contains the base design tokens.
- `src/assets/fonts/`: Self-hosted Geist and Geist Mono variable WOFF2 fonts. Geist covers body text, headings, and controls; Geist Mono covers code and monospaced styles.
- `src/utils/icons.tsx`: Stable Hugeicons component adapters and RTL mirroring metadata.
- `public/assets/images/hero/`: Light and dark Hero images. Other content images retain their existing external URLs.

Theme preferences are stored in `localStorage.theme` as `light`, `dark`, or `system`. The startup script applies `.dark`, `data-theme`, and `color-scheme` before React renders. Theme selection remains available when browser storage is disabled.

## Maintaining BoardUI source

The six base components come from the [BoardUI Free registry](https://www.boardui.com/components). Copyright and licensing details are in [Third-party notices](THIRD_PARTY_NOTICES.md). `boardui.json` directs upstream stylesheet installation to `src/styles/boardui/`.

To update components, obtain the official source in a separate directory, review the differences, and merge them into the project. Preserve the Hugeicons adapters, direction helper, avatar image fallback, and brand token mappings rather than overwriting local changes. Run the CLI through Bun if you use it:

```bash
bunx --bun boardui@0.5.8 add button link-button icon-button chip avatar segmented-control
```

The CLI may write helper rule files or add an upstream icon package. Review generated changes after an update. Production icon dependencies should contain only the two Hugeicons packages.

## Testing and deployment

Bun preloads Happy DOM before loading Testing Library matchers, browser API mocks, and test cleanup. Tests cover themes, navigation, the mobile menu, skill categories, contact links, image fallbacks, and icon properties.

GitHub Actions is configured to run frozen-lockfile installation and `bun run check` on Ubuntu and Windows. Pull requests run checks only. On a push to `main`, the Ubuntu job uploads the build artifact; deployment starts after both platform checks pass. Set the repository's Pages publishing source to **GitHub Actions**.

The site is a static single-page application served from the repository's root URL path, with hash anchors for sections. GitHub manages the internal runtimes of official Actions; all project commands use Bun.

## License

See [LICENSE](LICENSE) for the project license. Copied BoardUI code uses the MIT license, with the complete text in [the BoardUI license](licenses/BoardUI-LICENSE.txt). Geist and Geist Mono use SIL OFL 1.1; their original [license](public/fonts/LICENSE.txt) and [OFL notice](public/fonts/OFL.txt) are included in the deployed site.
