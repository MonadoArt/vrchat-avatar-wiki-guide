/**
 * XenoMarkers - reusable section markers styled after Xenoblade 1's tutorial UI.
 *
 * <SectionTab>Party Gauge</SectionTab>
 *   → small dark compact label, like the gray "Party Gauge" tab above a panel
 *
 * <SectionBanner>Chain attacks</SectionBanner>
 *   → full-width beige banner with bold text, like the "Chain attacks" divider bar
 */

// size prop sets font-size; all internal dimensions use `em` so both
// vertical (padding) and horizontal (taper depth, padding) scale with it.
// e.g. size="0.8rem" shrinks, size="1.4rem" grows.

export const SectionTab = ({ children, size }) => (
  <div className="xeno-section-tab" style={size ? { fontSize: size } : undefined}>
    {children}
  </div>
);

export const SectionBanner = ({ children, size }) => (
  <div className="xeno-section-banner" style={size ? { fontSize: size } : undefined}>
    {children}
  </div>
);

// Optional `value` prop renders a right-aligned counter (e.g. value="3/3").
export const GaugeHeader = ({ children, value, size }) => (
  <div className="xeno-gauge-header" style={size ? { fontSize: size } : undefined}>
    <span className="xeno-gauge-header__label">{children}</span>
    {value && <span className="xeno-gauge-header__value">{value}</span>}
  </div>
);
