import { createTheme, ThemeProvider } from '@mui/material';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { DISPLAY_MODE } from '../constants/auth';
import { DisplayMode } from '../interfaces/displayMode';
import { getLocalStorage, setLocalStorage } from '../utils/storage';

interface DisplayModeContextProps extends DisplayMode {
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
  const [displayMode, setDisplayMode] = useState<'light' | 'dark'>(
    initialState.displayMode
  );
  const context = useMemo(
    () => ({
      toggleDisplayMode: () => {
        setDisplayMode((previousDisplayMode) => {
          const nextDisplayMode =
            previousDisplayMode === 'light' ? 'dark' : 'light';
          setLocalStorage(DISPLAY_MODE, nextDisplayMode);

          return nextDisplayMode;
        });
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
