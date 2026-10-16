import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../enums/app-route';

type LogoProps = {
  withLink?: boolean;
  isFooterLogo?: boolean;
};

type LogoLayoutVariant = {
  className: string;
  width: number;
  height: number;
  linkClassName: string;
};

const LOGO_LAYOUT_VARIANTS = {
  header: {
    className: 'header__logo',
    width: 81,
    height: 41,
    linkClassName: 'header__logo-link header__logo-link--active',
  },
  footer: {
    className: 'footer__logo',
    width: 64,
    height: 33,
    linkClassName: 'footer__logo-link',
  },
} as const satisfies Record<'header' | 'footer', LogoLayoutVariant>;

function Logo({
  withLink = false,
  isFooterLogo = false,
}: LogoProps): ReactElement {
  const layoutVariant: LogoLayoutVariant = LOGO_LAYOUT_VARIANTS[isFooterLogo ? 'footer' : 'header'];
  const logoImage: ReactElement = (
    <img
      className={layoutVariant.className}
      src="img/logo.svg"
      alt="6 cities logo"
      width={layoutVariant.width}
      height={layoutVariant.height}
    />
  );

  return withLink ? (
    <Link className={layoutVariant.linkClassName} to={AppRoute.Root}>
      {logoImage}
    </Link>
  ) : (
    logoImage
  );
}

export default Logo;
