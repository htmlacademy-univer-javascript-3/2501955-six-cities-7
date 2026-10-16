import classNames from 'classnames';
import { useState, type ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import type { AuthorizationStatus } from '../../enums/authorization-status';
import type { OfferPreview } from '../../types/offer-preview';
import { MAIN_PAGE_TAB_LIST } from './constants/main-page-tab-list';
import MainPageTabs from './components/main-page-tabs/main-page-tabs';
import MainPageOffersList from './components/main-page-offers-list/main-page-offers-list';

type MainPageProps = {
  authorizationStatus: AuthorizationStatus;
  offers: OfferPreview[];
};

function MainPage({ authorizationStatus, offers }: MainPageProps): ReactElement {
  const [activeTab, setActiveTab] = useState(MAIN_PAGE_TAB_LIST[0]);
  const activeTabOffers: OfferPreview[] = offers.filter((offer) =>
    offer.city.name === activeTab
  );
  const isEmpty: boolean = !activeTabOffers.length;

  const emptyStateLayout: ReactElement = (
    <section className="cities__no-places">
      <div className="cities__status-wrapper tabs__content">
        <b className="cities__status">No places to stay available</b>
        <p className="cities__status-description">
          {`We could not find any property available at the moment in ${activeTab}`}
        </p>
      </div>
    </section>
  );

  return (
    <>
      <Helmet>
        <title>6 cities | Main</title>
      </Helmet>

      <main
        className={classNames('page__main', 'page__main--index', {
          'page__main--index-empty': isEmpty
        })}
      >
        <h1 className="visually-hidden">Cities</h1>
        <MainPageTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="cities">
          <div
            className={classNames('cities__places-container container', {
              'cities__places-container--empty': isEmpty
            })}
          >
            {
              isEmpty
                ? emptyStateLayout
                : <MainPageOffersList authorizationStatus={authorizationStatus} offers={activeTabOffers} offersCityName={activeTab} />
            }
            <div className="cities__right-section">
              {!isEmpty && <section className="cities__map map" />}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default MainPage;
