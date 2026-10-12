import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { AppSettings } from './enums/app-settings';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offersCount={AppSettings.OffersCount} />
  </React.StrictMode>
);
