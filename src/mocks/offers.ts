import { CityName } from '../enums/city-name';
import type { Offer } from '../types/offer';

export const OFFERS: Offer[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious apartment at great location',
    housingType: 'apartment',
    price: 120,
    city: {
      name: CityName.Amsterdam,
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8,
      },
    },
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.3,
    description:
      'A beautiful and luxurious apartment in a great location. Enjoy a comfortable stay with everything you need to explore the city.',
    bedroomsCount: 2,
    amenities: [
      'Wi-Fi',
      'Heating',
      'Kitchen',
      'Washing machine',
      'Air conditioning',
    ],
    author: {
      name: 'Angelina',
      avatar: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    images: [
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/room.jpg',
      'img/studio-01.jpg',
      'img/apartment-01.jpg',
    ],
    guestsMaxCount: 4,
  },
  {
    id: '2',
    title: 'Wood and stone place',
    housingType: 'room',
    price: 80,
    city: {
      name: CityName.Amsterdam,
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8,
      },
    },
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.5,
    description:
      'A cozy room with natural wood and stone details. A great choice for travelers looking for a comfortable and affordable place to stay.',
    bedroomsCount: 1,
    amenities: ['Wi-Fi', 'Heating', 'Kitchen', 'Towels'],
    author: {
      name: 'Max',
      avatar: 'img/avatar-max.jpg',
      isPro: false,
    },
    images: [
      'img/apartment-03.jpg',
      'img/apartment-01.jpg',
      'img/room.jpg',
      'img/apartment-03.jpg',
      'img/studio-01.jpg',
      'img/apartment-02.jpg',
    ],
    guestsMaxCount: 2,
  },
  {
    id: '3',
    title: 'Canal View Prinsengracht',
    housingType: 'apartment',
    price: 132,
    city: {
      name: CityName.Amsterdam,
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8,
      },
    },
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.7,
    description:
      'Enjoy a lovely view of the Amsterdam canals from this stylish apartment. Discover charming streets, local cafes, and famous landmarks just around the corner.',
    bedroomsCount: 1,
    amenities: ['Wi-Fi', 'Heating', 'Kitchen', 'Dishwasher', 'Fridge'],
    author: {
      name: 'Angelina',
      avatar: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    images: [
      'img/apartment-02.jpg',
      'img/apartment-01.jpg',
      'img/apartment-03.jpg',
      'img/studio-01.jpg',
      'img/apartment-02.jpg',
      'img/room.jpg',
    ],
    guestsMaxCount: 3,
  },
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    housingType: 'apartment',
    price: 180,
    city: {
      name: CityName.Amsterdam,
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8,
      },
    },
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
    isFavorite: false,
    isPremium: true,
    rating: 3.4,
    description:
      'A spacious, warm, and cozy apartment with a large comfortable bed. Perfect for a relaxing getaway in the heart of Amsterdam.',
    bedroomsCount: 2,
    amenities: [
      'Wi-Fi',
      'Heating',
      'Kitchen',
      'Washing machine',
      'Air conditioning',
      'Dishwasher',
    ],
    author: {
      name: 'Max',
      avatar: 'img/avatar-max.jpg',
      isPro: false,
    },
    images: [
      'img/apartment-03.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/room.jpg',
      'img/apartment-03.jpg',
      'img/studio-01.jpg',
    ],
    guestsMaxCount: 5,
  },
];
