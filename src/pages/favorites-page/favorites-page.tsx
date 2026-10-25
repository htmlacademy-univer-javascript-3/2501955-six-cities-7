import classNames from 'classnames';
import type { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import type { AuthorizationStatus } from '../../enums/authorization-status';
import type { CityName } from '../../enums/city-name';
import type { OfferPreview } from '../../types/offer-preview';
import Logo from '../../components/logo/logo';
import FavoritesPageEmptyState from './components/favorites-page-empty-state.tsx/favorites-page-empty-state';
import FavoritesPageLocationItem from './components/favorites-page-location-item/favorites-page-location-item';

type OffersByCity = Partial<Record<CityName, OfferPreview[]>>;

type FavoritesPageProps = {
  authorizationStatus: AuthorizationStatus;
  offers: OfferPreview[];
};

function FavoritesPage({
  authorizationStatus,
  offers,
}: FavoritesPageProps): ReactElement {
  const isEmpty: boolean = !offers.length;
  const offersByCity: OffersByCity = offers.reduce<OffersByCity>(
    (result, offer) => {
      const cityName: CityName = offer.city.name;

      (result[cityName] ??= []).push(offer);

      return result;
    },
    {},
  );

  return (
    <>
      <Helmet>
        <title>6 cities | Favorites</title>
      </Helmet>

      <main
        className={classNames('page__main', 'page__main--favorites', {
          'page__main--favorites-empty': isEmpty,
        })}
      >
        <div className="page__favorites-container container">
          {isEmpty ? (
            <FavoritesPageEmptyState />
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(offersByCity).map(([cityName, cityOffers]) => (
                  <FavoritesPageLocationItem
                    key={cityName}
                    authorizationStatus={authorizationStatus}
                    cityName={cityName as CityName}
                    offers={cityOffers}
                  />
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
      <footer className={classNames('footer', { container: !isEmpty })}>
        <Logo withLink isFooterLogo />
      </footer>
    </>
  );
}

export default FavoritesPage;
