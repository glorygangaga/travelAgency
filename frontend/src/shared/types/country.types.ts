export type countryType = {
  country_id: number;
  country_name: string;
  description: string;
  images: {image_id: number}[]
}

export type countriesListType = countryType[];

export type getCountryTypeResponse = {
  countries: countriesListType,
  total: number
}

export type createCountryType = {
  country_name: string;
  description: string;
  files?: File[];
};

