import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../enums/app-route';
import type { AuthorizationStatus } from '../../enums/authorization-status';
import type { OfferPreview } from '../../types/offer-preview';
import { getOfferHousingTypeText } from '../../utils/get-offer-housing-type-text';
import OfferRatingStars from '../offer-rating-stars/offer-rating-stars';
import OfferBookmarksButton from '../offer-bookmarks-button/offer-bookmarks-button';

type OfferCardProps = Omit<OfferPreview, 'city' | 'location'> & {
  authorizationStatus: AuthorizationStatus;
  variant?: 'cities' | 'favorites';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

type OfferCardVariant = {
  articleClassName: string;
  imageWrapperClassName: string;
  infoClassName: string;
  imageWidth: number;
  imageHeight: number;
};

const OFFER_CARD_VARIANTS = {
  cities: {
    articleClassName: 'cities__card',
    imageWrapperClassName: 'cities__image-wrapper',
    infoClassName: '',
    imageWidth: 260,
    imageHeight: 200
  },
  favorites: {
    articleClassName: 'favorites__card',
    imageWrapperClassName: 'favorites__image-wrapper',
    infoClassName: 'favorites__card-info',
    imageWidth: 150,
    imageHeight: 110
  }
} as const satisfies Record<NonNullable<OfferCardProps['variant']>, OfferCardVariant>;

function OfferCard({
  id,
  title,
  housingType,
  price,
  isFavorite,
  isPremium,
  rating,
  previewImage,
  authorizationStatus,
  variant = 'cities',
  onMouseEnter,
  onMouseLeave
}: OfferCardProps): ReactElement {
  const cardLayoutVariant: OfferCardVariant = OFFER_CARD_VARIANTS[variant];

  return (
    <article
      className={`place-card ${cardLayoutVariant.articleClassName}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`place-card__image-wrapper ${cardLayoutVariant.imageWrapperClassName}`}>
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={cardLayoutVariant.imageWidth}
            height={cardLayoutVariant.imageHeight}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`place-card__info ${cardLayoutVariant.infoClassName}`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <OfferBookmarksButton authorizationStatus={authorizationStatus} isActive={isFavorite} />
        </div>
        <div className="place-card__rating rating">
          <OfferRatingStars rating={rating} />
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{getOfferHousingTypeText(housingType)}</p>
      </div>
    </article>
  );
}

export default OfferCard;
