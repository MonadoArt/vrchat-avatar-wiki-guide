# Avatar Wiki - Dev Reference

This is a personal reference for making visual tweaks without needing an LLM. It covers where things live, what controls what, and concrete examples for common edits.

Run the dev server first so you can see changes live:

```bash
cd E:\Dev\Github-Avatar-Wiki
npm run start
```

This opens a browser at `http://localhost:3000/vrchat-avatar-wiki-guide/`. Changes to CSS and MDX files hot-reload automatically.

---

## How CSS works (quick primer)

CSS is a list of rules. Each rule has two parts: a **selector** (which element to target) and **properties** (what to change).

```css
.my-class {         /* selector: any element with class="my-class" */
  color: red;       /* property: text color */
  font-size: 1rem;  /* property: text size */
}
```

Selectors can get more specific:

```css
.parent .child { }          /* any .child inside a .parent */
.parent > .child { }        /* only .child that is a direct child of .parent */
h2:has(+ .xeno-banner) { }  /* any h2 immediately followed by .xeno-banner */
```

`!important` at the end of a value forces it to win over conflicting rules:

```css
background: transparent !important;
```

---

## Where everything lives

| What | File |
|---|---|
| All custom styles | `src/css/custom.css` |
| Color variables | `src/css/custom.css` - top of file, `:root {}` block |
| Section marker components | `src/components/XenoMarkers.jsx` |
| Unity icon components | `src/components/UnityIcon.jsx` |
| Site config, navbar, footer links | `docusaurus.config.ts` |
| Sidebar structure | `sidebars.ts` |
| All page content | `docs/**/*.mdx` |
| Static images | `static/img/` |

**There is no other CSS file.** Everything visual is in `custom.css`. Docusaurus generates its own base styles (called Infima) and we override them there.

---

## Colors

All colors are defined once at the top of `custom.css` inside `:root {}`:

```css
:root {
  --xeno-brown-dark: rgb(49, 41, 41);
  --xeno-beige-light: rgb(181, 177, 171);
  --xeno-green-monado: #A4F13F;
  --xeno-orange-header: #E68E35;
  --xeno-brown-menu: rgb(72, 59, 34);
}
```

These are CSS custom properties (also called variables). To reference one elsewhere:

```css
color: var(--xeno-orange-header);
```

**To change a color sitewide:** edit the value in `:root {}`. Every place that references the variable updates automatically.

**To change a specific element's color without touching others:** find the rule for that element and override just there:

```css
/* Example: make SubSectionBanner text orange instead of brown */
.xeno-subsection-banner {
  color: var(--xeno-orange-header);   /* change this line */
}
```

Never hardcode a hex/rgb value outside of `:root`. Always use the variables.

---

## Sizes and spacing

### `rem` vs `em`

- `rem` - relative to the **root** font size (the browser default, usually 16px). `1rem` = 16px, `0.5rem` = 8px. Consistent no matter where you use it.
- `em` - relative to the **current element's** font size. If an element has `font-size: 1.25rem`, then `1em` inside it = 1.25rem. If you change the font size, all `em` padding and margins scale with it.

The XenoMarker components use `em` internally so you can resize them by just changing their `font-size` (or using the `size` prop).

### Padding and margin

```css
padding: top right bottom left;     /* all four sides, in order */
padding: 0.5em 1em;                 /* shorthand: top+bottom 0.5em, left+right 1em */

margin: 1em 0 0.5em -1.5rem;       /* top right bottom left */
```

Negative margin (`-1.5rem`) pulls an element in that direction. The SubSectionBanner uses `margin-left: -1.5rem` to pull itself flush to the left edge of the page column.

---

## Editing specific things

### Change the page background gradient

In `custom.css`, find the `html {}` block near the top:

```css
html {
  background-color: var(--xeno-brown-dark);
  background-image:
    linear-gradient(to top, rgb(238, 184, 138) 0%, rgb(181, 177, 171) 100%),
    url('../../static/img/bg_texture.png');
  background-blend-mode: multiply, screen;
  ...
}
```

The gradient goes from warm tan at the bottom to beige at the top. To adjust it, change the two `rgb()` values in the `linear-gradient`. The `background-blend-mode` makes the texture overlay the gradient - if you change any of the three background properties, check that the others still look right together.

### Change the h2 (SectionBanner) size

Find `.theme-doc-markdown h2` in `custom.css`:

```css
.theme-doc-markdown h2 {
  font-size: 2rem;     /* ← change this */
  ...
}
```

Because the taper shape uses `em` units (`1.5em 0%` in the clip-path), changing `font-size` automatically scales the point depth too.

### Change the SubSectionBanner size or taper

Find `.xeno-subsection-banner`:

```css
.xeno-subsection-banner {
  font-size: 1.25rem;                                          /* text + overall scale */
  padding: 0.25em 2.5em 0.25em 1.25em;                       /* top, right, bottom, left */
  clip-path: polygon(0 0, calc(100% - 1.5em) 0, 100% 100%, 0 100%);
}
```

The `clip-path` is what creates the angled right edge. `calc(100% - 1.5em)` sets where the cut starts from the right - bigger value = more taper. `100% 100%` is the bottom-right corner where the cut ends.

To make the taper shallower, reduce `1.5em`. To make it steeper, increase it.

### Change the SectionBanner (hexagon ribbon) taper

Find `.xeno-section-banner`:

```css
.xeno-section-banner {
  clip-path: polygon(
    1.5em 0%,               /* top-left: the point cuts in 1.5em from the left */
    calc(100% - 1.5em) 0%,  /* top-right: same from the right */
    100% 50%,               /* right point: full width at vertical midpoint */
    calc(100% - 1.5em) 100%,
    1.5em 100%,
    0% 50%                  /* left point */
  );
}
```

Increase `1.5em` to make the hexagon points more pronounced. Decrease to flatten them. Both sides are symmetric - change the value in all four `1.5em` places to keep them matched.

### Change the GaugeHeader gradient fade

Find `.xeno-gauge-header`:

```css
background: linear-gradient(to right,
  transparent 0%,
  rgba(14, 11, 7, 0.88) 16%,   /* dark starts here */
  rgba(70, 55, 30, 0.75) 50%,  /* center color */
  rgba(14, 11, 7, 0.88) 84%,   /* dark ends here */
  transparent 100%
);
```

The percentages control where the fade transitions happen. `16%` and `84%` set how far in from each side the dark region starts. The center `rgba()` is the midpoint color - increasing the last value (opacity) makes the center more opaque/darker.

### Change the footer blur or opacity

Find `.footer, .footer--dark`:

```css
.footer, .footer--dark {
  background: rgba(0, 0, 0, 0.72) !important;  /* overall background opacity */
  backdrop-filter: blur(6px);                   /* blur amount */
}
```

Increase `0.72` toward `1` for a more opaque footer. Increase `6px` for more blur. The black stripe behind the text content is separately controlled:

```css
.footer .container::before {
  background: rgba(0, 0, 0, 0.3);   /* stripe opacity */
}
```

### Change sidebar item colors

The sidebar uses two alternating row colors for sub-items:

```css
.menu__list-item .menu__list .menu__list-item:nth-child(odd)  { background-color: rgb(204, 200, 191) !important; }
.menu__list-item .menu__list .menu__list-item:nth-child(even) { background-color: rgb(181, 177, 171) !important; }
```

The hover/active highlight is the green tint:

```css
.menu__list-item .menu__list .menu__link:hover,
.menu__list-item .menu__list .menu__link--active {
  background-color: rgba(164, 241, 63, 0.25) !important;
}
```

`rgba(164, 241, 63, 0.25)` is `--xeno-green-monado` at 25% opacity. Increase `0.25` to make the highlight more visible.

---

## How the XenoMarker components work

The components live in `src/components/XenoMarkers.jsx`. Each one is a small function that returns an HTML element with a CSS class:

```jsx
export const SubSectionBanner = ({ children, size }) => (
  <div className="xeno-subsection-banner" style={size ? { fontSize: size } : undefined}>
    {children}
  </div>
);
```

Breaking that down:
- `export const SubSectionBanner` - makes this available to import in other files
- `({ children, size })` - the props the component accepts. `children` is whatever text you put between the tags. `size` is the optional size prop.
- `className="xeno-subsection-banner"` - applies the CSS class. The visual style is entirely in `custom.css`.
- `style={size ? { fontSize: size } : undefined}` - if a `size` prop is passed, sets `font-size` inline. This overrides the `font-size` in CSS. Because everything inside the CSS rule uses `em`, it all scales from this one value.

**To add a new XenoMarker style:**

1. Add a new `export const` in `XenoMarkers.jsx`:

```jsx
export const MyNewMarker = ({ children, size }) => (
  <div className="xeno-my-marker" style={size ? { fontSize: size } : undefined}>
    {children}
  </div>
);
```

2. Add the CSS for `.xeno-my-marker` in `custom.css` inside the XenoMarkers section (between the `/* ── XenoMarkers ──` and `/* ── /XenoMarkers ──` comments).

3. If the marker replaces a heading and needs ToC support, add its selector to the `:has()` collapse rule:

```css
.theme-doc-markdown h2:has(+ .xeno-section-banner),
.theme-doc-markdown h2:has(+ .xeno-section-tab),
.theme-doc-markdown h3:has(+ .xeno-subsection-banner),
.theme-doc-markdown h2:has(+ .xeno-my-marker) {   /* ← add this */
  visibility: hidden;
  height: 0;
  ...
}
```

4. Import and use in any `.mdx` file:

```mdx
import { MyNewMarker } from '@site/src/components/XenoMarkers';

<MyNewMarker>My Content</MyNewMarker>
```

---

## How `clip-path: polygon()` works

This is what creates the angled/pointed shapes. It defines a list of corners (as `x y` percentage/length pairs) that the browser clips the element to.

A plain rectangle would be:
```css
clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
/*                  TL      TR      BR       BL       */
```

The SubSectionBanner cuts the top-right corner:
```css
clip-path: polygon(0 0, calc(100% - 1.5em) 0, 100% 100%, 0 100%);
/*                  TL   top-right offset inward   BR    BL      */
```

Instead of going to `100% 0` (top-right corner), it stops at `calc(100% - 1.5em) 0` (1.5em short of the right edge at the top), then goes to `100% 100%` (full right at the bottom). That creates the diagonal cut.

The SectionBanner hexagon uses six points - two top, one right-middle, two bottom, one left-middle - to create the full pointed-on-both-sides shape.

---

## Checking which CSS rule applies to something

1. In the browser, right-click the element and choose **Inspect**.
2. The right panel shows all CSS rules affecting that element, in order of specificity. Rules that are crossed out have been overridden.
3. You can edit values directly in the inspector to test changes - they reset on page reload, so copy the working value back into `custom.css`.

---

## CSS sections in `custom.css` (quick map)

| Section | Line range (approx) | What's there |
|---|---|---|
| Variables & Resets | 1-95 | Palette vars, Infima overrides, html/body background |
| Decor & Layout | 96-190 | Corner/middle overlay images, `.main-wrapper` |
| Content Containers | 191-435 | h1, h2, XenoMarkers, doc column box |
| Sidebar | 436-620 | Menu styles, cursor pseudo-elements |
| Table of Contents | 621-695 | ToC panel and link styles |
| Breadcrumbs | 696-820 | Breadcrumb bar (GaugeHeader style) |
| Dark Mode | 821-830 | Dark theme variable overrides |
| Footer | 831-926 | Footer blur, stripe, rivets, compact sizing |
| Package components | 927-956 | VPM install card styles (installation.mdx only) |
