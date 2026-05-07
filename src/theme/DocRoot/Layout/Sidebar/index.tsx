import React, {type ReactNode, useEffect, useState, useCallback} from 'react';
import clsx from 'clsx';
import {prefersReducedMotion, ThemeClassNames} from '@docusaurus/theme-common';
import {useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import {useLocation} from '@docusaurus/router';
import DocSidebar from '@theme/DocSidebar';
import type {Props} from '@theme/DocRoot/Layout/Sidebar';
import { useDocsSidebarChrome } from '@site/src/theme/shared/docsSidebarChromeContext';

import styles from './styles.module.css';

function ResetOnSidebarChange({ children }: { children: ReactNode }) {
  const sidebar = useDocsSidebar();
  return (
    <React.Fragment key={sidebar?.name ?? 'noSidebar'}>
      {children}
    </React.Fragment>
  );
}

export default function DocRootLayoutSidebar({
  sidebar,
  hiddenSidebarContainer,
  setHiddenSidebarContainer,
}: Props): ReactNode {
  const { pathname } = useLocation();
  const { setToggleSidebar } = useDocsSidebarChrome();

  const [hiddenSidebar, setHiddenSidebar] = useState(false);
  const toggleSidebar = useCallback(() => {
    if (hiddenSidebar) {
      setHiddenSidebar(false);
    }
    if (!hiddenSidebar && prefersReducedMotion()) {
      setHiddenSidebar(true);
    }
    setHiddenSidebarContainer((value) => !value);
  }, [setHiddenSidebarContainer, hiddenSidebar]);

  useEffect(() => {
    setToggleSidebar(() => toggleSidebar);
    return () => setToggleSidebar(null);
  }, [setToggleSidebar, toggleSidebar]);

  return (
    <>
      <aside
        className={clsx(
          ThemeClassNames.docs.docSidebarContainer,
          styles.docSidebarContainer,
          hiddenSidebarContainer && styles.docSidebarContainerHidden,
        )}
        onTransitionEnd={(e) => {
          if (!e.currentTarget.classList.contains(styles.docSidebarContainer!)) {
            return;
          }

          if (hiddenSidebarContainer) {
            setHiddenSidebar(true);
          }
        }}>
        <ResetOnSidebarChange>
          <div
            className={clsx(
              styles.sidebarViewport,
              hiddenSidebar && styles.sidebarViewportHidden,
            )}>
            <DocSidebar
              sidebar={sidebar}
              path={pathname}
              onCollapse={toggleSidebar}
              isHidden={hiddenSidebar}
            />
          </div>
        </ResetOnSidebarChange>
      </aside>
    </>
  );
}
