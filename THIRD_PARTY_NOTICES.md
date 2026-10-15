# Third-party notices

## BoardUI

The free BoardUI components and design foundations in `src/components/base`,
`src/styles/boardui`, `src/hooks/direction.ts`, `src/utils/cx.ts`, and
`src/utils/directional-icon.ts` are derived from the official
[BoardUI registry](https://www.boardui.com/components), retrieved on 2026-10-10.

The source is distributed under the MIT license. The complete upstream copyright
and license notice is preserved in [licenses/BoardUI-LICENSE.txt](licenses/BoardUI-LICENSE.txt).
The upstream free-source repository is [BoardUI/boardui](https://github.com/BoardUI/boardui).

Local adaptations bind icon slots to the site's Hugeicons components, retain the
locale-aware direction hook without unused provider components, and place design
foundations in a dedicated stylesheet directory. Shared button style maps live in
separate TypeScript modules. Global styles keep the selected components' base
rules, variants, and elevation mappings; unused showcase styles are omitted.
Component APIs and semantic design tokens otherwise follow the upstream source.

## Geist fonts

The self-hosted Geist and Geist Mono variable WOFF2 files in `src/assets/fonts`
come from the official [vercel/geist-font v1.7.2 release](https://github.com/vercel/geist-font/releases/tag/v1.7.2).
The font files are unmodified and distributed under the SIL Open Font License 1.1.
The original [LICENSE.txt](public/fonts/LICENSE.txt) and [OFL.txt](public/fonts/OFL.txt)
retain the upstream copyright notices and are copied into the deployed site at `/fonts/`.

## BoardUI Carousel and Tabs

The Carousel and Tabs implementations under `src/components/base/carousel` and
`src/components/base/tabs` are adapted from the public
[BoardUI source](https://github.com/BoardUI/boardui). They use the existing MIT
notice in [licenses/BoardUI-LICENSE.txt](licenses/BoardUI-LICENSE.txt). Local
Carousel changes add centered looping, inert static endpoint copies, controlled
project selection, and dot/pill indicators. Tabs retain React Aria keyboard and
panel behavior with the site's icon adapters and semantic colors.

## Brand marks

The monochrome marks in `public/brand-icons` identify existing social destinations
and project technologies. Original vendor assets, fixed Simple Icons sources,
SHA-256 digests, and transformation details are recorded in
[public/brand-icons/SOURCES.md](public/brand-icons/SOURCES.md) and its manifest.
Simple Icons artwork uses CC0-1.0; its notice is copied alongside the assets.
Playwright's Apache-2.0 notice is also included. Vendor trademarks remain with
their owners. The source record identifies which marks follow vendor usage terms.

## Hairline

The unmodified Hairline engine in `public/hairline/kernel.js` comes from [@lucasmarkes/hairline](https://github.com/lucasmarkes/hairline), as distributed by the user-invoked hairline-create skill. Copyright (c) 2026 Lucas Marques. MIT license text is included in [licenses/Hairline-LICENSE.txt](licenses/Hairline-LICENSE.txt). The site figures combine original geometry with MIT-licensed adaptations of the upstream Keyboard, Patch, Riffle, and Stack figure vocabulary. Their source comments identify the adaptations. The static SVG previews are exports of the same geometry.

## Anatomy

The geometry, depth-audit kit, and verification scripts under `scripts/anatomy/kit` and `scripts/anatomy/verify` are copied from the user-invoked Anatomy skill. Copyright (c) 2026 Ryan. The original MIT notice is preserved in `scripts/anatomy/kit/LICENSE` and [licenses/Anatomy-LICENSE.txt](licenses/Anatomy-LICENSE.txt), and ships at `/anatomy/LICENSE.txt`.

The exploration case is original site geometry built with that kit. Its static paths and four-tone SVG previews are generated from the same physical parts used by the audit; the browser loads only the precomputed geometry and the site's interaction controller.
