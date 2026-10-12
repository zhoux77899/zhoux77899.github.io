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
