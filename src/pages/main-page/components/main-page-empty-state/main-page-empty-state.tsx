import type { ReactElement } from 'react';
import type { CityName } from '../../../../enums/city-name';

type MainPageEmptyStateProps = {
  currentCity: CityName;
};

function MainPageEmptyState({ currentCity }: MainPageEmptyStateProps): ReactElement {
  return (
    <section className="cities__no-places">
      <div className="cities__status-wrapper tabs__content">
        <b className="cities__status">No places to stay available</b>
        <p className="cities__status-description">
          {`We could not find any property available at the moment in ${currentCity}`}
        </p>
      </div>
    </section>
  );
}

export default MainPageEmptyState;
