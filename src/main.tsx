import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.js';
import { DisplayModeProvider } from './contexts/DisplayModeContext.js';
import NotificationsProvider from './contexts/NotificationContext.js';
import GlobalStyle from './styles/GlobalStyle.js';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <DisplayModeProvider>
      <NotificationsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NotificationsProvider>
    </DisplayModeProvider>
  </React.StrictMode>
);
