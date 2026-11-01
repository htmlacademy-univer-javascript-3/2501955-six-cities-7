import classNames from 'classnames';
import { useState, type ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import type { AuthorizationStatus } from '../../enums/authorization-status';
import type { CityName } from '../../enums/city-name';
import type { OfferLocation } from '../../types/offer-location';
import type { OfferPreview } from '../../types/offer-preview';
import { getCityName } from './utils/get-city-name';
import Map from '../../components/map/map';
import MainPageEmptyState from './components/main-page-empty-state/main-page-empty-state';
import MainPageOffersList from './components/main-page-offers-list/main-page-offers-list';
import MainPageTabs from './components/main-page-tabs/main-page-tabs';

type MainPageProps = {
  authorizationStatus: AuthorizationStatus;
  offers: OfferPreview[];
};

function MainPage({
  authorizationStatus,
  offers,
}: MainPageProps): ReactElement {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hoveredOfferId, setHoveredOfferId] = useState<string | null>(null);

  const activeTab: CityName = getCityName(searchParams.get('city'));
  const activeTabOffers: OfferPreview[] = offers.filter(
    (offer) => offer.city.name === activeTab,
  );
  const activeTabLocation: OfferLocation | undefined = activeTabOffers[0]?.city.location;
  const isEmpty: boolean = !activeTabOffers.length;

  const handleTabChange = (cityName: CityName): void => {
    setSearchParams((currentSearchParams) => {
      const nextSearchParams = new URLSearchParams(currentSearchParams);
      nextSearchParams.set('city', cityName);

      return nextSearchParams;
    });
  };

  return (
    <>
      <Helmet>
        <title>6 cities | Offers in {activeTab}</title>
      </Helmet>

      <main
        className={classNames('page__main', 'page__main--index', {
          'page__main--index-empty': isEmpty,
        })}
      >
        <h1 className="visually-hidden">Cities</h1>
        <MainPageTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        <div className="cities">
          <div
            className={classNames('cities__places-container', 'container', {
              'cities__places-container--empty': isEmpty,
            })}
          >
            {isEmpty ? (
              <MainPageEmptyState currentCity={activeTab} />
            ) : (
              <MainPageOffersList
                authorizationStatus={authorizationStatus}
                offers={activeTabOffers}
                offersCityName={activeTab}
                onOfferHover={setHoveredOfferId}
              />
            )}
            <div className="cities__right-section">
              {!isEmpty && (
                <Map
                  center={activeTabLocation}
                  points={activeTabOffers.map((offer) => ({
                    id: offer.id,
                    ...offer.location
                  }))}
                  activePointId={hoveredOfferId}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default MainPage;
