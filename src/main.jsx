import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// CSS Design Tokens & Architecture
import './styles/variables.css';
import './styles/global.css';
import './styles/components.css';
import './index.css';

import App from './App.jsx';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
