import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../enums/app-route';

type LogoProps = {
  isMainPage?: boolean;
  isHeader?: boolean;
};

function Logo({ isMainPage, isHeader }: LogoProps): ReactElement {
  const logoImage: ReactElement = (
    <img
      className={isHeader ? 'header__logo' : 'footer__logo'}
      src="img/logo.svg"
      alt="6 cities logo"
      width={isHeader ? 81 : 64}
      height={isHeader ? 41 : 33}
    />
  );

  return isMainPage ? (
    logoImage
  ) : (
    <Link
      className={
        isHeader
          ? 'header__logo-link header__logo-link--active'
          : 'footer__logo-link'
      }
      to={AppRoute.Root}
    >
      {logoImage}
    </Link>
  );
}

export default Logo;
