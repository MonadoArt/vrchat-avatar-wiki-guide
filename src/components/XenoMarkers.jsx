import React from 'react';
import styles from './XenoMarkers.module.css';

/**
 * XenoMarkers - reusable section markers styled after Xenoblade 1's tutorial UI.
 *
 * These components intentionally emit `data-xeno-marker` attributes.
 * `src/css/theme-docs.css` consumes those markers to hide the placeholder
 * markdown headings that sit immediately before the visual banner components.
 *
 * <SectionTab>Party Gauge</SectionTab>
 *   -> small dark compact label, like the gray "Party Gauge" tab above a panel
 *
 * <SectionBanner>Chain attacks</SectionBanner>
 *   -> full-width centered beige hexagon ribbon, like the "Chain attacks" divider bar
 *
 * <SubSectionBanner>Trust Rank</SubSectionBanner>
 *   -> left-aligned beige banner that tapers on the right only, like the h1 title bar
 *
 * <GaugeHeader value="3/3">Party Gauge</GaugeHeader>
 *   -> dark bar fading to transparent on both ends, gradient lines top and bottom
 */

// size prop sets font-size; all internal dimensions use `em` so both
// vertical (padding) and horizontal (taper depth, padding) scale with it.
// e.g. size="0.8rem" shrinks, size="1.4rem" grows.

/**
 * @typedef {object} SizedMarkerProps
 * @property {import('react').ReactNode} children
 * @property {string=} size
 * @property {string=} className
 * @property {import('react').CSSProperties=} style
 */

/**
 * @typedef {object} GaugeHeaderProps
 * @property {import('react').ReactNode} children
 * @property {string=} size
 * @property {import('react').ReactNode=} value
 * @property {string=} className
 * @property {string=} labelClassName
 * @property {string=} valueClassName
 * @property {import('react').CSSProperties=} style
 */

const withSizeStyle = (size, style) => (
  size ? { fontSize: size, ...style } : style
);

/**
 * @param {SizedMarkerProps} props
 */
export const SectionTab = ({ children, size, className = '', style }) => (
  <div
    className={`${styles.sectionTab} ${className}`.trim()}
    data-xeno-marker="section-tab"
    style={withSizeStyle(size, style)}
  >
    {children}
  </div>
);

/**
 * @param {SizedMarkerProps} props
 */
export const SectionBanner = ({ children, size, className = '', style }) => (
  <div
    className={`${styles.sectionBanner} ${className}`.trim()}
    data-xeno-marker="section-banner"
    style={withSizeStyle(size, style)}
  >
    {children}
  </div>
);

// Left-aligned beige banner, tapers on the right only. Same look as the h1 title bar.
// Use for named sub-sections that need a visual break but aren't page-level headings.
/**
 * @param {SizedMarkerProps} props
 */
export const SubSectionBanner = ({ children, size, className = '', style }) => {
  const markerRef = React.useRef(/** @type {HTMLDivElement | null} */ (null));
  const [inferredLabel, setInferredLabel] = React.useState('');
  const hasExplicitChildren = children !== undefined && children !== null && children !== '';

  React.useEffect(() => {
    if (hasExplicitChildren || !markerRef.current) {
      return;
    }

    const previousHeading = markerRef.current.previousElementSibling;
    if (!(previousHeading instanceof HTMLHeadingElement)) {
      return;
    }

    setInferredLabel(previousHeading.textContent?.trim() || '');
  }, [hasExplicitChildren]);

  return (
    <div
      ref={markerRef}
      className={`${styles.subSectionBanner} ${className}`.trim()}
      data-xeno-marker="subsection-banner"
      style={withSizeStyle(size, style)}
    >
      {hasExplicitChildren ? children : inferredLabel}
    </div>
  );
};

// Optional `value` prop renders a right-aligned counter (e.g. value="3/3").
/**
 * @param {GaugeHeaderProps} props
 */
export const GaugeHeader = ({
  children,
  value,
  size,
  className = '',
  labelClassName = '',
  valueClassName = '',
  style,
}) => (
  <div
    className={`${styles.gaugeHeader} ${className}`.trim()}
    data-xeno-marker="gauge-header"
    style={withSizeStyle(size, style)}
  >
    <span className={`${styles.gaugeHeaderLabel} ${labelClassName}`.trim()}>{children}</span>
    {value && <span className={`${styles.gaugeHeaderValue} ${valueClassName}`.trim()}>{value}</span>}
  </div>
);
