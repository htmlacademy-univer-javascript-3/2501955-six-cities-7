import { CityName } from '../../../enums/city-name';

export function getRandomCity(): CityName {
  const cities: CityName[] = Object.values(CityName);
  const randomIndex: number = Math.floor(Math.random() * cities.length);

  return cities[randomIndex];
}
