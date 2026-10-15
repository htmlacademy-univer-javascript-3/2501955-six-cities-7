import type { OfferAuthor } from './offer-author';
import type { OfferCity } from './offer-city';
import type { OfferLocation } from './offer-location';

export type Offer = {
  id: string;
  title: string;
  housingType: 'apartment' | 'room' | 'house' | 'hotel';
  price: number;
  city: OfferCity;
  location: OfferLocation;
  isFavorite?: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedroomsCount: number;
  amenities: string[];
  author: OfferAuthor;
  images: string[];
  guestsMaxCount: number;
};
