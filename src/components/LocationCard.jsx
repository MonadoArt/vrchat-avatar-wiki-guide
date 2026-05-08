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

import React from 'react';
import { createPortal } from 'react-dom';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { XenoCardFrame, xenoCardFrameStyles } from './XenoCardFrame';

/**
 * @typedef {{
 *   t: number,l: number, w: number, h: number,
 *   text?: string, style?: object, grow?: number
 * } } HighlightOptions
 */

export const LocationCard = ({ src, title, alt, style, imageStyle, imageHeight, highlight, topSpacing, staticHighlight }) => {
  const imgSrc = useBaseUrl(src);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isRendered, setIsRendered] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const dialogTitleId = React.useId();
  const closeTimeoutRef = React.useRef(/** @type {ReturnType<typeof setTimeout> | null} */ (null));

  const closeLightbox = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      setIsRendered(true);
      return undefined;
    }

    setIsVisible(false);

    if (!isRendered) {
      return undefined;
    }

    closeTimeoutRef.current = setTimeout(() => {
      setIsRendered(false);
      closeTimeoutRef.current = null;
    }, 180);

    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    };
  }, [isOpen, isRendered]);

  React.useEffect(() => {
    if (!isRendered) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [isRendered]);

  React.useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [closeLightbox, isOpen]);

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
  const resolvedImageStyle = imageHeight
    ? {
        width: 'auto',
        height: 'auto',
        maxHeight: imageHeight,
        maxWidth: '100%',
        ...imageStyle,
      }
    : imageStyle;
  const lightbox = isRendered && typeof document !== 'undefined' ? createPortal(
    <div
      className={`${xenoCardFrameStyles.lightbox} ${isVisible ? xenoCardFrameStyles.lightboxOpen : ''}`.trim()}
      role="dialog"
      aria-modal="true"
      aria-labelledby={dialogTitleId}
      onClick={closeLightbox}
    >
      <div
        className={`${xenoCardFrameStyles.lightboxPanel} ${isVisible ? xenoCardFrameStyles.lightboxPanelOpen : ''}`.trim()}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={`${xenoCardFrameStyles.rivet} ${xenoCardFrameStyles.rivetTl}`} />
        <div className={`${xenoCardFrameStyles.rivet} ${xenoCardFrameStyles.rivetBl}`} />
        <div className={`${xenoCardFrameStyles.rivet} ${xenoCardFrameStyles.rivetBr}`} />
        <button
          type="button"
          className={xenoCardFrameStyles.lightboxClose}
          onClick={closeLightbox}
          aria-label="Close enlarged image"
        />
        <div className={`${xenoCardFrameStyles.imageContainer}${staticHighlight ? ` ${xenoCardFrameStyles.staticHighlightContainer}` : ''}`} style={{ '--dark': 0.5, '--dark-inverse': 2 }}>
          <img
            src={imgSrc}
            alt={alt || title || ''}
            className={`${xenoCardFrameStyles.lightboxImage}${highlight ? ` ${xenoCardFrameStyles.darkened}` : ''}`}
            onClick={closeLightbox}
          />
          {highlight && [highlight].flat().map((/** @type {HighlightOptions} */ hi, i) =>
            <div className={xenoCardFrameStyles.highlight} key={(hi.text||"")+i} style={{
              position: 'absolute',
              top:    hi.grow ? `calc(${percent(hi.t)} - ${hi.grow}px)` : percent(hi.t),
              left:   hi.grow ? `calc(${percent(hi.l)} - ${hi.grow}px)` : percent(hi.l),
              width:  hi.grow ? `calc(${percent(hi.w)} + ${2*hi.grow}px)` : percent(hi.w),
              height: hi.grow ? `calc(${percent(hi.h)} + ${2*hi.grow}px)` : percent(hi.h),
              ...(hi.style || {})
            }}>{hi.text || ""}</div>
          )}
        </div>
        {(title || alt) && (
          <div id={dialogTitleId} className={xenoCardFrameStyles.lightboxCaption}>
            {title || alt}
          </div>
        )}
      </div>
    </div>,
    document.body,
  ) : null

  return (
    <>
      <XenoCardFrame
        title={title}
        style={style}
        topSpacing={topSpacing}
        className={xenoCardFrameStyles.interactiveCard}
      >
        <button
          type="button"
          className={xenoCardFrameStyles.imageButton}
          onClick={() => setIsOpen(true)}
          aria-label={`Open enlarged image${title ? `: ${title}` : ''}`}
        >
          <div className={`${xenoCardFrameStyles.imageContainer}${staticHighlight ? ` ${xenoCardFrameStyles.staticHighlightContainer}` : ''}`}>
          <img
            src={imgSrc}
            alt={alt || title || ''}
            className={`${xenoCardFrameStyles.image}${highlight ? ` ${xenoCardFrameStyles.darkened}` : ''}`}
            style={resolvedImageStyle}
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
        </button>
      </XenoCardFrame>
      {lightbox}
    </>
  );
};
