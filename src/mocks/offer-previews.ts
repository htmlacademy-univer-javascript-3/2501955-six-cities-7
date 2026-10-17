import type { OfferPreview } from '../types/offer-preview';
import { OFFERS } from './offers';

export const OFFER_PREVIEWS: OfferPreview[] = OFFERS.map((offer) => ({
  id: offer.id,
  title: offer.title,
  housingType: offer.housingType,
  price: offer.price,
  city: offer.city,
  location: offer.location,
  isFavorite: offer.isFavorite,
  isPremium: offer.isPremium,
  rating: offer.rating,
  previewImage: offer.images[0],
}));
