import classNames from 'classnames';
import { useState, type ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import type { OfferPreview } from '../../types/offer-preview';
import { MAIN_PAGE_TAB_LIST } from './constants/main-page-tab-list';
import OfferCard from '../../components/offer-card/offer-card';
import MainPageTabs from './components/main-page-tabs/main-page-tabs';

type MainPageProps = {
  offers: OfferPreview[];
};

function MainPage({ offers }: MainPageProps): ReactElement {
  const [activeTab, setActiveTab] = useState(MAIN_PAGE_TAB_LIST[0]);
  const activeTabOffers: OfferPreview[] = offers.filter((offer) =>
    offer.city.name === activeTab
  );
  const isEmpty: boolean = !activeTabOffers.length;

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
            {isEmpty ? (
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">
                    {`We could not find any property available at the moment in ${activeTab}`}
                  </p>
                </div>
              </section>
            ) : (
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {`${activeTabOffers.length} ${activeTabOffers.length === 1 ? 'place' : 'places'} to stay in ${activeTab}`}
                </b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li
                      className="places__option places__option--active"
                      tabIndex={0}
                    >
                      Popular
                    </li>
                    <li className="places__option" tabIndex={0}>
                      Price: low to high
                    </li>
                    <li className="places__option" tabIndex={0}>
                      Price: high to low
                    </li>
                    <li className="places__option" tabIndex={0}>
                      Top rated first
                    </li>
                  </ul>
                </form>
                <div className="cities__places-list places__list tabs__content">
                  {activeTabOffers.map((offer) => (
                    <OfferCard key={offer.id} />
                  ))}
                </div>
              </section>
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
