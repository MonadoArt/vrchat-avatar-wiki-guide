/**
 * HoverOption + VideoFrame
 *
 * HoverOption  - hover-aware wrapper. Adds a warm background highlight and
 *                left accent on hover. Provides hover state via context.
 *
 * VideoFrame   - framed video card with optional hover-driven playback.
 *                Drop it anywhere inside a HoverOption. Styled identically to
 *                LocationCard (same frame, rivets, label capsule), and can
 *                be expanded into a fullscreen player with native controls.
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
 *         <VideoFrame src="/video/option-a.mp4" title="Right-click Menu" />
 *
 *       </div>
 *     </div>
 *   </HoverOption>
 *
 * `src` is optional - omit it while the video isn't ready and a placeholder is shown.
 * `hover` enables hover-controlled play/pause. Defaults to false.
 * `resetOnUnfocus` rewinds when hover is lost. Defaults to false.
 * `resetOnHover` rewinds when hover begins. Defaults to false.
 */

import { createContext, createElement, useCallback, useContext, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { XenoCardFrame, xenoCardFrameStyles } from './XenoCardFrame';
import styles from './HoverOption.module.css';

const HoverOptionContext = createContext(/** @type {boolean | null} */ (null));

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

export const VideoFrame = ({
  src,
  title,
  hover = false,
  resetOnUnfocus = false,
  resetOnHover = false,
  noProgressBar = false,
}) => {
  const hovered = useContext(HoverOptionContext);
  const hasHoverOptionParent = hovered !== null;
  const previewVideoRef = useRef(null);
  const lightboxVideoRef = useRef(null);
  const previousHoveredRef = useRef(hovered);
  const resolvedSrc = useBaseUrl(src ?? '/');
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [resumeTime, setResumeTime] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [progress, setProgress] = useState(0);
  const closeTimeoutRef = useRef(/** @type {ReturnType<typeof setTimeout> | null} */ (null));
  const dialogTitleId = useId();

  const closeLightbox = useCallback(() => {
    if (lightboxVideoRef.current) {
      setResumeTime(lightboxVideoRef.current.currentTime);
    }
    setIsOpen(false);
  }, []);

  const handlePreviewMouseEnter = useCallback(() => {
    if (!resetOnHover || hasHoverOptionParent || !previewVideoRef.current || isOpen) {
      return;
    }

    previewVideoRef.current.currentTime = 0;
    setResumeTime(0);

    if (previewVideoRef.current.paused) {
      previewVideoRef.current.play().catch(() => {
        // Silently ignore autoplay policy blocks.
      });
    }
  }, [hasHoverOptionParent, isOpen, resetOnHover]);

  useEffect(() => {
    if (!resetOnHover || !hasHoverOptionParent || !previewVideoRef.current || isOpen) {
      previousHoveredRef.current = hovered;
      return;
    }

    if (!previousHoveredRef.current && hovered) {
      previewVideoRef.current.currentTime = 0;
      setResumeTime(0);

      if (previewVideoRef.current.paused) {
        previewVideoRef.current.play().catch(() => {
          // Silently ignore autoplay policy blocks.
        });
      }
    }

    previousHoveredRef.current = hovered;
  }, [hasHoverOptionParent, hovered, isOpen, resetOnHover]);

  useEffect(() => {
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

  useEffect(() => {
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

  useEffect(() => {
    const el = previewVideoRef.current;
    if (!el || hover) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (isOpen) return;
      if (entry.isIntersecting) {
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    }, { threshold: 0.25 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [hover, isOpen]);

  useEffect(() => {
    if (!previewVideoRef.current || isOpen || !hover) return undefined;

    if (hovered) {
      previewVideoRef.current.play().catch(() => {
        // Silently ignore autoplay policy blocks (e.g. Safari strict mode).
      });
    } else {
      previewVideoRef.current.pause();
      if (resetOnUnfocus) {
        previewVideoRef.current.currentTime = 0;
        setResumeTime(0);
      } else {
        setResumeTime(previewVideoRef.current.currentTime);
      }
    }

    return undefined;
  }, [hover, hovered, isOpen, resetOnUnfocus, resumeTime]);

  useEffect(() => {
    if (!previewVideoRef.current || isOpen) {
      return;
    }

    if (Math.abs(previewVideoRef.current.currentTime - resumeTime) < 0.05) {
      return;
    }

    previewVideoRef.current.currentTime = resumeTime;
  }, [isOpen, resumeTime]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    if (previewVideoRef.current) {
      setResumeTime(previewVideoRef.current.currentTime);
    }
    previewVideoRef.current?.pause();

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

  useEffect(() => {
    if (!isVisible || !lightboxVideoRef.current) {
      return;
    }

    lightboxVideoRef.current.currentTime = resumeTime;
    lightboxVideoRef.current.play().catch(() => {
      // Silently ignore autoplay policy blocks.
    });
  }, [isVisible, resumeTime]);

  const lightbox = src && isRendered && typeof document !== 'undefined'
    ? createPortal(
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
              aria-label="Close enlarged video"
            />
            <video
              ref={lightboxVideoRef}
              src={resolvedSrc}
              controls
              playsInline
              preload="metadata"
              className={styles.lightboxVideo}
            />
            {title && (
              <div id={dialogTitleId} className={xenoCardFrameStyles.lightboxCaption}>
                {title}
              </div>
            )}
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
    <XenoCardFrame
      title={title}
      topSpacing="none"
      className={src ? xenoCardFrameStyles.interactiveCard : ''}
    >
      {src ? (
        <div className={styles.videoShell}>
          <button
            type="button"
            className={styles.videoButton}
            onClick={() => setIsOpen(true)}
            onMouseEnter={handlePreviewMouseEnter}
            aria-label={`Open enlarged video${title ? `: ${title}` : ''}`}
          >
            {(!isLoaded || isBuffering) && (
              <div className={styles.playOverlay} aria-hidden="true">
                {isLoaded ? <div className={styles.spinner} /> : '▶'}
              </div>
            )}
            <video
              ref={previewVideoRef}
              src={resolvedSrc}
              muted
              loop
              playsInline
              preload="metadata"
              onTimeUpdate={(e) => setProgress(e.target.currentTime / (e.target.duration || 1))}
              onWaiting={() => setIsBuffering(true)}
              onPlaying={() => { setIsLoaded(true); setIsBuffering(false); }}
              className={`${styles.videoMedia} ${xenoCardFrameStyles.mediaBlock}`}
            />
          </button>
        </div>
      ) : (
        <div className={styles.placeholder}>
          <span className={styles.placeholderIcon}>{'\u25B6'}</span>
          <span className={styles.placeholderText}>Video coming soon</span>
        </div>
      )}
      {!noProgressBar && src && (
        <>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${progress * 100}%` }} />
          </div>
          <div className={styles.progressBorderTopOverlay} />
          <div className={styles.progressBorderBottomOverlay} />
        </>
      )}
    </XenoCardFrame>
    {lightbox}
    </>
  );
};

export const HoverVideo = (props) => createElement(VideoFrame, props);
