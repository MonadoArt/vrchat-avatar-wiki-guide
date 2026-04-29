/**
 * LocationCard - XB1 location/area card style.
 *
 * Three layers:
 *   1. Image - the card content
 *   2. Frame - dark border with rivets at each corner
 *   3. Label - pill capsule centered on the top border
 *
 * Usage:
 *   <LocationCard src="/img/something.png" title="Colony 6" />
 *   <LocationCard src="/img/something.png" title="Colony 6" alt="Colony 6 screenshot" />
 *
 * src goes through useBaseUrl automatically - pass the /img/ path as-is.
 */

import useBaseUrl from '@docusaurus/useBaseUrl';

export const LocationCard = ({ src, title, alt, style }) => {
  const imgSrc = useBaseUrl(src);
  return (
    <div className="xeno-location-card" style={style}>
      <div className="xeno-location-card__frame">
        <img
          src={imgSrc}
          alt={alt || title || ''}
          className="xeno-location-card__image"
        />
        <div className="xeno-location-card__rivet xeno-location-card__rivet--tl" />
        <div className="xeno-location-card__rivet xeno-location-card__rivet--tr" />
        <div className="xeno-location-card__rivet xeno-location-card__rivet--bl" />
        <div className="xeno-location-card__rivet xeno-location-card__rivet--br" />
      </div>
      {title && <div className="xeno-location-card__label">{title}</div>}
    </div>
  );
};
