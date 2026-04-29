# Avatar Wiki - Worker Handoff

This document covers everything you need to know before touching this project. Read it in full before making changes.

---

## What this is

A **Docusaurus v3** wiki site for VRChat avatar setup, targeted at non-technical users who are setting up the *Lucario ReUnited* avatar by Monado Art. The wiki covers installation, importing, uploading, customizing, and troubleshooting. The visual design is themed after **Xenoblade Chronicles 1's** UI - warm beige/brown tones, orange accents, green highlights, specific panel and header shapes.

- **Repo:** `E:\Dev\Github-Avatar-Wiki`
- **Live URL:** `https://monadoart.github.io/vrchat-avatar-wiki-guide/`
- **Base URL:** `/vrchat-avatar-wiki-guide/` (important - all static asset paths must go through `useBaseUrl` or they'll break in prod)
- **Org:** MonadoArt / `monadoart.github.io`

---

## Project structure

```
Github-Avatar-Wiki/
├── docs/
│   ├── intro.mdx                           # Welcome / landing page
│   ├── upload/
│   │   ├── _category_.json                 # Sidebar label + description for this section
│   │   ├── installation.mdx                # Step-by-step: VCC, Unity, packages
│   │   ├── unity-basics.mdx                # Unity UI orientation for beginners
│   │   ├── importing.mdx                   # How to import the .unitypackage
│   │   └── uploading.mdx                   # How to upload via the VRChat SDK
│   ├── customizing/
│   │   └── index.mdx                       # Stub - content TBD by owner
│   ├── updating/
│   │   ├── re-uploading.mdx                # How to re-upload after changes
│   │   └── updating-packages.mdx           # How to update VPM packages
│   └── troubleshooting/
│       └── common-errors.mdx               # Common errors and fixes
├── src/
│   ├── css/
│   │   └── custom.css                      # ALL custom styles live here
│   └── components/
│       ├── UnityIcon.jsx                   # Inline Unity file-type icons
│       └── XenoMarkers.jsx                 # Reusable XB1-styled section markers
├── static/
│   └── img/
│       ├── bg_texture.png                  # Repeating background texture
│       ├── decor_top.png                   # Top-corner decorative mask
│       ├── decor_bottom.png                # Bottom-corner decorative mask
│       ├── decor_middle.png                # Center decorative mask
│       ├── cursor_base.png                 # XB1-style active cursor (green base layer)
│       ├── cursor_detail.png               # XB1-style active cursor (highlight layer)
│       ├── title_bar_left.png              # Breadcrumb banner - left cap
│       ├── title_bar_middle.png            # Breadcrumb banner - repeating middle
│       ├── title_bar_right.png             # Breadcrumb banner - right cap
│       ├── logo.png                        # Site favicon + navbar logo
│       ├── vpm/                            # VPM package logos (vrcf, poiyomi, gogoloco, facetracking)
│       └── unity-icons/                    # Unity file-type icons (scene, prefab, prefab-variant, model, prefab-model, unitypackage)
├── docusaurus.config.ts                    # Site config, navbar, footer links
└── sidebars.ts                             # Sidebar structure
```

---

## Color palette - DO NOT redefine these

All colors are defined once in `src/css/custom.css` under `:root`. Never hardcode hex values anywhere - always reference these variables.

| Variable | Value | Used for |
|---|---|---|
| `--xeno-brown-dark` | `rgb(49, 41, 41)` | Main dark background panels |
| `--xeno-beige-light` | `rgb(181, 177, 171)` | Text panels, sidebar items, heading banners |
| `--xeno-green-monado` | `#A4F13F` | Primary color, active states, links |
| `--xeno-orange-header` | `#E68E35` | Heading accents, borders, active indicators |
| `--xeno-brown-menu` | `rgb(72, 59, 34)` | Text on light backgrounds |

Infima overrides (also in `:root` - do not duplicate):
- `--ifm-color-primary` → `--xeno-green-monado`
- `--ifm-background-color` → `--xeno-beige-light`
- `--ifm-navbar-background-color` → `rgba(33, 28, 21, 0.9)`
- `--ifm-footer-background-color` → `transparent` (footer manages its own background)

---

## CSS structure (`src/css/custom.css`)

Sections in order. Add rules inside the relevant section only - don't dump things at the bottom.

1. **Variables & Global Resets** - palette vars, Infima overrides, `html` background blend, `body` reset
2. **Global Decor & Structural Layout** - `html::before/::after` decorative overlay masks, `.main-wrapper`, sidebar container positioning
3. **Content Containers** - `.container`, doc column (`[class*="docItemCol"]`), h1/section-header banner, XenoMarkers
4. **Sidebar** - all `.menu` and `.theme-doc-sidebar-container` rules including XB1 cursor pseudo-elements
5. **Table of Contents** - `.table-of-contents` and `.theme-doc-toc-desktop`
6. **Breadcrumbs** - `.breadcrumbs` XB1 title-bar style (built from sliced PNG images)
7. **Theme Overrides (Dark Mode)** - `[data-theme='dark']` overrides
8. **Footer** - `.footer` / `.footer--dark`, inner container stripe, rivet decorations, compact sizing rules
9. **Package install components** - `.pkg-url-block`, `.pkg-name-link`, `.pkg-add-btn` (installation.mdx only)

### Key CSS rules to know before editing

**`html { overflow-x: hidden }`** - intentional. Prevents the `100vw` pseudo-element on `.footer .container::before` from creating a horizontal scrollbar. Do not remove.

**Footer layering:** The footer has `backdrop-filter: blur(6px)` and a semi-transparent black background. Inside it, `.footer .container::before` is a `100vw` wide black stripe at 30% opacity that sits behind the text content. The rivets (small orange-bordered circles) are `::before` / `::after` on `.footer` itself.

**`h2` in doc content** - `.theme-doc-markdown h2` is globally styled as the "Party Gauge" bar (dark gradient fading to transparent on both ends, gradient border lines top and bottom). This applies to every `##` heading sitewide automatically. Do not override this per-page without a good reason.

**`h1` / `.section-header`** - styled as the beige tapered banner (full left edge, arrow-point cut on the right). Uses `em` units so `font-size` controls all dimensions proportionally.

**XenoMarker CSS uses `em` units throughout** - the `size` prop on each component sets `font-size`, and all internal padding/taper values cascade from it. Do not mix in `rem` values inside marker rules.

**ToC `:has()` rule** - whenever a markdown heading immediately precedes a XenoMarker component, the heading must be collapsed visually while keeping its DOM anchor alive so the ToC can link to it. The current rule in `custom.css` covers:

```css
.theme-doc-markdown h2:has(+ .xeno-section-banner),
.theme-doc-markdown h2:has(+ .xeno-section-tab),
.theme-doc-markdown h3:has(+ .xeno-subsection-banner) { ... }
```

**If you add a new XenoMarker component class, add its selector here.** If you forget, the heading will render visually on top of the component (double display). The heading and the marker must always appear together in MDX - heading first, component immediately after, no blank line or content between them. See the ToC and XenoMarkers section below for the full pattern.

**`h2` auto-style applies sitewide** - every `##` heading in any `.mdx` file automatically gets the SectionBanner visual. If you use an explicit `<SectionBanner>` after a `##`, the `##` heading must be in the `:has()` collapse rule or both will render. This is already handled for the current components - just be aware of it if you add new ones.

**XenoMarker `size` prop takes a CSS string** - `size="1.2rem"` not `size={1.2}`. All internal dimensions are in `em` so changing `font-size` scales padding, taper depth, and margins proportionally.

---

## Reusable components

### `src/components/UnityIcon.jsx`

Renders Unity file-type icons inline with text. Icon PNGs live in `static/img/unity-icons/`.

```jsx
import { SceneIcon, PrefabIcon, PrefabVariantIcon, UnityPackageIcon, ModelIcon, PrefabModelIcon } from '@site/src/components/UnityIcon';

A <UnityPackageIcon /> file    // icon appears inline after text
Open the <SceneIcon size={20} /> scene
```

All icons default to 16px. Pass `size` as a number for a different size.

### `src/components/XenoMarkers.jsx`

Three XB1-styled section markers. All accept a `size` prop (any valid CSS font-size string) that scales all dimensions proportionally.

**`<SectionTab>`** - small dark angled tab. Sits above a SectionBanner to label the type/step. Styled after the "Party Gauge" sub-label tab in XB1.

```jsx
<SectionTab>Step 1</SectionTab>
<SectionTab size="0.65rem">Optional</SectionTab>
```

**`<SectionBanner>`** - centered beige hexagon ribbon. Both left and right ends taper to a point at mid-height. Styled after the "Chain Attacks" section divider in XB1.

```jsx
<SectionBanner>Step 1 - Download the Creator Companion</SectionBanner>
<SectionBanner size="1.3rem">Bigger Section</SectionBanner>
```

**`<SubSectionBanner>`** - left-aligned beige banner that tapers on the right only. Same look as the h1 title bar. Use for named sub-sections that need a strong visual break but aren't page-level headings (e.g. "Trust Rank" on the Installation page).

```jsx
<SubSectionBanner>Trust Rank</SubSectionBanner>
<SubSectionBanner size="1rem">Smaller</SubSectionBanner>
```

**`<GaugeHeader>`** - dark bar fading to transparent on both ends, with gradient lines at top and bottom. Optional `value` prop adds right-aligned text. Styled after the "Party Gauge" header bar in XB1.

```jsx
<GaugeHeader>Install Unity</GaugeHeader>
<GaugeHeader value="3/3">Party Gauge</GaugeHeader>
<GaugeHeader size="1rem" value="Step 2">Install Unity</GaugeHeader>
```

### ToC and XenoMarkers

The Docusaurus ToC parser only reads markdown heading syntax (`##`, `###`) - JSX components are invisible to it. If a section using a XenoMarker needs a ToC entry, place the appropriate markdown heading immediately before the marker with **no blank line between them**. The CSS `:has()` rule collapses it visually while keeping the anchor functional.

The pattern for each component type:

```mdx
## My Section                          ← goes in ToC, hidden visually
<SectionBanner>My Section</SectionBanner>

## My Section                          ← same for SectionTab combos
<SectionTab>Optional</SectionTab>
<SectionBanner>My Section</SectionBanner>

### My Subsection                      ← h3 for SubSectionBanner
<SubSectionBanner>My Subsection</SubSectionBanner>
```

GaugeHeader has no collapse rule and does not need one - it does not replace a heading, it supplements one. Use it inside content, not as a section anchor.

**Height matters for scroll-spy:** `h2` collapsed headings use `height: 0` (fine, since only one exists per visible section). `h3` collapsed headings must use `height: 1px` - if you use `height: 0` on multiple consecutive h3s, they all stack at the same y-coordinate and the ToC scroll-spy detects all of them at once when the section scrolls into view, jumping straight to the last entry.

**The two requirements must both be met** for this to work:
1. The markdown heading must exist immediately before the component in the MDX source.
2. The CSS `:has()` rule must include a selector for that component's class.

Miss either one and either the ToC link is missing or the heading renders on top of the component.

---

## Static assets

Images live in `static/img/` and are served at `/img/` in dev but `/vrchat-avatar-wiki-guide/img/` in production.

**In React/JSX components - always use `useBaseUrl`:**
```jsx
import useBaseUrl from '@docusaurus/useBaseUrl';

// Call at component top level, never inside .map() or callbacks
const icon = useBaseUrl('/img/vpm/vrcf.png');
```

**In markdown/MDX prose - raw paths are fine:**
```md
![alt text](/img/something.png)   // Docusaurus rewrites this automatically
```

---

## MDX gotchas

- **No em dashes (`—`)** - use regular dashes (`-`). The owner is firm on this.
- **Backslash escapes in single-quoted JSX strings break the acorn parser.** Use double quotes: `"haven't"` not `'haven\'t'`.
- **Top-level component definitions in MDX must be `export const`**, not bare `const`. Non-exported top-level consts cause a parse error when used in JSX in the same file.
- **`useBaseUrl` must be called at component top level**, not inside `.map()`, callbacks, or render functions. Store results in variables first, then reference those in data arrays.
- **Don't create `customizing/index.mdx` if the category uses `"link": { "type": "generated-index" }` in `_category_.json`** - they conflict. The customizing section currently uses generated-index; leave it alone until the owner writes the content.
- **The `xeno-subsection-banner` class has `margin-left: -1.5rem`** - this is intentional. The doc column (`[class*="docItemCol"]`) has `padding: 1.5rem` and the negative margin cancels it so the banner bleeds flush to the left edge. Do not change this unless you also change the column padding.
- **The commented-out breadcrumb image approach in `custom.css` section 6 is kept deliberately** - it's a reference implementation in case the GaugeHeader style is ever reverted. Do not delete it.
- **Do not add a second `:root {}` block to `custom.css`** - the xeno palette variables and Infima overrides are intentionally in the same block. Adding a second `:root` doesn't break things but creates confusion about which values are canonical.
- **The `html` background uses `background-blend-mode`** - it blends a gradient and a texture image together. If you need to change the background, all three properties (`background-color`, `background-image`, `background-blend-mode`) must be changed together or the blend breaks.

---

## Writing tone

The audience is non-technical VRChat users, many of whom have never touched Unity. Write like you're explaining something to a friend, not documenting an API.

- Short, direct sentences
- No em dashes, no "This section will cover...", no "It is important to note that..."
- Use admonitions (`:::tip`, `:::info`, `:::caution`, `:::warning`) for callouts - keep them short
- Numbered lists for steps, prose for explanations
- Many pages have `:::caution Put an image here :::` blocks - these are placeholder markers for screenshots the owner will provide. Do not remove them.

---

## What's done vs what isn't

**Complete:**
- `intro.mdx`
- `upload/installation.mdx` - full content including custom VPM package card components
- `upload/unity-basics.mdx` - written, screenshots still needed
- `upload/importing.mdx` - written, screenshots still needed
- `upload/uploading.mdx`
- `updating/re-uploading.mdx`
- All visual styling: footer, navbar, sidebar, breadcrumbs, ToC, background, decor

**Stubs / needs content:**
- `customizing/index.mdx` - placeholder only, owner is writing this
- `updating/updating-packages.mdx` - check before touching
- `troubleshooting/common-errors.mdx` - check before touching

**Pending from owner:**
- Screenshots and GIFs for `unity-basics.mdx` and `importing.mdx` (all `:::caution TODO` blocks mark where they go)
