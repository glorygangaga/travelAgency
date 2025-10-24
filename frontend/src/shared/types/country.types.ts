export type countryType = {
  country_id: number;
  country_name: string;
  description: string;
}

export type countriesListType = countryType[];

export type getCountryTypeResponse = {
  countries: countriesListType,
  total: number
}

export type createCountryType = {
  country_name: string;
  description: string;
};

