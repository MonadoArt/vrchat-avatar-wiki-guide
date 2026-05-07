import React from 'react';
import styles from './XenoCardFrame.module.css';

/**
 * @typedef {object} XenoCardFrameProps
 * @property {import('react').ReactNode} children
 * @property {string=} title
 * @property {import('react').CSSProperties=} style
 * @property {string=} className
 * @property {string=} frameClassName
 * @property {string=} labelClassName
 * @property {import('react').CSSProperties=} frameStyle
 * @property {import('react').CSSProperties=} labelStyle
 * @property {'auto' | 'none'=} topSpacing
 */

/**
 * @param {XenoCardFrameProps} props
 */
export const XenoCardFrame = ({
  title,
  style,
  className = '',
  frameClassName = '',
  labelClassName = '',
  frameStyle,
  labelStyle,
  topSpacing = 'auto',
  children,
}) => {
  // Keep default behavior: title-less cards don't reserve floating-label top space.
  const resolvedTopSpacing = topSpacing === 'none' ? 0 : (title ? undefined : 0);
  const cardStyle = resolvedTopSpacing === undefined ? style : { marginTop: resolvedTopSpacing, ...style };

  return (
    <div className={`${styles.card} ${className}`.trim()} style={cardStyle}>
      <div className={`${styles.frame} ${frameClassName}`.trim()} style={frameStyle}>
        {children}
        <div className={`${styles.rivet} ${styles.rivetTl}`} />
        <div className={`${styles.rivet} ${styles.rivetTr}`} />
        <div className={`${styles.rivet} ${styles.rivetBl}`} />
        <div className={`${styles.rivet} ${styles.rivetBr}`} />
      </div>
      {title && <div className={`${styles.label} ${labelClassName}`.trim()} style={labelStyle}>{title}</div>}
    </div>
  );
};
