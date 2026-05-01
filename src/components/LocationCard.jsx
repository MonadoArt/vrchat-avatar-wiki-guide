/**
 * LocationCard - XB1 location/area card style.
 *
 * Four layers:
 *   1. Image - the card content
 *   2. Highlight - an optional rectangular region
 *   3. Frame - dark border with rivets at each corner
 *   4. Label - pill capsule centered on the top border
 *
 * Usage:
 *   <LocationCard src="/img/something.png" title="Colony 6" />
 *   <LocationCard src="/img/something.png" title="Colony 6" alt="Colony 6 screenshot" />
 *   <LocationCard src="/img/something.png" highlight={[
 *    {l:0,   t:0,   w:0.2, h:0.2, text:"Top left"},
 *    {l:0.4, t:0.4, w:0.2, h:0.2, text:"Center"},
 *   ]} />
 *
 * src goes through useBaseUrl automatically - pass the /img/ path as-is.
 */

import useBaseUrl from '@docusaurus/useBaseUrl';

/**
 * @typedef {{
 *   t: number,l: number, w: number, h: number, text?: string
 * } } HighlightOptions
 */
// /**
//  * @param {any} src
//  * @param {any} title
//  * @param {any} alt
//  * @param {any} style
//  * @param {HighlightOptions} highlight
//  * @returns {Element}
//  */

export const LocationCard = ({ src, title, alt, style, highlight }) => {
  const imgSrc = useBaseUrl(src);
  // When no title is provided, remove the top margin reserved for the label capsule
  const cardStyle = title ? style : { marginTop: 0, ...style };

  if (highlight) {
    Array.from(highlight).forEach((x, i) => {
      /** @type {HighlightOptions} */ const hi = x // JSDoc type casting
      if ([hi.t, hi.l, hi.w, hi.h].some(x => x < 0 || x > 1))
        console.warn(`/!\\ Highlight #${i} coordinates are out of range (0-1)`)
      if ([hi.t + hi.h, hi.l + hi.w].some(x => x < 0 || x > 1))
        console.warn(`/!\\ Highlight #${i} reaches outside the picture`)
    })
  }

  const percent = (x=0) => `${x*100}%`

  return (
    <div className="xeno-location-card" style={cardStyle}>
      <div className="xeno-location-card__frame"> {/* Has a 4px padding */}
        <div style={{position: "relative"}}>
          <img
            src={imgSrc}
            alt={alt || title || ''}
            className="xeno-location-card__image"
          />
          {highlight && Array.from(highlight).map(hi =>
          <div className="xeno-location-card__highlight" style={{
              position: "absolute",
              top:    percent(hi.t),
              left:   percent(hi.l),
              width:  percent(hi.w),
              height: percent(hi.h),
            }}
            data-hi-top    = {hi.t}
            data-hi-left   = {hi.l}
            data-hi-width  = {hi.w}
            data-hi-height = {hi.h}
          >{hi.text || ""}</div>)}
        </div>
        <div className="xeno-location-card__rivet xeno-location-card__rivet--tl" />
        <div className="xeno-location-card__rivet xeno-location-card__rivet--tr" />
        <div className="xeno-location-card__rivet xeno-location-card__rivet--bl" />
        <div className="xeno-location-card__rivet xeno-location-card__rivet--br" />
      </div>
      {title && <div className="xeno-location-card__label">{title}</div>}
    </div>
  );
};
