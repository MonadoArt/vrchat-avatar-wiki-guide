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
 *   <LocationCard src="/img/something.png" title="Top left" highlight={{t:0, l:0, w:0.1, h:0.1}} />
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

  /** @type {HighlightOptions} */
  let hi = highlight;
  if (highlight) {
    if ([hi.t, hi.l, hi.w, hi.h].some(x => x < 0 || x > 1))
      console.warn("/!\ Highlight coordinates are out of range (0-1)")
    if ([hi.t + hi.h, hi.l + hi.w].some(x => x < 0 || x > 1))
      console.warn("/!\ Highlight reaches outside the picture")
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
          {highlight && <div className="xeno-location-card__highlight" style={{
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
          >{hi.text}</div>}
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
