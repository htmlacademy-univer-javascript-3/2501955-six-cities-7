import {
  Fragment,
  useState,
  type ReactElement,
  type ChangeEvent,
  type FormEvent,
} from 'react';

type ReviewFormData = {
  rating: number | null;
  comment: string;
};

const INITIAL_FORM_DATA: ReviewFormData = {
  rating: null,
  comment: '',
};

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;

const CONTROL_MODELS = [
  { title: 'perfect', value: 5 },
  { title: 'good', value: 4 },
  { title: 'not bad', value: 3 },
  { title: 'badly', value: 2 },
  { title: 'terribly', value: 1 },
] as const;

function OfferPageReviewForm(): ReactElement {
  const [formData, setFormData] = useState<ReviewFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const commentLength: number = formData.comment.trim().length;
  const isSubmitDisabled: boolean =
    formData.rating === null ||
    commentLength < MIN_COMMENT_LENGTH ||
    commentLength > MAX_COMMENT_LENGTH ||
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
      setFormData(INITIAL_FORM_DATA);
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
        {CONTROL_MODELS.map(({ title, value }) => (
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
        minLength={MIN_COMMENT_LENGTH}
        maxLength={MAX_COMMENT_LENGTH}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          between{' '}
          <b className="reviews__text-amount">
            {MIN_COMMENT_LENGTH} and {MAX_COMMENT_LENGTH} characters
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

      {submitError && <p role='alert'>{submitError}</p>}
    </form>
  );
}

export default OfferPageReviewForm;
