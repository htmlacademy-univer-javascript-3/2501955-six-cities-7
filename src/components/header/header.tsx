import { ReactElement } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AppRoute } from '../../enums/app-route';
import { AuthorizationStatus } from '../../enums/authorization-status';
import Logo from '../logo/logo';

type HeaderProps = {
  authorizationStatus: AuthorizationStatus;
};

function Header({ authorizationStatus }: HeaderProps): ReactElement {
  const { pathname } = useLocation() as { pathname: AppRoute };
  const isLoginPage: boolean = pathname === AppRoute.Login;
  const isMainPage: boolean = pathname === AppRoute.Root;
  const isAuthorized: boolean = authorizationStatus === AuthorizationStatus.Auth;

  let rootClassName: string = '';
  if (isMainPage) {
    rootClassName = 'page--gray page--main';
  } else if (isLoginPage) {
    rootClassName = 'page--gray page--login';
  }

  return (
    <div className={`page ${rootClassName}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo isMainPage={isMainPage} isHeader />
            </div>
            {!isLoginPage && (
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={isAuthorized ? AppRoute.Root : AppRoute.Login}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper" />
                      {isAuthorized ? (
                        <>
                          <span className="header__user-name user__name">
                            Oliver.conner@gmail.com
                          </span>
                          <span className="header__favorite-count">3</span>
                        </>
                      ) : (
                        <span className="header__login">Sign in</span>
                      )}
                    </Link>
                  </li>
                  {isAuthorized && (
                    <li className="header__nav-item">
                      <Link className="header__nav-link" to={AppRoute.Root}>
                        <span className="header__signout">Sign out</span>
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default Header;
