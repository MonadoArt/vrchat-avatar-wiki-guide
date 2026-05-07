import IconExternalLink from '@theme/Icon/ExternalLink';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { VCC_PACKAGES } from '@site/src/data/vccPackages';
import styles from './InstallationInlineUi.module.css';

export const VccIcon = ({ size = '1.2em' }) => (
  <img
    src={useBaseUrl('/img/vcc-favicon.ico')}
    alt="VCC"
    style={{
      width: size,
      height: size,
      objectFit: 'contain',
      verticalAlign: 'text-bottom',
      margin: '0 2px',
      flexShrink: 0,
    }}
  />
);

export const VccAppBadge = ({ label = 'Creator Companion' }) => (
  <span className={styles.vccAppBadge}>
    <img src={useBaseUrl('/img/vcc-favicon.ico')} alt="" aria-hidden="true" className={styles.vccAppIcon} />
    <span>{label}</span>
  </span>
);

export const VccProjectsLabel = () => (
  <span className={styles.vccSidebarItem}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="14"
      height="14"
      aria-hidden="true"
      className={styles.vccSidebarIcon}
    >
      <path d="M6.25 3A3.25 3.25 0 0 0 3 6.25v11.5C3 19.55 4.46 21 6.25 21h11.5c1.8 0 3.25-1.46 3.25-3.25V6.25C21 4.45 19.54 3 17.75 3H6.25ZM4.5 6.25c0-.97.78-1.75 1.75-1.75h11.5c.97 0 1.75.78 1.75 1.75v11.5c0 .97-.78 1.75-1.75 1.75H6.25c-.97 0-1.75-.78-1.75-1.75V6.25Z" />
      <path d="M7.75 6A1.75 1.75 0 0 0 6 7.75v2c0 .97.78 1.75 1.75 1.75h2c.97 0 1.75-.78 1.75-1.75v-2C11.5 6.78 10.72 6 9.75 6h-2Z" />
      <path d="M14.25 6c-.97 0-1.75.78-1.75 1.75v2c0 .97.78 1.75 1.75 1.75h2c.96 0 1.75-.78 1.75-1.75v-2C18 6.78 17.2 6 16.25 6h-2Z" />
      <path d="M7.75 12.5c-.96 0-1.75.78-1.75 1.75v2C6 17.22 6.8 18 7.75 18h2c.97 0 1.75-.78 1.75-1.75v-2c0-.97-.78-1.75-1.75-1.75h-2Z" />
      <path d="M14.25 12.5c-.97 0-1.75.78-1.75 1.75v2c0 .97.78 1.75 1.75 1.75h2c.97 0 1.75-.78 1.75-1.75v-2c0-.97-.78-1.75-1.75-1.75h-2Z" />
    </svg>
    <span>Projects</span>
  </span>
);

export const VccManageProjectLabel = () => (
  <span className={styles.vccActionLabel}>Manage Project</span>
);

export const PackageBoxIcon = ({ checked = false, size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    aria-hidden="true"
    className={styles.packageBoxIcon}
  >
    {checked ? (
      <path d="M10.6 2.51c.9-.36 1.9-.36 2.8 0l7.5 3.04c.67.27 1.1.91 1.1 1.62v5.64a6.52 6.52 0 0 0-1.5-1.08V7.77l-7.75 3v2.3a6.5 6.5 0 0 0-1.5 2.64v-4.95L3.5 7.75v9.08c0 .1.06.2.16.23l7.5 3.04.09.04.19.07.18.06c.25.53.56 1.01.94 1.45-.66.1-1.34.02-1.97-.23l-7.5-3.04C2.43 18.18 2 17.54 2 16.83V7.17c0-.7.43-1.35 1.1-1.62l7.5-3.04Zm2.25 1.4a2.25 2.25 0 0 0-1.7 0l-1.9.77 7.52 2.93 2.67-1.03-6.6-2.68Zm1.84 4.5L7.21 5.5 4.6 6.56 12 9.45l2.7-1.04Zm2.8 5.84a.75.75 0 0 1 1.06 0l1.45 1.46 3-3a.75.75 0 1 1 1.06 1.06l-3.53 3.53a.75.75 0 0 1-1.06 0l-1.98-1.99a.75.75 0 0 1 0-1.06Z" />
    ) : (
      <path d="M10.6 2.51c.9-.36 1.9-.36 2.8 0l7.5 3.04c.67.27 1.1.91 1.1 1.62v9.66c0 .71-.43 1.35-1.1 1.62l-7.5 3.04c-.9.37-1.9.37-2.8 0l-7.5-3.04c-.67-.27-1.1-.91-1.1-1.62V7.17c0-.7.43-1.35 1.1-1.62l7.5-3.04Zm2.25 1.4a2.25 2.25 0 0 0-1.7 0l-1.9.77 7.52 2.93 2.67-1.03-6.6-2.68Zm1.84 4.5L7.21 5.5 4.6 6.56 12 9.45l2.7-1.04ZM3.5 16.83c0 .1.06.2.16.23l7.5 3.04.09.04v-9.38L3.5 7.75v9.08Zm9.35 3.27 7.5-3.04c.09-.04.15-.13.15-.23V7.77l-7.75 3v9.37l.1-.04Z" />
    )}
  </svg>
);

export const AddIcon = () => (
  <span className={styles.iconButton}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24" className={styles.addSvg}>
      <path d="M15 11a1 1 0 1 1 2 0v4h4a1 1 0 1 1 0 2h-4v4a1 1 0 1 1-2 0v-4h-4a1 1 0 1 1 0-2h4v-4Zm15 5a14 14 0 1 1-28 0 14 14 0 0 1 28 0Zm-2 0a12 12 0 1 0-24 0 12 12 0 0 0 24 0Z" />
    </svg>
  </span>
);

export const RemoveIcon = () => (
  <span className={styles.iconButton}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24" className={styles.removeSvg}>
      <path d="M28 16a12 12 0 1 0-24 0 12 12 0 0 0 24 0Zm2 0a14 14 0 1 1-28 0 14 14 0 0 1 28 0Zm-20-1a1 1 0 1 0 0 2h12a1 1 0 1 0 0-2H10Z" />
    </svg>
  </span>
);

const VersionPill = ({ label, chevronClassName }) => (
  <span className={styles.versionPill}>
    {label}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="10" height="10" className={`${styles.versionChevron} ${chevronClassName}`.trim()}>
      <path d="M15.85 7.65c.2.2.2.5 0 .7l-5.46 5.49a.55.55 0 0 1-.78 0L4.15 8.35a.5.5 0 1 1 .7-.7L10 12.8l5.15-5.16c.2-.2.5-.2.7 0Z" />
    </svg>
  </span>
);

export const VersionNone = () => (
  <VersionPill label="none" chevronClassName={styles.versionChevronNone} />
);

export const VersionInstalled = () => (
  <VersionPill label="1.2.3" chevronClassName={styles.versionChevronInstalled} />
);

export const PackageInstallList = () => {
  const installOrder = ['vrcfury', 'poiyomi', 'facetracking', 'gogoloco'];
  const orderedPackages = installOrder
    .map((id) => VCC_PACKAGES.find((pkg) => pkg.id === id))
    .filter(Boolean);

  const items = orderedPackages.map((pkg) => ({
    repoKind: 'Community',
    name: pkg.installName || pkg.name,
    url: pkg.url,
    tagline: pkg.installTagline,
    note: pkg.installNote ? <>{pkg.installNote}</> : null,
  }));

  return (
    <div className={styles.packageListFrame}>
      <ul className={styles.packageList}>
        {items.map((item) => (
          <li key={item.name} className={styles.packageListItem}>
            <PackageBoxIcon checked={item.repoKind === 'Official' || item.repoKind === 'Curated'} />
            <span className={styles.packageListText}>
              <strong>
                <a href={item.url} className={`pkg-name-link ${styles.packageListLink}`.trim()}>
                  {item.name}
                  <IconExternalLink />
                </a>
              </strong>
              {item.tagline ? <span className={styles.packageTagline}>{item.tagline}</span> : null}
              {item.note ? <span className={styles.packageNote}>{item.note}</span> : null}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const DisabledAddToVccCta = () => (
  <span className={styles.disabledCtaWrap}>
    <span className={`button button--secondary pkg-add-btn ${styles.disabledCtaButton}`.trim()}>
      <span>Add to VCC</span>
      <IconExternalLink />
    </span>
  </span>
);
