import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import Home from '../app/page';
import '../app/globals.css';

hydrateRoot(document.getElementById('root')!,
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
);
