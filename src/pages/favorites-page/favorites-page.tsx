import classNames from 'classnames';
import type { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import type { AuthorizationStatus } from '../../enums/authorization-status';
import type { CityName } from '../../enums/city-name';
import type { OfferPreview } from '../../types/offer-preview';
import Logo from '../../components/logo/logo';
import OfferCard from '../../components/offer-card/offer-card';

type FavoritesPageProps = {
  authorizationStatus: AuthorizationStatus;
  offers: OfferPreview[];
};

type OffersByCity = Partial<Record<CityName, OfferPreview[]>>;

function FavoritesPage({ authorizationStatus, offers }: FavoritesPageProps): ReactElement {
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
    {}
  );

  const emptyStateLayout: ReactElement = (
    <section className="favorites favorites--empty">
      <h1 className="visually-hidden">Favorites (empty)</h1>
      <div className="favorites__status-wrapper">
        <b className="favorites__status">Nothing yet saved.</b>
        <p className="favorites__status-description">
          Save properties to narrow down search or plan your future trips.
        </p>
      </div>
    </section>
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
            emptyStateLayout
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(offersByCity).map(([cityName, cityOffers]) => (
                  <li className="favorites__locations-items" key={cityName}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{cityName}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {cityOffers.map((offer) => (
                        <OfferCard
                          key={offer.id}
                          authorizationStatus={authorizationStatus}
                          {...offer}
                          variant='favorites'
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
      <footer className={classNames('footer', { 'container': !isEmpty })}>
        <Logo isHeader={false} />
      </footer>
    </>
  );
}

export default FavoritesPage;
