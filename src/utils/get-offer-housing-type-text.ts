import type { Offer } from '../types/offer';

const HOUSING_TYPE_TEXT: Record<Offer['housingType'], string> = {
  apartment: 'Apartment',
  hotel: 'Hotel',
  house: 'House',
  room: 'Room'
};

export function getOfferHousingTypeText(housingType: Offer['housingType']): string {
  return HOUSING_TYPE_TEXT[housingType];
}
