import classNames from 'classnames';
import type { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../enums/app-route';
import type { AuthorizationStatus } from '../../enums/authorization-status';
import type { CityName } from '../../enums/city-name';
import type { OfferPreview } from '../../types/offer-preview';
import Logo from '../../components/logo/logo';
import OfferCard from '../../components/offer-card/offer-card';
import FavoritesPageEmptyState from './components/favorites-page-empty-state.tsx/favorites-page-empty-state';

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
      if (!result[cityName]) {
        result[cityName] = [];
      }

      result[cityName]?.push(offer);

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
                  <li className="favorites__locations-items" key={cityName}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link
                          className="locations__item-link"
                          to={AppRoute.Root}
                        >
                          <span>{cityName}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {cityOffers.map((offer) => (
                        <OfferCard
                          key={offer.id}
                          authorizationStatus={authorizationStatus}
                          offer={offer}
                          layoutVariant='favorites'
                        />
                      ))}
                    </div>
                  </li>
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
