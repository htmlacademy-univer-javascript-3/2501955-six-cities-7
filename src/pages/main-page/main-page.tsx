import classNames from 'classnames';
import { useState, type ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import type { AuthorizationStatus } from '../../enums/authorization-status';
import type { OfferPreview } from '../../types/offer-preview';
import { MAIN_PAGE_TAB_LIST } from './constants/main-page-tab-list';
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
  const [activeTab, setActiveTab] = useState(MAIN_PAGE_TAB_LIST[0]);
  /** @todo дополнить, потребуется в следующих задачах */
  const [, setHoveredOfferId] = useState<string | null>(null);

  const activeTabOffers: OfferPreview[] = offers.filter(
    (offer) => offer.city.name === activeTab,
  );
  const isEmpty: boolean = !activeTabOffers.length;

  return (
    <>
      <Helmet>
        <title>6 cities | Main</title>
      </Helmet>

      <main
        className={classNames('page__main', 'page__main--index', {
          'page__main--index-empty': isEmpty,
        })}
      >
        <h1 className="visually-hidden">Cities</h1>
        <MainPageTabs activeTab={activeTab} onTabChange={setActiveTab} />
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
              {!isEmpty && <section className="cities__map map" />}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default MainPage;
