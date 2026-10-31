import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../enums/app-route';
import { LOGO_LAYOUT_VARIANTS } from './constants/logo-layout-variants';
import type { LogoLayoutVariant } from './types/logo-layout-variant';

type LogoProps = {
  withLink?: boolean;
  isFooterLogo?: boolean;
};

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
