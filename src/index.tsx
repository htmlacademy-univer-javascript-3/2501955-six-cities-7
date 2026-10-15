import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { OFFER_PREVIEWS } from './mocks/offer-previews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={OFFER_PREVIEWS} />
  </React.StrictMode>
);
