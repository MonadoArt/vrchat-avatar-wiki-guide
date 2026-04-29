/**
 * PlaceholderCard - same frame + rivets as LocationCard, but shows
 * a caution-styled text area instead of an image. Use wherever a
 * screenshot is still needed. Replace the whole component with a
 * LocationCard once the real image is available.
 *
 * Usage:
 *   <PlaceholderCard title="Right-click Menu" text="Put a screenshot of the right-click menu here" />
 */

export const PlaceholderCard = ({ title, text, style }) => {
  const cardStyle = title ? style : { marginTop: 0, ...style };
  return (
    <div className="xeno-location-card" style={cardStyle}>
      <div className="xeno-location-card__frame">
        <div className="xeno-location-card__rivet xeno-location-card__rivet--tl" />
        <div className="xeno-location-card__rivet xeno-location-card__rivet--tr" />
        <div className="xeno-location-card__rivet xeno-location-card__rivet--bl" />
        <div className="xeno-location-card__rivet xeno-location-card__rivet--br" />
        <div style={{
          minHeight: '120px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          padding: '1rem',
          background: 'rgba(180, 120, 0, 0.12)',
          borderRadius: '4px',
          border: '1px dashed rgba(217, 119, 6, 0.5)',
          textAlign: 'center',
        }}>
          <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>⚠️</span>
          <span style={{
            fontSize: '0.8rem',
            color: 'var(--xeno-beige-light)',
            lineHeight: 1.5,
            opacity: 0.85,
          }}>
            {text}
          </span>
        </div>
      </div>
      {title && <div className="xeno-location-card__label">{title}</div>}
    </div>
  );
};
