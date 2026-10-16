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
  const favoriteOffers: OfferPreview[] = offers.filter((offer) => offer.isFavorite);
  const currentAuthorizationStatus: AuthorizationStatus = AuthorizationStatus.NoAuth;

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <RootLayout
                authorizationStatus={currentAuthorizationStatus}
                favoritesCount={favoriteOffers.length}
              />
            }
          >
            <Route
              path={AppRoute.Root}
              element={<MainPage authorizationStatus={currentAuthorizationStatus} offers={offers} />}
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
                  <FavoritesPage authorizationStatus={currentAuthorizationStatus} offers={favoriteOffers} />
                </ProtectedRoute>
              }
            />
            <Route
              path={`${AppRoute.Offer}/:id`}
              element={<OfferPage authorizationStatus={currentAuthorizationStatus} />}
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
