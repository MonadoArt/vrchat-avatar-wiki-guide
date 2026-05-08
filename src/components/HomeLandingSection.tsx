import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import { GaugeHeader } from '@site/src/components/XenoMarkers';
import { XenoCardFrame } from '@site/src/components/XenoCardFrame';

import styles from './HomeLandingSection.module.css';

export type ButtonDef = {
  label: string;
  to: string;
  external?: boolean;
};

export type CardDef = {
  title: string;
  description: string;
  image?: string;
  aspectRatio?: '4/3' | '16/9';
  buttons: ButtonDef[];
};

type Props = {
  logoPath: string;
  brandName: string;
  children: ReactNode;
};

function CardButton({ label, to, external, className = '' }: ButtonDef & { className?: string }) {
  const btnClass = `button button--secondary ${styles.cardBtn} ${className}`;
  if (external) {
    return (
      <a className={btnClass} href={to} target="_blank" rel="noopener noreferrer">
        <span>{label}</span>
        <IconExternalLink />
      </a>
    );
  }
  return (
    <Link className={btnClass} to={to}>
      {label}
    </Link>
  );
}

export function LandingCard({ title, description, image, aspectRatio = '4/3', buttons }: CardDef) {
  const imgSrc = useBaseUrl(image ?? '');
  return (
    <XenoCardFrame title={title} className={styles.card} frameClassName={styles.cardFrame} labelClassName={styles.cardLabel}>
      <div className={styles.cardImage} style={{ '--card-aspect-ratio': aspectRatio } as React.CSSProperties}>
        {image ? (
          <img src={imgSrc} alt={title} className={styles.cardImg} />
        ) : (
          <div className={styles.cardImagePlaceholder} />
        )}
      </div>
      <div className={styles.cardBody}>
        <p className={styles.cardDescription}>{description}</p>
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.cardButtons}>
          {buttons.map((btn, i) => (
            <CardButton key={btn.label} {...btn} className={i === 0 ? styles.cardLink : styles.cardBtnSecondary} />
          ))}
        </div>
      </div>
    </XenoCardFrame>
  );
}

export function CardGrid({ children, cols = 3 }: { children: ReactNode; cols?: number }) {
  return (
    <div
      className={styles.cards}
      style={{ '--card-cols': String(cols) } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

export function HomeLandingSection({ logoPath, brandName, children }: Props): ReactNode {
  const logoSrc = useBaseUrl(logoPath);

  return (
    <div className={styles.contentBox} data-page="intro">
      <div className={styles.root}>
        <div className={styles.hero}>
          <GaugeHeader size="3rem" className={styles.heroGauge}>
            {brandName}
          </GaugeHeader>
        </div>
        <div className={styles.container}>
          {children}
        </div>
      </div>
    </div>
  );
}
