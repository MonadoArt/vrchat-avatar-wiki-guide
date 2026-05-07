import React from 'react';
import Root from '@theme-original/Root';
import { DocsSidebarChromeProvider } from '@site/src/theme/shared/docsSidebarChromeContext';

export default function RootWrapper(props: React.ComponentProps<typeof Root>): React.ReactNode {
  return (
    <DocsSidebarChromeProvider>
      <Root {...props} />
    </DocsSidebarChromeProvider>
  );
}
