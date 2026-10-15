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

A warm personal dossier gives research, tools, small devices, and travel room to coexist. Ivory and charcoal grounds, terracotta actions, sage links, and self-hosted Geist carry the existing identity. The precision case makes that identity tangible through solid parts, visible joints, four-tone shading, and a complete drawing frame.

The interface keeps its text and links plain. Navigation objects preview a destination before a real anchor commits it; decorative drawings respond locally to the pointer. Motion settles when input stops, pauses outside the visible page, and resolves immediately when reduced motion is requested. The centered six-project carousel offers a visible pause control and suspends rotation for interaction. Country impressions reserve terracotta for their moving objects.

**Key Characteristics:**

- Warm semantic colors shared by both themes.
- Geist for identity, reading, and interface labels.
- Physical SVG geometry with a complete 5:4 frame.
- Real anchors, native scrolling, and visible keyboard focus.

The YAML frontmatter records the implemented tokens. Color values follow the final overrides in `src/styles/globals.css`; Anatomy tones come from `src/styles/anatomy.css`. The schemaVersion 2 sidecar extends these tokens with motion, elevation, responsive metadata, and five rendered component examples. The 2026-10-15 user-directed revision merges the approved implementation into this system; its surface contract and current verification live in `docs/surface-home.md` and `.impeccable/review-v3/qa.md`. Earlier reviews remain historical records.

## Colors

### Primary

Terracotta (`accent`) carries the name, primary actions, focus, active case geometry, selected tabs, the active carousel border and pill, selected country borders, and the moving SUV, train, and lattice shutters. Its theme-specific foreground keeps filled actions legible. BoardUI Primary actions apply a vertical semantic gradient across default, hover, and active states; the sidecar records the complete treatment. Soft accent surfaces use `accent-soft-foreground` for selected navigation text.

### Secondary

Sage carries project and contribution links and retained background place metadata. Technology tags use the neutral surface in light mode and the existing sage-soft surface in dark mode. Social and contact marks inherit foreground ink beside their destination labels.

### Neutral

Ivory page and surface tokens separate the reading grounds in light mode; charcoal page and surface tokens do the same in dark mode. Foreground provides reading ink, muted supports secondary copy, and border divides rows and card edges. Anatomy has a top face and four stepped side tones per theme; active edges and mixed faces derive from terracotta. Original SDL and Playwright images use grayscale; SDL adds inversion only in dark mode to preserve its internal lettering.

**The shared palette rule.** Bind UI states to the semantic palette. Hairline fills inherit their containing ground and stationary geometry uses monochrome theme ink. Only the moving country SUV, train, and lattice shutters use the shared semantic accent; exports follow the complete applicable theme cascade.

## Typography

Geist is the self-hosted display and body family. Geist Mono is reserved for genuine code. The implementation retains the system and emoji fallback stacks from the shared typography foundation.

The display role names the person; the headline role introduces sections; the title role labels project cards. Body copy uses comfortable line spacing and measured text widths: the hero biography and background descriptions have a maximum width of 65ch, and section introductions use 62ch. Interface labels use the smaller Geist ramp rather than decorative lettering.

The hero name uses the same display clamp at every size, with the avatar matching its line-box height. Its role uses a smaller clamp (17px to 23px). Section headings become 34px on phones; project titles become 24px. The hero biography is 16px with 1.6 line height, then 15px on phones. Compact project summaries are 17px with 1.55 line height, then 16px below the desktop navigation breakpoint; supporting detail is 14px with 1.7 line height, then 13px with 1.65 line height on phones.

**The reading hierarchy rule.** Keep identity, section titles, summaries, and supporting details visually distinct. Use sentence case for interface copy and keep code typography out of prose.

## Layout

The shared container is capped at 1280px with 48px desktop side margins, 32px below 1024px, and 20px below 768px. Sections use the documented section spacing; phone sections use its mobile counterpart. A fixed header has an 80px content height. Section targets retain their scroll margin, with 112px for project, country, and upstream contribution targets.

The homepage uses one centered axis at every size: identity and role, the complete case, then biography, actions, and social links. The real avatar matches the name's display line box. The cover has a minimum height of 100svh. Its art width is the minimum of 100%, 620px, and the larger of 300px or `(100svh - reserve) * 1.25`; reserve is 380px, increasing to 430px below 480px. Top padding is 96px, then 92px on phones; the centered grid gap is 12px, then 10px on phones. Short or zoomed displays extend vertically in normal document flow. The precise framing and first-viewport contract live in `docs/surface-home.md`.

Projects use the official BoardUI Carousel source with native horizontal scroll snapping, a centered current card, and neighboring cards visible on both sides. Cards occupy `min(82%, 960px)` on desktop and 82% below 1024px; gaps step from 24px to 20px to 14px on phones. Six canonical cards retain unique IDs and interactive art; two inert static copies at each end support looping and rebase to the canonical card after settling. Desktop cards put art beside compact copy in a two-column interior; below 1024px they stack the full 5:4 art above copy, capped at 280px, then 240px on phones. Padding steps from 28px to 24px to 20px.

Country cards use three columns, then one column below 768px. Background and contact also become single-column sequences. The fifteen upstream PRs form two columns, then one on phones, with Source separate. Five skill categories use a horizontally scrollable underline tab strip; technology entries step from three columns to two below 1024px, then one below 480px. Long names wrap within their container.

## Elevation & Depth

Page sections and project cards use tonal grounds and borders. Small button and theme-selection shadows remain part of the BoardUI foundations; the mobile modal uses the existing larger shadow. The Explore popover uses a diffuse raised shadow; focused or hovered hotspots reveal small labeled tooltips. The Anatomy case gets its depth from true solid SVG parts, four-tone surfaces, occlusion, and an audited painter's order. Its soft ground halo supports the physical object.

**The physical depth rule.** Draw complete solids and keep their visible joints connected. Preserve the audited order throughout the bounded module lifts; do not substitute translated flat groups for physical surfaces.

## Shapes

Interface corners use the established small radius scale: tags and theme segments, navigation items, buttons, and cards each retain their observed shape. Fine borders and open chronological rows carry most page structure.

Hairline drawings keep the 400 by 320 viewBox, rounded outer silhouettes, quieter interior creases, and one active edge. The Anatomy case retains its original 800 by 640 projection and 113 solids. The Hero frames it through a 650 by 520 crop at (75,65), removing empty projection margins while retaining the whole object; standalone art and the Explore popover retain the original frame. All frames have a 5:4 ratio. Static light and dark previews export actual geometry with matching framing and theme colors.

The real avatar stays intact. Generated layout comps and earlier transformer images are reference material only. Asset provenance and MIT/OFL notices remain in `THIRD_PARTY_NOTICES.md`; Anatomy ships its license at `public/anatomy/LICENSE.txt`. Brand origins, exact revisions, licenses, and hashes are linked from `public/brand-icons/SOURCES.md`. The unchanged Hairline engine is `public/hairline/kernel.js`, SHA-256 `1F814FC836B14B181C6437CBD1DC02551913467B66698A673A0888EF1710D229`.

## Components

### Actions and theme selection

Action buttons use BoardUI Primary with the shared terracotta vertical gradient and paired foreground. Both hero links use this variant and omit icons, with 46px minimum height, then 44px on phones. The Explore trigger also uses Primary with an actual-geometry thumbnail. The gallery Pause/Start control and dock close action have 44px targets and accessible names. The mobile menu's visible button matches the theme control at 32px. Press motion scales actions to 0.98 and respects reduced motion. Keep theme choices, underline tabs, and carousel indicators in their specialized semantic treatments.

The theme control has light, dark, and system options. A tonal track holds a selected thumb; arrow keys move focus and Space or Enter selects. Theme selection remains usable when storage is unavailable.

### Navigation and exploration case

The fixed navigation marks the active section with soft accent and its paired foreground. Below 1024px, the existing React Aria modal handles Escape, focus return, and page scroll locking. Real hash links remain available throughout the page.

The case maps its workstation, terminal, optical instrument, folio, map, and connection panel to Projects, Stack, Background, Open source, Travel, and Contact. Its six physical hotspots are real keyboard-accessible anchors; arrow keys and Home/End move among them, and Enter or Space commits navigation. Pointer hover and keyboard focus preview module lift without changing selection or the URL. A small destination label appears only during hover or visible keyboard focus; there is no persistent caption, readout, or text navigation. The eight-second idle tour previews objects without committing a destination and stops for user input, reduced motion, hidden pages, or an offscreen case. Loading failure retains static actual-geometry art and targets derived from the same projected module geometry.

When the main case leaves the viewport, a lower-left Explore trigger opens a React Aria popover containing the same interactive case and six physical navigation hotspots. Navigation, the close action, or Escape closes it and restores focus. A static theme preview provides its thumbnail.

### Project gallery and tags

Six dot indicators and gallery arrow/Home/End keys select cards; page arrows are absent. The active dot extends into a short terracotta pill. The carousel advances every six seconds only while at least 35% visible and the document is visible. Hover, keyboard focus, pointer gestures, reduced motion, or the explicit Pause control suspend rotation; Start resumes when those conditions permit. Manual navigation restarts the idle interval. Automatic rotation and native horizontal scrolling update shared selection without adding history or changing the hash. Real project hashes and browser Back restore the target card. Dimension observation realigns the latest selected card after resizing while preserving valid settle callbacks; a same-project hash interrupt accepts either centered equivalent copy or canonical card before completing the request.

Compact cards distinguish titles, factual summaries, supporting detail, and informational tags. Links normalize to Source, Releases, and Website in that order, with GitHub, package, and globe marks respectively. Upstream Source is separate from all fifteen merged PRs, visible in numerical order without a disclosure. Tags list observed technologies; they do not express proficiency or scores.

### Skills and public destinations

Official BoardUI underline Tabs retain React Aria roving focus, automatic keyboard activation, and tab/panel association. The selected tab uses terracotta text and a 2px underline over the baseline; the categories keep their specialized tab semantics. The five groups are AI infrastructure & agents, Scientific computing, Systems & embedded, Web & data, and Development tools. All twenty-two technologies retain their marks and project associations. GitHub, X, and ORCID use the same monochrome vendor adapters in Hero and Contact; Contact places each mark beside the title at 1em.

### Decorative drawings and countries

Six project and three country Hairline illustrations show only the drawing stage. They add no Tab stops or visible sliders, readouts, rules, or object labels. Pointer input activates the local object; touch keeps `pan-x pan-y pinch-zoom`, rejects drag, multitouch, cancellation, and gallery movement, and activates only after a confirmed single tap. The unchanged engine settles idle geometry and sleeps while hidden or offscreen. Both-theme geometry previews remain available if interactive loading fails.

Country cards pair a drawn impression with a plain country heading that retains its anchor ID. Selection changes the top divider to terracotta. Moving SUVs, trains, and lattice shutters inherit the site's accent while their stationary setting remains monochrome. Three English paragraphs describe the illustrated scenes through concrete poetic observations without adding first-person incidents or travel history. Visible city/region labels and lists are removed; New Zealand shows 2025, Japan shows 2018–2022, and China has no year. South Island, Honshu, Kyushu, and the requested Suzhou/Nanjing context remain in local source data. Earlier travel hashes remain valid aliases. Travel statistics are absent.

## Do's and Don'ts

### Do

- Do use the final semantic color tokens and their paired theme foregrounds.
- Do retain the complete object in a 5:4 drawing frame and match actual geometry, crop, and theme colors in fallbacks.
- Do keep real hash links, native gallery scrolling, keyboard focus, and reduced motion working together.
- Do preserve the real avatar, factual project copy, visit records, and public destinations.
- Do keep navigable Anatomy previews separate from committed selection and decorative Hairline input.

### Don't

- Don't modify the Hairline kernel or assign colors separately to individual figures; country moving parts use the shared semantic accent.
- Don't turn the idle tour, hover preview, gallery scroll, or automatic rotation into a URL or history change.
- Don't add gradient lettering, status badges, section numbers, decorative grids, or skill-score counters.
- Don't present drawn impressions as application screenshots, research results, hardware photographs, or personal travel photos.
- Don't infer employers, outcomes, proficiency, private contact details, travel dates, or routes from illustrations.
