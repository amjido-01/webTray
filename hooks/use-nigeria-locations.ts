import { useState, useCallback, useMemo } from 'react';
import { NIGERIA_LOCATIONS } from '@/lib/nigeria-locations-data';

export const useNigeriaLocations = () => {
  const [cities, setCities] = useState<string[]>([]);
  
  // States are derived directly from our static data keys
  const states = useMemo(() => Object.keys(NIGERIA_LOCATIONS).sort(), []);

  const fetchCities = useCallback(async (stateName: string) => {
    // Standardize input to match our object keys if necessary 
    // (though the dropdown value will already match exactly)
    if (!stateName || !NIGERIA_LOCATIONS[stateName]) {
      setCities([]);
      return;
    }

    // Since it's local, we don't need real async, 
    // but keeping it async for compatibility with current caller
    const stateCities = NIGERIA_LOCATIONS[stateName];
    setCities([...stateCities].sort());
  }, []);

  return {
    states,
    cities,
    isLoadingStates: false,
    isLoadingCities: false,
    fetchCities,
  };
};
