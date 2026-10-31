import leaflet, { type Map as LeafletMap, type Marker as LeafletMarker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { type ReactElement, useEffect, useRef, type MutableRefObject } from 'react';
import type { OfferLocation } from '../../types/offer-location';
import { MAP_ACTIVE_MARKER } from './constants/map-active-marker';
import { MAP_DEFAULT_MARKER } from './constants/map-default-marker';
import { useMap } from './hooks/use-map';

type MapProps = {
  center: OfferLocation;
  points: ReadonlyArray<OfferLocation & {
    id: string;
  }>;
  activePointId?: string | null;
};

function Map({ center, points, activePointId }: MapProps): ReactElement {
  const mapRef: MutableRefObject<HTMLElement | null> = useRef<HTMLElement | null>(null);
  const map: LeafletMap | null = useMap(mapRef, center);

  useEffect(() => {
    if (!map) {
      return;
    }

    const markers: LeafletMarker[] = points.map((point) =>
      leaflet
        .marker({
          lat: point.latitude,
          lng: point.longitude
        }, {
          icon: (point.id === activePointId)
            ? MAP_ACTIVE_MARKER
            : MAP_DEFAULT_MARKER
        })
        .addTo(map)
    );

    return () => {
      markers.forEach((marker) => marker.remove());
    };
  }, [map, points, activePointId]);

  return (
    <section
      className='map cities__map'
      ref={mapRef}
    />
  );
}

export default Map;
