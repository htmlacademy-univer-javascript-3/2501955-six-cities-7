import type { OfferCardLayoutVariant } from '../types/offer-card-layout-variant';
import type { OfferCardLayoutVariantType } from '../types/offer-card-layout-variant-type';

export const OFFER_CARD_LAYOUT_VARIANTS = {
  cities: {
    articleClassName: 'cities__card',
    imageWrapperClassName: 'cities__image-wrapper',
    infoClassName: '',
    imageWidth: 260,
    imageHeight: 200,
  },
  favorites: {
    articleClassName: 'favorites__card',
    imageWrapperClassName: 'favorites__image-wrapper',
    infoClassName: 'favorites__card-info',
    imageWidth: 150,
    imageHeight: 110,
  },
  'near-places': {
    articleClassName: 'near-places__card',
    imageWrapperClassName: 'near-places__image-wrapper',
    infoClassName: '',
    imageWidth: 260,
    imageHeight: 200,
  },
} as const satisfies Record<OfferCardLayoutVariantType, OfferCardLayoutVariant>;
