import type { MapLayoutVariant } from '../types/map-layout-variant';
import type { MapLayoutVariantType } from '../types/map-layout-variant-type';

export const MAP_LAYOUT_VARIANTS = {
  mainPage: {
    className: 'cities__map',
  },
  offerPage: {
    className: 'offer__map',
  },
} as const satisfies Record<MapLayoutVariantType, MapLayoutVariant>;
