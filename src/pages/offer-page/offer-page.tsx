import classNames from 'classnames';
import type { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';
import { OFFERS } from '../../mocks/offers';
import { OFFER_PREVIEWS } from '../../mocks/offer-previews';
import { OFFER_REVIEWS } from '../../mocks/offer-reviews';
import { AppRoute } from '../../enums/app-route';
import { AuthorizationStatus } from '../../enums/authorization-status';
import type { Offer } from '../../types/offer';
import type { OfferPreview } from '../../types/offer-preview';
import type { OfferReview } from '../../types/offer-review';
import { getOfferHousingTypeText } from '../../utils/get-offer-housing-type-text';
import OfferBookmarksButton from '../../components/offer-bookmarks-button/offer-bookmarks-button';
import OfferRatingStars from '../../components/offer-rating-stars/offer-rating-stars';
import OfferCard from '../../components/offer-card/offer-card';
import OfferPageReviewForm from './components/offer-page-review-form/offer-page-review-form';
import OfferPageReview from './components/offer-page-review/offer-page-review';

type OfferPageProps = {
  authorizationStatus: AuthorizationStatus;
}

function OfferPage({ authorizationStatus }: OfferPageProps): ReactElement {
  const { id } = useParams();
  const offer: Offer | undefined = OFFERS.find((item) => item.id === id);
  if (!offer) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  const isAuthorized: boolean = authorizationStatus === AuthorizationStatus.Auth;
  const reviews: OfferReview[] = OFFER_REVIEWS;
  const nearOffers: OfferPreview[] = OFFER_PREVIEWS
    .filter((item) => item.city.name === offer.city.name && item.id !== offer.id)
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>6 cities | {offer.title}</title>
      </Helmet>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  { offer.title }
                </h1>
                <OfferBookmarksButton
                  authorizationStatus={authorizationStatus}
                  isActive={offer.isFavorite}
                  isFullSize
                />
              </div>
              <div className="offer__rating rating">
                <OfferRatingStars rating={offer.rating} variant='offer' />
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {getOfferHousingTypeText(offer.housingType)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {`${offer.bedroomsCount} ${offer.bedroomsCount === 1 ? 'Bedroom' : 'Bedrooms'}`}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {`Max ${offer.guestsMaxCount} ${offer.guestsMaxCount === 1 ? 'adult' : 'adults'}`}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.amenities.map((amenity) => (
                    <li className="offer__inside-item" key={amenity}>
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={classNames('offer__avatar-wrapper', 'user__avatar-wrapper', {
                      'offer__avatar-wrapper--pro': offer.author.isPro
                    })}
                  >
                    <img className="offer__avatar user__avatar" src={offer.author.avatar} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {offer.author.name}
                  </span>
                  {offer.author.isPro && (
                    <span className="offer__user-status">
                      Pro
                    </span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    { offer.description }
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ul className="reviews__list">
                  {reviews.map((review) => (
                    <OfferPageReview key={review.id} review={review} />
                  ))}
                </ul>
                {isAuthorized && (
                  <OfferPageReviewForm />
                )}
              </section>
            </div>
          </div>
          <section className="offer__map map" />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearOffers.map((nearOffer) => (
                <OfferCard
                  key={nearOffer.id}
                  {...nearOffer}
                  authorizationStatus={authorizationStatus}
                  variant='near-places'
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default OfferPage;
