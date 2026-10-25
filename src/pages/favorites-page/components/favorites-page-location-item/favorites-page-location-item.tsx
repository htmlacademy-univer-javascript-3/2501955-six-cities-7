import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../enums/app-route';
import type { AuthorizationStatus } from '../../../../enums/authorization-status';
import type { CityName } from '../../../../enums/city-name';
import type { OfferPreview } from '../../../../types/offer-preview';
import OfferCard from '../../../../components/offer-card/offer-card';

type FavoritesPageLocationItemProps = {
  authorizationStatus: AuthorizationStatus;
  cityName: CityName;
  offers: OfferPreview[];
};

function FavoritesPageLocationItem({
  authorizationStatus,
  cityName,
  offers
}: FavoritesPageLocationItemProps): ReactElement {
  return (
    <li className="favorites__locations-items">
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
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            authorizationStatus={authorizationStatus}
            offer={offer}
            layoutVariant='favorites'
          />
        ))}
      </div>
    </li>
  );
}

export default FavoritesPageLocationItem;
