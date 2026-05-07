import styles from './DocsMediaRow.module.css';

export const DocsMediaRow = ({ children, media }) => {
  return (
    <div className={styles.row}>
      <div className={styles.content}>{children}</div>
      <div className={styles.media}>{media}</div>
    </div>
  );
};
