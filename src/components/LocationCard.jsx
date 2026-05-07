/**
 * LocationCard - XB1 location/area card style.
 *
 * Four layers:
 *   1. Image - the card content
 *   2. Highlight - rectangular regions
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
 * highlight can be a single object or an array of them.
 */

import useBaseUrl from '@docusaurus/useBaseUrl';
import { XenoCardFrame, xenoCardFrameStyles } from './XenoCardFrame';

/**
 * @typedef {{
 *   t: number,l: number, w: number, h: number,
 *   text?: string, style?: object, grow?: number
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

export const LocationCard = ({ src, title, alt, style, highlight, topSpacing }) => {
  const imgSrc = useBaseUrl(src);

  if (highlight) {
    [highlight].flat().forEach((x, i) => {
      /** @type {HighlightOptions} */ const hi = x // JSDoc type casting
      if ([hi.t, hi.l, hi.w, hi.h].some(x => x < 0 || x > 1))
        console.warn(`/!\\ Highlight #${i} coordinates are out of range (0-1)`)
      if ([hi.t + hi.h, hi.l + hi.w].some(x => x < 0 || x > 1))
        console.warn(`/!\\ Highlight #${i} reaches outside the picture`)
    })
  }

  const percent = (x=0) => `${x*100}%`

  return (
    <XenoCardFrame title={title} style={style} topSpacing={topSpacing}>
      <div className={xenoCardFrameStyles.imageContainer}>
          <img
            src={imgSrc}
            alt={alt || title || ''}
            className={`${xenoCardFrameStyles.image}${highlight ? ` ${xenoCardFrameStyles.darkened}` : ''}`}
          />
          {highlight && [highlight].flat().map((/** @type {HighlightOptions} */ hi, i) =>
          <div className={xenoCardFrameStyles.highlight} key={(hi.text||"")+i} style={{
              position: "absolute",
              top:    hi.grow ? `calc(${percent(hi.t)} - ${hi.grow}px)` : percent(hi.t),
              left:   hi.grow ? `calc(${percent(hi.l)} - ${hi.grow}px)` : percent(hi.l),
              width:  hi.grow ? `calc(${percent(hi.w)} + ${2*hi.grow}px)` : percent(hi.w),
              height: hi.grow ? `calc(${percent(hi.h)} + ${2*hi.grow}px)` : percent(hi.h),
              ...(hi.style || {})
            }}
            data-hi-top    = {hi.t}
            data-hi-left   = {hi.l}
            data-hi-width  = {hi.w}
            data-hi-height = {hi.h}
          >{hi.text || ""}</div>)}
      </div>
    </XenoCardFrame>
  );
};
