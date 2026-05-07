import styles from './DocsPageLead.module.css';

export const DocsPageLead = ({ children }) => (
  <span className={styles.lead}>{children}</span>
);
