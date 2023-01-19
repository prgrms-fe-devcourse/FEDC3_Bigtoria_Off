import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { DisplayModeProvider } from './contexts/DisplayModeContext';
import NotificationsProvider from './contexts/NotificationContext';
import FontStyle from './styles/FontStyle';
import GlobalStyle from './styles/GlobalStyle';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <FontStyle />
    <DisplayModeProvider>
      <NotificationsProvider>
        <App />
      </NotificationsProvider>
    </DisplayModeProvider>
  </React.StrictMode>
);
