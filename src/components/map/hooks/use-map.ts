import leaflet, { type Map as LeafletMap } from 'leaflet';
import { type MutableRefObject, useEffect, useRef, useState } from 'react';
import type { OfferLocation } from '../../../types/offer-location';

const MAP_TEMPLATE_URL: string = `https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${import.meta.env.VITE_CARTO_CDN_API_KEY}`;
const MAP_ATTRIBUTION: string = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

export function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  center: OfferLocation
): LeafletMap | null {
  const [map, setMap] = useState<LeafletMap | null>(null);
  const isRenderedRef: MutableRefObject<boolean> = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance: LeafletMap = leaflet.map(mapRef.current, {
        center: {
          lat: center.latitude,
          lng: center.longitude
        },
        zoom: center.zoom
      });

      leaflet
        .tileLayer(MAP_TEMPLATE_URL, {
          attribution: MAP_ATTRIBUTION
        })
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, center]);

  useEffect(() => {
    if (map) {
      map.setView(
        {
          lat: center.latitude,
          lng: center.longitude
        },
        center.zoom
      );
    }
  }, [map, center]);

  return map;
}
