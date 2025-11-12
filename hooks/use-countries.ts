import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export interface CountryCodeResponse {
  id: string;
  name: string;
  code: string;
  iso: string;
  iso3: string;
  region: string;
  timezone: string;
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
  flag: string;
  example: string;
  dialingInstructions: {
    international: string;
    steps: string[];
  };
  cityCodes: Array<{
    city: string;
    code: string;
  }>;
}

export interface CountryCode {
  name: string;
  code: string;
  iso: string;
  flag: string;
}

export const countryCodeKeys = {
  all: ["countryCode"] as const,
  list: () => [...countryCodeKeys.all, "list"] as const,
};

export const useCountryCode = () => {
  const countryCodeQuery = useQuery({
    queryKey: countryCodeKeys.list(),
    queryFn: async (): Promise<CountryCode[]> => {
      const { data } = await axios.get<CountryCodeResponse[]>(
        "/api/country-codes"
      );
      // Extract only the fields we need
      return data.map((country) => ({
        name: country.name,
        code: country.code,
        iso: country.iso,
        flag: country.flag,
      }));
    },
    staleTime: 1000 * 60 * 60 * 24, // Cache for 24 hours since country codes don't change often
  });

  return {
    // data
    data: countryCodeQuery.data,
    
    // fetching
    isLoading: countryCodeQuery.isLoading,
    
    // error
    isError: countryCodeQuery.isError,
    error: countryCodeQuery.error,
    
    // refetch
    refetch: countryCodeQuery.refetch,
  };
};