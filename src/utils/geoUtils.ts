import type { Country } from "../types";

const calculateCentroid = (coords: any): { lat: number; lng: number } => {
  let totalLat = 0;
  let totalLng = 0;
  let pointCount = 0;

  const processCoords = (coordArray: any) => {
    if (typeof coordArray[0] === 'number') {
      totalLng += coordArray[0];
      totalLat += coordArray[1];
      pointCount++;
    } else {
      coordArray.forEach((c: any) => processCoords(c));
    }
  };

  processCoords(coords);
  return { lat: totalLat / pointCount, lng: totalLng / pointCount };
};

export const extractCountries = (features: any[]): Country[] => {
  return features
    .map((feature: any) => {
      const { lat, lng } = calculateCentroid(feature.geometry.coordinates);
      return {
        name: feature.properties.name,
        lat,
        lng,
        id: feature.id || feature.properties.name
      };
    })
    .filter((country: Country) => country.name && !Number.isNaN(country.lat) && !Number.isNaN(country.lng));
};
