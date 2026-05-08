export const DEFAULT_XENO_DECOR = 'default';
export const DEFAULT_XENO_DECOR_STYLE = 'default';

const XENO_DECOR_ROUTES = [
  { decor: 'troubleshooting', style: 'alt', pattern: /\/docs\/troubleshooting\/?$/ },
  { decor: 'updating', style: 'default', pattern: /\/docs\/updating\/?$/ },
  { decor: 'customizing', style: 'default', pattern: /\/docs\/customizing(?:\/|$)/ },
  { decor: 'upload', style: 'default', pattern: /\/docs\/upload(?:\/|$)/ },
] as const;

export function getXenoDecorForPath(pathname: string): string {
  const match = XENO_DECOR_ROUTES.find(({ pattern }) => pattern.test(pathname));
  return match?.decor ?? DEFAULT_XENO_DECOR;
}

export function getXenoDecorStyleForPath(pathname: string): string {
  const match = XENO_DECOR_ROUTES.find(({ pattern }) => pattern.test(pathname));
  return match?.style ?? DEFAULT_XENO_DECOR_STYLE;
}
