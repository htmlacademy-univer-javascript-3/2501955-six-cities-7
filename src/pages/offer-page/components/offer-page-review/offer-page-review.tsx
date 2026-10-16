import type { ReactElement } from 'react';
import type { OfferReview } from '../../../../types/offer-review';
import OfferRatingStars from '../../../../components/offer-rating-stars/offer-rating-stars';

type OfferPageReviewProps = {
  review: OfferReview;
};

function OfferPageReview({ review }: OfferPageReviewProps): ReactElement {
  const formattedDate: string = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(review.date));

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.author.avatar}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.author.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <OfferRatingStars rating={review.rating} layoutVariant='reviews' />
        </div>
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={review.date}>
          {formattedDate}
        </time>
      </div>
    </li>
  );
}

export default OfferPageReview;
