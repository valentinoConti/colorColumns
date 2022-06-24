import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const root = createRoot(document.querySelector('#root') as HTMLElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);