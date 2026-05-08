export const DEFAULT_XENO_DECOR = 'default';
export const DEFAULT_XENO_DECOR_STYLE = 'default';

type XenoPageThemeDefinition = {
  pattern: RegExp;
  decor: string;
  style?: string;
  variables?: Record<string, string>;
};

export type XenoPageTheme = {
  decor: string;
  style: string;
  variables: Record<string, string>;
};

const PAGE_THEME_DEFINITIONS: readonly XenoPageThemeDefinition[] = [
  {
    pattern: /\/docs\/troubleshooting\/?$/,
    decor: 'troubleshooting',
    style: 'alt',
    variables: {
      '--xeno-page-bg-bottom': '#f2c25a',
      '--xeno-page-decor-before-ramp-base': '#d6b12a',
      '--xeno-page-decor-before-ramp-highlight': '#605301',
      '--xeno-page-decor-before-opacity': '0.34',
      '--xeno-page-decor-before-texture-highlight-blend': 'lighten',
      '--xeno-page-decor-before-texture-shadow-blend': 'multiply',
      '--xeno-page-decor-after-tl': 'rgb(255 255 255)',
      '--xeno-page-decor-after-tr': 'rgb(129 134 0)',
      '--xeno-page-decor-after-bl': 'rgb(129 134 0)',
      '--xeno-page-decor-after-br': 'rgb(237 237 197)',
      '--xeno-page-decor-after-opacity': '0.3',
      '--xeno-page-decor-after-texture-blend': 'multiply',
      '--xeno-page-decor-after-ramp-base': '#b19000',
      '--xeno-page-decor-after-ramp-highlight': '#ffffd8',
      '--xeno-page-decor-after-ramp-opacity': '1',
    },
  },
  {
    pattern: /\/docs\/updating\/?$/,
    decor: 'updating',
    variables: {
      '--xeno-page-bg-bottom': '#5ab2f2',
      '--xeno-page-decor-before-ramp-base': '#113357',
      '--xeno-page-decor-before-ramp-highlight': '#011e60',
      '--xeno-page-decor-before-opacity': '0.34',
      '--xeno-page-decor-before-texture-highlight-blend': 'lighten',
      '--xeno-page-decor-before-texture-shadow-blend': 'multiply',
      '--xeno-page-decor-after-tl': 'rgb(197 220 237)',
      '--xeno-page-decor-after-tr': 'rgb(212 0 255)',
      '--xeno-page-decor-after-bl': 'rgb(85 0 134)',
      '--xeno-page-decor-after-br': 'rgb(197 220 237)',
      '--xeno-page-decor-after-opacity': '0.3',
      '--xeno-page-decor-after-texture-blend': 'multiply',
      '--xeno-page-decor-after-ramp-base': '#007fb1',
      '--xeno-page-decor-after-ramp-highlight': '#c8fbff',
      '--xeno-page-decor-after-ramp-opacity': '1',
    },
  },
  {
    pattern: /\/docs\/customizing(?:\/|$)/,
    decor: 'customizing',
  },
  {
    pattern: /\/docs\/upload(?:\/|$)/,
    decor: 'upload',
  },
] as const;

const PAGE_THEME_VARIABLE_KEYS = Array.from(
  new Set(
    PAGE_THEME_DEFINITIONS.flatMap(({variables = {}}) =>
      Object.keys(variables),
    ),
  ),
);

export function getXenoPageTheme(pathname: string): XenoPageTheme {
  const match = PAGE_THEME_DEFINITIONS.find(({pattern}) => pattern.test(pathname));

  return {
    decor: match?.decor ?? DEFAULT_XENO_DECOR,
    style: match?.style ?? DEFAULT_XENO_DECOR_STYLE,
    variables: {...(match?.variables ?? {})},
  };
}

export function applyXenoPageTheme(
  root: HTMLElement,
  theme: XenoPageTheme,
): void {
  root.dataset.xenoDecor = theme.decor;
  root.dataset.xenoDecorStyle = theme.style;

  PAGE_THEME_VARIABLE_KEYS.forEach((key) => {
    root.style.removeProperty(key);
  });

  Object.entries(theme.variables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

export function clearXenoPageTheme(root: HTMLElement): void {
  delete root.dataset.xenoDecor;
  delete root.dataset.xenoDecorStyle;

  PAGE_THEME_VARIABLE_KEYS.forEach((key) => {
    root.style.removeProperty(key);
  });
}
