import { CityName } from '../../../enums/city-name';

const CITY_NAMES: string[] = Object.values(CityName);

export function getCityName(value: string | null): CityName {
  if (value !== null && CITY_NAMES.includes(value)) {
    return value as CityName;
  }

  return CityName.Paris;
}
