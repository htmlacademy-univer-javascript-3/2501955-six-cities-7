import type { ReactElement } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../enums/app-route';
import { AuthorizationStatus } from '../../enums/authorization-status';
import type { OfferPreview } from '../../types/offer-preview';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import ProtectedRoute from '../protected-route/protected-route';
import RootLayout from '../root-layout/root-layout';

type AppProps = {
  offers: OfferPreview[];
};

function App({ offers }: AppProps): ReactElement {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout authorizationStatus={AuthorizationStatus.NoAuth} />}>
            <Route
              path={AppRoute.Root}
              element={<MainPage offers={offers} />}
            />
            <Route
              path={AppRoute.Login}
              element={
                <ProtectedRoute
                  restrictedFor={AuthorizationStatus.Auth}
                  redirectTo={AppRoute.Root}
                >
                  <LoginPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <ProtectedRoute
                  restrictedFor={AuthorizationStatus.NoAuth}
                  redirectTo={AppRoute.Login}
                >
                  <FavoritesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={`${AppRoute.Offer}/:id`}
              element={<OfferPage />}
            />
          </Route>
          <Route
            path='*'
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
