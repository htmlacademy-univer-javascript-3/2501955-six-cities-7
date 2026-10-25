import type { ReactElement } from 'react';
import { OFFER_RATING_STARS_LAYOUT_VARIANTS } from './constants/offer-rating-stars-layout-variants';
import type { OfferRatingStarsLayoutVariantType } from './types/offer-rating-stars-layout-variant-type';
import type { OfferRatingStarsLayoutVariant } from './types/offer-rating-stars-layout-variant';

type OfferRatingStarsProps = {
  rating: number;
  layoutVariant?: OfferRatingStarsLayoutVariantType;
};

function OfferRatingStars({
  rating,
  layoutVariant = 'card',
}: OfferRatingStarsProps): ReactElement {
  const starsLayoutVariant: OfferRatingStarsLayoutVariant = OFFER_RATING_STARS_LAYOUT_VARIANTS[layoutVariant];

  return (
    <div className={`rating__stars ${starsLayoutVariant.className}`}>
      <span style={{ width: `${Math.round(rating) * 20}%` }} />
      <span className="visually-hidden">Rating</span>
    </div>
  );
}

export default OfferRatingStars;
