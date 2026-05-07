/**
 * HoverOption + HoverVideo
 *
 * HoverOption  - hover-aware wrapper. Adds a warm background highlight and
 *                left accent on hover. Provides hover state via context.
 *
 * HoverVideo   - video card that plays when its parent HoverOption is hovered.
 *                Drop it anywhere inside a HoverOption. Styled identically to
 *                LocationCard (same frame, rivets, label capsule).
 *
 * Usage - keep your existing MDX layout, just wrap it and swap PlaceholderCard:
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
 * `src` is optional - omit it while the video isn't ready and a placeholder is shown.
 */

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { XenoCardFrame, xenoCardFrameStyles } from './XenoCardFrame';
import styles from './HoverOption.module.css';

const HoverOptionContext = createContext(false);

export const HoverOption = ({ children }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <HoverOptionContext.Provider value={hovered}>
      <div
        className={`${styles.hoverOption}${hovered ? ` ${styles.hoverOptionActive}` : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
      </div>
    </HoverOptionContext.Provider>
  );
};

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
    <XenoCardFrame title={title} topSpacing="none">
      {src ? (
        <video
          ref={videoRef}
          src={resolvedSrc}
          muted
          loop
          playsInline
          className={`${styles.videoMedia} ${xenoCardFrameStyles.mediaBlock}`}
        />
      ) : (
        <div className={styles.placeholder}>
          <span className={styles.placeholderIcon}>{'\u25B6'}</span>
          <span className={styles.placeholderText}>Video coming soon</span>
        </div>
      )}
    </XenoCardFrame>
  );
};
