import type { CityName } from '../enums/city-name';
import type { OfferLocation } from './offer-location';

export type OfferCity = {
  name: CityName;
  location: OfferLocation;
};
