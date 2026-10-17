---
name: "zhoux77899's personal site"
description: "A warm personal dossier with a precision exploration case."
colors:
  background: "oklch(0.98 0.01 93.48)"
  foreground: "oklch(0.34 0.03 94.42)"
  surface: "oklch(0.95 0.01 91.46)"
  accent: "oklch(.57 .14 39.15)"
  accent-foreground: "oklch(1 0 0)"
  accent-soft: "oklch(0.92 0.01 87.42)"
  accent-soft-foreground: "oklch(0.27 0.02 99.70)"
  sage: "oklch(0.51 0.03 148.51)"
  muted: "oklch(.48 .02 94)"
  border: "oklch(0.91 0.01 106.47)"
  dark-background: "oklch(0.27 0 0)"
  dark-foreground: "oklch(0.81 0.01 93.53)"
  dark-surface: "oklch(0.22 0 0)"
  dark-accent: "oklch(.72 .12 39)"
  dark-accent-foreground: "oklch(0.22 0 0)"
  dark-accent-soft: "oklch(0.3 0.01 88.79)"
  dark-accent-soft-foreground: "oklch(0.97 0.01 93.49)"
  dark-sage: "oklch(0.62 0.03 148.70)"
  dark-sage-soft: "oklch(0.3 0.02 148.70)"
  dark-muted: "oklch(.74 .01 94)"
  dark-border: "oklch(0.4 0.01 106.85)"
  anatomy-top: "#fffef8"
  anatomy-shade-0: "#dddcd4"
  anatomy-shade-1: "#e6e5dd"
  anatomy-shade-2: "#eeede5"
  anatomy-shade-3: "#f5f4ec"
  dark-anatomy-top: "#34352f"
  dark-anatomy-shade-0: "#1c1d1a"
  dark-anatomy-shade-1: "#22231f"
  dark-anatomy-shade-2: "#292a25"
  dark-anatomy-shade-3: "#30312b"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(30px, 6vw, 64px)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-.035em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3vw, 2.8rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-.035em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(24px, 2.4vw, 30px)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-.025em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: "20px"
  mono:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, Liberation Mono, monospace"
rounded:
  md: "6px"
  lg: "8px"
  2lg: "10px"
  xl: "12px"
  card: "14px"
spacing:
  tag-gap: "6px"
  action-gap: "12px"
  panel-inset: "18px"
  card-inset: "28px"
  heading-gap: "30px"
  section: "86px"
  section-mobile: "58px"
components:
  hero-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.xl}"
    padding: "12px 22px"
    height: "46px"
  navigation-active:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.accent-soft-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "8px 12px"
  technology-tag:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "3px 7px"
  project-card:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.card}"
    padding: "28px"
  explorer-trigger:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-foreground}"
    rounded: "{rounded.xl}"
    padding: "4px 14px 4px 6px"
    height: "48px"
  skill-tab:
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
    padding: "10px 0"
    height: "48px"
  skill-tab-selected:
    textColor: "{colors.accent}"
    typography: "{typography.label}"
---

# Design System: zhoux77899's personal site

## Overview

**Creative North Star: "Precision exploration case"**

A warm personal dossier gives research, tools, small devices, and travel room to coexist. Ivory and charcoal grounds, one warm-orange-to-sage gradient for emphasized identity and buttons, sage links, and self-hosted Geist carry the existing identity. The precision case makes that identity tangible through solid parts, visible joints, four-tone shading, and a complete drawing frame.

The interface keeps its text and links plain. Navigation objects preview a destination before a real anchor commits it; decorative drawings respond locally to the pointer. Motion settles when input stops, pauses outside the visible page, and resolves immediately when reduced motion is requested. The centered six-project carousel spans the viewport and suspends its six-second rotation for interaction. Country impressions reserve terracotta for their moving objects.

**Key Characteristics:**

- Warm semantic colors shared by both themes.
- Geist for identity, reading, and interface labels.
- Physical SVG geometry with a complete 5:4 frame.
- Real anchors, native scrolling, and visible keyboard focus.

The YAML frontmatter records the implemented tokens. Color values follow the final overrides in `src/styles/globals.css`; Anatomy tones come from `src/styles/anatomy.css`. The schemaVersion 2 sidecar extends these tokens with motion, elevation, responsive metadata, and five rendered component examples. The final 2026-10-17 user clarification adds one shared two-color brand gradient, stronger entrances, a single-face menu button matching the theme control's outer height, carousel recovery fixes, and the physical refrigerator door. Its surface contract and completed verification live in `docs/surface-home.md`; the 2026-10-16 results and `.impeccable/review-v3/qa.md` describe their dated historical revisions.

## Colors

### Primary

Primary is the site's warm orange (`accent`), confirmed by the user on 2026-10-17. It is the first endpoint of the shared brand gradient, and carries focus, active case geometry, selected tabs, the active carousel border and pill, project highlight edges, country dividers in the viewport reading area, and the moving SUV, train, and lattice shutters. Theme-specific foregrounds keep filled actions legible. Soft accent surfaces use `accent-soft-foreground` for selected navigation text.

### Secondary

Secondary is sage, confirmed alongside Primary on 2026-10-17. It is the second endpoint of the same shared brand gradient. `Get in touch` remains semantically Secondary while other filled actions remain Primary; the variants have the same visual gradient. Sage also carries project and contribution links and retained background place metadata. Technology tags use the neutral surface in light mode and the existing sage-soft surface in dark mode. Social and contact marks inherit foreground ink beside their destination labels. The explicit identity-gradient request supersedes the earlier prohibition on gradient lettering.

**The shared brand gradient.** All emphasized `zhoux77899` lettering and buttons use one 135-degree gradient from Primary warm orange to Secondary sage. Identity text and both button variants alias the same default; button hover and active states also share their respective treatments. Do not split this into separate orange and sage gradients for the two action variants.

### Neutral

Ivory page and surface tokens separate the reading grounds in light mode; charcoal page and surface tokens do the same in dark mode. Foreground provides reading ink, muted supports secondary copy, and border divides rows and card edges. Anatomy has a top face and four stepped side tones per theme; active edges and mixed faces derive from terracotta. Original SDL and Playwright images use grayscale; SDL adds inversion only in dark mode to preserve its internal lettering.

**The shared palette rule.** Bind UI states to the semantic palette. Hairline fills inherit their containing ground and resting contours use monochrome theme ink. Project highlight edges use the shared accent. Among country scene parts, only the moving SUV, train, and lattice shutters use that accent. All twelve light/dark project previews were regenerated from the complete live theme cascade and passed the pure Happy DOM/VM exporter checks.

## Typography

Geist is the self-hosted display and body family. Geist Mono is reserved for genuine code. The implementation retains the system and emoji fallback stacks from the shared typography foundation.

The display role names the person; the headline role introduces sections; the title role labels project cards. Body copy uses comfortable line spacing and measured text widths: the hero biography and background descriptions have a maximum width of 65ch, and section introductions use 62ch. Interface labels use the smaller Geist ramp rather than decorative lettering.

The hero name uses the same display clamp at every size, with the avatar matching its line-box height. Its role uses a smaller clamp (17px to 23px). Section headings become 34px on phones; project titles become 24px. The hero biography is 16px with 1.6 line height, then 15px on phones. Compact project summaries are 17px with 1.55 line height, then 16px below the desktop navigation breakpoint; supporting detail is 14px with 1.7 line height, then 13px with 1.65 line height on phones.

**The reading hierarchy rule.** Keep identity, section titles, summaries, and supporting details visually distinct. Use sentence case for interface copy and keep code typography out of prose.

## Layout

The shared container is capped at 1280px with 48px desktop side margins, 32px below 1024px, and 20px below 768px. Sections use the documented section spacing; phone sections use its mobile counterpart. The fixed header is 64px tall, then 56px below 1024px. The menu button and theme control share a 32px outer height and omit shadows. The menu is a single full-height Primary-variant gradient face with no extra outer container, border, or padding and an 8px radius. The theme control retains its 32px track, 4px inset, and 24px inner face. Anchor offsets and viewport visibility thresholds follow the actual header height.

The homepage uses one centered axis at every size: the greeting `Hi there, I'm`, identity and role, the complete case, then biography, actions, and social links. The real avatar matches the name's display line box. Center the complete composition within the small viewport height remaining below the header. Scale the case with both viewport dimensions up to 800px wide, retaining the complete object and projected hotspots. Short, narrow, or zoomed displays extend vertically in normal document flow without clipping. The precise framing and first-viewport contract live in `docs/surface-home.md`.

Projects use the official BoardUI Carousel source with native horizontal scroll snapping, a centered current card, and neighboring cards visible on both sides. The track spans the full available viewport width without introducing page overflow; its heading and contribution list keep the shared content cap. The former orange top rule is removed. Cards occupy `min(82%, 960px)` on desktop and 82% below 1024px; gaps step from 24px to 20px to 14px on phones. Six canonical cards retain unique IDs and interactive art; two static copies at each end support looping and rebase to the canonical card after settling. Copies retain inert descendants and add no duplicate IDs, source links, or keyboard destinations; the track maps clicks on their visible neighboring area to logical selection. Desktop cards put art beside compact copy in a two-column interior; below 1024px they stack the full 5:4 art above copy, capped at 280px, then 240px on phones. Padding steps from 28px to 24px to 20px.

Country cards use three columns, then one column below 768px. Background and contact also become single-column sequences. Upstream PRs #4516, #2275, and #10712 appear first; a native disclosure contains the remaining twelve in numerical order, with Source separate. Publications use an open bibliography list between Background and Travel, ordered by descending year. Five skill categories use a horizontally scrollable underline tab strip; technology entries step from three columns to two below 1024px, then one below 480px. Long names wrap within their container.

## Elevation & Depth

Page sections and project cards use tonal grounds and borders. Filled action treatments follow the shared BoardUI foundations; menu and theme controls deliberately omit shadows. The mobile modal uses the existing larger shadow. The Explore popover uses a diffuse raised shadow; focused or hovered hotspots reveal small labeled tooltips. The Anatomy case gets its depth from true solid SVG parts, four-tone surfaces, occlusion, and an audited painter's order. Its soft ground halo supports the physical object.

**The physical depth rule.** Draw complete solids and keep their visible joints connected. Preserve the audited order throughout the bounded module lifts; do not substitute translated flat groups for physical surfaces.

## Shapes

Interface corners use the established small radius scale: tags and theme segments, navigation items, buttons, and cards each retain their observed shape. Fine borders and open chronological rows carry most page structure.

Hairline drawings keep the 400 by 320 viewBox, rounded outer silhouettes, quieter interior creases, and one active edge. The Anatomy case retains its original 800 by 640 projection and 113 solids. The Hero frames it through a 650 by 520 crop at (75,65), removing empty projection margins while retaining the whole object; standalone art and the Explore popover retain the original frame. All frames have a 5:4 ratio. Static light and dark previews export actual geometry with matching framing and theme colors.

The real avatar stays intact. Generated layout comps and earlier transformer images are reference material only. Asset provenance and MIT/OFL notices remain in `THIRD_PARTY_NOTICES.md`; Anatomy ships its license at `public/anatomy/LICENSE.txt`. Brand origins, exact revisions, licenses, and hashes are linked from `public/brand-icons/SOURCES.md`. The unchanged Hairline engine is `public/hairline/kernel.js`, SHA-256 `1F814FC836B14B181C6437CBD1DC02551913467B66698A673A0888EF1710D229`.

## Components

### Actions and theme selection

Action buttons and emphasized identity lettering use the same 135-degree Primary-warm-orange-to-Secondary-sage brand gradient. `Get in touch` remains a semantic Secondary action and the others Primary, with identical default gradient aliases and shared button hover/active treatments. Both Hero links omit icons, with 46px minimum height, then 44px on phones. The Explore trigger includes an actual-geometry thumbnail. The dock close action has a 44px target and accessible name. There is no gallery Pause/Start control. The mobile menu directly reuses a full 32px Primary-variant gradient face with an 8px radius, zero border, zero padding, and no extra frame or shadow. It matches the theme control's outer 32px height; only the theme control retains a 4px inset and 24px inner face. Press motion scales actions to 0.98 and respects reduced motion. Keep theme choices, underline tabs, and carousel indicators in their specialized semantic treatments.

The theme control has light, dark, and system options. A tonal track holds a selected thumb; arrow keys move focus and Space or Enter selects. Theme selection remains usable when storage is unavailable.

### Navigation and exploration case

The fixed navigation marks the active section with soft accent and its paired foreground. Below 1024px, the existing React Aria modal handles Escape, focus return, and page scroll locking. Real hash links remain available throughout the page. `#publications` appears in desktop navigation, the mobile menu, footer, and scroll-based section detection; it has no Explorer destination and adds no seventh physical hotspot.

The case maps its workstation, terminal, optical instrument, folio, map, and connection panel to Projects, Stack, Background, Open source, Travel, and Contact. Its six physical hotspots are real keyboard-accessible anchors; arrow keys and Home/End move among them, and Enter or Space commits navigation. Pointer hover and keyboard focus preview module lift without changing selection or the URL. A small destination label appears only during hover or visible keyboard focus; there is no persistent caption, readout, or text navigation. The eight-second idle tour previews objects without committing a destination and stops for user input, reduced motion, hidden pages, or an offscreen case. Loading failure retains static actual-geometry art and targets derived from the same projected module geometry.

When the main case leaves the viewport, a lower-left Explore trigger opens a React Aria popover containing the same interactive case and six physical navigation hotspots. Navigation, the close action, or Escape closes it and restores focus. A static theme preview provides its thumbnail.

### Project gallery and tags

Six dot indicators and gallery arrow/Home/End keys select cards; page arrows are absent. The active dot extends into a short terracotta pill. The carousel advances every six seconds only while at least 35% visible and the document is visible, retaining native smooth scrolling. Hover, keyboard focus, touch or pointer gestures, and reduced motion suspend rotation. The removed Pause/Start control has no retained dedicated state. Manual navigation restarts the idle interval. Automatic rotation and native horizontal scrolling update shared selection without adding history or changing the hash. Real project hashes and browser Back restore the target card. Dimension observation realigns the latest selected card after resizing while preserving valid settle callbacks; a same-project hash interrupt accepts either centered equivalent copy or canonical card before completing the request. The 2026-10-17 correction addresses permanent suspension rather than changing slide speed: settling just short of an exact requested position must clear the pending request, and hidden-page/window-blur recovery releases a pressed pointer if pointerup was lost.

Visible neighboring cards are click targets for logical selection, including canonical cards and static copies at the loop endpoints. Clicking an interactive descendant such as Source retains that link's normal behavior. Scrolling or dragging must not produce a card-selection click on release. Keep the selected card's Hairline input active; neighboring-card selection must not take over its drawing interaction.

Compact cards distinguish titles, factual summaries, supporting detail, and informational tags. Links normalize to Source, Releases, and Website in that order, with GitHub, package, and globe marks respectively. Upstream Source is separate from all fifteen merged PRs. Show #4516, #2275, and #10712 in that order, followed by a closed native disclosure labeled `12 more pull requests` containing the remaining records in numerical order, without duplicates. Tags list observed technologies; they do not express proficiency or scores.

### Publications and entrance motion

The bibliography displays complete titles, authors, journal volume/issue and page or article number, and DOI links. Xiang Zhou is emphasized in each author list. Two static records, from 2026 and 2017, are ordered newest first and deduplicated by normalized DOI from the public ORCID works record. A visible ORCID source link supports future editorial updates; the page makes no runtime ORCID request.

Hero identity, case, and introduction enter in sequence. Section headings, background rows, contributions, country cards, and publication rows each reveal once on entering the viewport. The default entrance is 32px over 650ms with easing `[0.25, 0.1, 0.25, 1]` and the retained 60ms group stagger. The Hero case has a scroll displacement bounded to 24px. A section hash exposes its heading immediately without bypassing every entrance inside the section; reduced motion and keyboard focus expose relevant content immediately without displacement or delay.

`Things I make` has a static entrance group that triggers all canonical and loop-copy card interiors once. Each artwork enters from 40px over 750ms; its copy enters from 32px over 650ms after 120ms. Carousel track, item, and article measurement layers never receive entrance transforms, preserving native-scroll measurements. Drawing-internal interaction remains separate.

### Skills and public destinations

Official BoardUI underline Tabs retain React Aria roving focus, automatic keyboard activation, and tab/panel association. The selected tab uses terracotta text and a 2px underline over the baseline; the categories keep their specialized tab semantics. The five groups are AI infrastructure & agents, Scientific computing, Systems & embedded, Web & data, and Development tools. All twenty-two technologies retain their marks and project associations. GitHub, X, and ORCID use the same monochrome vendor adapters in Hero and Contact; Contact places each mark beside the title at 1em.

### Decorative drawings and countries

Six project and three country Hairline illustrations show only the drawing stage. They add no Tab stops or visible sliders, readouts, rules, or object labels. Pointer input activates the local object; touch keeps `pan-x pan-y pinch-zoom`, rejects drag, multitouch, cancellation, and gallery movement, and activates only after a confirmed single tap. The unchanged engine settles idle geometry and sleeps while hidden or offscreen. Both-theme geometry previews remain available if interactive loading fails.

The refrigerator door opens to 165 degrees around its outer right-front hinge at `(81, 60)`. It spans z=7 through z=135, is 86 units wide, and has a true 4-unit thickness with a handle on the free edge. Geometry rather than a translated flat panel preserves its faces and occlusion throughout opening. The pure-geometry sweep passes all 279 states with zero cycles and a successful return to rest. Live browser review checked the door in both themes and confirmed its highlight color matches the shared accent. `public/hairline/kernel.js` and its recorded SHA-256 remain unchanged.

Country cards pair a drawn impression with a plain country heading that retains its anchor ID. Divider color is independent of selected country: it changes to terracotta inside the viewport reading area and returns to neutral on leaving. The three desktop columns change together; narrow stacked cards change as each reaches that area. Moving SUVs, trains, and lattice shutters inherit the site's accent while their stationary setting remains monochrome. Three English paragraphs describe the illustrated scenes through concrete poetic observations without adding first-person incidents or travel history. Visible city/region labels and lists are removed; New Zealand shows 2025, Japan shows 2018–2022, and China has no year. South Island, Honshu, Kyushu, and the requested Suzhou/Nanjing context remain in local source data. Earlier travel hashes remain valid aliases. Travel statistics are absent.

## Do's and Don'ts

### Do

- Do use the final semantic color tokens and their paired theme foregrounds.
- Do retain the complete object in a 5:4 drawing frame and match actual geometry, crop, and theme colors in fallbacks.
- Do keep real hash links, native gallery scrolling, keyboard focus, and reduced motion working together.
- Do preserve the real avatar, factual project copy, visit records, and public destinations.
- Do keep navigable Anatomy previews separate from committed selection and decorative Hairline input.

### Don't

- Don't modify the Hairline kernel or assign colors separately to individual figures; project highlight edges and country moving parts use the shared semantic accent.
- Don't turn the idle tour, hover preview, gallery scroll, or automatic rotation into a URL or history change.
- Don't add status badges, section numbers, decorative grids, or skill-score counters. Emphasized identity lettering and buttons share the single Primary-to-Secondary gradient explicitly requested on 2026-10-17.
- Don't present drawn impressions as application screenshots, research results, hardware photographs, or personal travel photos.
- Don't infer employers, outcomes, proficiency, private contact details, travel dates, or routes from illustrations.
