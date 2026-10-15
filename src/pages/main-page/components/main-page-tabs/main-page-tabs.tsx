import classNames from 'classnames';
import type { ReactElement } from 'react';
import type { CityName } from '../../../../enums/city-name';
import { MAIN_PAGE_TAB_LIST } from '../../constants/main-page-tab-list';

type MainPageTabsProps = {
  activeTab: CityName;
  onTabChange: (tab: CityName) => void;
};

function MainPageTabs({ activeTab, onTabChange }: MainPageTabsProps): ReactElement {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {MAIN_PAGE_TAB_LIST.map((tab) => (
            <li className="locations__item" key={tab}>
              <a
                className={classNames('locations__item-link', 'tabs__item', {
                  'tabs__item--active': tab === activeTab
                })}
                href='#'
                onClick={(event) => {
                  event.preventDefault();
                  if (tab === activeTab) {
                    return;
                  }
                  onTabChange(tab);
                }}
              >
                <span>{tab}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default MainPageTabs;
