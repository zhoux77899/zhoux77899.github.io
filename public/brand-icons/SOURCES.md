# Brand icon sources

Retrieved on 2026-10-14. These marks identify the linked services and the technologies used by the existing projects. They do not imply sponsorship or endorsement. Trademarks belong to their respective owners.

The React adapter in `src/utils/brand-icons.tsx` retains the vector contours and aspect ratio, and renders foreground-colored SVG paths. Decorative icons are hidden from assistive technology; the adjacent text provides the name. The locally stored source assets and SHA-256 digests are listed in `manifest.json`.

## Vendor assets

| Asset | Primary source | Usage record |
| --- | --- | --- |
| GitHub | [GitHub Brand Toolkit](https://brand.github.com/foundations/logo), [2026 SVG download](https://brand.github.com/GitHub_Logos.zip) | `GitHub_Invertocat_Black.svg`, copied as `github.svg`; official black silhouette. Clip definitions around the full viewBox are omitted in the inline adapter. GitHub trademark guidelines apply. |
| ORCID | [ORCID iD icon graphics, version 4](https://api.figshare.com/v2/articles/5008697/versions/4), [black-and-white vector](https://ndownloader.figshare.com/files/8439062) | `ORCID-iD_icon-bw-vector.svg`, copied as `orcid.svg`. CC0 artwork; ORCID trademarks and [display guidelines](https://info.orcid.org/documentation/integration-guide/orcid-id-display-guidelines/) apply. The icon's separate white paths are combined as transparent counters in the inline monochrome adapter. |
| OpenAI | [OpenAI Design Guidelines](https://openai.com/brand/), [official Blossom vector](https://images.ctfassets.net/kftzwdyauwt9/3hUGLn3ypllZ0oa01qOYVq/28e8188e6f11b84c3e876569d492734f/Blossom_Light.svg) | The complete first Blossom contour is retained; layout guide circles and the repeated demonstration mark are omitted. Bounds are cropped around that complete mark. OpenAI marks usage terms apply. Used only beside the factual “OpenAI API” stack entry. |
| Ascend | [Ascend Community](https://www.hiascend.com/), [official header logo](https://www.hiascend.com/_static3/logo1.BQ2XZIjU.svg) | `ascend.svg` stores the original logo. The adapter retains the separate Ascend symbol path from the vendor lockup, with a matching cropped viewBox. Huawei/Ascend trademark rights remain with the owner; this is factual technology identification. |
| SDL | [SDL official website](https://www.libsdl.org/), [official PNG logo](https://www.libsdl.org/media/SDL_logo.png) | Original `sdl.png`, displayed without cropping or stretching. CSS grayscale in light mode and grayscale with inversion in dark mode preserve the internal SDL lettering. SDL logo rights remain with the owner. |
| Playwright | [Microsoft Playwright original logo SVG](https://github.com/microsoft/playwright/blob/2f6148bcd1a96ec687d55ce08645fc6315b1514e/packages/recorder/public/playwright-logo.svg) | Original SVG, displayed without cropping or stretching. CSS grayscale only. Apache-2.0 project license copied as `Playwright-LICENSE.txt`; Microsoft trademark rights remain with the owner. |

## Simple Icons

The remaining SVGs are copied from [Simple Icons](https://github.com/simple-icons/simple-icons) at commit [`4d29a35c954699b389a834aacc97dd6e7e74143c`](https://github.com/simple-icons/simple-icons/tree/4d29a35c954699b389a834aacc97dd6e7e74143c). The library publishes its icon artwork under [CC0-1.0](./Simple-Icons-LICENSE.md), while the underlying brand marks retain their respective trademark rights. No Simple Icons runtime package is added.

| File | Vendor source recorded by Simple Icons |
| --- | --- |
| `x.svg` | https://x.com |
| `python.svg` | https://www.python.org/community/logos/ |
| `pytorch.svg` | https://github.com/pytorch/pytorch.github.io/blob/8f083bd12192ca12d5e1c1f3d236f4831d823d8f/assets/images/logo.svg |
| `vllm.svg` | https://github.com/vllm-project/media-kit/blob/79b2ea5db25b723f2d81dae203a87c5b9a076722/vLLM-Logo.svg |
| `numpy.svg` | https://numpy.org/press-kit/ |
| `scipy.svg` | https://github.com/scikit-image/skimage-branding/blob/eafb65cbc3a700e3d9c8ba2ba15788fcc8703984/logo/scipy.svg |
| `go.svg` | https://blog.golang.org/go-brand |
| `cplusplus.svg` | https://github.com/isocpp/logos/tree/64ef037049f87ac74875dbe72695e59118b52186 |
| `espressif.svg` | https://www.espressif.com |
| `arduino.svg` | https://www.arduino.cc |
| `platformio.svg` | https://piolabs.com |
| `typescript.svg` | https://www.typescriptlang.org/branding |
| `react.svg` | https://github.com/facebook/create-react-app/blob/282c03f9525fdf8061ffa1ec50dce89296d916bd/test/fixtures/relative-paths/src/logo.svg |
| `nextdotjs.svg` | https://vercel.com/design/brands#next-js |
| `postgresql.svg` | https://wiki.postgresql.org/wiki/Logo |
| `drizzle.svg` | https://orm.drizzle.team |
| `tailwindcss.svg` | https://tailwindcss.com/brand |
| `githubactions.svg` | https://github.com/features/actions |
| `cmake.svg` | https://www.kitware.com/platforms/ |
| `vitest.svg` | https://github.com/voidzero-dev/community-design-resources/blob/55902097229cf01cf2a4ceb376f992f5cf306756/brand-assets/vitest/vitest-icon-color-bracketless.svg |

“Agent skills” and “HTTP & SSE” are concepts and protocols rather than vendor brands. Their semantic brain and network symbols come from the already licensed Hugeicons set. Neither symbol is presented as a vendor logo.

## BoardUI Tabs

The free Tabs implementation is copied from [BoardUI `components/base/tabs/tabs.tsx`](https://github.com/BoardUI/boardui/blob/ec5c5eb3e29c2441be63b9422cd54f411ef23466/components/base/tabs/tabs.tsx), under the existing `licenses/BoardUI-LICENSE.txt` MIT license. The local Direction import uses the existing site hook. The site stylesheet maps the underline and text to the portfolio's semantic accent and foreground tokens. The React Aria keyboard, selection, panel association, and resize/mutation observer behavior are preserved.
