import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { GaugeHeader } from '@site/src/components/XenoMarkers';

import styles from './index.module.css';

type ButtonDef = {
  label: string;
  to: string;
  external?: boolean;
};

type CardProps = {
  title: string;
  description: string;
  image?: string;
  buttons: ButtonDef[];
};

const btnClass = 'button button--secondary pkg-add-btn';

function CardButton({ label, to, external }: ButtonDef) {
  if (external) {
    return (
      <a className={btnClass + ' ' + styles.cardBtn} href={to} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }
  return (
    <Link className={btnClass + ' ' + styles.cardBtn} to={to}>
      {label}
    </Link>
  );
}

function LandingCard({ title, description, image, buttons }: CardProps) {
  return (
    <div className={styles.card}>
      <div className="xeno-location-card__label">{title}</div>
      <div className="xeno-location-card__rivet xeno-location-card__rivet--tl" />
      <div className="xeno-location-card__rivet xeno-location-card__rivet--tr" />
      <div className="xeno-location-card__rivet xeno-location-card__rivet--bl" />
      <div className="xeno-location-card__rivet xeno-location-card__rivet--br" />
      <div className={styles.cardImage}>
        {image ? (
          <img src={useBaseUrl(image)} alt={title} className={styles.cardImg} />
        ) : (
          <div className={styles.cardImagePlaceholder} />
        )}
      </div>
      <div className={styles.cardBody}>
        <p className={styles.cardDescription}>{description}</p>
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.cardButtons}>
          {buttons.map((btn) => (
            <CardButton key={btn.label} {...btn} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main className={styles.page}>

        <div className={styles.hero}>
          <GaugeHeader size="3rem">
            <img src={useBaseUrl('/img/logo.png')} alt="" className={styles.gaugeLogoImg} />
            Monado Art
          </GaugeHeader>
          <div className={styles.intro}>
            <h1 className={styles.introTitle}>{siteConfig.title}</h1>
            <p className={styles.introTagline}>{siteConfig.tagline}</p>
          </div>
        </div>

        <div className={styles.container}>

          <div className={styles.cards}>
            <LandingCard
              title="Avatar Wiki"
              description="Step-by-step guides for importing, customising, and uploading your avatar into VRChat."
              image="/img/yougotanymoreofthempixels.jpg"
              buttons={[
                { label: 'Open Wiki', to: '/docs/intro' },
              ]}
            />
            <LandingCard
              title="Store Pages"
              description="Browse avatars and assets available for free over at Gumroad."
              buttons={[
                { label: 'Gumroad',  to: 'https://monadoart.gumroad.com/', external: true }
              ]}
            />
            <LandingCard
              title="Patreon and Ko-fi"
              description="If you think the project is cool and want to support it, consider donating! It helps cover hosting costs and gives you early access to content!"
              buttons={[
                { label: 'Visit Patreon', to: 'https://patreon.com/Monado_Art', external: true },
                { label: 'Visit Ko-fi', to: 'https://ko-fi.com/monadoart', external: true },
              ]}
            />
          </div>

        </div>
      </main>
    </Layout>
  );
}
