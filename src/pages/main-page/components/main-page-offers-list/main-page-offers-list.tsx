import { type ReactElement, useState } from 'react';
import type { CityName } from '../../../../enums/city-name';
import type { OfferPreview } from '../../../../types/offer-preview';
import OfferCard from '../../../../components/offer-card/offer-card';
import classNames from 'classnames';

type MainPageOffersListProps = {
  offers: OfferPreview[];
  offersCityName: CityName;
};

enum SortState {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first'
}

function MainPageOffersList({ offers, offersCityName }: MainPageOffersListProps): ReactElement {
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [activeSortState, setActiveSortState] = useState(SortState.Popular);

  const sortedOffers: OfferPreview[] = [...offers].sort((a, b) => {
    switch (activeSortState) {
      case SortState.Popular:
        return 0;
      case SortState.PriceLowToHigh:
        return a.price - b.price;
      case SortState.PriceHighToLow:
        return b.price - a.price;
      case SortState.TopRatedFirst:
        return b.rating - a.rating;
    }
  });

  const selectSortState = (sortState: SortState): void => {
    if (sortState === activeSortState) {
      return;
    }
    setActiveSortState(sortState);
    setIsSortDropdownOpen(false);
  };

  const sortStateDropdown: ReactElement = (
    <ul
      className={classNames('places__options', 'places__options--custom', {
        'places__options--opened': isSortDropdownOpen
      })}
    >
      {Object.values(SortState).map((sortState) => (
        <li
          className={classNames('places__option', {
            'places__option--active': sortState === activeSortState
          })}
          key={sortState}
          tabIndex={0}
          onClick={() => selectSortState(sortState)}
        >
          {sortState}
        </li>
      ))}
    </ul>
  );

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {`${offers.length} ${offers.length === 1 ? 'place' : 'places'} to stay in ${offersCityName}`}
      </b>
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span
          className="places__sorting-type"
          tabIndex={0}
          onClick={() => setIsSortDropdownOpen((prevIsSortDropdownOpen) => !prevIsSortDropdownOpen)}
        >
          {activeSortState}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select" />
          </svg>
        </span>
        {sortStateDropdown}
      </form>
      <div className="cities__places-list places__list tabs__content">
        {sortedOffers.map((offer) => (
          <OfferCard key={offer.id} {...offer} />
        ))}
      </div>
    </section>
  );
}

export default MainPageOffersList;
