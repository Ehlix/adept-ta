import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { StoreProvider } from './providers/StoreProvider';
import './styles/index.scss';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
