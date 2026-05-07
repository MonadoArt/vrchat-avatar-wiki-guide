/**
 * PlaceholderCard - same frame + rivets as LocationCard, but shows
 * a caution-styled text area instead of an image. Use wherever a
 * screenshot is still needed. Replace the whole component with a
 * LocationCard once the real image is available.
 *
 * Usage:
 *   <PlaceholderCard title="Right-click Menu" text="Put a screenshot of the right-click menu here" />
 */

import { XenoCardFrame, xenoCardFrameStyles } from './XenoCardFrame';

export const PlaceholderCard = ({ title, text, style, topSpacing }) => {
  return (
    <XenoCardFrame title={title} style={style} topSpacing={topSpacing}>
      <div className={xenoCardFrameStyles.placeholderPanel}>
        <span className={xenoCardFrameStyles.placeholderIcon}>{"\u26A0\uFE0F"}</span>
        <span className={xenoCardFrameStyles.placeholderText}>{text}</span>
      </div>
    </XenoCardFrame>
  );
};
