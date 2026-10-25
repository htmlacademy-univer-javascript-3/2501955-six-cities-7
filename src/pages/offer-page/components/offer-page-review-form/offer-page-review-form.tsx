import {
  Fragment,
  useState,
  type ReactElement,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { OFFER_REVIEW_MAX_COMMENT_LENGTH, OFFER_REVIEW_MIN_COMMENT_LENGTH } from './constants/offer-review-comment-length';
import { OFFER_REVIEW_FORM_CONTROL_MODELS } from './constants/offer-review-form-control-models';
import { OFFER_REVIEW_FORM_INITIAL_DATA } from './constants/offer-review-form-initial-data';
import type { OfferReviewFormData } from './types/offer-review-form-data';

function OfferPageReviewForm(): ReactElement {
  const [formData, setFormData] = useState<OfferReviewFormData>(OFFER_REVIEW_FORM_INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const commentLength: number = formData.comment.trim().length;
  const isSubmitDisabled: boolean =
    formData.rating === null ||
    commentLength < OFFER_REVIEW_MIN_COMMENT_LENGTH ||
    commentLength > OFFER_REVIEW_MAX_COMMENT_LENGTH ||
    isSubmitting;

  const handleRatingChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFormData((previousData) => ({
      ...previousData,
      rating: Number(event.target.value),
    }));
  };
  const handleCommentChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setFormData((previousData) => ({
      ...previousData,
      comment: event.target.value,
    }));
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (isSubmitDisabled) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      /** @todo реализовать отправку данных формы в следующих заданиях */
      setFormData(OFFER_REVIEW_FORM_INITIAL_DATA);
    } catch {
      setSubmitError('Failed to submit a review. Try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {OFFER_REVIEW_FORM_CONTROL_MODELS.map(({ title, value }) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={formData.rating === value}
              disabled={isSubmitting}
              onChange={handleRatingChange}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        disabled={isSubmitting}
        onChange={handleCommentChange}
        minLength={OFFER_REVIEW_MIN_COMMENT_LENGTH}
        maxLength={OFFER_REVIEW_MAX_COMMENT_LENGTH}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          between{' '}
          <b className="reviews__text-amount">
            {OFFER_REVIEW_MIN_COMMENT_LENGTH} and {OFFER_REVIEW_MAX_COMMENT_LENGTH} characters
          </b>
          .
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>

      {submitError && <p role="alert">{submitError}</p>}
    </form>
  );
}

export default OfferPageReviewForm;
