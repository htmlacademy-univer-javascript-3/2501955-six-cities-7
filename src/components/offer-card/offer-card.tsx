import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../enums/app-route';
import type { AuthorizationStatus } from '../../enums/authorization-status';
import type { OfferPreview } from '../../types/offer-preview';
import { capitalize } from '../../utils/capitalize';
import { OFFER_CARD_LAYOUT_VARIANTS } from './constants/offer-card-layout-variants';
import type { OfferCardLayoutVariant } from './types/offer-card-layout-variant';
import type { OfferCardLayoutVariantType } from './types/offer-card-layout-variant-type';
import OfferRatingStars from '../offer-rating-stars/offer-rating-stars';
import OfferBookmarksButton from '../offer-bookmarks-button/offer-bookmarks-button';

type OfferCardProps = {
  authorizationStatus: AuthorizationStatus;
  offer: Omit<OfferPreview, 'city' | 'location'>;
  layoutVariant?: OfferCardLayoutVariantType;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

function OfferCard({
  authorizationStatus,
  offer,
  layoutVariant = 'cities',
  onMouseEnter,
  onMouseLeave,
}: OfferCardProps): ReactElement {
  const cardLayoutVariant: OfferCardLayoutVariant = OFFER_CARD_LAYOUT_VARIANTS[layoutVariant];
  const {
    isPremium,
    id,
    previewImage,
    price,
    isFavorite,
    rating,
    title,
    housingType,
  } = offer;

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
      <div
        className={`place-card__image-wrapper ${cardLayoutVariant.imageWrapperClassName}`}
      >
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
          <OfferBookmarksButton
            authorizationStatus={authorizationStatus}
            isActive={isFavorite}
          />
        </div>
        <div className="place-card__rating rating">
          <OfferRatingStars rating={rating} />
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">
          {capitalize(housingType)}
        </p>
      </div>
    </article>
  );
}

export default OfferCard;
