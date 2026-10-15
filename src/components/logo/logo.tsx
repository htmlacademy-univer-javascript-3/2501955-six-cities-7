import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../enums/app-route';

type LogoProps = {
  withLink?: boolean;
  isHeader?: boolean;
};

type LogoVariant = {
  className: string;
  width: number;
  height: number;
  linkClassName: string;
};

const LOGO_VARIANTS = {
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
} as const satisfies Record<'header' | 'footer', LogoVariant>;

function Logo({
  withLink = false,
  isHeader = true
}: LogoProps): ReactElement {
  const variant: LogoVariant = LOGO_VARIANTS[isHeader ? 'header' : 'footer'];
  const logoImage: ReactElement = (
    <img
      className={variant.className}
      src="img/logo.svg"
      alt="6 cities logo"
      width={variant.width}
      height={variant.height}
    />
  );

  return withLink ? (
    logoImage
  ) : (
    <Link className={variant.linkClassName} to={AppRoute.Root}>
      {logoImage}
    </Link>
  );
}

export default Logo;
