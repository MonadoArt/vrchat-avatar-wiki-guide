import styles from './DocsMediaRow.module.css';

export const DocsMediaRow = ({ children, media, mediaStyle }) => {
  return (
    <div className={styles.row}>
      <div className={styles.content}>{children}</div>
      <div className={styles.media} style={mediaStyle}>{media}</div>
    </div>
  );
};
