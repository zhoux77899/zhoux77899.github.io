# Home surface

Mode: Experience. The page introduces zhoux77899 through work, interests, background, and places. The 2026-10-15 eight-comment revision supersedes the previous Hero framing, no-autoplay carousel, combined AI/science category, and selected-PR disclosure. The earlier split hero, finite gallery, visible case legend, and linked country headings remain superseded.

## Direction contract

THESIS: A warm personal dossier and precision exploration case let research, tools, small devices, and travel coexist. Project descriptions follow observed facts and retained personal records.

OWN-WORLD: Warm ivory and charcoal grounds, terracotta actions, sage links, self-hosted Geist, solid four-tone Anatomy geometry, and decorative Hairline drawings with monochrome stationary geometry and accent-colored country moving parts.

STORY: Meet zhoux77899; explore six current projects and upstream work; see their tools, personal background, three country impressions, and public contact destinations.

FIRST VIEWPORT: A slim fixed navigation sits above one centered cover: identity and role, complete exploration case, then biography, actions, and social links. The real avatar matches the name's line-box height using the shared clamp (30px, 6vw, 64px). The entire composition fits the first viewport at the four verified sizes in both themes. Shorter or zoomed displays keep normal vertical flow. The visible mobile menu and theme control are both 32px tall.

FORM: The user approved the precision exploration toolbox implementation and documentation update, then supplied eight further annotated comments for this revision. The implementation preserves the incumbent warm personal dossier, real avatar, factual project order and copy, anonymous background, and public links. Six unique project cards form a centered looping BoardUI Carousel with native gestures, conditional six-second rotation, and Pause/Start. All fifteen merged upstream PRs are visible. Travel groups the retained records under plain New Zealand, Japan, and China headings and pairs them with three scene-based English paragraphs.

FINISH: SHIP. Current checks pass, the single detector pass is empty, and independent behavior review confirms the two autoplay corrections. The fresh full visual review accepted the remaining surface and requested one country fallback palette correction. The same reviewer scored that single correction resolved and retained the other full-review judgments. Artifacts under `.impeccable/` and `.tools/` are local ignored evidence, not published files. The authoritative current record is `../.impeccable/review-v3/qa.md`; earlier verdicts describe their earlier revisions.

## Reference interpretation

The three ImageGen layout comps in `.impeccable/mocks` remain historical layout references. Their generated project descriptions were factually wrong; content follows [content-sources.md](content-sources.md). They are not shipping media. The real avatar, system theme option, actual geometry, and final approved navigation/gallery behavior take precedence over comp placeholders.

## Exploration and navigation

The pure-SVG Anatomy case has 113 solid parts and six navigable objects:

| Object | Destination | Anchor |
| --- | --- | --- |
| Model workstation | Projects | `#projects` |
| Portable terminal | Stack | `#skills` |
| Optical instrument | Background | `#experience` |
| Workshop folio | Open source | `#vllm-ascend-work` |
| Map and compass | Travel | `#travel` |
| Connection panel | Contact | `#contact` |

The six physical hotspots are real keyboard-accessible anchors. Hover and keyboard focus preview the object and lift; a small destination label appears only on hover or visible focus. The persistent caption, readout, and text navigation are removed. Arrow keys and Home/End move through hotspots; Enter or Space commits navigation. Active art uses semantic terracotta. The eight-second idle tour previews one object at a time without changing shared selection, the URL, or history. User input takes over immediately. Hidden pages, offscreen state, and reduced motion stop the tour; reduced motion settles the selected pose immediately.

Once the case leaves the viewport, a lower-left Explore trigger opens a React Aria popover containing the same interactive case and six physical hotspots. Navigation, its close action, and Escape close it, with focus restored to the trigger. Theme-specific static SVGs preserve actual case geometry while interactive geometry loads or if loading fails; projected module metadata keeps all six targets effective in that fallback.

The Hero crops the original 800×640 projection to a 650×520 viewport at (75,65). This removes empty margins without changing physical geometry. The projected hotspots and static fallback use that same crop; standalone art and the Explore popover retain the original frame. The cover is at least 100svh tall. Art width is `min(100%, 620px, max(300px, (100svh - reserve) * 1.25))`, with reserve 380px and 430px below 480px. Top padding is 96px, then 92px below 768px; the centered gap is 12px, then 10px. Biography text is 16px/1.6, then 15px on phones. No content is clipped to force the viewport fit.

The header retains light, dark, and system themes, real section hashes, and its keyboard-accessible mobile modal. Escape, focus return, and page scroll locking remain in place. Project and country targets and the upstream contribution target use a 112px scroll margin.

## Project gallery

All six projects retain their facts, source links, and order: CFGAN, LUMA, Claude Code Insights, Flawless, What to Eat, and Kitsune Proxy. The official BoardUI Carousel source retains native horizontal scroll snapping and DOM measurements, extended with controlled selection and loop rebasing. One current card is centered with neighboring cards peeking on both sides at every settled state. Six canonical cards keep unique IDs, links, and interactive art. Two static copies at each end are inert, hidden from assistive technology, and contain no duplicate IDs or links. Each drawing keeps its complete 5:4 frame.

Six dots with an active short pill and ArrowLeft/ArrowRight/Home/End work on the focusable carousel. Page arrows are removed. A 44px Pause/Start control governs six-second automatic rotation. Rotation requires at least 35% gallery visibility and a visible document, and pauses for hover, keyboard focus, pointer gestures, reduced motion, or explicit Pause. Start resumes only when the other conditions allow it; its focus exemption is cleared on blur. Manual navigation restarts the idle interval. Existing `#project-*` targets remain on canonical headings; skills references and browser Back restore the linked project. Native scrolling and automatic rotation update selection without changing the hash or adding history. A ResizeObserver uses gallery-local offsets and realigns the latest selection without discarding a valid settle callback. A same-project hash interrupt can settle at an equivalent copy or canonical card before clearing the pending request.

Cards use compact two-column interiors on desktop, with art above copy below 1024px. Titles, factual summaries, supporting detail, and technology tags remain distinct. Links normalize to Source, Releases, and Website, ordered with GitHub, package, and globe icons. Contributions remain separate from the six owned projects. Upstream Source stands above all fifteen verified merged PRs in numerical order; the list uses two columns on desktop and one on phones. Release-branch and cherry-pick changes remain visible, without a disclosure.

## Actions, skills, and public destinations

BoardUI Primary action buttons share the terracotta vertical gradient across default, hover, and active states. Both Hero CTAs omit icons. Theme choices, underline tabs, and carousel indicators keep their specialized semantic treatments.

Skills use the official BoardUI underline Tabs implementation, preserving React Aria roving keyboard focus, automatic activation, and associated panels. All twenty-two technologies retain their corresponding marks and project associations across five groups: AI infrastructure & agents; Scientific computing; Systems & embedded; Web & data; Development tools. The AI group contains vLLM, Ascend NPU, PyTorch, OpenAI API, Agent skills, and HTTP & SSE; Scientific computing contains Python and NumPy & SciPy. Project and contribution references use GitHub marks. Hero and Contact share monochrome GitHub, X, and ORCID vendor adapters. Contact marks sit beside the title at 1em. Source assets, exact revisions, licenses, and hashes are recorded in [public/brand-icons/SOURCES.md](../public/brand-icons/SOURCES.md).

## Decorative drawings and countries

The current page has nine decorative Hairline drawings: six project objects and three country scenes. All share the unchanged `public/hairline/kernel.js`; the original bench pages remain QA artifacts under `.tools/hairline`. Site drawings show only the stage, without sliders, readouts, rules, names, or extra Tab stops. Light/dark rest exports come from the same geometry as the interactive drawing.

Pointer input activates local geometry. Touch preserves horizontal and vertical panning plus pinch zoom. Dragging, multitouch, cancellation, or gallery movement cannot activate a part; only a confirmed single tap can. The kernel settles idle motion, sleeps hidden/offscreen, and resolves immediately under reduced motion.

CFGAN uses a model workstation with a contraction/expansion sequence, specimen carriers, and a verification platen. Refrigerator shelves, food, walls, and front frame keep physical ordering throughout extraction. New Zealand has alpine and coastal forms with an SUV; Japan has a city/platform and commuter train; China has a Jiangnan garden with pavilion, moon gate, pond, and opening lattice shutters. Only the moving SUV, train, and shutters use the shared accent. Their opaque faces and painter's order remain intact; stationary geometry stays monochrome. The six country exports must derive the final applicable theme cascade, including later accent overrides. These are illustrated impressions, not research results, hardware photographs, or personal travel photos.

Travel has three country cards with plain headings and retained `#travel-new-zealand`, `#travel-japan`, and `#travel-china` IDs. Visible city/region labels and lists are removed. New Zealand displays 2025; Japan displays 2018–2022; China displays no year. South Island, distinct Honshu (2018–2022) and Kyushu (2021) records, and the user-requested Suzhou/Nanjing garden setting remain in local data. Earlier `#travel-1`, `#travel-2`, and `#travel-3` links still resolve to their retained country groups. The travel statistics row is removed.

Each country has a distinct English paragraph: mountain/coastal road and slower pace; railway platform and everyday city rhythm; garden path, moon gate, water, and lattice window. The language describes the scene without first-person travel incidents, new routes, dates, or personal history.

## Current verification

Date: 2026-10-15, Asia/Hong_Kong. After two autoplay corrections, `bun run check` passed with exit code 0: TypeScript, ESLint, 68 tests with 410 assertions, and the production build. This run contains no React `act` scheduling warning. The single mechanical detector pass returned an empty list. Current outputs and runtime evidence are linked from `../.impeccable/review-v3/qa.md`.

Light and dark captures cover 1440×900, 768×1024, 623×690, and 390×844. All eight exact-size Hero images show the complete object, biography, actions, and socials within the first viewport; measurements show no horizontal page overflow and matching 32px visible menu/theme controls. Actual current-viewport captures cover country art, gallery controls, all fifteen PRs, and all five tabs in both themes. Shorter or zoomed displays may extend vertically.

Full-page images are layout helpers only because offscreen Hairline iframe content may remain unpainted in that capture mode. Drawing content and color are judged from the eight exact Hero images, twelve actual country/tab viewports, and standalone palette/motion sheets; an actual desktop carousel viewport is also retained. The first misplaced origin-clipped section captures were replaced; obsolete carousel clips and the original same-index timing samples do not establish autoplay progress. The fresh autoplay confirmation (`../.impeccable/review-v3/autoplay-confirmation.json`) observed the selected index advance from 3 to 1 over 22.5 seconds with the visible page and gallery, while the hash stayed `#projects`. The final pause confirmation (`../.impeccable/review-v3/pause-confirmation-final.json`) retained the same React Aria identity, selected index 2, hash, and Start control over 44.2 seconds after Pause. Controlled visibility, focus, gestures, history, and resize behavior are also covered by regressions and independent behavior review.

The GitHub author-and-merged query returned fifteen unique PRs in one complete page, all with author `zhoux77899` and a merge timestamp. The retained audit response (`../.tools/pr-audit-20261015.json`) establishes completeness for this snapshot; [content-sources.md](content-sources.md) lists their exact titles and source URLs.

The [Anatomy audit](../public/anatomy/audit.json) records 113 solids, 581 depth states, 159 replayed 60fps frames, 285,097 overlap samples, and 541 ordering rules, with zero native geometry failures. This revision changes Hero framing and matching fallback targets, not physical parts. Prior [line checks](../scripts/anatomy/verification.json) found zero floating ends among 92 ends on 72 lines in both themes and live hover/keyboard poses, and remain evidence for the unchanged geometry. The build and browser share the `followLift` model; the bounded pose grid and recorded takeover paths do not enumerate every possible future input sequence.

All nine current Hairline drawings retain the original skill's successful build, validate, and look checks for unchanged geometry. Prior normal and reduced-motion suites cover rest, movement, maximum displacement, return, visibility, and disposal. Project details are in projects-v3/qa-summary.md (`../.tools/hairline/projects-v3/qa-summary.md`) and project-behavior-report.json (`../.tools/hairline/projects-v3/project-behavior-report.json`); the refrigerator's 279-state ordering sweep is in fridge-depth-report.json (`../.tools/hairline/projects-v3/fridge-depth-report.json`). The current country palette/export and motion record is countries-accent-v4/qa.md (`../.tools/hairline/countries-accent-v4/qa.md`). All six exports now use the final applicable light/dark accent values; the record retains the localized-motion limits.

Automated coverage also exercises touch gesture rejection and confirmed taps, loading failure, projected fallback hotspots, Explore navigation/Escape/focus restoration, StrictMode cleanup, offscreen/hidden loops, the idle tour, carousel keyboard behavior, and reduced motion. Physical touchscreen hardware and authenticated external application flows were not exercised. This revision did not add a separate OS-level reduced-motion screenshot sweep.

## Current finish verdict

SHIP. Independent behavior review scored both autoplay corrections resolved after reproducing the defects and checking regressions that failed before the fixes and passed afterward. The fresh full visual review accepted the cover, controls, all merged PRs, five groups, live country colors, and travel prose; its sole material request was regeneration of six country fallbacks from the complete theme cascade. After all six exports were corrected, the same reviewer scored that asset fix resolved and returned SHIP while retaining the other full-review judgments. This verdict pass scores the one asset correction; it does not claim a second complete review or exhaustive interaction coverage. The current gate and review scope are recorded in qa.md (`../.impeccable/review-v3/qa.md`).

## History

The 2026-10-14 nineteen-comment revision centered the Hero and made the gallery loop with native gestures but no autoplay. It showed three selected upstream PRs and one additional PR in a details disclosure, and combined AI and scientific computing in one category. Its check passed 63 tests and 326 assertions with one non-failing React `act` warning. Its full review resolved the same-project hash interrupt and dark SDL2 readability, then returned `ship` for those fixes. Those records remain in `../.impeccable/review-v2/qa.md` and finish-review.md (`../.impeccable/review-v2/finish-review.md`). The 2026-10-15 contract supersedes that narrower Hero frame, gallery rotation policy, category grouping, and PR presentation.

The previous toolbox/gallery implementation used a split desktop hero, visible case caption and text links, a finite gallery aligned at its edge, and linked country headings. Its 57-test/236-assertion check and 22-image finish review remain in `../.impeccable/review/qa.md`. That review resolved a resize/selection mismatch through dimension observation and local offsets, then returned `ship` for the prior surface. Its geometry checks remain applicable; its composition and finite-gallery behavior are superseded by the current user-directed contract.

The initial warm personal dossier used open project rows and ten Hairline drawings, including the hero exploration box. Concept seed `54fd05b3` was run. Layout comp A was recommended and used when the choice interface returned no answer; that historical choice is not recorded as explicit user approval. The later approved toolbox/gallery direction above is the current contract.

The first implementation passed TypeScript, ESLint, 30 tests, and a production build. Browser checks at 1440x900, 768x1024, and 375x812 covered themes, category filtering, real anchors, mobile-menu Escape/focus return, page scroll lock, and pointer response. Its finish review resolved light-theme small-text state contrast and contribution-anchor overlap: selected navigation used accent-soft-foreground, link hover used foreground with underline, and the contribution target received a 112px margin. Those choices remain in the final implementation.

The subsequent ten-figure precision redraw compared the geometry with the official Hairline gallery and public MIT source. It improved keycap profiles, patch jacks and cables, thick index cards and folio leaves, the exploration box, microscope support, smooth food hulls, and landscape surfaces. The independent reviewer requested three material fixes, then confirmed all ten figures ready after the visible module surface, microscope support leg, and eggs/fruit hulls were repaired. Its separate reduced-motion suite passed all ten drawings. Some local gestures had less thumbnail ink movement than large exploded objects; those advisories remain in the v2 QA artifacts.

That historical ten-figure approval describes the earlier set. Current geometry, behavior, counts, and the final independent verdict are recorded in the current sections above.
