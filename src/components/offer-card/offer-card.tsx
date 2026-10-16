import classNames from 'classnames';
import { type ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../enums/app-route';
import type { OfferPreview } from '../../types/offer-preview';

type OfferCardProps = Omit<OfferPreview, 'city' | 'location'>;

const HOUSING_TYPE_TEXT: Record<OfferPreview['housingType'], string> = {
  apartment: 'Apartment',
  hotel: 'Hotel',
  house: 'House',
  room: 'Room'
};

function OfferCard({
  id,
  title,
  housingType,
  price,
  isFavorite,
  isPremium,
  rating,
  previewImage
}: OfferCardProps): ReactElement {
  const [isInBookmarks, setIsInBookmarks] = useState(isFavorite);

  return (
    <article className="cities__card place-card">
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={classNames('place-card__bookmark-button', 'button', {
              'place-card__bookmark-button--active': isInBookmarks
            })}
            type="button"
            onClick={() => setIsInBookmarks((prevInBookmarks) => !prevInBookmarks)}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">
              {isInBookmarks ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.round(rating) * 20}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{HOUSING_TYPE_TEXT[housingType]}</p>
      </div>
    </article>
  );
}

export default OfferCard;
