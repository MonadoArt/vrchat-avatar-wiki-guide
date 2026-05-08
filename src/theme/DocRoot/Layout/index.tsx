import React, { type ReactNode, useEffect } from 'react';
import { useDocsSidebar } from '@docusaurus/plugin-content-docs/client';
import { useLocation } from '@docusaurus/router';
import BackToTopButton from '@theme/BackToTopButton';
import DocRootLayoutSidebar from '@theme/DocRoot/Layout/Sidebar';
import DocRootLayoutMain from '@theme/DocRoot/Layout/Main';
import type { Props } from '@theme/DocRoot/Layout';
import { useDocsSidebarChrome } from '@site/src/theme/shared/docsSidebarChromeContext';
import { getXenoDecorForPath, getXenoDecorStyleForPath } from '@site/src/theme/shared/xenoPageDecor';

import styles from './styles.module.css';

export default function DocRootLayout({ children }: Props): ReactNode {
  const sidebar = useDocsSidebar();
  const { pathname } = useLocation();
  const {
    hiddenSidebarContainer,
    setHiddenSidebarContainer,
    setSidebarAvailable,
  } = useDocsSidebarChrome();
  const xenoDecor = getXenoDecorForPath(pathname);
  const xenoDecorStyle = getXenoDecorStyleForPath(pathname);

  useEffect(() => {
    setSidebarAvailable(Boolean(sidebar));
    return () => setSidebarAvailable(false);
  }, [sidebar, setSidebarAvailable]);

  useEffect(() => {
    document.documentElement.dataset.xenoDecor = xenoDecor;
    document.documentElement.dataset.xenoDecorStyle = xenoDecorStyle;

    return () => {
      delete document.documentElement.dataset.xenoDecor;
      delete document.documentElement.dataset.xenoDecorStyle;
    };
  }, [xenoDecor, xenoDecorStyle]);

  return (
    <div className={styles.docsWrapper}>
      <BackToTopButton />
      <div className={styles.docRoot}>
        {sidebar && (
          <DocRootLayoutSidebar
            sidebar={sidebar.items}
            hiddenSidebarContainer={hiddenSidebarContainer}
            setHiddenSidebarContainer={setHiddenSidebarContainer}
          />
        )}
        <DocRootLayoutMain hiddenSidebarContainer={hiddenSidebarContainer}>
          {children}
        </DocRootLayoutMain>
      </div>
    </div>
  );
}
