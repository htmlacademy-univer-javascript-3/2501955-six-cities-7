import { type ReactElement, useMemo, useState } from 'react';
import type { AuthorizationStatus } from '../../../../enums/authorization-status';
import type { CityName } from '../../../../enums/city-name';
import type { OfferPreview } from '../../../../types/offer-preview';
import { addPluralEnding } from '../../../../utils/add-plural-ending';
import { OffersListSortState } from './enums/offers-list-sort-state';
import OfferCard from '../../../../components/offer-card/offer-card';
import OffersListSort from './components/offers-list-sort/offers-list-sort';

type MainPageOffersListProps = {
  authorizationStatus: AuthorizationStatus;
  offers: OfferPreview[];
  offersCityName: CityName;
  onOfferHover: (offerId: string | null) => void;
};

function MainPageOffersList({
  authorizationStatus,
  offers,
  offersCityName,
  onOfferHover,
}: MainPageOffersListProps): ReactElement {
  const [activeSortState, setActiveSortState] = useState(OffersListSortState.Popular);

  const sortedOffers: OfferPreview[] = useMemo(() => {
    if (activeSortState === OffersListSortState.Popular) {
      return offers;
    }

    return [...offers].sort((a, b) => {
      switch (activeSortState) {
        case OffersListSortState.PriceLowToHigh:
          return a.price - b.price;
        case OffersListSortState.PriceHighToLow:
          return b.price - a.price;
        case OffersListSortState.TopRatedFirst:
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [activeSortState, offers]);

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {`${offers.length} place${addPluralEnding(offers.length)} to stay in ${offersCityName}`}
      </b>
      <OffersListSort
        activeSortState={activeSortState}
        onSortStateChange={setActiveSortState}
      />
      <div className="cities__places-list places__list tabs__content">
        {sortedOffers.map((offer) => (
          <OfferCard
            authorizationStatus={authorizationStatus}
            key={offer.id}
            offer={offer}
            onMouseEnter={() => onOfferHover(offer.id)}
            onMouseLeave={() => onOfferHover(null)}
          />
        ))}
      </div>
    </section>
  );
}

export default MainPageOffersList;
