import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../enums/app-route';
import { AuthorizationStatus } from '../../../../enums/authorization-status';
import Logo from '../../../logo/logo';

type HeaderProps = {
  authorizationStatus: AuthorizationStatus;
  favoritesCount: number;
  isMainPage: boolean;
  isLoginPage: boolean;
};

function Header({
  authorizationStatus,
  favoritesCount,
  isMainPage,
  isLoginPage,
}: HeaderProps): ReactElement {
  const isAuthorized: boolean = authorizationStatus === AuthorizationStatus.Auth;

  const userInfo: ReactElement = isAuthorized ? (
    <>
      <span className="header__user-name user__name">
        Oliver.conner@gmail.com
      </span>
      <span className="header__favorite-count">{favoritesCount}</span>
    </>
  ) : (
    <span className="header__login">Sign in</span>
  );

  const profileLink: ReactElement = (
    <Link
      className="header__nav-link header__nav-link--profile"
      to={isAuthorized ? AppRoute.Root : AppRoute.Login}
    >
      <div className="header__avatar-wrapper user__avatar-wrapper" />
      {userInfo}
    </Link>
  );

  const signOutLink: ReactElement | null = isAuthorized ? (
    <li className="header__nav-item">
      <Link className="header__nav-link" to={AppRoute.Root}>
        <span className="header__signout">Sign out</span>
      </Link>
    </li>
  ) : null;

  const navigation: ReactElement | null = isLoginPage ? null : (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">{profileLink}</li>
        {signOutLink}
      </ul>
    </nav>
  );

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo withLink={!isMainPage} />
          </div>
          {navigation}
        </div>
      </div>
    </header>
  );
}

export default Header;
