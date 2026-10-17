import type { Offer } from './offer';

export type OfferPreview = Pick<
  Offer,
  | 'id'
  | 'title'
  | 'housingType'
  | 'price'
  | 'city'
  | 'location'
  | 'isFavorite'
  | 'isPremium'
  | 'rating'
> & {
  previewImage: string;
};
