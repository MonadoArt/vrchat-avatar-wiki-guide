import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import IconExternalLink from '@theme/Icon/ExternalLink';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { XenoCardFrame } from '@site/src/components/XenoCardFrame';
import { useVccAdded } from '@site/src/components/useVccAdded';
import { VCC_PACKAGE_GROUPS } from '@site/src/data/vccPackages';
import styles from './VccPackageCards.module.css';

const PackageCard = ({ pkg, isAdded, onAdd }) => {
  return (
    <div className={`${styles.card} ${isAdded ? styles.cardAdded : ''}`.trim()}>
      <div className={styles.cardHeader}>
        <div className={styles.cardHeaderText}>
          <strong className={`${styles.cardTitle} ${isAdded ? styles.cardTitleAdded : ''}`.trim()}>
            {isAdded ? '✓ ' : ''}
            {pkg.name}
          </strong>
          <p className={styles.cardDescription}>{pkg.description}</p>
        </div>
        <img src={pkg.icon} alt={pkg.name} className={styles.cardIcon} />
      </div>
      <div className={styles.cardBottom}>
        <a
          href={pkg.url}
          onClick={() => onAdd(pkg.id)}
          className={`button button--${isAdded ? 'success' : 'secondary'} ${styles.cardButton} ${isAdded ? styles.cardButtonAdded : ''}`.trim()}
        >
          {isAdded ? (
            '✓ Added to VCC'
          ) : (
            <>
              <span>Add to VCC</span>
              <IconExternalLink />
            </>
          )}
        </a>
        <p className={styles.cardHint}>
          Didn&apos;t work? Go to <strong>Settings {'>'} Packages {'>'} Add Repository</strong> and paste:
        </p>
        <div className={styles.cardUrlBlock}>
          <CodeBlock language="text">{pkg.fallback}</CodeBlock>
        </div>
      </div>
    </div>
  );
};

const PackageSection = ({
  title,
  sectionType,
  packages,
  added,
  onAdd,
  warning,
  className = '',
  frameClassName = '',
}) => {
  const isMandatory = sectionType === 'mandatory';
  const labelClass = isMandatory ? styles.mandatoryLabel : styles.optionalLabel;
  const sectionFrameClassName = isMandatory ? styles.mandatoryFrame : styles.optionalFrame;

  return (
    <div className={`${styles.sectionWrap} ${className}`.trim()}>
      <div className={`${styles.label} ${labelClass}`.trim()}>{title}</div>
      <XenoCardFrame
        className={styles.sectionCard}
        frameClassName={`${styles.frameShell} ${sectionFrameClassName} ${frameClassName}`.trim()}
        style={{ marginTop: 0 }}
      >
        <div className={styles.frameContent}>
          {warning ? <div className={styles.warning}>{warning}</div> : null}
          <div className={styles.cardsGrid}>
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} isAdded={Boolean(added[pkg.id])} onAdd={onAdd} />
            ))}
          </div>
        </div>
      </XenoCardFrame>
    </div>
  );
};

export const VccPackageCards = ({ className = '', mandatoryClassName = '', optionalClassName = '' }) => {
  const { added, handleClick } = useVccAdded();

  const mandatory = VCC_PACKAGE_GROUPS.mandatory.map((pkg) => ({
    ...pkg,
    icon: useBaseUrl(pkg.iconPath),
  }));

  const optional = VCC_PACKAGE_GROUPS.optional.map((pkg) => ({
    ...pkg,
    icon: useBaseUrl(pkg.iconPath),
  }));

  const allAdded = [...mandatory, ...optional].every((pkg) => added[pkg.id]);

  return (
    <div className={`${styles.root} ${className}`.trim()}>
      <PackageSection
        title="Mandatory Dependencies"
        sectionType="mandatory"
        packages={mandatory}
        added={added}
        onAdd={handleClick}
        className={mandatoryClassName}
      />

      <PackageSection
        title="Optional - but heavily recommended"
        sectionType="optional"
        packages={optional}
        added={added}
        onAdd={handleClick}
        className={optionalClassName}
        warning={
          <>
            ⚠️ These packages are not strictly required, but <strong>pay close attention during the upload process</strong>. If you choose to skip them, missing packages can produce errors and cause the upload to fail.
          </>
        }
      />

      {allAdded ? (
        <div className={styles.allAdded}>
          <strong className={styles.allAddedTitle}>✓ All packages added!</strong> Head to the <strong>Projects</strong> tab in VCC, open <strong>Manage Project</strong>, and click <strong>+</strong> next to each one to install them.
        </div>
      ) : null}
    </div>
  );
};
