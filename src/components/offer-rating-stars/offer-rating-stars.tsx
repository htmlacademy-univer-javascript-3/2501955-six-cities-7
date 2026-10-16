import type { ReactElement } from 'react';

type OfferRatingStarsProps = {
  rating: number;
  layoutVariant?: 'offer' | 'card' | 'reviews';
};

type StarsLayoutVariant = {
  className: string;
};

const STARS_LAYOUT_VARIANTS = {
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
  NonNullable<OfferRatingStarsProps['layoutVariant']>,
  StarsLayoutVariant
>;

function OfferRatingStars({
  rating,
  layoutVariant = 'card',
}: OfferRatingStarsProps): ReactElement {
  const starsLayoutVariant: StarsLayoutVariant = STARS_LAYOUT_VARIANTS[layoutVariant];

  return (
    <div className={`rating__stars ${starsLayoutVariant.className}`}>
      <span style={{ width: `${Math.round(rating) * 20}%` }} />
      <span className="visually-hidden">Rating</span>
    </div>
  );
}

export default OfferRatingStars;
