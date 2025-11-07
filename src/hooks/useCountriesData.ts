import { useEffect, useState } from "react";
import { GEOJSON_URL } from "../constants";
import { extractCountries } from "../utils/geoUtils";
import type { Country } from "../types";

export const useCountriesData = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [polygonsData, setPolygonsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(GEOJSON_URL)
      .then(res => res.json())
      .then(data => {
        setPolygonsData(data.features);
        setCountries(extractCountries(data.features));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading countries data:', error);
        setLoading(false);
      });
  }, []);

  return { countries, polygonsData, loading };
};