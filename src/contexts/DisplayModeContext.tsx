import { createTheme, ThemeProvider } from '@mui/material';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { DISPLAY_MODE } from '../constants/auth';
import { getLocalStorage } from '../utils/storage';

interface DisplayModeContextProps {
  displayMode: 'dark' | 'light';
  toggleDisplayMode: () => void;
}

const storedDisplayMode = getLocalStorage(DISPLAY_MODE);
const osDisplayMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? 'dark'
  : 'light';
const initialDisplayMode = storedDisplayMode
  ? storedDisplayMode
  : osDisplayMode;

const initialState = {
  displayMode: initialDisplayMode,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleDisplayMode: () => {},
};

const DisplayModeContext = createContext<DisplayModeContextProps>(initialState);

const useDisplayModeContext = () => useContext(DisplayModeContext);

export const DisplayModeProvider = ({ children }: { children: ReactNode }) => {
  const [displayMode, setDisplayMode] = useState<'light' | 'dark'>('light');
  const context = useMemo(
    () => ({
      toggleDisplayMode: () => {
        setDisplayMode((previousDisplayMode) =>
          previousDisplayMode === 'light' ? 'dark' : 'light'
        );
      },
      displayMode,
    }),
    [displayMode]
  );

  const themeByDisplayMode = useMemo(() => createTheme(), [displayMode]);

  return (
    <DisplayModeContext.Provider value={context}>
      <ThemeProvider theme={themeByDisplayMode}>{children}</ThemeProvider>
    </DisplayModeContext.Provider>
  );
};

export default useDisplayModeContext;
