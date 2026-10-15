# Content sources

External content was checked on 2026-10-13 (Asia/Hong_Kong). Research used the public GitHub profile, public repository metadata, README files, dependency manifests, source code, and upstream pull requests. No private repository content was used. The 2026-10-14 and 2026-10-15 presentation notes document the user's revisions and local source mapping. Only the upstream merged-PR inventory was refreshed on 2026-10-15; the project and profile snapshot remains dated 2026-10-13.

## Personal information

- [GitHub profile](https://github.com/zhoux77899): the 2026-10-13 snapshot recorded display name Ruri, six pinned projects, avatar, and ORCID `0000-0003-3695-460X`. Ruri is retained here as a historical checked fact, not the current site identity or a newly fetched profile value.
- The user's 2026-10-14 revision directs the site to use the GitHub username `zhoux77899` everywhere identity appears. The real avatar and public GitHub, X, and ORCID destinations are retained.
- [Profile README](https://github.com/zhoux77899/zhoux77899/blob/main/README.md): current interests in LLM and CV, and the X account [miyoshichi](https://x.com/miyoshichi).
- The title, employment periods, anonymous employer labels, education, travel locations, years, and travel counts come from the existing site data and the user's instruction to retain them. Public repository activity does not independently verify these personal details.
- Both employer labels remain anonymous. The avatar URL is unchanged. No job-search status, contact email, proficiency rating, commercial result, or new personal history was inferred.

## Project snapshot

All six pinned repositories are public, use `main` as their default branch, and report `fork: false`. The links in this table are the metadata endpoints checked for this snapshot. Timestamps are UTC and describe repository pushes, not release dates or guaranteed maintenance activity.

| Project | Metadata | Last push |
| --- | --- | --- |
| CFGAN | [Repository API](https://api.github.com/repos/zhoux77899/cfgan) | 2026-04-14T15:31:11Z |
| LUMA | [Repository API](https://api.github.com/repos/zhoux77899/luma) | 2026-10-04T09:50:51Z |
| Claude Code Insights | [Repository API](https://api.github.com/repos/zhoux77899/claude-code-insights) | 2026-10-09T08:19:48Z |
| Flawless | [Repository API](https://api.github.com/repos/zhoux77899/flawless) | 2026-07-30T14:27:40Z |
| What to Eat | [Repository API](https://api.github.com/repos/zhoux77899/what-to-eat) | 2026-07-29T14:09:50Z |
| Kitsune Proxy | [Repository API](https://api.github.com/repos/zhoux77899/kitsune-proxy) | 2026-07-30T14:41:35Z |

### CFGAN

The [README](https://github.com/zhoux77899/cfgan/blob/main/README.md) describes a microscopy image-processing library. The [dependency manifest](https://github.com/zhoux77899/cfgan/blob/main/pyproject.toml) establishes Python, PyTorch, NumPy, SciPy, and related scientific libraries. The [model](https://github.com/zhoux77899/cfgan/blob/main/cfgan/models/modeling_cfgan.py), [trainer](https://github.com/zhoux77899/cfgan/blob/main/cfgan/trainer/cfgan_trainer.py), [localization](https://github.com/zhoux77899/cfgan/blob/main/cfgan/location/localization.py), and [CRLB](https://github.com/zhoux77899/cfgan/blob/main/cfgan/math/crlb.py) sources support the listed capabilities.

The public releases collection is empty. The package declares version 0.1.0, which does not prove publication to a package registry. No public benchmark, released weights, or quantitative quality improvement was found. Site copy describes research code and links to source only.

### LUMA

The [README](https://github.com/zhoux77899/luma/blob/main/README.md) establishes the Cardputer ADV hardware target, Launcher, Settings, Notes, DOTS, and the shared SDL preview. The [PlatformIO configuration](https://github.com/zhoux77899/luma/blob/main/platformio.ini) establishes C++17, Arduino, ESP32-S3, and LittleFS. The [preview manifest](https://github.com/zhoux77899/luma/blob/main/tools/sdl-preview/vcpkg.json) establishes SDL2; the [documentation-site manifest](https://github.com/zhoux77899/luma/blob/main/site/package.json) establishes React, TypeScript, Vite, and Tailwind CSS.

The latest formal release checked was [v0.1.1](https://github.com/zhoux77899/luma/releases/tag/v0.1.1), published 2026-08-28, with firmware and desktop preview packages. Features described on `main` may postdate that release. This is firmware for one board, not a general operating system or hardware emulator. The [guide root](https://zhoux77899.github.io/luma/) returned HTTP 200. Language-specific deep links returned HTTP 404 in a direct request, so the site uses the guide root.

### Claude Code Insights

The [README](https://github.com/zhoux77899/claude-code-insights/blob/main/README.md) documents scheduled daily repository collection, JSON data, Markdown reports, and GitHub Pages deployment. The [UI README](https://github.com/zhoux77899/claude-code-insights/blob/main/ui/README.md) documents search, sorting, and star trends. The [UI manifest](https://github.com/zhoux77899/claude-code-insights/blob/main/ui/package.json) and [Python requirements](https://github.com/zhoux77899/claude-code-insights/blob/main/requirements.txt) support the displayed stack.

The [published site](https://zhoux77899.github.io/claude-code-insights/) returned HTTP 200. A daily workflow is configured; this does not guarantee that every scheduled run succeeds or that the index covers every plugin. No changing repository count, popularity claim, or star total is hardcoded on the personal site.

### Flawless

The [README](https://github.com/zhoux77899/flawless/blob/main/README.md) and [plugin manifest](https://github.com/zhoux77899/flawless/blob/main/.codex-plugin/plugin.json) establish portable agent skills and Claude Code/Codex plugin metadata. The current implementation centers on [readme-writing](https://github.com/zhoux77899/flawless/blob/main/skills/readme-writing/SKILL.md), with Python repository-analysis and README-validation helpers.

Planned maintenance and code-review skills are not described as implemented. No independent app, demo, usage metric, or improvement score is claimed.

### What to Eat

The [README](https://github.com/zhoux77899/what-to-eat/blob/main/README.md) describes bilingual ingredient inventory, food preferences, structured recommendations, consumption confirmation, and history. The [app manifest](https://github.com/zhoux77899/what-to-eat/blob/main/what-to-eat/package.json) establishes Next.js, TypeScript, Clerk, Neon Postgres, Drizzle, the OpenAI SDK, Vercel Blob, Vitest, and Playwright.

The MVP requires each user to supply an OpenAI developer API key. Source implementation does not prove that authenticated workflows were verified in production; the README says real authenticated browser E2E coverage remains pending. The [repository's published homepage](https://what-to-eat-eta-three.vercel.app) returned HTTP 200 and redirected to `/zh`. The personal site labels this link Website and makes no claim of a tested, signed-in demo.

### Kitsune Proxy

The [README](https://github.com/zhoux77899/kitsune-proxy/blob/main/README.md) establishes a local system-tray proxy, model-based routing, credential replacement, stream forwarding, YAML configuration, and reload behavior. The [Go manifest](https://github.com/zhoux77899/kitsune-proxy/blob/main/go.mod) establishes Go and the system-tray/YAML dependencies.

The latest formal release checked was [v0.1.4](https://github.com/zhoux77899/kitsune-proxy/releases/tag/v0.1.4), published 2026-07-30, with Windows, Linux, and macOS packages. The listener is restricted to `127.0.0.1`. There is no settings window, protocol conversion, public listener, automatic provider fallback, or implemented automatic updater. Upstream keys are stored in plaintext configuration; the macOS app is unsigned. Copy does not present the project as a cloud gateway.

## Upstream contributions

The [personal vllm-ascend repository metadata](https://api.github.com/repos/zhoux77899/vllm-ascend) reports `fork: true`, with [vllm-project/vllm-ascend](https://github.com/vllm-project/vllm-ascend) as both parent and source. It is presented separately as contributions to an upstream project, not an independently authored pinned project.

These public upstream PRs were rechecked on 2026-10-15 with the query `repo:vllm-project/vllm-ascend is:pr is:merged author:zhoux77899`. Artifacts under `.impeccable/` and `.tools/` are local ignored evidence, not published files. The complete saved response (`../.tools/pr-audit-20261015.json`) contains fifteen unique records in one page at per_page=100, with `incomplete_results=false`. Every record reports author `zhoux77899` and a merge timestamp. The [public author-and-merged query](https://github.com/vllm-project/vllm-ascend/pulls?q=is%3Apr+is%3Amerged+author%3Azhoux77899) provides the live source; this table preserves the exact titles from the dated response.

| Upstream title | PR | Merged on (UTC) |
| --- | --- | --- |
| [0.9.1][Feature] Support Qwen3 W4A8 quantization | [#1275](https://github.com/vllm-project/vllm-ascend/pull/1275) | 2025-06-21 |
| [CI/UT][BugFix] Fix sampling params | [#1423](https://github.com/vllm-project/vllm-ascend/pull/1423) | 2025-06-26 |
| [0.9.1][Bugfix] Fix unable to load `qwen3_moe` quantized weights | [#1832](https://github.com/vllm-project/vllm-ascend/pull/1832) | 2025-07-17 |
| [main][Feature] Support Qwen3 W4A8 quantization | [#2060](https://github.com/vllm-project/vllm-ascend/pull/2060) | 2025-07-30 |
| [main][Bugfix] Fix unable to load qwen3_moe quantized weights | [#2219](https://github.com/vllm-project/vllm-ascend/pull/2219) | 2025-08-06 |
| [main] Fuse GroupedMatmul, Swiglu and DynamicQuant in `W8A8_DYNAMIC` quantized MoE layers | [#2275](https://github.com/vllm-project/vllm-ascend/pull/2275) | 2025-09-04 |
| [1/N][Feat] Add weight prefetch feature for Attention layers | [#3146](https://github.com/vllm-project/vllm-ascend/pull/3146) | 2025-10-09 |
| [Bugfix] Fix weight prefetching `AssertionError` in W8A8 MTP scene | [#3361](https://github.com/vllm-project/vllm-ascend/pull/3361) | 2025-10-11 |
| [Feat] Prefetching Attention QKV Linear Weight With `AddRmsNormQuant` Custom Op | [#3517](https://github.com/vllm-project/vllm-ascend/pull/3517) | 2025-10-23 |
| [v0.11.0][Feat] Prefetching Attention QKV Linear Weight With `AddRmsNormQuant` Custom Op | [#3649](https://github.com/vllm-project/vllm-ascend/pull/3649) | 2025-10-27 |
| [Feat] Support native Kimi-K2-Thinking native W4A16 quantized experts weights | [#4516](https://github.com/vllm-project/vllm-ascend/pull/4516) | 2025-12-10 |
| [BugFix][Worker] Align encoder ACL graph with vLLM main encoder cudagraph API | [#10712](https://github.com/vllm-project/vllm-ascend/pull/10712) | 2026-06-23 |
| [BugFix][Worker] Fix padded sequence length handling for ViT encoder ACL graph | [#10824](https://github.com/vllm-project/vllm-ascend/pull/10824) | 2026-07-13 |
| [Refactor][Ops] Refactor multi-modal encoder attention sequence length handling | [#12084](https://github.com/vllm-project/vllm-ascend/pull/12084) | 2026-07-20 |
| [Cherry-pick][releases/v0.24.0rc][Refactor][Ops] Refactor multi-modal encoder attention sequence length handling (from #12084) | [#12409](https://github.com/vllm-project/vllm-ascend/pull/12409) | 2026-07-20 |

All fifteen merged PRs appear in numerical order with upstream Source separately identified, including release-branch and cherry-pick work. They remain fifteen PR records rather than fifteen independent feature claims. This supersedes the 2026-10-14 presentation of #2275, #4516, and #10712 plus #12084 under a details disclosure.

Performance percentages are omitted because their PR-specific model, hardware, and configuration context would be lost in a short portfolio description. At the 2026-10-13 snapshot, [#5288](https://github.com/vllm-project/vllm-ascend/pull/5288) reported `merged: false`; it is absent from the refreshed merged-PR result and is not presented as merged work.

## Skills and visual boundaries

Skills list technologies evidenced by the displayed projects. Each `projects` value refers to one of the six project IDs; these relationships are not proficiency scores. React and TypeScript in LUMA refer to its documentation site, not firmware code. vLLM and Ascend work is covered in the contributions section. The 2026-10-15 regrouping retains all twenty-two technologies and existing project associations across five categories: AI infrastructure & agents (vLLM, Ascend NPU, PyTorch, OpenAI API, Agent skills, HTTP & SSE); Scientific computing (Python, NumPy & SciPy); Systems & embedded; Web & data; Development tools. No proficiency or new capability is inferred from this organization.

Project links display Source, Releases, and Website, in that order, with distinct GitHub, package, and globe icons. The retained LUMA User guide and Claude Code Insights Explore destinations are labeled Website in the rendered cards; URLs and source boundaries are unchanged. Six canonical carousel cards carry the real links and unique hashes; four inert static copies support the loop without adding another project or interactive destination. Conditional six-second rotation and native scrolling change selection without writing history. Pause/Start, interaction suspension, and reduced motion preserve user control.

BoardUI Primary actions and the official underline Tabs and Carousel source are attributed in [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md). Monochrome social/contact adapters and technology marks use the asset origins, exact revisions, licenses, and SHA-256 manifest linked from [public/brand-icons/SOURCES.md](../public/brand-icons/SOURCES.md). Contact marks are beside their titles, and project references use the GitHub mark. These marks identify factual destinations or technologies, not sponsors. Original SDL2 and Playwright assets retain their contours and lettering; SDL2 adds dark-theme grayscale/inversion for readability.

Project and travel visuals are illustrations identified by `visualId`. They are not application screenshots, microscopy results, hardware photographs, or the owner's travel photos. Stock photos are not used as evidence. Public repository logos and documented UI screenshots can be checked separately if future visual edits need them; diagrammatic visuals must not invent measurements or completed features.

## Country grouping and illustration request

The 2026-10-14 implementation groups the retained travel records under three countries at the user's request. This section records that instruction and the local content mapping; it does not report another external source fetch or refresh the 2026-10-13 repository snapshot above.

| Country | Retained or requested context | Date boundary |
| --- | --- | --- |
| New Zealand | Retained South Island record; the user requested a New Zealand landscape with an SUV. | Retained 2025. No route was inferred from the drawing. |
| Japan | Retained Honshu and Kyushu records; the user requested a Japanese city/platform with a train. | Honshu remains 2018-2022 and Kyushu remains 2021 as separate records. |
| China | The user requested a Jiangnan garden associated with Suzhou and Nanjing. | No China visit year was supplied or inferred. |

Country headings are plain names with retained anchor IDs. Visible city/region labels and lists are hidden; source locations remain in `src/lib/data.ts`. New Zealand displays 2025, Japan displays the known 2018–2022 span, and China stays undated. Kyushu's 2021 record remains distinct locally within that Japan span.

The former New Zealand and two Japan travel hashes remain aliases of their country groups. The statistics row is removed, so earlier count data does not create a new claim about country totals, trips, or duration. The three scenes are geometric impressions, not photographs or evidence of a specific route. The existing project descriptions, project order, source links, background records, and public profile destinations keep their previously recorded provenance. The 2026-10-15 revision adds three English paragraphs describing the existing illustrated scenes: a mountain/coastal road, city railway rhythm, and a quiet garden. These are scene observations without first-person incidents, new travel dates, routes, or personal history. Only the moving SUV, train, and lattice shutters use the shared semantic accent; that visual treatment adds no source claim. Current layout and verification are recorded in [surface-home.md](surface-home.md) and `../.impeccable/review-v3/qa.md`. The prior reviews remain historical evidence in `.impeccable/review` and `.impeccable/review-v2`.
