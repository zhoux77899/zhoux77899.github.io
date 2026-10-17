# Development guide

Start with the [README](../README.md) for installation and commands. Read [CONTRIBUTING.md](../CONTRIBUTING.md) for commit, pull-request, and validation rules.

## Tooling

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

[`package.json`](../package.json) defines the runtime version, dependencies, and commands. Use `bun install --frozen-lockfile` to install the recorded dependency graph.

### TypeScript compatibility packages

`@typescript/native` is an npm alias for the stable `typescript@7.0.2` package. The `typecheck` script explicitly invokes its native compiler launcher. `typescript` is an alias for `@typescript/typescript6@6.0.2` and supplies the compiler API needed by typescript-eslint; it does not run the project's type checks. This follows [Microsoft's coexistence strategy](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/).

`@types/node` supplies declarations required by dependencies without adding a Node runtime. Project scripts invoke each CLI through Bun so a Node shebang cannot silently change the runtime. [`bunfig.toml`](../bunfig.toml) also enables Bun for script execution.

### Vite module loading

React Aria uses component subpaths, and Hugeicons uses individual icon subpaths. [`vite.config.ts`](../vite.config.ts) explicitly prebundles React and its CommonJS compatibility shims while loading other modules as ESM. When adding a CommonJS dependency, update `optimizeDeps.include` and verify that the development page loads.

The Vite watcher excludes local tooling, coverage output, and the `docs/` directory. Vite handles transpilation and bundling; the separate `typecheck` command checks application code, tests, and build configuration.

## Content, metadata, and themes

- [`src/content/en.ts`](../src/content/en.ts) holds English copy, content records, dynamic and accessible labels, social handles, project links, illustration descriptions, and SEO metadata.
- [`src/content/index.ts`](../src/content/index.ts) exposes typed content and the locale registry. [`src/content/types.ts`](../src/content/types.ts) defines the shared `SiteContent` contract.
- [`src/lib/navigation.ts`](../src/lib/navigation.ts) pairs stable anchors with content labels.
- [`src/content/html.ts`](../src/content/html.ts) fills the HTML metadata template through the Vite plugin in development and production. The initial static HTML therefore includes the site's SEO metadata.

Anatomy generation reads the same content module for labels and preview metadata. Edit the source rather than generated assets.

English is the default locale. To prepare another language, add a content file matching `SiteContent` and register it in `src/content/index.ts`. Keep identifiers, anchors, and icon keys independent of displayed labels. The current site has no language selector, browser-language detection, or persisted locale preference.

Theme preferences use `localStorage.theme` with `light`, `dark`, or `system`. The startup script applies `.dark`, `data-theme`, and `color-scheme` before React renders. Theme selection also works when browser storage is disabled.

Geist and Geist Mono variable WOFF2 fonts are self-hosted in `src/assets/fonts/`. Geist covers body text, headings, and controls; Geist Mono covers code and monospaced styles. Global fonts, colors, responsive behavior, and reduced-motion styles live in `src/styles/globals.css`; BoardUI base tokens live in `src/styles/boardui/`.

Check personal facts and project claims against [content sources](content-sources.md). The upstream contribution list retains Source and all fifteen merged vLLM Ascend PRs verified on 2026-10-15. Publications are static sourced records; ORCID is not fetched at runtime. The technology tabs group AI infrastructure and agents, scientific computing, embedded systems, web/data, and development tools.

## BoardUI and icons

The base components come from the [BoardUI Free registry](https://www.boardui.com/components). Carousel and underline Tabs adapt official source to shared exploration state and brand tokens. Copyright and licensing details are in [Third-party notices](../THIRD_PARTY_NOTICES.md). [`boardui.json`](../boardui.json) directs upstream stylesheet installation to `src/styles/boardui/`.

Obtain updated official component source in a separate directory, review the differences, and merge them into the project. Preserve the Hugeicons adapters, direction helper, avatar image fallback, and brand token mappings. Run the CLI through Bun if you use it:

```bash
bunx --bun boardui@0.5.8 add button link-button icon-button chip avatar segmented-control
```

The CLI may write helper rule files or add an upstream icon package. Review generated changes after an update. Production icon dependencies should contain only the two Hugeicons packages.

[`src/utils/icons.tsx`](../src/utils/icons.tsx) contains stable Hugeicons component adapters and RTL mirroring metadata. [`src/utils/brand-icons.tsx`](../src/utils/brand-icons.tsx) and [`public/brand-icons/`](../public/brand-icons/) provide monochrome vendor marks shared by social links, Contact, and Stack. Asset sources, hashes, and licenses accompany those files.

## Hairline illustrations

Figure source lives in [`public/hairline/figures/`](../public/hairline/figures/). The kernel is copied unchanged from the user-invoked hairline-create skill. Earlier figure definitions remain available for compatibility. Each figure uses the original `mount` / `set` / `destroy` contract and can also be assembled into its official standalone bench for validation.

[`src/lib/hairline.ts`](../src/lib/hairline.ts) loads the kernel once and shares figure-module promises. [`HairlineFigure`](../src/components/common/HairlineFigure.tsx) mounts only the drawing stage, without sliders, readouts, or visible labels. It starts loading near the viewport, destroys each mounted handle on cleanup, and removes the mounted drawing. CSS maps the engine's exposed monochrome palette variables to the current surface and theme.

Light and dark SVG rest previews provide loading and error fallbacks. Project highlight edges use the shared accent while resting contours remain monochrome. Country scenes reserve the accent for the SUV, train, and opening shutters, including their static fallbacks.

Touch handling stays outside the original kernel. A confirmed single tap calls the figure's optional `activate(point)` method; `activate(null)` restores its resting pose. Dragging scrolls the gallery or page, and cancelled or multi-finger gestures do not activate a part.

Build and look artifacts are excluded from version control. Figure source and deployed rest previews are versioned assets. The Hairline license is included in [`licenses/`](../licenses/) and the public [`/hairline/LICENSE.txt`](../public/hairline/LICENSE.txt) asset.

## Anatomy exploration case

The case contains 113 recorded physical solids. Its six objects link to Projects, Stack, Background, Open source, Travel, and Contact. Open source targets the contribution block within Projects; Publications remains a separate page section.

Pointer and keyboard focus preview a module; clicking or pressing Enter on its hotspot selects the destination. The Hero presents identity, the full case, biography, actions, and social links on one centered axis. Its tighter projection frame preserves the drawing and hotspot alignment while making room for the full cover. Shorter or zoomed windows retain normal vertical flow.

After the case leaves view, Explore opens the same interactive drawing in a dismissible popover. An idle tour resumes after eight seconds without input and never changes the URL or page selection. Animation stops offscreen and in hidden tabs; reduced motion settles directly to the chosen pose.

Original geometry and the MIT Anatomy kit live in [`scripts/anatomy/`](../scripts/anatomy/). Development and production builds run generation and the physical geometry audit before Vite starts. To regenerate after changing geometry or its palette while the development server is running:

```bash
bun run anatomy:build
```

The script generates the JSON scene, projected hotspots, light/dark SVG and HTML previews, and audit report from tracked source. It checks resting geometry, 581 depth states, and 159 replayed frames from the browser's shared motion model. `bun run anatomy:audit` invokes the same build script with `--audit`.

Review generated differences in `public/anatomy/` and `src/lib/anatomy/hotspots.ts` with the source change. These deployed assets and the geometry audit report are intentionally versioned. Keep the [Anatomy license](../public/anatomy/LICENSE.txt) with the public assets.

The original line verifier lives under `scripts/anatomy/verify`. Its optional browser checks require Node and Chrome. Ordinary project checks use Bun.

## Project gallery

The BoardUI carousel centers one project with neighboring cards visible on both sides. Six canonical cards retain `#project-*` anchors; four inert static copies allow seamless first/last transitions without duplicate anchors or extra Hairline runtimes.

Rotation advances every six seconds while visible and idle. Hover, focus, gestures, hidden/offscreen state, and reduced motion suspend it. Keyboard commands, indicators, and native swipes remain available. Manual interaction restarts the interval.

Automatic selection and native scrolling do not add browser history. Explicit deep links and browser Back reveal and center the target card. Project links use Source, Releases, and Website labels.

## Validation

Run `bun run check` for type checking, ESLint, coverage tests, illustration generation and auditing, and the production build. Review tracked Anatomy outputs after the command.

Bun preloads Happy DOM before Testing Library matchers, browser API mocks, and test cleanup. Tests cover themes, shared exploration state, project deep links and history, carousel rotation and pause conditions, keyboard controls and interrupted transitions, country selection, both navigation menus, technology tabs, touch-tap cancellation, illustration loading and cleanup, and motion preferences. Content tests cover locale completeness, display-independent identities, rich-text order, and static SEO generation. The production build also audits physical geometry and depth order.

For interaction or visual changes, check the affected flow in the browser, including keyboard use, light/dark/system themes, and reduced motion. The [original implementation record](surface-home.md) contains historical validation details; run the current checks for current results.

GitHub Actions runs the same frozen installation and project checks on Ubuntu and Windows. Pull requests check without deploying. Pushes to `main` deploy the Ubuntu build after both platform checks pass. GitHub manages Actions' internal runtimes; project commands continue to use Bun.
