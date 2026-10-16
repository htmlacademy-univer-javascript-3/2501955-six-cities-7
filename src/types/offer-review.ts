import { OfferAuthor } from './offer-author';

export type OfferReview = {
  id: string;
  date: string;
  author: OfferAuthor;
  comment: string;
  rating: number;
};
