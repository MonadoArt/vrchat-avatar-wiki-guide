/**
 * HoverOption + HoverVideo
 *
 * HoverOption  — hover-aware wrapper. Adds a warm background highlight and
 *                left accent on hover. Provides hover state via context.
 *
 * HoverVideo   — video card that plays when its parent HoverOption is hovered.
 *                Drop it anywhere inside a HoverOption. Styled identically to
 *                LocationCard (same frame, rivets, label capsule).
 *
 * Usage — keep your existing MDX layout, just wrap it and swap PlaceholderCard:
 *
 *   <HoverOption>
 *     <div style={{display:'flex', flexWrap:'wrap-reverse', gap:'2rem', alignItems:'flex-end', paddingTop:'1.5em'}}>
 *       <div style={{flex:1, minWidth:'280px'}}>
 *
 *         1. Your steps here...
 *
 *       </div>
 *       <div style={{flexShrink:0, width:'220px', maxWidth:'100%'}}>
 *
 *         <HoverVideo src="/video/option-a.mp4" title="Right-click Menu" />
 *
 *       </div>
 *     </div>
 *   </HoverOption>
 *
 * `src` is optional — omit it while the video isn't ready and a placeholder is shown.
 */

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

/* ── Context ──────────────────────────────────────────────────────────────── */

const HoverOptionContext = createContext(false);

/* ── HoverOption ──────────────────────────────────────────────────────────── */

export const HoverOption = ({ children }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <HoverOptionContext.Provider value={hovered}>
      <div
        className={`xeno-hover-option${hovered ? ' xeno-hover-option--active' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
      </div>
    </HoverOptionContext.Provider>
  );
};

/* ── HoverVideo ───────────────────────────────────────────────────────────── */

export const HoverVideo = ({ src, title }) => {
  const hovered = useContext(HoverOptionContext);
  const videoRef = useRef(null);
  const resolvedSrc = useBaseUrl(src ?? '/');

  useEffect(() => {
    if (!videoRef.current) return;
    if (hovered) {
      videoRef.current.play().catch(() => {
        // Silently ignore autoplay policy blocks (e.g. Safari strict mode).
      });
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [hovered]);

  return (
    <div className="xeno-location-card" style={{ marginTop: 0 }}>
      <div className="xeno-location-card__frame">
        <div className="xeno-location-card__rivet xeno-location-card__rivet--tl" />
        <div className="xeno-location-card__rivet xeno-location-card__rivet--tr" />
        <div className="xeno-location-card__rivet xeno-location-card__rivet--bl" />
        <div className="xeno-location-card__rivet xeno-location-card__rivet--br" />
        {src ? (
          <video
            ref={videoRef}
            src={resolvedSrc}
            muted
            loop
            playsInline
            className="xeno-location-card__image"
            style={{ display: 'block' }}
          />
        ) : (
          <div className="xeno-hover-option__placeholder">
            <span className="xeno-hover-option__placeholder-icon">▶</span>
            <span className="xeno-hover-option__placeholder-text">Video coming soon</span>
          </div>
        )}
      </div>
      {title && <div className="xeno-location-card__label">{title}</div>}
    </div>
  );
};
