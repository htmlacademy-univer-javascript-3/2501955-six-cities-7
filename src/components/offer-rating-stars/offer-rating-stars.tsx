import type { ReactElement } from 'react';

type OfferRatingStarsProps = {
  rating: number;
  variant?: 'offer' | 'card' | 'reviews';
};

type OfferRatingStarsVariant = {
  className: string;
};

const OFFER_RATING_STARS_VARIANTS = {
  offer: {
    className: 'offer__stars',
  },
  card: {
    className: 'place-card__stars',
  },
  reviews: {
    className: 'reviews__stars'
  },
} as const satisfies Record<NonNullable<OfferRatingStarsProps['variant']>, OfferRatingStarsVariant>;

function OfferRatingStars({ rating, variant = 'card' }: OfferRatingStarsProps): ReactElement {
  const layoutVariant: OfferRatingStarsVariant = OFFER_RATING_STARS_VARIANTS[variant];

  return (
    <div className={`rating__stars ${layoutVariant.className}`}>
      <span style={{ width: `${Math.round(rating) * 20}%` }} />
      <span className="visually-hidden">Rating</span>
    </div>
  );
}

export default OfferRatingStars;
