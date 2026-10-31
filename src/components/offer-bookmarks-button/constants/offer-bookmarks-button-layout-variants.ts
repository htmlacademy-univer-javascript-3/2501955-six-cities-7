import type { OfferBookmarksButtonLayoutVariant } from '../types/offer-bookmarks-button-layout-variant';

export const OFFER_BOOKMARKS_BUTTON_LAYOUT_VARIANTS = {
  card: {
    className: 'place-card__bookmark-button',
    iconWidth: 18,
    iconHeight: 19,
    activeClassName: 'place-card__bookmark-button--active',
    iconClassName: 'place-card__bookmark-icon',
  },
  offer: {
    className: 'offer__bookmark-button',
    iconWidth: 31,
    iconHeight: 33,
    activeClassName: 'offer__bookmark-button--active',
    iconClassName: 'offer__bookmark-icon',
  },
} as const satisfies Record<'card' | 'offer', OfferBookmarksButtonLayoutVariant>;
