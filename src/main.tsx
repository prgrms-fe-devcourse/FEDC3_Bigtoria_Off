import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import FontStyle from './styles/FontStyle';
import GlobalStyle from './styles/GlobalStyle';

const theme = createTheme({
  typography: {
    fontFamily: "'MaplestoryOTFLight', cursive",
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <FontStyle />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
