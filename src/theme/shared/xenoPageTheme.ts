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
      '--xeno-page-decor-after-tl': '#ffffff',
      '--xeno-page-decor-after-tr': '#818600',
      '--xeno-page-decor-after-bl': '#818600',
      '--xeno-page-decor-after-br': '#ededc5',
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
      '--xeno-page-decor-after-tl': '#c5dced',
      '--xeno-page-decor-after-tr': '#d400ff',
      '--xeno-page-decor-after-bl': '#550086',
      '--xeno-page-decor-after-br': '#c5dced',
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
    style: 'alt',
    variables: {
      '--xeno-page-bg-bottom': '#F25ABF',
      '--xeno-page-bg-top': '#FFDC9B',
      '--xeno-page-decor-before-ramp-base': '#E00FBE',
      '--xeno-page-decor-before-ramp-highlight': '#FF0000',
      '--xeno-page-decor-before-opacity': '0.2',
      '--xeno-page-decor-before-texture-highlight-blend': 'lighten',
      '--xeno-page-decor-before-texture-shadow-blend': 'multiply',
      '--xeno-page-decor-after-tl': '#FF0000',
      '--xeno-page-decor-after-tr': '#00A2FF',
      '--xeno-page-decor-after-bl': '#FFE600',
      '--xeno-page-decor-after-br': '#FF00C8',
      '--xeno-page-decor-after-opacity': '.5',
      '--xeno-page-decor-after-texture-blend': 'color',
      '--xeno-page-decor-after-ramp-base': '#FF0000',
      '--xeno-page-decor-after-ramp-highlight': '#FC9696',
      '--xeno-page-decor-after-ramp-opacity': '1',
    },
  },
  {
    pattern: /\/docs\/upload(?:\/|$)/,
    decor: 'upload',
    // variables: {
    //   '--xeno-page-bg-bottom': '#B9B9B9',
    //   '--xeno-page-bg-top': '#FFFFFF',
    //   '--xeno-page-decor-before-ramp-base': '#4B4B4B',
    //   '--xeno-page-decor-before-ramp-highlight': '#333333',
    //   '--xeno-page-decor-before-opacity': '0.34',
    //   '--xeno-page-decor-before-texture-highlight-blend': 'lighten',
    //   '--xeno-page-decor-before-texture-shadow-blend': 'multiply',
    //   '--xeno-page-decor-after-tl': '#ECECEC',
    //   '--xeno-page-decor-after-tr': '#000000',
    //   '--xeno-page-decor-after-bl': '#000000',
    //   '--xeno-page-decor-after-br': '#ECECEC',
    //   '--xeno-page-decor-after-opacity': '0.3',
    //   '--xeno-page-decor-after-texture-blend': 'multiply',
    //   '--xeno-page-decor-after-ramp-base': '#000000',
    //   '--xeno-page-decor-after-ramp-highlight': '#FFFFFF',
    //   '--xeno-page-decor-after-ramp-opacity': '1',
    // },
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
