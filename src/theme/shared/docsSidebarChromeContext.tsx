import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from 'react';

type DocsSidebarToggle = (() => void) | null;

type DocsSidebarChromeContextValue = {
  hiddenSidebarContainer: boolean;
  setHiddenSidebarContainer: Dispatch<SetStateAction<boolean>>;
  sidebarAvailable: boolean;
  setSidebarAvailable: Dispatch<SetStateAction<boolean>>;
  toggleSidebar: DocsSidebarToggle;
  setToggleSidebar: Dispatch<SetStateAction<DocsSidebarToggle>>;
};

const DocsSidebarChromeContext = createContext<DocsSidebarChromeContextValue | null>(null);

export function DocsSidebarChromeProvider({
  children,
}: PropsWithChildren): React.ReactNode {
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);
  const [sidebarAvailable, setSidebarAvailable] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState<DocsSidebarToggle>(null);

  const value = useMemo(
    () => ({
      hiddenSidebarContainer,
      setHiddenSidebarContainer,
      sidebarAvailable,
      setSidebarAvailable,
      toggleSidebar,
      setToggleSidebar,
    }),
    [hiddenSidebarContainer, sidebarAvailable, toggleSidebar],
  );

  return (
    <DocsSidebarChromeContext.Provider value={value}>
      {children}
    </DocsSidebarChromeContext.Provider>
  );
}

export function useDocsSidebarChrome(): DocsSidebarChromeContextValue {
  const context = useContext(DocsSidebarChromeContext);

  if (!context) {
    throw new Error('useDocsSidebarChrome must be used within DocsSidebarChromeProvider');
  }

  return context;
}
