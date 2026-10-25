import type { OfferRatingStarsLayoutVariant } from '../types/offer-rating-stars-layout-variant';
import type { OfferRatingStarsLayoutVariantType } from '../types/offer-rating-stars-layout-variant-type';

export const OFFER_RATING_STARS_LAYOUT_VARIANTS = {
  offer: {
    className: 'offer__stars',
  },
  card: {
    className: 'place-card__stars',
  },
  reviews: {
    className: 'reviews__stars',
  },
} as const satisfies Record<
  OfferRatingStarsLayoutVariantType,
  OfferRatingStarsLayoutVariant
>;
