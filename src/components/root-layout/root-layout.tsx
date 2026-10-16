import classNames from 'classnames';
import type { ReactElement } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AppRoute } from '../../enums/app-route';
import type { AuthorizationStatus } from '../../enums/authorization-status';
import { isAppRoute } from '../../utils/is-app-route';
import Header from './components/header/header';

type RootLayoutProps = {
  authorizationStatus: AuthorizationStatus;
  favoritesCount: number;
};

function RootLayout({ authorizationStatus, favoritesCount }: RootLayoutProps): ReactElement {
  const { pathname } = useLocation();
  const route: AppRoute | null = isAppRoute(pathname) ? pathname : null;

  const isMainPage: boolean = route === AppRoute.Root;
  const isLoginPage: boolean = route === AppRoute.Login;
  const isFavoritesPage: boolean = route === AppRoute.Favorites;

  return (
    <div
      className={classNames('page', {
        'page--gray page--main': isMainPage,
        'page--gray page--login': isLoginPage,
        'page--favorites-empty': isFavoritesPage && !favoritesCount
      })}
    >
      <Header
        authorizationStatus={authorizationStatus}
        favoritesCount={favoritesCount}
        isMainPage={isMainPage}
        isLoginPage={isLoginPage}
      />
      <Outlet />
    </div>
  );
}

export default RootLayout;
