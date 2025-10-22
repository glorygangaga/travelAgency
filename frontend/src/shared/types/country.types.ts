export type countryType = {
  country_id: number;
  country_name: string;
  description: string;
}

export type getCountryTypeResponse = countryType[];

export type createCountryType = {
  country_name: string;
  description: string;
};
