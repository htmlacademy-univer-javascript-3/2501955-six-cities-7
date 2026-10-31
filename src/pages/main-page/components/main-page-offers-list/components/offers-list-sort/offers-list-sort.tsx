import classNames from 'classnames';
import { useState, type ReactElement } from 'react';
import { OffersListSortState } from '../../enums/offers-list-sort-state';

type OffersListSortProps = {
  activeSortState: OffersListSortState;
  onSortStateChange: (sortState: OffersListSortState) => void;
};

function OffersListSort({ activeSortState, onSortStateChange }: OffersListSortProps): ReactElement {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectSortState = (sortState: OffersListSortState): void => {
    if (sortState !== activeSortState) {
      onSortStateChange(sortState);
    }
    setIsDropdownOpen(false);
  };

  const sortStateDropdown: ReactElement = (
    <ul
      className={classNames('places__options', 'places__options--custom', {
        'places__options--opened': isDropdownOpen,
      })}
    >
      {Object.values(OffersListSortState).map((sortState) => (
        <li
          className={classNames('places__option', {
            'places__option--active': sortState === activeSortState,
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
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsDropdownOpen((prevIsOpen) => !prevIsOpen)}
      >
        {activeSortState}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      {sortStateDropdown}
    </form>
  );
}

export default OffersListSort;
