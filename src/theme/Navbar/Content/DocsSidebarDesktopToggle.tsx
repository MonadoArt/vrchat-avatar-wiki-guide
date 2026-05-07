import { type ReactNode } from 'react';
import { translate } from '@docusaurus/Translate';
import clsx from 'clsx';
import IconMenu from '@theme/Icon/Menu';
import { useDocsSidebarChrome } from '@site/src/theme/shared/docsSidebarChromeContext';

import styles from './styles.module.css';

export default function DocsSidebarDesktopToggle(): ReactNode {
  const { hiddenSidebarContainer, sidebarAvailable, toggleSidebar } = useDocsSidebarChrome();

  if (!sidebarAvailable || !toggleSidebar) {
    return null;
  }

  return (
    <button
      onClick={toggleSidebar}
      aria-label={translate({
        id: 'theme.docs.sidebar.toggleSidebarButtonAriaLabel',
        message: 'Toggle navigation bar',
        description: 'The ARIA label for hamburger menu button of desktop docs navigation',
      })}
      aria-expanded={!hiddenSidebarContainer}
      className={clsx('navbar__toggle', 'clean-btn', styles.docsDesktopSidebarToggle)}
      type="button">
      <IconMenu />
    </button>
  );
}
