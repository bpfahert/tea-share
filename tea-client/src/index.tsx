import React from 'react';
import { createRoot } from 'react-dom/client';
import RouteSwitch from './RouteSwitch';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <RouteSwitch />
  </React.StrictMode>
);