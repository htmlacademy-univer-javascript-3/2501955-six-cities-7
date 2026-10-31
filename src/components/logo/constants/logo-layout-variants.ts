import type { LogoLayoutVariant } from '../types/logo-layout-variant';

export const LOGO_LAYOUT_VARIANTS = {
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
